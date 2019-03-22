function ChargeValidator() {

	/**
	 * 密码
	 */	
	this.password = function(str)
	{
		var password=/^[a-z0-9]{6,16}$/;//数字 + -
		
		if (password.test(str)) {
			return true;
		} else {
			return false;
		}
	};

	
	/**
	 * 邮政编码
	 */	
	this.postcode = function(str)
	{
		var password=/^\d{6}$/;//数字 + -
		
		if (password.test(str)) {
			return true;
		} else {
			return false;
		}
	};
	
	
	/**
	 * 判断电话号码
	 * @param str
	 * @returns
	 */
	this.isPhone = function(str)
	{
		var checknoChars=/^[\+\-0-9]+$/;//数字 + -
		var isPhone = /\d{3}-\d{8}|\d{4}-\d{7}/;
		var isMob = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57]|19[0-9]|16[0-9])[0-9]{8}$/;
		if (checknoChars.test(str)&&(isMob.test(str) || isPhone.test(str))) {
			return true;
		} else {
			return false;
		}
	};

	/**
	 * 判断邮箱地址
	 * @param str
	 * @returns
	 */
	this.isEmail = function(str)
	{
		reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/g
		return reg.test(str)
	};

	/**
	 * 判断身份证格式对不对，并不正保证这个身份证可用
	 * @param socialNo
	 * @returns {Boolean}
	 */
	this.checkCardId = function(socialNo)
	{
		if (socialNo == "") {
			return (false);
		}
		if (socialNo.length != 15 && socialNo.length != 18) {
			return (false);
		}

		var area = {
			11 : "北京",
			12 : "天津",
			13 : "河北",
			14 : "山西",
			15 : "内蒙古",
			21 : "辽宁",
			22 : "吉林",
			23 : "黑龙江",
			31 : "上海",
			32 : "江苏",
			33 : "浙江",
			34 : "安徽",
			35 : "福建",
			36 : "江西",
			37 : "山东",
			41 : "河南",
			42 : "湖北",
			43 : "湖南",
			44 : "广东",
			45 : "广西",
			46 : "海南",
			50 : "重庆",
			51 : "四川",
			52 : "贵州",
			53 : "云南",
			54 : "西藏",
			61 : "陕西",
			62 : "甘肃",
			63 : "青海",
			64 : "宁夏",
			65 : "新疆",
			71 : "台湾",
			81 : "香港",
			82 : "澳门",
			91 : "国外"
		};

		if (area[parseInt(socialNo.substr(0, 2))] == null) {
			return (false);
		}
		if (socialNo.length == 15) {
			pattern = /^\d{15}$/;
			if (pattern.exec(socialNo) == null) {
				return (false);
			}
			var birth = parseInt("19" + socialNo.substr(6, 2));
			var month = socialNo.substr(8, 2);
			var day = parseInt(socialNo.substr(10, 2));
			switch (month) {
			case '01':
			case '03':
			case '05':
			case '07':
			case '08':
			case '10':
			case '12':
				if (day > 31) {
					return false;
				}
				break;
			case '04':
			case '06':
			case '09':
			case '11':
				if (day > 30) {
					return false;
				}
				break;
			case '02':
				if ((birth % 4 == 0 && birth % 100 != 0) || birth % 400 == 0) {
					if (day > 29) {
						return false;
					}
				} else {
					if (day > 28) {
						return false;
					}
				}
				break;
			default:
				return false;
			}
			var nowYear = new Date().getYear();
			if (nowYear - parseInt(birth) < 15
					|| nowYear - parseInt(birth) > 100) {
				return false;
			}
			return (true);
		}

		var Wi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2,
				1);
		var lSum = 0;
		var nNum = 0;
		var nCheckSum = 0;

		for (i = 0; i < 17; ++i) {

			if (socialNo.charAt(i) < '0' || socialNo.charAt(i) > '9') {
				return (false);
			} else {
				nNum = socialNo.charAt(i) - '0';
			}
			lSum += nNum * Wi[i];
		}

		if (socialNo.charAt(17) == 'X' || socialNo.charAt(17) == 'x') {
			lSum += 10 * Wi[17];
		} else if (socialNo.charAt(17) < '0' || socialNo.charAt(17) > '9') {
			return (false);
		} else {
			lSum += (socialNo.charAt(17) - '0') * Wi[17];
		}

		if ((lSum % 11) == 1) {
			return true;
		} else {
			return (false);
		}
	};

}