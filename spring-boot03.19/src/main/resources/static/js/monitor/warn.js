//预警信息列表 table分页加载
var TableInit = function() {	
	var oTableInit = new Object();
	// 初始化Table
	oTableInit.Init = function() {
		$("#tab_warninginfo").bootstrapTable('destroy');
		$("#tab_warninginfo").bootstrapTable(
						{
							url : "queryMonitorWarningInfoList.do", // 请求后台的URL（*）
							method : "post", // 请求方式（*）
					     	toolbar : "#toolbar", // 工具按钮用哪个容器
							striped : true, // 是否显示行间隔色
							cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
							pagination : true, // 是否显示分页（*）
							sortable : false, // 是否启用排序
							sortOrder : "desc", // 排序方式
							queryParams : oTableInit.queryParams,// 传递参数（*）
							sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
							pageNumber : 1, // 初始化加载第一页，默认第一页
							pageSize : 10, // 每页的记录行数（*）
							pageList : [ 10, 25, 50, 100 ], // 可供选择的每页的行数（*）
							/*classes:"table-no-bordered",*/
							// search : true,
							// //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
							// strictSearch: true,
							// showColumns: true, //是否显示所有的列
							// showRefresh : true, //是否显示刷新按钮
							minimumCountColumns : 2, // 最少允许的列数
							clickToSelect : true, // 是否启用点击选中行
							height: $(window).height(), // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
							uniqueId : "ID", // 每一行的唯一标识，一般为主键列
							// showToggle:true, //是否显示详细视图和列表视图的切换按钮
							// cardView: false, //是否显示详细视图
							detailView : false, // 是否显示父子表
							columns : [
									{
										checkbox : true
									},
									{
										field:"lift_equipment_code",
										title:"设备注册编码",
										width : '180',
									},
									{
										field:"lift_equipment_address",
										title:"设备使用地点",
										width : '190',
									},
									{
										field:"warning_type",
										title:"告警类型",
										width : '305',
									},
									{
										field:"warning_time",
										title:"告警时间",
										width : '120',
									},
									{
										field : "emergency_create_time",
										title : "派单时间",
										width : '120',
									},{
										field : "emergency_arrival_time",
										title : "到达时间",
										width : '120',
									},{
										field : "emergency_handler",
										title : "接单人",
										width : '60',
									},{
										field : "emergency_handler_phone",
										title : "电话",
										width : '105',
									},{
										field : "emergency_handle_status",
										title : "处理情况",
										formatter:	function(value,row,index){
											if(value == '0'){
												return "未处理"
											}
											if(value == '1'){
												return "已接单"
											}
											if(value == '2'){
												return "已签到"
											}
											if(value == '3'){
												return "待物管确认"
											}
											if(value == '4'){
												return "待换配件"
											}											
											if(value == '5'){
												return "物管已确认"
											}
											if(value == '6'){
												return "系统自动确认"
											}
											if(value == '7'){
												return "已人工结束"
											}
											if(value == '8'){
												return "<p style='color:red'>自动派单失败</p>"
											}
											
										}
									}
									 ]
									
						});
		$.contextMenu({
		    // define which elements trigger this menu
		    selector: "#tab_warninginfo tr",
		    // define the elements of the menu   
		    items: {
		    	detail: {name: "预警详情", icon: "detail",  callback: function(key, opt){ 
		    		warnDetailList();
			    		}},		 
		    }
		   
		});
	};
	// 得到查询的参数
	oTableInit.queryParams = function(params) {
		var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			limit : params.limit, // 页面大小
			offset : params.offset // 页码
              
		};		
		temp['param1']='2';//预警信息列表
		var vEquipCode = $('#search_equipment_code').val();
		if(vEquipCode&&vEquipCode!=''&&vEquipCode!=null){
			temp['param2']=vEquipCode;
		}
		var vEquipAddress = $('#search_equipment_address').val();
		if(vEquipAddress&&vEquipAddress!=''&&vEquipAddress!=null){
			temp['param3']=vEquipAddress;
		}
		var vWarnStatus = $('#search_status').val();
		if(vWarnStatus&&vWarnStatus!=''&&vWarnStatus!=null){
			temp['param4']=vWarnStatus;
		}
		var vWarnTime = $('#search_warning_time').val();
		if(vWarnTime&&vWarnTime!=''&&vWarnTime!=null){
			temp['param5']=vWarnTime;
		}
		return temp;
	};
	$("#tab_warninginfo").bootstrapTable('resetView');
	return oTableInit;
	
	/*var ButtonInit = function () {
	    var oInit = new Object();
	    var postdata = {};
	    //初始化页面上面的按钮事件
	    oInit.Init = function () {
	    	//条件查询
	    	$("#btn_search").click(function(){
	    		refresh();
	    	});
	    	
	    };    
	    return oInit;
	};*/
	
}
//查询
function refresh(){
	 $('#tab_warninginfo').bootstrapTable('refreshOptions',{pageNumber:1});
}
//重置查询
function doReset() {
	$("#search_equipment_code").val('');
	$("#search_equipment_address").val('');
	$("#search_status").val('');
	$("#search_warning_time").val('');		
}

//预警故障详情列表
function warnDetailList(){
	var selectRows = $("#tab_warninginfo").bootstrapTable("getSelections");
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
	if(selectRows.length>1){
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
	$("#warnModal").modal("show");
	var oMapTable = new mapTableInit(selectRows);
	oMapTable.Init();
	
}
var mapTableInit = function(selectRows) {
	var oMapTableInit = new Object();
	oMapTableInit.Init = function() {
		$("#table_warndetail").bootstrapTable('destroy');
		$("#table_warndetail").bootstrapTable(
						{
							url : "queryLiftWarningInfoDetailList.do", // 请求后台的URL（*）
							method : "post", // 请求方式（*）
					     	toolbar : "#toolbar", // 工具按钮用哪个容器
							striped : true, // 是否显示行间隔色
							cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
							pagination : true, // 是否显示分页（*）
							sortable : false, // 是否启用排序
							sortOrder : "desc", // 排序方式
							queryParams : oMapTableInit.queryParams,// 传递参数（*）
							sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
							pageNumber : 1, // 初始化加载第一页，默认第一页
							pageSize : 10, // 每页的记录行数（*）
							pageList : [ 10, 25, 50, 100 ], // 可供选择的每页的行数（*）
							// search : true,
							// //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
							// strictSearch: true,
							// showColumns: true, //是否显示所有的列
							// showRefresh : true, //是否显示刷新按钮
							minimumCountColumns : 2, // 最少允许的列数
							clickToSelect : true, // 是否启用点击选中行
							height: $(window).height(), // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
							uniqueId : "ID", // 每一行的唯一标识，一般为主键列
							// showToggle:true, //是否显示详细视图和列表视图的切换按钮
							// cardView: false, //是否显示详细视图
							detailView : false, // 是否显示父子表
							columns : [
									{
										field:"lift_equipment_code",
										title:"设备注册编码"
									},
									{
										field:"lift_equipment_address",
										title:"设备使用地点"
									},
									{
										field:"warning_type",
										title:"告警类型"
									},
									{
										field:"warning_time",
										title:"告警时间"
									},
									]
						});
	
	};
	// 得到查询的参数
	oMapTableInit.queryParams = function(params) {
		var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			limit : params.limit, // 页面大小
			offset : params.offset // 页码              
		};
		temp['param1']=selectRows[0].lift_equipment_code;
		temp['param2']=selectRows[0].emergency_create_time;
		temp['param3']=selectRows[0].emergency_handle_time;
		return temp;
	};
	$('.modal').resize(function () {
		$('#table_warndetail').bootstrapTable('resetView');
	});
	return oMapTableInit;
	var ButtonInit = function () {
	    var oInit = new Object();
	    var postdata = {};
	    //初始化页面上面的按钮事件
	    oInit.Init = function () {
	    	//条件查询
	    	/*$("#btn_search").click(function(){
	    		refresh();
	    	});*/
	    	
	    };    
	    return oInit;
	};
	
}