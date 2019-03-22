queryLiftStatusCount();//电梯状态数量
queryLiftAllWarningInfoCount();//预警信息数量
queryMaintStaffActivePercent();//维保人员活跃率
addCenterMap();//地图加载
//页面加载--查询报修信息列表
var TableInit = function() {	
		var oTableInit = new Object();
		var oTableInit = new Object();
		oTableInit.Init = function() {
			$("#tab_warninginfo").bootstrapTable('destroy');
			$("#tab_warninginfo").bootstrapTable(
							{
								url : "queryMonitorWarningInfoList.do", // 请求后台的URL（*）
								method : "post", // 请求方式（*）
						     	/*toolbar : "#toolbar",*/ // 工具按钮用哪个容器
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
											field:"fault_report_number",
											title:"报修单号"
										},
										{
											field:"lift_equipment_code",
											title:"设备注册编码"
										},
										{
											field:"lift_equipment_address",
											title:"设备使用地点"
										},
										{
											field:"report_comp_name",
											title:"上报单位"
										},
										{
											field:"report_user_name",
											title:"上报人"
										},
										{
											field:"fault_report_time",
											title:"上报时间"
										},
										{
											field : "emergency_create_time",
											title : "派单时间"
										},{
											field : "emergency_arrival_time",
											title : "到达时间"
										},{
											field : "emergency_handler",
											title : "接单人"
										},{
											field : "emergency_handler_phone",
											title : "电话"
										},{
											field : "emergency_handle_status",
											title : "状态",
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
											}
										}
										,{
											field : "id",
											title : "操作",
											formatter : function (value, row, index) {
												return ['<button type="button" style="background:none!important;border:1px solid #ccc;border-radius:2px!important;font-size: 12px!important;width: 40px;height: 22px;line-height:22px;" onclick="queryFaultWarnDetail(\'' + row.fault_report_number + '\')" >查看</button>'];
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
			temp['param1']='1';//报修信息列表
			temp['param7']='1';
			return temp;
		};
		return oTableInit;	
		
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
	
	$('#tab_warninginfo').bootstrapTable('resetView');
	
}
//点击报修信息按钮---查询报修信息列表
function queryTableFault(){
	var oTable = new TableInit();
	oTable.Init();
}
//点击预警信息按钮--查询预警信息列表
function queryTableWarn(){
	var oTableFault = new TableFaultInit();
	oTableFault.Init();
	//2.初始化Button的点击事件
	var oButtonInit = new ButtonInit();
	oButtonInit.Init();
}
//点击报修信息按钮---查询报修信息列表
function queryTablePolice(){
	var oTable = new TableInitPolice();
	oTable.Init();
}
var TableInitPolice = function() {
	var oTableInit = new Object();
	// 初始化Table
	oTableInit.Init = function() {
		$("#tab_warninginfo").bootstrapTable('destroy');
		$("#tab_warninginfo").bootstrapTable({
			url : "", // 请求后台的URL（*）
			method : "post", // 请求方式（*）
			toolbar : "#toolbar", // 工具按钮用哪个容器
			striped : true, // 是否显示行间隔色
			cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination : true, // 是否显示分页（*）
			sortable : false, // 是否启用排序
			sortOrder : "desc", // 排序方式
			queryParams : oTableInit.queryParams,// 传递参数（*）
			sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
			/* pageNumber : 1, // 初始化加载第一页，默认第一页 */
			pageSize : 10, // 每页的记录行数（*）
			pageList : [ 10, 25, 50, 100 ], // 可供选择的每页的行数（*）
			// search : true,
			// //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
			// strictSearch: true,
			// showColumns: true, //是否显示所有的列
			// showRefresh : true, //是否显示刷新按钮
			minimumCountColumns : 2, // 最少允许的列数
			clickToSelect : true, // 是否启用点击选中行
			height : $(window).height(), // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
			uniqueId : "ID", // 每一行的唯一标识，一般为主键列
			// showToggle:true, //是否显示详细视图和列表视图的切换按钮
			// cardView: false, //是否显示详细视图
			detailView : false, // 是否显示父子表
			columns : [ {
				field : "a",
				title : "设备注册代码"
			}, {
				field : "b",
				title : "设备使用地点"
			}, {
				field : "c",
				title : "告警类型"
			}, {
				field : "d",
				title : "告警时间"
			}, {
				field : "e",
				title : "派单时间"
			}, {
				field : "a",
				title : "到达时间"
			}, {
				field : "a",
				title : "接单人"
			}, {
				field : "a",
				title : "电话"
			}, {
				field : "a",
				title : "状态"
			}
			]
		});

	};
	// 得到查询的参数
	// 得到查询的参数
	oTableInit.queryParams = function(params) {
		var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			limit : params.limit, // 页面大小
			offset : params.offset
		// 页码

		};

		return temp;
	};

	return oTableInit;

};
//预警信息列表 table分页加载
var TableFaultInit = function() {
	var oTableFaultInit = new Object();
	oTableFaultInit.Init = function() {
		$("#tab_warninginfo").bootstrapTable('destroy');
		$("#tab_warninginfo").bootstrapTable(
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
										field:"warning_type",
										title:"告警类型"
									},
									{
										field:"warning_time",
										title:"告警时间"
									},
									{
										field : "emergency_create_time",
										title : "派单时间"
									},{
										field : "emergency_arrival_time",
										title : "到达时间"
									},{
										field : "emergency_handler",
										title : "接单人"
									},{
										field : "emergency_handler_phone",
										title : "电话"
									},{
										field : "emergency_handle_status",
										title : "状态",
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
		temp['param1']='2';//预警信息列表
		temp['param7']='1';
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
		$('#tab_warninginfo').bootstrapTable('resetView');
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
    		$("#lookModal").modal("show");
    		$("#lift_equipment_code").val(rows.lift_equipment_code);
    		$("#lift_equipment_address").val(rows.lift_equipment_address);
    		$("#fault_report_comp").val(rows.report_comp_name);
    		$("#fault_report_user").val(rows.report_user_name);
    		$("#fault_report_time").val(rows.fault_report_time);
    		$("#fault_description").val(rows.fault_detail);
    		var images="";
			if(rows.imageCount!=null && rows.imageCount!=0){
				for (var i = 0; i < rows.imageCount; i++) {
					images+="<img src='queryFaultReportPhotoes.do?faultReportId="+faultnumber+"&imageIndex="+i+"' style='width:40px;height:45px;'/>";
					images+="&nbsp;&nbsp;";
				}
			}
			$(".error_photo_one").html(images);
    		
    		return;
    	}
    });
    
    var m=20;
	var n=30;
	var time = parseInt(Math.random()*(n-m+1)+m);
	setTimeout('queryFaultWarnDetail(faultnumber)',time*1000);
}


function queryLiftStatusCount(){
	$.ajax({
		type : "POST", // post提交方式默认是get
		url : "queryLiftStatusCount.do",
		async:false,
		error : function(request) {
			 (JSON.stringify(request), "", "error"); 
		},
		success : function(result) {
			var rows = result.result;
			var noramlCount=0;
			var warningCount=0;
			var checkCount=0;
			var stopCount=0;
			var faultCount=0;
			var totalCount=0;
			if(rows != undefined){
				if(rows.normalCount!= undefined){
					noramlCount = rows.normalCount;
				}
				if(rows.warningCount!= undefined){
					warningCount = rows.warningCount;
				}
				if(rows.checkCount!= undefined){
					checkCount = rows.checkCount;
				}
				if(rows.stopCount!= undefined){
					stopCount = rows.stopCount;
				}
				if(rows.faultCount!= undefined){
					faultCount = rows.faultCount;
				}
				if(rows.totalCount!= undefined){
					totalCount = rows.totalCount;
				}
			}
			$("#warningCount").html('<span class="check_lift"></span><p class="p_alarm">预警电梯 &nbsp;&nbsp;'+warningCount+'</p>');
			$("#faultCount").html('<span class="warn_lift"></span><p class="p_alarm">报警电梯 &nbsp;&nbsp;'+faultCount+'</p>');
			$("#regular_lift").html('<span class="regular_lift"></span><p class="p_alarm">告警电梯 &nbsp;&nbsp;0</p>'); //告警暂时无数据
			$("#stopCount").html('<span class="nouse_lift"></span><p class="p_alarm">停用电梯 &nbsp;&nbsp;'+stopCount+'</p>');
			$("#normalCount").html('<span class="alarm_lift"></span><p class="p_alarm">正常电梯 &nbsp;&nbsp;'+noramlCount+'</p>');
			$("#checkCount").html('<span class="stop_lift"></span><p class="p_alarm">急修中 &nbsp;&nbsp;'+checkCount+'</p>');
			//$("#allCount").html('<p class="allElevator">'+totalCount+'</p><span>全部电梯(台)</span>');
			//$("#warningCount").html('<p class="abnoElevator">'+warningCount+'</p><span>预警电梯(台)</span>');
			//$("#faultCount").html('<p class="abnoElevator">'+faultCount+'</p><span>告警电梯(台)</span>');
			//$("#normalCount").html('<p class="regElevator">'+noramlCount+'</p><span>正常电梯(台)</span>');
			//$("#checkCount").html('<p class="overElevator">'+checkCount+'</p><span>检修电梯(台)</span>');
			//$("#stopCount").html('<p class="stopElevator">'+stopCount+'</p><span>停用电梯(台)</span>');
		}
	})
	
	var m=20;
	var n=30;
	var time = parseInt(Math.random()*(n-m+1)+m);
	setTimeout('queryLiftStatusCount()',time*1000);
}
function queryLiftAllWarningInfoCount(){
	$.ajax({
		type : "POST", // post提交方式默认是get
		url : "queryLiftAllWarningInfoCount.do",
		async:false,
		error : function(request) {
			 (JSON.stringify(request), "", "error"); 
		},
		success : function(result) {
			if(result.success){
				var rows = result.result;
				$("#maintain").html('<span class="maintain"></span><p>保养'+rows.allMaintCount+'台</p>');
				$("#annual").html('<span class="annual"></span><p>年检'+rows.allAnnualCount+'台</p>');
				$("#danger").html('<span class="danger"></span><p>安全隐患'+rows.allFaultCount+'台</p>');
				$("#data_upload").html('<span class="data_upload"></span><p>数据上传'+rows.allDataUploadCount+'台</p>');
				$("#repair_overtime").html('<span class="repair_overtime"></span><p>维修超时'+rows.allRepairTimeOutCount+'台</p>');
				
				getCircleData(result.result);
			}
		}
	})
	var m=20;
	var n=30;
	var time = parseInt(Math.random()*(n-m+1)+m);
	setTimeout('queryLiftAllWarningInfoCount()',time*1000);
}
function getCircleData(data){
	//圆环图
	var circleChart = echarts.init(document.getElementById('circle_data_top'));
	    circleOption = {
	    color:['#58ACFB', '#A9A7FF','#FFDDE8','#70D7CC','#8DCFFB'],
	    title: [{

		        text: '维保预警',

		        top:'45%',

		        left:'41.5%',

		        textStyle:{

		            color: '#000',

		            fontSize:14,
                    fontWeight:'normal',
		        }

		    }],
		     tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	       series : [
	       
	       {
	            name:'维保预警',
	            type:'pie',
	            radius : ['42%', '55%'],
	            x: '30%',
	            width: '100%',
	            funnelAlign: 'left',
	            max:'50%',
	            data:[
	                {value:data.allMaintCount, name:'保养'},
	                {value:data.allAnnualCount, name:'年检'},
	                {value:data.allFaultCount, name:'安全隐患'},
	                {value:data.allDataUploadCount, name:'数据上传'},
	                {value:data.allRepairTimeOutCount, name:'维修超时'},
	               
	            ]
	       },
	    ]
	};
	circleChart.setOption(circleOption);	
}

function queryMaintStaffActivePercent(){
	$.ajax({
		type : "POST", // post提交方式默认是get
		url : "queryMaintStaffActivePercent.do",
		async:false,
		error : function(request) {
			 (JSON.stringify(request), "", "error"); 
		},
		success : function(result) {
			if(result.success){
				var rows = result.result;
				$("#active_count").html(rows.activePercent+"%");
				$("#total_count").html(rows.maintTotalCount+"（个）");
			}
			
		}
	})
	var m=20;
	var n=30;
	var time = parseInt(Math.random()*(n-m+1)+m);
	setTimeout('queryMaintStaffActivePercent()',time*1000);
}

function addCenterMap(){
	//地图
	$(function(){	
		// 创建中间地图
		var map = new BMap.Map("elevator_left_btm"); // 创建地图实例
		var point = new BMap.Point(116.404, 39.915); // 创建点坐标
		map.enableScrollWheelZoom(); // 启动鼠标中键控制地图缩放
		map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
		map.enableContinuousZoom(); // 开启连续缩放效果
		map.enableInertialDragging(); // 开启惯性拖拽效果
		map.addControl(new BMap.NavigationControl()); // 添加控件
		map.addControl(new BMap.ScaleControl());
		map.addControl(new BMap.OverviewMapControl());
		map.addControl(new BMap.MapTypeControl());
		map.addEventListener("click", function(e) {// 地图单击事件
			$("label[for=longitude]").hide();
		});
		// 初始化中间地图上面 电梯类型 地图标注
		initTopDivClick(map);
		showAllWarningMapData(map,"");
		
	});
	
}
//点击中间地图 上方 电梯类型 在地图中标记
function initTopDivClick(map){
	var flag =null;
	// 地图中标记 全部电梯
	$("#allCount").click(function(){
		// 首先清除地图上的信息
	    map.clearOverlays();
	    map.removeOverlay();
		flag = "";
		showAllWarningMapData(map,flag);
	});
	// 地图中标记 异常电梯
	$("#warningCount").click(function(){
		// 首先清除地图上的信息
	    map.clearOverlays();
	    map.removeOverlay();
		flag = "2";
		showAllWarningMapData(map,flag);
	});
	// 地图中标记 正常电梯
/*	$("#normalCount").click(function(){
		// 首先清除地图上的信息
	    map.clearOverlays();
	    map.removeOverlay();
		flag = "1";
		showAllWarningMapData(map,flag);
	});*/
	// 地图中标记 检修电梯
	$("#checkCount").click(function(){
		// 首先清除地图上的信息
	    map.clearOverlays();
	    map.removeOverlay();
		flag = "3";
		showAllWarningMapData(map,flag);
	});
	// 地图中标记 停用电梯
	$("#stopCount").click(function(){
		// 首先清除地图上的信息
	    map.clearOverlays();
	    map.removeOverlay();
		flag="4";
		showAllWarningMapData(map,flag);
	});
	$("#faultCount").click(function(){
		// 首先清除地图上的信息
	    map.clearOverlays();
	    map.removeOverlay();
		flag="5";
		showAllWarningMapData(map,flag);
	});
	var m=20;
	var n=30;
	var time = parseInt(Math.random()*(n-m+1)+m);
	setTimeout(function(){showAllWarningMapData(map,flag)}, time*1000);
}

function showAllWarningMapData(map,flag){
	var data = new Object();
	data['flag']=flag;
    $.ajax({
    	type : "POST", // post提交方式默认是get
    	url : "queryMonitorWarningMapList.do",// 得到上方选择的状态的电梯
    	cache:false,
    	async: false,
    	contentType : 'application/json;charset=utf-8',
    	data :JSON.stringify(data),	
    	error : function(request) {
    		swal(JSON.stringify(request), "", "error");
    	},
    	success : function(data) {
    		var result =data.result;
    		addMarks(map,result);
    		return;
    	}
    });
    
}
// 在地图中标注电梯的位置
function addMarks(map,emInfo){
   var pointDT = new Array(); // 存放电梯标注点经纬信息的数组
   var markerDT = new Array(); // 存放标注点对象的数组
   var info = new Array();
   map.clearOverlays();
   map.removeOverlay();
   for (var i = 0; i < emInfo.length; i++) {
       var plng = emInfo[i].lift_lag; // 电梯的经度
       var plat = emInfo[i].lift_lat; // 电梯的纬度
       pointDT[i] = new window.BMap.Point(plng, plat); // 循环生成新的地图点
       var imgStr= "";
       //正常电梯
       if(emInfo[i].liftstatus=='1'){
    	   //imgStr= "img/monitor/normal.png";
       }
       //预警电梯
       if(emInfo[i].liftstatus=='2'){
    	   imgStr= "img/monitor/icon_yujing.png";
       }
       if(emInfo[i].liftstatus=='3'){
    	   imgStr= "img/monitor/icon_jixiu.png";
       }
      if(emInfo[i].liftstatus=='4'){
    	   imgStr= "img/monitor/icon_tingyong.png";
       }
       if(emInfo[i].liftstatus=='5'){
    	   imgStr= "img/monitor/icon_baojing.png";
       }
       if(emInfo[i].liftstatus=='6'){
    	   imgStr= "img/monitor/icon_gaojing.png";
       }
       var myIcon = new BMap.Icon(imgStr, new BMap.Size(60, 68));
       markerDT[i] = new window.BMap.Marker(pointDT[i],{icon:myIcon}); // 按照地图点坐标生成标记
       /*markerDT[i].setAnimation(BMAP_ANIMATION_BOUNCE);*/
      /* markerDT[i].setAnimation(BMAP_ANIMATION_DROP);//坠落动画*/   
       var  diantitypea;
   	if(emInfo[i].liftstatus=="1"){
   		diantitypea='正常';
	}else if(emInfo[i].liftstatus=="2"){
		diantitypea='预警';
	}else if(emInfo[i].liftstatus=="3"){
		diantitypea='检修';
	}else if(emInfo[i].liftstatus=="4"){
		diantitypea='停用';
	}else if(emInfo[i].liftstatus=="5"){
		diantitypea='报修';
	}else  if(emInfo[i].liftstatus=="6"){
		diantitypea='告警';
	}
       markerDT[i].setTitle(emInfo[i].lift_equipment_code+"	"+emInfo[i].lift_equipment_address+","+diantitypea);
       markerDT[i].addEventListener("click",attribute);// 添加点击事件
       map.addOverlay(markerDT[i]);  
   }
   map.setViewport(pointDT);// 调用setViewport 自动调整设置视野
}

//点击地图中的 电梯图标 跳转到电梯实时监控页面
function attribute(e){
	var p = e.target;
	var dtTitle = p.getTitle();
	var dtCode= dtTitle.split("\t");
	if(dtCode[1].split(",")[1]=="正常"){
		
		
	}else if(dtCode[1].split(",")[1]=="预警"){
		
		//alert("预警电梯")
		Elevator(dtCode[0]);
	}else if(dtCode[1].split(",")[1]=="检修"){
		
		//alert("检修电梯")
		Elevator(dtCode[0]);
	}else if(dtCode[1].split(",")[1]=="停用"){
		
		//alert("停用电梯")
		toastr.error("该电梯已停用");
	}else if(dtCode[1].split(",")[1]=="报修"){
		
		Elevator(dtCode[0]);
	}else  if(dtCode[1].split(",")[1]=="告警"){
		Elevator(dtCode[0]);
		//alert("告警电梯")
	}
	//还有最近维保人员的信息
	
	//window.open(getRootPath()+"/liftInfoMsg.do?dt_code="+dtCode[0]);
	/*var p = e.target;
	var dtTitle = p.getTitle();
	var dtCode= dtTitle.split("\t");
	$("#mapInfoModal").modal("show");
	$('#mapInfoModal').resize(function () {
		$('#table_mapwarning').bootstrapTable('resetView');
	});
	var oMapTable = new mapTableInit(dtCode[0]);
	oMapTable.Init();
	//2.初始化Button的点击事件
	var oButtonInit = new ButtonInit();
	oButtonInit.Init();*/
	
}
var mapTableInit = function(liftEquipmentCode) {
	var oMapTableInit = new Object();
	oMapTableInit.Init = function() {
		$("#table_mapwarning").bootstrapTable('destroy');
		$("#table_mapwarning").bootstrapTable(
						{
							url : "queryMonitorMapByEquipmentCode.do", // 请求后台的URL（*）
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
										field:"warn_resource",
										title:"故障来源",
										formatter:	function(value,row,index){
											if(value == '101'){
												return "故障扫描上传"
											}
											if(value == '201'){
												return "下位机预警"
											}
										}
									},
									{
										field:"warn_type",
										title:"告警类型"
									},
									{
										field:"warn_time",
										title:"上报时间"
									},
									{
										field:"lift_equipment_address",
										title:"故障地点"
									},
									{
										field:"emergency_handler",
										title:"维保负责人"
									},
									{
										field:"lift_distance",
										title:"距离"
									},
									{
										field : "emergency_handler_phone",
										title : "电话"
									},{
										field : "emergency_handle_status",
										title : "状态",
										formatter:	function(value,row,index){
											if(value == '0'){
												return "已接单"
											}
											if(value == '1'){
												return "维修中"
											}
											if(value == '2'){
												return "已完成"
											}
										}
									}
									]
						});
	
	};
	// 得到查询的参数
	oMapTableInit.queryParams = function(params) {
		var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			limit : params.limit, // 页面大小
			offset : params.offset // 页码
              
		};
		temp['param1']=liftEquipmentCode;
		return temp;
	};
	$('#mapInfoModal').resize(function () {
		$('#table_mapwarning').bootstrapTable('resetView');
	});
	return oMapTableInit;
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
	
}
function searchLiftWarningList(){
	$("#searchModal").modal("show");
	var oSearchTable = new searchTableInit();
	oSearchTable.Init();
	//2.初始化Button的点击事件
	var oButtonInit = new ButtonInit();
	oButtonInit.Init();
}
var searchTableInit = function() {
	var oSearchTableInit = new Object();
	oSearchTableInit.Init = function() {
		$("#table_searchwarning").bootstrapTable('destroy');
		$("#table_searchwarning").bootstrapTable(
						{
							url : "queryLiftWarningInfoBySearch.do", // 请求后台的URL（*）
							method : "post", // 请求方式（*）
					     	toolbar : "#toolbar", // 工具按钮用哪个容器
							striped : true, // 是否显示行间隔色
							cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
							pagination : true, // 是否显示分页（*）
							sortable : false, // 是否启用排序
							sortOrder : "desc", // 排序方式
							queryParams : oSearchTableInit.queryParams,// 传递参数（*）
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
										field:"usedd_comp_name",
										title:"客户名称"
									},
									{
										field:"project_name",
										title:"项目名称"
									},
									{
										field:"use_comp_name",
										title:"使用单位"
									},
									{
										field:"liftstatus",
										title:"电梯状态",
										formatter:	function(value,row,index){
											if(value == '1'){
												return "正常"
											}
											if(value == '2'){
												return "报修"
											}
											if(value == '5'){
												return "预警"
											}
											if(value == '3'){
												return "检修"
											}
											if(value == '4'){
												return "停用"
											}
										}
									},
									{
										field : "emergency_create_time",
										title : "派单时间"
									},{
										field : "emergency_arrival_time",
										title : "到达时间"
									},{
										field : "emergency_handler",
										title : "接单人"
									},{
										field : "emergency_handler_phone",
										title : "电话"
									},{
										field : "emergency_handle_status",
										title : "状态",
										formatter:	function(value,row,index){
											if(value == '0'){
												return "已接单"
											}
											if(value == '1'){
												return "维修中"
											}
											if(value == '2'){
												return "已完成"
											}
										}
									}
									]
						});
	
	};
	// 得到查询的参数
	oSearchTableInit.queryParams = function(params) {
		var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			limit : params.limit, // 页面大小
			offset : params.offset // 页码
              
		};
		var maintName = $('#search_maint_name').val();
		if(maintName!='客户名称'&&maintName!=''&&maintName!=null){
			temp['param1']=maintName;
		}
		var projectName = $('#search_project_name').val();
		if(projectName!='项目名称'&&projectName!=''&&projectName!=null){
			temp['param2']=projectName;
		}
		var useName = $('#search_use_name').val();
		if(useName!='使用单位'&&useName!=''&&useName!=null){
			temp['param3']=useName;
		}	
		var equipment_code = $('#search_lift_equipment_code').val();
		if(equipment_code!='设备注册代码'&&equipment_code!=''&&equipment_code!=null){
			temp['param4']=equipment_code;
		}	
		var use_comp_address = $('#search_use_comp_address').val();
		if(use_comp_address!='使用单位地址'&&use_comp_address!=''&&use_comp_address!=null){
			temp['param5']=use_comp_address;
		}	
		return temp;
	};
	$('.modal').resize(function () {
		$('#table_searchwarning').bootstrapTable('resetView');
	});
	return oSearchTableInit;
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
}

function  Elevator(code){
	$.ajax({
		type : "POST", //post提交方式默认是get
		url : "queryElevator.do",
		data : {"code":code},
		error : function(request) {
			toastr.error("查询失败！");
		},
		success : function(obj) {
			if(obj!=""){
				$("#code").html(obj.lift_equipment_code);
				$("#address").html(obj.lift_equipment_address);
				$("#time").html(obj.emergency_create_time);
				if(obj.emergency_handle_status=="0"){
					$("#state").html("未处理");
				}else if(obj.emergency_handle_status=="1"){
					$("#state").html("已接单");
				}else if(obj.emergency_handle_status=="2"){
					$("#state").html("维修中");
				}else if(obj.emergency_handle_status=="3"){
					$("#state").html("待物管确认");
				}else if(obj.emergency_handle_status=="4"){
					$("#state").html("待换配件");
				}else if(obj.emergency_handle_status=="5"){
					$("#state").html("物管已确认");
				}else if(obj.emergency_handle_status=="6"){
					$("#state").html("系统自动确认");
				}
				if(obj.emergency_betrapped=="1"){
					$("#piestype").html("自动派单");
				}else if(obj.emergency_betrapped=="2"){
					$("#piestype").html("手动派单");
				}else {
					$("#piestype").html("暂无派单信息");
				}
				$("#liftWarn").modal("show");
				recentPersonnel(code);
			}else {
				
				toastr.error("该电梯在记录中没有记录！");
			}
      
		}
	});
}

//最近人员信息

function   recentPersonnel(code){
	$.ajax({
		type : "POST", //post提交方式默认是get
		url : "queryRecentpersonnel.do",
		data : {"code":code},
		error : function(request) {
			toastr.error("查询失败！");
		},
		success : function(obj) {
         if (obj.juli==null) {
			$("#juli").html("")
			$("#xingming").html("该电梯十公里内无维修人员")
			$("#dianhua").html("")
			$("#typeztai").html("")	
		}else {
			$("#juli").html("距离:"+obj.juli)
			$("#xingming").html(obj.name)
			$("#dianhua").html(obj.dianhua)
			if(obj.zuantai=='0'){
				$("#typeztai").html("在线")
			}
			if(obj.zuantai=='1'){
				$("#typeztai").html("休息")
			}
			if(obj.zuantai=='2'){
				$("#typeztai").html("检修中")
			}
			$("#maintStaffId").html(obj.id)
		   }
		}
	});
}

setInterval(function() {
	modalListTableInit2();
}, 10000);

function  queryLatelyPersonnel(){
	$("[name=safffname]").val("");
	$("#modalList").modal("show")
	var oSearchTable = new modalListTableInit2();
	oSearchTable.Init();
	//2.初始化Button的点击事件
	var oButtonInit = new ButtonInit();
	oButtonInit.Init();
		
}
function modalListTableInit2() {
	var  codedianti = $("#code").text();//电梯编号
	var oTableInit = new Object();
	// 初始化Table
	oTableInit.Init = function() {
		$("#table_pep").bootstrapTable('destroy');
		$("#table_pep").bootstrapTable({
			url : "queryLatelyPersonnel.do", // 请求后台的URL（*）
			method : "post", // 请求方式（*）
			toolbar : "#toolbar", // 工具按钮用哪个容器
			striped : true, // 是否显示行间隔色
			cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination : true, // 是否显示分页（*）
			sortable : false, // 是否启用排序
			sortOrder : "desc", // 排序方式
			queryParams :codedianti,// 传递参数（*）
			sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
			/* pageNumber : 1, // 初始化加载第一页，默认第一页 */
			pageSize : 10, // 每页的记录行数（*）
			pageList : [ 10, 25, 50, 100 ], // 可供选择的每页的行数（*）
			// search : true,
			// //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
			// strictSearch: true,
			// showColumns: true, //是否显示所有的列
			// showRefresh : true, //是否显示刷新按钮
			minimumCountColumns : 2, // 最少允许的列数
			clickToSelect : true, // 是否启用点击选中行
			height :200, // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
			uniqueId : "ID", // 每一行的唯一标识，一般为主键列
			// showToggle:true, //是否显示详细视图和列表视图的切换按钮
			// cardView: false, //是否显示详细视图
			detailView : false, // 是否显示父子表
			columns : [ {
				field : "name",
				title : "姓名"
			}, {
				field : "dianhua",
				title : "联系电话"
			},{
				field : "id",
				title : "人员id",
				visible:false
			}, {
				field : "zuantai",
				title : "工作状态",
				formatter : function(value, row, index) {
					if (value == '0') {
						value = "在线";
					}
					if (value == "1") {
						value = "休息";
					}
					if (value == "2") {
						value = "检修中";
					}

					return value
				}
			}, {
				field : "juli",
				title : "距离故障电梯"
			}
			,{  field: "emergencyType",
				title : "操作",
				events: operateEvents,
				formatter: operateFormatter
			}
			]
		});
		
	};
	
	window.operateEvents= {
	
			'click #btn_distribute': function(e, value, row, index) {	
				//调用派单接口
				var vdata=Object();
				vdata["maintStaffId"]=row.id;
				vdata["maintStaffPhone"]=row.dianhua;
				vdata["dtcode"]=row.dtcode;
				$.ajax({
					type : 'post',
					data:JSON.stringify(vdata),
					contentType : "application/json;charset=utf-8",
					url : "distributeEmergency.do",
					error : function(request) {
						toastr.error("连接数据库失败!");
					},
					success : function(obj) {												
						$("#btn_distribute").text("正在派单");
						$("#btn_distribute").css("color","blue");
					}
				});
				}}; 	
				
				
				
		function operateFormatter(value, row, index) {
			
			if (value == '0') {
				return [
					'<button id="btn_distribute" type="button"  style="color:#0000FF">正在派单</button>',
				].join('');
			}
			if (value == "1") {
				return [
					'<button id="btn_distribute" type="button" style="color:blue" >派单成功</button>',
				].join('');
			}
			if (value == "2") {
				return [
					'<button id="btn_distribute" type="button" style="color:red" >派单失败</button>',
				].join('');
			}
			if (value == "3") {
				return [
					'<button id="btn_distribute" type="button" >派单</button>',
				].join('');
			}
			
			
					}
	return oTableInit;
};





function  queryWeibaoren(){
	
		var oSearchTable = new modalListTableInit();
		oSearchTable.Init();
		//2.初始化Button的点击事件
		var oButtonInit = new ButtonInit();
		oButtonInit.Init();
}
var modalListTableInit = function() {
	var oTableInit = new Object();
	// 初始化Table
	oTableInit.Init = function() {
		$("#table_pep").bootstrapTable('destroy');
		$("#table_pep").bootstrapTable({
			url : "queryMaintStaffList.do", // 请求后台的URL（*）
			method : "post", // 请求方式（*）
			toolbar : "#toolbar", // 工具按钮用哪个容器
			striped : true, // 是否显示行间隔色
			cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination : true, // 是否显示分页（*）
			sortable : false, // 是否启用排序
			sortOrder : "desc", // 排序方式
			queryParams : oTableInit.queryParams,// 传递参数（*）
			sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
			/* pageNumber : 1, // 初始化加载第一页，默认第一页 */
			pageSize : 10, // 每页的记录行数（*）
			pageList : [ 10, 25, 50, 100 ], // 可供选择的每页的行数（*）
			// search : true,
			// //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
			// strictSearch: true,
			// showColumns: true, //是否显示所有的列
			// showRefresh : true, //是否显示刷新按钮
			minimumCountColumns : 2, // 最少允许的列数
			clickToSelect : true, // 是否启用点击选中行
			height :200, // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
			uniqueId : "ID", // 每一行的唯一标识，一般为主键列
			// showToggle:true, //是否显示详细视图和列表视图的切换按钮
			// cardView: false, //是否显示详细视图
			detailView : false, // 是否显示父子表
			columns : [ {
				field : "maint_staff_name",
				title : "姓名"
			}, {
				field : "maint_staff_phonenum",
				title : "联系电话"
			}, {
				field : "maint_staff_work_status",
				title : "工作状态",
				formatter : function(value, row, index) {
					if (value == '0') {
						value = "在线";
					}
					if (value == "1") {
						value = "休息";
					}
					if (value == "2") {
						value = "检修中";
					}

					return value
				}
			}
			,{
				field : "id",
				title : "操作",
				formatter : function (value, row, index) {
					return '<a >派单</a>';
	            }
			}
			]
		});

	};
	// 得到查询的参数
	// 得到查询的参数
	oTableInit.queryParams = function(params) {
		var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			limit : params.limit, // 页面大小
			offset : params.offset,
			param2: $("[name=safffname]").val()
		};

		return temp;
	};

	return oTableInit;

};


//最近人员派单
function manualDistribute(){
	var vdata=Object();
	vdata["maintStaffId"]=$("#maintStaffId").html();
	vdata["maintStaffPhone"]=$("#dianhua").html();
	vdata["dtcode"]=$("#code").html();;
	$.ajax({
		type : 'post',
		data:JSON.stringify(vdata),
		contentType : "application/json;charset=utf-8",
		url : "distributeEmergency.do",
		error : function(request) {
			toastr.error("连接数据库失败!");
		},
		success : function(obj) {
				$("#sendModal").hide();					
				
		}
	}); 
}