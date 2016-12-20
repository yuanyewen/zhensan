package com.gx.zhensan.util;

import java.text.ParseException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

public class CommonUtil {
	public static Date getNowDate() {
	   Date currentTime = new Date();
	   SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	   String dateString = formatter.format(currentTime);
	   ParsePosition pos = new ParsePosition(8);
	   Date currentTime_2 = formatter.parse(dateString, pos);
	   return currentTime_2;
	}
	
	public static String getStringDate() {
		Date currentTime = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String dateString = formatter.format(currentTime);
		return dateString;
	}
	
	/**
	   * 将长时间格式字符串转换为时间 yyyy-MM-dd HH:mm:ss
	   * 
	   * @param strDate
	   * @return
	   */
	public static Date strToDateLong(String strDate) {
	   SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	   ParsePosition pos = new ParsePosition(0);
	   Date strtodate = formatter.parse(strDate, pos);
	   return strtodate;
	}
	/**
	   * 将长时间格式时间转换为字符串 yyyy-MM-dd HH:mm:ss
	   * 
	   * @param dateDate
	   * @return
	   */
	public static String dateToStrLong(java.util.Date dateDate) {
	   SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	   String dateString = formatter.format(dateDate);
	   return dateString;
	}
	
//	public static String getCurrentLoginUserIP() {
//		return request.getRemoteAddr() == null ? "localhost" : request.getRemoteAddr();
//	}

	
	public static Date getCurrentDate() {
		Date date = null;
		SimpleDateFormat formatDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String str = formatDate.format(new Date());
		try {
			date = formatDate.parse(str);
		} catch (ParseException e) {
			return date;
		}
		return date;
	}
	
	public static String getCurrentDateStr() {
		Date date = null;
		SimpleDateFormat formatDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String str = formatDate.format(new Date());
		return str;
	}
	
	public static void main(String[] args) {
		System.out.println(dateToStrLong(new Date()));
	}

}
