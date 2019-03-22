/**
 * 评价信息
 */
var isupload = false;
var  region_id;//全局变量，当点击弹出修改框时 返回一个当前修改的id值
//维保查询
var TableInit = function() {
	var oTableInit = new Object();
	// 初始化Table
	oTableInit.Init = function() {
		$("#tab_priseMsg").bootstrapTable('destroy');
		$("#tab_priseMsg").bootstrapTable({
			url : "priseMsgRequestPing.do", // 请求后台的URL（*）
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
			pageSize : 5, // 每页的记录行数（*）
			pageList : [ 10, 25, 50, 100 ], // 可供选择的每页的行数（*）

			minimumCountColumns : 2, // 最少允许的列数
			clickToSelect : true, // 是否启用点击选中行
			height : $(window).height(), // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
			uniqueId : "ID", //每一行的唯一标识，一般为主键列
			// showToggle:true, //是否显示详细视图和列表视图的切换按钮
			// cardView: false, //是否显示详细视图
			detailView : false, //是否 显示父子表
			columns : [ {
				checkbox : true
			}, {
				field : "orderId",
				title : "ID",
				visible:false
			}, {
				field : "useCompName",
				title : "使用单位"
			}, {
				field : "equipmentCode",
				title : "设备注册代码"
			},{
				field : "liftEquipmentAddress",
				title : "设备使用地点"
				
			},{
				field:"category",
				title : "工单类型",
					formatter : function(value, row, index) {
						return "维保"
					}
			},{
				field : "maintcompName",
				title : "维保单位"

			},{
				field : "maintOneName",
				title : "维保责任人"

			},{
				field : "useCompSecurityMgr",
				title : "评分人"
			}, {
				field : "maintStaffPhonenum",
				title : "电话"

			}, {
				field : "orderClientEvaluation",
				title : "采纳率",
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
			}]
		});
		
	};
	// 得到查询的参数
	oTableInit.queryParams = function(params) {
		var temp = { // 这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
			limit : params.limit, // 页面大小
			offset : params.offset
		// 页码
		};
		var regionRepair = $("#use_comp_name").val();
		if (regionRepair != "" &&  regionRepair != null) {
			temp['param1'] = regionRepair;
		}
		
		var regionRepair2 = $("#maintcomp_name").val();
		if (regionRepair2 != '' && regionRepair2 != null) {
			temp['param2'] = regionRepair2;
		}
		
		var regionRepair3 = $("#equipment_code").val();
		if (regionRepair3 != "" &&  regionRepair3 != null) {
			temp['param3'] = regionRepair3;
		}
		var regionRepair4 = $("#lift_equipment_address").val();
		if (regionRepair4 != "" &&  regionRepair4 != null) {
			temp['param4'] = regionRepair4;
		}
		return temp;
	};
	return oTableInit;
};

//急修查询
var oTableRepair = function() {
	var oTableInitRepair = new Object();
	// 初始化Table
	oTableInitRepair.Init = function() {
		$("#tab_priseMsg").bootstrapTable('destroy');
		$("#tab_priseMsg").bootstrapTable({
			url : "RepairRequestPing.do", // 请求后台的URL（*）
			method : "post", // 请求方式（*）
			toolbar : "#toolbar", // 工具按钮用哪个容器
			striped : true, // 是否显示行间隔色
			cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination : true, // 是否显示分页（*）
			sortable : false, // 是否启用排序
			sortOrder : "asc", // 排序方式
			queryParams : oTableInitRepair.queryParams,// 传递参数（*）
			sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
			//pageNumber : 1, // 初始化加载第一页，默认第一页
			pageSize : 5, // 每页的记录行数（*）
			pageList : [ 10, 25, 50, 100 ], // 可供选择的每页的行数（*）

			minimumCountColumns : 2, // 最少允许的列数
			clickToSelect : true, // 是否启用点击选中行
			height : $(window).height(), // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
			uniqueId : "ID", //每一行的唯一标识，一般为主键列
			// showToggle:true, //是否显示详细视图和列表视图的切换按钮
			// cardView: false, //是否显示详细视图
			detailView : false, //是否 显示父子表
			columns : [{
				checkbox : true
			}, {
				field : "emergencyId",
				title : "ID",
				visible:false
			},{
				field : "useCompName",
				title : "使用单位"
			}, {
				field : "liftEquipmentCode",
				title : "设备注册代码"
			},{
				field : "liftEquipmentAddress",
				title : "设备使用地点"
				
			},{
				field:"category",
				title : "工单类型",
					formatter : function(value, row, index) {
						return "急修"
					}
			},{
				field : "maintCompName",
				title : "维保单位"

			},{
				field : "maintManager",
				title : "维保责任人"

			},{
				field : "useCompSecurityMgr",
				title : "评价人"

			},{
				field : "maintManagerPhonenum",
				title : "电话"

			}, {
				field : "emergencyEvaluateSatisfactionDegree",
				title : "采纳率",
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
			}]
		});

	};
	// 得到查询的参数
	oTableInitRepair.queryParams = function(params) {
		var temp = { // 这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
			limit : params.limit, // 页面大小
			offset : params.offset
		// 页码

		};
		var regionRepair = $("#use_comp_name").val();
		if (regionRepair != "" &&  regionRepair != null) {
			temp['param1'] = regionRepair;
		}
		
		var regionRepair2 = $("#maintcomp_name").val();
		if (regionRepair2 != '' && regionRepair2 != null) {
			temp['param2'] = regionRepair2;
		}
		
		var regionRepair3 = $("#equipment_code").val();
		if (regionRepair3 != "" &&  regionRepair3 != null) {
			temp['param3'] = regionRepair3;
		}
		var regionRepair4 = $("#lift_equipment_address").val();
		if (regionRepair4 != "" &&  regionRepair4 != null) {
			temp['param4'] = regionRepair4;
		}
		return temp;
	};
	return oTableInitRepair;
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
		$("#quer_notice").click(function(){
			
			refresh();
		})
         $("#btn_add").click(function(){
        	clearKnowledge();
 			queryuser();
 			uuid();
			$("#addModal").modal("show");
		})
		//新增保存
		$("#knowledge_servation").click(function(){
			save();
			
		})
		//条件查询复位
		$("#Refresh_notice").click(function(){
			
			clearUpForm();
		})
		// 主页面删除功能
		$("#btn_del").click(function(){
			doDeletedel();
		})
		//修改保存
		$("#upsevnkno").click(function(){
			upSvenKnowledge();
		})
		
	};
	return oInit;
};


//刷新方法
function refresh() {
	$("#tab_priseMsg").bootstrapTable('refreshOptions',{pageNumber:1})
}
//条件查询归位
function ClearZero(){
	$("#use_comp_name").val("");
	$("#maintcomp_name").val("");
	$("#equipment_code").val("");
	$("#lift_equipment_address").val("");
	
}
//急修查询详情数据清空
function  clearpriseMsg(){
	$("#jixiuname").val("")
	$("#jixiucoke").val("")
	$("#jixiudanhao").val("")
	$("#jixiudidian").val("")
	$("#jixiufankui").val("")
}
//维保查询详情数据清空
function  clearpriseMaintenance(){
	$("#weibaogongdan").val("")
	$("#weibaoshij").val("")
	$("#weibaotype").val("")
	$("#weibaodaima").val("")
	$("#weibaodidian").val("")
	$("#weibaoren").val("")
	$("#weibaokehu").val("")
}
function   btnquery(){
	//查看详情
		var selectData = $("#tab_priseMsg").bootstrapTable('getSelections');
		if (selectData.length == 0) {
			bootbox.alert({
			    message: "请勾选要查看的数据!",
			    buttons: {
					   ok: {
						    label: '知道了',
					    }
				},
			});
			return;
		}
		if(selectData.length > 1){
			bootbox.alert({
			    message: "只能勾选一条!",
			    buttons: {
					   ok: {
						    label: '知道了',
					    }
				},
			});
			return;
		}else{
		    if (selectData[0].category==0) {
			    clearpriseMsg();
			    //急修详情的回现
			    DetailsRepair();
				$("#repairModal").modal("show");
		       }if(selectData[0].category==1) {
		    	clearpriseMaintenance();
		    	//维保详情数据回现
		    	
		    	DetailsMaintenance();
		    	//图片加载
		    	intiMaintPhoto(selectData[0].orderId);
	 			$("#priseModal").modal("show");
		    }
			return;
		}
}
//急修数据回现
function  DetailsRepair(){
	var selectData = $("#tab_priseMsg").bootstrapTable('getSelections');
	var selectDataOne = selectData[0];
	$("#jixiuname").val(selectDataOne.maintManager)
	$("#jixiucoke").val(selectDataOne.liftEquipmentCode)
	$("#jixiudanhao").val(selectDataOne.emergencyNumber)
	$("#jixiudidian").val(selectDataOne.liftEquipmentAddress)
	$("#jixiufankui").val(selectDataOne.emergencyFeedbackSuggestion)
	var  Degree=selectDataOne.emergencyEvaluateSatisfactionDegree;
	 if(Degree=='0'){
		 
		     $("#Degreeimg").html('<img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" >') 
		   }
		   if (Degree=='1') {
			   
			   $("#Degreeimg").html('<img  src="img/bright_star.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" >') 
		   }
		   if (Degree=='2') {
			   
			   $("#Degreeimg").html('<img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" >');	
	      	}
		   if (Degree=='3') {
			   $("#Degreeimg").html('<img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" >');	
	      	}
		   if (Degree=='4') {
			   
			   $("#Degreeimg").html('<img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star_kong.png" >');	
	      	}
		   if (Degree=='5') {
			   
			   $("#Degreeimg").html('<img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star.png" >');	
	      	}
}
//维保详情数据回现 
function  DetailsMaintenance(){
	var selectData = $("#tab_priseMsg").bootstrapTable('getSelections');
	var selectDataOne = selectData[0];
	$("#weibaogongdan").val(selectDataOne.orderNumber)
	$("#weibaoshij").val(selectDataOne.orderActualDate) 
	$("#weibaotype").val(selectDataOne.orderMaintType)
	$("#weibaodaima").val(selectDataOne.equipmentCode)
	$("#weibaodidian").val(selectDataOne.liftEquipmentAddress)
	$("#weibaoren").val(selectDataOne.maintOneName)
	$("#weibaokehu").val(selectDataOne.useCompName)
	
	var  Number =selectDataOne.orderClientEvaluation;
	if(Number=='0'){
		 
	     $("#Maintenanceimg").html('<img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" >') 
	   }
	   if (Number=='1') {
		   
		   $("#Maintenanceimg").html('<img  src="img/bright_star.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" >') 
	   }
	   if (Number=='2') {
		   
		   $("#Maintenanceimg").html('<img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" >');	
     	}
	   if (Number=='3') {
		   $("#Maintenanceimg").html('<img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star_kong.png" ><img  src="img/bright_star_kong.png" >');	
     	}
	   if (Number=='4') {
		   
		   $("#Maintenanceimg").html('<img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star_kong.png" >');	
     	}
	   if (Number=='5') {
		   
		   $("#Maintenanceimg").html('<img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star.png" ><img  src="img/bright_star.png" >');	
     	}
	//维保资料查询
	var  orderId=selectDataOne.orderId;
	$.ajax({
		type : "POST", //post提交方式默认是get
		url : "queryMaintPlanMoudel.do",
		data : {
			"orderId":orderId
		},
		error : function(request) {
			toastr.error("服务器不存在该记录的维保资料！");
		},
		success : function(obj) {
			var	tempAjax="";
			$.each(obj.moudelDetail,function(i,data){
				if(obj.moudelCompelet[i]==1){
					tempAjax +="<li><p>"+data+"</p><div class='checkbox checkbox-primary'><input id='checkbox"+i+"' checked='checked' class='styled' type='checkbox'> <label for='checkbox"+i+"'> </label></div></li>";	
				}else{
					tempAjax +="<li><p>"+data+"</p><div class='checkbox checkbox-primary'><input id='checkbox"+i+"' class='styled' type='checkbox'> <label for='checkbox"+i+"'> </label></div></li>";	

				}
				
				
			});
			$("#modelDetail").append(tempAjax);
			
		}
	});

}
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
				imageBeforeAjax+=" <img alt='' class='span_pic1' id='cs' src='MaintBeforePhotos.do?order_id="+orderId+"&imageIndex="+i+"'> "
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
