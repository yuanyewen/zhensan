/*
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function($, undefined) {

	$
			.widget(
					"ui.tree",
					{
						// default options
						options : {
							url : null,
							data : null,
							param : {},
							checkbox : false,
							onExpand : function(){},
							onClick : function(){},
							find : function(){},
							getChildByParent : function(){},
							getChildren :function(){},
							remove:function(){}
						},
						_create : function() {
							var self = this;
							self.checkList=[];
							if (this.options.data) {
								this._createByData(data);
							}
							if (this.options.url) {
								this._loadData(this.options.url);
							}

						},
						_loadData : function(url) {
							var self = this;
							param = self.options.param || {};
							// 请求服务器
							$.ajax({
								type : 'post',
								url : url,
								data : param,
								dataType : 'json',
								success : function(data) {
									if(data){
										if($.isArray(data)){
											self._createByData(data);
										}else{
											self._createByData(data.rows);
										}
									}
								}
							});
						},
					
						_createTree : function(data, ul, indents) {
							var self = this;
							if(data){
							for ( var i = 0; i < data.length; i++) {
								var li = $("<li></li>").appendTo(ul);
								var item = data[i];
								// 设置tree是否有子集的状态
						
								var treeItem = $(
										"<div class=\"uc7-tree-node\"></div>")
										.appendTo(li);
								treeItem.attr("node-id", item.id);
								$.data(treeItem[0], "uc7-tree-node", {
									id : item.id,
									text : item.text,
									iconCls : item.iconCls
								});
								
								// 树的名称
								$("<span class=\"uc7-tree-title\"></span>").html(
										item.name).appendTo(treeItem);
								
								if(self.options.checkbox){ 
									$("<input role=\"checkbox\" type=\"checkbox\" name=\"ck\"/>").prependTo(treeItem);
									}
							
								// 根据tree数据的children值判断是否添加子叶的样式
								if (item.children > 0) {
										$(
												"<span class=\"uc7-tree-icon uc7-tree-folder\"></span>")
												.addClass(item.iconCls)
												.prependTo(treeItem);
										$(
												"<span class=\"uc7-tree-hit uc7-tree-collapsed\"></span>")
												.prependTo(treeItem);
								
									var t_ul = $('<ul style="padding-left:20px!important;padding-left:40px;"></ul>').appendTo(li);
									t_ul.css("display","none");
								} else {
										$(
												"<span class=\"uc7-tree-icon uc7-tree-file\"></span>")
												.addClass(item.iconCls)
												.prependTo(treeItem);
										$("<span class=\"uc7-tree-indent\"></span>")
												.prependTo(treeItem);
									}
								treeItem.children('input[type="checkbox"]').bind('click',function(){
									var that = this;
									if(this.checked){
										self.checkList.push(treeItem.attr("node-id"));
										if($(this).parent().parent().find('ul').length>0){
											$(this).parent().parent().find('ul').find('input[type="checkbox"]').each(function(){
												$(this).attr('checked',that.checked);
												self.checkList.push($(this).parent().attr("node-id"));
											});
										}
									}else{
										if(self.checkList){
											for(var i=0;i<self.checkList.length;i++){
												if(self.checkList[i]==treeItem.attr("node-id")){
													self.checkList.splice(i,1);
												}
											}
											if($(this).parent().parent().find('ul').length>0){
												$(this).parent().parent().find('ul').find('input[type="checkbox"]').each(function(){
													$(this).attr('checked',that.checked);
													for(var i=0;i<self.checkList.length;i++){
														if(self.checkList[i]==$(this).parent().attr("node-id")){
															self.checkList.splice(i,1);
														}
													}
												});
											}
										}
									}
										
									
								});

								treeItem
										.children('.uc7-tree-hit')
										.bind(
												"mouseenter.tree",
												function() {
													if ($(this).hasClass(
															"uc7-tree-expanded")) {
														$(this)
																.addClass(
																		"uc7-tree-expanded-hover");
													} else {
														$(this)
																.addClass(
																		"uc7-tree-collapsed-hover");
													}
												})
										.bind(
												"mouseleave.tree",
												function() {
													if ($(this).hasClass(
															"uc7-tree-expanded")) {
														$(this)
																.removeClass(
																		"uc7-tree-expanded-hover");
													} else {
														$(this)
																.removeClass(
																		"uc7-tree-collapsed-hover");
													}
												})
										.bind("mousedown.tree", function() {
											return false;
										})
										.bind(
												"click",
												function() {
													
													if ($(this).hasClass(
															"uc7-tree-expanded")) {
														$('.uc7-tree-icon').addClass();
														$(this)
																.removeClass(
																		"uc7-tree-expanded");
														if ($(this)
																.hasClass(
																		"uc7-tree-expanded-hover")) {
															$(this)
																	.removeClass(
																			"uc7-tree-expanded-hover");
														}
														$(this)
																.addClass(
																		"uc7-tree-collapsed");
														$(this).next().removeClass("uc7-tree-folder-open");
														
														
														$(this)
														.parent().parent().find('ul').css("display","none");
													} else {
														$(this)
																.removeClass(
																		"uc7-tree-collapsed");
														if ($(this)
																.hasClass(
																		"uc7-tree-collapsed-hover")) {
															$(this)
																	.removeClass(
																			"uc7-tree-collapsed-hover");
														}
														$(this)
																.addClass(
																		"uc7-tree-expanded");
														$(this).next().addClass("uc7-tree-folder-open");
														self._expand(self._getNode($(this)
																.parent().parent()));
													}
													
													
												});
								treeItem
								.children('.uc7-tree-title').bind(
										"click",
										function() {
											self._click(self._getNode($(this)
													.parent().parent()));
										});
							}
							}
						},
						_getNode : function( ul) {
							var node = $.extend({}, $.data(ul, "tree-node"), {
								id: ul.find("div").attr('node-id'),
								target : ul
							});
							if (!this.getChildren(ul)) {
								node.state = $(ul).find(".uc7-tree-hit").hasClass(
										"uc7-tree-expanded") ? "open" : "closed";
							}
							return node;
						},
						find : function(id) {
							var node=this.element.find('div.uc7-tree-node[node-id='+id+']');
							if(node&&node.length>0){
							return this._getNode($(node[0]).parent());
							}else{
							return null;
							}
						},
						getChildren : function(ul) {
							var node=$(ul);
							var hit=node.children("span .uc7-tree-hit");
							return hit;
						},
						isChildByParent : function(id) {
							var node=this.element.find('div.uc7-tree-node[node-id='+id+']');
							var nodeTarget = $(node[0]).parent();
							if(node&&node.length>0){
								if(nodeTarget.find('ul:has(li)').length>0){
									return true;
								}else{
									return false;
								}
								}else{
									return false;
								}
						},
						_expand : function(treeItem) {
							this.options.onExpand(treeItem);
						},
						_click : function(node) {
							this.element.find('span').removeClass('ui-state-hover');
							$(node.target).children('div').find('span').last().addClass('ui-state-hover');
							this.options.onClick(node);
						},
						// 根据data生成最终完整的tree html
						_createByData : function(data) {

							if (this.element.find('ul')) {
								this.element.empty();
							}
							var ul = this.element;
							var indents = ul.prev("div.uc7-tree-node").find(
									"span.uc7-tree-indent, span.uc7-tree-hit").length;
							this._createTree(data, ul, indents);
						},
						append : function(node) {
							var indents = $(node.parent).prev("div.uc7-tree-node").find(
									"span.uc7-tree-indent, span.uc7-tree-hit").length;
							var ul;
							if(node.parent.find('ul')){
								ul=node.parent.find('ul');
								if(ul.css('display')=='none'){
									ul.css('display','block');
								}
								ul.empty();
							}else{
								ul = $('<ul></ul>').appendTo(node.parent);
							}
							if(node.data){
								if($.isArray(node.data)){
									this._createTree(node.data, ul, indents+1);
								}else{
									this._createTree(node.data.rows, ul, indents+1);
								}
								
							}else{
								var tree=node.parent.children();
								
								tree.find(".uc7-tree-icon").removeClass("open");
								tree.find(".uc7-tree-hit").remove();
								$("<span class=\"uc7-tree-indent\"></span>").prependTo(tree);
								if(node.parent.find('ul')){
									node.parent.find('ul').remove();		
								}
							}
							
						},
						remove : function(node) {
							if(node){
								node.empty();
							}
						},
						getCheckBoxs : function() {
							return this.checkList; 
						},
						destroy : function() {
							this.element.html('');// destroy
							$.Widget.prototype.destroy.apply(this, arguments); // default
							
						}

					});

})(jQuery);
