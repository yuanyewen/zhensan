package com.gx.zhensan.web;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;

import com.gx.zhensan.domain.User;
import com.gx.zhensan.service.ScoreService;
import com.gx.zhensan.service.UserService;
import com.gx.zhensan.util.CommonUtil;
import com.gx.zhensan.util.HttpRequstUtils;


@Controller
@RequestMapping("/main")
public class LoginController {

	private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

	// 给工作流使用所添加的变量
	public static final String USERID = "userId";
	public static final String PASSWORD = "password";

	public static final String USER_MAP = "userMap";
	public static final String USERS = "loginUsers";
	
	private UserService userService;
	
	private ScoreService scoreService;
	
	@Resource
	public void setScoreService(ScoreService scoreService) {
		this.scoreService = scoreService;
	}

	@Resource
	public void setUserService(UserService userService) {
		this.userService = userService;
	}

	@RequestMapping("/login")
	public String login(@RequestParam("userId") String userId, 
			@RequestParam("password") String password, HttpServletRequest request,
			HttpServletResponse response, ModelMap map) {

		try {
			HttpSession httpSession = request.getSession();
			User user = userService.getUser(userId);
			if(user!=null){
				if (user.getPassword().equals(password)){
					map.addAttribute("msg", "success");
					httpSession.setAttribute("userId", userId);
					httpSession.setAttribute("userName", user.getUserName());
					String lastlogindate = user.getLastlogindate()==null?"":CommonUtil.dateToStrLong(user.getLastlogindate());
					httpSession.setAttribute("lastlogindate", lastlogindate);
					httpSession.setAttribute("lastloginip", user.getLastloginip());

					ServletContext application = request.getSession().getServletContext();
					@SuppressWarnings("unchecked")
					Map<String, Object> users = (Map<String, Object>) application.getAttribute(USERS);
					if (users == null) {
						users = new HashMap<String, Object>();
					}
					users.put(userId, userId + ',' + request.getRemoteAddr() + ',' + getDate(new Date()));
					application.setAttribute(USERS, users);

					// 保存相同用户名的session信息，供相同帐号登录的时候，踢出上次登录的用户使用。
					saveLoginUserSessionId(userId, httpSession);

					// 登录成功后，记录登录时间和IP
					user.setLastlogindate(CommonUtil.getCurrentDate());
					String ip = request.getRemoteAddr() == null ? "localhost" : request.getRemoteAddr();
					user.setLastloginip(ip);
					userService.updateUser(user);
					
					userService.addlog(userId, ip, "登录");
				}else{
					map.addAttribute("msg", "密码输入错误，请重新输入！");
				}
			}else{
				map.addAttribute("msg", "用户名不存在，请重新输入！");
			}

		} catch (Throwable e) {
			System.out.println(e.getMessage());
			logger.warn(e.getMessage(), e);
			map.addAttribute("msg", e.getMessage());
		} finally {
			
		}
		return "jsonView";

	}

	@SuppressWarnings("unchecked")
	private void saveLoginUserSessionId(String userId,HttpSession httpSession) {
		ServletContext application = httpSession.getServletContext();
		Map<String, String> userMap = (Map<String, String>) application.getAttribute(USER_MAP);

		if (userMap == null) {
			userMap = new HashMap<String, String>();
		}

		userMap.put(userId, httpSession.getId());
		application.setAttribute(USER_MAP, userMap);
	}

	@RequestMapping("/logout")
	public void logout(HttpServletRequest request, HttpServletResponse response) throws IOException {
		request.getSession().invalidate();
		// 转到登录页面
		response.sendRedirect("../login.html");
	}
	
	@RequestMapping("/getCurrentUser")
	public String getCurrentUser(HttpServletRequest request, 
			HttpServletResponse response, ModelMap map) {
		HttpSession httpSession = request.getSession();
		String userId = httpSession.getAttribute("userId").toString();
		User user = userService.getUser(userId);
		String pic = user.getPic();
		map.addAttribute("userId",userId);
		map.addAttribute("userName",user.getUserName());
		map.addAttribute("qq",user.getQq());
		map.addAttribute("phone",user.getPhone());
		map.addAttribute("email",user.getEmail());
		map.addAttribute("des",user.getDescription());
		map.addAttribute("lastlogindate",httpSession.getAttribute("lastlogindate"));
		map.addAttribute("lastloginip",httpSession.getAttribute("lastloginip"));
		map.addAttribute("pic",pic);
		return "jsonView";
	}

	private static String getDate(Date date) {

		try {
			if (date == null) {
				return "";
			}
			SimpleDateFormat formatDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String str = formatDate.format(date);
			return str;
		} catch (Exception e) {
			return "";
		}

	}
	
	
	@RequestMapping("/changePass")
	public String changePass(HttpServletRequest request, 
			@RequestParam(value = "userId", required = false) String userId,
			@RequestParam(value = "newPassword", required = false) String newPassword, ModelMap map) {
			userService.changePass(userId, newPassword);
			HttpSession httpSession = request.getSession();
			String ip = httpSession.getAttribute("lastloginip").toString();
			userService.addlog(userId, ip, "修改密码");
		return "jsonView";
	}
	
	
	@RequestMapping(value = "/addUser", method = RequestMethod.POST, consumes = "multipart/form-data")
	@ResponseStatus(value = HttpStatus.OK)
	public void createUser(HttpServletRequest request,HttpServletResponse response,
			@RequestParam String new_userId,
			@RequestParam String new_userName,
			@RequestParam String new_password,
			@RequestParam String new_repassword,
			@RequestParam String new_qq,
			@RequestParam String new_phone,
			@RequestParam String new_email,
			@RequestParam String new_description) throws Exception {
		try {
			MultipartFile[] multipartFiles = HttpRequstUtils.getStreams(request);
			InputStream inputStream = null;
			if(multipartFiles!=null){
				for(int i=0;i<multipartFiles.length;i++){
					MultipartFile file = multipartFiles[i];
					if(file.getSize()>0){
						try {
							inputStream = file.getInputStream();
						} catch (IOException e) {
							e.printStackTrace();
						}
					}
				}
			}
			
			User user = new User();
			String picUuid = UUID.randomUUID().toString();
			String picName=request.getSession().getServletContext().getRealPath("")+"\\pics\\"+picUuid+".jpg";
			if (inputStream!=null){
				savePic(inputStream, picName);
				user.setPic(picUuid);
			}else{
				user.setPic("");
			}
			
			user.setUserId(new_userId);
			user.setUserName(new_userName);
			user.setPassword(new_password);
			user.setQq(new_qq);
			user.setPhone(new_phone);
			user.setEmail(new_email);
			user.setDescription(new_description);
			String ip = request.getRemoteAddr() == null ? "localhost" : request.getRemoteAddr();
			user.setLastloginip(ip);
			userService.addUser(user);
			int id = userService.getUser(new_userId).getId();
			scoreService.addUserScore(id, new_userName, 15);
			
			userService.addlog(new_userId, ip, "注册");
		} catch (Exception e) {
			
		}
	}
	
	
	@RequestMapping(value = "/modiPic", method = RequestMethod.POST, consumes = "multipart/form-data")
	@ResponseStatus(value = HttpStatus.OK)
	public void modiPic(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try {
			MultipartFile[] multipartFiles = HttpRequstUtils.getStreams(request);
			InputStream inputStream = null;
			if(multipartFiles!=null){
				for(int i=0;i<multipartFiles.length;i++){
					MultipartFile file = multipartFiles[i];
					if(file.getSize()>0){
						try {
							inputStream = file.getInputStream();
						} catch (IOException e) {
							e.printStackTrace();
						}
					}
				}
			}
			
			HttpSession httpSession = request.getSession();
			String userId = httpSession.getAttribute("userId").toString();
			
			User user = new User();
			String picUuid = UUID.randomUUID().toString();
			String picName=request.getSession().getServletContext().getRealPath("")+"\\pics\\"+picUuid+".jpg";
			if (inputStream!=null){
				savePic(inputStream, picName);
				user.setPic(picUuid);
			}else{
				user.setPic("");
			}
			user.setUserId(userId);
			String ip = request.getRemoteAddr() == null ? "localhost" : request.getRemoteAddr();
			user.setLastloginip(ip);
			userService.updateUserPic(user);
			
			userService.addlog(userId, ip, "修改头像");
		} catch (Exception e) {
			
		}
	}
	
	
	@RequestMapping(value = "/modiUser", method = RequestMethod.POST)
	@ResponseStatus(value = HttpStatus.OK)
	public String modiUser(HttpServletRequest request,HttpServletResponse response,
			@RequestParam String userId,
			@RequestParam String userName,
			@RequestParam String qq,
			@RequestParam String phone,
			@RequestParam String email,
			@RequestParam String des, ModelMap map) throws Exception {
		try {
			User user = new User();
			user.setUserId(userId);
			user.setUserName(userName);
			user.setQq(qq);
			user.setPhone(phone);
			user.setEmail(email);
			user.setDescription(des);
			String ip = request.getRemoteAddr() == null ? "localhost" : request.getRemoteAddr();
			//user.setLastloginip(ip);
			userService.updateUserInfo(user);
			//int id = userService.getUser(new_userId).getId();
			//scoreService.addUserScore(id, new_userName, 15);
			
			userService.addlog(userId, ip, "修改个人信息");
			map.addAttribute("msg","1");
			return "jsonView";
		} catch (Exception e) {
			map.addAttribute("msg","0");
			return "jsonView";
		}
	}
	
	
	@RequestMapping("/validateUser")
	public String validateUser(HttpServletRequest request, 
			HttpServletResponse response, @RequestParam String userId, ModelMap map) {
		User user = userService.getUser(userId);
		if (user==null){
			map.addAttribute("exist", "0");
		}else{
			map.addAttribute("exist", "1");
		}
		return "jsonView";
	}
	
	
	private void savePic(InputStream is, String picName){
		OutputStream os=null;
		try {
			File tofile=new File(picName);  
			os = new FileOutputStream(tofile);
			byte buffer[]=new byte[4*1024]; 
			while((is.read(buffer))!=-1){ 
			os.write(buffer); } 
			os.flush();
		} catch (IOException e) {
			e.printStackTrace();
		} finally{
			try {
				os.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

}
