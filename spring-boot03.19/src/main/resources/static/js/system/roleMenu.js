$(function(){
	var uiUtil = new UiUtil();
	uiUtil.loadJsTree("#roleTree", "findRoleForTree.do", false);
	//加载角色
	uiUtil.loadJsTree("#menuTree", "findMenuForTree.do", true);
/**
 * 角色树的选择事件
 */
$('#roleTree').bind("activate_node.jstree", function (obj, e) {
	
    // 处理代码
    // 获取当前节点
    var currentNode = e.node;
    //获取节点的id
    var selectNodes = $("#roleTree").jstree("get_selected");
    $.ajax({
    	type : "get", //post提交方式默认是get
    	url : "findRoleMenuByRole.do?p="+new Date().getTime(),
    	cache:false,
    	async: false,
    	dataType : 'json',
    	data : "role_id="+selectNodes,
    	error : function(request) {
    		swal(JSON.stringify(request), "", "error");
    	},
    	success : function(result) {
    		$("#menuTree").jstree("uncheck_all");
    		$.each(result,function(i,n){
    			
    			var node_id = "#"+n.menu_id;
    			$("#menuTree").jstree("check_node",node_id);
            });
    		return;
    	}
    });
});

var  role;
function refresh(){
	 var selectNodes = $("#roleTree").jstree("get_selected");
	 
	 $('#roleTree').parent().attr('id');//通过子元素id获取父元素
	    $.ajax({
	    	type : "get", //post提交方式默认是get
	    	url : "findRoleMenuByRole.do?p="+new Date().getTime(),
	    	cache:false,
	    	async: false,
	    	dataType : 'json',
	    	data : "role_id="+selectNodes[0],
	    	error : function(request) {
	    		swal(JSON.stringify(request), "", "error");
	    	},
	    	success : function(result) {
	    		$("#menuTree").jstree("uncheck_all");
	    		$.each(result,function(i,n){ 
	    			var node_id = "#"+n.menu_id;
	    			alert(node_id)
	    			$("#menuTree").jstree("check_node",node_id);
	            });
	    		return;
	    	}
	    });
}

/**
 * 
 * 点击确定按钮保存对应的数据
 * 
 */
$("#btn_save_rolemenu").click(function(){
	var roleInfo = $("#roleTree").jstree("get_selected");
	var menuInfo = $("#menuTree").jstree("get_checked");
	if(roleInfo==""){
		bootbox.alert({
		    message: "请勾选授权角色！",
		    buttons: {
				   ok: {
					    label: '知道了',
				    }
			},
		});
		return;
	}
	if(menuInfo==""){
		bootbox.alert({
		    message: "请勾选授权菜单！",
		    buttons: {
				   ok: {
					    label: '知道了',
				    }
			},
		});
		return;
	}
	var roleMenu = [];
	var role_id = roleInfo[0];
	$.each(menuInfo,function(index,menu){
		var jsonData = {"role_id":role_id,"menu_id":menu};
		roleMenu.push(jsonData);
	});
	$.ajax({
		type : "post", //post提交方式默认是get
		url : "saveRoleMenu.do",
    	dataType : 'json',
		contentType : 'application/json;charset=utf-8',
		data : JSON.stringify(roleMenu),  
		error : function(request) {
		alert(JSON.stringify(request));
			swal(JSON.stringify(request),"","error");
		},
		success : function(obj) {
			if (obj.success) {
				toastr.success(obj.MSG);
				refresh();
				return;
			}else{
				toastr.success(obj.MSG);
				return;
			}
		}
	});
});

});
