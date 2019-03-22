/**
 * 超时信息
 */
 var TableInit = function() {	
	var oTableInit = new Object();
	// 初始化Table
	oTableInit.Init = function() {
		$("#tab_timeoutMsg").bootstrapTable(
						{
							url : "queryTimeoutMsg.do", // 请求后台的URL（*）
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
										field:"work_detail_id",
										title:"ID",
										visible : false
									},{
										field : "use_comp_name",
										title : "使用单位"
									},{
										field : "lift_equipment_code",
										title : "设备注册代码"
									},{
										field : "equipment_address",
										title : "设备使用地点"
									},{
										field : "type_work",
										title : "工单类型",
										formatter:	function(value,row,index){
											if(value == '0'){
												return "维保"
											}
											if(value == '1'){
												return "急修"
											}																					
										}
									},{
										field : "maint_comp_name",
										title : "维保单位",
									},{
										field : "maint_staff_name",
										title : "维保责任人"
									},{
										field : "maint_staff_phonenum",
										title : "电话"
									},{
										field : "timeout",
										title : "超时",										
										formatter : function (value, row, index) {
											return ["<p style='color:red'>已超时</p>"];
							            }
									}
									]
						});
		$.contextMenu({
		    // define which elements trigger this menu
		    selector: "#tab_timeoutMsg tr",
		    // define the elements of the menu   
		    items: {
		    	detail: {name: "详情", icon: "detail",  callback: function(key, opt){ 
		    		var selectRows = $("#tab_timeoutMsg").bootstrapTable("getSelections");
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
		    		//获取选中行第一行
		    		var maintPlanDetail = selectRows[0];   		
		    		
		    		if(maintPlanDetail.type_work=="0"){
		    			//加载数据
		        		initMaintPlan(maintPlanDetail);
		        		//加载图片
		        		intiMaintPhoto(maintPlanDetail.work_detail_id);
		        		//打开页面
		        		$("#planModal").modal("show");
		    		}else{
		    			initemergency(maintPlanDetail);
		    			$("#maintUserModal").modal("show");
		    		}
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
		var vEmerTime = $('#search_use_compy').val();
		if(vEmerTime&&vEmerTime!=''&&vEmerTime!=null){
			temp['param3']=vEmerTime;
		}
		var vEmerStatus = $('#search_maint_compy').val();
		if(vEmerStatus&&vEmerStatus!=''&&vEmerStatus!=null){
			temp['param4']=vEmerStatus;
		}
		var vTimeoutStatus = $('#search_timeout_status').val();
		if(vTimeoutStatus!="全部"&&vTimeoutStatus!=''&&vTimeoutStatus!=null){
			temp['param5']=vTimeoutStatus;
		}
     
		return temp;
	};
	return oTableInit;
};
var ButtonInit = function() {
	var oInit = new Object();
	var postdata = {};
	// 初始化页面上面的按钮事件
	oInit.Init = function() {

		//详情按钮
    	$("#btn_detail").click(function(){
    		var selectRows = $("#tab_timeoutMsg").bootstrapTable("getSelections");
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
    		//获取选中行第一行
    		var maintPlanDetail = selectRows[0];   		
    		
    		if(maintPlanDetail.type_work=="0"){
    			//加载数据
        		initMaintPlan(maintPlanDetail);
        		//加载图片
        		intiMaintPhoto(maintPlanDetail.work_detail_id);
        		//打开页面
        		$("#planModal").modal("show");
    		}else{
    			initemergency(maintPlanDetail);
    			$("#maintUserModal").modal("show");
    		}
    		
    	});


	};

	return oInit;
};


//加载维保图片
function  intiMaintPhoto(orderId){
	$("#maint_before").empty();
	$("#maint_affter").empty();
	$.ajax({
		type : "POST", //post提交方式默认是get
		url : "queryMaintPhotoById.do",
		data : {
			"orderId":orderId
		},
		error : function(request) {
			toastr.error("服务器连接异常，错误代码002");
		},
		success : function(obj) {
			var	imageAffterAjax="<p>维保前照片</p>";
			var	imageBeforeAjax="<p>维保后照片</p>";
			for(var i=0;i<obj.beforeNum;i++){
				imageBeforeAjax+=" <img alt='' class='span_pic1' id='cs' src='MaintBeforePhotos.do?order_id="+orderId+"&imageIndexBefore="+i+"'> "
			}
			for(var i=0;i<obj.affterNum;i++){
				imageAffterAjax+="<img alt='' class='span_pic1' src='appMaintAffterPhotos.do?order_id="+orderId+"&imageIndex="+i+"' >"
			}
			
			$("#maint_before").append(imageBeforeAjax);
			$("#maint_affter").append(imageAffterAjax);
			imgScale();//图片放大缩小
		}
	});
	
	}


//初始化模板信息
function initMaintPlan(maintPlanDetail){
	$(".label_prise").empty();
	/*$("[id^='detail_']").each(
			function() {
				var s = $(this).attr('id').substr(7);
				$(this).val(maintPlanDetail[s]);
			})
			 var tempAjax="<p>评价:</p>";
	for(var i=0;i<5;i++){
		if(i<maintPlanDetail.orderClientEvaluation){
			tempAjax+="<span class='span_star'></span>";
		}else{
			tempAjax+="<span></span>";
		}
		
	}*/
	
	var orderId=maintPlanDetail.work_detail_id;
	
	$.ajax({          //加载维保基础信息
		type : "POST", //post提交方式默认是get
		url : "queryMaintPlanBasics.do",
		data : {
			"orderId":orderId
		},
		error : function(request) {
			toastr.error("服务器连接异常，错误代码002");
		},
		success : function(obj) {
			$("[id^='detail_']").each(
					function() {
						var s = $(this).attr('id').substr(7);
						$(this).val(obj.rows[s]);
					})
					 var tempAjax="<p>评价:</p>";
			for(var i=0;i<5;i++){
				if(i<obj.rows.orderClientEvaluation){
					tempAjax+="<span class='span_star'></span>";
				}else{
					tempAjax+="<span></span>";
				}
			
		}
			$(".label_prise").append(tempAjax);	
		}
	});
	
	
			
	/*var orderId=maintPlanDetail.work_detail_id;*/
	$.ajax({
		type : "POST", //post提交方式默认是get
		url : "queryMaintPlanMoudel.do",
		data : {
			"orderId":orderId
		},
		error : function(request) {
			toastr.error("服务器连接异常，错误代码002");
		},
		success : function(obj) {
			var	tempAjax="";
			$.each(obj.moudelDetail,function(i,data){
				
				if(obj.moudelCompelet[i]==1){
				
					tempAjax +="<li><p>"+data+"</p><div class='checkbox checkbox-primary'><input id='checkbox"+i+"' checked='checked' class='styled' type='checkbox' disabled='disabled'> <label for='checkbox"+i+"'> </label></div></li>";	
				}else{
					tempAjax +="<li><p>"+data+"</p><div class='checkbox checkbox-primary'><input id='checkbox"+i+"' class='styled' type='checkbox' disabled='disabled' > <label for='checkbox"+i+"'> </label></div></li>";	

				}
	
			});
			$("#modelDetail").append(tempAjax);
			
		}
	});
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
				this.style.width = "112px";
				this.style.height = "100px";
				this.style.position = "inherit";
				this.style.bottom = "0px";
				this.style.right = "0px";
				this.style.top = "0px";
				this.style.left = "0px";
			} else {
				// 图片为放大状态,铺满整个屏幕;
				flag = true; // 把状态设为正常状态
				this.style.width = "80%";
				this.style.height = "50%";
				this.style.position = "fixed";
				this.style.bottom = "0%";
				this.style.right = "0%";
				this.style.top = "35%";
				this.style.left = "10%";
			}
		}
	}
}
function initemergency(project){
	var data = new Object();
	data["emergencyId"] = project.work_detail_id;
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
					var images2="<img src='queryUseCompanySignPhoto.do?useCompCode="+obj.use_comp_code+"' style='width:40px;height:45px;'/>";					
					$("#use_sign_photo").html(images2);	
				}
			} else {
				toastr.error(result.msg);
			}
		}
	});

}

  

//查询
function refresh() {
	$('#tab_timeoutMsg').bootstrapTable('refreshOptions', {
		pageNumber : 1
	});
}
// 重置查询
function doReset() {
	$("[id^='search']").each(function() {
		$(this).val("");
	})
}