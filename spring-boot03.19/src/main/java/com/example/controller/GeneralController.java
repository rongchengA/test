package com.example.controller;


import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;


public class GeneralController {

	private static final Logger logger = LogManager.getLogger(GeneralController.class);
	public final static String SUCCESS = "success";
	public final static String MSG = "msg";
	public final static String RESULT ="result";
	public final static String DATA = "data";
	public final static String LOGOUT_FLAG = "logoutFlag";


	/**
	 * 获取本机的ip地址
	 * @param request
	 * @return
	 */
	public String getIpAddr(HttpServletRequest request) {
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		return ip;
	}
	/**
	 * 获取本机的ip地址
	 * @param request
	 * @return
	 */
	public String getAmoteIpAddr(HttpServletRequest request) {
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("http_client_ip");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("HTTP_X_FORWARDED_FOR");
		}
		// 如果是多级代理，那么取第一个ip为客户ip
		if (ip != null && ip.indexOf(",") != -1) {
			ip = ip.substring(ip.lastIndexOf(",") + 1, ip.length()).trim();
		}
		return ip;
	}
	/**
	 * 请求成功返回
	 * @return
	 */
	public Map<String, Object> success() {
		return success(null);
	}
	/**
	 * 请求成功返回 提示字符 多用于添加，修改，删除方法
	 * @param msg
	 * @return
	 */
	public Map<String, Object> success(String msg) {
		return returnMsg(true, msg);
	}

	/**
	 * 请求成功返回 提示字符以及结果 多用于查询
	 * @param msg
	 * @param result
	 * @return
	 */
	public Map<String, Object> success(String msg,Object result) {
		return returnMsg(true, msg,result);
	}
		
	/**
	 * 请求失败返回 提示字符 
	 * @param msg
	 * @return
	 */
	public Map<String, Object> fail(String msg) {
		return returnMsg(false, msg);
	}
	/**
	 * 返回字符
	 * @param isSuccess
	 * @param msg
	 * @return
	 */
	private Map<String, Object> returnMsg(boolean isSuccess, String msg) {
		Map<String, Object> m = new HashMap<String, Object>();
		m.put(SUCCESS, isSuccess);
		m.put(MSG, msg);
		return m;
	}
	/**
	 * 返回字符及结果
	 * @param isSuccess
	 * @param msg
	 * @param result
	 * @return
	 */
	private Map<String, Object> returnMsg(boolean isSuccess, String msg,Object result) {
		Map<String, Object> m = new HashMap<String, Object>();
		m.put(SUCCESS, isSuccess);
		m.put(MSG, msg);
		m.put(RESULT, result);
		return m;
	}

}
