var TableInit = function() {	
	var oTableInit = new Object();
	// 初始化Table
	oTableInit.Init = function() {
		$("#healthTable").bootstrapTable(
						{
							url : "queryLiftHealthMsg.do", // 请求后台的URL（*）
							method : "post", // 请求方式（*）
					     	toolbar : "#toolbar", // 工具按钮用哪个容器
							striped : true, // 是否显示行间隔色
							cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
							pagination : true, // 是否显示分页（*）
							sortable : false, // 是否启用排序
							sortOrder : "desc", // 排序方式
							queryParams : oTableInit.queryParams,// 传递参数（*）
							sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
							/*pageNumber : 1, // 初始化加载第一页，默认第一页*/
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
							columns : [{
										checkbox : true
									},{
										field : "lift_equipment_code",
										title : "设备注册代码"
									},{
										field : "lift_equipment_address",
										title : "设备使用地点"
									},{
										field : "maint_comp_name",
										title : "维保单位",
									},{
										field : "maint_staff_name",
										title : "维保负责人"
									},{
										field : "lift_equipment_code",
										title : "维保记录",										
										formatter : function (value, row, index) {
											return ['<button type="button" data-toggle="modal" data-target="#maintModal" onclick="queryTableMaintInfo(\'' + row.lift_equipment_code + '\')" >查看</button>'];
							            }
									},{
										field : "lift_equipment_code",
										title : "预警记录",
										formatter : function (value, row, index) {
											return ['<button type="button" data-toggle="modal" data-target="#alarmModal" onclick="queryTableWarn(\'' + row.lift_equipment_code + '\')" >查看</button>'];
							            }
									},{
										field : "lift_equipment_code",
										title : "告警记录",
										formatter : function (value, row, index) {
											return ['<button type="button" data-toggle="modal" data-target="#warnModal" onclick="queryTableFault(\'' + row.lift_equipment_code + '\')" >查看</button>'];
							            }
									},{
										title : "健康状况",
										formatter:	function(value,row,index){
											return "正常"										
										}
									}
									]
						});
	
	};
	// 得到查询的参数
	oTableInit.queryParams = function(params) {
		var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			limit : params.limit, // 页面大小
			offset : params.offset // 页码
              
		};
		var vMaintComp = $('#search_maint_company_name').val();
		if(vMaintComp&&vMaintComp!=''&&vMaintComp!=null){
			temp['param1']=vMaintComp;
		}
		var vEquipCode = $('#search_equipment_code').val();
		if(vEquipCode&&vEquipCode!=''&&vEquipCode!=null){
			temp['param2']=vEquipCode;
		}
		var vEquipAddress = $('#search_equipment_address').val();
		if(vEquipAddress&&vEquipAddress!=''&&vEquipAddress!=null){
			temp['param3']=vEquipAddress;
		}
		return temp;
	};
	return oTableInit;
	
};

//查询
function refresh(){
	 $('#healthTable').bootstrapTable('refreshOptions',{pageNumber:1});
}
//重置查询
function doReset() {
	$("#search_maint_company_name").val('');
	$("#search_equipment_code").val('');
	$("#search_equipment_address").val('');
		
}
//刷新弹框界面
function clearAddForm(){
	$("#addForm")[0].reset();
}
//点击维保记录查看按钮--查询维保记录列表
function queryTableMaintInfo(liftEquipmentCode){
	var oTableMaint = new TableMaintInit(liftEquipmentCode);
	oTableMaint.Init();
}
//维保记录列表table分页加载
var TableMaintInit = function(liftEquipmentCode) {
	var oTableMaintInit = new Object();
	oTableMaintInit.Init = function() {
		$("#table_health_maint").bootstrapTable('destroy');
		$("#table_health_maint").bootstrapTable(
						{
							url : "queryLiftHealthMaintInfo.do", // 请求后台的URL（*）
							method : "post", // 请求方式（*）
					     	/*toolbar : "#toolbar", */// 工具按钮用哪个容器
							striped : true, // 是否显示行间隔色
							cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
							pagination : true, // 是否显示分页（*）
							sortable : false, // 是否启用排序
							sortOrder : "desc", // 排序方式
							queryParams : oTableMaintInit.queryParams,// 传递参数（*）
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
											field:"order_number",
											title:"工单编号"
										},
										{
											field:"order_maint_type",
											title:"保养类型"
										},
										{
											field:"order_plan_date",
											title:"计划保养日期"
										},
										{
											field:"order_actual_date",
											title:"实际保养日期"
										}
									 ]
									
						});
	
	};
	// 得到查询的参数
	oTableMaintInit.queryParams = function(params) {
		var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			limit : params.limit, // 页面大小
			offset : params.offset // 页码
              
		};
		console.log(liftEquipmentCode);
		temp['param1']=liftEquipmentCode;
		console.log(temp);
		return temp;
	};
	return oTableMaintInit;	
	
	$('.modal').resize(function () {
		$('#table_health_maint').bootstrapTable('resetView');
	 });
	
}

//点击预警信息按钮--查询预警信息列表
function queryTableWarn(liftEquipmentCode){
	var oTableWarn = new TableWarnInit(liftEquipmentCode);
	oTableWarn.Init();
}
//预警信息列表 table分页加载
var TableWarnInit = function(liftEquipmentCode) {
	var oTableWarnInit = new Object();
	oTableWarnInit.Init = function() {
		$("#table_health_warn").bootstrapTable('destroy');
		$("#table_health_warn").bootstrapTable(
						{
							url : "queryMonitorWarningInfoList.do", // 请求后台的URL（*）
							method : "post", // 请求方式（*）
					     	/*toolbar : "#toolbar", */// 工具按钮用哪个容器
							striped : true, // 是否显示行间隔色
							cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
							pagination : true, // 是否显示分页（*）
							sortable : false, // 是否启用排序
							sortOrder : "desc", // 排序方式
							queryParams : oTableWarnInit.queryParams,// 传递参数（*）
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
										title:"预警类型"
									},
									{
										field:"warning_time",
										title:"预警时间"
									}
									 ]
									
						});
	
	};
	// 得到查询的参数
	oTableWarnInit.queryParams = function(params) {
		var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			limit : params.limit, // 页面大小
			offset : params.offset // 页码
              
		};		
		temp['param1']='2';//预警信息列表
		temp['param2']=liftEquipmentCode;
		return temp;
	};
	return oTableWarnInit;	
	$('.modal').resize(function () {
		$('#table_health_warn').bootstrapTable('resetView');
	 });
	
}
//点击预警信息按钮--查询预警信息列表
function queryTableFault(liftEquipmentCode){
	var oTableFault = new TableFaultInit(liftEquipmentCode);
	oTableFault.Init();
	//2.初始化Button的点击事件
	var oButtonInit = new ButtonInit();
	oButtonInit.Init();
}

//预警信息列表 table分页加载
var TableFaultInit = function(liftEquipmentCode) {
	var oTableFaultInit = new Object();
	oTableFaultInit.Init = function() {
		$("#table_health_fault").bootstrapTable('destroy');
		$("#table_health_fault").bootstrapTable(
						{
							url : "queryMonitorWarningInfoList.do", // 请求后台的URL（*）
							method : "post", // 请求方式（*）
					     	/*toolbar : "#toolbar", */// 工具按钮用哪个容器
							striped : true, // 是否显示行间隔色
							cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
							pagination : true, // 是否显示分页（*）
							sortable : false, // 是否启用排序
							sortOrder : "desc", // 排序方式
							queryParams : oTableFaultInit.queryParams,// 传递参数（*）
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
										field:"report_user_name",
										title:"上报人"
									},
									{
										field:"fault_report_time",
										title:"上报时间"
									},{
										field : "id",
										title : "操作",
										formatter : function (value, row, index) {
											return ['<button data-toggle="modal" data-target="#detailModal" onclick="queryFaultWarnDetail(\'' + row.fault_report_number + '\')" >查看</button>'];
							            }
									}
									 ]
									
						});
	
	};
	// 得到查询的参数
	oTableFaultInit.queryParams = function(params) {
		var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			limit : params.limit, // 页面大小
			offset : params.offset // 页码
              
		};		
		temp['param1']='1';//预警信息列表
		temp['param2']=liftEquipmentCode;
		return temp;
	};
	return oTableFaultInit;	
	
	var ButtonInit = function () {
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
	};
	$('.modal').resize(function () {
		$('#table_health_fault').bootstrapTable('resetView');
	 });
	
}

//点击报修信息列表-查看按钮-弹出报修信息详情
function queryFaultWarnDetail(faultnumber){
	var data = new Object();
	data['faultnumber']=faultnumber;
    $.ajax({
    	type : "POST", // post提交方式默认是get
    	url : "queryFaultWarnDetail.do",// 得到上方选择的状态的电梯
    	cache:false,
    	async: false,
    	contentType : 'application/json;charset=utf-8',
    	data :JSON.stringify(data),	
    	error : function(request) {
    		swal(JSON.stringify(request), "", "error");
    	},
    	success : function(data) {
    		var rows=data.result;
    		console.log(rows);
    		$("#lift_equipment_code").val(rows.lift_equipment_code);
    		$("#lift_equipment_address").val(rows.lift_equipment_address);
    		$("#fault_report_comp").val(rows.report_comp_name);
    		$("#fault_report_user").val(rows.report_user_name);
    		$("#fault_report_time").val(rows.fault_report_time);
    		$("#text_des").val(rows.fault_detail);
    		var images="";
			if(rows.imageCount!=null && rows.imageCount!=0){
				for (var i = 0; i < rows.imageCount; i++) {
					images+="<img src='queryFaultReportPhotoes.do?faultReportId="+faultnumber+"&imageIndex="+i+"' style='width:80px;height:110px;'/>";
					images+="&nbsp;&nbsp;";
				}
			}
			$("#fault_photo").html(images);
    		
    		return;
    	}
    });
    
    var m=20;
	var n=30;
	var time = parseInt(Math.random()*(n-m+1)+m);
	setTimeout('queryFaultWarnDetail(faultnumber)',time*1000);
}
