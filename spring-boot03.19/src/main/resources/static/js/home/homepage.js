/*折线图*/
function   queryBrokeChart(time,data){
var brokeChart = echarts.init(document.getElementById('center_btm'));
var brokeOption = {
	title: {

		text: ''

	},

	tooltip: {//指示线滑过

		 trigger: 'axis',
		 showDelay: 0,

        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#999'
            }
        }


	},

	grid: {

		left: '3%',

		right: '8%',

		bottom: '0%',
		containLabel: true

	},
	xAxis: {
		type: 'category',
		/*boundaryGap:false,
		axisLine: {onZero: true},*/

		axisTick: { //y轴刻度线
			"show": false,
		},
		axisLine: {
			lineStyle: {
				color: '#144277',
			}
		},
		axisLabel: {
			color: "#fff" //刻度线标签颜色
		},
		splitLine: {
			"show": true,
			"lineStyle": {
				color: ['#144277'],
				width: 1,
				type: 'solid'

			}
		},

		data:time

	},

	yAxis: {
		max: '100',
		splitNumber: '5',
		min:'0',
		type: 'value',
		axisTick: { //y轴刻度线
			"show": false,
		},
		axisLabel: {
			color: "#fff" //刻度线标签颜色
		},
		axisLine: {
			lineStyle: {
				color: '#144277'
			},

		},
		splitLine: {
			"show": true,
			"lineStyle": {
				color: ['#144277'],
				width:1,
				type: 'solid'

			}
		},
	},
	series: [

		{

			name: '电梯故障统计',
            
			type: 'line',
			
			stack: '电梯故障统计',
			type: 'line',
            showSymbol: true,
            symbol: 'circle',     //设定为实心点
            symbolSize:7,   //设定实心点的大小
			itemStyle: {

				normal: {
					color: '#00FFFF',
					fontSize:38,
					lineStyle: {
						color: '#00FFFF',
						width: 1,

					},
                  /*areaStyle: {color:'#abcffb'}*///设置网格每个折线点段的颜色;
				}

			},
			data: data

		},
	]

};

brokeChart.setOption(brokeOption);
}
//圆环图
function getCircleData(data){

    var obj = document.getElementById("p1");
    var obj2 = document.getElementById("p2");
    var obj3 = document.getElementById("p3");
var circleChart = echarts.init(document.getElementById('side_top'));
    circleOption = {
    color:['#0464E2', '#93D2FF','#6BBCFE','#3F9CFF','#2482FE'],
    title: [{

	        text: '维保预警',

	        top:'44.3%',
 
	        left:'41.3%',

	        textStyle:{

	            color: '#fff',

	            fontSize:14,

	        }

	    }],
	     tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
       series : [
       
       {
            name:'维保预警',
            type:'pie',
            radius : ['52%', '65%'],
            x: '30%',
            width: '10%',
            funnelAlign: 'left',
            max:'50%',
            data:[
                {value:obj3.innerText.replace(/[^0-9]/ig,""), name:'保养'},
                {value:data.allAnnualCount, name:'年检'},
                {value:data.allFaultCount, name:'安全隐患'},
                {value:obj.innerText.replace(/[^0-9]/ig,""), name:'在线电梯'},
                {value:obj2.innerText.replace(/[^0-9]/ig,""), name:'停用电梯'},
               
            ]
       },
    ]
};
circleChart.setOption(circleOption);
}



//电梯状态
function queryLiftStatusCount(){
	$.ajax({
		type : "POST", // post提交方式默认是get
		url : "../../queryLiftStatusCount.do",
		async:false,
		error : function(request) {
			toastr.error("电梯状态获取失败"); 
		},
		success : function(result) {
			var rows = result.result;
			var noramlCount=0;
			var warningCount=0;
			var checkCount=0;
			var stopCount=0;
			var faultCount=0;
			var totalCount=0;
			if(rows != undefined){
				if(rows.normalCount!= undefined){
					noramlCount = rows.normalCount;
				}
				if(rows.warningCount!= undefined){
					warningCount = rows.warningCount;
				}
				if(rows.checkCount!= undefined){
					checkCount = rows.checkCount;
				}
				if(rows.stopCount!= undefined){
					stopCount = rows.stopCount;
				}
				if(rows.faultCount!= undefined){
					faultCount = rows.faultCount;
				}
				if(rows.totalCount!= undefined){
					totalCount = rows.totalCount;
				}
			}
			$("#allCount>p").html(totalCount);
			$("#faultCount>p").html(faultCount);
			$("#warningCount>p").html(warningCount);
			$("#stopCount>p").html(stopCount);
			var  zaixian=totalCount-stopCount;
			$("#data_upload").html('<span class="span_load"></span><p id="p1">在线电梯'+zaixian+'台</p>');
			$("#repair_overtime").html('<span class="span_over"></span><p id="p2">停用电梯'+stopCount+'台</p>');
			
		}
	})
	

}
//人员数目
function queryMaintStaffActivePercent(){
	$.ajax({
		type : "POST", // post提交方式默认是get
		url : "../../queryMaintStaffActivePercent.do",
		async:false,
		error : function(request) {
			toastr.error("维保人员总数获取失败");  
		},
		success : function(result) {
			if(result.success){
				var rows = result.result;
				$("#total_count>p").html(rows.maintTotalCount);
			}
			
		}
	})
	
}
//圆环图形数据
function queryLiftAllWarningInfoCount(){
	$.ajax({
		type : "POST", // post提交方式默认是get
		url : "../../queryLiftAllWarningInfoCount.do",
		error : function(request) {
			 (JSON.stringify(request), "", "error"); 
		},
		success : function(result) {
			if(result.success){
				var rows = result.result;

				$("#annual").html('<span class="span_annual"></span><p onclick="weibaijilu()">待年检'+rows.allAnnualCount+'台</p>');
				$("#danger").html('<span class="span_safe"></span><p onclick="jiankong()">安全隐患'+rows.allFaultCount+'台</p>');
                
				getCircleData(result.result);
			}
		}
	})

}
//今日带维保状态
temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		limit : 100000, //当前第几条
		offset : 0 //每页几条
	};
function queryProtection(){
	temp['param1'] = 1;  //待维保
	    $.ajax({
		        type:"post",
		        url:"../../queryMaintPlanList.do", 
		        data :JSON.stringify(temp),
		        contentType: "application/json",
		        success:function(data){
		         $('#protection i').eq(0).text(data.total);
				 $("#maintain").html('<span class="span_keep" ></span><p id="p3" onclick="weibaijilu()">待维保'+data.total+'台</p>');
		        },
		        error:function(data){
		        }
		    });
}
function queryCompleted(){
	temp['param1'] = 2;  //已完成
	    $.ajax({
		        type:"post",
		        url:"../../queryMaintPlanList.do", 
		        data :JSON.stringify(temp),
		        contentType: "application/json",
		        success:function(data){
		         $('#completed i').eq(0).text(data.total);
		        },
		        error:function(data){
		        }
		    });
}
function queryOverdue(){
	temp['param1'] = 3;  //超期
	    $.ajax({
		        type:"post",
		        url:"../../queryMaintPlanList.do", 
		        data :JSON.stringify(temp),
		        contentType: "application/json",
		        success:function(data){
		         $('#overdue i').eq(0).text(data.total);
		        },
		        error:function(data){
		        }
		    });
}
queryProtection();  //待维保数量
queryCompleted();   //已完成数量
queryOverdue();     //超期数量  
//折线图数据
//当前系统时间
window.onload=function(){  
setInterval(function(){   
var date=new Date();   
var year=date.getFullYear(); //获取当前年份 
var mon=date.getMonth()+1; //获取当前月份   
var da=date.getDate(); //获取当前日
var h=date.getHours(); //获取小时   
var m2=date.getMinutes(); //获取分钟   
var  a;
if(document.getElementById("Date")){
if(m2<10){
	 a="0"+m2.toString();
	 document.getElementById('Date').innerHTML=''+h+':'+a
    }else{
    	document.getElementById('Date').innerHTML=''+h+':'+m2;
}
 }},1000) 
 
}
//选择日还是月
$("#myselect").change(function(){
	var  data=$("#myselect").val()  ;
    querElevatorfailure(data);
});
function GetDateStr(AddDayCount) { 
	   var dd = new Date();
	   dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
	   var y = dd.getFullYear(); 
	   var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
	   var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0
	   return y+"-"+m+"-"+d; 
	}
function GetDateStr2(AddDayCount) { 
	   var dd = new Date();
	   dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
	   var y = dd.getFullYear(); 
	   var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
	   var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0
	   return m+"-"+d; 
	}
var last_year_month = function() {
	var d = new Date();
	var result = [];
	result.push(d.getFullYear() + "-" + (d.getMonth()+1));
	for(var i = 0; i < 6; i++) {
		d.setMonth(d.getMonth() - 1);
		var m = d.getMonth() + 1;
		m = m < 10 ? "0" + m : m;
		//在这里可以自定义输出的日期格式
		result.push(d.getFullYear() + "-" + m);
	}
	return result;
}

function  querElevatorfailure(data){
	if(data=="日"){
		var   failure=[] ;//当前年月日
		failure.push(GetDateStr(-6));
		failure.push(GetDateStr(-5));
		failure.push(GetDateStr(-4));
		failure.push(GetDateStr(-3));
		failure.push(GetDateStr(-2));
		failure.push(GetDateStr(-1));
		failure.push(GetDateStr(0));
		var   failure2=[] ;//当前年月（没有日）
		failure2.push(GetDateStr2(-6));
		failure2.push(GetDateStr2(-5));
		failure2.push(GetDateStr2(-4));
		failure2.push(GetDateStr2(-3));
		failure2.push(GetDateStr2(-2));
		failure2.push(GetDateStr2(-1));
		failure2.push(GetDateStr2(0));
		$.ajax({
	        url:'../../querElevatorfailureaaa.do',
	        type:'POST',
	        contentType: 'application/json; charset=UTF-8',
	        async:false,
	        dataType:'json',
	        data:JSON.stringify(failure),
	        success: function (response) {
	        	queryBrokeChart(failure2,response);
	        }
	    })	
	   
	} 
	if(data=="月"){
		$.ajax({
	        url:'../../querElevatorfailureMonth.do',
	        type:'POST',
	        contentType: 'application/json; charset=UTF-8',
	        async:false,
	        dataType:'json',
	        data:JSON.stringify(last_year_month().reverse()),
	        success: function (response) {
	        	queryBrokeChart(last_year_month().reverse(),response);
	        }
	    })	
	   
	}

}
function  xuanxka(){
	$(".menuTabs .page-tabs-content").append('<a href="javascript:;" class="active menuTab" data-id="jpg/maintManage/project.jpg">项目信息 <i class="fa fa-remove"></i></a>');
    $(".mainContent").append('<iframe class="LRADMS_iframe" id="iframe19" name="iframe19"  width="100%" height="100%" src="jpg/maintManage/project.jpg" frameborder="0" data-id="jpg/maintManage/project.jpg" seamless></iframe>')
}