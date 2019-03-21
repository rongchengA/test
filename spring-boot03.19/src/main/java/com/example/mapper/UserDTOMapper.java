package com.example.mapper;

import com.example.pojo.UserDTO;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Repository;

public interface UserDTOMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_user
     *
     * @mbg.generated
     */
    int deleteByPrimaryKey(Integer uid);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_user
     *
     * @mbg.generated
     */
    int insert(UserDTO record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_user
     *
     * @mbg.generated
     */
    int insertSelective(UserDTO record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_user
     *
     * @mbg.generated
     */
    UserDTO selectByPrimaryKey(Integer uid);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_user
     *
     * @mbg.generated
     */
    int updateByPrimaryKeySelective(UserDTO record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_user
     *
     * @mbg.generated
     */
    int updateByPrimaryKey(UserDTO record);

    /**
     *
     * 功能描述:查询用户（登陆）
     *
     * @param:
     * @return:
     * @auther: Admin
     * @date: 2019/3/21 10:11
     * rongcheng
     */
    UserDTO queryName(String user);
}