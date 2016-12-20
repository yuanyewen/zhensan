package com.gx.zhensan.service;

import java.util.List;
import java.util.Map;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Service;

import com.gx.zhensan.domain.Score;
import com.gx.zhensan.domain.Score;
import com.gx.zhensan.domain.User;
import com.gx.zhensan.service.base.CommonQuery;
import com.gx.zhensan.service.base.ExCommon;


@Service
public class ScoreService {
	
	public ApplicationContext context;
	public CommonQuery commonQuery;
	public ExCommon exCommon;
	
	public List<Map<String, Object>> getScore(Integer pageIndex, Integer pageSize, 
			String sortName, String sord, String userName){
		context = new ClassPathXmlApplicationContext(new String[] { "applicationContext.xml" });
		commonQuery = (CommonQuery) context.getBean("commonQuery");
		String sql = "SELECT * FROM ZS_SCORE ORDER BY " + sortName + " " + sord;
		int startIndex = 0;
		startIndex = (pageIndex - 1) * pageSize;
		List<Map<String, Object>> result = commonQuery.queryByPage(sql, startIndex, pageSize);
		commonQuery = null;
		return result;
	}
	
	public void updateScore(Score score){
		context = new ClassPathXmlApplicationContext(new String[] { "applicationContext.xml" });
		exCommon = (ExCommon) context.getBean("exCommon");
		String sql = "UPDATE ZS_SCORE SET GAMECOUNT=GAMECOUNT+1,"+
										"WIN=WIN+"+score.getWin()+","+
										"DRAW=DRAW+"+score.getDraw()+","+
										"LOSE=LOSE+"+score.getLose()+","+
										"BEAT=BEAT+"+score.getBeat()+","+
										"DIE=DIE+"+score.getDie()+","+
										"ASSIST=ASSIST+"+score.getAssist()+","+
										"SCORE=SCORE+"+score.getScore()+" "+
										"WHERE USERID="+score.getUserId();
		exCommon.update(sql);
		exCommon = null;
	}
	
	public void resetData(){
		context = new ClassPathXmlApplicationContext(new String[] { "applicationContext.xml" });
		exCommon = (ExCommon) context.getBean("exCommon");
		String sql = "UPDATE ZS_SCORE SET GAMECOUNT=0,WIN=0,DRAW=0,LOSE=0,BEAT=0,DIE=0,ASSIST=0,SCORE=0";
		exCommon.update(sql);
		exCommon = null;
	}
	
	public Score getScore(int id){
		Score score = new Score();
		context = new ClassPathXmlApplicationContext(new String[] { "applicationContext.xml" });
		commonQuery = (CommonQuery) context.getBean("commonQuery");
		String sql = "SELECT * FROM ZS_SCORE WHERE ID="+id;
		List<Map<String, Object>> result = commonQuery.query(sql);
		if (result!=null && result.size()>0){
			score.setId(Integer.valueOf(result.get(0).get("ID").toString()));
			score.setUserId(Integer.valueOf(result.get(0).get("USERID").toString()));
			score.setUserName(result.get(0).get("USERNAME").toString());
			score.setGameCount(Integer.valueOf(result.get(0).get("GAMECOUNT").toString()));
			score.setWin(Integer.valueOf(result.get(0).get("WIN").toString()));
			score.setDraw(Integer.valueOf(result.get(0).get("DRAW").toString()));
			score.setLose(Integer.valueOf(result.get(0).get("LOSE").toString()));
			score.setBeat(Integer.valueOf(result.get(0).get("BEAT").toString()));
			score.setDie(Integer.valueOf(result.get(0).get("DIE").toString()));
			score.setAssist(Integer.valueOf(result.get(0).get("ASSIST").toString()));
			score.setScore(Integer.valueOf(result.get(0).get("SCORE").toString()));
			score.setOrderIndex(0);
			score.setResult(0);
		}
		commonQuery = null;
		return score;
	}
	
	public Score getScoreByUserId(int userId){
		Score score = new Score();
		context = new ClassPathXmlApplicationContext(new String[] { "applicationContext.xml" });
		commonQuery = (CommonQuery) context.getBean("commonQuery");
		String sql = "SELECT * FROM ZS_SCORE WHERE USERID="+userId;
		List<Map<String, Object>> result = commonQuery.query(sql);
		if (result!=null && result.size()>0){
			score.setId(Integer.valueOf(result.get(0).get("ID").toString()));
			score.setUserId(Integer.valueOf(result.get(0).get("USERID").toString()));
			score.setUserName(result.get(0).get("USERID").toString());
			score.setGameCount(Integer.valueOf(result.get(0).get("GAMECOUNT").toString()));
			score.setWin(Integer.valueOf(result.get(0).get("WIN").toString()));
			score.setDraw(Integer.valueOf(result.get(0).get("DRAW").toString()));
			score.setLose(Integer.valueOf(result.get(0).get("LOSE").toString()));
			score.setBeat(Integer.valueOf(result.get(0).get("BEAT").toString()));
			score.setDie(Integer.valueOf(result.get(0).get("DIE").toString()));
			score.setAssist(Integer.valueOf(result.get(0).get("ASSIST").toString()));
			score.setScore(Integer.valueOf(result.get(0).get("SCORE").toString()));
		}
		commonQuery = null;
		return score;
	}
	
	public void addUserScore(int id, String userName, int iniScore){
		try {
			context = new ClassPathXmlApplicationContext(new String[] { "applicationContext.xml" });
			exCommon = (ExCommon) context.getBean("exCommon");
			String sql = "INSERT INTO ZS_SCORE(" +
						 "USERID,USERNAME,GAMECOUNT,WIN,DRAW,LOSE,BEAT," +
						 "DIE,ASSIST,SCORE) VALUES("+id+",'"+userName+"',0,0,0,0,0,0,0,"+iniScore+") ";
			System.out.println(sql);
			exCommon.insert(sql);
			exCommon = null;
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	} 
	
	
//	public static void main(String[] args) {
//		ApplicationContext context;
//		CommonQuery commonQuery;
//		//ExCommon exCommon;
//		context = new ClassPathXmlApplicationContext(new String[] { "applicationContext.xml" });
//		commonQuery = (CommonQuery) context.getBean("commonQuery");
//		//exCommon = (ExCommon) context.getBean("exCommon");
//		
//		List<Map<String, Object>> query = commonQuery.query("SELECT * FROM ZS_SCORE ORDER BY ID");
//		for (Map<String, Object> map:query) {
//			System.out.println(map.get("USERNAME").toString());
//		}
//	}
	
}
