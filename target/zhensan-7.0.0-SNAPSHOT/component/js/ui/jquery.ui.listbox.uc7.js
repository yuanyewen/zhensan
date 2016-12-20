(function($) {

$.widget("ui.listBox", {
  options: {
		sortable: true,
		searchable: true,
		doubleClickable: true,
		source: null,
		value:'',
		labelText:'多选框',
		//true为select,false为input
		exportWay:true,
		visible :true,
		listwidth:180,
		listheight:300
	},
	_create: function() {
		var self = this;
		
		this.id = this.element.prop("id");
		this.hideDiv= $('<div></div>').appendTo(this.element);

		this.container = $('<fieldset style="width:'+(this.options.listwidth*2+102)+'px;"></fieldset>').appendTo(this.element);
		this.select=$('<select  multiple="multiple"></select>').appendTo(this.element);
		this.inputText=$('<input type="hidden" value=""/>').appendTo(this.element);
		
		this.container.addClass('uc7-listbox').append('<legend>'+this.options.labelText+'</legend>');
		this.containerLayout=$('<table><tr><td colspan="3"><label class="ui-icon ui-icon-search" style="float:left;"></label><input type="text" name="name" class="search" /></td></tr><tr class="uc7-listbox-name"><td><label>'+$.ui.listBox.locale.addText+'</label></td><td></td><td><label>'+$.ui.listBox.locale.selectedText+'</label></td></tr><tr><td></td><td ></td><td></td></tr><tr><td colspan="2"><label class="gray">'+$.ui.listBox.locale.promptText+'</label></td><td><label class="gray">'+$.ui.listBox.locale.sortPromptText+'</label></td>	</tr></table>').appendTo(this.container);
		this.buttonContainer =$('<ul class="uc7-verticalpanel uc7-listbox-btn"><li><button class="uc7-listbox-toright"></button></li><li><button class="uc7-listbox-toleft"></button></li><li><button class="uc7-listbox-alltoright"></button></li><li><button class="uc7-listbox-alltoleft"></button></li></ul>').appendTo(this.containerLayout.find('tr:first').next().next().find('td:first').next());
		this.selectedList = $('<ul class="uc7-verticalpanel uc7-listbox-checked" style="width:'+this.options.listwidth+'px;height:'+this.options.listheight+'px;"></ul>').appendTo(this.containerLayout.find('tr:first').next().next().find('td:first').next().next());
		this.availableList = $('<ul class="uc7-verticalpanel uc7-listbox-list" style="width:'+this.options.listwidth+'px;height:'+this.options.listheight+'px;"></ul>').appendTo(this.containerLayout.find('tr:first').next().next().find('td:first'));
		this.rem ={};
		//判断是否可以排序
		if (this.options.sortable) {
			this.selectedList.sortable({
				placeholder: 'ui-state-highlight',
				axis: 'y',
				delay:1,
				update:function(event, ui){
					self._fillInput();
					self._refreshIndex();
				},activate:function(event, ui){
					ui.item.click();
				},
				receive: function(event, ui) {
					setTimeout(function() { ui.item.remove(); }, 1);
				}

			});
		}
		if (this.options.searchable) {
			this._registerSearchEvents(this.containerLayout.find('input.search'));
		} else {
			$('.search').hide();
		}
		this.container.find( ".uc7-listbox-search" ).button({
        	label: $.ui.listBox.locale.buttonText
        });
		this.container.find( ".uc7-listbox-toright" ).button({
        	label: '&gt'
        }).click(function() {
			if(self.availableList.find('.ui-state-highlight').length==0){
				alert($.ui.listBox.locale.selectEmpty);
			}else{
				self._rightRemove(self.availableList.find('.ui-state-highlight'));
				
			}
			self._fillInput();
			self._refreshIndex();
			return false;
		});
		this.container.find( ".uc7-listbox-toleft" ).button({
        	label: '&lt'
        }).click(function() {
        	if(self.selectedList.find('.ui-state-highlight').length==0){
				alert($.ui.listBox.locale.selectEmpty);
			}else{
				
				self._leftRemove(self.selectedList.find('.ui-state-highlight'));
			}
        	self._fillInput();
        	self._refreshIndex();
			return false;
		});
		this.container.find( ".uc7-listbox-alltoright" ).button({
        	label: '&gt&gt'
        }).click(function() {
        	self._rightRemove(self.availableList.children('li:visible'));
			self._fillInput();
			return false;
		});
		this.container.find( ".uc7-listbox-alltoleft" ).button({
        	label: '&lt&lt'
        }).click(function() {
        	self._leftRemove(self.selectedList.find('li'));
				self._fillInput();
				self._refreshIndex();
			return false;
		});
		this._initSource();
		
		// init lists
		if(this.options.exportWay){
			this.select.attr('name',this.id);
			this.select.addClass(this.id);
			this.inputText.attr('disabled','disabled');
		}else{
			this.inputText.attr('name',this.id);
			this.inputText.addClass(this.id);
			this.select.attr('disabled','disabled');
		}
		this.select.hide();
		if(!this.options.visible){
			this.shade();
		}
	},
	_removeListClass:function(element){
		if(element.hasClass('ui-state-highlight')){
			element.removeClass('ui-state-highlight');
		}
	},
	_rightRemove:function(obj){
		var self = this;
		//去掉显示区域的选中样式
		self._removeListClass(self.selectedList.children('li'));
		obj.each(function(i){
			 //将选中的选项添加到右边区域
			 var selected = $(this).clone(true);
				selected.appendTo(self.selectedList);
				//选中select的选项
				$(self.select.find('option')[$(this).data('idx')]).attr('selected', 'selected'); 
		 }).removeClass('ui-state-highlight').hide().removeClass('flag');
		
	
	},
	_leftRemove:function(obj){
		var self = this;
		obj.each(function(i) {
			$(self.select.find('option')[$(this).data('idx')]).removeAttr('selected'); 
		});
		//将右边区域选中的选项填充到左边区域
		self._changeList(obj);
		obj.remove();
	},
	_registerSearchEvents: function(input) {
		var self = this;

		input.keypress(function(e) {
			if (e.keyCode == 13)
				return false;
		})
		.keyup(function() {
			self._filter.apply(this, [self.availableList]);
		});
	},
	
	_filter: function(list) {
		var input = $(this);
		var rows = list.find('.flag'),
			cache = rows.map(function(){
				return $(this).text().toLowerCase();
			});
		
		var term = $.trim(input.val().toLowerCase()), scores = [];
		
		if (!term) {
			rows.show();
		} else {
			rows.hide();

			cache.each(function(i) {
				if (this.indexOf(term)>-1) { scores.push(i); }
			});

			$.each(scores, function() {
				$(rows[this]).show();
			});
		}
	},
	_changeList:function(element){
		this.availableList.find(':hidden').each(function(){
			var item = $(this);
			element.each(function(){
				if($(this).text()==item.text()){
					if(!item.hasClass('ui-state-highlight')){
						item.addClass('ui-state-highlight');
					}
					//加上过滤的标识
					item.show().addClass('flag');
				}
			});
		});
		
	},
	destroy: function() {
		this.container.remove();
		this.select.remove();
		this.inputText.remove();

		$.Widget.prototype.destroy.apply(this, arguments);
	},
	_initSource: function() {
		var self = this;
		if ( $.isArray(this.options.source) ) {
			data = this.options.source;
			this._initSelect(data);
			if(this.options.value!=''){
				this.setValue(self.options.value);
			}
			this._initContainer(self.select.find('option'));
		} else if ( typeof this.options.source === "string" ) {
			url = this.options.source;
//			$.ajax({
//				   type: "POST",
//				   url: url,
//				   dataType:'json',
//				   success: function(msg){
//					   if(!$.isArray(json) ){
//							self._initSelect(json.rows);
//						}else{
//							self._initSelect(json);
//						}
//						if(self.options.value!=''){
//							self.setValue(self.options.value);
//						}
//						self._initContainer(self.select.find('option'));
//				   }
//				});
			$.getJSON(encodeURI(url,'utf-8'), function(json){
				if(!$.isArray(json) ){
					self._initSelect(json.rows);
				}else{
					self._initSelect(json);
				}
				if(self.options.value!=''){
					self.setValue(self.options.value);
				}
				self._initContainer(self.select.find('option'));
				
				});
		}
		
	},
	_initSelect:function(data){
		var self = this, doc = this.element[0].ownerDocument;
		if(data){
			$.each(data, function(i,item){
			    $("<option value='"+item.id+"'>"+item.value+"</option>").appendTo(self.select);
			  });
		}
	},
	//设置阴影
	shade:function(){
		this.hideDiv.addClass('disableddiv');
	},
	show:function(){ 
		if(this.hideDiv.hasClass('disableddiv')){
			this.hideDiv.removeClass('disableddiv');
		}
	},
	_initContainer: function(options) {
		var self = this, doc = this.element[0].ownerDocument;
		this.selectedList.children('li').remove();
		this.availableList.children('li').remove();
		this.count = 0;
		var items = $(options.map(function(i) {
			 var selectItem ;
			 var item ;
				
			if($(this).is(":selected")){
				selectItem = self._getOptionNode(this).appendTo(self.selectedList).show();
				item = self._getOptionNode(this).appendTo(self.availableList).hide();
				selectItem.data('idx', i);
				selectItem.data('newIdx', i+1);
				selectItem.click(function(e){
					self._clickHander(e,this);
				});	
			}else{
				item = self._getOptionNode(this).appendTo(self.availableList).show().addClass('flag');
			}			
			item.click(function(e){
				self._clickHander(e,this);
			}).bind('mouseover',function(){
				$(this).addClass('ui-state-hover');
			}).bind('mouseout',function(){
				if($(this).hasClass('ui-state-hover')){
					$(this).removeClass('ui-state-hover');
				}
				
			}).bind('dblclick',function(){
				if(self.options.doubleClickable){
					if($(self.select.find('option')[$(this).data('idx')]).is(":selected")){
						self._leftRemove($(this));
					}else{
						self._rightRemove($(this));
						
						self._refreshIndex();
					}
					self._fillInput();	
				}
		
			});	
			item.data('idx', i);
			return item[0];
    }));
		
		self._filter.apply(self.containerLayout.find('input[type="text"]'), [self.availableList]);
  },
  _clickHander:function(event,obj){
		var parentLi = this.availableList;
		var flag= 'idx';
	if($(obj).data('newIdx')){
		flag = 'newIdx';
		parentLi = this.selectedList;
	}
      if(event.shiftKey){
    	  var beginNum, lastNum;
          if (this.rem.data(flag) <= $(obj).data(flag)) {
              beginNum = this.rem.data(flag);
              lastNum = $(obj).data(flag);
          }else {
              beginNum = $(obj).data(flag);
              lastNum = this.rem.data(flag);
          }
         
				parentLi.find('li').each(function(){
					if($(this).data(flag)>=beginNum&&$(this).data(flag)<=lastNum){
						if(!$(this).hasClass('ui-state-highlight')){
							$(this).addClass('ui-state-highlight');
						}
					}
				});
				this.rem = $(obj);
				 
      }else if(event.ctrlKey){
    	  if(!$(obj).hasClass('ui-state-highlight')){
  			$(obj).addClass('ui-state-highlight');
  		}else{
  			$(obj).removeClass('ui-state-highlight');
  		}
      }else{
    	  parentLi.find('li').removeClass('ui-state-highlight');
          if(!$(obj).hasClass('ui-state-highlight')){
    			$(obj).addClass('ui-state-highlight');
    		}else{
    			$(obj).removeClass('ui-state-highlight');
    		}
          this.rem = $(obj); 
      }
				
  },
	_getOptionNode: function(option) {
		option = $(option);
		var node = $('<li name="'+option.val()+'" title="'+option.text()+'">'+option.text()+'</li>').hide();
		node.data('optionLink', option);
		return node;
	},
	_fillInput: function() {
		var self = this;
		if(this.inputText.val()!=''){
			this.inputText.val('');
		}
		this.selectedList.find('li').each(function(){
			self.inputText.val(self.inputText.val()+','+$(this).attr('name'));
		});
	},
	_refreshIndex: function() {
		this.selectedList.find('li').each(function(i){
			$(this).data('newIdx',i+1);
		});
	},
	setValue:function(value){
		var self = this;
		//var liItems = new Array();
		if(typeof value === "string"){
			this.select.find('option').each(function(i){
				if($(this).val()==value){
					$(this).attr('selected','selected');
					
				}
			});
			self.availableList.find('li').each(function(){
				var obj = $(this);
				if(obj.attr('name')==value){
					var selected = $(this).clone(true);
					selected.appendTo(self.selectedList);
					$(this).removeClass('flag').hide();
				}
			});
			this.inputText.val(value);
		}else if($.isArray(value)){
			var inputVal ='';
			if(value!=''){
				for(var i =0;i<value.length;i++){
					var val = value[i];
					var item ;
					if(typeof val === "string"){
						item = value[i];
					}else{
						item = value[i].id;
					}
					self.select.find('option').each(function(){
						
					if($(this).val()==item){
						$(this).attr('selected','selected');
					}
				});
					
					self.availableList.find('li').each(function(){
						var obj = $(this);
						if(obj.attr('name')==item){
							var selected = $(this).clone(true);
							selected.appendTo(self.selectedList);
							$(this).removeClass('flag').hide();
						}
					});
					inputVal =inputVal+','+item;
				}
			}
			
			
				this.inputText.val(inputVal);
	}
		//self._initContainer(self.select.find('option'));
		//self._rightRemove($(liItems));
		self._fillInput();
		self._refreshIndex();
	},
	getValue:function(type){
		
		if(type!=null&&type=='object'){
			var result = new Array();
			this.select.find('option').each(function(){
				if($(this).attr('selected')=='selected'){
					result.push({id:this.value,value:this.text});
				}
			});
			return result;
		}else{
			if(this.options.exportWay){
				return this.select.val();
			}else{
				return this.inputText.val();
			}	
		}
	},
	reset:function(){
		this._leftRemove(this.selectedList.find('li'));
		this._fillInput();
		this._refreshIndex();
	},
	getSortData:function(){
		var ids='';
		var values='';
		this.selectedList.find('li').each(function(){
			ids+=','+$(this).attr('name');
			values+=','+$(this).text();
			
		});
		if(ids.length>0){
			ids = ids.substring(1);
			values = values.substring(1);
		}
		var result = {id:ids,value:values};
		return result;
	},
	getResultData:function(){
		var id='';
		var value='';
		var result = new Array();
		this.selectedList.find('li').each(function(i){
			
			id=$(this).attr('name');
			value=$(this).text();
			result[i] = {id:id,value:value}
		});
		return result;
	}


});
		
$.extend($.ui.listBox, {
	locale: {
		buttonText:'查询',
		listBoxText:'双击添加选项',
		promptText:'使用"Ctrl"和"Shift"键选择多个选项!',
		selectEmpty:'请选中一个选项',
		addText:'待选中:',
		selectedText:'已选中:',
		sortPromptText:'拖动改变顺序'
	}
});


})(jQuery);
