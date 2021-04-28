import Request from "../../common/request/request.js"

function req(url,data){
	return Request.request({
		url,
		method: 'POST',
		data,
		header:{
			encrypt:"aes"
		}
	})
}

export default{
	isTarget(phone){
		return req('/gzwz/service/dczr/isTarget',{phone})
	},
	setupCommit(obj){
		return req('/gzwz/service/dczr/setupCommit',obj)
	},
	myRcd(phone){
		return req('/gzwz/service/actv/bsc/myrcd',{phone,actvIds:"2019110746718041"})
	},
	unifiedOrder(paramters){
		paramters.tradeType = 'MWEB';
		return Request.request({
			url:'/gzwz/service/sj/weChatPay/unifiedOrder',
			method: 'POST',
			data:paramters,
			header:{
				contentType: "application/json;charset=UTF-8"
			}
		})
	},
	payStatuQuery(outTradeNo){
		paramters.tradeType = 'MWEB';
		return Request.request({
			url:'/gzwz/service/sj/weChatPay/orderQuery',
			method: 'POST',
			data:outTradeNo
		})
	}
}