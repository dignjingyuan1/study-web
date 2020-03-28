//var SALE_API = "/api-sale";
//var STUDY_API = "";
var STUDY_API = "/api-study";
var BASIS_API = "/api-basis";
var PAY_API = "/api-pay";

/**
 * 设置用户信息到缓存
 * @param {Object} user
 */
function setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
}

/**
 * 获取用户信息
 */
function getUser() {
    return JSON.parse(localStorage.getItem("user"));
}

/**
 * 设置权限
 * @param {Object} auth
 */
function setAuth(auth) {
    localStorage.setItem("auth", JSON.stringify(auth));
}

/**
 * 获取权限
 */
function getAuth() {
    return JSON.parse(localStorage.getItem("auth"));
}

/**
 * 提示框
 */
function _confirm(msg, callback) {
    var _html = "<div class='alert-fixed'>"
        + "<div class='alert'>"
        + "<div class='alert-title'><i class='icon iconfont icon-warning_fill'></i><span>提示信息</span></div>"
        + "<div class='alert-context'>提示内容</div>"
        + "<div class='alert-footer'>"
        + "<ul>"
        + "<li>取消</li>"
        + "<li>确认</li>"
        + "</ul>"
        + "</div>"
        + "</div>"
        + "</div>";
    var _fixed = $(_html).prependTo($("body")).show();

    setTimeout(function () {
        _fixed.find(".alert").css("transform", "scale(1)");
    }, 50);
    $(".alert-context").text(msg);
    $(".alert-footer ul li").each(function (index, item) {
        $(item).click(function (event) {
            if (index == 1) {
                if (typeof callback === "function") {
                    callback();
                }
            }
            _closeConfirm();
        })
    });
}

/**
 * 表单验证
 * @param {Object} formId
 */
/**
 * 表单验证
 * @param {Object} formId
 */
function _validtion(formId) {
    var submitForm = $("#" + formId)
    var inputs = submitForm.find("input,textarea");
    var flag = true;
    var len = inputs.length;
    outer:
        for (var i = 0; i < len; i++) {
            var input = $(inputs[i]);
            var check = input.attr("check");
            var val = input.val().replace(/\s+/g, "");
            $("body").find(".warning").remove();
            if (check) {
                var _checks = check.split(",");
                for (var j = 0, ckLen = _checks.length; j < ckLen; j++) {
                    var _type = _checks[j];
                    if ("ckNull" == _type && val == "") {
                        var message = input.attr("message");
                        var _postion = input.offset().left + input.width();
                        var _top = input.offset().top;
                        $("body").prepend("<div class='warning' style='left:" + _postion + "px;top:" + _top + "px;'>&nbsp;<i class='icon iconfont icon-warning_fill'></i>&nbsp;" + message + "不能为空</div>");
                        var height = input.offset().top;
                        let scrollTop = input.attr("scrollTop");
                        if (scrollTop) {
                            $('html,body').animate({scrollTop: height - 50});
                        }
                        flag = false;
                        $(input).focus();
                        $(input).blur(function () {
                            $("body").find(".warning").remove();
                        })
                        break outer;
                    }
                    if (val && "ckTel" == _type) {
                        var regTel = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
                        if (!regTel.test(val)) {
                            var message = input.attr("message");
                            var _postion = input.offset().left + input.width();
                            var _top = input.offset().top;
                            $("body").prepend("<div class='warning' style='left:" + _postion + "px;top:" + _top + "px;'>&nbsp;<i class='icon iconfont icon-warning_fill'></i>&nbsp;" + message + "不正确</div>");
                            var height = input.offset().top;
                            let scrollTop = input.attr("scrollTop");
                            if (scrollTop) {
                                $('html,body').animate({scrollTop: height - 50});
                            }
                            flag = false;
                            $(input).focus();
                            $(input).blur(function () {
                                $("body").find(".warning").remove();
                            })
                            break outer;
                        }
                    }
                    if (val && "ckMoney" == _type) {
                        var regMoney = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
                        if (!regMoney.test(val)) {
                            var message = input.attr("message");
                            var _postion = input.offset().left + input.width();
                            var _top = input.offset().top;
                            $("body").prepend("<div class='warning' style='left:" + _postion + "px;top:" + _top + "px;'>&nbsp;<i class='icon iconfont icon-warning_fill'></i>&nbsp;" + message + "不正确</div>");
                            var height = input.offset().top;
                            let scrollTop = input.attr("scrollTop");
                            if (scrollTop) {
                                $('html,body').animate({scrollTop: height - 50});
                            }
                            flag = false;
                            $(input).focus();
                            $(input).blur(function () {
                                $("body").find(".warning").remove();
                            })
                            break outer;
                        }
                    }
                    if (val && "ckEmail" == _type) {
                        var regEmail = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
                        if (!regEmail.test(val)) {
                            var message = input.attr("message");
                            var _postion = input.offset().left + input.width();
                            var _top = input.offset().top;
                            $("body").prepend("<div class='warning' style='left:" + _postion + "px;top:" + _top + "px;'>&nbsp;<i class='icon iconfont icon-warning_fill'></i>&nbsp;" + message + "不正确</div>");
                            var height = input.offset().top;
                            let scrollTop = input.attr("scrollTop");
                            if (scrollTop) {
                                $('html,body').animate({scrollTop: height - 50});
                            }
                            flag = false;
                            $(input).focus();
                            $(input).blur(function () {
                                $("body").find(".warning").remove();
                            })
                            break outer;
                        }
                    }
                    var regNumber = /^[0-9]*$/;
                    if (val && "ckNumber" == _type && !regNumber.test(val)) {
                        var message = input.attr("message");
                        var _postion = input.offset().left + input.width();
                        var _top = input.offset().top;
                        input.parent().prepend("<div class='warning' style='left:" + _postion + "px;top:" + _top + "px;'>&nbsp;<i class='icon iconfont icon-warning_fill'></i>&nbsp;" + message + "必须是数字</div>");
                        var height = input.offset().top;
                        let scrollTop = input.attr("scrollTop");
                        if (scrollTop) {
                            $('html,body').animate({scrollTop: height - 50});
                        }
                        flag = false;
                        $(input).focus();
                        $(input).blur(function () {
                            $("body").find(".warning").remove();
                        })
                        break outer;
                    }
                    var regIdeaNo = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
                    if (val && "ckIdeaNo" == _type && !regIdeaNo.test(val)) {
                        var message = input.attr("message");
                        var _postion = input.offset().left + input.width();
                        var _top = input.offset().top;
                        input.parent().prepend("<div class='warning' style='left:" + _postion + "px;top:" + _top + "px;'>&nbsp;<i class='icon iconfont icon-warning_fill'></i>&nbsp;" + message + "不正确</div>");
                        var height = input.offset().top;
                        let scrollTop = input.attr("scrollTop");
                        if (scrollTop) {
                            $('html,body').animate({scrollTop: height - 50});
                        }
                        flag = false;
                        $(input).focus();
                        $(input).blur(function () {
                            $("body").find(".warning").remove();
                        })
                        break outer;
                    }
                }
            }
        }
    return flag;
}

/**
 * 关闭窗口内容
 */
function _closeConfirm() {
    $(".alert").css("transform", "scale(0)");
    setTimeout(function () {
        $(".alert-fixed").remove();
    }, 500);
}

/**
 * 错误提示
 * @param {Object} msg
 */
function _errorMsg(msg) {
    var _html = "<div class='msg-fixed'>"
        + "<div class='msg'><i class='icon iconfont  icon-guanbi'></i><span>提示信息</span></div>"
        + "</div>";
    var _fixed = $(_html).prependTo($("body")).show();
    $(".msg span").text(msg);
    setTimeout(function () {
        _fixed.remove()
    }, 3888)
}

/**
 * 成功提示
 * @param {Object} msg
 */
function _successMsg(msg) {
    var _html = "<div class='msg-fixed'>"
        + "<div class='sucessMsg'><i class='icon iconfont'></i><span>提示信息</span></div>"
        + "</div>";
    var _fixed = $(_html).prependTo($("body")).show();
    $(".sucessMsg span").text(msg);
    setTimeout(function () {
        _fixed.remove()
    }, 3888)
}


/**
 * 弹窗
 * @param {Object} params
 */
function showPopup(params) {
    $.ajax({
        url: "popup/" + params.url + ".html",
        type: "GET",
        cache: false,
        data: {
            username: '123'
        },
        success: function (htm) {
            $(".popup .win .ctext").empty();
            $(".popup .win .tit span").text(params.title);
            $(".popup .win .ctext").append(htm);
            $(".popup").show();

            setTimeout(function () {
                $(".popup .win").css({"transform": "scale(1)"});
                if (typeof params.callback == "function") {
                    params.callback();
                }
            }, 50);
        }
    });
}

function closePopup() {
    $(".popup .win").css({"transform": "scale(0)"});
    setTimeout(function () {
        $(".popup").hide();
    }, 500);
}

/**
 * 创建websocket连接
 */
function createWebsocket(callback) {
    // TODO
    var stomp = Stomp.over(new SockJS(MEMBER_HEADER + "/ws/endpointChat"));
    stomp.connect({}, function (frame) {
        stomp.subscribe("/topic/nf", function (message) {
            var body = JSON.parse(message.body);
            var user = getUser();
            if (body.payUser == user.userCode) {
                callback(body);
            }
        });
    })

//	setTimeout(function() {
//		loginWebsocket(stomp);
//	},500)
}

/**
 * 关闭websocket
 */
function closeWebsocket() {

}

/**
 * 登录websocket
 */
//function loginWebsocket(stomp){
//	var _token = sessionStorage.getItem("token");
//	var _refreshToken = sessionStorage.getItem("refreshToken");
//	$.ajax({
//		url:"http://localhost:8088/login",
//		type:"post",
//		data:{
//			token: _token,
//			refreshToken: _refreshToken
//		},
//		success: function(res) {
//			if(res.status == 'success'){
//				var msg = {}
//			}
//		}
//	});
//}
function TimeDown(endDateStr, styleClass, callback, isTimes) {
    //结束时间
    var endDate = new Date(endDateStr);
    //当前时间
    var nowDate = new Date();
    //相差的总秒数
    var totalSeconds = parseInt((endDate - nowDate) / 1000);
    //天数
    var days = Math.floor(totalSeconds / (60 * 60 * 24));
    //取模（余数）
    var modulo = totalSeconds % (60 * 60 * 24);
    //小时数
    var hours = Math.floor(modulo / (60 * 60));
    modulo = modulo % (60 * 60);
    //分钟
    var minutes = Math.floor(modulo / 60);
    //秒
    var seconds = modulo % 60;
    //输出到页面
    var text = "还剩:" + days + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";
    $("." + styleClass).text(isTimes ? text : seconds);
    var time;
    if (nowDate.getTime() >= endDate.getTime()) {
        clearTimeout(time);
        if (typeof callback === 'function') {
            callback();
        }
        return;
    }
    //延迟一秒执行自己
    setTimeout(function () {
        time = TimeDown(endDateStr, styleClass, callback, isTimes);
    }, 1000);

}

/**
 * 倒计时开始
 */
function startTimeDown(callback) {
    var now = new Date();
    now.setSeconds(now.getSeconds() + 10);
    TimeDown(now.Format("yyyy-MM-dd hh:mm:ss"), callback);
}

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 * 未登录状态下,不能查看我的卡包
 */
function checkMyCardBagLogin() {
    var user = sessionStorage.getItem("user");
    if (!user) {
        location.href = "register.html";
    } else {
        location.href = "mycardbag.html";
    }
}

function isPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"
    ];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

/**
 * 验证用户是否登录
 */
function isUserLogin() {
    var flag = false;
    _get({
        url: STUDY_API + "/user/getUser",
        cache: false,
        async: false,
        callback: function (res) {
            console.log('验证用户是否登陆接口返回：', res)
            if (res.code == '2000') {
                if (res.data.userHeader) {
                    localStorage.setItem("user", JSON.stringify(res.data));
                } else {
                    var user = getUser();
                    if (user && user.userHeader) {
                        res.data.userHeader = user.userHeader
                        localStorage.setItem("user", JSON.stringify(res.data));
                    } else {
                        localStorage.setItem("user", JSON.stringify(res.data));
                    }
                }
                flag = true;
            }
        }
    });
    return flag;
}

/**
 * 微信支付
 */
function wxPay(wxRes){
	function onBridgeReady(){
		var timestamp = (Date.parse(new Date())/1000).toString();
		_get({
			url: PAY_API+"/sign/getSign",
			param:{
				appId: wxRes.appid,
				timeStamp: timestamp,
				nonceStr: wxRes.nonce_str,
				packageKey: "prepay_id="+wxRes.prepay_id,
				signType: "MD5"
			},
			callback: function(res1){
				WeixinJSBridge.invoke(
			      'getBrandWCPayRequest', {
			         "appId": wxRes.appid,     //公众号名称，由商户传入     
			         "timeStamp": timestamp,         //时间戳，自1970年以来的秒数     
			         "nonceStr":wxRes.nonce_str, //随机串     
			         "package":"prepay_id="+wxRes.prepay_id,     
			         "signType":"MD5",         //微信签名方式：     
			         "paySign":  res1.data//微信签名 
			      },
			      function(res){
					if(res.err_msg == "get_brand_wcpay_request:ok" ){
						_successMsg("支付成功")
						location.reload();
						// 使用以上方式判断前端返回,微信团队郑重提示：
						//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
					} else {
						_successMsg("支付失败")
					}
				}); 
			}
		})
	}
	if (typeof WeixinJSBridge == "undefined"){
	   if( document.addEventListener ){
	       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
	   }else if (document.attachEvent){
	       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
	       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
	   }
	}else{
	   onBridgeReady();
	}
}
