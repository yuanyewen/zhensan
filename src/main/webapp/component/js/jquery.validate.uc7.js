jQuery.extend(jQuery.validator.methods, {

	// http://docs.jquery.com/Plugins/Validation/Methods/required
	required: function(value, element, param) {
		// check if dependency is met
		if ( !this.depend(param, element) )
			return "dependency-mismatch";
		switch( element.nodeName.toLowerCase() ) {
		case 'select':
			var options = $("option:selected", element);
			return options.length > 0 && ( element.type == "select-multiple" || ($.browser.msie && !(options[0].attributes['value'].specified) ? options[0].text : options[0].value).length > 0);
		case 'input':
			if ( this.checkable(element) )
				return this.getLength(value, element) > 0;
		default:
			return $.trim(value).length > 0;
		}
	},
	
	// http://docs.jquery.com/Plugins/Validation/Methods/remote
	remote: function(value, element, param) {
		if ( this.optional(element) )
			return "dependency-mismatch";
		
		var previous = this.previousValue(element);
		
		if (!this.settings.messages[element.name] )
			this.settings.messages[element.name] = {};
		this.settings.messages[element.name].remote = typeof previous.message == "function" ? previous.message(value) : previous.message;
		
		param = typeof param == "string" && {url:param} || param; 
		
		if ( previous.old !== value ) {
			previous.old = value;
			var validator = this;
			this.startRequest(element);
			var data = {};
			data[element.name] = value;
			$.ajax($.extend(true, {
				url: param,
				mode: "abort",
				port: "validate" + element.name,
				dataType: "json",
				data: data,
				success: function(response) {
					var valid = response === true;
					if ( valid ) {
						var submitted = validator.formSubmitted;
						validator.prepareElement(element);
						validator.formSubmitted = submitted;
						validator.successList.push(element);
						validator.showErrors();
					} else {
						var errors = {};
						errors[element.name] = previous.message = response || validator.defaultMessage( element, "remote" );
						validator.showErrors(errors);
					}
					previous.valid = valid;
					validator.stopRequest(element, valid);
				}
			}, param));
			return "pending";
		} else if( this.pending[element.name] ) {
			return "pending";
		}
		return previous.valid;
	},

	// http://docs.jquery.com/Plugins/Validation/Methods/minlength
	minlength: function(value, element, param) {
		return this.optional(element) || this.getLength($.trim(value), element) >= param;
	},
	
	// http://docs.jquery.com/Plugins/Validation/Methods/maxlength
	maxlength: function(value, element, param) {
		return this.optional(element) || this.getLength($.trim(value), element) <= param;
	},
	
	// http://docs.jquery.com/Plugins/Validation/Methods/rangelength
	rangelength: function(value, element, param) {
		var length = this.getLength($.trim(value), element);
		return this.optional(element) || ( length >= param[0] && length <= param[1] );
	},
	
	// http://docs.jquery.com/Plugins/Validation/Methods/min
	min: function( value, element, param ) {
		return this.optional(element) || value >= param;
	},
	
	// http://docs.jquery.com/Plugins/Validation/Methods/max
	max: function( value, element, param ) {
		return this.optional(element) || value <= param;
	},
	
	// http://docs.jquery.com/Plugins/Validation/Methods/range
	range: function( value, element, param ) {
		return this.optional(element) || ( value >= param[0] && value <= param[1] );
	},
	
	// http://docs.jquery.com/Plugins/Validation/Methods/email
	email: function(value, element) {
		// contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
		return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
	},

	// http://docs.jquery.com/Plugins/Validation/Methods/url
	url: function(value, element) {
		// contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
		return this.optional(element) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
	},
    
	// http://docs.jquery.com/Plugins/Validation/Methods/date
	date: function(value, element) {
		return this.optional(element) || !/Invalid|NaN/.test(new Date(value));
	},

	// http://docs.jquery.com/Plugins/Validation/Methods/dateISO
	dateISO: function(value, element) {
		return this.optional(element) || /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(value);
	},

	// http://docs.jquery.com/Plugins/Validation/Methods/dateDE
	dateDE: function(value, element) {
		return this.optional(element) || /^\d\d?\.\d\d?\.\d\d\d?\d?$/.test(value);
	},

	// http://docs.jquery.com/Plugins/Validation/Methods/number
	number: function(value, element) {
		return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);
	},

	// http://docs.jquery.com/Plugins/Validation/Methods/numberDE
	numberDE: function(value, element) {
		return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d+)?$/.test(value);
	},
	
	// http://docs.jquery.com/Plugins/Validation/Methods/digits
	digits: function(value, element) {
		return this.optional(element) || /^\d+$/.test(value);
	},
	
	// http://docs.jquery.com/Plugins/Validation/Methods/creditcard
	// based on http://en.wikipedia.org/wiki/Luhn
	creditcard: function(value, element) {
		if ( this.optional(element) )
			return "dependency-mismatch";
		// accept only digits and dashes
		if (/[^0-9-]+/.test(value))
			return false;
		var nCheck = 0,
			nDigit = 0,
			bEven = false;

		value = value.replace(/\D/g, "");

		for (n = value.length - 1; n >= 0; n--) {
			var cDigit = value.charAt(n);
			var nDigit = parseInt(cDigit, 10);
			if (bEven) {
				if ((nDigit *= 2) > 9)
					nDigit -= 9;
			}
			nCheck += nDigit;
			bEven = !bEven;
		}

		return (nCheck % 10) == 0;
	},
	
	// http://docs.jquery.com/Plugins/Validation/Methods/accept
	accept: function(value, element, param) {
		param = typeof param == "string" ? param.replace(/,/g, '|') : "png|jpe?g|gif";
		return this.optional(element) || value.match(new RegExp(".(" + param + ")$", "i")); 
	},
	
	// http://docs.jquery.com/Plugins/Validation/Methods/equalTo
	equalTo: function(value, element, param) {
		return value == $(param).val();
	},
	tel : function(value, element){
		 var tel = /^\d{3,4}-?\d{7,9}$/;    //电话号码格式010-12345678      
		 return this.optional(element) || (tel.test(value));  
	},
	mobile : function(value, element){
		 var mobile = /^\d{11,13}$/;      
		 return this.optional(element) || (mobile.test(value));  
	},
	invalidData : function(value, element){
		 var invalidData = /<|>|(select )|(update )|(delete )|(insert )/g;
		 return this.optional(element) || !(invalidData.test(value));  
	},
	//输入用户自定义的正则表达式
	validDataByReg : function(value, element,regValue){
		 var invalid = new RegExp(regValue,"g");
		 return this.optional(element) || (invalid.test(value));  
	},
	//验证浮点型
	validFloat : function(value, element){
		var invalid = /^(-?\d+)(\.\d+)?$/;
		return this.optional(element) || (invalid.test(value));  
	},
	validDataByRegValue : function(value, element,reg){
		return this.optional(element) || (reg.test(value));  
	},
	
	equalFrom : function(value, element,subObj){
		var flag = false;
		if(subObj){
			if(subObj.find('option')&&subObj.find('option').length>0){
				subObj.find('option').each(function(){
					if($(this).val()==value){
						flag = true;
					}
				});
			}else if(subObj.val().indexOf(",")>=0){
				var objs = subObj.val().split(',');
				$(objs).each(function(){
					if(this){
						if(this==value){
							flag = true;
						}
					}
				});
			}else{
				if(subObj.val()==value){
					flag = true;
				}
			}
			
		}
			return flag;
	}
});