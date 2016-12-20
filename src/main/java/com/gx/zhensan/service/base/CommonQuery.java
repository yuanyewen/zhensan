package com.gx.zhensan.service.base;

import java.util.List;
import java.util.Map;

public interface CommonQuery {
	
	/**
	 * <p>不带分页查询</p> 
	 * @param sql 一个完整的查询语句
	 * @return <code>Map<String,Object></code> 返回的结果集
	 */
	public List<Map<String, Object>> query(String sql);
	
	/**
	 * <p>带分页查询</p> 
	 * @param sql 一个完整的查询语句
	 * @param startIndex 起始的条数
	 * @param count 分页的条数
	 * @return <code>Map<String,Object></code> 返回的结果集
	 */
	public List<Map<String, Object>> queryByPage(String sql, int startIndex,int count);
	
}
