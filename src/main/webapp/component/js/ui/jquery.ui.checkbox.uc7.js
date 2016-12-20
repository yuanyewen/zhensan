/**
* jQuery uc7 
* 
*/

(function ($)
{
		$.uc7Checkbox = $.uc7Checkbox || {};
	$.uc7Checkbox.defult = {
            disabled : false,
            checkedValue :null
    };
	
    $.fn.uc7Checkbox = function (options)
    {
        return this.each(function ()
        {
        		options = $.extend({},$.uc7Checkbox.defult, options || {});
            if (this.usedRadio) return;
            if ($(this).hasClass('uc7-hidden')) { return; }
            var g = {};
            g.input = $(this);
            g.link = $('<a href="javascript:void(0)" class="uc7-checkbox"></a>');
            g.wrapper = g.input.wrap('<div class="uc7-checkbox-wrapper"></div>').parent();
           
						g.wrapper.prepend(g.link);
						if(typeof options.checkedValue === "string"){
								if(g.input.val()==options.checkedValue){
									g.input.attr('checked',true);
									}
							}else if($.isArray(options.checkedValue)){
								$(options.checkedValue).each(function(){
									if(g.input.val()==this){
										g.input.attr('checked',true);
										}
								});
							
						}
						g.input.addClass('uc7-hidden');
			
            
            if($(g.input).attr('checked')){
            	 g.link.addClass('uc7-checkbox-checked');
            	}
            	if(!options.disabled){
            		 g.input.change(function ()
            {
                if (this.checked)
                {
                    g.link.addClass('uc7-checkbox-checked');
                }
                else
                {
                    g.link.removeClass('uc7-checkbox-checked');
                }
                return true;
            });
            
            g.link.click(function ()
            {
					     if (g.input.attr('disabled')) { return false; }
                g.input.trigger('click').trigger('change');
                var formEle;
                if (g.input[0].form) formEle = g.input[0].form;
                else formEle = document;
                $("input:checkbox[name=" + g.input[0].name + "]", formEle).not(g.input).trigger("change");
                return false;
           
            });
            g.wrapper.hover(function ()
            {
						$(this).addClass("over");

            }, function ()
            {
			
                $(this).removeClass("over");
            });
            		}else{
            			 if (this.checked)
							  {
								  g.link.addClass('uc7-checkbox-disabled-checked');
							  }
							  else
							  {
								  g.link.addClass('uc7-checkbox-disabled');
							  }
            			}
           
            this.checked && g.link.addClass('uc7-checkbox-checked');
			

        });
    };

})(jQuery);