package com.gx.zhensan.web.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 * <p>
 * 平台session获取和释放的拦截器
 * </p>
 * 
 * @version 7.0
 * @author xintong
 *         <p>
 *         <b>创建时间： </b>2011-8-16
 *         </p>
 *         <p>
 *         <b>修改人： </b>
 *         </p>
 *         <p>
 *         <b>修改时间： </b>
 *         </p>
 */
public class SessionInterceptor extends HandlerInterceptorAdapter {
	private static final Logger logger = LoggerFactory.getLogger(SessionInterceptor.class);

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

		Object object = request.getSession().getAttribute("userId");
		if (object == null) {
			response.setStatus(403);
			logger.warn("in response.setStatus(403) , object is :" + object);
			return false;
		}

//		/*
//		 * 如果登录就为本次请求打开一个平台连接, 方便事务的开启 2011-8-15
//		 */
//		HttpSession hSession = request.getSession();
//		String userId = (String) hSession.getAttribute(LoginController.USERID);
//		String password = (String) hSession.getAttribute(LoginController.PASSWORD);
//		if (userId == null || password == null) {
//			response.setStatus(403);
//			logger.warn("in response.setStatus(403) , hSession is :" + hSession + " and userId is :" + userId + " and password is :" + password);
//			return false;
//		}
//		Repository repository = RepositoryUtil.getRepository();
//		Session session = repository.login(userId, password);
//		request.setAttribute(RepositoryUtil.UC_API_SESSION, session);
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

	}

	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
//		// 完成本次请求以后平台退出，保证事务是在一次请求之中的。
//		Session session = (Session) request.getAttribute(RepositoryUtil.UC_API_SESSION);
//		session.logout();
	}
}
