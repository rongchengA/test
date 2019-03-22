//点击获取验证码按钮
$('#get_validate').click(function() {
	
	//验证手机号是否正确
	var telRegex = /^1[3|4|5|8][0-9]\d{4,8}$/;
	if (!telRegex.test($("#reg_phone").val())) {
		toastr.error('请输入正确的手机号');
		$("#reg_phone").focus();
	}
	var data= new Object();
	data["userAppAccount"]=$("#reg_phone").val();
	data["methodType"]="1";//方法类型
	console.log(data);
	$.ajax({
		type : "POST", // post提交方式默认是get
		url : "appGetLoginValidate.do",
		contentType : 'application/json;charset=utf-8',
		data : JSON.stringify(data),
		error : function(request) {
			toastr.error("系统异常");
			return;
		},	
		success : function(data) {
			console.log(data);
			if (data.success) {
				toastr.success(data.msg);
				setTimeout("resetCode()", 1000);//获取验证码按钮60秒倒计时
				return;
			} else { // 登录错误提示信息
				toastr.error(data.msg);//
				return;
			}
		}
	})
});

//获取验证码按钮60秒倒计时
function resetCode() {
	var second = 60;
	$("#get_validate").text(60 + 's后重发').css({
		"background" : "#ccc"
	});
	var timer = null;
	timer = setInterval(function() {
		second -= 1;
		if (second > 0) {
			$("#get_validate").text(second + 's后重发');
			$("#get_validate").attr("disabled", true);
		} else {
			clearInterval(timer);
			$("#get_validate").text("获取验证码").css({
				"background" : "#00ADF4"
			});
			$("#get_validate").attr("disabled", false);
		}
	}, 1000);
}

//点击手机验证下一步按钮
$('#forget_confirm').click(function() {
	//验证手机号是否正确，验证验证码是否为空
	var telRegex = /^1[3|4|5|8][0-9]\d{4,8}$/;
	if (!telRegex.test($("#reg_phone").val())) {
		toastr.error('请输入正确的手机号');
		$("#reg_phone").focus();
	}else if ($("#reg_validate").val() == "请输入手机验证码"
		|| $("#reg_validate").val() == "") {
		toastr.error("验证码不能为空");
		$("#reg_validate").focus();
	}	
	//验证两次输入的密码是否一致
	var pPattern = /^[a-zA-Z0-9]{6,16}$/;
	if (!pPattern.test($("#reg_first_pwd").val())) {
		toastr.error("密码不正确，请设置6到16位（字母/数字)");
		$("#reg_first_pwd").focus();
	} else if ($("#reg_first_pwd").val() !== $("#reg_two_pwd").val()) {
		toastr.error("两次输入密码不一致！");
		$("#reg_two_pwd").focus();
	} else if ($("#reg_first_pwd").val() == $("#reg_two_pwd").val()) {
		$.ajax({
			type : "POST", // post提交方式默认是get
			url : "forgetPwdUpdatePwd.do",
			data : {"registerPhone" : $("#reg_phone").val(),
				"registerValidate" : $("#reg_validate").val(),
				"registerOldPwd" : $("#reg_first_pwd").val(),
				"registerNewPwd" : $("#reg_two_pwd").val(),
			},
			error : function(request) {
				toastr.error("系统异常");
				return;
			},	
			success : function(data) {
				console.log(data);
				if (data.success) {
					toastr.success(data.msg);//
					document.location = getRootPath()+"/loginUI.do";
					return;
				} else { // 登录错误提示信息
					toastr.error(data.msg);//
					return;
				}
			}
		})		
	}
	
});