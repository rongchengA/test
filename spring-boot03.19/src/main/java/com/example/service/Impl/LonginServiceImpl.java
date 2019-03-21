package com.example.service.Impl;

import com.example.mapper.UserDTOMapper;
import com.example.pojo.UserDTO;
import com.example.service.LonginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @Auther: Admin
 * @Date: 2019/3/20 17:23
 * @Description:
 */
@Service("LonginService")
public class LonginServiceImpl implements LonginService {

    @Autowired
    private UserDTOMapper userDTOMapper;

    @Override
    public UserDTO queryUser(String user) {

        return userDTOMapper.queryName(user);
    }
}
