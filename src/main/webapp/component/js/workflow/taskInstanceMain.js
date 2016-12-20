$(function() {

	$("#taskinstance_dialog-modal").dialog({
		autoOpen : false,
		height : 400,
		width : 350,
		modal : true
	});

	$("#taskinstance_dialog-modal_info").dialog({
		autoOpen : false,
		height : 400,
		width : 350,
		modal : true
	});

	$("#taskinstance_searchButton").button({
		label : '查询'
	});

	$("#taskinstance_query").submit(	
	     		function(){
	     			var value = $("#taskInstance_text1").val();
	     			$("#taskinstance_list").jqGrid('setGridParam', {
	     				postData : {
	     					'condition' : value,
	     					'page' : 1,
	     					sidx : 'id',
	     					sord : 'desc'
	     				}
	     			}).trigger('loadGrid');
			  		return false;
	 	       	}
	    );

	$("#taskinstance_list").jqGrid({
		url : '/ucontent_dm/workflow/task/listTask',
		mtype : "POST",
		datatype : "json",
		height:gridHeight,
	   	width:gridWidth,
		colNames : [ 'id', '流程定义名称', '任务名称', '处理人', '开始时间', '结束时间' ],
		colModel : [ {
			name : 'ID_',
			index : 'ID_',
			width : 60,
			sorttype : "int",
			sortable : true,
			hidden : true
		}, {
			name : 'KEY_',
			index : 'KEY_',
			width : 250,
			align:"center",
			sortable : true
		}, {
			name : 'NAME_',
			index : 'NAME_',
			width : 250,
			align:"center",
			sortable : true
		}, {
			name : 'ASSIGNEE_',
			index : 'ASSIGNEE_',
			width : 100,
			align:"center",
			sortable : true
		}, {
			name : 'START_TIME_',
			index : 'START_TIME_',
			width : 150,
			align:"center",
			sortable : true
		}, {
			name : 'END_TIME_',
			index : 'END_TIME_',
			width : 150,
			sortable : true,
			align:"center",
			hidden : true
		} ],
		pager : '#taskinstance_pager',
		jsonReader : {
			id : "ID_"
		},
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		viewrecords : true,
		multiselect : false,
		sortname : 'START_TIME_',
		sortorder : "desc",
		caption : '任务列表'

	});

	$("#taskinstance_assigneeButton").button({
		label : '分配任务'
	}).click(
			function() {
				var taskId = $("#taskinstance_list").jqGrid('getGridParam',
						'selrow');
				if (taskId == null) {
					showDialog("请选择需要重新分配的任务");
					return false;
				}

				$.getJSON("/ucontent_dm/workflow/task/listCandidate", {
					"taskId" : taskId
				}, function(data) {

					if (data.is_scuess == "false") {
						showDialog(data.result);
						return false;
					}
					;
					$("#taskinstance_userlist").jqGrid('clearGridData', false); 
					$("#taskinstance_userlist").jqGrid('setGridParam', {
						data : data.rows
					}).trigger('reloadGrid');

				});

				$("#taskinstance_dialog-modal").dialog({
					autoOpen : true,
					modal : true,
					height : 300,
					title: '用户列表',
					resizable:false,
					buttons: {
		    		分配: function() {
					// 获得数据
					var rowIndex = $("#taskinstance_userlist").jqGrid(
							'getGridParam', 'selrow');
					if (rowIndex == null) {
						showDialog("请选择需要分配的人");
						return false;
					}

					var myrow = $('#taskinstance_userlist').jqGrid('getRowData',
							rowIndex);

					// 刷新列表
					$.getJSON("/ucontent_dm/workflow/task/setAssignee", {
						"taskId" : myrow.taskId,
						"userId" : myrow.userId
					}, function(data) {
						if (data.is_scuess == "false") {
							showDialog( data.result);
							return false;
						}else{
							showDialog("分配成功");
							// 重刷新列表
							$("#taskinstance_list").jqGrid().trigger('reloadGrid');
						};
						
						// 关闭弹出框
						$("#taskinstance_dialog-modal").dialog("close");

					});
		          		             }
	  			              }
				});
			});

	$("#taskinstance_userlist").jqGrid({
		datatype : "local",
		colNames : [ '用户id', '用户名称', 'taskId' ],
		colModel : [ {
			name : 'userId',
			index : 'userId',
			align:"center",
			width : 150,
			sortable : true
		}, {
			name : 'userName',
			index : 'userName',
			width : 150,
			align:"center",
			sortable : true
		}, {
			name : 'taskId',
			index : 'taskId',
			width : 150,
			sortable : true,
			align:"center",
			hidden : true
		} ]
	
	});

	
});
