/*
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function($, undefined) {

	$
			.widget(
					"ui.promptDialog",
					{
						// default options
						options : {
						},
						_create : function() {
							var self = this;
							this.messageDialog = $('<div class="dialog-message"><p><span class="ui-icon ui-icon-circle-check" style="float:left; margin:0 7px 50px 0;"></span></p></div>').appendTo(this.element);
							this.confirmDialog = $('<div class="dialog-confirm"><p><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 20px 0;"></span></p></div>').appendTo(this.element);
							this.wrongDialog = $('<div class="dialog-wrong" style="overflow: hidden;"><p><span class="ui-icon ui-icon-circle-close" style="float:left; margin:0 7px 20px 0;"></span></p> '
									+'<span class="dialog-wrong-hide" style="margin-left:-23px;float:left;height: 15px;line-height: 15px; width: 16px;vertical-align: middle;"></span><strong>'
									+$.ui.promptDialog.locale.wrongText+'</strong><div class="dialog-wrong-detail" style="clear:both;border:1px solid #ccc;padding:5px;height:100px;overflow:auto;">'
									+'</div></div>').appendTo(this.element);
							
							
							this._drawDiv();
							this._hideAll();
							this.element.show();
						},
						_drawDiv:function(){
							var self=this;
							var expandText = $.ui.promptDialog.locale.expandText;
							var collapsedText = $.ui.promptDialog.locale.collapsedText;
							this.messageDialog.find( ".dialog-message" ).dialog({
								autoOpen: false,
								modal: true
							});
							this.confirmDialog.find( ".dialog-confirm" ).dialog({
								autoOpen: false,
								resizable: false,
								modal: true
							});
							this.wrongDialog.find(".dialog-wrong" ).dialog({
								autoOpen: false,
								resizable: false,
								modal: true
							});

							
							this.wrongDialog.find( ".dialog-wrong-hide" )
							.button({
								icons: {
						            primary: "ui-icon-carat-1-s"
						        },
						        text: false,
								label: expandText
							}).click(function() {
								var options;
								if (self.wrongDialog.find('.dialog-wrong-detail')
										.is(':hidden')) {
									options = {
										icons : {
											primary : "ui-icon ui-icon-carat-1-s"
										},
										label: collapsedText
									};
									
								} else {
									options = {
										icons : {
											primary : "ui-icon ui-icon-carat-1-n"
										},
										label: expandText
									};

								}
								$(this).button("option",
										options);
								self.wrongDialog.find('.dialog-wrong-detail').toggle();
							});	
						},
						//提示框
						alertMessage:function(alertValue){
							this._hideAll();
							var confirmButtonText = $.ui.promptDialog.locale.confirmButtonText;
							this.messageDialog.dialog({ title: alertValue.title,buttons: [{
								text: confirmButtonText,
						        click: function() {
						        	$(this).dialog("close");
								}
							}] }).hide();
								this.messageDialog.find('p').html(alertValue.message);
							this.messageDialog.show();
						},
						confirmMessage:function(confirmValue){
							this._hideAll();
							var confirmButtonText = $.ui.promptDialog.locale.confirmButtonText;
							var cancelButtonText = $.ui.promptDialog.locale.cancelButtonText;
							this.confirmDialog.dialog({ title: confirmValue.title,buttons: [{
								text: confirmButtonText,
						        click: function() {
						        	confirmValue.callback();
						        	$(this).dialog("close");
								}
							},{
								text: cancelButtonText,
						        click: function() {
						        	$(this).dialog("close");
								}
							}] }).hide();
								this.confirmDialog.find('p').html(confirmValue.message);
							
							
							this.confirmDialog.show();
						},
						wrongMessage:function(wrongValue){
							var confirmButtonText = $.ui.promptDialog.locale.confirmButtonText;
							var error='  ';
							this._hideAll();
							this.wrongDialog.dialog({ title: wrongValue.title ,buttons: [{
								text: confirmButtonText,
						        click: function() {
									$(this).dialog( "close" );
								}
							}] }).hide();
							if(wrongValue.message){
									this.wrongDialog.find('p:first').html(wrongValue.message);
							}
							if(wrongValue.errorMessage){
								error = wrongValue.errorMessage;
							}
							this.wrongDialog.find('.dialog-wrong-detail').html(error).hide();
							this.wrongDialog.show();
						},
						_hideAll:function(){
							if(this.messageDialog.is(':visible')){
								this.messageDialog.hide();
							}
							if(this.confirmDialog.is(':visible')){
								this.confirmDialog.hide();
							}
							if(this.wrongDialog.is(':visible')){
								this.wrongDialog.hide();
							}
						},
						// 根据data生成最终完整的tree html
						destroy : function() {
							if(this.messageDialog){
								this.messageDialog.remove();
							}
							if(this.confirmDialog){
								this.confirmDialog.remove();
							}
							if(this.wrongDialog){
								this.wrongDialog.remove();
							}
							
							$.Widget.prototype.destroy.apply(this, arguments); // default
						}
					});
	
	$.extend($.ui.promptDialog, {
		locale: {
			wrongText:'详细信息',
			confirmButtonText:'确定',
			cancelButtonText:'取消',
			expandText:'展开',
			collapsedText:'收拢'
		}
	});
							
						/**	$.extend($.ui.promptDialog, {
								locale: {
									wrongText:'fine-detail information',
									confirmButtonText:'sure',
									cancelButtonText:'cancel',
									expandText:'Expand',
									collapsedText:'collapsed'
								}
							});*/

})(jQuery);
