package com.gx.zhensan.service.base;

import java.util.List;
import java.util.Map;

/**
 * <p>用户模块通用SQL执行语句接口</p>
 * @version 7.0
 * @author yuanyw
 * <p>
 *   <b>创建时间： </b>2011-5-25
 * </p>
 * <p>
 *   <b>修改人： </b>
 * </p>
 * <p>
 *   <b>修改时间： </b>
 * </p>
 */
public interface ExCommon {

	/**
	 * <p>通过sql执行新增语句</p> 
	 * @param sql 一个完整的查询语句
	 */
	public void insert(String sql);

	/**
	 * <p>通过sql执行更新语句</p> 
	 * @param sql 一个完整的查询语句
	 */
	public void update(String sql);

	/**
	 * <p>通过sql执行删除语句</p> 
	 * @param sql 一个完整的查询语句
	 * @throws UserModuleQueryException 用户模块查询异常
	 */
	public void delete(String sql);

	/**
	 * <p>通过sql返回查询的结果集</p> 
	 * @param sql 一个完整的查询语句
	 * @return <code>Map<String,Object></code> 返回的结果集
	 */
	public List<Map<String, Object>> query(String sql);

	/**
	 * <p>通过sql返回分页查询的结果集</p> 
	 * @param sql 一个完整的查询语句
	 * @return <code>Map<String,Object></code> 返回的结果集
	 */
	public List<Map<String, Object>> queryByPage(String sql, int startIndex, int count);

}
