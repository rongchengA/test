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
									
								}
							}
							]
				});
		$.contextMenu({
		    // define which elements trigger this menu
		    selector: "#tab_warninginfo tr",
		    // define the elements of the menu   
		    items: {
		    	detail: {name: "详情", icon: "detail",  callback: function(key, opt){ 
		    		queryFaultWarnDetail();
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
		temp['param1']='1';//报修信息列表
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
function clearAddForm(){
	$("#detail_form")[0].reset();
	/*$("#editForm")[0].reset();*/
}
//点击报修信息列表-查看按钮-弹出报修信息详情
function queryFaultWarnDetail(){
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
	clearAddForm();
	//获取选中行第一行
	var project = selectRows[0];
	$("#lookModal").modal("show");
	var data = new Object();
	data['faultnumber']=project.fault_report_number;
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
    		$("#lift_equipment_code").val(rows.lift_equipment_code);
    		$("#lift_equipment_address").val(rows.lift_equipment_address);
    		$("#fault_report_comp").val(rows.report_comp_name);
    		$("#fault_report_user").val(rows.report_user_name);
    		$("#fault_report_time").val(rows.fault_report_time);
    		$("#fault_description").val(rows.fault_detail);
    		var images="";
			if(rows.imageCount!=null && rows.imageCount!=0){
				for (var i = 0; i < rows.imageCount; i++) {
					images+="<img id='img1' src='queryFaultReportPhotoes.do?faultReportId="+project.fault_report_number+"&imageIndex="+i+"' alt='' style='width:40px;height:45px;'/>";
					images+="&nbsp;&nbsp;";
				}
			}
			$(".error_photo_one").html(images);
    		
    		return;
    	}
    });
}

//点击图片放大与缩小;
function imgScale() {
	var flag = true; // 状态true为正常的状态,false为放大的状态
	var imgH; // 图片的高度
	var imgW; // 图片的宽度
    var img=$("img");
	imgW = img.width;
	imgH = img.height;
	for (var i = 0; i < img.length; i++) {
		img[i].onclick = function() {
			// 图片点击事件
			if (flag) {
				// 图片为正常状态
				flag = false; // 把状态设为放大状态
				this.style.width = "149px";
				this.style.height = "72px";
				this.style.position = "inherit";
				this.style.bottom = "0px";
				this.style.right = "0px";
				this.style.top = "0px";
				this.style.left = "0px";
			} else {
				// 图片为放大状态,铺满整个屏幕;
				flag = true; // 把状态设为正常状态
				this.style.width = "80%";
				this.style.height = "90%";
				this.style.position = "fixed";
				this.style.bottom = "0%";
				this.style.right = "0%";
				this.style.top = "0%";
				this.style.left = "10%";
			}
		}
	}
}