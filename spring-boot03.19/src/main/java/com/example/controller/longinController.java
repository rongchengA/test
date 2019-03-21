package com.example.controller;

import com.example.pojo.UserDTO;
import com.example.service.LonginService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * @Auther: Admin
 * @Date: 2019/3/20 17:21
 * @Description:登陆
 */
@Api(tags = "系统操作")
@RestController
@RequestMapping("/Longin")
public class longinController extends GeneralController{

    @Autowired
    private LonginService longinService;

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
    @PostMapping("/user")
    @ApiOperation(value = "登陆接口",notes="用户名密码")
    public Map<String,Object> longin(HttpServletRequest request, HttpServletResponse response,@RequestBody Map<String, Object> userMap){

        UserDTO  user = longinService.queryUser(userMap.get("user").toString());

        return  success("查询成功",user);
    }

}
