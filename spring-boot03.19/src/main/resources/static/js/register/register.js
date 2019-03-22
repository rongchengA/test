//点击获取验证码按钮
$('#get_validate').click(function() {	
	//验证手机号是否正确
	var telRegex = /^1[3|4|5|8][0-9]\d{4,8}$/;
	if ($("#reg_phone").val()==null&&$("#reg_phone").val()=="") {
		toastr.error('请输入正确的手机号');
		$("#reg_phone").focus();
		return;
	}
	if (!telRegex.test($("#reg_phone").val())) {
		toastr.error('请输入正确的手机号');
		$("#reg_phone").focus();
		return;
	}
	var data= new Object();
	data["userAppAccount"]=$("#reg_phone").val();
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
			return;
		} else {
			clearInterval(timer);
			$("#get_validate").text("获取验证码").css({
				"background" : "#00ADF4"
			});
			$("#get_validate").attr("disabled", false);
			return;
		}
	}, 1000);
}
//点击手机验证下一步按钮
$('#one_confirm').click(function() {
	//验证手机号是否正确，验证验证码是否为空
	var telRegex = /^1[3|4|5|8][0-9]\d{4,8}$/;
	if (!telRegex.test($("#reg_phone").val())) {
		toastr.error('请输入正确的手机号');
		$("#reg_phone").focus();
		return;
	}else if ($("#reg_validate").val() == "请输入手机验证码"
		|| $("#reg_validate").val() == "") {
		toastr.error("验证码不能为空");
		$("#reg_validate").focus();
		return;
	}
	//验证两次输入的密码是否一致
	var pPattern = /^[a-zA-Z0-9]{6,16}$/;
	if (!pPattern.test($("#reg_first_pwd").val())) {
		toastr.error("密码不正确，请设置6到16位（字母/数字)");
		$("#reg_first_pwd").focus();
		return;
	} else if ($("#reg_first_pwd").val() !== $("#reg_two_pwd").val()) {
		toastr.error("两次输入密码不一致！");
		$("#reg_two_pwd").focus();
		return;
	} else if ($("#reg_first_pwd").val() == $("#reg_two_pwd").val()) {
		var passwd1 = $.md5($("#reg_first_pwd").val());
		$.ajax({
			type : "POST", // post提交方式默认是get
			url : "registerConfirmPhoneAndpwd.do",
			data : {"registerPhone" : $("#reg_phone").val(),
				"registerValidate" : $("#reg_validate").val(),
				"registerPwd" : passwd1,
			},
			error : function(request) {
				toastr.error("系统异常");
				return;
			},	
			success : function(data) {
				if (data.success) {
					$(".mobel_ver").removeClass("on");
					$(".info").addClass("on");
					$(".res_finish").removeClass("on");
					
					$(".mobel_ver span").removeClass("bg");
					$(".info span").addClass("bg");
					$(".res_finish span").removeClass("bg");
					
					$("#res_msg_one").hide();
					$("#res_msg_two").show();
					$("#res_msg_three").hide();
					$("#register_phone").val(data.msg);
					return;
				} else { // 登录错误提示信息
					toastr.error(data.msg);//
					return;
				}
			}
		})		
	}
	
});
//点击注册按钮
$('#two_confirm').click(function() {	
	
	var data = new Object();
	data["userName"] = $("#user_name").val();
	data["userCardno"] = $("#user_cardno").val();
	data["userEmail"] = $("#user_email").val();
	data["userWeixin"] = $("#user_weixin").val();
	data["maintCompName"] = $("#user_comp_name").val();
	data["maintCompAddress"] = $("#user_comp_address").val();
	data["maintCompCode"] = $("#user_comp_code").val();
	data["registerPhone"] = $("#register_phone").val();
	
	$.ajax({
		type : "POST", // post提交方式默认是get
		url : "registerInfoConfirm.do",
		contentType : 'application/json;charset=utf-8',
		data : JSON.stringify(data),
		error : function(request) {
			toastr.error("系统异常");
			return;
		},	
		success : function(data) {
			if (data.success) {
				$(".mobel_ver").removeClass("on");
				$(".info").removeClass("on");
				$(".res_finish").addClass("on");
				
				$(".mobel_ver span").removeClass("bg");
				$(".info span").removeClass("bg");
				$(".res_finish span").addClass("bg");
				
				$("#res_msg_one").hide();
				$("#res_msg_two").hide();
				$("#res_msg_three").show();
				return;
			} else { // 登录错误提示信息
				toastr.error(data.msg);//
				return;
			}
		}
	})	
	
	
});

//点击立即登录按钮
$('#three_confirm').click(function() {
	document.location = getRootPath()+"/loginUI.do";	
})
		