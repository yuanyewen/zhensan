/**
* jQuery uc7 
* 
*/



(function ($)
{
	$.uc7Radio = $.uc7Radio || {};
	$.uc7Radio.defult = {
            disabled : false,
            checkedValue :null
    };
    
    ///	<param name="$" type="jQuery"></param>
    $.fn.uc7Radio = function (options)
    {
        return this.each(function ()
        {
        		options = $.extend({},$.uc7Radio.defult, options || {});
            if (this.usedRadio) return;
            if ($(this).hasClass('uc7-hidden')) { return; }
            var g = {};
            g.input = $(this);
            g.link = $('<a href="javascript:void(0)" class="uc7-radio"></a>');
            g.wrapper = g.input.wrap('<div class="uc7-radio-wrapper"></div>').parent();
           
						g.wrapper.prepend(g.link);
						if(options.checkedValue){
								if(g.input.val()==options.checkedValue){
									g.input.attr('checked',true);
									}
							}
						g.input.addClass('uc7-hidden');
			
            
            if($(g.input).attr('checked')){
            	 g.link.addClass('uc7-radio-checked');
            	}
            	if(!options.disabled){
            		 g.input.change(function ()
            {
                if (this.checked)
                {
                    g.link.addClass('uc7-radio-checked');
                }
                else
                {
                    g.link.removeClass('uc7-radio-checked');
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
                $("input:radio[name=" + g.input[0].name + "]", formEle).not(g.input).trigger("change");
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
								  g.link.addClass('uc7-radio-disabled-checked');
							  }
							  else
							  {
								  g.link.addClass('uc7-radio-disabled');
							  }
            			}
           
            this.checked && g.link.addClass('uc7-radio-checked');
			

			
			
            
        });
    };

})(jQuery);