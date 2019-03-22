queryLiftStatusCount();
queryLiftAllRepairTimeOutCount();
queryLiftNoramlPercent();
addQueryCenterRegion();
/*centerMap();*/
/*centerMap2();*/
function queryLiftStatusCount(){
	$.ajax({
		type : "POST", // post提交方式默认是get
		url : "queryLiftStatusCount.do",
		async:false,
		error : function(request) {
			 (JSON.stringify(request), "", "error"); 
		},
		success : function(result) {
			var rows = result.result;
			
			var liftCount = rows.totalCount1.split("");
			var liftCountSpan='<h1>电 梯 总 台 量  : </h1>';
			for (var i = 0; i < liftCount.length; i++) {
				liftCountSpan+="<span>"+liftCount[i]+"</span>"
			}
			$("#lift_total_count").html(liftCountSpan);
			/*var nameData =["正常","异常","检修","停用"];
			var valueDate=[noramlCount,warningCount,checkCount,stopCount];
			var data = [];
			for (var i = 0; i < 4; i++) {
    			data[i]=new city(valueDate[i],nameData[i]);
			}*/
			leftTop2(rows);
			/*var nameColorData =["white","white","white","white"];
			var colorData =['#3E9CFE','#6EBEFF','#91D4FF','#2383FE'];
			var valueData =[GetPercent1(stopCount,totalCount),GetPercent1(checkCount,totalCount),GetPercent1(warningCount,totalCount),GetPercent1(noramlCount,totalCount)];
			var data = new Array();
			for (var i = 0; i < 4; i++) {
    			data[i]=new leftData(nameData[i],nameColorData[i],colorData[i],valueData[i]);
			}*/
			
			/*$("#left_status_btm").html('<canvas id="canvas" width="400" height="300"></canvas>');
			getLeftTop(data);*/
		}
	})
	var m=20;
	var n=30;
	var time = parseInt(Math.random()*(n-m+1)+m);
	setTimeout('queryLiftStatusCount()',time*1000);
}

function leftTop2(rows){
	var noramlCount=0;
	var warningCount=0;
	var checkCount=0;
	var stopCount=0;
	var totalCount=0;
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
	if(rows.totalCount!= undefined){
		totalCount = rows.totalCount;
	}
	var pieChart = echarts.init(document.getElementById('left_status_canvas'));
	option = {
			/*color: ['#91D4FF','#91D4FF','#91D4FF','#91D4FF'],*/
			color: ['#2383FE','#91D4FF','#6EBEFF','#3E9CFE'],
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    /*legend: {
		        type: 'scroll',
		        orient: 'vertical',
		        right: 10,
		        top: 20,
		        bottom: 20,
		        data: [{
		                value: noramlCount,
		                name: '正常',
		            },
		            {
		                value: warningCount,
		                name: '异常',
		            },
		            {
		                value: checkCount,
		                name: '检修',
		            },
		            {
		                value: stopCount,
		                name: '停用',
		            },
		        ]
		    },*/
		    calculable : true,
		    series : [
		        {
		        	name: '电梯状态',
			        type: 'pie',
			        radius: '80%',
			        center: ['50%', '52%'],
			        label: {
			            normal: {
			                show: true,
			            },
			        },
			        data:[
			        	{
			                value: noramlCount,
			                name: '正常',
			            },
			            {
			                value: warningCount,
			                name: '异常',
			            },
			        	{
			                value: checkCount,
			                name: '检修',
			            },			            
			            {
			                value: stopCount,
			                name: '停用',
			            }   
			        ],
			        itemStyle: {
			        	normal: {
			        		borderWidth:0,
			        		borderColor:'#fff',
			            },
			            /*emphasis: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0,
		                    shadowColor: '#000'
		                }*/
		            }
		        }
		    ]
	};
	pieChart.setOption(option);
}
	
function leftData(name,nameColor,color,value) { 
	this.name = name; 
	this.nameColor = nameColor;
	this.color = color;
	this.value = value;
}
///计算两个整数的百分比值 
function GetPercent(num, total) { 
	num = parseFloat(num); 
	total = parseFloat(total); 
	if (isNaN(num) || isNaN(total)) { 
		return "-"; 
	} 
	return total <= 0 ? 0 : (Math.round(num / total * 10000) / 100.00/100.00 ); 
}

function GetPercent1(num, total) { 
	num = parseFloat(num); 
	total = parseFloat(total); 
	if (isNaN(num) || isNaN(total)) { 
		return "-"; 
	} 
	return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00+"%" ); 
}
function getLeftTop(dataArr){
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d"); //图画绘制对象
	// 参数分别是：圆心横坐标、纵坐标、半径、开始的角度、结束的角度、是否逆时针
	ctx.clearRect(x0,y0,radius,beginAngle,endAngle,false);
	//1.创建数据包(信息) 
	/*	var dataArr = [ {name:'停用', nameColor:'white',color:'#91D4FF', value:0.1}, 
					{name:'检修', nameColor:'white',color:'#6EBEFF', value:0.1}, 
					{name:'异常', nameColor:'white',color:'#3E9CFE', value:0.1}, 
					{name:'正常', nameColor:'white',color:'#2383FE', value:0.7}
				];*/ 
	//2.定义圆心
	var x0 = canvas.width * 0.5, y0 = canvas.height * 0.5;
	//显示在画布中间 
	//2.1定义半径
	var radius = 145; 
	//2.2定义起始角度 
	var beginAngle = -90 *Math.PI/180;
	//(定义初始角度为-90deg)
	//3.遍历,绘制扇形 
	for (var i = 0; i < dataArr.length; i++) { 
		var length=dataArr[i].value.length;
		//3.1扇形角度
		var tempAngle = dataArr[i].value.substring(0,length-1)*0.01 * 360 *Math.PI/180; 
		//3.2结束角度 
		var endAngle = beginAngle + tempAngle; 
		//3.3开启路径 
		ctx.beginPath(); 
		//3.4起点 
		ctx.moveTo(x0, y0); 
		//3.5绘制弧度 
		radius = radius-0;
		ctx.arc(x0, y0, radius, beginAngle, endAngle); 
		//3.6设置颜色 
		ctx.fillStyle = dataArr[i].color; 
		//3.7填充 
		ctx.fill(); 
		//4.绘制文字 //4.1常量 
		
		ctx.fillStyle = dataArr[i].nameColor; 
		
		var textAngle = beginAngle + tempAngle * 0.1; 
		//角度 
		var text ="";
		if(dataArr[i].value!=0){
			text = dataArr[i].name + dataArr[i].value; 
		}		
		//4.2文字坐标		
		var textX,textY; 
			switch(i){
				case 0:
				textX = x0 + (radius -110) * Math.cos(textAngle); 
				textY = y0 + (radius - 40) * Math.sin(textAngle); 
				break;
				case 1:
				textX = x0 + (radius - 70) * Math.cos(textAngle); 
				textY = y0 + (radius - 40) * Math.sin(textAngle); 
				break;
				case 2:
				textX = x0 + (radius - 70) * Math.cos(textAngle); 
				textY = y0 + (radius - 60) * Math.sin(textAngle); 
				break;
				case 3:
				textX = x0 + (radius - 90) * Math.cos(textAngle); 
				textY = y0 + (radius - 70) * Math.sin(textAngle); 
				break;
			}
		
		
		//4.3文字字号和字体
		ctx.font = "1.2rem '微软雅黑'"; 
		//4.4判断文字是否在左边 
		if((textAngle > 90 *Math.PI/180) && (textAngle < 270 *Math.PI/180))
		{ 
			ctx.textAlign = 'end';
			//文字的右侧在基线的左端 
		} 
		//4.5 绘制文字 
		ctx.fillText(text, textX, textY); 
		//5.更新起始角度, 将当前扇形的结束角度作为下一个扇形的起始角度 
		beginAngle = endAngle; 
		
	}
	
}
	
function queryLiftAllRepairTimeOutCount(){
	$.ajax({
		type : "POST", // post提交方式默认是get
		url : "queryLiftAllWarningInfoCount.do",
		async:false,
		error : function(request) {
			 (JSON.stringify(request), "", "error"); 
		},
		success : function(result) {
			if(result.success){
				var rows = result.result;
				$("#allFaultCount").text(rows.allFaultCount);
				$("#allMaintCount").text(rows.allMaintCount);
				$("#allAnnualCount").text(rows.allAnnualCount);
				$("#allRepairTimeOutCount").text(rows.allRepairTimeOutCount);
				$("#allDataUploadCount").text(rows.allDataUploadCount);
				rightTop(rows);
			}
		}
	})
	var m=20;
	var n=30;
	var time = parseInt(Math.random()*(n-m+1)+m);
	setTimeout('queryLiftAllRepairTimeOutCount()',time*1000);
}	
function rightTop(data){

	pieChart = echarts.init(document.getElementById('right_warn_canvas'))
	barOption = {
	    tooltip: { //指示线
	        trigger: 'axis',
	        axisPointer: {
	            type: 'cross',
	            crossStyle: {
	                color: '#999'
	            }
	        }
	    },
	    grid: {
	        top: '30',
	        bottom: '80'
	    },
	    xAxis: {
	        type: 'category',
	        axisLine: {
	            lineStyle: {
	                type: 'solid',
	                color: '#144277', //坐标线的颜色
	            }
	        },
	        axisLabel: {
	            show: true,
	            color: '#fff', //水平方向的字体颜色
	            interval: '0',
	            formatter: function (value) {
	                return value.split("").join("\n");
	            } //文字垂直显示
	        },
	        data: ['数据上传', '维修超时', '年检', '保养', '安全隐患']
	    },
	    yAxis: [{
	        type: 'value',
	        name: '单位：台',
	        nameTextStyle: {
	            color: '#0AC8D0',
	            top:'3%'
	        },
	        max: 100,
	        min: 0,
	        interval: 20,
	        axisLine: {
	            lineStyle: {
	                type: 'solid',
	                color: '#144277', //坐标线的颜色
	                // width:'2'//坐标线的宽度
	            }
	        },
	        axisLabel: {
	            formatter: '{value}',
	            color: '#fff'
	        },
	        splitLine: {
	            show: false
	        } //去掉网格图
	    }],
	    series: [{
	        name: '预警信息',
	        type: 'bar',
	        barWidth: '45%',
	        label: {
	            normal: {
	                show: true,
	                position: 'top',
	                
	            }
	        },
	        itemStyle: {
	            normal: {
	                color: function (params){
	                        var colorList = ['#8fd1fb','#60bbff','#409eff','#197EFF','#055BF8'];
	                        return colorList[params.dataIndex];
	                    }

	            }
	        },	        
	        data: [data.allDataUploadCount, data.allRepairTimeOutCount, data.allAnnualCount,data.allMaintCount, data.allFaultCount]
	    }]
	};
	pieChart.setOption(barOption);
	/*var dataTotal= data.allMaintCount+data.allFaultCount+data.allAnnualCount+data.allDataUploadCount+data.allRepairTimeOutCount;
	右边圆形图(南丁格尔玫瑰图)
	var pieChart = echarts.init(document.getElementById('right_warn_canvas'));
	option = {
	title: {
		x: 'center'
	},
	tooltip: {
		trigger: 'item',
		formatter: "{b} : {c}({d}%)"
	},
	grid: {

		left: '0%',

		right: '50%',

		bottom: '0%',containLabel: true

	},
	calculable: true,
	graphic: { //圆心显示
		type: 'image', //类型为图片
		left: '51%',
		top: 'center',
		style: {
			image: 'img/monitor/white_circle.png',
			width: 20,
			height: 20,
		}
	},
	series: [
		{
			name: '预警信息',
			type: 'pie',
			radius: [16, 120], //圆心设置为空 
			center: ['53%', '50%'],
			roseType: 'area', //设置面积区域突出
			data: [{
				value: data.allFaultCount,
				name: '安全隐患'
				
			},
			{
				value: data.allMaintCount,
				name: '保养'
				
			},
			{
				value: data.allAnnualCount,
				name: '年检'
			},
			{
				value: data.allRepairTimeOutCount,
				name: '维修超时'
			},
			{
				value: data.allDataUploadCount,
				name: '数据上传'
				
			}
		],

			itemStyle: { //指示线控制

				normal: {

					//标线长度，宽度

					labelLine: {

						show: true,

						length:1.2,

						lineStyle: {

							width:0.2

						}

					}

				},
			},

		}
	],
	color: ['#96d4fb', '#2383fe', '#3997fb', '#60acfa', '#7ac8f9'],
};
	pieChart.setOption(option);*/
}	

function queryLiftNoramlPercent(){
	$.ajax({
		type : "POST", // post提交方式默认是get
		url : "queryLiftNoramlPercent.do",
		async:false,
		error : function(request) {
			 (JSON.stringify(request), "", "error"); 
		},
		success : function(result) {
			if(result.success){
				rightBottom(result.result);
			}
		}
	})
	var m=20;
	var n=30;
	var time = parseInt(Math.random()*(n-m+1)+m);
	setTimeout('queryLiftNoramlPercent()',time*1000);
}
function rightBottom(data){
	/*右边折线图*/
	var brokeChart = echarts.init(document.getElementById('right_health_btm'));
	var brokeOption = {
		title: {
			text: ''
		},
		tooltip: {
			 trigger: 'axis',
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
			boundaryGap:true,
			axisTick: { //y轴刻度线
				"show": false,
			},
			axisLine: {
				lineStyle: {
					color: '#0e173c',
				}
			},
			axisLabel: {
				color: "#fff" //刻度线标签颜色
			},
			splitLine: {
				"show": true,
				"lineStyle": {
					color: ['#0e173c'],
					width: 1,
					type: 'solid'

				}
			},
			data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
		},
		yAxis: {
			max: '100',
			splitNumber: '10',
			type: 'value',
			axisTick: { //y轴刻度线
				"show": false,
			},
			axisLabel: {
				color: "#fff" //刻度线标签颜色
			},
			axisLine: {
				lineStyle: {
					color: '#0e173c'
				},
			},
			splitLine: {
				"show": true,
				"lineStyle": {
					color: ['#0e173c'],
					width:1,
					type: 'solid'
				}
			},
		},
		series: [
			{
				name: '电梯健康指数',
				type: 'line',
				stack: '电梯健康指数',
				type: 'line',
	            showSymbol: true,
	            symbol: 'circle',     //设定为实心点
	            symbolSize:7,   //设定实心点的大小
				itemStyle: {
					normal: {
						color: '#2383fe',
						fontSize:38,
						lineStyle: {
							color: '#2383fe',
							width: 1,
						}
					}
				},
				data: [data.percent1,data.percent2,data.percent3,data.percent4,data.percent5,data.percent6,data.percent7,data.percent8,data.percent9,data.percent10,data.percent11,data.percent12]
			},
		]
	};
	brokeChart.setOption(brokeOption);
}
function centerMap(){
	/*地图*/
	var mapChart = echarts.init(document.getElementById('map'));
	var geoCoordMap = {
		    '上海': [121.4648,31.2891],
		    '东莞': [113.8953,22.901],
		    '东营': [118.7073,37.5513],
		    '中山': [113.4229,22.478],
		    '临汾': [111.4783,36.1615],
		    '临沂': [118.3118,35.2936],
		    '丹东': [124.541,40.4242],
		    '丽水': [119.5642,28.1854],
		    '乌鲁木齐': [87.9236,43.5883],
		    '佛山': [112.8955,23.1097],
		    '保定': [115.0488,39.0948],
		    '兰州': [103.5901,36.3043],
		    '包头': [110.3467,41.4899],
		    '北京': [116.4551,40.2539],
		    '北海': [109.314,21.6211],
		    '南京': [118.8062,31.9208],
		    '南宁': [108.479,23.1152],
		    '南昌': [116.0046,28.6633],
		    '南通': [121.1023,32.1625],
		    '厦门': [118.1689,24.6478],
		    '台州': [121.1353,28.6688],
		    '合肥': [117.29,32.0581],
		    '呼和浩特': [111.4124,40.4901],
		    '咸阳': [108.4131,34.8706],
		    '哈尔滨': [127.9688,45.368],
		    '唐山': [118.4766,39.6826],
		    '嘉兴': [120.9155,30.6354],
		    '大同': [113.7854,39.8035],
		    '大连': [122.2229,39.4409],
		    '天津': [117.4219,39.4189],
		    '太原': [112.3352,37.9413],
		    '威海': [121.9482,37.1393],
		    '宁波': [121.5967,29.6466],
		    '宝鸡': [107.1826,34.3433],
		    '宿迁': [118.5535,33.7775],
		    '常州': [119.4543,31.5582],
		    '广州': [113.5107,23.2196],
		    '廊坊': [116.521,39.0509],
		    '延安': [109.1052,36.4252],
		    '张家口': [115.1477,40.8527],
		    '徐州': [117.5208,34.3268],
		    '德州': [116.6858,37.2107],
		    '惠州': [114.6204,23.1647],
		    '成都': [103.9526,30.7617],
		    '扬州': [119.4653,32.8162],
		    '承德': [117.5757,41.4075],
		    '拉萨': [91.1865,30.1465],
		    '无锡': [120.3442,31.5527],
		    '日照': [119.2786,35.5023],
		    '昆明': [102.9199,25.4663],
		    '杭州': [119.5313,29.8773],
		    '枣庄': [117.323,34.8926],
		    '柳州': [109.3799,24.9774],
		    '株洲': [113.5327,27.0319],
		    '武汉': [114.3896,30.6628],
		    '汕头': [117.1692,23.3405],
		    '江门': [112.6318,22.1484],
		    '沈阳': [123.1238,42.1216],
		    '沧州': [116.8286,38.2104],
		    '河源': [114.917,23.9722],
		    '泉州': [118.3228,25.1147],
		    '泰安': [117.0264,36.0516],
		    '泰州': [120.0586,32.5525],
		    '济南': [117.1582,36.8701],
		    '济宁': [116.8286,35.3375],
		    '海口': [110.3893,19.8516],
		    '淄博': [118.0371,36.6064],
		    '淮安': [118.927,33.4039],
		    '深圳': [114.5435,22.5439],
		    '清远': [112.9175,24.3292],
		    '温州': [120.498,27.8119],
		    '渭南': [109.7864,35.0299],
		    '湖州': [119.8608,30.7782],
		    '湘潭': [112.5439,27.7075],
		    '滨州': [117.8174,37.4963],
		    '潍坊': [119.0918,36.524],
		    '烟台': [120.7397,37.5128],
		    '玉溪': [101.9312,23.8898],
		    '珠海': [113.7305,22.1155],
		    '盐城': [120.2234,33.5577],
		    '盘锦': [121.9482,41.0449],
		    '石家庄': [114.4995,38.1006],
		    '福州': [119.4543,25.9222],
		    '秦皇岛': [119.2126,40.0232],
		    '绍兴': [120.564,29.7565],
		    '聊城': [115.9167,36.4032],
		    '肇庆': [112.1265,23.5822],
		    '舟山': [122.2559,30.2234],
		    '苏州': [120.6519,31.3989],
		    '莱芜': [117.6526,36.2714],
		    '菏泽': [115.6201,35.2057],
		    '营口': [122.4316,40.4297],
		    '葫芦岛': [120.1575,40.578],
		    '衡水': [115.8838,37.7161],
		    '衢州': [118.6853,28.8666],
		    '西宁': [101.4038,36.8207],
		    '西安': [109.1162,34.2004],
		    '贵阳': [106.6992,26.7682],
		    '连云港': [119.1248,34.552],
		    '邢台': [114.8071,37.2821],
		    '邯郸': [114.4775,36.535],
		    '郑州': [113.4668,34.6234],
		    '鄂尔多斯': [108.9734,39.2487],
		    '重庆': [107.7539,30.1904],
		    '金华': [120.0037,29.1028],
		    '铜川': [109.0393,35.1947],
		    '银川': [106.3586,38.1775],
		    '镇江': [119.4763,31.9702],
		    '长春': [125.8154,44.2584],
		    '长沙': [113.0823,28.2568],
		    '长治': [112.8625,36.4746],
		    '阳泉': [113.4778,38.0951],
		    '青岛': [120.4651,36.3373],
		    '韶关': [113.7964,24.7028]
		};

		var BJData = [
		    [{name:'北京'}, {name:'上海',value:90}],
		    [{name:'北京'}, {name:'广州',value:90}],
		    [{name:'北京'}, {name:'大连',value:90}],
		    [{name:'北京'}, {name:'南宁',value:90}],
		    [{name:'北京'}, {name:'南昌',value:90}],
		    [{name:'北京'}, {name:'拉萨',value:90}],
		    [{name:'北京'}, {name:'长春',value:90}],
		    [{name:'北京'}, {name:'包头',value:90}],
		    [{name:'北京'}, {name:'重庆',value:90}],
		    [{name:'北京'}, {name:'常州',value:90}]
		];

		/*var SHData = [
		    [{name:'上海'},{name:'包头',value:95}],
		    [{name:'上海'},{name:'昆明',value:90}],
		    [{name:'上海'},{name:'广州',value:80}],
		    [{name:'上海'},{name:'郑州',value:70}],
		    [{name:'上海'},{name:'长春',value:60}],
		    [{name:'上海'},{name:'重庆',value:50}],
		    [{name:'上海'},{name:'长沙',value:40}],
		    [{name:'上海'},{name:'北京',value:30}],
		    [{name:'上海'},{name:'丹东',value:20}],
		    [{name:'上海'},{name:'大连',value:10}]
		];

		var GZData = [
		    [{name:'广州'},{name:'福州',value:95}],
		    [{name:'广州'},{name:'太原',value:90}],
		    [{name:'广州'},{name:'长春',value:80}],
		    [{name:'广州'},{name:'重庆',value:70}],
		    [{name:'广州'},{name:'西安',value:60}],
		    [{name:'广州'},{name:'成都',value:50}],
		    [{name:'广州'},{name:'常州',value:40}],
		    [{name:'广州'},{name:'北京',value:30}],
		    [{name:'广州'},{name:'北海',value:20}],
		    [{name:'广州'},{name:'海口',value:10}]
		];*/

		var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

		var convertData = function (data) {
		    var res = [];
		    for (var i = 0; i < data.length; i++) {
		        var dataItem = data[i];
		        var fromCoord = geoCoordMap[dataItem[0].name];
		        var toCoord = geoCoordMap[dataItem[1].name];
		        if (fromCoord && toCoord) {
		            res.push({
		                fromName: dataItem[0].name,
		                toName: dataItem[1].name,
		                coords: [fromCoord, toCoord]
		            });
		        }
		    }
		    return res;
		};
		var color = ['#00FFFF'];
		var series = [];
		[['北京', BJData]].forEach(function (item, i) {
		    series.push(/*{
		        name: item[0],
		        type: 'lines',
		        zlevel: 1,
		        effect: {
		            show: true,
		            period: 6,
		            trailLength: 0.7,
		            color: '#fff',
		            symbolSize: 3
		        },
		        bottom: '150%',
		        lineStyle: {
		            normal: {
		                color: color[i],
		                width: 0,
		                curveness: 0.2
		            }
		        },
		        data: convertData(item[1])
		    },
		    {
		        name: item[0],
		        type: 'lines',
		        zlevel: 2,
		        symbol: ['none', 'pin'],
		        symbolSize: 10,
		        effect: {
		            show: true,
		            period: 6,
		            trailLength: 0,
		            symbol: 'pin', //'circle（默认）'圆形, 'rect'正方形, 'roundRect'圆角正方形, 'triangle'三角形, 'diamond'菱形, 'pin',小圆形 'arrow'圆三角
		            symbolSize: 15
		        },
		        lineStyle: {
		            normal: {
		                color: color[i],
		                width: 1,
		                opacity: 0.6,
		                curveness: 0.2
		            }
		        },
		        data: convertData(item[1])
		    },*/
		    {
		        name: item[0],
		        type: 'effectScatter',
		        coordinateSystem: 'geo',
		        zlevel: 2,
		        rippleEffect: {
		            brushType: 'stroke'
		        },
		        label: {
		            normal: {
		                show: false,
		                position: 'right',
		                formatter: '{b}'
		            }
		        },
		        symbolSize: function (val) {
		            return val[2] / 8;
		        },
		        itemStyle: {
		            normal: {
		                color: color[i]
		            }
		        },
		        data: item[1].map(function (dataItem) {
		            return {
		                name: dataItem[1].name,
		                value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
		            };
		        })
		    });
		});
		option = {
		    /*backgroundColor: '#0C85D2',*/
/*		    title : {
		        text: '模拟迁徙',
		        subtext: '数据纯属虚构',
		        left: 'center',
		        textStyle : {
		            color: '#fff'
		        }
		    },*/
		    tooltip : {
		        trigger: 'item'
		    },
		    /*legend: {
		        orient: 'vertical',
		        top: 'bottom',
		        left: 'right',
		        data:['北京 Top10', '上海 Top10', '广州 Top10'],
		        textStyle: {
		            color: '#fff'
		        },
		        selectedMode: 'single'
		    },*/
		    geo: {
		        map: 'china',
		        roam: true,
		        itemStyle: {
		           normal: {
		               areaColor: 'none',
		               borderColor: '#0c86d3',//边框颜色
					   borderWidth: '3'
		           },
		           emphasis: {//鼠标经过时的样式  
		               areaColor: '#0c86d3',
		           }
		       },		        
		       label: {
		    	   normal: {//显示省份的名称
	                   show: true,
	                   color:'#0c86d3'
	               },
		           emphasis: {//鼠标经过时的样式  
		               show: true
		           }
		       }
		    },
		    series: series
		    
	};
	mapChart.setOption(option);
}

function centerMap2(dataMap,geoCoordMap){
	//地图容器
	var chart = echarts.init(document.getElementById('map'));
	
	//34个省、市、自治区的名字拼音映射数组
	var provinces = {
	    //23个省
	    "台湾": "taiwan",
	    "河北": "hebei",
	    "山西": "shanxi",
	    "辽宁": "liaoning",
	    "吉林": "jilin",
	    "黑龙江": "heilongjiang",
	    "江苏": "jiangsu",
	    "浙江": "zhejiang",
	    "安徽": "anhui",
	    "福建": "fujian",
	    "江西": "jiangxi",
	    "山东": "shandong",
	    "河南": "henan",
	    "湖北": "hubei",
	    "湖南": "hunan",
	    "广东": "guangdong",
	    "海南": "hainan",
	    "四川": "sichuan",
	    "贵州": "guizhou",
	    "云南": "yunnan",
	    "陕西": "shanxi1",
	    "甘肃": "gansu",
	    "青海": "qinghai",
	    //5个自治区
	    "新疆": "xinjiang",
	    "广西": "guangxi",
	    "内蒙古": "neimenggu",
	    "宁夏": "ningxia",
	    "西藏": "xizang",
	    //4个直辖市
	    "北京": "beijing",
	    "天津": "tianjin",
	    "上海": "shanghai",
	    "重庆": "chongqing",
	    //2个特别行政区
	    "香港": "xianggang",
	    "澳门": "aomen"
	};

	//直辖市和特别行政区-只有二级地图，没有三级地图
	var special = ["北京","天津","上海","重庆","香港","澳门"];
	var mapdata = [];
	//绘制全国地图
	$.getJSON('map/china.json', function(data){
		d = [];
		for( var i=0;i<data.features.length;i++ ){
			d.push({
				name:data.features[i].properties.name
			})
		}
		mapdata = d;
		//注册地图
		echarts.registerMap('china', data);
		//绘制地图
		renderMap('china',d,dataMap,geoCoordMap);
	});
	//初始化绘制全国地图配置
	var option = {
		tooltip : {
	        trigger: 'item'
	    },
	    animationDuration:1000,
		animationEasing:'cubicOut',
		animationDurationUpdate:1000
	     
	};	
	
	function renderMap(map,data,dataMap,geoCoordMap){
		    var geoCoordMap=geoCoordMap;
		    var bJData = new Object();
			bJData['name']='北京';
			var BJData = [];
			for (var i = 0; i < dataMap.length; i++) {
				BJData[i]=[bJData,dataMap[i]]
			}
			var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
			var convertData = function (data) {
			    var res = [];
			    for (var i = 0; i < data.length; i++) {
			        var dataItem = data[i];
			        var fromCoord = geoCoordMap[dataItem[0].name];
			        var toCoord = geoCoordMap[dataItem[1].name];
			        if (fromCoord && toCoord) {
			            res.push({
			                fromName: dataItem[0].name,
			                toName: dataItem[1].name,
			                coords: [fromCoord, toCoord]
			            });
			        }
			    }
			    return res;
			};
			var color = ['#00FFFF'];
			var series = [];
			var series4={
		    	name: map,
	            type: 'map',
	            mapType: map,
	            roam: true,
	            nameMap:{
				    'china':'中国'
				},
				itemStyle: {
		           normal: {
		               areaColor: 'none',
		               borderColor: '#0c86d3',//边框颜色
					   borderWidth: '3'
		           },
		           emphasis: {//鼠标经过时的样式  
		               areaColor: '#0c86d3',
		           }
		       },		        
		       label: {
		    	   normal: {//显示省份的名称
	                   show: true,
	                   color:'#0c86d3'
	               },
		           emphasis: {//鼠标经过时的样式  
		               show: true
		           }
		       },
	           data:data
	        };
			[['北京', BJData]].forEach(function (item, i) {
				var series1={
				        name: item[0],
				        type: 'lines',
				        zlevel: 1,
				        bottom: '150%',
				        lineStyle: {
				            normal: {
				                color: color[i],
				                width: 0,
				                curveness: 0.2
				            }
				        },
				        data: convertData(item[1])
				}
				var series2={
				        name: item[0],
				        type: 'lines',
				        zlevel: 2,
				        symbol: ['none', 'pin'],
				        symbolSize: 10,
				        lineStyle: {
				            normal: {
				                color: color[i],
				                width: 1,
				                opacity: 0.6,
				                curveness: 0.2
				            }
				        },
				        data: convertData(item[1])
				}
				var series3={
			        name: item[0],
			        type: 'effectScatter',
			        coordinateSystem: 'geo',
			        zlevel: 2,
			        rippleEffect: {
			            brushType: 'stroke'
			        },
			        clickable:true,
			        label: {
			            normal: {
			                show: false,
			                position: 'right',
			                formatter: '{b}'
			            }
			        },
			        symbolSize: function (value) {
			            return value[2]/8;
			        },
			        itemStyle: {
			            normal: {
			                color: color[i]
			            }
			        },
			        data: item[1].map(function (dataItem) {
			        	return {
			                name: dataItem[1].name,
			                value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
			            };
			        })
			    }
			    series.push(series1,series2,series3);
			});
			var geo = {
					map: 'china',
				    roam: true,
					itemStyle: {
			           normal: {
			               areaColor: 'none',
			               borderColor: '#0c86d3',//边框颜色
						   borderWidth: '3'
			           },
			           emphasis: {//鼠标经过时的样式  
			               areaColor: '#0c86d3',
			           }
			       },		        
			       label: {
			    	   normal: {//显示省份的名称
		                   show: true,
		                   color:'#0c86d3'
		               },
			           emphasis: {//鼠标经过时的样式  
			               show: true
			           }
			       },
		           data:data
		        }
			option.series=series;
			option.geo=geo;
			chart.setOption(option);
	}
	
	
	//地图点击事件
	chart.on('click', function (params) {
		var regionName= params.name;
		var data = new Object();
		data['regionName']=regionName;
	    $.ajax({
	    	type : "POST", // post提交方式默认是get
	    	url : "queryRegionLiftByRegionCenterName.do",// 得到上方选择的状态的电梯
	    	cache:false,
	    	async: false,
	    	contentType : 'application/json;charset=utf-8',
	    	data :JSON.stringify(data),	
	    	error : function(request) {
	    		swal(JSON.stringify(request), "", "error");
	    	},
	    	success : function(data) {
	    		var result=data.result;
	    		if(result!=null){
	    			var dataMap = [];
	        		var dtName;
	        		var objR= new Object();
	        		for (var i = 0; i < result.length; i++) {
	        			dataMap[i]=new city(result[i].lift_equipment_code,"90")
	    				dtName=result[i].lift_equipment_code;
	    				objR[dtName]=[result[i].lift_lag,result[i].lift_lat];
	    			}
	        		$.getJSON('map/city/'+cityMap[result[0].region_scope_city]+'.json', function(data){
						echarts.registerMap( result[0].region_scope_city, data);
						var d = [];
						for( var i=0;i<data.features.length;i++ ){
							d.push({
								name:data.features[i].properties.name
							})
						}
						renderMapClick(result[0].region_scope_city,d,dataMap,objR);
					});	
	    			
	    		}
	    	}
	    });
		/*if( params.name in provinces ){
			//如果点击的是34个省、市、自治区，绘制选中地区的二级地图
			$.getJSON('map/province/'+ provinces[params.name] +'.json', function(data){
				echarts.registerMap( params.name, data);
				var d = [];
				for( var i=0;i<data.features.length;i++ ){
					d.push({
						name:data.features[i].properties.name
					})
				}
				renderMap(params.name,d);
			});
		}else if( params.seriesName in provinces ){
			//如果是【直辖市/特别行政区】只有二级下钻
			if(  special.indexOf( params.seriesName ) >=0  ){
				renderMap('china',mapdata);
			}else{
				//显示县级地图
				$.getJSON('map/city/'+ cityMap[params.name] +'.json', function(data){
					echarts.registerMap( params.name, data);
					var d = [];
					for( var i=0;i<data.features.length;i++ ){
						d.push({
							name:data.features[i].properties.name
						})
					}
					renderMapClick(params.name,d);
				});	
			}	
		}else{
			renderMapClick('china',mapdata);
		}*/
	});
	
	function renderMapClick(map,d,data,geoCoordMap){
		$("#map").css("display","none");
		$("#mapProvince").css("display","block");
		var geoCoordMap=geoCoordMap;
		var convertData = function (data) {
		   var res = [];
		   for (var i = 0; i < data.length; i++) {
		       var geoCoord = geoCoordMap[data[i].name];
		       if (geoCoord) {
		           res.push({
		               name: data[i].name,
		               value: geoCoord.concat(data[i].value)
		           });
		       }
		   }
		   return res;
		};
		var coldCar = [ { "name": "车辆1", "value": [107.615944, 27.479744, 2] }, { "name": "车辆2", "value": [108.296644, 27.676476, 2] } ]
		var mychart = echarts.init(document.getElementById('mapProvince'));
		var option = {
				tooltip: { 
					show: true, 
					trigger: 'item', 
					triggerOn: 'click', 
					formatter: "名称:{b}<br />坐标:{c}" 
				}, 
				series: [{
			    	name: map,
		            type: 'map',
		            mapType: map,
		            roam: true,
		            nameMap:{
					    'china':'中国'
					},
					itemStyle: {
			           normal: {
			               areaColor: 'none',
			               borderColor: '#0c86d3',//边框颜色
						   borderWidth: '3'
			           },
			           emphasis: {//鼠标经过时的样式  
			               areaColor: '#0c86d3',
			           }
			       },		        
			       label: {
			    	   normal: {//显示省份的名称
		                   show: true,
		                   color:'#0c86d3'
		               },
			           emphasis: {//鼠标经过时的样式  
			               show: true
			           }
			       },
		           data:convertData(data)
		        },{
			        name: map,
			        type: 'effectScatter',
			        coordinateSystem: 'geo',
			        zlevel: 2,
			        rippleEffect: {
			            brushType: 'stroke'
			        },
			        clickable:false,
			        label: {
			            normal: {
			                show: false,
			                position: 'right',
			                formatter: '{b}'
			            }
			        },
			        symbolSize: 50,
			        itemStyle: {
			            normal: {
			                color: '#00FFFF'
			            }
			        },
			        data: convertData(data),
				   }
			    ]

		};
		/*var series = [];
		var series3={
		        name: map,
		        type: 'effectScatter',
		        coordinateSystem: 'geo',
		        zlevel: 2,
		        rippleEffect: {
		            brushType: 'stroke'
		        },
		        clickable:false,
		        label: {
		            normal: {
		                show: false,
		                position: 'right',
		                formatter: '{b}'
		            }
		        },
		        symbolSize: 50,
		        itemStyle: {
		            normal: {
		                color: '#00FFFF'
		            }
		        },
		        data: convertData(data),
		        
		    }
		var series4={
	    	name: map,
            type: 'map',
            mapType: map,
            roam: true,
            nameMap:{
			    'china':'中国'
			},
			itemStyle: {
	           normal: {
	               areaColor: 'none',
	               borderColor: '#0c86d3',//边框颜色
				   borderWidth: '3'
	           },
	           emphasis: {//鼠标经过时的样式  
	               areaColor: '#0c86d3',
	           }
	       },		        
	       label: {
	    	   normal: {//显示省份的名称
                   show: true,
                   color:'#0c86d3'
               },
	           emphasis: {//鼠标经过时的样式  
	               show: true
	           }
	       },
           data:convertData(data)
        }
		series.push(series3,series4);
		option.series=series;*/
		mychart.setOption(option);
	}
	
}

function addQueryCenterRegion(){
	$.ajax({
		type : "POST", // post提交方式默认是get
		url : "queryLiftCenterRegion.do",
		async:false,
		error : function(request) {
			 (JSON.stringify(request), "", "error"); 
		},
		success : function(row) {
			var result = row.result;
			var dataMap = [];
    		var dtName;
    		var objR= new Object();
    		for (var i = 0; i < result.length; i++) {
    			dataMap[i]=new city(result[i].region_center_name,"90")
				dtName=result[i].region_center_name;
				objR[dtName]=[result[i].region_center_lag,result[i].region_center_lat];
			}
    		objR['北京']=[116.4551,40.2539];
			centerMap2(dataMap,objR);
		}
	})
}
function city(name,value) { 
	this.name = name; 
	this.value = value; 
}


