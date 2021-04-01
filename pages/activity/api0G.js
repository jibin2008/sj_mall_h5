import Request from '@/common/request/request.js'
import {
	getCookie
} from '@/common/utils.js'

export function getActAwardRecord(phoneNumber) {
	let url = '/gzwz/service/award/getCurRecord'
	return Request.request({
		url: url,
		method: 'POST',
		data: {
			phoneNum:phoneNumber
		}
	});
}


export function getActAward({
	phoneNum,
	storeId,
	userId,
	sourceCode,
	byChanel
}) {
	let url = '/gzwz/service/award/getAwardIndex'
	return Request.request({
		url: url,
		method: 'POST',
		data: {
			phoneNum,
			storeId,
			userId,
			sourceCode,
			byChanel
		}
	});
}

export function getActAwardRecordTop20() {
	let url = '/gzwz/service/award/getActAwardRecordTop20'
	return Request.request({
		url: url,
		method: 'GET'
	});
}

export function getAwardList() {
	return Request.request({
		url: '/gzwz/service/award/getAwardItem',
		method: 'GET',
		data:{
			storeId:9999999
		}
	})
}


export function useAward({
	actId,storeId,userId
}) {
	return Request.request({
		url: '/gzwz/service/award/useAward',
		method: 'POST',
		data:{
			actId,storeId,userId
		}
	})
}


export function getSms(phoneNumber) {
	let url = `/gzwz/service/sj/service/gzwz/sjH5user/getSms/${phoneNumber}`
	return Request.request({
		url: url,
		method: 'POST'
	});
}
export function userH5Login(phoneNumber, randomCode) {
	let url = `/gzwz/service/sj/service/gzwz/sjH5user/userH5Login`
	return Request.request({
		url: url,
		method: 'POST',
		data: {
			phoneNumber,
			randomCode
		}
	});
}

export function recode() {
	let url = `/gzwz/service/sj/service/gzwz/sjH5user/visitorRecord`

	let sourceCode = getCookie('sourceCode')
	if (sourceCode && sourceCode === '') {
		sourceCode = getUrlKey('sourceCode')
		document.cookie = "sourceCode=" + sourceCode
	}
	return Request.request({
		url: url,
		method: 'POST',
		data: {
			sourceCode: sourceCode,
			url: location.href
		},
	})
}

export function getStoreInfo(storeId) {
	return Request.request({
		url:`/gzwz/service/sj/service/gzwz/store/${storeId}`,
		method: 'GET'
	})
}


export function terminalBuy({
	storeId,phoneNum,rcdId,age,userId,price,iterm,yh
}) {
	return Request.request({
		url: '/gzwz/service/award/buy',
		method: 'POST',
		data:{
			storeId,phoneNum,rcdId,age,userId,price,iterm,yh
		}
	})
}