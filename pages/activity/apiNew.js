import Request from '@/common/request/request.js'

import {Encrypt,Decrypt} from '@/common/aes.js'

export function getActAwardRecord(phoneNumber){
	let url='/gzwz/service/sj/actitvity/getActAwardRecord'
	return Request.request({
		url:url,
		method: 'POST',
		data: {
			 phoneNumber
		}
	});
}


export function getActAward({phoneNumber,storeId,userId,sourceCode,byChanel}){
	let url='/gzwz/service/sj/actitvity/getActAward'
	return Request.request({
		url:url,
		method: 'POST',
		data: {
			phoneNumber,
			storeId,
			userId,
			sourceCode,
			byChanel
		}
	});
}

export function insertAwardInterviewLog({storeId,userId,sourceCode,byChanel}){
	let url='/gzwz/service/sj/actitvity/insertAwardInterviewLog'
	return Request.request({
		url:url,
		method: 'POST',
		data: {
			storeId,
			userId,
			sourceCode,
			byChanel
		}
	});
}

export function getActAwardRecordTop20(){
	let url='/gzwz/service/sj/actitvity/getActAwardRecordTop20'
	return Request.request({
		url:url,
		method: 'GET'
	});
}

export function getAwardList(){
	return new Promise((rs,rj)=>{
		uni.request({
			url:'/sj/cms/activity/data/awardlist.json',
			method:'GET',
			success:resp=>{
				rs(resp)
			},
			fail:res=>{
				rj(res)
			}
		})
	})
}


export function getSms(phoneNumber){
	let url=`/gzwz/service/sj/service/gzwz/sjH5user/getSms/${phoneNumber}`
	return Request.request({
		url:url,
		method: 'POST'
	});
}
export function userH5Login(phoneNumber,randomCode){
	let url=`/gzwz/service/sj/service/gzwz/sjH5user/userH5Login`
	return Request.request({
		url:url,
		method: 'POST',
		data: {
			 phoneNumber,
			 randomCode
		}
	}).then(resp=>{
		resp.data=JSON.parse(Decrypt(resp.data)) 
		return Promise.resolve(resp)
	})
}