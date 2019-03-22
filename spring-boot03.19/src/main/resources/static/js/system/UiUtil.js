function UiUtil(){
	this.formSubmit = null;
	
	this.loadOrgType= function(elementId,org_type_id,isAll){
		$.ajax({
			type : "post",
			url : "findOrgType.do",
			dataType : "json",
			success : function(result) {
				if(result==""){
					return;
				}
				var tempAjax = "";
				if(isAll){
					tempAjax += "<option value='' selected>全部</option>";
				}
				$.each(result,function(index,row){
					if(org_type_id==row.org_type_id){
						tempAjax += "<option value='"+row.org_type_id+"' selected>"+row.org_type_code + " " + row.org_type_name+"</option>";
					}else{
						tempAjax += "<option value='"+row.org_type_id+"'>"+row.org_type_code + " " + row.org_type_name+"</option>";
					}
				});
				$(elementId).empty();
				$(elementId).append(tempAjax);
			},
			error : function() {
				alert("结构加载失败！");
			}
		});
	};
	
	this.loadCompany = function(elementId){
		$.ajax({
			type : "post",
			url : "findCompany.do",
			dataType : "json",
			success : function(result) {
				if(result==""){
					return;
				}
				var tempAjax = "";
				$.each(result,function(index,row){
					if(index==1){
						tempAjax += "<option value='"+row.id+"' selected>"+ row.name+"</option>";
					}else{
						tempAjax += "<option value='"+row.id+"'>" + row.name+"</option>";
					}
				});
				$(elementId).empty();
				$(elementId).append(tempAjax);
			},
			error : function() {
				alert("结构加载失败！");
			}
		});
	};
	
	/**
	 * 
	 */
	this.loadRole = function(elementId,role_id){
		$.ajax({
			type : "post",
			url : "queryRole.do",
			dataType : "json",
			success : function(result) {
				if(result==""){
					return;
				}
				var tempAjax = "";
				$.each(result,function(index,row){
					if(role_id==row.role_id){
						tempAjax += "<option value='"+row.role_id+"' selected>"+row.role_code+" "+row.role_name+"</option>";
					}else{
						tempAjax += "<option value='"+row.role_id+"'>"+row.role_code+" "+row.role_name+"</option>";
					}
				});
				$(elementId).empty();
				$(elementId).append(tempAjax);
			},
			error : function() {
				alert("结构加载失败！");
			}
		});
	};
	
	/**
	 * 
	 */
	this.loadParentMenu = function(elementId,menu_id){
		var httpAjax = new HttpAjax();
		httpAjax.doAjax({
			type : "post",
			url : "findFirstGradeMenu.do",
			dataType : "json",
			success : function(result) {
				if(result==""){
					return;
				}
				var tempAjax = "<option value='' selected></option>";
				$.each(result,function(index,row){
					if(menu_id==row.menu_id){
						tempAjax += "<option value='"+row.menu_id+"' selected>"+row.menu_code+" "+row.menu_name+"</option>";
					}else{
						tempAjax += "<option value='"+row.menu_id+"'>"+row.menu_code+" "+row.menu_name+"</option>";
					}
				});
				$(elementId).empty();
				$(elementId).append(tempAjax);
			},
			error : function() {
				alert("结构加载失败！");
			}
		})
	};
	
	/**
	 * 
	 */
	this.loadEnabled = function(elementId,value){
		var values=[{"id":"1","name":"启用"},{"id":"0","name":"停用"}];
		var tempAjax = "";
		$.each(values,function(index,obj){
			if(value==obj.id){
				tempAjax += "<option value='"+obj.id+"' selected>"+obj.name+"</option>";
			}else{
				tempAjax += "<option value='"+obj.id+"'>"+obj.name+"</option>";
			}
		});
		$(elementId).empty();
		$(elementId).append(tempAjax);
	}
	
	
	/**
	 * 
	 */
	this.loadSearchField = function(columns,columnEleId){
		if(columns==""){
			return;
		}else{
			var shtml = "";
			$.each(columns,function(index,column){
				shtml = shtml+"<option value='"+column.code+"'>"+column.name+"</option>";
			});
			$(columnEleId).append(shtml);
		}
	};
	
	
	this.getFormData = function(formId){
		var txts = $("#"+formId+" input");
		var selects = $("#"+formId+" select");
		var textareas = $("#"+formId+" textarea");
		var jsonStr = "{";
		$.each(txts,function(index,control){
			jsonStr+=$(control).attr("id");
			jsonStr+=":";
			jsonStr+="'";
			jsonStr+=$(control).val();
			jsonStr+="'";
			jsonStr+=",";
		});
		$.each(selects,function(index,control){
			jsonStr+=$(control).attr("id");
			jsonStr+=":";
			jsonStr+="'";
			jsonStr+=$(control).val();
			jsonStr+="'";
			jsonStr+=",";
		});
		if(textareas!=""){
			$.each(textareas,function(index,control){
				jsonStr+=$(control).attr("id");
				jsonStr+=":";
				jsonStr+="'";
				jsonStr+=$(control).val();
				jsonStr+="'";
				jsonStr+=",";
			});
		}
		jsonStr = jsonStr.substring(0,jsonStr.length-1);
		jsonStr+="}";
		var json = eval("("+jsonStr+")");
		alert(jsonStr);
		return json;
	};
	
	/**
	 * 
	 */
	this.validate = function(formId,fn){
		this.formSubmit = fn;
		var txts = $("#"+formId+" input");
		var selects = $("#"+formId+" select");
		var isValid = true;
		$.each(txts,function(index,control){
			var required = $(control).attr("required");
			var value = $(control).val();
			var title=$(control).attr("title");
			if(required=="required"){
				if(value==""){
					swal(title+"不能为空！");
					isValid = false;
					return false;
				}
			}
			
		});
		$.each(selects,function(index,control){
			var required = $(control).attr("required");
			var value = $(control).val();
			var title=$(control).attr("title");
			if(required=="required"){
				if(value==""){
					swal(title+"不能为空！");
					isValid = false;
					return false;
				}
			}
		});
		if(isValid){
			this.formSubmit();
		}
	};
	
	
	/**
	 * 
	 */
	this.loadJsTree = function(elementId,url,isCheckBox) {
		var plugin = ["Fonts", "Images", "Scripts", "Templates"];
		if(isCheckBox){
			plugin.push("checkbox");
		}
		$(elementId).jstree({
			"core" : {
				"data" : {url:url}
 
			},
			"checkbox":{
		          "undetermined":false,
		          "three_state":true
		        },
			// "checkbox" : {
			// "keep_selected_style" : false
			// },
			// "plugins" : [ "wholerow", "checkbox" ]
			"plugins" : plugin
		});
	};
	
	/**
	 * 
	 */
	this.refreshJsTree = function(elementId,url,isCheckBox,paramData){
		var httpAjax = new HttpAjax();
		httpAjax.doAjax({
			type : "post", //post提交方式默认是get
			url : url,
			cache:false,
			async: false,
			dataType : 'json',
			data : paramData,
			error : function(request) {
				swal(JSON.stringify(request), "", "error");
			},
			success : function(result) {
				if (result == "") {
					return;
				}else{
					//alert(JSON.stringify(result));
					var url = url+"?p="+new Date().getTime();
					var plugin = ["Fonts", "Images", "Scripts", "Templates"];
					if(isCheckBox){
						plugin.push("checkbox");
					}
					$.jstree.destroy();
					$(elementId).data('jstree', false).empty();
					$(elementId).jstree({"core":{data:result},"plugins":plugin});  
				}
			}
		});
	}
	
}