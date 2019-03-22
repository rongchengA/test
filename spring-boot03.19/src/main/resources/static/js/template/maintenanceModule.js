/**
 * beaf 通用基础数据增删改查
 * 包括增删改查表格的实现 ..后续继续添加更多功能
 */
var  region_id;//全局变量，当点击弹出修改框时 返回一个当前修改的id值
var TableInit = function() {
	var oTableInit = new Object();
	// 初始化Table
	oTableInit.Init = function() {
		$("#tab_maintenance").bootstrapTable({
			url : "queryMaintenanceModuleList.do", // 请求后台的URL（*）
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
			detailView : false, // 是否显示父子表
			columns : [ {
				checkbox : true
			}, {
				field : "template_code",
				title : "模板编号"
			}, {
				field : "template_name",
				title : "模板名称"
			}, {
				field : "template_lift_type",
				title : "电梯类型",
			formatter:function (val,row,index){
						if (val=='0') {
							return  '直梯';
						}
						if(val=='1'){
							
							return  '扶梯';
						}
						if(val=='2'){
							
							return  '自动人行道';
						}
						if(val=='3'){
							
							return  '杂物梯';
						}else{
							
							return  '无';
						}
						return val;
					}
			},{
				field : "template_maint_type",
				title : "维保类型",
				formatter:function (val,row,index){
					if (val=='0') {
						return  '半月维保';
					}
					if(val=='1'){
						
						return  '月维保';
					}
					if(val=='2'){
						
						return  '季度维保';
					}
					if(val=='3'){
						
						return  '半年维保';
					}
					if (val=='4') {
						
						return  '年维保';
					}else{
						
						return  '无';
					}
					return val;
				}
			},{
				field : "template_file_url",
				title : "维保内容"
			},{
				field : "template_status",
				title : "使用状态",
				formatter:function (val,row,index){
					if (val=='0') {
						return  '未启用';
					}
					if (val=='1') {
						
						return  '正在使用';
					}
					if (val=='2') {
						
						return  '已废止';
					}
					else{
						
						return  '无';
					}
					return val;
				}
			},

			]
		});
		$.contextMenu({
		    // define which elements trigger this menu
		    selector: "#tab_maintenance tr",
		    // define the elements of the menu   
		    items: {
		        add: {name: "新增", icon: "add",  callback: function(key, opt){ 
		        	coke();
		        	$("#window_add").modal("show");
		        	clearAddForm();}},
		    	del: {name: "删除", icon: "delete",callback: function(key, opt){ 
		    			deletecheck();
				    		   }},
				invalid: {name: "作废",icon: "invalid", callback: function(key, opt){ 
					invalid();
		        	}},
		        ModuleEnable: {name: "启用",icon: "ModuleEnable", callback: function(key, opt){ 
		        	ModuleEnable()
			        	}},
			        	Details: {name: "模板详情",icon: "Details", callback: function(key, opt){ 
			        		Details();
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
		var region = $('#search_chr_name').val();
		if (region != '' && region != null && region!=='请输入模板名称') {
			temp['param1'] = region;

		}
		var regional = $('[name="search_lift_type"]').val();
		if (regional != '' && regional != null && regional !== '电梯类型') {
			temp['param2'] = regional;
		}
		var regional = $('[name="search_maintenance_type"]').val();
		if (regional != '' && regional != null && regional !== '维保类型') {
			temp['param3'] = regional;
		}
		return temp;
	};
	return oTableInit;
};
var ButtonInit = function() {
	var oInit = new Object();
	var postdata = {};
	oInit.Init = function() {
		// 初始化页面上面的按钮事件 
		

		// 主页面删除功能
		$("#btn_del").click(function(){
			doDeletedel();
		})
		//页面条件查询的刷新
		$("#refresh").click(function(){
			
			$("[name='regional_name']").val("");
			$("[name='regional_scope']").val("");
		})
		//刷新表单方法
		$("#fuzzyquery").click(function(){
			
			refresh();
		})

		//修改的方法
		// 修改按钮
		$("#btn_quer").click(function() {
			clearUpForm();
			var selectRows = $("#tab_opinion").bootstrapTable("getSelections");
			if (selectRows == "") {
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
			if(selectRows.length>1){
				bootbox.alert({
				    message: "只能勾选一条数据!",
				    buttons: {
						   ok: {
							    label: '知道了',
						    }
					},
				});
				return;
			}
			var region = selectRows[0];
			initEditWindowData(region);
			// 显示窗口
			$("#modifyModal").modal("show");
		})
	};
	return oInit;
};

function resetInfo() {
	$("#code").find('input[type="text"]').each(function(){
		$("#search_chr_name").val("请输入模板名称");
	});
			  // 复位下拉菜单
	$("#code").find('select').each(function(){
		$("#search_lift_type").val("电梯类型");
		$("#search_maintenance_type").val("维保类型");
	});
	
};

//新增
function doAdd() {
	coke();
	$("#window_add").modal("show");
	clearAddForm();
  }
function clearAddForm(){
	$("#addForm")[0].reset();
	$("#editForm")[0].reset();
}
//刷新方法
function refresh() {
	$("#tab_maintenance").bootstrapTable('refreshOptions',{pageNumber:1})
}
//给维保模板一个唯一的code
function    coke(){
	
	$.ajax({
		type : "POST", //post提交方式默认是get
		async:true,
		url :"maintenanceCoke.do",
		success : function(obj) {
			$("#chr_code").val(obj)
		}
	});
}
//作废功能
function invalid(){

		var selectRows = $("#tab_maintenance").bootstrapTable("getSelections");
		if(selectRows==""){
			bootbox.alert({
			    message: "请勾选需要作废的模板!",
			    buttons: {
					   ok: {
						    label: '知道了',
					    }
				},
			});
			return;
		}
		var template_code = $.map(selectRows,function(row){
			return row.template_code;
		}).toString();
	$.ajax({
		type : "POST", //post提交方式默认是get
		async:true,
		url :"invalidMaintModule.do",
		data : {
			"template_code" : template_code,
		},
		error : function(request) {
			swal(request.msg, "","error");
		},
		success : function(obj) {
			if(obj.success){
				toastr.success(obj.msg);
				$("#tab_maintenance").bootstrapTable('refreshOptions',{pageNumber:1})
			  }else{
				  toastr.error(obj.msg);
				  $("#tab_maintenance").bootstrapTable('refreshOptions',{pageNumber:1})
			}
		}
	});
}; 
//删除选中数据判断
function deletecheck() {
	var selectData = $("#tab_maintenance").bootstrapTable('getSelections');
	if (selectData.length == 0) {
		bootbox.alert({
		    message: "请勾选需要删除的数据!",
		    buttons: {
				   ok: {
					    label: '知道了',
				    }
			},
		});
		return;
	}
	for (var i=0;i<selectData.length;i++){//判断是否有使用中 和废弃的模板
		if(selectData[i].template_status!='0'){
			bootbox.alert({
			    message: "只能勾选未使用的模板!",
			    buttons: {
					   ok: {
						    label: '知道了',
					    }
				},
			});
			return;
		}
	}
			//删除数据的数目
			$('#del_date i').eq(0).text(selectData.length);
			//加载模态框
			$("#delModal").modal("show");

}
//删除
function dodel(){
	var selectRows = $("#tab_maintenance").bootstrapTable("getSelections");
	var template_id = $.map(selectRows,function(row){
		return row.template_id;
	}).toString();
	$.ajax({
		type : "POST", //post提交方式默认是get
		url : "deleteMaintenance.do",
		data : {"template_id":template_id},
		success : function(obj) {
			if(obj.success){
				toastr.success(obj.msg);
				$("#delModal").modal("hide");
				$('#tab_maintenance').bootstrapTable('refresh');
			  }else{
				  toastr.error(obj.msg);
			}
		}
	});
}
//启用功能
function ModuleEnable(){
	var selectRows = $("#tab_maintenance").bootstrapTable("getSelections");
	if(selectRows==""){
		bootbox.alert({
		    message: "请勾选需要启用的模板!",
		    buttons: {
				   ok: {
					    label: '知道了',
				    }
			},
		});
		return;
	}
	var template_code = $.map(selectRows,function(row){
		return row.template_code;
	}).toString();
	$.ajax({
		type : "POST", //post提交方式默认是get
		async:true,
		url :"enableMaintModule.do",
		data : {
			"template_code" : template_code
		},
		success : function(obj) {

			if(obj.success){
				toastr.success(obj.msg);
				 $("#tab_maintenance").bootstrapTable('refreshOptions',{pageNumber:1})
			  }else{
				  toastr.error(obj.msg);
			}
		}
	});
}
//修改
function doEdit(){
	$("#window_edit").modal("show");
	showDocs(selectRows[0].maintenance_content,selectRows[0].chr_code);
}
//新增点击保存
$("#btn_add_save").click(function() {
	save();
});
function save() {
	 $("#window_add").modal("hide");
	 var code = $("#chr_code").val();
	 var name = $("#chr_name").val();
	 var lift_type= $("#lift_type").val();
	 var maintenance_type = $("#maintenance_type").val();
	 var fileinfo = $(".file-caption-name").text();
	 if(code==""){
		 toastr.error("模板编码不能为空!");
		 return;
	 }
	 if (code.length>=32) {
		 toastr.error("模板编码不能超过32字符!");
		 return;
	}
	 if(name==""){
		 toastr.error("模板名称不能为空!");
		 return;
	 }
	 if(name.length>=32){
		 toastr.error("模板名称不能超过32字符!");
		 return;
	 }
	 if(lift_type==""){
		 toastr.error("电梯不能为空!");
		 return;
	 }
	 if(maintenance_type==""){
		 toastr.error("维保类型不能为空!");
		 return;
	 }
	 if(fileinfo==""){
		 toastr.error("请选择上传文件!");
		 return;
	 }
	 var company = {"template_code":code,
			 "template_name":name,
			 "template_lift_type":lift_type,
			 "template_maint_type":maintenance_type,
			 "template_info_content":fileinfo};
	 $.ajax({
			type : "POST", //post提交方式默认是get
			url : "saveMaintModule.do",
			contentType : 'application/json;charset=utf-8',
			data : JSON.stringify(company),
			error : function(request) {
				toastr.error(request.msg);
			},
			success : function(obj) {
				if(obj.success){
					toastr.success(obj.msg);
					$("#tab_maintenance").bootstrapTable('refresh');
					return;
				}else{
					toastr.error(obj.msg);
					return;
				}
			}
		});
}
//文件上传，必须先点击上方的上传按钮才可以
$("#file-info").fileinput({
 	uploadUrl: 'uploadMaintModule.do',
 	allowedFileExtensions : ['xls','xlsx'],//接收的文件后缀,
    overwriteInitial: false,
    maxFileSize: 1000,
    maxFilesNum: 10,
    language: 'zh', //设置语言
    dropZoneTitle : "拖拽非空文档到这里...",
    slugCallback: function(filename) { 
        return filename.replace('(', '_').replace(']', '_');  
    },
    uploadExtraData: function() {
    	//设置参数只能这么干
        return {"moduleCode": $("#chr_code").val()};
    }
});
//模板详情
function  Details(){
	
	var selectRows = $("#tab_maintenance").bootstrapTable("getSelections");
	if (selectRows.length == 0) {
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
		    message: "只能勾选一条数据!",
		    buttons: {
				   ok: {
					    label: '知道了',
				    }
			},
		});
		return;
	}
	    var region = selectRows[0];
	//初始化模板信息
		var template_code=region.template_code;
		$.ajax({
			type : "POST", //post提交方式默认是get
			url : "queryDetailsMaintenance.do",
			data : {
				"template_code":template_code
			},
			error : function(request) {
				toastr.error("服务器连接异常，错误代码002");
			},
			success : function(obj) {
				var	tempAjax="";
				$.each(obj,function(i,data){
						tempAjax +="<li><p>"+data.template_info_content+"</p><div class='checkbox checkbox-primary'></div></li>";	
					
				});
				$("#modelDetail").append(tempAjax);
				
			}
		});
		$("#planModal").modal("show");
}