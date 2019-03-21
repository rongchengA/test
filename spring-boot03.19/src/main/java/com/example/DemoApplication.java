package com.example;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
@MapperScan("com.example.mapper") // 扫描mapper文件
public class DemoApplication {
    private static final Logger logger = LogManager.getLogger(DemoApplication.class);

    public static void main(String[] args) throws Exception {
        SpringApplication.run(DemoApplication.class, args);
        logger.debug("============= SpringBoot Start Success =============");
    }
}
