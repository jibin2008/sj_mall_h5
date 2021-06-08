import Request from "../../common/request/request.js"
import { getCookie } from '@/common/utils.js'
import {Encrypt,Decrypt} from '@/common/aes.js'

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
	},
	getStoreInfo(storeId) {
		return Request.request({
			url:`/gzwz/service/sj/service/gzwz/store/${storeId}`,
			method: 'GET'
		}).then(resp=>{
			resp.data.resultData=JSON.parse(Decrypt(resp.data.resultData))
			return Promise.resolve(resp)
		})
	},
	reqCustPh(custId,phone){
		return Request.request({
			url: '/gzwz/service/award/reqCustomPhone',
			method: 'POST',
			data:{
				phone,custId
			}
		})
	}
}