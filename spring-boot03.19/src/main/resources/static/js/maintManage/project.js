/**
 * 项目管理
 */
var Validator = new ChargeValidator();
var TableInit = function() {	
	var oTableInit = new Object();
	// 初始化Table
	oTableInit.Init = function() {
		$("#tab_project").bootstrapTable(
						{
							url : "queryProjectList.do", // 请求后台的URL（*）
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
							/*showToggle:true,*///详细信息显示
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
										field:"project_id",
										title:"ID"
									},{
										field : "project_code",
										title : "项目编号"
									},{
										field : "project_name",
										title : "项目名称"
									},{
										field : "use_comp_name",
										title : "使用单位"
									},{
										field : "use_comp_address",
										title : "使用单位地址"
									},{
										field : "use_comp_security_mgr",
										title : "安全管理人员"
									},{
										field : "use_comp_security_mgr_phonenum",
										title : "联系电话"
									},{
										field : "contract_status",
										title : "合同状态",
										formatter:	function(value,row,index){
											return value == '1' ? '有效' : '过期';
										}
									},{
										field : "project_begin_time",
										title : "开始时间"	,
										visible:false
									},{
										field : "project_end_time",
										title : "结束时间"	,
										visible:false
									},{
										field : "maint_comp_code",
										title : "维保单位代码"	,
										visible:false
									},{
										field : "project_create_time",
										title : "项目创建时间"	,
										visible:false
									},{
										field : "use_comp_security_dep",
										title : "安全管理部门"	,
										visible:false
									},{
										field : "use_comp_postcode",
										title : "使用单位邮编",
										visible:false
									},{
										field : "use_comp_app_account",
										title : "安全员app账号"	,
										visible:false
									},{
										field : "use_comp_app_password",
										title : "安全员app密码"	,
										formatter:	function(value,row,index){
											return  "******";
										},
										visible:false
									},{
										field : "maint_comp_id",
										title : "维保公司id"	,
										visible:false
									},{
										field : "use_comp_id",
										title : "使用单位id"	,
										visible:false
									}
									],
									formatNoMatches: function(){
								        return "没有相关的匹配结果";
								    },

						});
		$.contextMenu({
		    // define which elements trigger this menu
		    selector: "#tab_project tr",
		    // define the elements of the menu   
		    items: {
		        add: {name: "新增", icon: "add",  callback: function(key, opt){ 
		        	clearAddForm();
		        	getMaintcompany(false);
		    		$("#addProjectModal").modal("show");}},
		        edit: {name: "修改",icon: "edit", callback: function(key, opt){ 
		        	clearAddForm();
		    		var selectRows = $("#tab_project").bootstrapTable("getSelections");
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
		    		//加载图片
		    		initeditImage(project)
		    		//初始化界面数据
		    		initEditWindowData(project);
		    		getMaintcompany(true,project);
		    		$("#ProjectModal").modal("show");}} ,
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
		var vMaintEnCode = $('#search_userCompany_code').val();
		if(vMaintEnCode&&vMaintEnCode!=''&&vMaintEnCode!=null){
			temp['param1']=vMaintEnCode;
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
var ButtonInit = function () {
    var oInit = new Object();
    var postdata = {};
    //初始化页面上面的按钮事件
    oInit.Init = function () {
    /*	$("#btn_search").click(function(){
    		refresh();
    	});*/
    	//打开新增窗口
    	$("#btn_add").click(function(){
    		clearAddForm();
    		$(".userPhotoImg").attr('src',"img/plus.png"); 
    		getMaintcompany(false);
    		$("#addProjectModal").modal("show");
    	}); 
    	//新增保存  
    	$("#btn_add_save").click(function(){
    		doSave();
    	});
    	
    	//修改功能
    	$("#btn_edit").click(function(){
    		clearAddForm();
    		
    		
    		var selectRows = $("#tab_project").bootstrapTable("getSelections");
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
    			    message: "只能勾选一条!",
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
    		//加载图片
    		initeditImage(project)
    		//初始化界面数据
    		initEditWindowData(project);
    		getMaintcompany(true,project);
    		

    		//显示窗口
    		/*$("#editrojectModal").modal("show");*/
    		$("#ProjectModal").modal("show");
    	});
    	
    	//修改保存
    	$("#btn_edit_save").click(function(){
    		var selectRows = $("#tab_project").bootstrapTable("getSelections");
    		var project = selectRows[0];
    		doEdit(project);
    	});
    	
    	//删除
    	$("#btn_del").click(function(){
    		doDelete();
    	});
    	//条件查询
    	$("#btn_search").click(function(){
    		refresh();
    	});
    	
    };
    
    
    return oInit;
};

//新增保存方法(此方式费时但容易理解。)
function doSave(){
	var project_code=$("#add_project_code").val();
	var project_name=$("#add_project_name").val();
	var use_comp_name=$("#add_use_comp_name").val();
	var use_comp_code=$("#add_use_comp_code").val();
	var use_comp_address=$("#add_use_comp_address").val();
	var use_comp_postcode=$("#add_use_comp_postcode").val();
	var use_comp_security_dep=$("#add_use_comp_security_dep").val();
	var use_comp_security_mgr_phonenum=$("#add_use_comp_security_mgr_phonenum").val();
	var use_comp_security_mgr=$("#add_use_comp_security_mgr").val();
	var project_start_date=$("#add_project_start_date").val();
	var project_end_date=$("#add_project_end_date").val();
	var use_comp_app_account=$("#add_use_comp_app_account").val();
	var use_comp_app_password=$("#add_use_comp_app_password").val();
	var maint_comp_id=$("#add_maint_comp_id").val();
	if(project_code==null||project_code==""){
		toastr.error("项目编号不能为空!");
		return false;
	}
	if(project_code.length>32){
		toastr.error("项目编号不能超过20位!");
		return false;
	}
	
	if(project_name==null||project_name==""){
		toastr.error("项目名称不能为空!");
		return false;
	}
	
	if(project_name.length>32){
		toastr.error("项目名称不能超过32位!");
		return false;
	}
	if(use_comp_name==null||use_comp_name==""){
		toastr.error("使用单位名称不能为空!");
		return false;
	}
	
	if(use_comp_name>32){
		toastr.error("使用单位名称不能超过32位!");
		return false;
	}
	
	
	if(use_comp_code==null||use_comp_code==""){
		toastr.error("使用单位代码不能为空!");
		return false;
	}
	if(use_comp_code.length!=10){
		toastr.error("使用单位代码输出错误，应为10位数!");
		return false;
	}
	if (!Validator.postcode($("#add_use_comp_postcode").val())) {
		toastr.error("邮政编码输入错误!");
		return false;
	}
	if(use_comp_security_dep==null||use_comp_security_dep==""){
		toastr.error("安全管理部门不能为空!");
		return false;
	}
	if(use_comp_security_dep.length>=32){
		toastr.error("安全管理部门名称不能超过32位!");
		return false;
	}
	
	if(use_comp_security_mgr==null||use_comp_security_mgr==""){
		toastr.error("安全管理人员不能为空!");
		return false;
	}
	if(use_comp_security_mgr.length>=32){
		toastr.error("安全管理人员名称不能超过32位!");
		return false;
	}	
	
	
	if (!Validator.isPhone($("#add_use_comp_security_mgr_phonenum").val())) {
		toastr.error("手机号输入错误!");
		return false;
	}
   if(project_start_date>=project_end_date) {
	   toastr.error("项目结束时间应大于项目开始时间!");
		return false;
   }
   if (!Validator.password($("#add_use_comp_app_password").val())) {
		toastr.error(" 密码 应为 6-16位字符!");
		return false;
	}
	
	//对于表格拆分多表（数据库）有多种方式，此处在js端实现
	var projectInfo=new Object();
	projectInfo["projectCode"]=project_code;
	projectInfo["projectName"]=project_name;
	projectInfo["useCompCode"]=use_comp_code;
	projectInfo["projectBeginTime"]=project_start_date;
	projectInfo["projectEndTime"]=project_end_date;
	projectInfo["maintCompId"]=maint_comp_id;
	
	
	var useCompany=new Object();
	useCompany["useCompName"]=use_comp_name;
	useCompany["useCompCode"]=use_comp_code;
	useCompany["useCompAddress"]=use_comp_address;
	useCompany["useCompPostcode"]=use_comp_postcode;
	useCompany["useCompSecurityDep"]=use_comp_security_dep;
	useCompany["useCompSecurityMgrPhonenum"]=use_comp_security_mgr_phonenum;
	useCompany["useCompSecurityMgr"]=use_comp_security_mgr;
	useCompany["useCompAppAccount"]=use_comp_app_account;
	useCompany["useCompAppPassword"]=use_comp_app_password;
	//map 转json
	projectInfoJson=JSON.stringify(projectInfo);
	useCompanyJson=JSON.stringify(useCompany);
	//新增图片的保存
	ajaxProjectPhotoUpload(use_comp_code + "-projectPhoto",
	'add_projectFile');// 签名图片
	 $.ajax({
			type : "POST", //post提交方式默认是get
			url : "addProjectManage.do",
			data :{
				"projectInfo":projectInfoJson,
				"useCompany":useCompanyJson
			},
		
			error : function(request) {
				toastr.error("保存失败,请重试!");
			},
			success : function(obj) {
				if(obj.success){
					$("#addProjectModal").modal("hide");
					toastr.success(obj.msg);
				
					refresh();
				  }else{
					  toastr.error(obj.msg);
				}
			}
		});
	
	
} 
//修改保存方法
function doEdit(project){
	var project_code=$("#edit_project_code").val();
	var project_name=$("#edit_project_name").val();
	var use_comp_name=$("#edit_use_comp_name").val();
	var use_comp_code=$("#edit_use_comp_code").val();
	var use_comp_address=$("#edit_use_comp_address").val();
	var use_comp_postcode=$("#edit_use_comp_postcode").val();
	var use_comp_security_dep=$("#edit_use_comp_security_dep").val();
	var use_comp_security_mgr_phonenum=$("#edit_use_comp_security_mgr_phonenum").val();
	var use_comp_security_mgr=$("#edit_use_comp_security_mgr").val();
	var project_start_date=$("#edit_project_begin_time").val();
	var project_end_date=$("#edit_project_end_time").val();
	var use_comp_app_account=$("#edit_use_comp_app_account").val();
	var use_comp_app_password=$("#edit_use_comp_app_password").val();
	var maint_comp_id=$("#edit_maint_comp_id").val();
	
	
	if(project_code==null||project_name==""){
		toastr.error("项目编号不能为空!");
		return false;
	}
	if(project_code.length>32){
		toastr.error("项目编号不能超过20位!");
		return false;
	}
	
	if(project_name==null||project_name==""){
		toastr.error("项目名称不能为空!");
		return false;
	}
	
	if(project_name.length>32){
		toastr.error("项目名称不能超过32位!");
		return false;
	}
	if(use_comp_name==null||use_comp_name==""){
		toastr.error("使用单位名称不能为空!");
		return false;
	}
	if(use_comp_name.length>32){
		toastr.error("使用单位名称不能超过32位!");
		return false;
	}
	
	if(use_comp_code==null||use_comp_code==""){
		toastr.error("使用单位代码不能为空!");
		return false;
	}
	if(use_comp_code.length!=10){
		toastr.error("使用单位代码输出错误，应为10位数!");
		return false;
	}
	
	if (!Validator.postcode($("#edit_use_comp_postcode").val())) {
		toastr.error("邮政编码输入错误!");
		return false;
	}
	
	if(use_comp_security_dep==null||use_comp_security_dep==""){
		toastr.error("安全管理部门不能为空!");
		return false;
	}
	if(use_comp_security_dep.length>=32){
		toastr.error("安全管理部门名称不能超过32位!");
		return false;
	}
	

	if(use_comp_security_mgr==null||use_comp_security_mgr==""){
		toastr.error("安全管理人员不能为空!");
		return false;
	}
	if(use_comp_security_mgr.length>=32){
		toastr.error("安全管理人员名称不能超过32位!");
		return false;
	}	
	if (!Validator.isPhone($("#edit_use_comp_security_mgr_phonenum").val())) {
		toastr.error("手机号输入错误!");
		return false;
	}
   if(project_start_date>=project_end_date) {
	   toastr.error("项目结束时间应大于项目开始时间!");
		return false;
   }
   if (!Validator.password($("#edit_use_comp_app_password").val())&&!$("#edit_use_comp_app_password").val()=="******") {
		toastr.error(" 密码 应为 6-16位字符!");
		return false;
	}
	//对于表格拆分多表（数据库）有多种方式，此处在js端实现
	var projectInfo=new Object();
	projectInfo["projectId"]=project["project_id"];
	projectInfo["projectCode"]=project_code;
	projectInfo["projectName"]=project_name;
	projectInfo["useCompCode"]=use_comp_code;
	projectInfo["projectBeginTime"]=project_start_date;
	projectInfo["projectEndTime"]=project_end_date;
	projectInfo["maintCompId"]=maint_comp_id;
	
	var useCompany=new Object();
	useCompany["useCompId"]=project["use_comp_id"];
	useCompany["useCompName"]=use_comp_name;
	useCompany["useCompCode"]=use_comp_code;
	useCompany["useCompAddress"]=use_comp_address;
	useCompany["useCompPostcode"]=use_comp_postcode;
	useCompany["useCompSecurityDep"]=use_comp_security_dep;
	useCompany["useCompSecurityMgrPhonenum"]=use_comp_security_mgr_phonenum;
	useCompany["useCompSecurityMgr"]=use_comp_security_mgr;
	useCompany["useCompAppAccount"]=use_comp_app_account;
	useCompany["useCompAppPassword"]=use_comp_app_password;
	//map转json
	projectInfoJson=JSON.stringify(projectInfo);
	useCompanyJson=JSON.stringify(useCompany);
	//修改保存图片
	ajaxProjectPhotoUpload(use_comp_code + "-projectPhoto",
	'edit_projectFile');// 签名图片
 $.ajax({
			type : "POST", //post提交方式默认是get
			url : "editProjectManage.do",
			data :{
				"projectInfo":projectInfoJson,
				"useCompany":useCompanyJson
			},
		
			error : function(request) {
				toastr.error("修改失败,请重试!");
			},
			success : function(obj) {
				if(obj.success){
					toastr.success(obj.msg);
					$("#ProjectModal").modal("hide");
					$('#tab_project').bootstrapTable('refresh');
				  }else{
					  toastr.error(obj.msg);
				}
			}
		});
	
	
	
}
//删除功能
 function doDelete(){
	 var selectRows = $("#tab_project").bootstrapTable("getSelections");
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
		//删除数据的数目
		$('#del_date i').eq(0).text(selectRows.length);
		//加载模态框
		$("#delModal").modal("show");
		//确认删除
		 $("#btn_delSure").click(function(){
			 var projectArray=new Array();
			 var useCompanyArray=new Array();
			 for(var i=0;i<selectRows.length;i++){
				 projectArray[i]=selectRows[i]["project_id"];
				 useCompanyArray[i]=selectRows[i]["use_comp_id"];
			 }
					/*var company =selectRows;*/
			 var projectManage={};
			 projectManage["projectArray"]=projectArray;
			 projectManage["useCompanyArray"]=useCompanyArray;
					$.ajax({
						type : "POST", //post提交方式默认是get
						url : "deleteProjectManage.do",
						contentType : 'application/json;charset=utf-8',
						data :JSON.stringify(projectManage),
						error : function(request) {
							toastr.error("删除失败！");
						},
						success : function(obj) {
							if(obj.success){
								/*toastr.success("数据删除成功！");*/
								toastr.success(obj.msg);
								$("#delModal").modal("hide");
								$('#tab_project').bootstrapTable('refresh');
							}
						}
					
				});
		 }
)
 }

//查询
function refresh(){
	 $('#tab_project').bootstrapTable('refreshOptions',{pageNumber:1});
}
//重置查询
function doReset() {
	$("#search_userCompany_code").val('');
		
}
//初始化修改页面数据
function initEditWindowData(project){
	$("[id^='edit_']").each(function (){ //遍历赋值
		var s = $(this).attr('id').substr(5); 
		/*console.debug(project[s]);*/
		if(s=="use_comp_app_password"){ //隐藏密码
			$(this).val("******");
		}else{
			$(this).val(project[s]);
		}
		
	})
}

//刷新弹框界面
function clearAddForm(){
	$("#addForm")[0].reset();
	$("#editForm")[0].reset();
}

//获取使用单位列表 (查询)
function getUseCompanyEnList(){
	$("#search_userCompany_code").empty();
	$.ajax({
		type : 'POST', 
		url : "queryUseCompanyList.do",
		error : function(request) {
			toastr.error("获取使用单位失败！");
		},
		success : function(obj) {
			var tempAjax="<option value='' >请选择使用单位</option>";
			$.each(obj.rows,function(i,data){
				tempAjax += "<option value='"+data.use_comp_code+"' >"+data.use_comp_name+"</option>";
			});
			$("#search_userCompany_code").append(tempAjax);
		}
	});
}
function phonecopy(){
	$("#add_use_comp_security_mgr_phonenum").blur(
			function() {

				if (!Validator.isPhone($("#add_use_comp_security_mgr_phonenum").val())) {
					toastr.error("手机号输入错误!");
					return false;
				} else {
					$("#add_use_comp_app_account").val(
							$("#add_use_comp_security_mgr_phonenum").val());
				}

			})
			
			$("#edit_use_comp_security_mgr_phonenum").blur(
			function() {

				if (!Validator.isPhone($("#edit_use_comp_security_mgr_phonenum").val())) {
					toastr.error("手机号输入错误!");
					return false;
				} else {
					$("#edit_use_comp_app_account").val(
							$("#edit_use_comp_security_mgr_phonenum").val());
				}

			})
}

//获取维保单位列表
function getMaintcompany(isModify, rowData) {
	var staffnum = null;
	if(isModify){
		$("#edit_maint_comp_id").empty();
	}else{
		$("#add_maint_comp_id").empty();
	}
	$.ajax({
		type : 'POST',
		url : "getMaintcompany.do",
		async : false,
		error : function(request) {
			toastr.error("连接数据库失败!");
		},
		success : function(obj) {
			var tempAjax = "<option value=''></option>";
			
			if(obj.rows.length==1){
				tempAjax="";
			}
			$.each(obj.rows, function(i, data) {
				if (isModify && rowData.maint_comp_id == data.maint_id) {
					tempAjax += "<option value='" + data.maint_id
							+ "'selected='selected'>" + data.maint_comp_name
							+ "</option>";
				} else {
				
					tempAjax += "<option value='" + data.maint_id + "' >"
							+ data.maint_comp_name + "</option>";
				}
			});
			if (isModify) {
				$("#edit_maint_comp_id").append(tempAjax);
			} else {
				
					$("#add_maint_comp_id").append(tempAjax);	
			
				
			}

		}
	})

	return staffnum;
}

//证书图片上传
function ajaxProjectPhotoUpload(userCode, typeId) {

	$.ajaxFileUpload({
		url : "uploadProjectAutoPhoto.do",// 需要链接到服务器地址
		secureuri : false,// 是否启用安全提交，默认为false
		fileElementId : typeId,// 文件选择框的id属性，即<input type="file">的id
		type : 'POST',
		data : {
			'userCode' : userCode
		},
		error : function(request) {
			toastr.error("上传照片失败！" + request.msg);
		},
		success : function(obj) {
		}
	});
}
//本地预览
function PreviewImage(imgFile, imgId) {

	var filextension = imgFile.value.substring(imgFile.value.lastIndexOf("."),
			imgFile.value.length);
	filextension = filextension.toLowerCase();
	var imagSize = imgFile.files[0].size;
	userPhotoName = imgFile.files[0].name;
	if (imagSize > 1024 * 1024 * 3) {
		toastr.error("图片大小不能超过3M！");
		return;
	}
	if ((filextension != '.jpg') && (filextension != '.gif')
			&& (filextension != '.jpeg') && (filextension != '.png')
			&& (filextension != '.bmp')) {
		toastr.error("对不起，系统仅支持标准格式的照片(jpg,gif,jpeg,png,bmp)，请您调整格式后重新上传，谢谢 !");
		imgFile.focus();
	} else {
		var path;
		if (document.all)// IE
		{
			imgFile.select();
			path = document.selection.createRange().text;
			document.getElementById(imgId).innerHTML = "";
			document.getElementById(imgId).style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='scale',src=\""
					+ path + "\")";// 使用滤镜效果
		} else if (window.webkitURL != undefined) { // webkit or chrome
			var iurl = window.webkitURL.createObjectURL(imgFile.files[0]);
			$('#' + imgId).hide().attr('src', iurl).fadeIn();
		} else// FF
		{
			path = window.URL.createObjectURL(imgFile.files[0]);// FF 7.0以上
			$('#' + imgId).hide().attr('src', path).fadeIn();
		}
	}
	photoChanged = true;
}
//加载图片
function initeditImage(project) {
	var imageNameList = new Array();
	imageNameList.push("edit_projectPhoto");
	for (var i = 0; i < imageNameList.length; i++) {// 获取图片放到对应位置
		var imgSecond = "getProjectphoto.do?imgNameStr=" + imageNameList[i]
				+ "&staffNum=" + project["use_comp_code"];
		var imgStr = "#" + imageNameList[i] + "Img";
		$(imgStr).attr('src', imgSecond);
	}

}
//模态框头部拖动功能
/*$( ".modal-content").draggable({
	handle: ".modal-header", // 只能点击头部拖动
	cursor: "move",
	containment: "parent"
	

	
});*/
/*$( ".modal-content").draggable({
	handle: ".modal-header", // 只能点击头部拖动
	cursor: "move" ,
	axis: "x"


});*/

/*$( "#delModal").draggable({
	handle: ".modal-header", // 只能点击头部拖动
	cursor: "move"
	
});*/
//防止滚动条被拖动（根据页面需求添加此句）
/*$( "#addProjectModal" ).css("overflow", "hidden"); 
$( "#ProjectModal" ).css("overflow", "hidden"); */



