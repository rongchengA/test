
package com.example.aop;
import com.example.util.IpAdrressUtil;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.Enumeration;


@Component
@Aspect
/*
 * 定义切面执行的优先级，数字越低，优先级越高
 * 在切入点之前执行：按order值有小到大的顺序执行
 * 在切入点之后执行：按order值由大到小的顺序执行
 */
@Order(-5)
public class LogAop {
    private static final Logger logger = LogManager.getLogger(LogAop.class);
    // 保证每个线程都有一个单独的实例
    private ThreadLocal<Long> time = new ThreadLocal<>();

    @Pointcut("execution(* com.dtpt.controller..*.*(..))")
    public void pointcut() {
    }

    @Before("pointcut()")
    public void doBefore(JoinPoint joinPoint) {
        time.set(System.currentTimeMillis());
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        //记录请求的内容
        logger.info("Request URL: " + request.getRequestURL().toString());
        logger.info("Request Method: " + request.getMethod());
        logger.info("User-Agent: " + request.getHeader("User-Agent"));
        logger.info("IP:"+ IpAdrressUtil.getIpAdrress(request));
        logger.info("Class Method: " + joinPoint.getSignature().getDeclaringTypeName() + "." + joinPoint.getSignature().getName());
      /*  logger.info("Cookies: " + request.getCookies());*/
        logger.info("Params: " + Arrays.toString(joinPoint.getArgs()));
        logger.info("token: "+request.getHeader("Authorization"));
        Enumeration<String> enums = request.getParameterNames();
        while (enums.hasMoreElements()) {
            String paraName = enums.nextElement();
            logger.info(paraName + ":" + request.getParameter(paraName));
        }
    }
    @AfterReturning(pointcut = "pointcut()",returning = "result")
    public void doAfterReturning(JoinPoint joinPoint,Object result) {
        logger.info("返回值: "+result);
        logger.info("耗时 : " + ((System.currentTimeMillis() - time.get())) + "ms");
    }
   @AfterThrowing(value = "pointcut()",throwing = "exception")
    public  void  Logthrows(JoinPoint joinPoint,Throwable exception){
        logger.error(exception.getMessage());
   }


}