/**
 * 意见反馈
 */

var  region_id;//全局变量，当点击弹出修改框时 返回一个当前修改的id值
var TableInit = function() {
	var oTableInit = new Object();
	// 初始化Table
	oTableInit.Init = function() {
		$("#tab_evluate").bootstrapTable({
			url : "requestEvluate.do", // 请求后台的URL（*）
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
			uniqueId : "编号", //每一行的唯一标识，一般为主键列
			// showToggle:true, //是否显示详细视图和列表视图的切换按钮
			// cardView: false, //是否显示详细视图
			detailView : false, // 是否显示父子表
			columns : [ {
				checkbox : true
			}, {
				field : "emergency_number",
				title : "急修单号"
			}, {
				field : "maint_staff_name",
				title : "维保人员"
			},{
				field : "maint_comp_name",
				title : "维保单位"
			},{
				field : "lift_equipment_code",
				title : "设备注册代码"
			},{
				field : "lift_equipment_address",
				title : "设备使用地点"
			},{
				field : "emergency_isevaluate",
				title : "反馈意见",
				formatter:function (val,row,index){
					if (val=='0') {
						return  '未评价';
					}
					if(val=='1'){
						
						return  '已评价';
					}
					return val;
				}
			},{
				field : "evaluate_pingjia",
				title : "客户评价",
				width : '200',
				   formatter: function(val,row,index){
					   
					   if(val=='0'){
							
						   return '<img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" >';
						}
					   if (val=='1') {
						   
						   return '<img  src="img/bright_star.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" >';	
				      	}
					   if (val=='2') {
						   
						   return '<img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" >';	
				      	}
					   if (val=='3') {
						   
						   return '<img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" >';	
				      	}
					   if (val=='4') {
						   
						   return '<img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star_kong.png" >';	
				      	}
					   if (val=='5') {
						   
						   return '<img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star.png" >';	
				      	}
                       return val;
                   }
        },
			]
		});
		$.contextMenu({
		    // define which elements trigger this menu
		    selector: "#tab_evluate tr",
		    // define the elements of the menu   
		    items: {
		    	detail: {name: "详情", icon: "detail",  callback: function(key, opt){ 
		   
		    		$("[name='maint_staff_cardno']").val("");
					$("[name='lift_internal_number']").val("");
					$("[name='emergency_number']").val("");
					$("[name='lift_equipment_address']").val("");
					$("[name='emergency_feedback_suggestion']").val("");
					var selectData = $("#tab_evluate").bootstrapTable('getSelections');
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
		var regional2 = $("#emergency_number").val();
		if (regional2 != '' && regional2 != null && regional2 !== '急修单号') {
			temp['param1'] = regional2;
		}
		var region = $("#staff_name").val();
		if (region != '' && region != null && regional !== '请输入维保人员名称') {
			temp['param2'] = region;
		}
		var regional = $("#certificate_number").val();
		if (regional != '' && regional != null && regional !== '请输入维保单位') {
			temp['param3'] = regional;
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
		$("#query_evluate").click(function(){
			
			refresh();
		})

		//新增保存
		$("#notice_servation").click(function(){
			
			Preservation();
		})
		//条件查询复位
		$("#query_syi").click(function(){
			clearUpForm();
		})
		//查看详情
		$("#btn_edit").click(function(){
			
			$("[name='maint_staff_cardno']").val("");
			$("[name='lift_internal_number']").val("");
			$("[name='emergency_number']").val("");
			$("[name='lift_equipment_address']").val("");
			$("[name='emergency_feedback_suggestion']").val("");
			var selectData = $("#tab_evluate").bootstrapTable('getSelections');
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
	};
	return oInit;
};
function   queryOne(){
    var selectData = $("#tab_evluate").bootstrapTable('getSelections');
	$("[name='maint_staff_name']").val(selectData[0].maint_staff_name);
	$("[name='maint_staff_certificate_number']").val(selectData[0].maint_staff_certificate_number);
	$("[name='emergency_number']").val(selectData[0].emergency_number);
	$("[name='lift_equipment_address']").val(selectData[0].lift_equipment_address);
	$("[name='emergency_feedback_suggestion']").val(selectData[0].emergency_feedback_suggestion);
	 if(selectData[0].evaluate_pingjia=='0'){
			$("#pnuimg").html('<img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" >') 
		   }
		   if (selectData[0].evaluate_pingjia=='1') {
			   
			   $("#pnuimg").html('<img  src="img/bright_star.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" >') 
		   }
		   if (selectData[0].evaluate_pingjia=='2') {
			   
			   $("#pnuimg").html('<img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" >');	
	      	}
		   if (selectData[0].evaluate_pingjia=='3') {
			   $("#pnuimg").html('<img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" >');	
	      	}
		   if (selectData[0].evaluate_pingjia=='4') {
			   
			   $("#pnuimg").html('<img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star_kong.png" >');	
	      	}
		   if (selectData[0].evaluate_pingjia=='5') {
			   
			   $("#pnuimg").html('<img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star.png" >');	
	      	}
	$("#evaluateModala").modal("show");
/*	$.ajax({
			type : "POST", // post提交方式默认是get
			url : "queryEvaluate.do",
			data : {
				"emergency_number" : selectData[0].emergency_number
			},
			success : function(data) {
			  
			
			}
		});*/
}
//条件查询复位
function clearUpForm() {
	$("#staff_name").val("");
	$("#certificate_number").val("");
	$("#emergency_number").val("");
}

//刷新方法
function refresh() {
	$("#tab_evluate").bootstrapTable('refreshOptions',{pageNumber:1})
}