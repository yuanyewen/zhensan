package com.gx.zhensan.web.interceptor;

import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.gx.zhensan.web.LoginController;

/**
 * <p>登录拦截器</p>
 * @version 7.0
 * @author  YuanYW
 * <p>
 *   <b>创建时间： </b>2011-7-30
 * </p>
 * <p>
 *   <b>修改人： </b>
 * </p>
 * <p>
 *   <b>修改时间： </b>
 * </p>
 */
public class InvalidLoginInterceptor extends HandlerInterceptorAdapter {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

		HttpSession httpSession = request.getSession();

		Object object = httpSession.getAttribute("userId");
		if (object == null) {
			response.setStatus(403);
			return false;
		}

		// 相同帐号登录的时候，踢出上次登录的用户
		ServletContext application = httpSession.getServletContext();

		@SuppressWarnings("unchecked")
		Map<String, String> userMap = (Map<String, String>) application.getAttribute(LoginController.USER_MAP);
		String lastSessionId = userMap.get(httpSession.getAttribute(LoginController.USERID));

		if (!httpSession.getId().equals(lastSessionId)) {
			httpSession.invalidate();
			response.setStatus(403);
			return false;
		}
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

	}

	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
	}

}
