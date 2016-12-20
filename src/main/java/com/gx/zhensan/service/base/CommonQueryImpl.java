package com.gx.zhensan.service.base;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.jdbc.SqlRunner;
import org.apache.ibatis.session.SqlSessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.gx.zhensan.util.dialect.Dialect;


public class CommonQueryImpl implements CommonQuery {

	private SqlSessionFactory sqlsessionFactory;
	private Dialect dialect; // 提供分页插件的接口
	private Logger log = LoggerFactory.getLogger(this.getClass());

	public Dialect getDialect() {
		return dialect;
	}

	public void setDialect(Dialect dialect) {
		this.dialect = dialect;
	}

	public SqlSessionFactory getSqlsessionFactory() {
		return sqlsessionFactory;
	}

	public void setSqlsessionFactory(SqlSessionFactory sqlsessionFactory) {
		this.sqlsessionFactory = sqlsessionFactory;
	}

	/**
	 * <p>不带分页查询</p> 
	 * @param sql 一个完整的查询语句
	 * @return <code>Map<String,Object></code> 返回的结果集
	 * @throws UserModuleQueryException
	 */
	public List<Map<String, Object>> query(String sql) {
		return this.doQuery(sql);
	}

	/**
	 * <p>带分页查询</p> 
	 * @param sql 一个完整的查询语句
	 * @param startIndex 起始的条数
	 * @param count 分页的条数
	 * @return <code>Map<String,Object></code> 返回的结果集
	 * @throws UserModuleQueryException
	 */
	public List<Map<String, Object>> queryByPage(String sql, int startIndex, int count) {
		String tmpSql = sqlAddPage(sql, startIndex, count);
		log.info(tmpSql);
		return this.doQuery(tmpSql);
	}

	private List<Map<String, Object>> doQuery(String sql) {
		List<Map<String, Object>> list = null;
		log.info("common sql:" + sql);
		SqlRunner sqlRunner = null;
		try {
			// 创建mybatis的sqlruner
			sqlRunner = new SqlRunner(this.sqlsessionFactory.getConfiguration().getEnvironment().getDataSource().getConnection());
			list = sqlRunner.selectAll(sql);
			sqlRunner.closeConnection();
		} catch (SQLException e) {
			e.printStackTrace();
			if (sqlRunner != null) {
				sqlRunner.closeConnection();
			}
		} finally {
			if (sqlRunner != null) {
				sqlRunner.closeConnection();
			}
		}
		return list;
	}

	/**
	 * <p>sql语句添加分页处理</p> 
	 * @param sql
	 * @return 添加分页处理以后的语句
	 */
	private String sqlAddPage(String sql, int startIndex, int count) {
		String pagesql = this.dialect.getLimitString(sql, startIndex, count);
		return pagesql;
	}
}
