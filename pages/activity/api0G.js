import Request from '@/common/request/request.js'
import {Encrypt,Decrypt} from '@/common/aes.js'
import CryptoJS from 'crypto-js'

import {
	getCookie
} from '@/common/utils.js'

export function getActAwardRecord(phoneNumber) {
	let url = '/gzwz/service/award/getCurRecord'
	return Request.request({
		url: url,
		method: 'POST',
		data: {
			phoneNum:Encrypt(phoneNumber)
		}
	}).then(resp=>{
		resp.data.content=JSON.parse(decodeStr(resp.data.content))
		return Promise.resolve(resp)
	})
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
			phoneNum:Encrypt(phoneNum),
			storeId,
			userId,
			sourceCode,
			byChanel
		}
	}).then(resp=>{
		resp.data.content=JSON.parse(decodeStr(resp.data.content))
		return Promise.resolve(resp)
	})
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
	actId,storeId,userId,yh,yh1
}) {
	return Request.request({
		url: '/gzwz/service/award/useAward',
		method: 'POST',
		data:{
			actId:Encrypt(actId),storeId,userId,yh,yh1
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
	}).then(resp=>{
		resp.data=JSON.parse(decodeStr(resp.data)) 
		return Promise.resolve(resp)
	})
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
	}).then(resp=>{
		resp.data.resultData=JSON.parse(decodeStr(resp.data.resultData))
		return Promise.resolve(resp)
	})
}


export function terminalBuy({
	storeId,phoneNum,rcdId,age,userId,price,iterm,yh,yh1
}) {
	return Request.request({
		url: '/gzwz/service/award/buy',
		method: 'POST',
		data:{
			storeId,phoneNum:Encrypt(phoneNum),rcdId,age,userId,price,iterm,yh,yh1
		}
	})
}

function decodeStr(enStr){
	return Decrypt(enStr)
	// let str = enStr.replace(/\s/g,'')
	// return CryptoJS.enc.Base64.parse(str).toString(CryptoJS.enc.Utf8)
}
const E_LATN_IDS=["555","561",'556']
export function isSpecial(latnId){
	return E_LATN_IDS.indexOf(`${latnId}`)>-1
}

const LVL_PRICE_ARRAY_555=[500,600,800,1200]
const LVL_PRICE_ARRAY_OTHRE=[700,900,1100,1700]

export function getLatnLvlPrice(latId){
	latId = `${latId}`
	if(isSpecial(latId))
		return LVL_PRICE_ARRAY_555
		
	if(latId==='554')
		return [400,400,400,400]
		
	return LVL_PRICE_ARRAY_OTHRE
}

export function getLastPrice(latId){
	latId = `${latId}`
	
	return getLatnLvlPrice(latId)[3]+(latId==="554"?600:500)
}