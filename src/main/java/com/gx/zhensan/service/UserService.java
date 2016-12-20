package com.gx.zhensan.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Service;

import com.gx.zhensan.domain.User;
import com.gx.zhensan.service.base.CommonQuery;
import com.gx.zhensan.service.base.ExCommon;
import com.gx.zhensan.util.CommonUtil;


@Service
public class UserService {
	
	public ApplicationContext context;
	public CommonQuery commonQuery;
	public ExCommon exCommon;
	
	public List<Map<String, Object>> listUsers(){
		context = new ClassPathXmlApplicationContext(new String[] { "applicationContext.xml" });
		commonQuery = (CommonQuery) context.getBean("commonQuery");
		String sql = "SELECT * FROM ZS_USER";
		List<Map<String, Object>> result = commonQuery.query(sql);
		commonQuery = null;
		return result;
	}
	
	public User getUser(String userId){
		User user = null;
		context = new ClassPathXmlApplicationContext(new String[] { "applicationContext.xml" });
		commonQuery = (CommonQuery) context.getBean("commonQuery");
		String sql = "SELECT * FROM ZS_USER WHERE USERID='"+userId+"'";
		List<Map<String, Object>> result = commonQuery.query(sql);
		if (result!=null && result.size()>0){
			user = new User();
			user.setId(Integer.valueOf(result.get(0).get("ID").toString()));
			user.setUserId(result.get(0).get("USERID").toString());
			user.setUserName(result.get(0).get("USERNAME").toString());
			user.setPassword(result.get(0).get("PASSWORD").toString());
			user.setUserStatus(Integer.valueOf(result.get(0).get("USERSTATUS").toString()));
			user.setQq(result.get(0).get("QQ").toString());
			user.setPhone(result.get(0).get("PHONE").toString());
			user.setEmail(result.get(0).get("EMAIL").toString());
			user.setDescription(result.get(0).get("DESCRIPTION").toString());
			user.setUserType(Integer.valueOf(result.get(0).get("USERTYPE").toString()));
			user.setLastlogindate((Date)result.get(0).get("LASTLOGINDATE"));
			user.setLastloginip(result.get(0).get("LASTLOGINIP").toString());
			user.setPic(result.get(0).get("PIC").toString());
		}
		commonQuery = null;
		return user;
	}
	
	public void updateUser(User user){
		try {
			context = new ClassPathXmlApplicationContext(new String[] { "applicationContext.xml" });
			exCommon = (ExCommon) context.getBean("exCommon");
			String sql = "UPDATE ZS_USER SET USERNAME='"+user.getUserName()+"',"+
											"PASSWORD='"+user.getPassword()+"',"+
											"QQ='"+user.getQq()+"',"+
											"PHONE='"+user.getPhone()+"',"+
											"EMAIL='"+user.getEmail()+"',"+
											"DESCRIPTION='"+user.getDescription()+"',"+
											"LASTLOGINDATE='"+CommonUtil.getCurrentDateStr()+"',"+
											"LASTLOGINIP='"+user.getLastloginip()+"' "+
											"WHERE USERID='"+user.getUserId()+"'";
			System.out.println(sql);
			exCommon.update(sql);
			exCommon = null;
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	public void updateUserInfo(User user){
		try {
			context = new ClassPathXmlApplicationContext(new String[] { "applicationContext.xml" });
			exCommon = (ExCommon) context.getBean("exCommon");
			String sql = "UPDATE ZS_USER SET USERNAME='"+user.getUserName()+"',"+
											"QQ='"+user.getQq()+"',"+
											"PHONE='"+user.getPhone()+"',"+
											"EMAIL='"+user.getEmail()+"',"+
											"DESCRIPTION='"+user.getDescription()+"' "+
											"WHERE USERID='"+user.getUserId()+"'";
			System.out.println(sql);
			exCommon.update(sql);
			exCommon = null;
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	public void updateUserPic(User user){
		try {
			context = new ClassPathXmlApplicationContext(new String[] { "applicationContext.xml" });
			exCommon = (ExCommon) context.getBean("exCommon");
			String sql = "UPDATE ZS_USER SET PIC='"+user.getPic()+"' "+
											"WHERE USERID='"+user.getUserId()+"'";
			System.out.println(sql);
			exCommon.update(sql);
			exCommon = null;
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	public void changePass(String userId, String newPassword){
		try {
			context = new ClassPathXmlApplicationContext(new String[] { "applicationContext.xml" });
			exCommon = (ExCommon) context.getBean("exCommon");
			String sql = "UPDATE ZS_USER SET PASSWORD='"+newPassword+"' "+
											"WHERE USERID='"+userId+"'";
			System.out.println(sql);
			exCommon.update(sql);
			exCommon = null;
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	public void addlog(String userId, String ip, String operation){
		try {
			context = new ClassPathXmlApplicationContext(new String[] { "applicationContext.xml" });
			exCommon = (ExCommon) context.getBean("exCommon");
			String sql = "INSERT INTO ZS_LOGGER(USERID,CREATEDATE,IPADDRESS,OPERATION) VALUES('"+
											userId+"','"+CommonUtil.getCurrentDateStr()
											+"','"+ip+"','"+operation+"') ";
			System.out.println(sql);
			exCommon.insert(sql);
			exCommon = null;
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	} 
	
	public void addUser(User user){
		try {
			context = new ClassPathXmlApplicationContext(new String[] { "applicationContext.xml" });
			exCommon = (ExCommon) context.getBean("exCommon");
			String sql = "INSERT INTO ZS_USER(" +
						 "USERID,USERNAME,PASSWORD,USERSTATUS,QQ,PHONE," +
						 "EMAIL,DESCRIPTION,USERTYPE,LASTLOGINDATE,LASTLOGINIP,PIC) VALUES('"+
						 user.getUserId()+"','"+user.getUserName()+"','"+user.getPassword()+"',1,'"+user.getQq()+"','"+user.getPhone()
						 +"','"+user.getEmail()+"','"+user.getDescription()+"',1,'"+CommonUtil.getCurrentDateStr()
						 +"','"+user.getLastloginip()+"','"+user.getPic()+"') ";
			System.out.println(sql);
			exCommon.insert(sql);
			exCommon = null;
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	} 
	
}
