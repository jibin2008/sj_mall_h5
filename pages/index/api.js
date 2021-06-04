import Request from "../../common/request/request.js"
import { getCookie } from '@/common/utils.js'

function req(url,data){
	return Request.aesReq(url,data)
}

export default{
	buy({
		storeId,userId,phone,sourceCode
	}){
		return req('/gzwz/service/actv/2thwb/buy',{
			storeId,userId,phone,sourceCode
		})
	},
	isTarget(phone){
		return req('/gzwz/service/actv/2thwb/isTarget',{
			phone
		})
	},
	recode(){
		let url=`/gzwz/service/sj/service/gzwz/sjH5user/visitorRecord`
		
		let sourceCode = getCookie('sourceCode')
		if(sourceCode&&sourceCode===''){
			sourceCode = getUrlKey('sourceCode')
			document.cookie = "sourceCode="+sourceCode
		}
		return Request.request({
			url:url,
			method: 'POST',
			data: {sourceCode:sourceCode,url:location.href},
		})
	}
}