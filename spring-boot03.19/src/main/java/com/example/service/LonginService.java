package com.example.service;

import com.example.pojo.UserDTO;

/**
 * @Auther: Admin
 * @Date: 2019/3/20 17:22
 * @Description:
 */
public interface LonginService {


    UserDTO queryUser(String user);
}
