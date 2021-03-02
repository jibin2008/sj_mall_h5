import Request from '@/common/request/request.js'

export function getActAwardRecord(phoneNumber){
	let url='/sj/actitvity/getActAwardRecord'
	return Request.request({
		url:url,
		method: 'POST',
		data: {
			 phoneNumber
		}
	});
}


export function getActAward(phoneNumber){
	let url='/sj/actitvity/getActAward'
	return Request.request({
		url:url,
		method: 'GET',
		data: {
			 phoneNumber
		}
	});
}

export function getActAwardRecordTop20(){
	let url='/sj/actitvity/getActAwardRecordTop20'
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
	let url=`/sj/service/gzwz/sjH5user/getSms/${phoneNumber}`
	return Request.request({
		url:url,
		method: 'POST'
	});
}
export function userH5Login(phoneNumber,randomCode){
	let url=`/sj/service/gzwz/sjH5user/userH5Login`
	return Request.request({
		url:url,
		method: 'POST',
		data: {
			 phoneNumber,
			 randomCode
		}
	});
}