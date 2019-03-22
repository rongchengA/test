/**
 * 区域管理
 */

var  region_id;//全局变量，当点击弹出修改框时 返回一个当前修改的id值
var TableInit = function() {
	var oTableInit = new Object();
	// 初始化Table
	oTableInit.Init = function() {
		$("#tab_region").bootstrapTable({
			url : "queryAreaManagerList.do", // 请求后台的URL（*）
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
			columns : [ {
				checkbox : true
				
			}, {
				field : "region_id",
				title : "ID",
				width : '20',
			}, {
				field : "region_name",
				title : "区域名",
				width : '20',
			}, {
				field : "region_scope_detail",
				title : "区域范围",
				width : '20',
			},

			]
		});
		$.contextMenu({
		    // define which elements trigger this menu
		    selector: "#tab_region tr",
		    // define the elements of the menu   
		    items: {
		        add: {name: "新增", icon: "add",  callback: function(key, opt){ 
		        	clearAddForm();
					$("#reaModalmuo").modal("show");}},
		        edit: {name: "修改",icon: "edit", callback: function(key, opt){ 
		        	clearUpForm();
					var selectRows = $("#tab_region").bootstrapTable("getSelections");
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
					region_id=region.region_id;
					initEditWindowData(region);
					// 显示窗口
					$("#makeAreaModal").modal("show");}} , 
		    }
		   
		});	
	};
	// 得到查询的参数
	oTableInit.queryParams = function(params) {
		var temp = { // 这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
			limit : params.limit, // 页面大小
			offset : params.offset
		};
		var region = $('[name="regional_name"]').val();
		if (region != '' && region != null) {
			temp['param1'] = region;

		}
		var regional = $('[name="regional_scope"]').val();
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
		/* 初始化页面上面的按钮事件 */
		
		// 新增保存按钮
		$("#add_area").click(function() {
			addareaSave();
		});
         //新增页面的添加功能
		$("#add_input").click(function() {
			add_input();
		});
		
        //修改页面的添加功能
		$("#up_input").click(function() {
			up_input();
		});
		// 打开新增窗口
		$("#btn_add").click(function() {
			clearAddForm();
			$("#reaModalmuo").modal("show");
		});
		// 主页面删除功能
		$("#btn_del").click(function(){
			doDeletedel();
		})
		
		// 增加页面删除功能
		$("#add-del").click(function() {
			doDelete();
		});
		// 修改页面删除功能
		$("#up-del").click(function() {
			upDelete();
		});

		//页面条件查询的刷新
		$("#refresh").click(function(){
			
			$("[name='regional_name']").val("");
			$("[name='regional_scope']").val("");
		})
		//刷新表单方法
		$("#fuzzyquery").click(function(){
			
			refresh();
		})
		//修改保存方法
		$("#up_area").click(function(){
			
			editSave();
		})
		//修改的方法
		// 修改按钮
		$("#btn_edit").click(function() {
			clearUpForm();
			var selectRows = $("#tab_region").bootstrapTable("getSelections");
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
			region_id=region.region_id;
			initEditWindowData(region);
			// 显示窗口
			$("#makeAreaModal").modal("show");
		})
	};
	return oInit;
};
//新增点击添加功能
function add_input() {
	var is_add = true;
	var review_tent = $("#member_codes");
	var pArr = $('#add_city').val().split('/');
	if (pArr==''||pArr==null||pArr=="请选择省/市/区") {
		bootbox.alert({
		    message: "省/市/区不能为空!",
		    buttons: {
				   ok: {
					    label: '知道了',
				    }
			},
		});
		ischeck = true;
		return false;
	}
	for (var j = 0; j < 3; j++) {
		if (typeof (pArr[j]) == "undefined") {
			pArr[j] = "";
		};
	}
	var add_Address = pArr[0] + pArr[1] + pArr[2];
	// 遍历已输入的li 判断新输入的是否重复
	$("div[id='add_address'] li").each(function() { // 遍历添加框中li,添加到list
		if ($(this).text() !== "") {
			if (add_Address == $(this).text()) {
				bootbox.alert({
				    message: "此地址已添加!",
				    buttons: {
						   ok: {
							    label: '知道了',
						    }
					},
				});
				is_add = false;
				return false;
			}
		}
	});
	// 添加地址
	if (is_add) {
		$(
				'<li  style="list-style-type:none;" ><input type="checkbox" name="address">'
						+ add_Address + '</li>').appendTo(review_tent);

		reset_address();
	}
}
//修改点击添加功能
function up_input() {
	var is_add = true;
	var review_tent = $("#upmember_codes");
	var pArr = $('#uodea_city').val().split('/');
	if (pArr==''||pArr==null||pArr=="请选择省/市/区") {
		bootbox.alert({
		    message: "省/市/区不能为空！",
		    buttons: {
				   ok: {
					    label: '知道了',
				    }
			},
		});
		ischeck = true;
		return false;
	}
	for (var j = 0; j < 3; j++) {
		if (typeof (pArr[j]) == "undefined") {
			pArr[j] = "";
		};
	}

	var add_Address = pArr[0] + pArr[1] + pArr[2];
	// 遍历已输入的li 判断新输入的是否重复
	$("div[id='up_upress'] li").each(function() { // 遍历添加框中li,添加到list
		if ($(this).text() !== "") {
			if (add_Address == $(this).text()) {
				bootbox.alert({
				    message: "此地址已添加!",
				    buttons: {
						   ok: {
							    label: '知道了',
						    }
					},
				});
				is_add = false;
				return false;
			}
		}
	});
	// 添加地址
	if (is_add) {
		$(
				'<li  style="list-style-type:none;" ><input type="checkbox" name="upress">'
						+ add_Address + '</li>').appendTo(review_tent);

		reset_upress();
	}
}
//新增刷新输入地址
function reset_address() {
	$('#add_redail').val("");
}
//修改刷新输入地址
function reset_upress() {
	$('#up_redail').val("");
}
//新增
function addareaSave() {
	var name = $("#region_name").val();
	var regionlist = new Array();

	/* 获取对应值作判断 */
	if ($("div[id='add_address'] li").length==0){
		bootbox.alert({
		    message: "被添加的区域范围不能为空!",
		    buttons: {
				   ok: {
					    label: '知道了',
				    }
			},
		});
		return;
	}else{
		$("div[id='add_address'] li").each(function() { // 遍历添加框中li,添加到list
			if ($(this).text() !== "") {
				regionlist.push({
					region_name   :$("#region_name").val(),
					regionalscope :$("#add_city").val(),
					address: $(this).text()
				});
			}
		});

	$.ajax({
		type : "POST", // post提交方式默认是get
		url : "addareayu.do",
		contentType : 'application/json;charset=utf-8',
		data :JSON.stringify(regionlist),  // 序列化
		success : function(obj) {
					if(obj.success){
						 toastr.success(obj.msg);
						 $("#reaModalmuo").modal("hide");
						 $("#tab_region").bootstrapTable('refreshOptions',{pageNumber:1})
						 
					}else{
						bootbox.alert({
						    message: obj.msg,
						    buttons: {
								   ok: {
									    label: '知道了',
								    }
							},
						});
						return false;
					}
		}
	});
	}
}

//新增页面删除表格
function doDelete() {
	if (!$("input[name='address']").is(':checked')) {
		bootbox.alert({
		    message: "请勾选后再操作!",
		    buttons: {
				   ok: {
					    label: '知道了',
				    }
			},
		});
		return false;
	}
	$("input[name='address']:checked").each(function() { // 遍历选中的checkbox
		n = $(this).parents("li").index(); // 获取checkbox所在行的顺序
		$("#member_codes").find("li:eq(" + n + ")").remove();
	});
}
//修改页面删除表格
function upDelete() {
	if (!$("input[name='upress']").is(':checked')) {
		bootbox.alert({
		    message: "请勾选后再操作!",
		    buttons: {
				   ok: {
					    label: '知道了',
				    }
			},
		});
		return false;
	}
	$("input[name='upress']:checked").each(function() { // 遍历选中的checkbox
		n = $(this).parents("li").index(); // 获取checkbox所在行的顺序
		$("#upmember_codes").find("li:eq(" + n + ")").remove();
	});

}
/*主页面删除*/
/*删除*/
function dodel(){
	
	var selectRows = $("#tab_region").bootstrapTable("getSelections");
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
			url : "deleteRegion.do",
			contentType : 'application/json;charset=utf-8',
			data : JSON.stringify(company),
			success : function(obj) {
				if(obj.success){
					toastr.success(obj.msg);
				 $("#delModal").modal("hide");
				 $("#tab_region").bootstrapTable('refreshOptions',{pageNumber:1})
					refresh();
				}else{
					toastr.error(obj.msg);
				}
			}
		});
}

//删除数量
function doDeletedel(){
	
	 var selectRows= $("#tab_region").bootstrapTable("getSelections");
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
//数据回现
function initEditWindowData(region) {
	var review_tent = $("#upmember_codes");
		$("#edit_region_name").val(region.region_name);
		$("#edit_region_name").attr('readonly','readonly');
		// 获取该区域名下的区域范围初始化界面
		$.ajax({
					type : "POST", // post提交方式默认是get
					url : "requryUpressList.do",
					data : {
						"region_id" : region.region_id
					},
					success : function(data) {
						$.each(data.address,function(i, n) {
											$('<li  style="list-style-type:none;" ><input type="checkbox" name="upress">'+ n.region_scope_detail + '</li>')
													.appendTo(review_tent);
										})
					}
				});
	}
/*修改保存*/
function editSave(){
	var regionlist = new Array();
	/* 获取对应值作判断 */
	if ($("div[id='up_upress'] li").length==0){
		bootbox.alert({
		    message: "被添加的区域范围不能为空!",
		    buttons: {
				   ok: {
					    label: '知道了',
				    }
			},
		});
		return;
	}else{
		$("div[id='up_upress'] li").each(function() { // 遍历添加框中li,添加到list
		if ($(this).text() !== "") {
			regionlist.push({
				region_id :region_id,
				regionalscope :$("#uodea_city").val(),
				address : $(this).text()
			});
		}
	});

	$.ajax({
		type : "POST", // post提交方式默认是get
		url : "areaEdit.do",
		contentType : 'application/json;charset=utf-8',
		data : JSON.stringify(regionlist), // 序列化
		success : function(obj) {
					if(obj.success){
						toastr.success(obj.msg);
						$("#makeAreaModal").modal("hide");
						$('#tab_project').bootstrapTable('refresh');
					  }else{
						  toastr.error(obj.msg);
					}
		}
	});
	}
}
//增加修改表单复位
function clearAddForm() {
	$("#region_name").val("");
	$('#add_city').citypicker('reset');
	$("#member_codes").html("");
}
//修改表单复位
function clearUpForm() {
	$("#edit_region_name").val("");
	$('#uodea_city').citypicker('reset');
	$("#upmember_codes").html("");
}

//刷新方法
function refresh() {
	$("#tab_region").bootstrapTable('refreshOptions',{pageNumber:1})
}