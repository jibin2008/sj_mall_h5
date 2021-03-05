import Request from '@/common/request/request.js'

export default{}

function ejs(){
    function _getNetworkType() {
        if (void 0 !== navigator.connection && void 0 !== navigator.connection.type) {
            switch (navigator.connection.type) {
            case 0:
                _networkResult = {
                    result: !0,
                    networkType: "UNKNOWN",
                    msg: "网络类型未知"
                };
                break;
            case 1:
                _networkResult = {
                    result: !0,
                    networkType: "ETHERNET",
                    msg: "网络类型未知"
                };
                break;
            case 2:
            case "wifi":
                _networkResult = {
                    result: !0,
                    networkType: "Wi-Fi",
                    msg: "当前网络类型为Wi-Fi"
                };
                break;
            case 3:
            case "2g":
                _networkResult = {
                    result: !0,
                    networkType: "2g",
                    msg: "当前网络类型为2G"
                };
                break;
            case 4:
            case "3g":
                _networkResult = {
                    result: !0,
                    networkType: "3g",
                    msg: "当前网络类型为3G"
                };
                break;
            case 5:
            case "4g":
                _networkResult = {
                    result: !0,
                    networkType: "4g",
                    msg: "当前网络类型为4G"
                };
                break;
            case "5g":
                _networkResult = {
                    result: !0,
                    networkType: "5g",
                    msg: "当前网络类型为5G"
                };
                break;
            case "cellular":
                _networkResult = {
                    result: !0,
                    networkType: "cellular",
                    msg: "当前网络类型为cellular"
                };
                break;
            default:
                _getNetworkType_ua()
            }
        } else {
            _getNetworkType_ua()
        }
        return _networkResult
    }
    function _getImage() {
        if (!0 === _clickFlag) {
            _clickFlag = !1
            var img = new Image
            var seqNum = (new Date).getTime()
            img.src = "http://ah.189.cn/service/setmmtest.action?" + _options.preStr
            img.onload = function(e) {
                _clickFlag = !0,
                _callbackJson = {
                    result: 0,
                    msg: "完成预取号请求"
                },
                _options.success(_callbackJson)
            }
            img.onerror = function() {
                _clickFlag = !0,
                _callbackJson = {
                    result: -1,
                    msg: "完成预取号请求"
                },
                _options.success(_callbackJson)
            }
        }
    }
    function _showErrMsg(str) { ! 0 === _options.debug && (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i) ? alert(str) : console.log(str))
    }
    var _options, _callbackJson, _appKey, _clickFlag = !0,
    e_uxt_initUxt = function() {
        var ma1 = document.createElement("script");
        ma1.type = "text/javascript",
        ma1.append("var _uxt = _uxt || [];var _ux21st = (new Date).getTime();");
        var s1 = document.getElementsByTagName("title")[0];
        var ma2 = document.createElement("script");
        ma2.type = "text/javascript",
        ma2.async = !0,
        ma2.src = ("https:" == document.location.protocol ? "https://ux.21cn.com": "http://ux.21cn.com") + "/api/htmlReportRest/getJs.js?pid=B8107DA212E64AEF97A740B831C30117";
        var s2 = document.getElementsByTagName("title")[0];
        var ma3 = document.createElement("script");
        ma3.type = "text/javascript",
        ma3.append("var _ux21et = (new Date()).getTime();\t"),
        document.getElementsByTagName("head")[0].appendChild(ma3)
    },
    _networkResult = {
        result: !1,
        networkType: "",
        msg: "网络类型未知"
    },
    netTypeArr = ["2g", "3g", "4g", "wifi", "NotReachable"],
    _getNetworkType_ua = function() {
        for (var _userAgent = navigator.userAgent.toLowerCase(), i = 0; i < netTypeArr.length; i++) { - 1 != _userAgent.indexOf(netTypeArr[i]) && (_networkResult = {
                result: !0,
                networkType: netTypeArr[i],
                msg: "当前网络类型为" + netTypeArr[i]
            })
        }
    },
    exports = {};
    return exports.oneKeyLogin = function(options) {
        var str, reg, r;
        _options = options || {},
        e_uxt_initUxt(),
        str = _options.preStr,
        reg = new RegExp("(^|&)" + "clientId" + "=([^&]*)(&|$)"),
        r = decodeURI(str).match(reg),
        console.log(r),
        _appKey = null !== r ? unescape(r[2]) : null;
        var _href = window.location.href;
        if (window._uxt && _uxt.push(["_trackEvent", _appKey + "+一键拉新", "初始化", "链接：+" + _href]), _options.hasOwnProperty("netWorkType") && _options.netWorkType) {
            var _getNetworkTypeResult = _getNetworkType();
            _callbackJson = {
                netWorkType: _getNetworkTypeResult.networkType,
                msg: _getNetworkTypeResult.msg
            },
            _options.callbackNetWorkType(_callbackJson)
        } !
        function() {
            var _getNetworkTypeResult = _getNetworkType();
            _options.hasOwnProperty("netWorkType") && _options.netWorkType ? _getNetworkTypeResult.result && "Wi-Fi" !== _getNetworkTypeResult.networkType ? _getImage() : (_showErrMsg("当前网络状态不支持免密"), _callbackJson = {
                result: -2,
                msg: "当前网络状态不支持免密"
            },
            _options.success(_callbackJson)) : _getImage(),
            window._uxt && _uxt.push(["_trackEvent", _appKey + "+一键拉新", "点击", "获取本机号码"])
        } ()
    },
    exports
}

export function queryLocalPhoneNumber(){
	return Request.request({
		url:'/service/genMmStr.action',
		method: 'POST'
	}).then(resp=>{
		if(resp.data != null && "" != resp.data){
			return noSecret(resp.data.data);
		}else{
			return Promise.reject(resp.data.data)
		}
	})
}
function noSecret(paramStr){
	return new Promise((rs,rj)=>{
		ejs().oneKeyLogin({
			debug:true, // 开启调试模式,调用的所有 api 的返回值会在客户端 alert 出来，若要查看传入的参数，可以在 pc 端打开，参数信息会通过 log 打出，仅在 pc 端时才会打印。
					
			netWorkType: false, //布尔值，是否判断网络类型 true|false
			preStr:'paramStr='+paramStr,
					
			success:function(res){
				Request.request({
					url:'/service/getMmServiceNbr.action',
					method: 'POST',
					data:paramStr
				}).then(resp=>{
					var dataJson = JSON.parse(resp.data.data)
					var phone = dataJson.serviceNbr
					if (!phone) {
						rj(dataJson.msg)
					} else {
						document.cookie = "dxytPhoneNumber=" + phone
						rs(phone)
					}
				}).catch(m=>{
					rj(m)
				})
			},
			error: error=>{
				rj(error)
			}
		})
	})
}
