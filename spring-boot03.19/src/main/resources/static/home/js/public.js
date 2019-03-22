$(document).ready(function () {
    // 左侧菜单
    // $(".second_menu").hide();
    // 侧边栏切换
    tabMenu();
    //弹框默认隐藏;
    $(".sweet-overlay").hide();
    $(".sweet-alert").hide();
    //点击新增，修改，删除显示弹框
    clickRev();
    clickOmit();
    //点击ok/取消隐藏弹框
    clickCancel();
    //删除表格数据;
    removeData();
    // 全选/取消全选
   /* checkAll();*/
    //点击确定按钮
    clickSure();
//全选
    checks();


});

//侧边栏切换
function tabMenu() {
    $(".first_menu").click(function () {
        $(this).children("ul").slideToggle("slow");
        $(this).siblings().children("ul").slideUp("slow");
        $(this).children("a").toggleClass("colorA");
        $(this).siblings().children("a").removeClass("colorA");
        $(this).children("a").find("img").toggleClass("imgChange");
        $(this).children("a").find("img").attr({
            "src": ""
        });
        $(this).siblings().children("a").find("img").removeClass("imgChange");
    })
}



//点击取消关闭弹框
function clickCancel() {
    $(".cancel").on("click", function () {
        $(".sweet-overlay").hide();
        $(".sweet-alert").hide();
    });
}
//点击修改按钮
function clickRev() {
    $(".rev").on("click", function () {
        if ($("table tbody input[type=checkbox]").is(':checked')) {
            $(".rev").attr({
                "data-toggle": "modal",
                "data-target": "#myModal"
            });
            $(".sweet-overlay").hide();
            $(".sweet-alert").hide();
            $(".error").hide();
            $(".warning").show();
            $(".cancel").hide();
        } else {
            $(".rev").attr({
                "data-toggle": "",
                "data-target": ""
            });
            $('.error').show();
            $(".warning").hide();
            $(".sweet-overlay").show();
            $(".sweet-alert").show();
            $(".sweet-alert").find("h2").html('请勾选后在操作');
            $(".cancel").hide();
            $(".confirm").html("ok");
        }
    });
};
//点击删除按钮
function clickOmit() {
    $(".omit").on("click", function () {
        if ($("table tbody input[type=checkbox]").is(':checked')) {
            $(".sweet-overlay").show();
            $(".sweet-alert").show();
            $(".error").hide();
            $(".warning").show();
            $(".cancel").css({
                "display": "inline-block"
            });
            $(".sweet-alert").find("h2").html('是否要删除1条数据');
            $(".cancel").html("取消");
            $(".confirm").html("确定");
        } else {
            $(".sweet-overlay").show();
            $(".sweet-alert").show();
            $(".error").show();
            $(".warning").hide();
            $(".sweet-alert").find("h2").html('请勾选后在操作');
            $(".cancel").hide();
            $(".confirm").html("ok");
        }
    });
}

function removeData() {
    $(".confirm").click(function () {
        if ($(this).html() == "确定") {
            $("input[type=checkbox]:checked").each(function () { // 遍历选中的checkbox
                n = $(this).parents("tr").index(); // 获取checkbox所在行的顺序
                $(".table tbody").find("tr:eq(" + n + ")").remove("");
                $(".sweet-overlay").hide();
                $(".sweet-alert").hide();
            });
        } else if ($(this).html() == "ok") {
            $(".sweet-overlay").hide();
            $(".sweet-alert").hide();
        }
    });
};
// 全选/取消全选
/*function checkAll() {
    var $selectAll = $("#selectAll");
    $selectAll.click(function () {
        if ($selectAll.prop("checked") == true) {
            $("input[type=checkbox]").prop("checked", true);
        } else {
            $("input[type=checkbox]").prop("checked", false);
        }
    });
    $(".table tbody input[type=checkbox]").each(function () {
        $(".table tbody input[type=checkbox]").click(function () {
            if ($(".table tbody input:checkbox").not("input:checked").size() <= 0) {
                $selectAll.prop("checked", true);
            } else {
                $selectAll.prop("checked", false);
            }
        });
    });

}*/



//用户管理点击确定按钮
function clickSure() {
    $(".sure").on("click", function () {
        if ($(".system_menu input[type=checkbox]").is(':checked')) {
            $(".sweet-overlay").show();
            $(".sweet-alert").show();
            $(".error").hide();
            $(".warning").show();
            $(".cancel").css({
                "display": "inline-block"
            });
            $(".sweet-alert").find("h2").html('成功');
            $(".cancel").hide();
            $(".confirm").html("ok");
            $(".warning").hide();
            $(".success").show();
            $(".success").css({
                "border": "4px solid #2ece72",
                "color": "#2ece72"
            });
            $(".success").html("√");
        } else {
            $(".sweet-overlay").show();
            $(".sweet-alert").show();
            $(".error").show();
            $(".warning").hide();
            $(".success").hide();
            $(".sweet-alert").find("h2").html('请勾选授权角色!');
            $(".cancel").hide();
            $(".confirm").html("ok");
        }
    });
}



function checks(){
	$(".system_menu dl dt input").each(function(){
		$(this).on("click",function(){
			if($(this).prop("checked")==true){
			$(this).find("dd:input").prop("checked",true);	
			}else{
			$(this).find("dd:input").prop("checked",true);		
			}
		})
	}) ;
}