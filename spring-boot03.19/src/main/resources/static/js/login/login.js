$(function() {
	getRootPath();
	//判断当前的浏览器的版本
	FuckInternetExplorer();
	var uPattern = /^[a-zA-Z0-9]{1,32}$/;
	var pPattern = /^[a-zA-Z0-9]{6,16}$/;
	$('#loginsub').click(
			function() {
				if (!uPattern.test($("#userNumberOrPhone").val())) {
					toastr.error('用户名不正确，请输入1到32位（字母/数字)');
					$("#userNumberOrPhone").focus();
				} else if ($(".userPassword").val() == '请输入密码'
						&& !pPattern.test($(".userPassword").val())) {
					toastr.error('密码不正确，请输入6到16位（字母/数字)');
					$("#password").focus();
				} else {
					toastr.info('请稍后，页面正在加载中。。。','提示','top-center');
					$.ajax({
						type : "POST", // post提交方式默认是get
						url : "loginNum.do",
						data : {"userLogin" : $("#userNumberOrPhone").val()},
						error : function(request) {
							toastr.error("系统异常");
							return;
						},	
						success : function(data) {
							if (data.loginNum > 3) {
								$("#validate_code").show();
								if ($("#validation").val() == '请输入验证码') {
									toastr.error('请输入验证码');
									$("#validation").focus();
									return;
								}
							}
							var passwd1 = $.md5($("#userPassword").val());
							$.ajax({
								type : "POST", // post提交方式默认是get
								url : "login.do",
								data : {"userNumberOrPhone" : $("#userNumberOrPhone").val(),
									"userPassword" : passwd1,
									"userType" : "0",
									"validation" : $("#validation").val()
								}, // 序列化
								error : function(request) {
									toastr.error("登录异常");
									return;
								},
								success : function(data) {
									if (data.success) {
										toastr.success(data.msg);
										document.location = getRootPath()+"/main.do";
										return;
									} else { // 登录错误提示信息
										toastr.error(data.msg);//
										reLoadImage()
										is_show = true;
										return;
									}
								}
							});
						}
					});
					
					
					
					
					
				}
			})

	//点击注册跳转到注册页面
	$('#login_regitster').click(function() {
		document.location = getRootPath()+"/registerPage.do";	
	})
	//点击找回密码跳转到找回密码页面
	$('#login_forget').click(function() {
		document.location = getRootPath()+"/forgetPwdPage.do";	
	})
	

});

/**
 * 检测浏览器的版本ie的低于9以下不用
 */
function FuckInternetExplorer() {
	var browser = navigator.appName;
	var b_version = navigator.appVersion;
	var version = b_version.split(";");
	if (version.length > 1) {
		var trim_Version = parseInt(version[1].replace(/[ ]/g, "").replace(
				/MSIE/g, ""));
		if (trim_Version < 9) {
			$(".Ie_version").show();

			return false;
		}
		return true;
	}
}

$('body').keyup(function() {
	var theEvent = window.event || arguments.callee.caller.arguments[0];
	var code = theEvent.keyCode || theEvent.which;
	if (code == 13 && !is_show) {
		$('#loginsub').trigger('click');
	} else {
		is_show = false;
	}
})
function reLoadImage() {
	$('#valimg').hide().attr('src',
			'sysValidationImage2.do?i=' + Math.floor(Math.random() * 100))
			.fadeIn();
}
function cleardata() {
	$('#loginForm').form('clear');
}



// 重置密码页面隐藏，登录页面显示
function shToggle() {
	$(".setPassword").hide();
	$(".login").show();
}

// 获取验证码的函数
function resetCode() {
	var second = 60;
	$("#get_code").val(60 + 's').css({
		"background" : "#ccc"
	});
	var timer = null;
	timer = setInterval(function() {
		second -= 1;
		if (second > 0) {
			$("#get_code").val(second + 's');
			$("#get_code").attr("disabled", true);
		} else {
			clearInterval(timer);
			$("#get_code").val("获取验证码").css({
				"background" : "#00ADF4"
			});
			$("#get_code").attr("disabled", false);
		}
	}, 1000);
}
// 设置password框js
// $('.password').css("display","none");
$('.topPw ').focus(function() {
	$(this).css('display', 'none').siblings('.password').focus();
});
$('.password').blur(function() {
	if ($(this).val() == '') {
		$(this).siblings('.topPw ').css('display', 'block');
	}
})
  
