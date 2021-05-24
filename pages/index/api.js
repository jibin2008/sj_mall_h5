import Request from '@/common/request/request.js'
import { getCookie } from '@/common/utils.js'

const ACTV_IDS="5242328489151488,5140360162937856,4645949848947712"
function extActIds(data){
	data=data?data:{}
	data.actvIds=ACTV_IDS
	return data
}
export function getActAwardRecord(phone){
	return Request.aesReq('/gzwz/service/actv/bsc/myrcd',extActIds({phone}));
}


export function getActAward({phoneNumber,storeId,userId,sourceCode,byChanel}){
	return Request.aesReq('/gzwz/service/actv/51/getaward',extActIds({
		phone:phoneNumber,storeId,userId,sourceCode,byChanel
	}));
}

export function getActAwardRecordTop20(){
	return Request.aesReq('/gzwz/service/actv/bsc/rcdtp20',extActIds({awardIdx:3}));
}

export function recode(){
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