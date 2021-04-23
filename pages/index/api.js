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
		return req('/gzwz/service/dczr/isTarget',obj)
	}
}