package com.example.pojo;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

import java.beans.PropertyVetoException;

/**
 * @Auther: Admin
 * @Date: 2019/3/27 11:32
 * @Description:
 */
public class ProductDao extends JdbcTemplate {


    public ProductDao(){

        //定义c3p0连接池
        ComboPooledDataSource ds = new ComboPooledDataSource();
        try {
            ds.setDriverClass("com.mysql.cj.jdbc.Driver");
            ds.setUser("root");
            ds.setPassword("123456");
            ds.setJdbcUrl("jdbc:mysql://localhost:3306/rong?serverTimezone=GMT%2B8");
        } catch (PropertyVetoException e) {
            e.printStackTrace();
        }

        super.setDataSource(ds);
    }
    public void addProduct(Product product){
        super.update("insert into jd_phone values (?,?,?,?,?)",
                product.getPid(),product.getTitle(),product.getPname(),product.getBrand(),product.getPrice());

    }

}
