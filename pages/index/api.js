import Request from "../../common/request/request.js"

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
}