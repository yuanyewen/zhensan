package com.gx.zhensan.util.dialect;

/**
 * 方言接口（各种数据库可实现自己的实现类）
 * 
 * @author liuyi
 * @version 1.0 2011-3-9
 * @since 1.0
 */
public interface Dialect {

	boolean supportsLimit();

	boolean supportsLimitOffset();

	String getLimitString(String sql, int offset, int limit);

}
