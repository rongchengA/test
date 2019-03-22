
var drag_js_files = [
                       'bootstrap/js/draggable.js'
                   ];

(function($){
	/**
	 * 导入JS文件
	 */
	for(var i = 0; i < drag_js_files.length; i++){
		document.write("<script type='text/javascript' src='"+drag_js_files[i]+"'></script>");
	}
	setTimeout('setModalDraggable()',1000);
})(jQuery);

function setModalDraggable(){
	$(".modal").draggable({
	    handle: ".modal-header"
	});
}