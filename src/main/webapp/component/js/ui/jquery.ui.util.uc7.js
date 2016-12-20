$(function(){
	
	
	$("input[type='text']").addClass('uc7-text').bind('mouseover',function(){
		$(this).toggleClass('uc7-text:hover');
	}).bind('mousedown',function(){
		$(this).toggleClass('uc7-text:focus');
	});
	
	$("input[type='password']").addClass('uc7-text').bind('mouseover',function(){
		$(this).toggleClass('uc7-text:hover');
	}).bind('mousedown',function(){
		$(this).toggleClass('uc7-text:focus');
	});
	
	$("textarea").addClass('uc7-textarea').bind('mouseover',function(){
		$(this).toggleClass('uc7-textarea:hover');
	}).bind('mousedown',function(){
		$(this).toggleClass('uc7-textarea:focus');
	});
	
	
});
	//element为查找的json对象，index为查找的下标，key为查找的关键字

	function findObject(element,index,key){
		var result;
		if(element){
			if($.isArray(element)){
				if(index){
				$(element).each(function(j){
						if(j==index){
							if(key){
								result = this[key];
							}else{
								result = this;
							}
							
						}
					});	
				}
			}else{
				if(key){
					result = this[key];
				}
			}
		}
		return result;
	}
	
	
	//复制数组
	Array.prototype.copyArray = function(){
		
		return this.concat();
	};
	
	//复制json数组
	Array.prototype.copyJSONArray = function(){
		var newArr=[];
		$(this).each(function(i){
			newArr[i]= this;
		});
		return newArr;
	};
	//查找数组是否包含某个元素
	Array.prototype.contains = function (element) {
	    for (var i = 0; i < this.length; i++) {
	        if (this[i] == element) {
	            return true;
	        }
	    }
	    return false;
	};
	
	//element为删除的json数组，index为删除数据的下标
	function delArray(element,index){
		element.splice(index,1);
	}
	
	//element为被添加数据的json对象，index为添加数据的下标，obj为添加的数据
	function insertObject(element,obj){
		if(obj){
			element.push(obj);
		}
		return element;
	}
	//将String转成json,key的名称一定要用双引号
	function toJSON(value){
		if(value){
			return $.parseJSON(value);
		}
	}
	
	
	 //获取区域所有组件的数据并拼装成json数据格式
	 function getFormJsonObject(obj){
		 var jsonObject ='';
		 if(obj){
			 obj.find('p').each(function(){
				 if($(this).find('input:text').length>0){
					 $(this).find('input:text').each(function(){
						 jsonObject = jsonObject+','+$(this).attr('name')+':'+ $(this).val();
					 });
				 }
				 if($(this).find('input:password').length>0){
					 $(this).find('input:password').each(function(){
						 jsonObject = jsonObject+','+$(this).attr('name')+':'+ $(this).val();
					 });
				 }
				 if($(this).find('input:radio').length>0){
					 var val='';
					 $(this).find('input:radio').each(function (i) {
		                 if($(this).prop('checked')){
		                	 val =  $(this).val();
		                 } 
		             });
					 jsonObject = jsonObject+','+$(this).find('input:radio').attr('name')+':'+val;
				 }
				 if($(this).find('input:checkbox').length>0){
					 var val=''
					 $(this).find('input:checkbox').each(function (i) {
		                 if($(this).prop('checked')){
		                	 val =  val+'_'+$(this).val();
		                 } 
		             });
					 jsonObject = jsonObject+','+$(this).find('input:checkbox').attr('name')+':'+ val;
				 }
				 if($(this).find('select').length>0){
					 jsonObject = jsonObject+','+$(this).find("select").prop("name")+':'+ $(this).find("select").val();
				 }
				 if($(this).find('textarea').length>0){
					 jsonObject = jsonObject+','+$(this).find("textarea").attr("name")+':'+ $(this).find("textarea").val();
				 }
			 });
		 }
		
		 jsonObject ='{'+jsonObject.substring(1)+'}';
		return jsonObject;
	 }
	 
	//扩展jquery的load方法
		$.fn.extend({
			load: function( url, params, callback ) {
				if($('.ui-dialog').find('.uc7-dialog-identify').length>0){
					$('.uc7-dialog-identify').parent().remove();
				}
				if($('.uc7-dialog-identify')){
					$('.uc7-dialog-identify').remove();
				}
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );

		// Don't do a request if no elements are being requested
		} else if ( !this.length ) {
			return this;
		}

		var off = url.indexOf( " " );
		if ( off >= 0 ) {
			var selector = url.slice( off, url.length );
			url = url.slice( 0, off );
		}

		// Default to a GET request
		var type = "GET";

		// If the second parameter was provided
		if ( params ) {
			// If it's a function
			if ( jQuery.isFunction( params ) ) {
				// We assume that it's the callback
				callback = params;
				params = undefined;

			// Otherwise, build a param string
			} else if ( typeof params === "object" ) {
				params = jQuery.param( params, jQuery.ajaxSettings.traditional );
				type = "POST";
			}
		}
		var self = this;
		
		// Request the remote document
		jQuery.ajax({
			url: url,
			type: type,
			dataType: "html",
			data: params,
			// Complete callback (responseText is used internally)
			complete: function( jqXHR, status, responseText ) {
				// Store the response as specified by the jqXHR object
				responseText = jqXHR.responseText;
				// If successful, inject the HTML into all the matched elements
				if ( jqXHR.isResolved() ) {
					// #4825: Get the actual response in case
					// a dataFilter is present in ajaxSettings
					jqXHR.done(function( r ) {
						responseText = r;
					});
					// See if a selector was specified
					self.html( selector ?
						// Create a dummy div to hold the results
						jQuery("<div>")
							// inject the contents of the document in, removing the scripts
							// to avoid any 'Permission Denied' errors in IE
							.append(responseText.replace(rscript, ""))

							// Locate the specified elements
							.find(selector) :

						// If not, just inject the full result
						responseText );
				}

				if ( callback ) {
					self.each( callback, [ responseText, status, jqXHR ] );
				}
			}
		});

		return this;
	}});
	
