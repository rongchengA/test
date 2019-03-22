/**
 * 电梯信息
 */

var TableInit = function() {	
	var oTableInit = new Object();
	// 初始化Table
	oTableInit.Init = function() {
		$("#tab_liftInfo").bootstrapTable(
						{
							url : "queryliftInfoList.do", // 请求后台的URL（*）
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
										field:"lift_id",
										title:"ID"
									},{
										field : "lift_equipment_code",
										title : "设备注册代码"
									},{
										field : "lift_equipment_address",
										title : "设备使用地点",
									},{
										field : "maint_staff_one_num",
										title : "维保责任1",
										visible:false
									},{
										field : "maint_staff_two_num",
										title : "维保责任2",
										visible:false
									},{
										field : "project_name",
										title : "项目名称"
									},{
										field : "project_id",
										title : "项目id",
										visible:false
										
									},{
										field : "lift_equipment_name",
										title : "电梯类型",
										formatter:	function(value,row,index){
											if(value===1){
												return '载货电梯'
											}
											if(value===0){
												return '乘客电梯'
											}
											if(value===2){
												return '医用电梯'
											}
											if(value===3){
												return '观光电梯'
											}
											if(value===4){
												return '杂物电梯'
											}
											return value ;
										}
											
									},{
										field : "manufacture_name",
										title : "制造单位"
									},{
										field : "maint_comp_name",
										title : "维保公司"
									},{
										field : "maint_manager",
										title : "维保负责人"
									},{
										field : "maint_manager_phonenum",
										title : "手机号码"
									},{
										field : "contract_status",
										title : "是否在保",
										formatter:	function(value,row,index){
											return value == '1' ? '是' : '否';
										}
									}
									]
						
						
						
						
						});
		
		
		
		$.contextMenu({
		    // define which elements trigger this menu
		    selector: "#tab_liftInfo tr",
		    // define the elements of the menu   
		    items: {
		        add: {name: "新增", icon: "add",  callback: function(key, opt){ 
		        	clearAddForm();
		    		//加载项目下来框
		    		getProjectList(false);
		    		//加载维保人员下拉框
		    	    getMaintStaff(false);
		    	  //加载维保单位
		    		getMaintList(false);
		    		$("#addLiftInfoModal").modal("show");}},
		        edit: {name: "修改",icon: "edit", callback: function(key, opt){ 
		        	clearAddForm();
		    		var selectRows = $("#tab_liftInfo").bootstrapTable("getSelections");
		    		// 获取选中行第一行
		    		var user = selectRows[0];
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
		    			    message: "只能选择一条数据!",
		    			    buttons: {
		    					   ok: {
		    						    label: '知道了',
		    					    }
		    				},
		    			});
		    			return;
		    		}
		    		//获取选中行第一行
		    		var project = selectRows[0];
		    		//初始化界面数据
		    		initEditWindowData(project);
		    		$("#editLiftInfoModal").modal("show");}} ,
		    	del: {name: "删除", icon: "delete",callback: function(key, opt){ 
		    		doDelete();
			    		   }},
			    		   detail: {name: "详情", icon: "detail",  callback: function(key, opt){ 
			    			   var selectRows = $("#tab_liftInfo").bootstrapTable("getSelections");
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
			    	    		var LiftInfoDetail = selectRows[0];
			    	    		//打开电梯详情
			    	    		queryLisfInfo(LiftInfoDetail);
					    		}},	
			    		   qrcode:{
						    	name: "生成二维码", icon: "erweima2",callback: function(key, opt){
						    		doqrcode();
						    	}
						    },
						    showcode:{
								name: "查看二维码", icon: "paste",callback: function(key, opt){
									showqrcode();
								}
							},
	    		 
		    }
		   
		});
	
	};

	
	// 得到查询的参数
	oTableInit.queryParams = function(params) {
		var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			limit : params.limit, // 页面大小												0io
			offset : params.offset // 页码
              
		};
		var projectName = $('#search_project_name').val();
		if(projectName!='项目名称'&&projectName!=''&&projectName!=null){
			temp['param1']=projectName;
		}	
		var equipment_code = $('#search_lift_equipment_code').val();
		if(equipment_code!='设备注册代码'&&equipment_code!=''&&equipment_code!=null){
			temp['param2']=equipment_code;
		}	
		var use_comp_address = $('#search_use_comp_address').val();
		if(use_comp_address!='使用单位地址'&&use_comp_address!=''&&use_comp_address!=null){
			temp['param3']=use_comp_address;
		}	
		return temp;
	};
	return oTableInit;
	
};

//初始化按钮
var ButtonInit = function () {
	is_addshow=false;
    var oInit = new Object();
    var postdata = {};
    //初始化页面上面的按钮事件
    oInit.Init = function () {
    	is_addshow=true;
    	//打开新增窗口
    	$("#btn_add").click(function(){
    		clearAddForm();
    		//加载项目下来框
    		getProjectList(false);
    		//加载维保人员下拉框
    	  getMaintStaff(false);
    	//加载维保单位
    		getMaintList(false);
    		$("#addLiftInfoModal").modal("show");
    	}); 
           //新增保存  
    	$("#btn_add_save").click(function(){
    		doSave();
    	});
    		
    	//保存并填写下一张
    	$("#btn_nextadd_save").click(function(){
    		saveAndnext();
    	});
    	//弹出地图后地址查询
    	$('#btn_gps_addr_search').click(function(){
    		var gps_addr_search=$('#lift_address').val().replace(/\//g,"")+$('#detail_lift_address').val();//$('#detail_lift_address').val();
    		if(gps_addr_search!=''){
    			elevatorMap.centerAndZoom(gps_addr_search,11); 
    		}
    		var local = new BMap.LocalSearch(elevatorMap, {
    			renderOptions:{map: elevatorMap}
    		});
    		local.search(gps_addr_search);
    		
    	});
    	
    	
    	//修改功能
   $("#btn_edit").click(function(){
    		clearAddForm();
    		is_addshow=false;
    		var selectRows = $("#tab_liftInfo").bootstrapTable("getSelections");
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
    		var project = selectRows[0];
    		//初始化界面数据
    		initEditWindowData(project);
    		//显示窗口
    		$("#editLiftInfoModal").modal("show");
  
    	});
   //修改保存
   $("#btn_edit_save").click(function(){
	   doEditSave();
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
		if($('#detail_lift_address').val()==''||$('#detail_lift_address').val()==null){
			toastr.error("详细地址不能为空!");
			return false;
		}
		$('#window_gps').modal("hide");
		if(is_addshow){
			$("#add_lift_equipment_address").val($('#lift_address').val().replace(/\//g,"")+$('#detail_lift_address').val());
		}else{
			$("#edit_lift_equipment_address").val($('#lift_address').val().replace(/\//g,"")+$('#detail_lift_address').val());
		}
		
	});
    	//详情功能
    	
    	$("#btn_detail").click(function(){
    		var selectRows = $("#tab_liftInfo").bootstrapTable("getSelections");
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
    		var LiftInfoDetail = selectRows[0];
    		//打开电梯详情
    		queryLisfInfo(LiftInfoDetail);
    	})
    };
    
    return oInit;
};


//新增保存功能
function  doSave(){
	var LiftInfoMap=new Object();
	//遍历获取所有input信息
	$("[id^='add_']").each(function (){ //遍历赋值
		var s = $(this).attr('id').substr(4); 
		LiftInfoMap[s]=$(this).val();
		
	})
	if($("#add_maint_staff_one_num").val()==null){
		toastr.error("责任人1不能为空!");
		return false;
	}
	if($("#add_maint_staff_two_num").val()==null){
		toastr.error("责任人1不能为空!");
		return false;
	}
	
	if($("#add_maint_staff_one_num").val()==$("#add_maint_staff_two_num").val()){
		toastr.error("责任人1和责任人2不能为同一人!");
		return false;
	}
	    LiftInfoMap["lift_project_id"]=$("#add_lift_project_id").val();
		LiftInfoMap["lift_lag"]=$("#add_lift_lag").val();
	    LiftInfoMap["lift_lat"]=$("#add_lift_lat").val();
	 $.ajax({
			type : "POST", //post提交方式默认是get
			url : "addliftInfo.do",
			contentType : 'application/json;charset=utf-8',
			data : JSON.stringify(LiftInfoMap),
			error : function(request) {
				toastr.error("保存失败,请重试!");
			},
			success : function(obj) {
				if(obj.success){
					toastr.success(obj.msg);
					refresh();
				}else{
					toastr.error(obj.msg);
				}
			}
		});
	
}

//保存并填写下一张按钮
function saveAndnext(){
	var LiftInfoMap=new Object();
	$("[id^='add_']").each(function (){ //遍历赋值
		var s = $(this).attr('id').substr(4); 
		LiftInfoMap[s]=$(this).val();
		
	})
	
    LiftInfoMap["add_lift_project_id"]=$("#add_lift_project_id").val();
	LiftInfoMap["add_lift_lag"]=$("#add_lift_lag").val();
    LiftInfoMap["add_lift_lat"]=$("#add_lift_lat").val();
 $.ajax({
		type : "POST", //post提交方式默认是get
		url : "addliftInfo.do",
		contentType : 'application/json;charset=utf-8',
		data : JSON.stringify(LiftInfoMap),
		error : function(request) {
			toastr.error("保存失败,请重试!");
		},
		success : function(obj) {
			if(obj.success){
				toastr.success(obj.msg);
				refresh();
				$("[id^='add_']").each(function (){ //遍历赋值
					var s = $(this).attr('id').substr(4); 
					var str=$(this).prop("class");
					if(str!=""&&str!=null){
						if(str.search(/notReset/)==-1){
							$(this).val("");
						}
					}
				})
				
			}else{
				toastr.error(obj.msg);
			}
		}
	});
	
}
//修改保存功能
function doEditSave(){
	var LiftInfoMap=new Object();
	$("[id^='edit_']").each(function (){ //遍历赋值
		var s = $(this).attr('id').substr(5); 
		LiftInfoMap[s]=$(this).val();
		
	})
	if($("#edit_maint_staff_one_num").val()==null){
		toastr.error("责任人1不能为空!");
		return false;
	}
	if($("#edit_maint_staff_two_num").val()==null){
		toastr.error("责任人1不能为空!");
		return false;
	}
	
	if($("#edit_maint_staff_one_num").val()==$("#edit_maint_staff_two_num").val()){
		toastr.error("责任人1和责任人2不能为同一人!");
		return false;
	}
    LiftInfoMap["lift_project_id"]=$("#edit_lift_project_id").val();
	LiftInfoMap["lift_lag"]=$("#add_lift_lag").val();
    LiftInfoMap["lift_lat"]=$("#add_lift_lat").val();
    
    $.ajax({
		type : "POST", //post提交方式默认是get
		url : "editliftInfo.do",
		contentType : 'application/json;charset=utf-8',
		data : JSON.stringify(LiftInfoMap),
		error : function(request) {
			toastr.error("修改失败,请重试!");
		},
		success : function(obj) {
			if(obj.success){
				toastr.success(obj.msg);
				$('#tab_liftInfo').bootstrapTable('refresh');
				$("#editLiftInfoModal").modal("hide");
				
			}else{
				toastr.error(obj.msg);
			}
		}
	});
    
    
}

//初始化修改表单
function initEditWindowData(project){
	//加载项目信息
	getProjectList(true,project);
	//加载责任人
	getMaintStaff(true, project);
	//加载维保单位
	getMaintList(true, project);
	//加载所有电梯信息并显示到界面
	 $.ajax({
			type : "POST", //post提交方式默认是get
			url : "queryAllLiftInfo.do",
			async:false,
			data : {
				"lift_equipment_code":project.lift_equipment_code
			},
			error : function(request) {
				toastr.error("连接服务器失败,请重试!");
			},
			success : function(obj) {
				if(obj.success){
					
					$("[id^='edit_']").each(function (){ //遍历赋值
						var s = $(this).attr('id').substr(5); 
						if(s=='lift_equipment_type'){
							
						}else{
							$(this).val(obj.rows[s]);
						}
						
					})
					
				
					
					
				}else{
					toastr.error(obj.msg);
				}
			}
		});
}


//删除功能
function doDelete() {
	var selectRows = $("#tab_liftInfo").bootstrapTable("getSelections");
	if (selectRows == "") {
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
	// 删除数据的数目
	$('#del_date i').eq(0).text(selectRows.length);
	// 加载模态框
	$("#delModal").modal("show");
	// 确认删除
	$("#btn_delSure").click(function() {
		var maintStaff = new Array();
		for (var i = 0; i < selectRows.length; i++) {
			maintStaff[i] = selectRows[i]["lift_id"]
		}
		$.ajax({
			type : "POST", // post提交方式默认是get
			url : "deleteliftInfoManage.do",
			contentType : 'application/json;charset=utf-8',
			data : JSON.stringify(maintStaff),
			error : function(request) {
				toastr.error("删除失败！");
			},
			success : function(obj) {
				if (obj.success) {
					/* toastr.success("数据删除成功！"); */
					toastr.success(obj.msg);
					$("#delModal").modal("hide");
					$('#tab_liftInfo').bootstrapTable('refresh');
				}else{
					toastr.error(obj.msg);
				}
			}

		});
	})
}



//搜索条件下拉实现
function getLiftSearchParams(){
	var projectNames=new Array(); //项目名称
	var equipmentCodes=new Array() ;//设备注册代码
	var compAddress=new Array();//使用单位代码
	/*var LiftRows=${}*/
	 $.ajax({
			type : "POST", //post提交方式默认是get
			url : "getLiftSearchParams.do",
			error : function(request) {
				toastr.error("获取搜索框数据失败!");
			},
			success : function(obj) {
				if(obj.success){
					$.each(obj.rows,function(i,data){
						projectNames.push(data.project_name);
						equipmentCodes.push(data.lift_equipment_code);
						compAddress.push(data.use_comp_address);
					})	
				}else{
					toastr.error("获取搜索框数据失败");
				}
					
				 
			}
		});

	$( "#search_project_name" ).autocomplete({
	      source: projectNames
	    });
	$( "#search_lift_equipment_code" ).autocomplete({
	      source: equipmentCodes
	    });
	$( "#search_use_comp_address" ).autocomplete({
	      source: compAddress
	    });
}

//查询项目并放到相应弹框
function getProjectList(isModify,rowData){
	if(isModify){
		$("#edit_lift_project_id").empty();
	}else{
		$("#add_lift_project_id").empty();
	}	
	$.ajax({
		type : 'POST',
		url : "queryLiftProjectList.do",
		error : function(request) {
			toastr.error(request.msg);
		},
		success : function(obj) {
			
			var	tempAjax="<option value=''></option>";/**/
			$.each(obj.rows,function(i,data){
				if(isModify&&rowData.project_id==data.project_id){
					tempAjax += "<option value='"+data.project_id+"'  selected='selected'>"+data.project_name+"</option>";
				}else{
					tempAjax += "<option value='"+data.project_id+"' >"+data.project_name+"</option>";
				}
			});
			if(isModify){
				$("#edit_lift_project_id").append(tempAjax);
			}else{
				$("#add_lift_project_id").append(tempAjax);
			}	
			//$("#add_lift_project_id").append(tempAjax);
		}
	});
}

//查询
function refresh(){
	 $('#tab_liftInfo').bootstrapTable('refreshOptions',{pageNumber:1});
}
//重置查询
function doReset() {
	$("[id^='search']").each(function(){
		$(this).val('');
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
  		var cur_detail_addr=$('#detail_lift_address').val();
  		console.debug(cur_main_addr);
  		console.debug(cur_detail_addr);
  		
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

function bindBlur(){                        //项目 输入框失去焦点事件
	var projectId;	
	$("#add_lift_project_id").bind("change",function(){
		projectId=$("#add_lift_project_id").val();	
		autoUseAndMaintCompany(false,projectId);
	})
	$("#edit_lift_project_id").bind("change",function(){
		projectId=$("#edit_lift_project_id").val();	
		autoUseAndMaintCompany(true,projectId);
	})
	
	var maintCompName;	
	$("#add_maint_comp_id").bind("change",function(){
		maintId=$("#add_maint_comp_id").val();	
		queryMaintCompanyCode(false,maintId);
	})
	$("#edit_maint_comp_id").bind("change",function(){
		maintId=$("#edit_maint_comp_id").val();	
		queryMaintCompanyCode(true,maintId);
	})
	
}

//选择维修保养单位后自动更换维保公司代码
function queryMaintCompanyCode(isModify,maintId){
	var vdata=Object();
	vdata["maintId"]=maintId;
	$.ajax({
		type : 'post',
		async: true, 
		data:JSON.stringify(vdata),
		contentType : "application/json;charset=utf-8",
		url : "queryMaintCompanyCode.do",
		error : function(request) {
			toastr.error("连接数据库失败!");
		},
		success : function(obj) {
			
			for(var key in  obj["rows"] ){
				if(isModify){
					 $("#edit_"+key).val(obj["rows"][key]);
				}else{
					 $("#add_"+key).val(obj["rows"][key]);	
				}
				
			}
				
			
				
				
		}
	});
}
//选择项目后生成使用单位和维保公司
function autoUseAndMaintCompany(isModify,projectId){
	var vdata=Object();
	vdata["projectId"]=projectId;
	$.ajax({
		type : 'post',
		async: true, 
		data:JSON.stringify(vdata),
		contentType : "application/json;charset=utf-8",
		url : "queryAutoUseAndMaint.do",
		error : function(request) {
			toastr.error("连接数据库失败!");
		},
		success : function(obj) {
			for(var key in  obj["rows"] ){
				if(isModify){
					 $("#edit_"+key).val(obj["rows"][key]);
				}else{
					 $("#add_"+key).val(obj["rows"][key]);	
				}
				
			}
				
				
		}
	});
}


var isMapInited =false;
//异步加载地图
function loadMapScript(){
	/*if(isMapInited)
		return;*/
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "https://api.map.baidu.com/api?v=2.0&ak=ccVIqNNyj2jgznfYxmmfByNeE4W0SIRj&callback=initMap&s=1";
	document.body.appendChild(script);

}

//地图解析
function cityLocate( cur_main_addr, cur_detail_addr){
	var cityAddr = cur_main_addr;
	if(cityAddr&&cityAddr!=''){
		var pArr =cityAddr.split('/');
		var addr = cur_detail_addr;
		var detailAddr;
		var cur_city;
		if(pArr.length==3){
			detailAddr = pArr[0]+pArr[1]+pArr[2];
			cur_city=pArr[1];
		}else if(pArr.length==2){
			detailAddr = pArr[0]+pArr[1];
			cur_city=pArr[1];
		}else{
			detailAddr=pArr[0];
			cur_city=pArr[0];
		}
		if(addr&&addr!=''){
			detailAddr=detailAddr+addr;
			// 创建地址解析器实例
			var myGeo = new BMap.Geocoder();
			// 将地址解析结果显示在地图上,并调整地图视野
			myGeo.getPoint(detailAddr, function(point){
				if (point) {
					elevatorMap.centerAndZoom(point, 16);
					elevatorMap.addOverlay(new BMap.Marker(point));
				}else{
					swal("电梯地址没有解析到结果!", "", "error");
				}
			}, cur_city);
		}else{
			elevatorMap.centerAndZoom(cur_city,11);  
		}
	}
}
//查询维保责任人
function getMaintStaff(isModify, rowData) {
	if(isModify){
		$("#edit_maint_staff_one_num").empty();
		$("#edit_maint_staff_two_num").empty();
	}else{
		$("#add_maint_staff_one_num").empty();
		$("#add_maint_staff_two_num").empty();
	}
	var staffnum = null;
	$.ajax({
		type : 'POST',
		url : "getMaintStaff.do",
		async : false,
		error : function(request) {
			toastr.error("连接数据库失败!");
		},
		success : function(obj) {
			var tempAjax = "<option value=''></option>";
			var tempAjax2 = "<option value=''></option>";
			$.each(obj.rows, function(i, data) {
				if (isModify && rowData.maint_staff_one_num == data.maint_staff_number) {
					tempAjax += "<option value='" + data.maint_staff_number
							+ "'selected='selected'>" + data.maint_staff_name
							+ "</option>";
				} else {
					tempAjax += "<option value='" + data.maint_staff_number+ "' >"
							+ data.maint_staff_name + "</option>";
				}
				//维保责任人2
			if (isModify && rowData.maint_staff_two_num == data.maint_staff_number) {
				tempAjax2 += "<option value='" +  data.maint_staff_number
						+ "'selected='selected'>" +data.maint_staff_name
						+ "</option>";
			} else {
				tempAjax2 += "<option value='" + data.maint_staff_number + "' >"
						+data.maint_staff_name+ "</option>";
			}
		});			
			if (isModify) {
				$("#edit_maint_staff_one_num").append(tempAjax);
				$("#edit_maint_staff_two_num").append(tempAjax2);
			} else {
				$("#add_maint_staff_one_num").append(tempAjax);
				$("#add_maint_staff_two_num").append(tempAjax2);
			}

		}
	})

	return staffnum;
}
//查询维修保养单位并放到相应弹框
function getMaintList(isModify,rowData){
	if(isModify){
		$("#edit_maint_comp_id").empty();
	}else{
		$("#add_maint_comp_id").empty();
	}	
	$.ajax({
		type : 'POST',
		url : "getMaintcompany.do",
		error : function(request) {
			toastr.error(request.msg);
		},
		success : function(obj) {			
			var	tempAjax="<option value=''></option>";/**/
			$.each(obj.rows,function(i,data){
				if(isModify&&rowData.maint_id==data.maint_comp_id){
					tempAjax += "<option value='"+data.maint_id+"'  selected='selected'>"+data.maint_comp_name+"</option>";
				}else{
					tempAjax += "<option value='"+data.maint_id+"' >"+data.maint_comp_name+"</option>";
				}
			});
			if(isModify){
				$("#edit_maint_comp_id").append(tempAjax);
			}else{
				$("#add_maint_comp_id").append(tempAjax);
			}	
			//$("#add_lift_project_id").append(tempAjax);
		}
	});
}

//生成二维码
function doqrcode() {
	var selectRows = $("#tab_liftInfo").bootstrapTable("getSelections");
	
	if (selectRows.length > 1) {
		toastr.error("只能选择一条电梯信息");
		return;
	}
	if (selectRows.length == 0) {
		toastr.error("请选择一条电梯信息");
		return;
	}
		var company={} 
		company["lift_equipment_code"]=selectRows[0]["lift_equipment_code"];
		$.ajax({
			type : "POST", //post提交方式默认是get
			url : "setQrCode.do",
			contentType : 'application/json;charset=utf-8',
			data : JSON.stringify(company),
			error : function(request) {
				toastr.error("二维码生成失败", "","error");
			},
			success : function(obj) {
				console.log(obj)
				if(obj.success){
					toastr.success(obj.msg, "","success");
				}else{
					toastr.error(obj.msg, "","error");
				}
			}
		});
	
}


//查看二维码
function showqrcode() {
	 $("#img").empty();
	var selectRows = $("#tab_liftInfo").bootstrapTable("getSelections");
	var lift_equipment_code=selectRows[0].lift_equipment_code;
	if(selectRows==""){
		swal("请勾选后在操作！", "", "error");
		return;
	}
	 $("#img").append('<p class="p_close" onclick="close_img()" style="float:right;padding-right:6px; font-size:22px;cursor:pointer;">×</p><span style="margin-top: 8px;display: block; margin-left: 7px;">'+lift_equipment_code+'</span>');
	 var imgSecond = "queryElevatorCodeByUrl.do?param2="+lift_equipment_code;
	 $("#img").append('<img src="'+imgSecond+'" alt="当前二维码不存在，请生成二维码，在查看！" style="width: 200px;height:200px;margin-right:5px; "></img>');
	 $("#img").show();
}

function close_img(){
	$("#img").empty();
}



//详情按钮
function queryLisfInfo(LiftInfo){
	var company=LiftInfo.lift_equipment_code;	
		window.open("/dtms/liftInfoMsg.do?dt_code="+company);
	

}



//input框点击事件
 function liftAddressClick(){
	 //新增
	 $("#add_lift_equipment_address").click(function(){
			$('#gps_addr_search').val("");
		 $("#addabsModal").modal("show");
		 $('#lift_address').citypicker(); //初始化省市区
		 loadMapScript();
		
	 })
	//修改
	  $("#edit_lift_equipment_address").click(function(){
			$('#gps_addr_search').val("");
		 $("#addabsModal").modal("show");
		 $('#lift_address').citypicker(); //初始化省市区
		 loadMapScript();
		
	 })
 }
 
 

//模态框拖动功能
$( ".modal-content").draggable({
	handle: ".modal-header", // 只能点击头部拖动
	cursor: "move" ,
	axis: "x"   //x轴移动


});
//清空弹框
function clearAddForm(){
	$("#addForm")[0].reset();
	/*$("#editForm")[0].reset();*/
}

