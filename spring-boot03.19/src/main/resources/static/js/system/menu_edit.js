/**
 * 菜单
 */

var  region_id;//全局变量，当点击弹出修改框时 返回一个当前修改的id值
var TableInit = function() {
	var oTableInit = new Object();
	// 初始化Table
	oTableInit.Init = function() {
		$("#tab_menu_edit").bootstrapTable({
			url : "requestMenuedit.do", // 请求后台的URL（*）
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
			pageList : [ 10, 25, 50, 100 ], // 可供选择的每页的行数（*）

			minimumCountColumns : 2, // 最少允许的列数
			clickToSelect : true, // 是否启用点击选中行
			height : $(window).height(), // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
			uniqueId : "ID", //每一行的唯一标识，一般为主键列
			// showToggle:true, //是否显示详细视图和列表视图的切换按钮
			// cardView: false, //是否显示详细视图
			detailView : false, // 是否显示父子表
			columns : [{
				checkbox : true
			}, {
				field : "menu_code",
				title : "菜单编码"
			}, {
				field : "menu_name",
				title : "菜单名称"
			}, {
				field : "parent_id",
				title : "父级菜单"
			},{
				field : "is_leaf",
				title : "是否低级",
				formatter:function (val,row,index){
					if (val=='0') {
						return  '否';
					}
					if(val=='1'){
						return  '是';
					}
					return val;
				}
			},{
				field : "level_num",
				title : "级次"
			},
			{
				field : "url",
				title : "URL地址"
			},
			{
				field : "icon",
				title : "菜单图片链接"
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
		    selector: "#tab_menu_edit tr",
		    // define the elements of the menu   
		    items: {
		        add: {name: "新增", icon: "add",  callback: function(key, opt){ 
		        	clearAddForm();
					 $("#menuModal").modal("show");
					 queryuser();}},
		        edit: {name: "修改",icon: "edit", callback: function(key, opt){ 
		        	var selectRows = $("#tab_menu_edit").bootstrapTable("getSelections");
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
					queryuser(region)
					$("#amendModal").modal("show");}} ,
		    	del: {name: "删除", icon: "delete",callback: function(key, opt){ 
		    		doDeletedelbatch();
			    		   }},
			    		  
						   
	    		 
		    }
		   
		});	
	};
	// 得到查询的参数
	oTableInit.queryParams = function(params) {
		var temp = { 
		   // 这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
			limit : params.limit,   
			offset : params.offset
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
/***************
 * 按钮事件定义
 * @returns
 */

/*//index定义功能按钮
window.operateEvents1 = {
		'click #btn_edit': function(e, value, row, index) {
			queryuser(row);
			$("#amendModal").modal("show");
		},
		'click #btn_del': function(e, value, row, index) {
			doDeletedel(row);
		}
	};
 
	function operateFormatter(value, row, index) {
		return [
			'<button  type="button" style="background:none;color:#5faefa;"  data-toggle="modal" data-target="#maintModal" id="btn_edit" onclick="BtnEdit()" >修改</button>&nbsp;&nbsp;'
			+'<button  type="button" style="background:none;color:#5faefa;"  data-toggle="modal" data-target="#maintModal" id="btn_del" onclick="BtnDel()" >删除</button>',
		].join('');
	}*/
var ButtonInit = function() {
	var oInit = new Object();
	var postdata = {};
	oInit.Init = function() {
		// 初始化页面上面的按钮事件 
		// 主页面删除功能
		$("#btn_delbatch").click(function(){
			doDeletedelbatch();
		})
		//点击新增
		$("#btn_add").click(function(){
			clearAddForm();
			 $("#menuModal").modal("show");
			 queryuser();
		})
		//新增保存
		$("#add_menu").click(function(){
			save();
		})
		$("#up_menu").click(function(){
			upsave();
		})
		//修改的方法
		// 修改按钮
		$("#btn_edit").click(function() {
			 
			var selectRows = $("#tab_menu_edit").bootstrapTable("getSelections");
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
			queryuser(region)
			$("#amendModal").modal("show");
		})
	};
	return oInit;
};

//回现父级菜单的方法
function  queryuser(region){
	$.ajax({
		type : "POST", // post提交方式默认是get
		url : "queryMenu.do",
		success : function(obj) {
          var  sel="<select name='parent_id' id='parent_id'>";
	        $.each(obj,function(i, n) {
	        	sel+="<option value="+n.menu_id+">"+n.menu_name+"</option>";
			})
			sel+="</select>";
	        $("#parent_id").html(sel);
	        $("#parent_id2").html(sel);
	        initEditWindowData(region);
		}
	});
}
//新增方法
function save() {
	 var menu_code = $("#menu_code").val();
	 var menu_name = $("#menu_name").val();
	 var is_leaf = $("#is_leaf").val();
	 var level_num = $("#level_num").val();
	 var url = $("#url").val();
	 var icon = $("#icon").val();
	 var parent_id=$("#parent_id option:selected").val();
	 if(menu_code==""){
		 toastr.error("菜单编码不能为空!");
		 return;
	 }
	 if(menu_code.length>32){
		 toastr.error("菜单编码不能超过32字符!");
		 return;
	 }
	 if(menu_name==""){
		 toastr.error("菜单名不能为空!");
		 return;  
	 }
	 if(menu_name.length>32){
		 toastr.error("菜单名不能超过32字符!");
		 return;
	 }
	 if(is_leaf==""){
		 toastr.error("请填写是否低级!");
		 return;
	 }
	 if(level_num==""){
		 toastr.error("请填写级次");
		 return;
	 }
	 if(url==""){
		 toastr.error("请填写url地址");
		 return;
	 }
	 if(icon==""){
		 toastr.error("请填写图片地址");
		 return;
	 }
	 var company = {
			 "menu_code":menu_code,
			 "menu_name":menu_name,
			 "is_leaf":is_leaf,
			 "parent_id":parent_id,
			 "level_num":level_num,
			 "url":url,
		     "icon":icon
	 };
	 $.ajax({
			type : "POST", //post提交方式默认是get
			url : "saveMenuedit.do",
			contentType : 'application/json;charset=utf-8',
			data : JSON.stringify(company),
			error : function(request) {
				swal(request.msg, "","error");
			},
			success : function(obj) {
				if(obj.success){
					$("#menuModal").modal("hide");
					refresh();
					toastr.success(obj.msg);
				}else{
					toastr.error(obj.msg);
				}
			}
		});
}
//删除数量
function doDeletedel(selectRows){
	 
		if(selectRows==""){
			bootbox.alert({
			    message: "选择要删除的数据!",
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
//批量删除信息
function doDeletedelbatch(){
	var selectRows = $("#tab_menu_edit").bootstrapTable("getSelections");
	if(selectRows==""){
		bootbox.alert({
		    message: "选择要删除的数据!",
		    buttons: {
				   ok: {
					    label: '知道了',
				    }
			},
		});
		return;
	}
	//删除数据的数目
	$('#del_datebatch i').eq(0).text(selectRows.length);
	//加载模态框
	$("#delModalbatch").modal("show");

}
//主页面删除
//删除
function dodel(){
	var selectRows = $("#tab_menu_edit").bootstrapTable("getSelections");
	if(selectRows==""){
		bootbox.alert({
		    message: "选择要删除的数据!",
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
			url : "deleteMenu.do",
			contentType : 'application/json;charset=utf-8',
			data : JSON.stringify(company),
			success : function(obj) {
					if(obj.success){
						toastr.success(obj.msg);
						 $("#delModal").modal("hide");
						 $("#delModalbatch").modal("hide");
						 refresh();
					  }else{
						  toastr.error(obj.msg);
					}
			}
		});
}
//数据回现
function initEditWindowData(region) {
	  $("#menu_code2").val(region.menu_code);
	  $("#menu_name2").val(region.menu_name);
	  $("[name='parent_id']").val(region.parent_id);
	  $("#is_leaf2").val(region.is_leaf);
	  $("#level_num2").val(region.level_num);
	  $("#icon2").val(region.icon);
	  $("#url2").val(region.url);
	}
function   upsave(){
	var selectRows = $("#tab_menu_edit").bootstrapTable("getSelections");
	 var menu_code = $("#menu_code2").val();
	 var menu_name = $("#menu_name2").val();
	 var is_leaf = $("#is_leaf2").val();
	 var level_num = $("#level_num2").val();
	 var url = $("#url2").val();
	 var icon = $("#icon2").val();
	 var parent_id=$("#parent_id2 option:selected").val();
	 if(menu_code==""){
		 toastr.error("菜单编码不能为空!");
		 return;
	 }
	 if(menu_code.length>32){
		 toastr.error("菜单编码不能超过32字符!");
		 return;
	 }
	 if(menu_name==""){
		 toastr.error("菜单名不能为空!");
		 return;  
	 }
	 if(menu_name.length>32){
		 toastr.error("菜单名不能超过32字符!");
		 return;
	 }
	 if(is_leaf==""){
		 toastr.error("请填写是否低级!");
		 return;
	 }
	 if(level_num==""){
		 toastr.error("请填写级次");
		 return;
	 }
	 if(url==""){
		 toastr.error("请填写url地址");
		 return;
	 }
	 if(icon==""){
		 toastr.error("请填写图片地址");
		 return;
	 }
	 var company = {
			 "menu_code":menu_code,
			 "menu_name":menu_name,
			 "is_leaf":is_leaf,
			 "parent_id":parent_id,
			 "level_num":level_num,
			 "url":url,
			 "menu_id":selectRows[0].menu_id,
		     "icon":icon
	 };
	 $.ajax({
			type : "POST", //post提交方式默认是get
			url : "upsaveMenuedit.do",
			contentType : 'application/json;charset=utf-8',
			data : JSON.stringify(company),
			error : function(request) {
				swal(request.msg, "","error");
			},
			success : function(obj) {
				if(obj.success){
					$("#amendModal").modal("hide");
					refresh();
					toastr.success(obj.msg);
				}else{
					toastr.error(obj.msg);
				}
			}
		});
}
//增加修改表单复位
function clearAddForm() {
	$("#add_menuaa")[0].reset();
	$("#up_menuaa")[0].reset();
}
//刷新方法
function refresh() {
	$("#tab_menu_edit").bootstrapTable('refreshOptions',{pageNumber:1})
}