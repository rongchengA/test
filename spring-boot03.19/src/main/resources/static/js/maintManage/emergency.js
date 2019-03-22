/**
 * 项目管理
 */
var TableInit = function() {	
	var oTableInit = new Object();
	// 初始化Table
	oTableInit.Init = function() {
		$("#tab_emergency").bootstrapTable(
						{
							url : "queryEmergencyRecord.do", // 请求后台的URL（*）
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
										field:"emergency_id",
										title:"ID",
										visible : false
									},{
										field : "emergency_number",
										title : "急修单号"
									},{
										field : "lift_equipment_code",
										title : "设备注册代码"
									},{
										field : "lift_equipment_address",
										title : "设备使用地点"
									},{
										field : "emergency_handle_time",
										title : "故障排除时间",
									},{
										field : "maint_name",
										title : "维保人员"
									},{
										field : "maint_phonenum",
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
												return "维修中"
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
		    selector: "#tab_emergency tr",
		    // define the elements of the menu   
		    items: {
		    	detail: {name: "详情", icon: "detail",  callback: function(key, opt){ 
		    		clearAddForm();
		    		searchEmergencyRecordDetail()}},		       
		    	del: {name: "删除", icon: "delete",callback: function(key, opt){ 
		    		doDelete();
			    		   }},
			    		  
						   
	    		 
		    }
		   
		});	
	
	};

	// 得到查询的参数
	
	// 得到查询的参数
	oTableInit.queryParams = function(params) {
		var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			limit : params.limit, // 页面大小
			offset : params.offset // 页码
              
		};
		var vEquipCode = $('#search_equipment_code').val();
		if(vEquipCode&&vEquipCode!=''&&vEquipCode!=null){
			temp['param1']=vEquipCode;
		}
		var vEquipAddress = $('#search_equipment_address').val();
		if(vEquipAddress&&vEquipAddress!=''&&vEquipAddress!=null){
			temp['param2']=vEquipAddress;
		}
		var vEmerTime = $('#search_emergency_time').val();
		if(vEmerTime&&vEmerTime!=''&&vEmerTime!=null){
			temp['param3']=vEmerTime;
		}
		var vEmerStatus = $('#search_emergency_status').val();
		if(vEmerStatus&&vEmerStatus!=''&&vEmerStatus!=null){
			temp['param4']=vEmerStatus;
		}
		return temp;
	};
	return oTableInit;
	
	
	
};


function searchEmergencyRecordDetail() {
	var selectRows = $("#tab_emergency").bootstrapTable("getSelections");
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
	$("#maintUserModal").modal("show");
	var data = new Object();
	data["emergencyId"] = project.emergency_id;
	$.ajax({
		type : "POST", // post提交方式默认是get
		url : "queryEmergencyRecordDetail.do",
		contentType : 'application/json;charset=utf-8',
		data : JSON.stringify(data),
		error : function(request) {
			 (JSON.stringify(request), "", "error"); 
		},
		success : function(result) {
			
			if (result.success) {
				var obj = result.result;
				var emergency_create_time = obj.emergency_create_time;
				if(emergency_create_time!=null){
					var createTime = emergency_create_time.split(" ");
					var createTime1 = createTime[0].split("-");
					$("#detail_create_year").val(createTime1[0]);
					$("#detail_create_month").val(createTime1[1]);
					$("#detail_create_day").val(createTime1[2]);
					var createTime2 = createTime[1].split(":");
					$("#detail_create_hour").val(createTime2[0]);
					$("#detail_create_minute").val(createTime2[1]);
				}
				
				var emergency_arrival_time = obj.emergency_arrival_time;
				if(emergency_arrival_time!=null){
					var arrivalTime = emergency_arrival_time.split(" ");
					var arrivalTime1 = arrivalTime[0].split("-");
					$("#detail_arrival_year").val(arrivalTime1[0]);
					$("#detail_arrival_month").val(arrivalTime1[1]);
					$("#detail_arrival_day").val(arrivalTime1[2]);
					var arrivalTime2 = arrivalTime[1].split(":");
					$("#detail_arrival_hour").val(arrivalTime2[0]);
					$("#detail_arrival_minute").val(arrivalTime2[1]);
				}
				
				var emergency_handle_time = obj.emergency_handle_time;
				if(emergency_handle_time!=null){
					var handleTime = emergency_handle_time.split(" ");
					var handleTime1 = handleTime[0].split("-");
					$("#detail_handle_year").val(handleTime1[0]);
					$("#detail_handle_month").val(handleTime1[1]);
					$("#detail_handle_day").val(handleTime1[2]);
					var handleTime2 = handleTime[1].split(":");
					$("#detail_handle_hour").val(handleTime2[0]);
					$("#detail_handle_minute").val(handleTime2[1]);
				}
				var emergency_fault_nature =  obj.emergency_fault_nature;
				if(emergency_fault_nature!=null){
					if(emergency_fault_nature.indexOf("1")!= -1){
						$("#detail_fault_nature1").prop("checked",true).attr("disabled",true);
					}
					if(emergency_fault_nature.indexOf("2")!= -1){
						$("#detail_fault_nature2").prop("checked",true).attr("disabled",true);
					}
					if(emergency_fault_nature.indexOf("3")!= -1){
						$("#detail_fault_nature3").prop("checked",true).attr("disabled",true);
					}
					if(emergency_fault_nature.indexOf("4")!= -1){
						$("#detail_fault_nature4").prop("checked",true).attr("disabled",true);
					}
					if(emergency_fault_nature.indexOf("5")!= -1){
						$("#detail_fault_nature5").prop("checked",true).attr("disabled",true);
					}
				}
				
				
				var emergency_passengers_situation =  obj.emergency_passengers_situation;
				if(emergency_fault_nature!=null){
					if(emergency_passengers_situation.indexOf("1")!= -1){
						$("#detail_passenger1").prop("checked",true).attr("disabled",true);
					}
					if(emergency_passengers_situation.indexOf("2")!= -1){
						$("#detail_passenger2").prop("checked",true).attr("disabled",true);
					}
					if(emergency_passengers_situation.indexOf("3")!= -1){
						$("#detail_passenger3").prop("checked",true).attr("disabled",true);
					}
					if(emergency_passengers_situation.indexOf("4")!= -1){
						$("#detail_passenger4").prop("checked",true).attr("disabled",true);
					}
				}				
				
				var emergency_fault_ishandle =  obj.emergency_fault_ishandle;
				if(emergency_fault_ishandle!=null){
					if(emergency_fault_ishandle=="0"){
						$("#detail_fault_slove1").prop("checked",true).attr("disabled",true);
					}
					if(emergency_fault_ishandle=="1"){
						$("#detail_fault_slove2").prop("checked",true).attr("disabled",true);
					}
				}
				
				
				$("#detail_use_name").val(obj.use_comp_name);
				$("#detail_equipment_code").val(obj.lift_equipment_code);
				$("#detail_equipment_address").val(obj.lift_equipment_address);
				$("#detail_safe_manager").val(obj.use_comp_security_mgr);
				$("#detail_safe_manager_phone").val(obj.use_comp_security_mgr_phonenum);
				$("#detail_maint_manager").val(obj.maint_staff_name);
				$("#detail_maint_manager_phone").val(obj.maint_staff_phonenum);
				$("#detail_maint_comp").val(obj.maint_comp_name);
				$("#detail_description").val(obj.emergency_fault_description);
				$("#detail_repair_method").val(obj.emergency_repair_method);
				var images="";
				if(obj.imageCount!=null && obj.imageCount!=0){
					for (var i = 0; i < obj.imageCount; i++) {
						images+="<img src='queryEmergencyPhotoes.do?emergencyId="+project.emergency_id+"&imageIndex="+i+"' style='width:40px;height:45px;'/>";
						images+="&nbsp;&nbsp;";
					}
				}
				$(".div_pic").html(images);
				if(obj.emergency_handle_status=='5'){
					var images2="<img src='queryUseCompanySignPhoto.do?useCompCode="+obj.use_comp_code+"' style='width:40px;height:45px;' />";					
					$("#use_sign_photo").html(images2);	
				}
				imgScale();//图片放大缩小

			} else {
				toastr.error(result.msg);
			}
		}
	});

} 
	
function timestampToTime(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '-';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
        h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
        m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
        s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds()) + ' ';
        return Y+M+D+h+m+s;
}

//删除功能
function doDelete(){
	 var selectRows = $("#tab_emergency").bootstrapTable("getSelections");
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
		var emergencyCode="";
		for(var k=0;k<selectRows.length;k++){
			emergencyCode+=selectRows[k].emergency_id+",";
		}
		$("#emergencyIds").val(emergencyCode);
		console.log(emergencyCode);
}
//确认删除
function delConfirm(){
	var emergencyCode = $("#emergencyIds").val();
	$.ajax({
		type : "POST", //post提交方式默认是get
		url : "deleteEmergencyRecordMany.do",
		data : {"emergencyCode" : emergencyCode},
		error : function(request) {
			toastr.error("删除失败！");
		},
		success : function(obj) {
			if(obj.success){
				toastr.success(obj.msg);
				$("#delModal").modal("hide");
				$('#tab_emergency').bootstrapTable('refresh');
				return;
			}else{
				toastr.error(obj.msg);
				return;
			}
		}
	
	});
}
//查询
function refresh(){
	 $('#tab_emergency').bootstrapTable('refreshOptions',{pageNumber:1});
}
//重置查询
function doReset() {
	$("#search_equipment_code").val('');
	$("#search_equipment_address").val('');
	$("#search_emergency_time").val('');
	$("#search_emergency_status").val('');
		
}
//刷新弹框界面
function clearAddForm(){
	$("#addForm")[0].reset();
}

//图片放大缩小功能
function imgScale() {
	var flag = true, // 状态true为正常的状态,false为放大的状态
	imgH, // 图片的高度
	imgW, // 图片的宽度
	img = document.getElementsByTagName('img'); // 图片元素
	imgW = img.width;
	imgH = img.height;
	for (var i = 0; i < img.length; i++) {
		img[i].onclick = function() {
			// 图片点击事件
			if (flag) {
				// 图片为正常状态
				flag = false; // 把状态设为放大状态
				this.style.width = "40px";
				this.style.height = "45px";
				this.style.position = "inherit";
				this.style.bottom = "0px";
				this.style.right = "0px";
				this.style.top = "0px";
				this.style.left = "0px";
			} else {
				// 图片为放大状态,铺满整个屏幕;
				flag = true; // 把状态设为正常状态
				this.style.width = "60%";
				this.style.height = "80%";
				this.style.position = "fixed";
				this.style.bottom = "0%";
				this.style.right = "0%";
				this.style.top = "35%";
				this.style.left = "10%";
			}
		}
	}
}






