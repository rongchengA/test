/**
 * 
 */

var  region_id;//全局变量，当点击弹出修改框时 返回一个当前修改的id值
var TableInit = function() {
	var oTableInit = new Object();
	// 初始化Table
	oTableInit.Init = function() {
		$("#tab_static").bootstrapTable({
			url : "requestStatic.do", // 请求后台的URL（*）
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
			pageSize : 10, // 每页的记录行数（*）
			pageList : [ 5, 10, 25, 50 ], // 可供选择的每页的行数（*）
			minimumCountColumns : 2, // 最少允许的列数
			clickToSelect : true, // 是否启用点击选中行
			height : $(window).height(), // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
			uniqueId : "ID", //每一行的唯一标识，一般为主键列
			// showToggle:true, //是否显示详细视图和列表视图的切换按钮
			// cardView: false, //是否显示详细视图
			detailView : false, // 是否显示父子表
			columns : [ {
				checkbox : true
			},{
				field : "role_code",
				title : "角色编号"
			}, {
				field : "role_name",
				title : "角色名称"
			}, {
				field : "role_enable",
				title : "是否启用",
				formatter:function (val,row,index){
					if (val=='0') {
						return  '是';
					}
					if(val=='1'){
						
						return  '否';
					}
					return val;
				}
			
			},{
				field : "role_remark",
				title : "角色备注"
			}/*,{
				field: "Button",
                title: "操作",
                events: operateEvents1,
    			formatter: operateFormatter
			}*/
			]
		});
		$.contextMenu({
		    // define which elements trigger this menu
		    selector: "#tab_static tr",
		    // define the elements of the menu   
		    items: {
		        add: {name: "新增", icon: "add",  callback: function(key, opt){ 
		        	Reset();
					$("#myModal").modal("show")}},
		        edit: {name: "修改",icon: "edit", callback: function(key, opt){ 
		        	var selectRows = $("#tab_static").bootstrapTable("getSelections");
		    		if (selectRows == "") {
		    		bootbox.alert({
		    		    message: "请勾选后在操作!",
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
		    	// 显示窗口
		    	var region= selectRows[0];
		    	initEditWindowData(region)}} ,
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
		var region = $('[name="opinionTime"]').val();
		if (region != '' && region != null) {
			temp['param1'] = region;
		}
		var regional = $('[name="opinionType"]').val();
		if (regional != '' && regional != null && regional !== '区域范围支持模糊查询') {
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
		// 主页面删除功能
		$("#btn_del").click(function(){
			doDeletedel();
		})
		// 主页面点新增按钮
		$("#btn_add").click(function(){
			Reset();
			$("#myModal").modal("show");
		})
		//新增保存
		$("#add_statica").click(function(){
			save();
		})


	};
	return oInit;
};
/*//index定义功能按钮
window.operateEvents1 = {
		'click #btn_edit': function(e, value, row, index) {
			initEditWindowData(row);
		}
	};
 
	function operateFormatter(value, row, index) {
		return [
			'<button  type="button" style="background:none;color:#5faefa;"  data-toggle="modal" data-target="#maintModal" id="btn_edit" onclick="BtnEdit(this)" >修改</button>',
		].join('');
	}
*/

$("#btn_edit").click(function() {
	 
	var selectRows = $("#tab_static").bootstrapTable("getSelections");
		if (selectRows == "") {
		bootbox.alert({
		    message: "请勾选后在操作!",
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
	// 显示窗口
	var region= selectRows[0];
	initEditWindowData(region)

})
//删除数量
function doDeletedel(){
	 var selectRows= $("#tab_static").bootstrapTable("getSelections");
		if(selectRows==""){
			bootbox.alert({
			    message: "请勾选后在操作!",
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
	var selectRows = $("#tab_static").bootstrapTable("getSelections");
	if(selectRows==""){
		bootbox.alert({
		    message: "请勾选后在操作!",
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
			url : "deleteStatic.do",
			contentType : 'application/json;charset=utf-8',
			data : JSON.stringify(company),
			error : function(request) {
				toastr.error("删除失败！");
			},
			success : function(obj) {
					if(obj.success){
						 toastr.success(obj.msg);
						 $("#delModal").modal("hide");
						 $('#tab_static').bootstrapTable('refresh');
					  }
			}
		});
} 
//数据回现
function initEditWindowData(region) {

	$("#role_code").val(region.role_code)
	$("#role_name").val(region.role_name)
	$("[name='role_enable']").val([region.role_enable])
	$("#role_remark").val(region.role_remark)
	$("#modifyModal").modal("show");
	}
//修改保存
function edit_static(){
     var selectRows = $("#tab_static").bootstrapTable("getSelections");
	 var region = selectRows[0];
	 var role_code = $("#role_code").val();
	 var role_name = $("#role_name").val();
	 var role_enable = $('#radio_stic input[name="role_enable"]:checked ').val();
	 var role_remark = $("#role_remark").val();
	 if(role_code==""){
		 toastr.error("角色编码不能为空!");
		 return;
	 }
	 if(role_code.length>3){
			
		 toastr.error("角色编码不能超过3个字符!");
		 return;
	 }
	 if(role_name==""){
		 toastr.error("角色名不能为空!");
		 return;
	 }
	 if(role_name.length>32){
			
		 toastr.error("角色名不能超过32字符!");
		 return;
	 }
	 if(role_enable==""){
		 toastr.error("请选择是否启用!");
		 return;
	 }
	 if(role_remark==""){
		 toastr.error("角色备注不能为空!");
		 return;
	 }
	 if(role_remark.length>32){
		
		 toastr.error("角色备注不能超过32字符!");
		 return;
	 }
	 var company = {
			 "role_code":role_code,
			 "role_name":role_name,
			 "role_enable":role_enable,
			 "role_remark":role_remark,
			 "role_id":region.role_id
	 };
	$.ajax({
		type : "POST", // post提交方式默认是get
		url : "editStatic.do",
		contentType : 'application/json;charset=utf-8',
		data : JSON.stringify(company), // 序列化
		success : function(obj) {
					if(obj.success){
						 $("#modifyModal").modal("hide");
						 toastr.success(obj.msg);
						 refresh();
						 return ;
					}else{
						 toastr.success(obj.msg);
						 return;
					}
		}
	});
	}
function save() {
	 var role_code = $("#role_code2").val();
	 var role_name = $("#role_name2").val();
	 var role_enable = $('#radio_stic2 input[name="role_enable2"]:checked ').val();
	 var role_remark = $("#role_remark2").val();
	 if(role_code==""){
		 toastr.error("角色编码不能为空!");
		 return;
	 }
	 if(role_code.length>3){
			
		 toastr.error("角色编码不能超过3个字符!");
		 return;
	 }
	 if(role_name==""){
		 toastr.error("角色名不能为空!");
		 return;  
	 }
	 if(role_name.length>32){
			
		 toastr.error("角色名不能超过32字符!");
		 return;
	 }
	 if(role_enable==""){
		 toastr.error("请选择是否启用!");
		 return;
	 }
	 if(role_remark==""){
		 toastr.error("角色备注不能为空!");
		 return;
	 }
	 if(role_remark.length>32){
		
		 toastr.error("角色备注不能超过32字符!");
		 return;
	 }
	 var company = {
			 "role_code":role_code,
			 "role_name":role_name,
			 "role_enable":role_enable,
			 "role_remark":role_remark
	 };
	 $.ajax({
			type : "POST", //post提交方式默认是get
			url : "saveStatic.do",
			contentType : 'application/json;charset=utf-8',
			data : JSON.stringify(company),
			error : function(request) {
				swal(request.msg, "","error");
			},
			success : function(obj) {
				if(obj.success){
					$("#myModal").modal("hide");
					refresh();
					toastr.success(obj.msg);
				}else{
					toastr.error(obj.msg);
				}
			}
		});
}
//表单重置
function Reset() {
	$("#add_static")[0].reset();
}
//刷新方法
function refresh() {
	$("#tab_static").bootstrapTable('refreshOptions',{pageNumber:1})
}