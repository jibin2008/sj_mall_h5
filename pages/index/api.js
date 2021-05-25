import Request from "../../common/request/request.js"

function req(url,data){
	return Request.aesReq(url,data)
}

export default{
	buy({
		storeId,userId,productId,phone
	}){
		return req('/gzwz/service/actv/2thwb/buy',{
			storeId,userId,productId,phone
		})
	},
	isTarget(phone){
		return req('/gzwz/service/actv/bsc/isTarget',{
			actvIds:"",phone
		})
	}
}