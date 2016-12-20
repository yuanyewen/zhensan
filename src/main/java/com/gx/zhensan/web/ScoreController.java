package com.gx.zhensan.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.gx.zhensan.domain.Score;
import com.gx.zhensan.service.ScoreService;
import com.gx.zhensan.service.UserService;

@Controller
@RequestMapping("/score")
public class ScoreController {
	
	private static final String ROWS = "rows";

	private static final String RECORDS = "records";

	private static final String PAGE = "page";

	private static final String TOTAL = "total";
	
	private ScoreService scoreService;
	
	private UserService userService;

	@Resource
	public void setScoreService(ScoreService scoreService) {
		this.scoreService = scoreService;
	}
	
	@Resource
	public void setUserService(UserService userService) {
		this.userService = userService;
	}


	@RequestMapping(value = "/list")
	public String listUser(@RequestParam("page") Integer pageIndex, 
			@RequestParam("rows") Integer pageSize, 
			@RequestParam("sidx") String sortName,
			@RequestParam("sord") String sord, 
			@RequestParam(value = "userName", required = false) String userName, 
			HttpServletRequest request, ModelMap map) {

		try {
			// 初始化参数
			if (pageIndex == null)
				pageIndex = 1;
			if (pageSize == null)
				pageSize = 10;
			if (sortName == null || sortName.equals(""))
				sortName = "id";
			if (sord == null || sord.equals(""))
				sord = "desc";

			// 组装分页返回值
			List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();

			// 得到所有记录数
			List<Map<String, Object>> scores = scoreService.getScore(pageIndex, pageSize, sortName, sord, userName);
			int resultCount = resultList.size();
			
			try {
				for(Map<String, Object> result:scores)	
				{
					Map<String, Object> resultMap = new HashMap<String, Object>();
					resultMap.put("userId", result.get("USERID").toString());
					resultMap.put("userName", result.get("USERNAME").toString());
					resultMap.put("gamecount", result.get("GAMECOUNT").toString());
					resultMap.put("win", result.get("WIN").toString());
					resultMap.put("draw", result.get("DRAW").toString());
					resultMap.put("lose", result.get("LOSE").toString());
					resultMap.put("kill", result.get("BEAT").toString());
					resultMap.put("die", result.get("DIE").toString());
					resultMap.put("lose", result.get("LOSE").toString());
					resultMap.put("assist", result.get("ASSIST").toString());
					resultMap.put("score", result.get("SCORE").toString());
					resultList.add(resultMap);
				}
			} catch (Exception e) {
				e.printStackTrace();
			} finally{
				
			}

			// 将json数据返回给前台
			map.addAttribute(TOTAL, getPageTotal(pageSize, resultCount));
			map.addAttribute(RECORDS, resultCount);
			map.addAttribute(PAGE, pageIndex);
			map.put(ROWS, resultList);
		} catch (Exception e) {
			
		} 
		
		System.out.println(request.getSession().getAttribute("userId"));
		
		return "jsonView";
	}
	
	@RequestMapping(value = "/getUsers")
	public String getUsers(ModelMap map, HttpServletRequest request) {
		List<String> ids = new ArrayList<String>();
		List<String> names = new ArrayList<String>();
		try {
			List<Map<String, Object>> users = userService.listUsers();
			for(Map<String, Object> user:users){
				ids.add(user.get("ID").toString());
				names.add(user.get("USERNAME").toString());
			}
		} catch (Exception e) {
			
		} finally{
			
		}
		map.put("ids", ids);
		map.put("names", names);
		return "jsonView";
	}
	
	
	@RequestMapping(value = "add", method = RequestMethod.POST)
	@ResponseStatus(value = HttpStatus.ACCEPTED)
	public String create(HttpServletRequest request, 
			@RequestParam(value = "scoreStr", required = false) String scoreStr,
			ModelMap map) {
		if (scoreStr != null && !scoreStr.equals("")) {
			JSONObject jsonobject = JSONObject.fromObject(scoreStr);
			String winOrLose = jsonobject.getString("winOrLose");
			String level = jsonobject.getString("level");
			JSONArray jsonArray = jsonobject.getJSONArray("scores");
			
			if (level.equals("0")){
				map.put("error", "1");
				return "jsonView";
			}
			
			List<Score> scores = new ArrayList<Score>();
			for (int i = 0; i < jsonArray.size(); i++) {
				JSONObject object = (JSONObject) jsonArray.get(i);
				
				try {
					for(Score score:scores){
						if (Integer.valueOf(object.getString("id"))==score.getUserId() && (score.getUserId()!=0)){
							map.put("error", "1");
							return "jsonView";
						}
					}
					Score score = new Score();
					Integer.valueOf(object.getString("id"));
					score.setUserId(Integer.valueOf(object.getString("id")));
					score.setBeat(Integer.valueOf(object.getString("kill")));
					score.setDie(Integer.valueOf(object.getString("die")));
					score.setAssist(Integer.valueOf(object.getString("assist")));
					score.setResult(score.getBeat()-score.getDie()+score.getAssist());
					score.setGameCount(1);
					if (winOrLose.equals("1")){
						score.setWin(1);
						score.setDraw(0);
						score.setLose(0);
					}else if (winOrLose.equals("-1")){
						score.setWin(0);
						score.setDraw(0);
						score.setLose(1);
						if (level.equals("7")){
							score.setScore(-10);
						}else if (level.equals("9")){
							score.setScore(-8);
						}else if (level.equals("11")){
							score.setScore(-5);
						}
					}else {
						map.put("error", "1");
						return "jsonView";
					}
					scores.add(score);
				} catch (Exception e) {
					map.put("error", "1");
					return "jsonView";
				}
				
			}
			
//			if (scores.size()<3){
//				map.put("error", "2");
//				return "jsonView";
//			}
			
			if (winOrLose.equals("1")){
				for(Score score:scores){
					int result = score.getResult();
					int order = 1;
					for(Score loop:scores){
						if (loop.getResult()>result){
							order = order + 1;
						}
					}
					score.setWin(1);
					score.setDraw(0);
					score.setLose(0);
					score.setOrderIndex(order);
					if (level.equals("7")){
						score.setScore(5+6-order);
					}else if (level.equals("9")){
						score.setScore(10+6-order);
					}else if (level.equals("11")){
						score.setScore(15+6-order);
					}
					
				}
			}
			
			try {
				for(Score score:scores){
					scoreService.updateScore(score);
				}
			} catch (Exception e) {
				e.printStackTrace();
			} 
		}
		HttpSession httpSession = request.getSession();
		String userId = httpSession.getAttribute("userId").toString();
		String ip = httpSession.getAttribute("lastloginip").toString();
		userService.addlog(userId, ip, "添加比赛");
		map.put("error", "0");
		return "jsonView";
	}
	
	@RequestMapping(value = "reset", method = RequestMethod.POST)
	@ResponseStatus(value = HttpStatus.ACCEPTED)
	public String resetData(HttpServletRequest request, ModelMap map) {
		scoreService.resetData();
		HttpSession httpSession = request.getSession();
		String userId = httpSession.getAttribute("userId").toString();
		String ip = httpSession.getAttribute("lastloginip").toString();
		userService.addlog(userId, ip, "数据清零");
		return "jsonView";
	}
	
	public int getPageTotal(Integer pageSize, int resultCount) {
		int pageTotal = 1;
		pageTotal = resultCount / pageSize + (resultCount % pageSize > 0 ? 1 : 0);
		pageTotal = pageTotal == 0 ? 1 : pageTotal;
		return pageTotal;
	}
}
