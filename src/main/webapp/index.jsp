<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<title>欢迎进入2叔的爱真三积分系统</title>
<link rel="stylesheet"
	href="component/themes/ui-lightness/component.css" />
<link rel="stylesheet"
	href="component/themes/ui-lightness/content/tango/skin.css" />

<script src="component/js/jquery-1.6.1.min.js"></script>
<script src="component/js/jquery.layout-1.3.0.js"></script>
<script src="component/js/ui/jquery.effects.core.js"></script>
<script src="component/js/ui/jquery.effects.blind.js"></script>
<script src="component/js/ui/jquery.effects.bounce.js"></script>
<script src="component/js/ui/jquery.effects.clip.js"></script>
<script src="component/js/ui/jquery.effects.drop.js"></script>
<script src="component/js/ui/jquery.effects.explode.js"></script>
<script src="component/js/ui/jquery.effects.fade.js"></script>
<script src="component/js/ui/jquery.effects.fold.js"></script>
<script src="component/js/ui/jquery.effects.highlight.js"></script>
<script src="component/js/ui/jquery.effects.pulsate.js"></script>
<script src="component/js/ui/jquery.effects.scale.js"></script>
<script src="component/js/ui/jquery.effects.shake.js"></script>
<script src="component/js/ui/jquery.effects.slide.js"></script>
<script src="component/js/ui/jquery.effects.transfer.js"></script>

<script src="component/js/ui/jquery.ui.core.js"></script>
<script src="component/js/ui/jquery.ui.widget.js"></script>
<script src="component/js/ui/jquery.ui.accordion.js"></script>
<script src="component/js/ui/jquery.ui.position.js"></script>
<script src="component/js/ui/jquery.ui.menu.uc7.js"></script>
<script src="component/js/ui/jquery.ui.autocomplete.js"></script>
<script src="component/js/ui/jquery.ui.button.js"></script>
<script src="component/js/i18n/jquery.ui.datepicker-zh-CN.js"></script>
<script src="component/js/ui/jquery.ui.datepicker.js"></script>
<script src="component/js/ui/jquery.ui.dialog.js"></script>
<script src="component/js/ui/jquery.ui.mouse.js"></script>
<script src="component/js/ui/jquery.ui.draggable.js"></script>

<script src="component/js/ui/jquery.ui.droppable.js"></script>


<script src="component/js/ui/jquery.ui.progressbar.js"></script>
<script src="component/js/ui/jquery.ui.resizable.js"></script>
<script src="component/js/ui/jquery.ui.selectable.js"></script>
<script src="component/js/ui/jquery.ui.slider.js"></script>
<script src="component/js/ui/jquery.ui.sortable.js"></script>

<script src="component/js/ui/jquery.ui.tabs.js"></script>

<script src="component/js/ui/jquery.ui.util.uc7.js"></script>
<script src="component/js/i18n/grid.locale-cn.js"></script>
<script src="component/js/jquery.form.js"></script>
<script src="component/js/ui/jquery.fmatter.js"></script>
<script src="component/js/ui/jquery.grid.base.js"></script>
<script src="component/js/content/jquery.jcarousel.min.js"></script>

<script src="component/js/ui/jquery.ui.toolbar.uc7.js"></script>
<script src="component/js/ui/jquery.ui.modulemenu.uc7.js"></script>
<script src="component/js/ui/jquery.ui.listbox.uc7.js"></script>
<script src="component/js/ui/jquery.ui.tree.uc7.js"></script>
<script src="component/js/ui/jquery.ui.checkbox.uc7.js"></script>
<script src="component/js/ui/jquery.ui.radio.uc7.js"></script>
<script src="component/js/ui/jquery.ui.promptdialog.uc7.js"></script>
<script src="component/js/ui/jquery.ui.groupbutton.uc7.js"></script>
<script src="component/js/jquery.validate.js"></script>
<script src="component/js/jquery.validate.uc7.js"></script>
<script src="component/js/i18n/messages_cn.js" ></script>

<script type="text/javascript">
	$(function() {
		
		$.ajaxSetup ({
		    cache: false, //关闭AJAX相应的缓存

		    statusCode: {
		        403: function() {
					window.location.href='login.html'
		        }
		      }
		});
		
		var myLayout;
		//布局
		myLayout = $('body').layout({
			north__resizable : false,//不可以改变大小 
			north__size : 140,//pane的大小  
			south__resizable : false,
			south__size : 30,
			west__size : 250,
			west__spacing_closed : 20,
			west__togglerLength_closed : 100,
			west__togglerAlign_closed : "top",
			west__togglerContent_closed : "M<BR>E<BR>N<BR>U",
			west__togglerTip_closed : "打开菜单",
			west__sliderTip : "滑动打开菜单",
			west__slideTrigger_open : "mouseover",
			west__onresize_end : 	function(){$('.ui-layout-west').moduleMenu('reloadHeight',$('.ui-layout-west').height());},
			togglerTip_open:"关闭",
		    togglerTip_closed:"打开"
		});
		
		$( "#addScore" ).button({
    		label: '添加比赛结果'
        });
		
		$( "#addScore" ).bind('click',function(){　
      		$("#addScore_form").dialog( "open" );
      		$('#addScore_user1').empty();
			$("<option value=\"\">--请选择--</option>").appendTo("#addScore_user1");
			$('#addScore_user2').empty();
			$("<option value=\"\">--请选择--</option>").appendTo("#addScore_user2");
			$('#addScore_user3').empty();
			$("<option value=\"\">--请选择--</option>").appendTo("#addScore_user3");
			$('#addScore_user4').empty();
			$("<option value=\"\">--请选择--</option>").appendTo("#addScore_user4");
			$('#addScore_user5').empty();
			$("<option value=\"\">--请选择--</option>").appendTo("#addScore_user5");
			
			$('#addScore_user1').attr("value","");
            $('#addScore_kill1').attr("value","");
            $('#addScore_die1').attr("value","");
            $('#addScore_ass1').attr("value","");
            
            $('#addScore_user2').attr("value","");
            $('#addScore_kill2').attr("value","");
            $('#addScore_die2').attr("value","");
            $('#addScore_ass2').attr("value","");
            
            $('#addScore_user3').attr("value","");
            $('#addScore_kill3').attr("value","");
            $('#addScore_die3').attr("value","");
            $('#addScore_ass3').attr("value","");
            
            $('#addScore_user4').attr("value","");
            $('#addScore_kill4').attr("value","");
            $('#addScore_die4').attr("value","");
            $('#addScore_ass4').attr("value","");
            
            $('#addScore_user5').attr("value","");
            $('#addScore_kill5').attr("value","");
            $('#addScore_die5').attr("value","");
            $('#addScore_ass5').attr("value","");
            
            $('#winOrLose').attr("value","0");
			
      		$.ajax({
				type: "GET",  
				url: "score/getUsers",
				success: function(data){
					var ids = data.ids;
					var names = data.names;
					if(ids){
						for(var i = 0; i < ids.length; i++){
							$("<option value=\"" + ids[i] + "\">" + names[i] + "</option>").appendTo("#addScore_user1");
							$("<option value=\"" + ids[i] + "\">" + names[i] + "</option>").appendTo("#addScore_user2");
							$("<option value=\"" + ids[i] + "\">" + names[i] + "</option>").appendTo("#addScore_user3");
							$("<option value=\"" + ids[i] + "\">" + names[i] + "</option>").appendTo("#addScore_user4");
							$("<option value=\"" + ids[i] + "\">" + names[i] + "</option>").appendTo("#addScore_user5");
						}
						$("<option value=\"" + "0" + "\">" + "路人" + "</option>").appendTo("#addScore_user1");
						$("<option value=\"" + "0" + "\">" + "路人" + "</option>").appendTo("#addScore_user2");
						$("<option value=\"" + "0" + "\">" + "路人" + "</option>").appendTo("#addScore_user3");
						$("<option value=\"" + "0" + "\">" + "路人" + "</option>").appendTo("#addScore_user4");
						$("<option value=\"" + "0" + "\">" + "路人" + "</option>").appendTo("#addScore_user5");
					}
				
				} 
			});
    	});

      	$("#addScore_form").dialog({
    		autoOpen: false,
    		height: 350,
    		width: 700,
    		modal: true,
    		resizable:false,
    		autoOpen: false,
			close: function(event, ui) {
				$('#addScore_user1').empty();
				$("<option value=\"\">--请选择--</option>").appendTo("#addScore_user1");
				$('#addScore_user2').empty();
				$("<option value=\"\">--请选择--</option>").appendTo("#addScore_user2");
				$('#addScore_user3').empty();
				$("<option value=\"\">--请选择--</option>").appendTo("#addScore_user3");
				$('#addScore_user4').empty();
				$("<option value=\"\">--请选择--</option>").appendTo("#addScore_user4");
				$('#addScore_user5').empty();
				$("<option value=\"\">--请选择--</option>").appendTo("#addScore_user5");
			},
    		buttons: {
    		添加: function() {
    			var scoreInfo = {
    					"winOrLose":$('#winOrLose').val(),
    					"level":$('#level').val(),
    	                "scores": []
    	            };
    			var scores = [];
    			scores.push({
                    "id": $('#addScore_user1').val(),
                    "kill": $('#addScore_kill1').val(),
                    "die": $('#addScore_die1').val(),
                    "assist": $('#addScore_ass1').val()
                });
    			scores.push({
                    "id": $('#addScore_user2').val(),
                    "kill": $('#addScore_kill2').val(),
                    "die": $('#addScore_die2').val(),
                    "assist": $('#addScore_ass2').val()
                });
    			scores.push({
                    "id": $('#addScore_user3').val(),
                    "kill": $('#addScore_kill3').val(),
                    "die": $('#addScore_die3').val(),
                    "assist": $('#addScore_ass3').val()
                });
    			scores.push({
                    "id": $('#addScore_user4').val(),
                    "kill": $('#addScore_kill4').val(),
                    "die": $('#addScore_die4').val(),
                    "assist": $('#addScore_ass4').val()
                });
    			scores.push({
                    "id": $('#addScore_user5').val(),
                    "kill": $('#addScore_kill5').val(),
                    "die": $('#addScore_die5').val(),
                    "assist": $('#addScore_ass5').val()
                });
    			scoreInfo.scores = scores;
    			var scoreStr = JSON.stringify(scoreInfo);
    			
    			$.post('score/add',{'scoreStr': scoreStr},function(data) {  
    				var msg = data.error;
			  		if (msg=="1"){
			  			showUserDialog("输入信息有误！");
			  		}
			  		//else if (msg=="2"){
			  		//	showUserDialog("参加选手不可少于三人");
			  		//}
			  		else{
			  			$("#addScore_form").dialog( "close" );
			  			showUserDialog("添加成功!");
			  			$("#score_list").jqGrid().trigger('loadGrid');
			  			
			  		}; 
	  				
	        	}); 
	    	  	
          	},
    		取消: function() {
    				$( this ).dialog( "close" );
    			}
    		}
    	});
		
		//$( "#addUser" ).button({
    	//	label: '添加成员'
        //});
		
		$( "#reset" ).button({
    		label: '数据清零'
        });
		
		$('#index_ConfirmDIV').promptDialog();
		
		$( "#reset" ).bind('click',function(){　
			$('#index_ConfirmDIV').promptDialog('confirmMessage',{title:'确定将数据清零',message:'确定将数据清零（清零后不可恢复）？',callback:function(){
				$.post('score/reset',{},function(data) {  
					showUserDialog("操作成功!");
					$("#score_list").jqGrid().trigger('loadGrid');
	        	}); 
			}});
		});
		
		$("#modiPic").bind('click',function(){
			$("#index_modiPic").dialog( "open" );
		});
		
		$( "#index_modiPic" ).dialog({
			autoOpen: false,
			height: 150,
			width: 400,
			modal: true,resizable:false,
			buttons: {
				修改: function() {
					$('#modiPic_Form').ajaxSubmit({
			        	url : 'main/modiPic',
			        	type : 'POST',
			        	success : function(data) {
			        		alert("修改成功！");
			        		$( this ).dialog( "close" );
			        		window.location.href='index.jsp';
			            },
			           	error: function(jqXHR, textStatus, errorThrown) {
			           		
			           	}
			        });
			    },
				取消: function() {
					$( this ).dialog( "close" );
				}
			}
		});
		
		$("#userInfo").bind('click',function(){
			$.ajax({
				type: "GET",  
				url: "main/getCurrentUser",
				success: function(data){
					$("#info_userId").attr("value",data.userId);
					$("#info_userId").attr("disabled",true);
					$("#info_userName").attr("value",data.userName);
					$("#info_qq").attr("value",data.qq);
					$("#info_phone").attr("value",data.phone);
					$("#info_email").attr("value",data.email);
					$("#info_description").attr("value",data.des);
					if (data.pic==""){
						$("#info_pic").attr("src","component/themes/ui-lightness/images/3333.jpg"); 
					}else{
						$("#info_pic").attr("src","pics/"+data.pic+".jpg"); 
					}
					
				} 
			});
			$("#index_userinfo").dialog( "open" );
		});
		
		
		$( "#index_userinfo" ).dialog({
			autoOpen: false,
			height: 380,
			width: 580,
			modal: true,resizable:false,
			buttons: {
				修改: function() {
					$('#index_ConfirmDIV').promptDialog('confirmMessage',
						{title:'确定修改',message:'确定修改？',callback:function(){
							var userId = $('#info_userId').val();
							var userName = $('#info_userName').val();
							var qq = $('#info_qq').val();
							var phone = $('#info_phone').val();
							var email = $('#info_email').val();
							var des = $('#info_description').val();
							$.post('main/modiUser',{'userId': userId,'userName':userName,'qq': qq,'phone':phone,'email': email,'des':des},function(data) {  
			    				var msg = data.msg;
						  		if (msg=="1"){
						  			showUserDialog("修改成功!");
						  			$( this ).dialog( "close" );
						  			window.location.href='index.jsp'
						  		}
				        	}); 
					}});
			    },
				取消: function() {
					$( this ).dialog( "close" );
				}
			}
		});
		
		
		$("#logout").bind('click',function(){
			$('#index_ConfirmDIV').promptDialog('confirmMessage',
					{title:'确定退出',message:'确定退出？',callback:function(){
				window.location.href='main/logout';
			}});
		});
		
		$("#changePass").bind('click',function(){
			$("#index_changePassword_form").dialog( "open" );
			$("#index_newPassword").val("");
			$("#index_reNewPassword").val("");
		});
		
		$( "#index_changePassword_form" ).dialog({
			autoOpen: false,
			height: 260,
			width: 550,
			modal: true,resizable:false,
			buttons: {
				确定: function() {	
					var userId=$("#index_changePass_userId").text();
					var oldPassword=$("#login_oldPassword").val();
					var newPassword=$("#index_newPassword").val();
					var reNewPassword=$("#index_reNewPassword").val();

					if (reNewPassword!=newPassword) {
						showUserDialog("两次输入密码不一致!");
					}else{
						$.post('main/changePass',{userId:userId,newPassword:newPassword},function(data) {
							var msg = data.error;
					  		if (msg!=null){
					  			showDialog(msg);
					  		}else{
					  			$("#dm_contentTreeMessage").text("密码修改成功,请重新登录");
					  		 	$("#dm_contentTreeInfo").dialog({
					  		 		autoOpen: true,
					  		 		height: 150,
					  		 		modal: true,
					  				buttons: {
					  					确定: function() {
					  		    	  		$(this).dialog("close");
					  		    	  		$( "#index_changePassword_form" ).dialog( "close" );	
							  				window.location.href='main/logout';
					  		      		}
					  				}
					  		 	})
					  			
					  		}; 
						});
					}

			    },
				取消: function() {
					$( this ).dialog( "close" );
				}
			}
		});
		
		function treeInfoDialog(info) {
			$("#dm_contentTreeMessage").text(info);
		 	$("#dm_contentTreeInfo").dialog({
		 		autoOpen: true,
		 		height: 150,
		 		modal: true,
				buttons: {
					确定: function() {
		    	  		$(this).dialog("close");
		      		}
				}
		 	})
		}	
		
		$.ajax({
			type: "GET",  
			url: "main/getCurrentUser",
			success: function(data){
				$("#index_userId").text(data.userId);
				$("#index_userName").text(data.userName);
				$("#index_loginTime").text(data.lastlogindate);
				$("#index_loginIP").text(data.lastloginip);
				$("#index_changePass_userId").text(data.userId);
				$("#index_changePass_userName").text(data.userName);
				if (data.pic==""){
					$("#user_pic").attr("src","component/themes/ui-lightness/images/3333.jpg"); 
				}else{
					$("#user_pic").attr("src","pics/"+data.pic+".jpg"); 
				}
				
			} 
		});
		
		$("#score_list").jqGrid({
		    url:'score/list',
		 	mtype: "POST",
		   	datatype: "json",

		   	height:250,
		   	width:850,
		   	
		   	colNames:['用户ID','姓名', '比赛场数','胜', '平','负','击杀','死亡','助攻','总积分'],
		   	colModel:[
		   		{name:'userId',index:'userId', width:50, align:"center",sortable:true,hidden:true},
		   		{name:'userName',index:'userName', width:80, align:"center",sortable:true},
		   		{name:'gamecount',index:'gamecount', width:50, align:"center",sortable:true},
		   		{name:'win',index:'win', width:50, align:"center",sortable:true},
		   		{name:'draw',index:'draw', width:50, align:"center",sortable:true,hidden:false},		
		   		{name:'lose',index:'lose', width:50, align:"center",sortable:true,hidden:false},
		   		{name:'kill',index:'BEAT', width:50, align:"center",sortable:true},
		   		{name:'die',index:'die', width:50, align:"center",sortable:true},
		   		{name:'assist',index:'assist', width:50, align:"center",sortable:true,hidden:false},
		   		{name:'score',index:'score', width:50, align:"center",sortable:true,hidden:false}
		   	],
		   	
		    pager: '#score_pager',
		    jsonReader : {
				id: "userId"
		    },
		    rowNum:10,
		    rowList:[10,20,30],
		    viewrecords:true,
		    multiselect:false,
			sortname: 'SCORE',
		    sortorder: "DESC",
		    caption: '战绩积分榜',
		    onSelectRow:function(rowid){
		    },

		    onClickLink:function(id){
		    	//getUserInfo(id);
		    }
		    
		  }); 
		
		function showUserDialog(info) {
		 	$("#user_message").text(info);
			$( "#user_exception" ).dialog({
				autoOpen: true,
				height: 150,
				modal: true,resizable:false,
	   		buttons: {
	   		确定: function() {
	    	  $( this ).dialog( "close" );
	         		}
	   			}
			});	
		}	
		
		
	});
	
</script>
</head>


<body onselectstart="return false">
<div class="pane ui-layout-north">
<table class="northPanel ui-widget-content">
	<tr >
		<td >
			<img src="component/themes/ui-lightness/images/logo.gif" height="90" width="1330"></img>
		</td>
		
	</tr>
	<tr>
		<td align="right">
		<div class="northMessage">
			<label>用户ID：</label><label id="index_userId"></label>&nbsp;&nbsp;&nbsp; 
			<label>姓名：</label><label id="index_userName"></label>&nbsp;&nbsp;&nbsp; 
			<label>上次登录时间：</label><label id="index_loginTime"></label>&nbsp;&nbsp;&nbsp;
			<label>上次登录IP：</label><label id="index_loginIP"></label>&nbsp;&nbsp;&nbsp;
			<a id="userInfo" class="uc7-link" style="text-decoration: underline;"href="#">个人信息</a>&nbsp;&nbsp;
			<a id="modiPic" class="uc7-link" style="text-decoration: underline;"href="#">修改头像</a>&nbsp;&nbsp;
			<a id="changePass" class="uc7-link" style="text-decoration: underline;"href="#">修改密码</a>&nbsp;&nbsp;
			<a id="logout" class="uc7-link" style="text-decoration: underline;"href="#">退出系统</a>&nbsp;&nbsp;
		</div>
		</td>
	</tr>
</table>
</div>
<div class="pane ui-layout-west">
	<img id="user_pic" src="component/themes/ui-lightness/images/1111.jpg" height="380" width="240"></img>

</div>
<div id="divcenterId" class="pane ui-layout-center">
	<div id="button_div" class="uc7-btnpadding" style="margin-left: 8px;">
		<p>
			<button id="addScore"></button>
			<button id="reset"></button>
		</p>
	</div>
	
	<div id="score_tabs">
		<table id="score_list"></table>
		<div id="score_pager"></div>
	</div>
</div>

<!-- add by panwei  隐藏域，用来向加载后的页面传值 -->
<input type="hidden" id="content_hiddenData_forLoad" />

<div class="pane ui-layout-south">2叔的爱真三AR小分队</div>
	
	<div id="addScore_form" title="添加比赛" >
		<p>
			<label>胜负</label>
			<select id="winOrLose">
				<option value="0">--请选择--</option>
				<option value="1">虐的一手好菜</option>
				<option value="-1">被干出屎</option>
			</select>
			
			&nbsp;&nbsp;&nbsp;&nbsp;
			<label>房间等级</label>
			<select id="level">
				<option value="0">--请选择--</option>
				<option value="7">月巴不在，只能7级</option>
				<option value="9">月巴在，我们拖后腿，只能9级</option>
				<option value="11">哈哈，月巴来了，果断11级</option>
			</select>
		</p>
		<p>
			<label>选手</label>
			<select id="addScore_user1">
				<option value="">--请选择--</option>
			</select>
			<label>击杀数</label><input type="text" id="addScore_kill1" />
			<label>死亡数</label><input type="text" id="addScore_die1" />	
			<label>助攻数</label><input type="text" id="addScore_ass1" />
		</p>
		<p>
			<label>选手</label>
			<select id="addScore_user2">
				<option value="">--请选择--</option>
			</select>
			<label>击杀数</label><input type="text" id="addScore_kill2" />
			<label>死亡数</label><input type="text" id="addScore_die2" />	
			<label>助攻数</label><input type="text" id="addScore_ass2" />
		</p>
		<p>
			<label>选手</label>
			<select id="addScore_user3">
				<option value="">--请选择--</option>
			</select>
			<label>击杀数</label><input type="text" id="addScore_kill3" />
			<label>死亡数</label><input type="text" id="addScore_die3" />	
			<label>助攻数</label><input type="text" id="addScore_ass3" />
		</p>
		<p>
			<label>选手</label>
			<select id="addScore_user4">
				<option value="">--请选择--</option>
			</select>
			<label>击杀数</label><input type="text" id="addScore_kill4" />
			<label>死亡数</label><input type="text" id="addScore_die4" />	
			<label>助攻数</label><input type="text" id="addScore_ass4" />
		</p>
		<p>
			<label>选手</label>
			<select id="addScore_user5">
				<option value="">--请选择--</option>
			</select>
			<label>击杀数</label><input type="text" id="addScore_kill5" />
			<label>死亡数</label><input type="text" id="addScore_die5" />	
			<label>助攻数</label><input type="text" id="addScore_ass5" />
		</p>
	</div>
	
	<div id="user_exception" title="提示信息">
		<div align="center">
			<p><label id="user_message"></label></p>
		</div>
	</div>
	
	<div id="index_changePassword_form" title="修改密码" class="uc7-information">
		<form id="index_changePas_Form" class="uc7-cmxform">		
		<fieldset>
			<p><label>用户ID：</label> <label id="index_changePass_userId"> </label></p>
			<p><label>姓名：</label> <label id="index_changePass_userName"> </label></p>
			<p><label>新密码：</label> <input id=index_newPassword name=index_newPassword type=password value=""></p>
			<p><label>确认密码：</label> <input id=index_reNewPassword name=index_reNewPassword type=password value=""></p>
		</fieldset>
		</form>
	</div>
	
	<div id="index_userinfo" title="个人信息" class="uc7-information">
		<form id="modiInfo_Form" class="uc7-cmxform" action="" method="post" enctype="multipart/form-data">		
			<fieldset>
				<p><label>登录名：</label> <input id="info_userId" name="info_userId"></p>
				<p><label>搞基名：</label> <input id="info_userName" name="info_userName"></p>
				<p><label>QQ：</label> <input id="info_qq" name="info_qq"></p>
				<p><label>联系电话：</label> <input id="info_phone" name="info_phone"></p>
				<p><label>Email：</label> <input id="info_email" name="info_email"></p>
				<p><label>搞基自白:</label><textarea id="info_description"  name="info_description" cols=100 rows=4></textarea></p>
			</fieldset>
		</form>
	</div>
	
	<div id="index_modiPic">
		<form id="modiPic_Form" class="uc7-cmxform" action="" method="post" enctype="multipart/form-data">		
		<fieldset>
			<p><label>上传新照片：</label><input type="file" id="file_upload" name="file_upload"/></p>
		</fieldset>
		</form>
	</div>
	
	<div id="dm_contentTreeInfo">
	<div align="center">
	<p><label id="dm_contentTreeMessage"></label></p>
	</div>
	
	<div id="index_ConfirmDIV"></div>
</div>
</body>
</html>