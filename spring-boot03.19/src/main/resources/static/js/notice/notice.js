/**
 * 意见反馈
 */

var  region_id;//全局变量，当点击弹出修改框时 返回一个当前修改的id值
var TableInit = function() {
	var oTableInit = new Object();
	// 初始化Table
	oTableInit.Init = function() {
		$("#tab_notice").bootstrapTable({
			url : "requestOntice.do", // 请求后台的URL（*）
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
			//uniqueId : "ID", //每一行的唯一标识，一般为主键列
			// showToggle:true, //是否显示详细视图和列表视图的切换按钮
			// cardView: false, //是否显示详细视图
			detailView : false, // 是否显示父子表

			columns : [ {
				checkbox : true
			}, {
				field : "notice_title",
				title : "维保通知标题"
			},{
				field : "notice_time",
				title : "维保通知时间"
			},{
				field : "notice_status",
				title : "状态",
				formatter:function (val,row,index){
					if (val=='0') {
						return  '未发布';
					}
					if(val=='1'){
						
						return  '已发布';
					}
					if(val=='2'){
						
						return  '已作废';
					}
					return val;
				}}
			]
		});
		$.contextMenu({
		    // define which elements trigger this menu
		    selector: "#tab_notice tr",
		    // define the elements of the menu   
		    items: {
		        add: {name: "新增", icon: "add",  callback: function(key, opt){ 
		        	clearAddForm();
					queryuser();
					$("#noticeModal").modal("show")}},
		        edit: {name: "修改",icon: "edit", callback: function(key, opt){ 
		        	clearUpOntice();
					var selectRows = $("#tab_notice").bootstrapTable("getSelections");
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
					queryuser(region);
					$("#noticeModifyModal").modal("show");}} ,
		    	del: {name: "删除", icon: "delete",callback: function(key, opt){ 
		    		doDeletedel();
			    		   }},
			    		  
			    		   detail: {name: "详情详情", icon: "detail",  callback: function(key, opt){ 
			    			   $("[name='titix']").val("");
			    				$("[name='cxc']").val("");
			    				$("[name='sel']").val("");
			    				queryuser();
			    				var selectData = $("#tab_notice").bootstrapTable('getSelections');
			    				if (selectData.length == 0) {
			    					bootbox.alert({
			    					    message: "请勾选需要查看的数据!",
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
			    					    message: "只能选择一条查看!",
			    					    buttons: {
			    							   ok: {
			    								    label: '知道了',
			    							    }
			    						},
			    					});
			    					return;
			    				}else{
			    					queryOne();
			    					
			    				}}},	   
	    		 
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
		var region = $("#notice_title").val();
		if (region != '' && region != null && regional !== '请输入公告标题') {
			temp['param1'] = region;
		}
		var regional = $("#notice_content").val();
		if (regional != '' && regional != null && regional !== '请输入公告内容') {
			temp['param2'] = regional;
		}
		var xiala = $("#notice_status").val();
		if (xiala != '' && xiala != null) {
			temp['param3'] = xiala;
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
		$("#quer_notice").click(function(){
			
			refresh();
		})
		//新增按钮
		$("#btn_add").click(function(){
			clearAddForm();
			queryuser();
			$("#noticeModal").modal("show");
		})
		//新增保存
		$("#notice_servation").click(function(){
			
			Preservation();
		})
		//条件查询复位
		$("#Refresh_notice").click(function(){
			
			clearUpForm();
		})

		
		//修改保存
		$("#up_ontice").click(function(){
			editNotice();
		})
		
		//查看详情
		$("#btn_query").click(function(){
			
			$("[name='titix']").val("");
			$("[name='cxc']").val("");
			$("[name='sel']").val("");
			queryuser();
			var selectData = $("#tab_notice").bootstrapTable('getSelections');
			if (selectData.length == 0) {
				bootbox.alert({
				    message: "请勾选需要查看的数据!",
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
				    message: "只能选择一条查看!",
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
		//修改的方法
		// 修改按钮
		$("#btn_edit").click(function() {
			clearUpOntice();
			var selectRows = $("#tab_notice").bootstrapTable("getSelections");
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
			queryuser(region);
			$("#noticeModifyModal").modal("show");
		})
	};
	return oInit;
};


//删除数量
function doDeletedel(){
	
	 var selectRows= $("#tab_notice").bootstrapTable("getSelections");
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
	
	var selectRows = $("#tab_notice").bootstrapTable("getSelections");
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
			url : "deleteNotice.do",
			contentType : 'application/json;charset=utf-8',
			data : JSON.stringify(company),
			success : function(obj) {
				if(obj.success){
					toastr.success(obj.msg);
					$("#delModal").modal("hide");
					refresh();
				}else{
					swal(obj.msg, "","error");
				}
			}
		});
	
}
//查询当前的用户是什么角色
//如果是管理员就把所有维保公司全部查询出来
function  queryuser(region){
	$.ajax({
		type : "POST", // post提交方式默认是get
		url : "queryUser.do",
		success : function(obj) {
          var  sel="<select name='notice_maint_id' id='sel'>";
          
	        $.each(obj,function(i, n) {
	        	sel+="<option value="+n.maint_id+">"+n.maint_comp_name+"</option>";
			})
			sel+="</select>";
	        $("#noticemaint").html(sel);
	        $("#noticeUp").html(sel);
	        initEditWindowData(region);
		}
	});
}


//新增保存
function   Preservation(){
	var   title=$("[name='notice_title']").val();
	var   content=$("[name='notice_content']").val();
	var   id=$("[name='notice_maint_id']").val();
	 if(title==""){
		
		 swal("模板名称不能为空", "","error");
		 return;
	 }
	 if (title.length>=32) {
		 swal("标题不能超过32个字符串", "","error");
		 return;
	}
	 if(content==""){
		 swal("内容不能为空", "","error");
		 return;
	 }
	 if (content.length>=200) {
		 swal("内容不能超过200个字符串", "","error");
		 return;

	}
	 var company = {"notice_title":title,
			        "notice_content":content,
			        "notice_maint_id":id
			 };
	 $.ajax({
			type : "POST", //post提交方式默认是get
			url : "saveNotice.do",
			contentType : 'application/json;charset=utf-8',
			data : JSON.stringify(company),
			error : function(request) {
				swal(request.msg, "","error");
			},
			success : function(obj) {
				if(obj.success){
					//swal(obj.msg, "","success");
					toastr.success(obj.msg);
					$("#noticeModal").modal("hide");
					refresh();
				}else{
					swal(obj.msg, "","error");
				}
			}
		});
}
function   queryOne(){
	        var selectData = $("#tab_notice").bootstrapTable('getSelections');
	        $("[name='titix']").val(selectData[0].notice_title);
			$("[name='cxc']").val(selectData[0].notice_content);
			
			$("#noticeQuery").modal("show");
			$.ajax({
					type : "POST", // post提交方式默认是get
					url : "queryOne.do",
					data : {
						"notice_id" : selectData[0].notice_id
					},
					success : function(data) {
					$("[name='titixaa']").val(data.maint_comp_name);
					$("#noticeQuery").modal("show");
					}
				});
}
//数据回现
function initEditWindowData(region) {
	    $("[name='up_title']").val(region.notice_title);
	    $("[name='up_content']").val(region.notice_content);
		// 获取该区域名下的区域范围初始化界面
		$.ajax({
					type : "POST", // post提交方式默认是get
					url : "queryOne.do",
					data : {
						"notice_id" : region.notice_id
					},
					success : function(data) {
						$("[name='up_maint']").val(data.notice_maint_id);
					}
				});
	}
//修改保存
function   editNotice(){
	var selectRows = $("#tab_notice").bootstrapTable("getSelections");
	var   title=$("[name='up_title']").val();
	var   content=$("[name='up_content']").val();
	var   id_maint=$("[name='up_maint']").val();
	
	 if(title==""){

		 swal("模板名称不能为空", "","error");
		 return;
	 }
	 if (title.length>=32) {
		 swal("标题不能超过32个字符串", "","error");
		 return;
	}
	 if(content==""){
		 swal("内容不能为空", "","error");
		 return;
	 }
	 if (content.length>=200) {
		 swal("内容不能超过200个字符串", "","error");
		 return;
	}
	 var company = {"notice_title":title,
			        "notice_content":content,
			        "notice_maint_id":id_maint,
			        "notice_id":selectRows[0].notice_id
			 };
	 $.ajax({
			type : "POST", //post提交方式默认是get
			url : "editNotice.do",
			contentType : 'application/json;charset=utf-8',
			data : JSON.stringify(company),
			error : function(request) {
				swal(request.msg, "","error");
			},
			success : function(obj) {
				if(obj.success){
					//swal(obj.msg, "","success");
					toastr.success(obj.msg);
					$("#noticeModifyModal").modal("hide");
					refresh();
				}else{
					swal(obj.msg, "","error");
				}
			}
		});
}
//增加表单复位
function clearAddForm() {
	$("[name='notice_title']").val("");
	$("[name='notice_content']").val("");
	$("[name='notice_maint_id']").val("");
}
//修改表单复位
function clearUpOntice() {
	$("[name='up_title']").val("");
	$("[name='up_content']").val("");
	$("[name='up_maint']").val("");
}
//条件查询复位
function clearUpForm() {
	$("#notice_title").val("");
	$("#notice_content").val("");
	$("#notice_status").val("");
}
//刷新方法
function refresh() {
	$("#tab_notice").bootstrapTable('refreshOptions',{pageNumber:1})
}