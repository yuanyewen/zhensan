/*
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function($, undefined) {

	$.widget(
					"ui.toolBar",
					{
						// default options
						options : {
							source: null,
							separateFlag:''
							
						},
						_create : function() {
							var self = this;
							var bLength = self.options.source.length;
							$(self.options.source).each(function(i){
								var container = $('<div style="float:left;"></div>').appendTo(self.element);
								$(this).appendTo(container);
							});
							$('<div style="clear:both;"></div>').appendTo(self.element);
						},
						destroy : function() {
							this.element.html('');// destroy
							$.Widget.prototype.destroy.apply(this, arguments); // default
							
						}

					});

})(jQuery);
