$(function(){
	$.ajaxSetup ({
	    cache: false //关闭AJAX相应的缓存
	});
  $( "#processDefinition_dialog-form" ).dialog({
			autoOpen: false,
			height: 200,
			width: 400,
			modal: true,
			resizable:false,
			buttons: {
				添加多个文件: function() {
					var processDefinition_file =$("<div><input id='afile' type='file' name='afile' size='40'/></div>").appendTo($("#processDefinition_fileList"));
					var processDefinition_button = $("<input  class=\"ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only\"  name=\"processDefinition_streamDelete\" type=\"button\" value=\"删除\"/>").click(function(){$(this).parent().remove();}).appendTo(processDefinition_file);
					 processDefinition_button.button({
						  label:'删除'
					  });
				},
				导入流程文件: function() {
					$("#upLodad").submit();
				},
				取消: function() {
					$( this ).dialog( "close" );
				}
			}
		});
		
  $( "#processDefinition_dialog-modal" ).dialog({
			autoOpen: false
		});
		
		
  $( "#processDefinition_button1" ).button({
		label: '导入流程文件'
    });
 
  $( "#processDefinition_button1" ).unbind('click').click(function(){
	  
	  $('#processDefinition_fileList').html("");
	  var processDefinition_file =$("<div><input id='afile' type='file' name='afile' size='40'/></div>").appendTo($("#processDefinition_fileList"));
	  var processDefinition_button = $("<input name=\"processDefinition_streamDelete\" type=\"button\" value=\"删除\"/>").click(function(){$(this).parent().remove();}).appendTo(processDefinition_file);
	  processDefinition_button.button({
		  label:'删除'
	  });
      $( "#processDefinition_dialog-form" ).dialog( "open" );
  });
 
    
   $( "#processDefinition_button2" ).button({
		label: '查询'
    });
   $("#processDefinition_query").submit(	
     		function(){
     			 var value = $("#processDefinitio_text1").val();
    			 $("#processDefinition_list").jqGrid('setGridParam', {
    				 postData : {'resourceName':value}
    				}).trigger('loadGrid');
		  		return false;
 	       	}
    );

    $( "#processDefinition_button3" ).button({
		label: '恢复流程定义'
    });
    
    $( "#processDefinition_button3" ).bind('click',function(){
    
       var rowIndex = $("#processDefinition_list").jqGrid('getGridParam', 'selrow');
       if(rowIndex == null){
    	   showDialog("请选择需要恢复的流程");
           return false;
       }
	   var myrow = $('#processDefinition_list').jqGrid('getRowData',rowIndex);
    
       $.post('/ucontent_dm/workflow/processDefinition/resumeProcessDefinition',{ids:myrow.ID_},function(data) {   
            if(data.is_scuess == "false"){
              showDialog(data.result);
			  return false;
            }else{
            	 showDialog("流程恢复成功");
            	 $("#processDefinition_list").jqGrid().trigger('reloadGrid');
            };
		 
       });  
       
       
     });
     
   $( "#processDefinition_button4" ).button({
		label: '禁用流程定义'
    });
   
    
    $( "#processDefinition_button4" ).bind('click',function(){
       var rowIndex = $("#processDefinition_list").jqGrid('getGridParam', 'selrow');
       if(rowIndex == null){
    	   showDialog("请选择需要禁用的流程");
           return false;
       }
	   var myrow = $('#processDefinition_list').jqGrid('getRowData',rowIndex);
      
       $.post('/ucontent_dm/workflow/processDefinition/suspendProcessDefinition',{ids:myrow.ID_},function(data) {   
         if(data.is_scuess == "false"){
        	  showDialog(data.result);
			  return false;
            }else{
            	 showDialog("禁用流程成功");
            	 $("#processDefinition_list").jqGrid().trigger('reloadGrid');
            };
		
       });  
      
     
      
    
    }); 
      
  $( "#processDefinition_button5" ).button({
		label: '删除流程定义'
    });
    
   $( "#processDefinition_button5" ).bind('click',function(){
       var rowIndex = $("#processDefinition_list").jqGrid('getGridParam', 'selrow');
       if(rowIndex == null){
    		 showDialog("请选择需要删除的流程");
             return false;
       }
	   var myrow = $('#processDefinition_list').jqGrid('getRowData',rowIndex);
      
       $.post('/ucontent_dm/workflow/processDefinition/deleteDeployment',{ids: myrow.ID_},function(data) { 
         if(data.is_scuess == "false"){
        	  showDialog(data.result);
			  return false;
          }else{
        	  showDialog("删除流程成功");
        	  $("#processDefinition_list").jqGrid().trigger('reloadGrid');
          };  
		
       });  
    }); 
    
  $( "#processDefinition_button6" ).button({
		label: '卸载流程定义'
    });
    
    $( "#processDefinition_button6" ).bind('click',function(){
        var rowIndex = $("#processDefinition_list").jqGrid('getGridParam', 'selrow');
        if(rowIndex == null){
           showDialog("请选择需要卸载的流程");
           return false;
       }
	    var myrow = $('#processDefinition_list').jqGrid('getRowData',rowIndex);
      
       $.post('/ucontent_dm/workflow/processDefinition/uninstallDeployment',{ids:myrow.ID_},function(data) {
          if(data.is_scuess == "false"){
        	  showDialog(data.result);
			  return false;
           }else{
        	    showDialog("卸载流程成功");
        	    $("#processDefinition_list").jqGrid().trigger('reloadGrid');
           };  
		 
       });  
    });
    
   $("#processDefinition_list").jqGrid({
    url:'/ucontent_dm/workflow/processDefinition/listProcessDefinition',
 	mtype: "POST",
   	datatype: "json",
   	height:gridHeight,
   	width:gridWidth,
   	colNames:['id','流程定义名称', '当前版本','创建时间','状态'],
   	colModel:[
   		{name:'ID_',index:'ID_', width:60, sorttype:"String",sortable:true,hidden:true},
   		{name:'KEY_',index:'KEY_', width:150,align:"center",sortable:true},
   		{name:'VERSION_',index:'VERSION_',align:"center", width:80,sortable:true},
   		{name:'DEPLOY_TIME_',index:'DEPLOY_TIME_', align:"center",width:250,sortable:true},		
   		{name:'STATUS',index:'STATUS',align:"center", width:120,sortable:false}
   	],
   	
   
    pager: '#processDefinition_pager',
    jsonReader : {
		id: "ID_"
    },
    rowNum:10,
    rowList:[10,20,30],
    viewrecords: true,
    multiselect:false,
	sortname: 'ID_',
    sortorder: "desc",
    caption: '流程定义管理'
    
  });  
  
    
 
 
 
    $( "#processDefinition_button8" ).button({
		label: '发起流程'
    }); 
    
    $( "#processDefinition_button8" ).bind('click',function(){
        var rowIndex = $("#processDefinition_list").jqGrid('getGridParam', 'selrow');
        if(rowIndex == null){
           showDialog("请选择需要发起的流程");
           return false;
       }
	    var myrow = $('#processDefinition_list').jqGrid('getRowData',rowIndex);
      
       $.post('/ucontent_dm/workflow/processDefinition/startProcessInstance',{ids:myrow.ID_},function(data) {   
         if( data.is_scuess == "false"){
        	  showDialog(data.result);
			  return false;
            }else{
            	 showDialog("发起流程成功");
            	 $("#processDefinition_list").jqGrid().trigger('reloadGrid');
            }
		
       });  
    });
    
   $("#upLodad").unbind('submit').bind('submit', function() {// 绑定form
	 

        $(this).ajaxSubmit(function(data) { 
               var  arr = data.split("|");  
         	   if(arr[0]== "scuess"){
         		  $( "#processDefinition_dialog-form" ).dialog(
         			  "close");
         		  showDialog(arr[1]);
         		 $("#processDefinition_list").jqGrid().trigger('reloadGrid');
         	   }else if(arr[0]== "false"){
         		  showDialog(arr[1]);
      			  return false;
         	   }
        	
        }); 
        return false;
         
     }); 

 });


