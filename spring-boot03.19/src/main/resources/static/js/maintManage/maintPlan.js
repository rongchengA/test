/**
 * 维保计划
 */

var Validator = new ChargeValidator();
var TableInit = function() {
	var oTableInit = new Object();
	// 初始化Table
	oTableInit.Init = function() {
		$("#tab_maintPlan").bootstrapTable({
			url : "queryMaintPlanList.do", // 请求后台的URL（*）
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
				checkbox : true
			}, {
				field : "orderId",
				title : "ID",
				visible:false
			}, {
				field : "orderNumber",
				title : "工单编号",
			}, {
				field : "equipmentCode",
				title : "设备注册代码"
			}, {
				field : "useCompName",
				title : "使用单位"
			}, {
				field : "projectName",
				title : "项目名称"
			}, {
				field : "orderMaintType",
				title : "保养类型"

			}, {
				field : "orderPlanDate",
				title : "计划维保日期"

			},{
				field : "orderActualDate",
				title : "实际维保日期"

			},{
				field : "maintOneName",
				title : "维保责任人"

			},{
				field : "maintStaffPhonenum",
				title : "手机号码"
			},{
				field : "liftEquipmentAddress",
				title : "设备使用地点"	,
				visible:false
			},{
				field : "maintStaffWorkStatus",
				title : "责任人状态",
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
			},{
				field : "orderClientEvaluation",
				title : "评价星级"	,
				visible:false
			}
			
			]
		});
		$.contextMenu({
		    // define which elements trigger this menu
		    selector: "#tab_maintPlan tr",
		    // define the elements of the menu   
		    items: {
		    	detail: {name: "详情", icon: "detail",  callback: function(key, opt){ 
		    		var selectRows = $("#tab_maintPlan").bootstrapTable("getSelections");
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
		    		//判断是否是已完成
		    		if(maintPlanDetail.orderActualDate==null){
		    			bootbox.alert({
		    			    message: "只能查看已维保记录的详情信息!",
		    			    buttons: {
		    					   ok: {
		    						    label: '知道了',
		    					    }
		    				},
		    			});
		    			return;
		    		}
		    		//加载数据
		    		initMaintPlan(maintPlanDetail);
		    		//加载图片
		    		intiMaintPhoto(maintPlanDetail.orderId);
		    		//打开页面
		    		$("#planModal").modal("show");
		    	}},		       	 
		    }
		   
		});	
	};

	// 得到查询的参数
	oTableInit.queryParams = function(params) {
		var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			limit : params.limit, // 页面大小
			offset : params.offset
		// 页码

		};

		var maint_status = $('#search_maint_status').val();
		if (maint_status != "" &&  maint_status != null) {
			temp['param1'] = maint_status;
		}
		var orderNumber = $('#search_maint_orderNumber').val();
		if (orderNumber != "工单编号" && orderNumber != ''
				&&orderNumber != null) {
			temp['param2'] = orderNumber;
		}
		var maintName = $('#search_maint_oneName').val();
		if (maintName != "维保责任人" && maintName != ''
				&& maintName!= null) {
			temp['param3'] = maintName;
		}
		var mequimentCode= $('#search_equiment_code').val();
		if (mequimentCode != "设备注册代码" &&mequimentCode != ''
				&& mequimentCode != null) {
			temp['param4'] = mequimentCode;
		}
		return temp;
	};

	return oTableInit;

};
/*******************************************************************************/
var ButtonInit = function() {
	var oInit = new Object();
	var postdata = {};
	// 初始化页面上面的按钮事件
	oInit.Init = function() {

		//详情按钮
    	$("#btn_detail").click(function(){
    		var selectRows = $("#tab_maintPlan").bootstrapTable("getSelections");
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
    		//判断是否是已完成
    		if(maintPlanDetail.orderActualDate==null){
    			bootbox.alert({
    			    message: "只能查看已维保记录的详情信息!",
    			    buttons: {
    					   ok: {
    						    label: '知道了',
    					    }
    				},
    			});
    			return;
    		}
    		//加载数据
    		initMaintPlan(maintPlanDetail);
    		//加载图片
    		intiMaintPhoto(maintPlanDetail.orderId);
    		//打开页面
    		$("#planModal").modal("show");
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
	$("[id^='detail_']").each(
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
		
	}
	$(".label_prise").append(tempAjax);
			
	var orderId=maintPlanDetail.orderId;
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
				
					tempAjax +="<li><p>"+data+"</p><div class='checkbox checkbox-primary'><input id='checkbox"+i+"' checked='checked' class='styled' type='checkbox' disabled='disabled' > <label for='checkbox"+i+"'> </label></div></li>";	
				}else{
					tempAjax +="<li><p>"+data+"</p><div class='checkbox checkbox-primary'><input id='checkbox"+i+"' class='styled' type='checkbox'   disabled='disabled' >  <label for='checkbox"+i+"'   > </label></div></li>";	

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



//查询
function refresh() {
	$('#tab_maintPlan').bootstrapTable('refreshOptions', {
		pageNumber : 1
	});
}
// 重置查询
function doReset() {
	$("input[id^='search']").each(function() {
		$(this).val("");
	})
 
}