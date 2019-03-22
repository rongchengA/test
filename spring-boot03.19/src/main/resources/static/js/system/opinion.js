/**
 * 意见反馈
 */

var  region_id;//全局变量，当点击弹出修改框时 返回一个当前修改的id值
var TableInit = function() {
	var oTableInit = new Object();
	// 初始化Table
	oTableInit.Init = function() {
		$("#tab_opinion").bootstrapTable({
			url : "requestfeedbackFeedback.do", // 请求后台的URL（*）
			method : "post",       // 请求方式（*）
			toolbar : "#toolbar", // 工具按钮用哪个容器
			striped : true,      // 是否显示行间隔色
			cache : false,      // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
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
				field : "feedback_id",
				title : "编号"
			}, {

				field : "feedback_platform_type",
				title : "反馈问题类型",
				formatter:function (val,row,index){
					if (val=='0') {
						return  '维保';
					}
					if(val=='1'){
						return  '物管';
					}
					return val;
				}
			}, {
				field : "feedback_type",
				title : "反馈类型",
				formatter:function (val,row,index){
					if (val=='0') {
						return  '功能';
					}
					if(val=='1'){
						
						return  '页面';
					}
					if(val=='2'){
						
						return  '操作';
					}
					if(val=='3'){
						
						return  '新要求';
					}
					return val;
				}
			
			},{
				field : "use_comp_security_mgr",
				title : "反馈用户"
			},{
				field : "feedback_time",
				title : "反馈时间"
			},
			]
		});
		$.contextMenu({
		    // define which elements trigger this menu
		    selector: "#tab_opinion tr",
		    // define the elements of the menu   
		    items: {
		    	detail: {name: "详情", icon: "detail",  callback: function(key, opt){ 
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
					initEditWindowData();
					// 显示窗口
					$("#modifyModal").modal("show");
			    		}},	
		    	del: {name: "删除", icon: "delete",callback: function(key, opt){ 
		    		doDeletedel();
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
		


		//页面条件查询的刷新
		$("#empty").click(function(){
			
			$("[name='opinionType']").val("");
		
			$("[name='opinionTime']").val("");
		})
		//刷新表单方法
		$("#fuzzyquery").click(function(){
			
			refresh();
		})
		//条件查询
		$("#queryopinion").click(function(){
			
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
			initEditWindowData();
			// 显示窗口
			$("#modifyModal").modal("show");
		})
	};
	return oInit;
};


//删除数量
function doDeletedel(){
	
	 var selectRows= $("#tab_opinion").bootstrapTable("getSelections");
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
	var selectRows = $("#tab_opinion").bootstrapTable("getSelections");
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
			url : "deleteFeedback.do",
			contentType : 'application/json;charset=utf-8',
			data : JSON.stringify(company),
			success : function(obj) {
					if(obj.success){
						toastr.success(obj.msg);
						 $("#delModal").modal("hide");
						 $("#tab_opinion").bootstrapTable('refreshOptions',{pageNumber:1})
					  }else{
						  toastr.error(obj.msg);
					}
				
			}
		});
}
//数据回现
function initEditWindowData() {
	
	var selectRows = $("#tab_opinion").bootstrapTable("getSelections");
	var region = selectRows[0];
	$("#feedback_des").val(region.feedback_context);
	    if (region.feedback_type=="0") {
	    	$("#feedback_type").val("功能");
	    	return;
		}
	    if (region.feedback_type=="1") {
	    	$("#feedback_type").val("页面");
	    	return;
		}if (region.feedback_type=="2") {
			$("#feedback_type").val("操作");
			return;
		}
		if (region.feedback_type=="3") {
			$("#feedback_type").val("新要求");
			return;
		}else{
			$("#feedback_type").val("无");
			return;
		}
		
		$("#feedback_type").attr('readonly','readonly');
		// 获取该区域名下的区域范围初始化界面
/*		$.ajax({
					type : "POST", // post提交方式默认是get
					url : "feedbackUpressList.do",
					data : {
						"feedback_id" : region.feedback_id
					},
					success : function(data) {

						   alert(data.address.feedback_context)
							$("#feedback_des").val(data.address.feedback_context);
					}

				});*/
	}

//增加修改表单复位
function clearAddForm() {
	$("#region_name").val("");
	$('#add_city').citypicker('reset');
	$("#member_codes").html("");
}
//修改表单复位
function clearUpForm() {
	$("#feedback_des").val("");
	$("#feedback_des").html("");
}

//刷新方法
function refresh() {
	$("#tab_opinion").bootstrapTable('refreshOptions',{pageNumber:1})
}