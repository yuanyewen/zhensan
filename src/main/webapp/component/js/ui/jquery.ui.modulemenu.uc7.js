/*
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function($, undefined) {

	$
			.widget(
					"ui.moduleMenu",
					{
						// default options
						options : {
							source : null,
							active : 0
						},
						_create : function() {
							var self = this;
							
							this.contentContainer = $('<div ></div>').appendTo(
									this.element);
							this.labelText = $('<div style="height:23px;line-height:23px;padding-left:8px;"><label></label></div>')
							.appendTo(self.contentContainer);
							this.labelText
							.addClass('ui-widget-header ui-corner-all');
							this.contentList = $('<div  style="overflow:auto;"></div>').appendTo(
									this.contentContainer);
							this.buttonContainer = $('<div></div>').appendTo(
									this.element);
							this.displayButton = $(
									'<button class="modulelDisplay" style="height:8px;width:100%;"></button>')
									.appendTo(this.buttonContainer);

							this.buttonList = $(
									'<ul class="uc7-verticalpanel"></ul>')
									.show().appendTo(this.buttonContainer);
							self._createMenu();
							$('.modulelDisplay')
									.button(
											{
												icons : {
													primary : "ui-icon ui-icon-carat-1-s"
												},
												text : false,
												label : '显示/隐藏'
											})
									.click(
											function() {
												var options;
												if (self.buttonList
														.is(':hidden')) {
													self.buttonList.show();
													options = {
														icons : {
															primary : "ui-icon ui-icon-carat-1-s"
														}
													};
													self.buttonContainer
															.height(self._setHeight());
													self.contentContainer
															.height(self.element.height()- self._setHeight()-2);
												} else {
													self.buttonList.hide();
													options = {
														icons : {
															primary : "ui-icon ui-icon-carat-1-n"
														}
													};
													self.buttonContainer
															.height(self.displayButton
																	.outerHeight());
													self.contentContainer
															.height(self.element
																	.height()
																	- self.displayButton
																			.outerHeight());

												}
												$(this).button("option",
														options);
												self.contentList.height(self.contentContainer.height()-self.labelText.outerHeight());
											});
							this.reloadHeight(this.element.height());
						},
						_createMenu : function() {
							var self = this;
							
							
							if (self.options.source) {
								$(self.options.source)
										.each(
												function(i) {

													var contentPanel = $(
															'<div class="ui-content" ></div>')
															.appendTo(
																	self.contentList)
															.hide();
													contentPanel.data('index',
															i);
													this.jqueryObj
															.appendTo(contentPanel);
													if (self.options.active == i) {
														self.labelText
																.text(this.text);
														contentPanel.show();
													}
													var li = $(
															'<li style="padding: 0;"></li>')
															.appendTo(
																	self.buttonList);
													moudelBtn = $(
															'<button  class="moudelBtn" style="width:100%;"></button>')
															.appendTo(li);
													moudelBtn.data('index', i);
													moudelBtn.button({
														icons : {
															primary : this.icon
														},
														text : true,
														label : this.text
													});
												});
								$('.moudelBtn')
										.click(
												function() {
													self.labelText.text($(this)
															.text());
													var index = $(this).data(
															'index');
													self.contentContainer
															.find('.ui-content')
															.hide()
															.each(
																	function() {
																		if ($(
																				this)
																				.data(
																						'index') == index) {
																			if ($(
																					this)
																					.is(
																							':hidden')) {
																				$(
																						this)
																						.show();
																			}

																		}
																	});
												});

							}

						},
						_setHeight : function() {
							var btnHeight = $('.moudelBtn').outerHeight()
									* $('.moudelBtn').length;
							return btnHeight + $('.modulelDisplay').outerHeight();
						},
						// 根据data生成最终完整的tree html
						destroy : function() {
							this.contentContainer.remove();
							this.buttonContainer.remove();
							$.Widget.prototype.destroy.apply(this, arguments); // default
						},
						reloadHeight : function(menuHeight) {
							this.element.height(menuHeight);
							this.buttonContainer.height(this._setHeight());
							
							this.contentContainer.height(menuHeight
									- this._setHeight()-2);
							this.contentList.height(this.contentContainer.height()-this.labelText.outerHeight());
							
						}

					});

})(jQuery);
