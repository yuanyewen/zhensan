package com.gx.zhensan.service.base;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.jdbc.SqlRunner;
import org.apache.ibatis.session.SqlSessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.gx.zhensan.util.dialect.Dialect;


/**
 * <p>用户模块通用SQL执行语句实现类</p>
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
public class ExCommonImpl implements ExCommon {

	private SqlSessionFactory sqlsessionFactory;
	private Dialect dialect; // 提供分页插件的接口
	private Logger log = LoggerFactory.getLogger(this.getClass());

	private final String INSERT = "insert";
	private final String UPDATE = "update";
	private final String DELETE = "delete";

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

	public List<Map<String, Object>> query(String sql)  {
		try {
			return this.doQuery(sql);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public List<Map<String, Object>> queryByPage(String sql, int startIndex, int count) {
		try {
			String tmpSql = sqlAddPage(sql, startIndex, count);
			log.info(tmpSql);
			return this.doQuery(tmpSql);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public void insert(String sql) {
		try {
			this.doSave(sql, INSERT);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void update(String sql) {
		try {
			this.doSave(sql, UPDATE);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void delete(String sql) {
		try {
			this.doSave(sql, DELETE);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private void doSave(String sql, String flag) {
		log.info("common sql:" + sql);
		SqlRunner sqlRunner = null;
		try {
			sqlRunner = new SqlRunner(this.sqlsessionFactory.getConfiguration().getEnvironment().getDataSource().getConnection());
			if (flag.equals(this.INSERT)) {
				sqlRunner.insert(sql);
			} else if (flag.equals(this.UPDATE)) {
				sqlRunner.update(sql);
			} else if (flag.equals(this.DELETE)) {
				sqlRunner.delete(sql);
			}
		} catch (SQLException e) {
			if (sqlRunner != null) {
				sqlRunner.closeConnection();
			}
			e.printStackTrace();
		} finally {
			if (sqlRunner != null) {
				sqlRunner.closeConnection();
			}
		}
	}

	private List<Map<String, Object>> doQuery(String sql) {
		List<Map<String, Object>> list = null;
		log.info("common sql:" + sql);
		SqlRunner sqlRunner = null;
		try {
			sqlRunner = new SqlRunner(this.sqlsessionFactory.getConfiguration().getEnvironment().getDataSource().getConnection());
			list = sqlRunner.selectAll(sql);
		} catch (SQLException e) {
			if (sqlRunner != null) {
				sqlRunner.closeConnection();
			}
			e.printStackTrace();
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
