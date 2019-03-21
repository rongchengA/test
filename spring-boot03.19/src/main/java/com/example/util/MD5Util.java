package com.example.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * @ClassName EncryptUtil
 * @Description EncryptUtil给MD5加密加扰，以免被破解
 * @author fds@china.com.cn
 * @date 2017-11-30
 */
public class MD5Util {
	static public String encryptString(String in) throws NoSuchAlgorithmException  {
		if (in == null || "".equals(in)) {
			return "";
		}
		StringBuffer tmpBuf = new StringBuffer(); 
		tmpBuf.append(in.trim() );
		tmpBuf.append("NB");
		MessageDigest md5 = MessageDigest.getInstance("MD5");
		md5.update( tmpBuf.toString().getBytes() ); //
		byte[] b = md5.digest();
		return byte2hex(b);
	}
	
	
	static public String encryptAli(String in) throws NoSuchAlgorithmException  {
		if (in == null || "".equals(in)) {
			return "";
		}
		StringBuffer tmpBuf = new StringBuffer(); 
		tmpBuf.append(in.trim());
		MessageDigest md5 = MessageDigest.getInstance("MD5");
		md5.update( tmpBuf.toString().getBytes() ); //
		byte[] b = md5.digest();
		return byte2hex(b);
	}

	/**
	 * 字节转换成十六进制字符串
	 */
	static public String byte2hex(byte[] b) {
		String hs = "";
		String stmp = "";
		for (int n = 0; n < b.length; n++) {
			stmp = (Integer.toHexString(b[n] & 0XFF));
			if (stmp.length() == 1) {
				hs = hs + "0" + stmp;
			} else {
				hs = hs + stmp;
			}
		}
		return hs;
	}
}
