/**
 * 维保人员
 * 
 */
var Validator = new ChargeValidator();
var TableInit = function() {
	var oTableInit = new Object();
	// 初始化Table
	oTableInit.Init = function() {
		$("#tab_maintStaff").bootstrapTable({
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
			height : $(window).height(), // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
			uniqueId : "ID", // 每一行的唯一标识，一般为主键列
			// showToggle:true, //是否显示详细视图和列表视图的切换按钮
			// cardView: false, //是否显示详细视图
			detailView : false, // 是否显示父子表
			columns : [ {
				checkbox : true
			}, {
				field : "maint_staff_id",
				title : "ID"
			}, {
				field : "maint_staff_number",
				title : "平台编码",
				visible : false
			}, {
				field : "maint_staff_name",
				title : "姓名"
			}, {
				field : "maint_staff_cardno",
				title : "身份证号"
			}, {
				field : "maint_staff_certificate_number",
				title : "资格证书号"
			}, {
				field : "maint_staff_phonenum",
				title : "联系电话"
			}, {
				field : "staff_contract_status",
				title : "合同状态",
				formatter : function(value, row, index) {
					return value == '1' ? '有效' : '过期';
				}

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
			}, {
				field : "maint_staff_email",
				title : "电子邮箱",
			}, {
				field : "maint_staff_speciality",
				title : "特长",
			}, {
				field : "staff_contract_startdate",
				title : "合同开始时间",
				visible : false
			}, {
				field : "staff_contract_enddate",
				title : "合同结束时间",
				visible : false
			}, {
				field : "maint_staff_app_account",
				title : "维保人员app账号",
				visible : false
			}, {
				field : "maint_staff_app_password",
				title : "维保人员app密码",
				formatter : function(value, row, index) {
					return "******";
				},
				visible : false
			}, {
				field : "maint_company_id",
				title : "维保人员id",
				visible : false
			}

			]
		});
		$.contextMenu({
		    // define which elements trigger this menu
		    selector: "#tab_maintStaff tr",
		    // define the elements of the menu   
		    items: {
		        add: {name: "新增", icon: "add",  callback: function(key, opt){ 
		        	clearAddForm();
		        	$("#add_maint_staff_number").val(getStaffNum());
		        	getMaintcompany(false);
		    		$("#addMaintUser").modal("show");}},
		        edit: {name: "修改",icon: "edit", callback: function(key, opt){ 
		        	clearAddForm();
		    		var selectRows = $("#tab_maintStaff").bootstrapTable("getSelections");
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
		    		// 获取选中行第一行
					var maintStaff = selectRows[0]; // 初始化界面数据
					getMaintcompany(true, maintStaff);
					// 初始化页面数据
					initeditImage(maintStaff);
					initEditWindowData(maintStaff);
		    		$("#editMaintUser").modal("show");}} ,
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
			offset : params.offset
		// 页码

		};
		var maintStaffNum = $('#search_maint_staff_number').val();
		if (maintStaffNum != "平台编码" && maintStaffNum != ''
				&& maintStaffNum != null) {
			temp['param1'] = maintStaffNum;
		}
		var maintStaffName = $('#search_maint_staff_name').val();
		if (maintStaffName != "姓名" && maintStaffName != ''
				&& maintStaffName != null) {
			temp['param2'] = maintStaffName;
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
	var oInit = new Object();
	var postdata = {};
	// 初始化页面上面的按钮事件
	oInit.Init = function() {
		// 打开新增窗口
		$("#btn_add").click(function() {
			clearAddForm();
			$(".photoImg").attr('src',"img/plus.png"); 
			
			getMaintcompany(false);
			$("#add_maint_staff_number").val(getStaffNum());
			$("#addMaintUser").modal("show");
		});
		// 新增保存
		$("#btn_add_save").click(function() {
			doSave();
		});
		// 修改功能
		$("#btn_edit").click(
				function() {
					clearAddForm();

					var selectRows = $("#tab_maintStaff").bootstrapTable(
							"getSelections");

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
					if (selectRows.length > 1) {
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
					// 获取选中行第一行
					var maintStaff = selectRows[0]; // 初始化界面数据
					getMaintcompany(true, maintStaff);
					// 初始化页面数据
					initeditImage(maintStaff);
					initEditWindowData(maintStaff);

					$("#editMaintUser").modal("show");// 显示窗口
				});

		// 修改保存
		$("#btn_edit_save").click(
				function() {
					var selectRows = $("#tab_maintStaff").bootstrapTable(
							"getSelections");
					var maintStaff = selectRows[0];
					doEdit();
				});

	};

	return oInit;
};

// 本地预览
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

// 证书图片上传
function ajaxUserPhotoUpload(userCode, typeId) {
	$.ajaxFileUpload({
		url : "uploadStaffAutoPhoto.do",// 需要链接到服务器地址
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
// 新增保存
function doSave() {

	var maintStaffNum = $("#add_maint_staff_number").val();
	if ($("#add_maint_staff_name").val() ==null|| $("#add_maint_staff_name").val().length > 20) {
		toastr.error("请填写正确姓名!只能为1-20位的汉字或英文");
		return false;
	}
	if ($("#add_maint_company_id").val() == null
			|| $("#add_maint_company_id").val() == "") {
		toastr.error("请选择所属单位!");
		return false;
	}
	if (!Validator.isPhone($("#add_maint_staff_phonenum").val())) {
		toastr.error("手机号输入错误!");
		return false;
	}
	if ($("#add_maint_staff_certificate_number").val().length != 14) {
		toastr.error("资格证书编号输入错误!");
		return false;
	}
	addextractionBirthday();
	if ($("#add_maint_staff_name").val() == null
			|| $("#add_maint_staff_name").val() == "") {
		toastr.error("姓名不能为空!");
		return false;
	}
	if ($("#add_maint_staff_app_password").val() != $("#add_equal_password").val()) {
			toastr.error("确认密码输入不一致，请重新输入!");
				return false;
	}
	
	
	
	if ($("#add_maint_staff_name").val().length>20) {
		toastr.error("姓名不能超过20位!");
		return false;
	}
	if ($("#add_maint_staff_home_phonenum").val()!=""&&$("#add_maint_staff_home_phonenum").val()!=null&&!Validator.isPhone($("#add_maint_staff_home_phonenum").val())) {
		toastr.error("家庭电话输入错误!");
		return false;
	}
	
	if($("#add_staff_contract_startdate").val()>=$("#add_staff_contract_enddate")){
		toastr.error("合同结束日期应大于合同开始日期!");
		return false;
	}

	if ($("#add_maint_staff_speciality").val().length>100) {
		toastr.error("人员特长不应超过100个字!");
		return false;
	}
	
	if ($("#add_maint_staff_email").val()!=""&&$("#add_maint_staff_email").val()!=null&&!Validator.isEmail($("#add_maint_staff_email").val())) {
		toastr.error("电子邮箱输入错误!");
		return false;
	}
	
	var usecompy = new Object();
	$("[id^='add_']").each(
			function() {
				var s = $(this).attr('id').substr(4);
				if (s == 'userPhotoFile' && $(this).val() != "") { // 分别获取每张图片作区别
					// 需要一一对应
					// 麻烦。。。。
					ajaxUserPhotoUpload(maintStaffNum + "-userPhoto",
							'add_userPhotoFile');// 签名
				} else if (s == 'mechanicsImg' && $(this).val() != "") {
					ajaxUserPhotoUpload(maintStaffNum + "-mechanics",
							'add_mechanicsImg');// 机械安装维修
				} else if (s == 'electricalImg' && $(this).val() != "") {
					ajaxUserPhotoUpload(maintStaffNum + "-electrical",
							'add_electricalImg');
				} else if (s == 'driverImg' && $(this).val() != "") {
					ajaxUserPhotoUpload(maintStaffNum + "-driver",
							'add_driverImg');
				} else {
					usecompy[s] = $(this).val();
				}
			})

	$.ajax({
		type : "POST", // post提交方式默认是get
		url : "saveMaintStaff.do",
		contentType : 'application/json;charset=utf-8',
		data : JSON.stringify(usecompy),
		error : function(request) {
			toastr.error("保存失败！");
		},
		success : function(obj) {
			if (obj.success) {
				toastr.success(obj.msg);
				refresh();
				$("#addMaintUser").modal("hide");
				
			} else {
				toastr.error(obj.msg);
			}
		}

	});

}

// 初始化修改页面数据
function initEditWindowData(maintStaff) {
	$("[id^='edit_']").each(function() { // 遍历赋值
		var s = $(this).attr('id').substr(5);
		/* console.debug(project[s]); */
		if (s == "maint_staff_app_password" || s == "equal_password") { // 隐藏密码
			$(this).val("******");
		} else {
			$(this).val(maintStaff[s]);
		}

	})
}
// 加载图片
function initeditImage(maintStaff) {
	var imageNameList = new Array();
	imageNameList.push("userPhoto");
	imageNameList.push("mechanics");
	imageNameList.push("electrical");
	imageNameList.push("driver");

	for (var i = 0; i < imageNameList.length; i++) {// 获取图片放到对应位置
		var imgSecond = "getStaffphoto.do?imgNameStr=" + imageNameList[i]
				+ "&staffNum=" + maintStaff["maint_staff_number"];
		var imgStr = "#" + imageNameList[i] + "Img";
		$(imgStr).attr('src', imgSecond);

	}

}
// 修改保存
function doEdit() {
	var maintStaffNum = $("#edit_maint_staff_number").val();
	if ($("#edit_maint_staff_name").val().length > 20) {
		toastr.error("请填写正确姓名!只能为1-20位的汉字或英文");
		return false;
	}
	if ($("#edit_maint_company_id").val() == null
			|| $("#edit_maint_company_id").val() == "") {
		toastr.error("请选择所属单位!");
		return false;
	}
	if ($("#edit_maint_staff_phonenum").val() == null
			|| $("#edit_maint_staff_phonenum").val() == "") {
		toastr.error("手机号不能为空!");
		return false;
	}
	if ($("#edit_maint_staff_certificate_number").val().length != 14) {
		toastr.error("资格证书编号输入错误!");
		return false;
	}
	editextractionBirthday();
	if (!Validator.isPhone($("#edit_maint_staff_phonenum").val())) {
		toastr.error("手机号输入错误!");
		return false;
	}
	
	if ($("#edit_maint_staff_name").val().length>20) {
		toastr.error("姓名不能超过20位!");
		return false;
	}
	if ($("#edit_maint_staff_home_phonenum").val()!=""&&$("#edit_maint_staff_home_phonenum").val()!=null&&!Validator.isPhone($("#edit_maint_staff_home_phonenum").val())) {
		toastr.error("家庭电话输入错误!");
		return false;
	}
	if($("#edit_staff_contract_startdate").val()>=$("#edit_staff_contract_enddate")){
		toastr.error("合同结束日期应大于合同开始日期!");
		return false;
	}

	if ($("#edit_maint_staff_speciality").val().length>100) {
		toastr.error("人员特长不应超过100个字!");
		return false;
	}
	
	if ($("#edit_maint_staff_email").val()!=""&&$("#edit_maint_staff_email").val()!=null&&!Validator.isEmail($("#edit_maint_staff_email").val())) {
		toastr.error("电子邮箱输入错误!");
		return false;
	}
	
	
	var usecompy = new Object();
	$("[id^='edit_']").each(
			function() {
				var s = $(this).attr('id').substr(5);
				if (s == 'userPhotoFile' && $(this).val() != "") { // 分别获取每张图片作区别
					// 需要一一对应
					// 麻烦。。。。
					ajaxUserPhotoUpload(maintStaffNum + "-userPhoto",
							'edit_userPhotoFile');// 签名
				} else if (s == 'mechanicsImg' && $(this).val() != "") {
					ajaxUserPhotoUpload(maintStaffNum + "-mechanics",
							'edit_mechanicsImg');// 机械安装维修
				} else if (s == 'electricalImg' && $(this).val() != "") {
					ajaxUserPhotoUpload(maintStaffNum + "-electrical",
							'edit_electricalImg');
				} else if (s == 'driverImg' && $(this).val() != "") {
					ajaxUserPhotoUpload(maintStaffNum + "-driver",
							'edit_driverImg');
				} else {
					usecompy[s] = $(this).val();
				}
			})

	$.ajax({
		type : "POST", // post提交方式默认是get
		url : "editMaintStaff.do",
		contentType : 'application/json;charset=utf-8',
		data : JSON.stringify(usecompy),
		error : function(request) {
			toastr.error("修改失败！");
		},
		success : function(obj) {
			if (obj.success) {
				toastr.success(obj.msg);
				$('#tab_maintStaff').bootstrapTable('refresh');
				$("#editMaintUser").modal("hide");
				
			} else {
				toastr.error(obj.msg);
			}
		}

	});

}

// 删除功能
function doDelete() {
	var selectRows = $("#tab_maintStaff").bootstrapTable("getSelections");
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
			maintStaff[i] = selectRows[i]["maint_staff_id"]
		}
		$.ajax({
			type : "POST", // post提交方式默认是get
			url : "deleteMaintStaff.do",
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
					$('#tab_maintStaff').bootstrapTable('refresh');
				}
			}

		});
	})
}

// 刷新弹框界面
function clearAddForm() {
	$("#addForm")[0].reset();
	$("#editForm")[0].reset();
}
// 查询
function refresh() {
	$('#tab_maintStaff').bootstrapTable('refreshOptions', {
		pageNumber : 1
	});
}
// 重置查询
function doReset() {
	$("input[id^='search']").each(function() {
		$(this).val("");
	})

}
// 新增时获取维保人员平台编码
function getStaffNum() {
	var staffnum = null;
	$.ajax({
		type : 'POST',
		url : "getStaffNum.do",
		async : false,
		error : function(request) {
			toastr.error("获取维保人员平台编码失败！");
		},
		success : function(obj) {
			staffnum = obj.staffNum;

		}
	})

	return staffnum;
}
// 获取维保单位列表
function getMaintcompany(isModify, rowData) {
	var staffnum = null;
	if(isModify){
		$("#edit_maint_company_id").empty();
	}else{
		$("#add_maint_company_id").empty();
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
				if (isModify && rowData.maint_company_id == data.maint_id) {
					tempAjax += "<option value='" + data.maint_id
							+ "'selected='selected'>" + data.maint_comp_name
							+ "</option>";
				} else {
				
					tempAjax += "<option value='" + data.maint_id + "' >"
							+ data.maint_comp_name + "</option>";
				}
			});
			if (isModify) {
				$("#edit_maint_company_id").append(tempAjax);
			} else {
				
					$("#add_maint_company_id").append(tempAjax);	
			
				
			}

		}
	})

	return staffnum;
}

// 点击图片放大缩小
function imgScale() {
	var flag = true, // 状态true为正常的状态,false为放大的状态
	imgH, // 图片的高度
	imgW, // 图片的宽度
	img = $("#userPhotoImg"); // 图片元素
	imgW = img.width;
	imgH = img.height;
	for (var i = 0; i < img.length; i++) {
		img[i].onclick = function() {
			// 图片点击事件
			if (flag) {
				// 图片为正常状态
				flag = false; // 把状态设为放大状态
				this.style.width = "100px";
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
// 身份证号判断
function addextractionBirthday() {
	var idcardno = $("#add_maint_staff_cardno").val();
	var Validator = new ChargeValidator();
	if (!Validator.checkCardId(idcardno)) {
		toastr.error("身份证号输入错误!");
		return false;
	}
}
function editextractionBirthday() {
	var idcardno = $("#edit_maint_staff_cardno").val();
	var Validator = new ChargeValidator();
	if (!Validator.checkCardId(idcardno)) {
		toastr.error("身份证号输入错误!");
		return false;
	}
}
// 身份证号点击框
function bindBlur() {
	$('#add_maint_staff_cardno').blur(function() {
		addextractionBirthday();
	});
	$('#edit_maint_staff_cardno').blur(function() {
		editextractionBirthday();
	});

}

// 密码是否显示点击事件
function showPassword() {
	$(".elevator_btm label").each(function() {
		$(this).find("span").mousedown(function() {// 鼠标按下
			$(this).css({
				background : "url(img/eye.png) no-repeat"
			})
			$(this).parent().find("input").attr('type', 'text');
		});
		$(this).find("span").mouseup(function() {// 鼠标松开
			$(this).css({
				background : "url(img/password.png) no-repeat"
			})
			$(this).parent().find("input").attr('type', 'password');
		})
		
		$(this).find("span").mouseout(function() {// 鼠标移开
			$(this).css({
				background : "url(img/password.png) no-repeat"
			})
			$(this).parent().find("input").attr('type', 'password');
		})
	})
}
// 确认密码是否一致事件
function equalPwd() {
	$('#add_equal_password').blur(
			function() {
				if ($("#add_maint_staff_app_password").val() != $(
						"#add_equal_password").val()) {
					toastr.error("确认密码输入不一致，请重新输入!");
					return false;
				}
			});
	$('#edit_equal_password').blur(
			function() {
				if ($("#edit_maint_staff_app_password").val() != $(
						"#edit_equal_password").val()) {
					toastr.error("确认密码输入不一致，请重新输入!");
					return false;
				}
			});

	$("#add_maint_staff_phonenum").blur(
			function() {

				if (!Validator.isPhone($("#add_maint_staff_phonenum").val())) {
					toastr.error("手机号输入错误!");
					return false;
				} else {
					$("#add_maint_staff_app_account").val(
							$("#add_maint_staff_phonenum").val());
				}

			})
			
			$("#edit_maint_staff_phonenum").blur(
			function() {

				if (!Validator.isPhone($("#edit_maint_staff_phonenum").val())) {
					toastr.error("手机号输入错误!");
					return false;
				} else {
					$("#edit_maint_staff_app_account").val(
							$("#edit_maint_staff_phonenum").val());
				}

			})
}
