package com.example.controller;

import com.example.pojo.UserDTO;
import com.example.service.LonginService;
import com.example.util.MD5Util;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

/**
 * @Auther: Admin
 * @Date: 2019/3/20 17:21
 * @Description:登陆
 */
@Api(tags = "系统操作")
@RestController
@RequestMapping("")
public class longinController extends GeneralController{

    @Autowired
    private LonginService longinService;


    //登陆页面
    @RequestMapping("/longinHtml")
    public ModelAndView loginPage(HttpServletRequest request, HttpServletResponse response) {
        ModelAndView model = new ModelAndView("longin");
        return model;
    }

    /**
     *
     * 功能描述: 登陆
     *
     * @param:
     * @return: 
     * @auther: Admin
     * @date: 2019/3/20 18:05
     * rongcheng
     */
    @RequestMapping(value = "/login",method= RequestMethod.POST)
    @ApiOperation(value = "登陆接口",notes="用户名密码")
    public Map<String,Object> longin(HttpServletRequest request, HttpServletResponse response,String username,String password) throws NoSuchAlgorithmException {

        UserDTO  user = longinService.queryUser(username);
        //判断用户是否存在
        if (StringUtils.isEmpty(user)){
            return fail("用户不存在");
        }
        //判断密码是否正确
        if (!user.getPassword().equals(MD5Util.encryptString(password))){
            return fail("密码错误");
        }
        return  success("查询成功",user);
    }



}
