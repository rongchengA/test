package com.example.controller;

import com.example.service.LonginService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Auther: Admin
 * @Date: 2019/3/20 17:21
 * @Description:登陆
 */
@Api(tags = "系统操作")
@RestController
@RequestMapping("/Longin")
public class longinController {

    @Autowired
    private LonginService longinService;

    @PostMapping("/user")
    @ApiOperation(value = "登陆接口",notes="用户名密码")
    public   void  longin(){

    }

}
