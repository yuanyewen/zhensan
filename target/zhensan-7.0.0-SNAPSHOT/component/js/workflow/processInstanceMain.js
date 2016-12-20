$(function() {

	$("#processInstance_dialog-modal_image").dialog({
		autoOpen : false,
		height : 400,
		width : 500,
		modal : true,
		maximize : true
	});

	$("#processInstance_dialog-modal_info").dialog({
		autoOpen : false,
		height : 400,
		width : 350,
		modal : true
	});

	$("#processInstance_button2").button({
		label : '查询'
	});
	$( "#processInstance_dialog-modal_sure" ).dialog({
		autoOpen: false,
		height: 150,
		width: 200,
		modal: true,
		resizable:false,
		buttons: {
			是: function() {
				// 获得数据
				$("#processInstance_dialog-modal_sure" ).dialog( "close" );
				var rowIndex = $("#processInstance_list").jqGrid(
						'getGridParam', 'selrow');
				var myrow = $('#processInstance_list').jqGrid(
						'getRowData', rowIndex);
				if (myrow.ID_) {
					$
							.getJSON(
									"/ucontent_dm/workflow/processInstance/endProcessinstance",
									{
										"processInstanceId" : myrow.ID_
									},
									function(data) {
										if (data.is_scuess == "false") {
											showDialog(data.result);
											return false;
										} else {
											showDialog("结束流程实例成功");
											$("#processInstance_list").jqGrid().trigger('reloadGrid');
										}

									});
				}
				
			},
			否: function() {
				 $("#processInstance_dialog-modal_sure" ).dialog( "close" );
				 return false;
				
			}
		}
	});

	$("#processInstance_form").submit(	
	     		function(){
	     			var value = $("#processInstance_text1").val();
	     			$("#processInstance_list").jqGrid('setGridParam', {
	     				postData : {
	     					'resourceName' : value,
	     					'page' : 1,
	     					sidx : 'ID_',
	     					sord : 'desc'
	     				}
	     			}).trigger('loadGrid');
			  		return false;
	 	       	}
	    );

	$("#processInstance_button3")
			.button({
				label : '结束流程实例'
			})
			.click(
					function() {
						// 获得数据
						var rowIndex = $("#processInstance_list").jqGrid(
								'getGridParam', 'selrow');
						if (rowIndex == null) {
							 showDialog("请选择需要结束的流程实例");
							 return false;
						}
						 $("#processInstance_dialog-modal_sure" ).dialog( "open" );

					});

	$("#processInstance_button4").button({
		label : '显示流程图'
	}).click(
			function() {
				
				// 得到选中值
				var rowIndex = $("#processInstance_list").jqGrid(
						'getGridParam', 'selrow');
				if (rowIndex == null) {
					showDialog("请选择需要显示流程图");
					return false;
				}
				var myrow = $('#processInstance_list').jqGrid('getRowData',
						rowIndex);
				var processInstanceId = myrow.ID_;
               
				$.getJSON("/ucontent_dm/workflow/processInstance/isHaveDiaGram",
						{
							"processInstanceId" : myrow.ID_
						},
						function(data) {
							if (data.is_scuess == "false") {
								showDialog(data.result);
								return false;
							} else{
								$("#processInstance_dialog-diagram").attr('src',"/ucontent_dm/workflow/processInstance/showDiagram?processInstanceId="
										+ myrow.ID_);
								
								$("#processInstance_dialog-modal_image").dialog({
									autoOpen : true,
									modal : true
								});
								
							}
							
						});
						
			

				
			});

	$("#processInstance_list").jqGrid({
		url : '/ucontent_dm/workflow/processInstance/listProcessinstance',
		mtype : "POST",
		datatype : "json",
		height:gridHeight,
	   	width:gridWidth,
		colNames : [ '流程id', '流程定义名称', '发起人', '发起时间', '版本' ],
		colModel : [ {
			name : 'ID_',
			index : 'ID_',
			width : 60,
			sorttype : "String",
			sortable : true,
			hidden : true
		}, {
			name : 'KEY_',
			index : 'KEY_',
			width : 200,
			align:"center",
			sortable : true
		}, {
			name : 'START_USER_ID_',
			index : 'START_USER_ID_',
			width : 80,
			align:"center",
			sortable : true
		}, {
			name : 'START_TIME_',
			index : 'START_TIME_',
			width : 200,
			align:"center",
			sortable : true
		}, {
			name : 'VERSION_',
			index : 'VERSION_',
			width : 80,
			align:"center",
			sortable : true
		} ],

		pager : '#processInstance_pager',
		jsonReader : {
			id : "ID_"
		},
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		viewrecords : true,
		multiselect : false,
		sortname : 'ID_',
		sortorder : "desc",
		caption : '流程实例监控'
	});

});