/**
 * 意见反馈
 */
var isupload = false;
var  region_id;//全局变量，当点击弹出修改框时 返回一个当前修改的id值
var TableInit = function() {
	var oTableInit = new Object();
	// 初始化Table
	oTableInit.Init = function() {
		$("#tab_knowledge").bootstrapTable({
			url : "knowledgeRequestPing.do", // 请求后台的URL（*）
			method : "post", // 请求方式（*）
			toolbar : "#toolbar", // 工具按钮用哪个容器
			striped : true, // 是否显示行间隔色
			cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination : true, // 是否显示分页（*）
			sortable : false, // 是否启用排序
			sortOrder : "asc", // 排序方式
			queryParams : oTableInit.queryParams,// 传递参数（*）
			sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
			//pageNumber : 1, // 初始化加载第一页，默认第一页
			pageSize : 5, // 每页的记录行数（*）
			pageList : [ 10, 25, 50, 100 ], // 可供选择的每页的行数（*）

			minimumCountColumns : 2, // 最少允许的列数
			clickToSelect : true, // 是否启用点击选中行
			height : $(window).height(), // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
			uniqueId : "ID", //每一行的唯一标识，一般为主键列
			// showToggle:true, //是否显示详细视图和列表视图的切换按钮
			// cardView: false, //是否显示详细视图
			detailView : false, //是否 显示父子表
			columns : [ {
				checkbox : true
			}, {
				field : "knowledge_id",
				title : "ID"
			}, {
				field : "knowledge_keyword",
				title : "关键词"
			},{
				field : "knowledge_title",
				title : "标题"
			},{
				field : "lift_equipment_model",
				title : "电梯型号"
			},{
				field : "lift_equipment_brand",
				title : "电梯品牌"
			},{
				field : "knowledge_uploader",
				title : "上传者"
			},{
				field : "knowledge_data",
				title : "上传时间"
			}
			,{
				field : "knowledge_adoption_rate",
				title : "采纳率",
				width : '200',
				   formatter: function(val,row,index){
					   if(val=='0'){
							
						   return '<span><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" ></span>';
						}
					   if (val=='1') {
						   
						   return '<span><img  src="img/bright_star.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" ></span>';	
				      	}
					   if (val=='2') {
						   
						   return '<span><img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" ></span>';	
				      	}
					   if (val=='3') {
						   
						   return '<span><img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" ></span>';	
				      	}
					   if (val=='4') {
						   
						   return '<span><img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star_kong.png" ></span>';	
				      	}
					   if (val=='5') {
						   
						   return '<span><img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star.png" ></span>';	
				      	}
					   
                       return val;
                   }
			
        },
			]
		});
		$.contextMenu({
		    // define which elements trigger this menu
		    selector: "#tab_knowledge tr",
		    // define the elements of the menu   
		    items: {
		        add: {name: "新增", icon: "add",  callback: function(key, opt){ 
		        	clearKnowledge();
		 			queryuser();
		 			uuid();
					$("#addModal").modal("show")}},
		        edit: {name: "修改",icon: "edit", callback: function(key, opt){ 
		        	var selectData = $("#tab_knowledge").bootstrapTable('getSelections');
					if (selectData.length == 0) {
					
						bootbox.alert({
						    message: "请勾选要查看的数据!",
						    buttons: {
								   ok: {
									    label: '知道了',
								    }
							},
						});
						return;
					}if(selectData.length > 1)
					{
						bootbox.alert({
						    message: "只能勾选一条!",
						    buttons: {
								   ok: {
									    label: '知道了',
								    }
							},
						});
						return;
					}else{
						queryuser();
					    queryUpknowledge();
					    //uuid();
					}
		        }} ,
		    	del: {name: "删除", icon: "delete",callback: function(key, opt){ 
		    		doDeletedel();
			    		   }},
			    detail: {name: "详情", icon: "detail",  callback: function(key, opt){ 
			    	var selectData = $("#tab_knowledge").bootstrapTable('getSelections');
					if (selectData.length == 0) {

						bootbox.alert({
						    message: "请勾选要查看的数据!",
						    buttons: {
								   ok: {
									    label: '知道了',
								    }
							},
						});
						return;
					}if(selectData.length > 1)
					{
						
						bootbox.alert({
						    message: "只能勾选一条!",
						    buttons: {
								   ok: {
									    label: '知道了',
								    }
							},
						});
						return;
					}else{
					    queryOne();
					} 		
				}},			  
				query: {name: "查看文档", icon: "query",  callback: function(key, opt){ 
					var selectRows = $("#tab_knowledge").bootstrapTable("getSelections");
					if (selectRows == "") {

						bootbox.alert({
						    message: "请勾选需要查看的数据!",
						    buttons: {
								   ok: {
									    label: '知道了',
								    }
							},
						});
						return;
					}
					if (selectRows.length > 1) {
						bootbox.alert({
						    message: "只能勾选一条记录!",
						    buttons: {
								   ok: {
									    label: '知道了',
								    }
							},
						});
						return;
					}
					// 获取选中行第一行
					var knowledgeInfo = selectRows[0];
					var id = knowledgeInfo.knowledge_file_url;
					window.location.href = "appQueryKnowledgeView.do?id=" + id;
				}},		   
	    		 
		    }
		   
		});	
	};
	// 得到查询的参数
	oTableInit.queryParams = function(params) {
		var temp = { // 这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
			limit : params.limit, // 页面大小
			offset : params.offset
		// 页码

		};
		var region = $("#knowledge_keyword").val();
		if (region != '' && region != null && regional !== '关键字查询') {
			temp['param1'] = region;
		}
		var regional = $("#knowledge_adoption_rate").val();
		if (regional != '' && regional != null) {
			temp['param2'] = regional;
		}
		return temp;
	};
	return oTableInit;
};

/*******************************************************************************
 * 按钮事件定义
 * 
 * @returns
 */
var ButtonInit = function() {
	var oInit = new Object();
	var postdata = {};
	oInit.Init = function() {
		// 初始化页面上面的按钮事件 
		//条件查询
		$("#quer_notice").click(function(){
			
			refresh();
		})
         $("#btn_add").click(function(){
        	clearKnowledge();
 			queryuser();
 			uuid();
			$("#addModal").modal("show");
		})
		//新增保存
		$("#knowledge_servation").click(function(){
			save();
			
		})
		//条件查询复位
		$("#Refresh_notice").click(function(){
			
			clearUpForm();
		})
		// 主页面删除功能
		$("#btn_del").click(function(){
			doDeletedel();
		})
		//修改保存
		$("#upsevnkno").click(function(){
			upSvenKnowledge();
		})
		//查看详情
		$("#btn_query").click(function(){
			 //clearKnowledge();
			var selectData = $("#tab_knowledge").bootstrapTable('getSelections');
			if (selectData.length == 0) {

				bootbox.alert({
				    message: "请勾选要查看的数据!",
				    buttons: {
						   ok: {
							    label: '知道了',
						    }
					},
				});
				return;
			}if(selectData.length > 1)
			{
				
				bootbox.alert({
				    message: "只能勾选一条!",
				    buttons: {
						   ok: {
							    label: '知道了',
						    }
					},
				});
				return;
			}else{
			    queryOne();
			}
		})
		//修改
		$("#btn_edit").click(function(){
			 //clearKnowledge();
			var selectData = $("#tab_knowledge").bootstrapTable('getSelections');
			if (selectData.length == 0) {
			
				bootbox.alert({
				    message: "请勾选要查看的数据!",
				    buttons: {
						   ok: {
							    label: '知道了',
						    }
					},
				});
				return;
			}if(selectData.length > 1)
			{
				bootbox.alert({
				    message: "只能勾选一条!",
				    buttons: {
						   ok: {
							    label: '知道了',
						    }
					},
				});
				return;
			}else{
				queryuser();
			    queryUpknowledge();
			    //uuid();
			}
		})
	};
	return oInit;
};
//详情
function   queryOne(){
    var selectData = $("#tab_knowledge").bootstrapTable('getSelections');
	$("#knowledge_keyword22").val(selectData[0].knowledge_keyword);
	$("#knowledge_title2").val(selectData[0].knowledge_title);
	$("#lift_equipment_model2").val(selectData[0].lift_equipment_model);
	$("#lift_equipment_brand2").val(selectData[0].lift_equipment_brand);
	$("#knowledge_context2").val(selectData[0].knowledge_content);
	$.ajax({
			type : "POST", // post提交方式默认是get
			url : "queryKnowledge.do",
			data : {
				"maint_company_id" : selectData[0].maint_company_id
			},
			success : function(data) {
			$("#maint_company_id2").val(data.maint_comp_name);
			$("#changeModal").modal("show");
			}
		});
}
//修改
function    queryUpknowledge(){
	
	 var selectData = $("#tab_knowledge").bootstrapTable('getSelections');
		$("#knowledge_keyword3").val(selectData[0].knowledge_keyword);
		$("#knowledge_title3").val(selectData[0].knowledge_title);
		$("#lift_equipment_model3").val(selectData[0].lift_equipment_model);
		$("#lift_equipment_brand3").val(selectData[0].lift_equipment_brand);
		$("#knowledge_context3").val(selectData[0].knowledge_content);
		$("#edit_id").val(selectData[0].knowledge_file_url);
		$("#upModal").modal("show");

}
function    upSvenKnowledge(){
	 var selectData = $("#tab_knowledge").bootstrapTable('getSelections');
	 var knowledge_keyword = $("#knowledge_keyword3").val();
	 var name = $("#knowledge_title3").val();
	 var maint_company_id = $("[name='notice_maint_id3']").val();
	 var lift_type= $("#lift_equipment_model3").val();
	 var lift_equipment_brand = $("#lift_equipment_brand3").val();
	 var knowledge_content = $("#knowledge_context3").val();
	 var knowledge_id = selectData[0].knowledge_id;
	 if(knowledge_keyword==""){
		 toastr.error("标题不能为空");
		 return;
	 }
	 if(knowledge_keyword.length>=32){
		 toastr.error("标题不能超过32字符");
		 return;
	 }
	 if(name==""){
		 toastr.error("关键词不能为空");
		 return;
	 }
	 if(name.length>=32){
		 toastr.error("关键词不能超过32字符");
		 return;
	 }
	 if(lift_type==""){
		 toastr.error("电梯型号不能为空");
		 return;
	 }
	 if(lift_type.length>=32){
		 toastr.error("电梯型号不能超过32字符");
		 return;
	 }
	 if(lift_equipment_brand==""){
		 toastr.error("电梯品牌不能为空");
		 return;
	 }
	 if(lift_equipment_brand.length>=32){
		 toastr.error("电梯品牌不能超过32字符");
		 return;
	 }
	 if(knowledge_context==""){
		 toastr.error("内容不能为空");
		 return;
	 }
	 if(knowledge_context.length>=200){
		 toastr.error("内容不能超过200字符");
		 return;
	 }
	 var company = {"knowledge_keyword":knowledge_keyword,
			 "knowledge_title":name,
			 "lift_equipment_model":lift_type,
			 "knowledge_content":knowledge_content,
			 "maint_company_id":maint_company_id,
			 "lift_equipment_brand":lift_equipment_brand,
			 "knowledge_id":knowledge_id,
			  "knowledge_file_url": $("#edit_id").val()
	 };
	 $.ajax({
			type : "POST", //post提交方式默认是get
			url : "modifyKnowledge.do",
			contentType : 'application/json;charset=utf-8',
			data : JSON.stringify(company),
			error : function(request) {
				swal(request.msg, "","error");
			},
			success : function(obj) {
				if(obj.success){
					$("#upModal").modal("hide");
					$("#tab_knowledge").bootstrapTable('refresh');
				}else{
					swal(obj.msg, "","error");
				}
			}
		});
}
//给上传文件的HTML组成一个唯一文件名
function   uuid(){
	$.ajax({
		type : "POST", //post提交方式默认是get
		url : "updelUuid.do",
		success : function(obj) {
			$("#add_id").val(obj)
			$("#edit_id").val(obj)
		}
	});
	
}

//删除数量
function doDeletedel(){
	 var selectRows= $("#tab_knowledge").bootstrapTable("getSelections");
		if(selectRows==""){

			bootbox.alert({
			    message: "请勾选后再操作!",
			    buttons: {
					   ok: {
						    label: '知道了',
					    }
				},
			});
			return;
		}
		//删除数据的数目
		$('#del_date i').eq(0).text(selectRows.length);
		//加载模态框
		$("#delModal").modal("show");
}

//主页面删除
//删除
function dodel(){
	var selectRows = $("#tab_knowledge").bootstrapTable("getSelections");
	if(selectRows==""){

		bootbox.alert({
		    message: "请勾选后再操作!",
		    buttons: {
				   ok: {
					    label: '知道了',
				    }
			},
		});
		return;
	}
		var company =selectRows;
		$.ajax({
			type : "POST", //post提交方式默认是get
			url : "deleteKnowledge.do",
			contentType : 'application/json;charset=utf-8',
			data : JSON.stringify(company),
			success : function(obj) {
				if(obj.success){
					toastr.success(obj.msg);
					$("#delModal").modal("hide");
					refresh();
					return;
				}else{
					swal(obj.msg, "","error");
					return;
				}
			}
		});
	
}
//新增页面文件上传，必须先点击上方的上传按钮才可以
$("#file-info").fileinput({
	uploadUrl : 'uploadKnowledgeBase.do',
	allowedFileExtensions : [ 'docx', 'doc' ],// 接收的文件后缀,
	overwriteInitial : false,
	maxFileSize : 200000, // 文件大小 ，为0时不限制.单位kb
	maxFilesNum : 1,
	maxFileCount : 1, // 最大数量
	language : 'zh', // 设置语言
	dropZoneTitle : "拖拽非空文件到这里...",
	slugCallback : function(filename) {
		return filename.replace('(', '_').replace(']', '_');
	},
	uploadExtraData : function() {
		// 设置参数只能这么干
		return {
			"id" : $("#add_id").val()
		};
	},
	previewFileIcon : "<i class='glyphicon glyphicon-king'></i>",
	msgFilesTooMany : "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
});
//修改页面文件上传，必须先点击上方的上传按钮才可以
$("#file-infoup").fileinput({
	uploadUrl : 'uploadKnowledgeBaseModify.do',
	allowedFileExtensions : [ 'docx', 'doc' ],// 接收的文件后缀,
	overwriteInitial : false,
	maxFileSize : 200000, // 文件大小 ，为0时不限制.单位kb
	maxFilesNum : 1,
	maxFileCount : 1, // 最大数量
	language : 'zh', // 设置语言
	dropZoneTitle : "拖拽非空文件到这里...",
	slugCallback : function(filename) {
		return filename.replace('(', '_').replace(']', '_');
	},
	uploadExtraData : function() {
		// 设置参数只能这么干
		return {
			"id" : $("#edit_id").val()
		};
	},
	previewFileIcon : "<i class='glyphicon glyphicon-king'></i>",
	msgFilesTooMany : "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
});
//条件查询复位
function clearUpForm() {
	$("#knowledge_keyword").val("");
	$("#knowledge_adoption_rate").val("");
}
//新增表单清空
function clearKnowledge() {
	$("#addForm")[0].reset();
}
//查询当前的用户是什么角色
//如果是管理员就把所有维保公司全部查询出来
function  queryuser(){
	$.ajax({
		type : "POST", // post提交方式默认是get
		url : "queryUserKnowledge.do",
		success : function(obj) {
        var  sel="<select name='notice_maint_id' id='selaaa'>";
        
	        $.each(obj,function(i, n) {
	        	sel+="<option value="+n.maint_id+">"+n.maint_comp_name+"</option>";
			})
			sel+="</select>";
	        $("#noticemaint").html(sel);
	        $("#noticemaint3").html(sel);
		}
	});
}
//查看知识库文件
function queryKnowledgeFile() {
	var selectRows = $("#tab_knowledge").bootstrapTable("getSelections");
	if (selectRows == "") {

		bootbox.alert({
		    message: "请勾选需要查看的数据!",
		    buttons: {
				   ok: {
					    label: '知道了',
				    }
			},
		});
		return;
	}
	if (selectRows.length > 1) {
		bootbox.alert({
		    message: "只能勾选一条记录!",
		    buttons: {
				   ok: {
					    label: '知道了',
				    }
			},
		});
		return;
	}
	// 获取选中行第一行
	var knowledgeInfo = selectRows[0];
	var id = knowledgeInfo.knowledge_file_url;
	window.location.href = "appQueryKnowledgeView.do?id=" + id;
}
function save() {
	 var code = $("#knowledge_keyword2").val();
	 var name = $("#knowledge_title").val();
	 var lift_type= $("#lift_equipment_model").val();
	 var maintenance_type = $("#maintenance_type").val();
	 var knowledge_context = $("#knowledge_context").val();
	 var maint_company_id = $("[name='notice_maint_id']").val();
	 var lift_equipment_brand = $("#lift_equipment_brand").val();
	 if(code==""){
		 toastr.error("标题不能为空");
		 return;
	 }
	 if(code.length>=32){
		 toastr.error("标题不能超过32字符");
		 return;
	 }
	 if(name==""){
		 toastr.error("关键词不能为空");
		 return;
	 }
	 if(name.length>=32){
		 toastr.error("关键词不能超过32字符");
		 return;
	 }
	 if(lift_type==""){
		 toastr.error("电梯型号不能为空");
		 return;
	 }
	 if(maintenance_type==""){
		 toastr.error("电梯品牌不能为空");
		 return;
	 }

	 if(knowledge_context==""){
		 toastr.error("内容不能为空");
		 return;
	 }
	 if(knowledge_context.length>=200){
		 toastr.error("内容不能超过200字符");
		 return;
	 }
	 var company = {"knowledge_keyword":code,
			 "knowledge_title":name,
			 "lift_equipment_model":lift_type,
			 "maintenance_type":maintenance_type,
			 "knowledge_content":knowledge_context,
			 "maint_company_id":maint_company_id,
			 "lift_equipment_brand":lift_equipment_brand,
			 "add_id":$("#add_id").val()
	 };
	 $.ajax({
			type : "POST", //post提交方式默认是get
			url : "saveKnowledge.do",
			contentType : 'application/json;charset=utf-8',
			data : JSON.stringify(company),
			error : function(request) {
				swal(request.msg, "","error");
			},
			success : function(obj) {
				if(obj.success){
					$("#addModal").modal("hide");
					$("#tab_knowledge").bootstrapTable('refresh');
				}else{
					swal(obj.msg, "","error");
				}
			}
		});
}
//刷新方法
function refresh() {
	$("#tab_knowledge").bootstrapTable('refreshOptions',{pageNumber:1})
}

