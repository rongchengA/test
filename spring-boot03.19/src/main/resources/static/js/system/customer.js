
var Validator = new ChargeValidator();
var TableInit = function() {
	var oTableInit = new Object();
	// 初始化Table
	oTableInit.Init = function() {
		$("#tab_customer").bootstrapTable({
			url : "requestCustomer.do", // 请求后台的URL（*）
			method : "post", // 请求方式（*）
			toolbar : "#toolbar", // 工具按钮用哪个容器
			striped : true, // 是否显示行间隔色
			cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination : true, // 是否显示分页（*）
			sortable : false, // 是否启用排序
			sortOrder : "asc", // 排序方式
			queryParams : oTableInit.queryParams,// 传递参数（*）
			sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
			// pageNumber : 1, // 初始化加载第一页，默认第一页
			pageSize : 10, // 每页的记录行数（*）
			pageList : [ 10, 25, 50, 100 ], // 可供选择的每页的行数（*）

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
				field : "sysUserId",
				title : "ID"
			}, {
				field : "sysUserNumber",
				title : "客户账号"
			}, {
				field : "sysUserCompanyId",
				title : "维保单位id",
					visible : false
			}, {
				field : "sysUserName",
				title : "客户名称"
			}, {
				field : "sysCompName",
				title : "维修保养单位名称",
				visible : false
			},{
				field : "maint_comp_code",
				title : "企业代码",
				visible : false
			}, {
				field : "sysUserContacts",
				title : "联系人"
			}, {
				field : "sysUserPhonenum",
				title : "联系电话"
			}, {
				field : "sysUserAddress",
				title : "详细地址"
			}, {
				field : "sysUserPassword",
				title : "密码",
				visible : false
			}, {
				field : "role_id",
				title : "角色id",
				visible : false
			}, {
				field : "region_id",
				title : "区域id",
				visible : false
			},  {
				field : "sysUserCardno",
				title : "身份证号",
				visible : false
			}, {
				field : "sysUserWeixin",
				title : "微信",
				visible : false
			},{
				field : "regionCenter_address",
				title : "区域中心地址",
				visible : false
			},{
				field : "lift_lat",
				title : "维度",
				visible : false
			},{
				field : "lift_lag",
				title : "经度",
				visible : false
			},{
				field : "sysUserEmail",
				title : "邮件",
				visible : false
			}, {
				field : "sysUserEnable",
				title : "是否启用",
				formatter : function(val, row, index) {
					if (val == '0') {
						return '是';
					}
					if (val == '1') {
						return '否';
					}
					return val;
				}
			}, ]
		});
		$.contextMenu({
		    // define which elements trigger this menu
		    selector: "#tab_customer tr",
		    // define the elements of the menu   
		    items: {
		        add: {name: "新增", icon: "add",  callback: function(key, opt){ 
		        	clearAddForm();
					is_addshow=true;
					$(".area_center").attr("disabled", "disabled").css(
							"background-color", "#DDD");// 区域默认不可下拉					
					// 加载区域名
					getResion(false);
					// 加载角色信息
					getRole(false);
					$("#addCustomerInfoModal").modal("show");}},
		        edit: {name: "修改",icon: "edit", callback: function(key, opt){ 
		        	clearAddForm();
					is_addshow=false;
					var selectRows = $("#tab_customer").bootstrapTable(
							"getSelections");
					if (selectRows == "") {
						bootbox.alert({
							message : "请勾选后在操作!",
							buttons : {
								ok : {
									label : '知道了',
								}
							},
						});
						return;
					}
					if (selectRows.length > 1) {
						bootbox.alert({
							message : "只能勾选一条记录!",
							buttons : {
								ok : {
									label : '知道了',
								}
							},
						});
						return;
					}
					$(".area_center").attr("disabled", "disabled").css(
							"background-color", "#DDD");// 区域默认不可下拉	
					// 获取选中行第一行
					var customor = selectRows[0];
					// 初始化界面数据
					initEditWindowData(customor);
					getResion(true, customor);
					getRole(true, customor);
					// 显示窗口
					$("#editCustomerInfoModal").modal("show");}} ,
		    	del: {name: "删除", icon: "delete",callback: function(key, opt){ 
		    		dodel();
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
		var region = $("#customername").val();
		
		if (region != '' && region != null) {
			temp['param1'] = region;
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
	is_addshow=false;
	var oInit = new Object();
	var postdata = {};
	oInit.Init = function() {
		// 初始化页面上面的按钮事件
		// 新增按钮
		$("#btn_add").click(
				function() {
					clearAddForm();
					is_addshow=true;
					$(".area_center").attr("disabled", "disabled").css(
							"background-color", "#DDD");// 区域默认不可下拉					
					// 加载区域名
					getResion(false);
					// 加载角色信息
					getRole(false);
					$("#addCustomerInfoModal").modal("show");
				});
		// 新增保存按钮
		$("#btn_add_save").click(function() {
			doSave();
		});
		// 修改按钮
		$("#btn_quer").click(
				function() {
					clearAddForm();
					is_addshow=false;
					var selectRows = $("#tab_customer").bootstrapTable(
							"getSelections");
					if (selectRows == "") {
						bootbox.alert({
							message : "请勾选后在操作!",
							buttons : {
								ok : {
									label : '知道了',
								}
							},
						});
						return;
					}
					if (selectRows.length > 1) {
						bootbox.alert({
							message : "只能勾选一条记录!",
							buttons : {
								ok : {
									label : '知道了',
								}
							},
						});
						return;
					}
					$(".area_center").attr("disabled", "disabled").css(
							"background-color", "#DDD");// 区域默认不可下拉	
					// 获取选中行第一行
					var customor = selectRows[0];
					// 初始化界面数据
					initEditWindowData(customor);
					getResion(true, customor);
					getRole(true, customor);
					// 显示窗口
					$("#editCustomerInfoModal").modal("show");

				});
		// 修改保存
		$("#btn_edit_save").click(
				function() {
					var selectRows = $("#tab_customer").bootstrapTable(
					"getSelections");
					var customor = selectRows[0];
					doEdit(customor);
				});
		// 主页面删除功能
		$("#btn_del").click(function() {
			doDeletedel();
		})
		//弹出地图后地址查询
    	$('#btn_gps_addr_search').click(function(){
    		var gps_addr_search=$('#lift_address').val();
    		if(gps_addr_search!=''){
    			elevatorMap.centerAndZoom(gps_addr_search,11); 
    		}
    		var local = new BMap.LocalSearch(elevatorMap, {
    			renderOptions:{map: elevatorMap}
    		});
    		local.search(gps_addr_search);
    		
    	});
    	//弹出地图后坐标确认
    	$('#btn_gps').click(function(){
    		var lng=$('#add_lift_lag').val();
    		var lat=$('#add_lift_lat').val();
    		if(lng==''||lat==''){
    			bootbox.alert({
    			    message: "请点击地图选取坐标后再确认!",
    			    buttons: {
    					   ok: {
    						    label: '知道了',
    					    }
    				},
    			});
    			return;
    		}
    	
    		//将地址填入表单
    		/* var liftAdress=*/
    		var pArr =$('#lift_address').val().split('/');
			if(pArr.length<2){
				toastr.error("请选择完整的省市区!");
				return false;
			}
			if($('#lift_address').val()==''||$('#lift_address').val()==null){
				toastr.error("省市区不能为空!");
				return false;
			}
			$('#window_gps').modal("hide");
			if(is_addshow){
				$("#add_regionCenter_address").val($('#lift_address').val().replace(/\//g,""));
			}else{
				$("#edit_regionCenter_address").val($('#lift_address').val().replace(/\//g,""));
			}
			
    	});
		
		
		
	};
	return oInit;
};

// 新增保存方法
function doSave() {
	var company = new Object();
	var sysUserName=$("#add_sysUserName").val();
	var sysUserContacts=$("#add_sysUserContacts").val();
	var  sysUserAddress =$("#add_sysUserAddress").val();
	if(!Validator.password($("#add_sysUserPassword").val())){
		toastr.error("密码应为6-18位字母或数字!");
		return false;
	}
	if ($("#add_sysUserPassword").val() != $("#addSure_password").val()) {
		toastr.error("确认密码输入不一致，请重新输入!");
		return false;
	}
	if (!Validator.isPhone($("#add_sysUserPhonenum").val())) {
		toastr.error("联系电话输入错误!");
		return false;
	}
	
	
	
	if($("#add_sysUserNumber").val()==null||$("#add_sysUserNumber").val()==""){
		toastr.error("客户账号不能为空!");
		return false;
	}
	if($("#add_sysUserNumber").val().length>16){
		toastr.error("客户账号不能超过16位!");
		return false;
	}
	
	if(sysUserName==null||sysUserName==""){
		toastr.error("客户名称不能为空!");
		return false;
	}
	if(sysUserName.length>16){
		toastr.error("客户名称不能超过16位!");
		return false;
	}
	if($("#add_maint_comp_code").val().length!=10){
		toastr.error("企业代码应为十位!");
		return false;
	}
	if(sysUserContacts==null||sysUserContacts==""){
		toastr.error("联系人不能为空!");
		return false;
	}
	if(sysUserContacts.length>20){
		toastr.error("联系人不能超过20位!");
		return false;
	}
	
	if( sysUserAddress==null||sysUserAddress==""){
		toastr.error("详细地址不能为空!");
		return false;
	}
	if( sysUserAddress.length>40){
		toastr.error("联系人不能超过40位!");
		return false;
	}
	
	
	var roleId = $("#add_role_id").val();
	var regionId = $("#add_region_id").val();
	if (roleId == null || roleId == "") {
		toastr.error("请选择用户角色");
		return false;
	} else {
		if (roleId == '4'||roleId=='5') {
			if (regionId == "" || regionId == null) {
				toastr.error("请选择区域名");
				return false;
			}

		}
		if (roleId == '3') {
			var maintComp = $("#add_maint_comp_code").val();
			if (maintComp == null || maintComp == "") {
				toastr.error("维保管理员角色下企业代码不可为空");
				return false;
			}
		}
	}
	$("[id^='add_']")
			.each(
					function() { // 遍历赋值
						var s = $(this).attr('id').substr(4);
						// 获取选中项
						if (s == 'sysUserEnable') {
							company[s] = $(
									'#add_sysUserEnable input[name="radio_y"]:checked ')
									.val();
						} else {
							company[s] = $(this).val();
						}
					})

	$.ajax({
		type : "POST", // post提交方式默认是get
		url : "saveCustomer.do",
		contentType : 'application/json;charset=utf-8',
		data : JSON.stringify(company),
		error : function(request) {
			toastr.error("保存失败！");
		},
		success : function(obj) {
			if (obj.success) {
				toastr.success(obj.msg);
				refresh();
				$("#addCustomerInfoModal").modal("hide");
			} else {
				toastr.error(obj.msg);
			}
		}

	});

}
//修改保存
function doEdit(customor){
	var company = new Object();
	var sysUserName=$("#edit_sysUserName").val();
	var sysUserContacts=$("#edit_sysUserContacts").val();
	var  sysUserAddress =$("#edit_sysUserAddress").val();
	if( $("#edit_sysUserPassword").val()!="******"&&!Validator.password($("#edit_sysUserPassword").val())){
		toastr.error("密码应为6-18位字母或数字!");
		return false;
	}
	
	if ($("#edit_sysUserPassword").val() != $("#editSure_password").val()) {
		toastr.error("确认密码输入不一致，请重新输入!");
		return false;
	}
	if (!Validator.isPhone($("#edit_sysUserPhonenum").val())) {
		toastr.error("手机号输入错误!");
		return false;
	}
	if($("#edit_sysUserNumber").val()==null||$("#edit_sysUserNumber").val()==""){
		toastr.error("客户账号不能为空!");
		return false;
	}
	if($("#edit_sysUserNumber").val().length>16){
		toastr.error("客户账号不能超过16位!");
		return false;
	}
	
	if(sysUserName==null||sysUserName==""){
		toastr.error("客户名称不能为空!");
		return false;
	}
	if(sysUserName.length>16){
		toastr.error("客户名称不能超过16位!");
		return false;
	}
	if($("#edit_maint_comp_code").val().length!=10){
		toastr.error("企业代码应为十位!");
		return false;
	}
	if(sysUserContacts==null||sysUserContacts==""){
		toastr.error("联系人不能为空!");
		return false;
	}
	if(sysUserContacts.length>20){
		toastr.error("联系人不能超过20位!");
		return false;
	}
	
	if( sysUserAddress==null||sysUserAddress==""){
		toastr.error("详细地址不能为空!");
		return false;
	}
	if( sysUserAddress.length>40){
		toastr.error("联系人不能超过40位!");
		return false;
	}
	
	
	
	
	var roleId = $("#edit_role_id").val();
	var regionId = $("#edit_region_id").val();
	if (roleId == null || roleId == "") {
		toastr.error("请选择用户角色");
		return false;
	} else {
		if (roleId == '4') {
			if (regionId == "" || regionId == null) {
				toastr.error("请选择区域名");
				return false;
			}

		}
		if (roleId == '3') {
			var maintComp = $("#edit_maint_comp_code").val();
			if (maintComp == null || maintComp == "") {
				toastr.error("维保管理员角色下企业代码不可为空");
				return false;
			}
		}
	}
	
	$("[id^='edit_']")
			.each(
					function() { // 遍历赋值
						var s = $(this).attr('id').substr(5);
						// 获取选中项
						if (s == 'sysUserEnable') {
							company[s] = $(
									'#edit_sysUserEnable input[name="radio_y"]:checked ')
									.val();
						} else {
							company[s] = $(this).val();
						}
					})
	company["sysUserId"]=customor.sysUserId;
	company["lift_lag"]=$("#add_lift_lag").val();
	company["lift_lat"]=$("#add_lift_lat").val();

	$.ajax({
		type : "POST", // post提交方式默认是get
		url : "updateCustomer.do",
		contentType : 'application/json;charset=utf-8',
		data : JSON.stringify(company),
		error : function(request) {
			toastr.error("修改失败！");
		},
		success : function(obj) {
			if (obj.success) {
				toastr.success(obj.msg);
				$('#tab_customer').bootstrapTable('refresh');
				$("#editCustomerInfoModal").modal("hide");
			} else {
				toastr.error(obj.msg);
			}
		}

	});
}

// 修改页面加载数据
function initEditWindowData(maintStaff) {
	$("#editSure_password").val("******");
	$("[id^='edit_']").each(function() { // 遍历赋值
		var s = $(this).attr('id').substr(5);
		/* console.debug(project[s]); */
		if (s == "sysUserPassword") { // 隐藏密码
			$(this).val("******");	
		} else {
			if(s=="sysUserEnable"){
				 $("#edit_sysUserEnable input:radio[name=radio_y][value="+maintStaff[s]+"]").attr("checked",true);  
			}else{
				$(this).val(maintStaff[s]);
			}
			
		}

	})
}
// 删除数量
function doDeletedel() {

	var selectRows = $("#tab_customer").bootstrapTable("getSelections");
	if (selectRows == "") {
		bootbox.alert({
			message : "请勾选后在操作!",
			buttons : {
				ok : {
					label : '知道了',
				}
			},
		});
		return;
	}
	// 删除数据的数目
	$('#del_date i').eq(0).text(selectRows.length);
	// 加载模态框
	$("#delModal").modal("show");
	// 确认删除
	$("#btn_delSure").click(function() {
		dodel();
	})
}
// 删除
function dodel() {
	var selectRows = $("#tab_customer").bootstrapTable("getSelections");
	if (selectRows == "") {
		bootbox.alert({
			message : "请勾选后再操作!",
			buttons : {
				ok : {
					label : '知道了',
				}
			},
		});
	}
	var customer = new Array();
	for (var i = 0; i < selectRows.length; i++) {
		customer[i] = selectRows[i]["sysUserId"]
	}
	$.ajax({
		type : "POST", // post提交方式默认是get
		url : "deleteCustomer.do",
		contentType : 'application/json;charset=utf-8',
		data : JSON.stringify(customer),
		success : function(obj) {
			if (obj.success) {
				toastr.success(obj.msg);
				$("#delModal").modal("hide");
				$('#tab_customer').bootstrapTable('refresh');
			} else {
				toastr.error(obj.msg);
			}
		}
	});
}
// 加载区域名
function getResion(isModify, rowData) {
	if (isModify) {
		$("#edit_region_id").empty();
	} else {
		$("#add_region_id").empty();
	}

	$.ajax({
		type : 'POST',
		url : "querySysRegion.do",
		error : function(request) {
			toastr.error(request.msg);
		},
		success : function(obj) {

			var tempAjax = "<option value=''></option>";
			$.each(obj.rows, function(i, data) {
				if (isModify && rowData.region_id == data.region_id) {
					tempAjax += "<option value='" + data.region_id
							+ "' selected='selected'>" + data.region_name
							+ "</option>";
				} else {
					tempAjax += "<option value='" + data.region_id + "' >"
							+ data.region_name + "</option>";
				}
			});

			if (isModify) {
				$("#edit_region_id").append(tempAjax);
			} else {
				$("#add_region_id").append(tempAjax);
			}

		}
	});
}

// 加载角色信息
function getRole(isModify, rowData) {
	if (isModify) {
		$("#edit_role_id").empty();
	} else {
		$("#add_role_id").empty();
	}

	$.ajax({
		type : 'POST',
		url : "querySysrole.do",
		error : function(request) {
			toastr.error(request.msg);
		},
		success : function(obj) {

			var tempAjax = "<option value=''></option>";
			$.each(obj.rows, function(i, data) {
				if (isModify && rowData.role_id == data.role_id) {
					tempAjax += "<option value='" + data.role_id
							+ "' selected='selected'>" + data.role_name
							+ "</option>";
				} else {
					tempAjax += "<option value='" + data.role_id + "' >"
							+ data.role_name + "</option>";
				}
			});
			if (isModify) {
				$("#edit_role_id").append(tempAjax);
			} else {
				$("#add_role_id").append(tempAjax);
			}

		}
	});
}
// 增加修改表单复位
function clearAddForm() {
	$("#addForm")[0].reset();
	$("#editForm")[0].reset();
}

// 刷新方法
function refresh() {
	$("#tab_customer").bootstrapTable('refreshOptions', {
		pageNumber : 1
	})
}



function bindBlur() { // 失去焦点事件
	var projectId;
	$("#add_role_id").bind(
			"change",
			function() {
				$(".area_center").val("");
				projectId = $("#add_role_id").val();
				if (projectId == '4'||projectId == '5') {
					$('#add_region_id').removeAttr("disabled").css(
							"background-color", "#fff");
					if(projectId == '5'){
						$('#add_regionCenter_address').removeAttr("disabled").css(
								"background-color", "#fff");
					}else{
						$('#add_regionCenter_address').removeAttr("disabled").css(
								"background-color", "#DDD");
					}
				} else {
					$("#add_region_id").attr("disabled", "disabled").css(
							"background-color", "#DDD");// 区域默认不可下拉
					$('#add_regionCenter_address').removeAttr("disabled").css(
							"background-color", "#DDD");
				}
			})
	$("#edit_role_id").bind(
			"change",
			function() {
				$(".area_center").val("");
				projectId = $("#edit_role_id").val();
				if (projectId == '4'||projectId == '5') {
					$('#edit_region_id').removeAttr("disabled").css(
							"background-color", "#fff");
					if(projectId == '5'){
						$('#edit_regionCenter_address').removeAttr("disabled").css(
								"background-color", "#fff");
					}else{
						$('#edit_regionCenter_address').removeAttr("disabled").css(
								"background-color", "#DDD");
					}
				} else {
					$("#edit_region_id").attr("disabled", "disabled").css(
							"background-color", "#DDD");// 区域默认不可下拉
					$('#edit_regionCenter_address').removeAttr("disabled").css(
							"background-color", "#DDD");
				}
			})
}

function equalPwd() {
	$('#addSure_password').blur(function() {
		if ($("#add_sysUserPassword").val() != $("#addSure_password").val()) {
			toastr.error("确认密码输入不一致，请重新输入!");
			return false;
		}
	});
	$('#editSure_password').blur(function() {
		if ($("#edit_sysUserPassword").val() != $("#editSure_password").val()) {
			toastr.error("确认密码输入不一致，请重新输入!");
			return false;
		}
	});

	$("#add_sysUserPhonenum").blur(function() {

		if (!Validator.isPhone($("#add_sysUserPhonenum").val())) {
			toastr.error("手机号输入错误!");
			return false;
		}
	})

	$("#edit_sysUserPhonenum").blur(function() {

		if (!Validator.isPhone($("#edit_sysUserPhonenum").val())) {
			toastr.error("手机号输入错误!");
			return false;
		}

	})
}


var elevatorMap;
//初始化地图
function initMap(){
	// 百度地图API功能
	elevatorMap = new BMap.Map("map_div");            // 创建Map实例
	var point = new BMap.Point(116.331398,39.897445); // 创建点坐标
	elevatorMap.centerAndZoom(point,15);                 
	elevatorMap.enableScrollWheelZoom();                 //启用滚轮放大缩小
	elevatorMap.setDefaultCursor("url('bird.cur')"); 
	elevatorMap.addEventListener("click",function(e){
		$('#add_lift_lag').val(e.point.lng);
		$('#add_lift_lat').val(e.point.lat);
		/*$('#add_lng').val(e.point.lng);
		$('#add_lat').val(e.point.lat);
		$('#edit_lng').val(e.point.lng);
		$('#edit_lat').val(e.point.lat);*/
	});
	//根据地址定位
	var cur_main_addr='';
	var cur_detail_addr='';
	if(is_addshow){
		var lng=$('#add_lift_lag').val();
		var lat=$('#add_lift_lat').val();
		if(lng&&lng!=''&&lat&&lat!=''){
			elevatorMap.clearOverlays(); 
			var new_point = new BMap.Point(lng,lat);
			var marker = new BMap.Marker(new_point);  // 创建标注
			elevatorMap.addOverlay(marker);              // 将标注添加到地图中
			elevatorMap.panTo(new_point);
		}else{
		var cur_main_addr=$('#lift_address').val();
		//var cur_detail_addr=$('#detail_lift_address').val();
		
		if(cur_main_addr!=''){
			cityLocate(cur_main_addr);
		}else{
			var geolocation = new BMap.Geolocation();
			geolocation.getCurrentPosition(function(r){
				if(this.getStatus() == BMAP_STATUS_SUCCESS){
					var mk = new BMap.Marker(r.point);
					elevatorMap.addOverlay(mk);
					elevatorMap.panTo(r.point);
				}
				else {
					swal('failed'+this.getStatus(), "", "error");
				}        
			},{enableHighAccuracy: true});
		}
		}
	}else{
		var lng=$('#edit_lng').val();
		var lat=$('#edit_lat').val();
		if(lng&&lng!=''&&lat&&lat!=''){
			elevatorMap.clearOverlays(); 
			var new_point = new BMap.Point(lng,lat);
			var marker = new BMap.Marker(new_point);  // 创建标注
			elevatorMap.addOverlay(marker);              // 将标注添加到地图中
			elevatorMap.panTo(new_point);
		}else{
		var cur_main_addr=$('#edit_detail_address_city').val();
		var cur_detail_addr=$('#edit_detail_address').val();
		
		if(cur_main_addr&&cur_main_addr!=''){
			cityLocate(cur_main_addr,cur_detail_addr);
		}else{
			var geolocation = new BMap.Geolocation();
			geolocation.getCurrentPosition(function(r){
				if(this.getStatus() == BMAP_STATUS_SUCCESS){
					var mk = new BMap.Marker(r.point);
					elevatorMap.addOverlay(mk);
					elevatorMap.panTo(r.point);
				}
				else {
					swal('failed'+this.getStatus(), "", "error");
				}        
			},{enableHighAccuracy: true});
		}
		}
	}
	isMapInited =true;
}


//input框点击事件
function liftAddressClick(){
	 $("#add_regionCenter_address").click(function(){
	  //$('#gps_addr_search').val("");
		 $("#addabsModal").modal("show");
		 $('#lift_address').citypicker(); //初始化省市区
		loadMapScript();
		
	 })
	 
	  $("#edit_regionCenter_address").click(function(){
	  //$('#gps_addr_search').val("");
		 $("#addabsModal").modal("show");
		 $('#lift_address').citypicker(); //初始化省市区
		loadMapScript();
		
	 })
	
}

function loadMapScript(){
	/*if(isMapInited)
		return;*/
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "https://api.map.baidu.com/api?v=2.0&ak=ccVIqNNyj2jgznfYxmmfByNeE4W0SIRj&callback=initMap&s=1";
	document.body.appendChild(script);

}
