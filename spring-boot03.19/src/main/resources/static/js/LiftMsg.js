/**
 * 加载详细信息
 */

$(function() {
	
	queryLiftMsgDetail();
	setInterval(function(){
		queryLiftMsgDetail();
		 }, 30000);	
	});


function queryLiftMsgDetail(){
	 $.ajax({
			type : "POST", //post提交方式默认是get
			url : "queryLiftMsgDetail.do",
			data :{
				"dtCode":dtCode
			},
		
			error : function(request) {
				toastr.error("服务器连接失败");
			},
			success : function(obj) {
				
				if(obj.success){
					
					$("[id^='show_']").each(function (){ //遍历赋值
						var s = $(this).attr('id').substr(5); 
						
						if(s=="lift_equipment_speed"){
							$(this).html(obj["rows"][s]+"&nbsp;m/s");
						}else if(s=="lift_equipment_load"){
							$(this).html(obj["rows"][s]+"&nbsp;kg");
						}else if(s=="lift_equipment_height"){
							$(this).html(obj["rows"][s]+"&nbsp;mm");
						}else {
							$(this).html(obj["rows"][s]);
						}
						
						

					})
					addMarks(obj["rows"]);
				  }else{
					  toastr.error(obj.msg);
				}
			}
		});

}
//地图显示
function addMarks(emInfo){
       map.clearOverlays();
	   var plng = emInfo.lift_lag; //电梯的经度	       
	       var plat = emInfo.lift_lat; //电梯的纬度
	   var new_point=new BMap.Point(plng,plat);  //生产新的地图点
	       var imgStr= "";
	       imgStr=null;
	       switch(emInfo.liftstatus)
	       {
	       case "正常":
	    	   imgStr="img/monitor/normal.png";
	         break;
	       case "预警":
	    	   imgStr= "img/monitor/warning.png";
		         break;
	       case "检修":
	    	   imgStr= "img/monitor/jianxiu.png";    
		         break;
	       case "告警":
	    	   imgStr= "img/monitor/fault.png";    
		         break;
	       default:
	    	   imgStr= "img/monitor/lost.png";
	            break;
	       }
          var myIcon = new BMap.Icon(imgStr, new BMap.Size(60,68)) //自定义新图标
	       var marker=new BMap.Marker(new_point,{icon:myIcon}); //创建标注
		   map.addOverlay(marker);
		   marker.setTitle(emInfo.lift_equipment_code); //添加标注内容
		   map.panTo(new_point);
}