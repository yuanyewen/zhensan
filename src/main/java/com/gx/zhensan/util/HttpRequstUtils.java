package com.gx.zhensan.util;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

public abstract class HttpRequstUtils {
	
	public static MultipartFile[] getStreams(HttpServletRequest request) {
		if (!(request instanceof MultipartHttpServletRequest)) 
			return new MultipartFile[] {};
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		return multipartRequest.getFileMap().values().toArray(new MultipartFile[] {});
	}
	
}
