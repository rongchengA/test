/**
 * 意见反馈
 */
var isupload = false;
var TableInit = function() {
	var oTableInit = new Object();
	// 初始化Table
	oTableInit.Init = function() {
		$("#tab_software").bootstrapTable({
			url : "querySoftUpdateList.do", // 请求后台的URL（*）
			method : "post", // 请求方式（*）
			toolbar : "#toolbar", // 工具按钮用哪个容器
			striped : true, // 是否显示行间隔色
			cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination : true, // 是否显示分页（*）
			sortable : false, // 是否启用排序
			sortOrder : "asc", // 排序方式
			queryParams : oTableInit.queryParams,// 传递参数（*）
			sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
			//pageNumber : 1, // 初始化加载第一页，默认第一页
			pageSize : 10, // 每页的记录行数（*）
			pageList : [ 10, 25, 50, 100 ], // 可供选择的每页的行数（*）

			minimumCountColumns : 2, // 最少允许的列数
			clickToSelect : true, // 是否启用点击选中行
			height : $(window).height(), // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
			uniqueId : "ID", //每一行的唯一标识，一般为主键列
			// showToggle:true, //是否显示详细视图和列表视图的切换按钮
			// cardView: false, //是否显示详细视图
			detailView : false, //是否 显示父子表
			columns : [ {
					checkbox : true
				}, {
					field : "softId",
					title : "ID",
				}, {
					field : "softType",
					title : "软件类型",
					formatter: function(val,row,index){
						if(val==0){
							return "维保";
						}
						if(val==1){
							return "物管";
						}
						if(val==2){
							return "平板";
						}
					}
				},{
					field : "softVersion",
					title : "软件版本"
				},{
					field : "softUpdateType",
					title : "软件更新类型",
					formatter: function(val,row,index){
						if(val==0){
							return "普通更新";
						}
						if(val==1){
							return "重大更新";
						}
					}
				},{
					field : "softUpdateContent",
					title : "软件更新内容"
				},{
					field : "softUpdateTime",
					title : "软件更新时间"
				}
			]
		});

	};
	// 得到查询的参数
	oTableInit.queryParams = function(params) {
		var temp = { // 这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
			limit : params.limit, // 页面大小
			offset : params.offset
		// 页码

		};
		var serSoftType = $("#search_soft_type").val();
		if (serSoftType != '' && serSoftType != null ) {
			temp['param1'] = serSoftType;
		}
		return temp;
	};
	return oTableInit;
};

//查询
function refresh(){
	 $('#tab_software').bootstrapTable('refreshOptions',{pageNumber:1});
}
//重置查询
function doReset() {
	$("#search_soft_type").val('');
}

//新增页面文件上传，必须先点击上方的上传按钮才可以
$("#file-info").fileinput({
	uploadUrl : 'uploadSoftwareUpdateFile.do',
	allowedFileExtensions : [ 'apk'],// 接收的文件后缀,
	overwriteInitial : false,
	maxFileSize : 200000, // 文件大小 ，为0时不限制.单位kb
	maxFilesNum : 1,
	maxFileCount : 1, // 最大数量
	language : 'zh', // 设置语言
	dropZoneTitle : "拖拽非空文件到这里...",
	slugCallback : function(filename) {
		return filename.replace('(', '_').replace(']', '_');
	},
	uploadExtraData : function() {
		// 设置参数只能这么干
		return {
			"id" : $("#soft_type").val()
		};
	},
	previewFileIcon : "<i class='glyphicon glyphicon-king'></i>",
	msgFilesTooMany : "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
});

//新增表单清空
function clearForm() {
	$("#addForm")[0].reset();
}
$("#btn_add").click(function(){
	clearForm();
	$("#addModal").modal("show");
})
function save() {
	 var soft_type = $("#soft_type").val();
	 var soft_update_type = $("#soft_update_type").val();
	 var soft_update_context= $("#soft_update_context").val();

	 if(soft_update_context.length>=200){
		 toastr.error("内容不能超过100字符");
		 return;
	 }
	 var company = {"softType":soft_type,
			 "softUpdateType":soft_update_type,
			 "softContent":soft_update_context
	 };
	 $.ajax({
			type : "POST", //post提交方式默认是get
			url : "insertSoftUpdateInfo.do",
			contentType : 'application/json;charset=utf-8',
			data : JSON.stringify(company),
			error : function(request) {
				swal(request.msg, "","error");
			},
			success : function(obj) {
				if(obj.success){
					$("#addModal").modal("hide");
					$("#tab_software").bootstrapTable('refresh');
				}else{
					swal(obj.msg, "","error");
				}
			}
		});
}

