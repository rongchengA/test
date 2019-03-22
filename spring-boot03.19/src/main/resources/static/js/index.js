$(document).ready(function(){
	//点击输入框改变底边框色值;
	$(":text").focus(function() {
		$(this).css('border-bottom-color', '#5aabfa');
	}).blur(function(){
		$(this).css('border-bottom-color', '');
	});
	//登录页密码边框颜色
	$("#userPassword").focus(function() {
		$(this).css('border-bottom-color', '#5aabfa');
	}).blur(function(){
		$(this).css('border-bottom-color', '');
	});
	
	
})