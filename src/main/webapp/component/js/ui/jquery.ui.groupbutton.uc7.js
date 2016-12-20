(function($) {

$.widget("ui.groupButton", {
	options: {
		button:null,
		prompt:null,
		childHandler:function(){}
	},
	_create: function() {
		var self = this;
		if(this.options.button){
					$(this.options.button).appendTo(self.element);
					if(this.options.prompt==null){
						this.options.prompt = $(this.options.button).button( "option", "text" );
					}
					var childButton = $('<button >'+this.options.prompt+'</button>').appendTo(self.element);
					childButton.button({
				        icons: {
				            primary: 'ui-icon-triangle-1-s'
				        },
				        text: false
				    }).click(function(){
				    	self.options.childHandler($(this));
					}).parent().buttonset();
				
			}else{
				return false;
			}
			self.element.buttonset();
			self.element.find('button:first').mouseover(function(){
				$(this).next().mouseover();
			}).mouseout(function(){
				$(this).next().mouseout();
			});
	},
	
	destroy: function() {

		$.Widget.prototype.destroy.call( this );
	}
});


})(jQuery);
