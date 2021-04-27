
// https://ext.dcloud.net.cn/plugin?id=737
// 引入 Request
import Request from '@/common/myp-request/index.js'

import {Encrypt,Decrypt} from "./../aes.js"
// 设置 通用的 baseUrl 以及 header
export const config = {
	baseUrl: '' ,
    header: {
		// 'cookie': uni.getStorageSync("sessionid"),
		'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
	},
    // 取消请求时的提示信息配置，自己根据自己的需要设置字段以及内容
    // 全局有效，可以在api的options中进行单独覆盖配置
    cancelReject: {
        text: '请求未通过验证,检查是否登录或者数据正确',
        type: 'warning'
    },
    // 请求失败时的提示信息配置，自己根据自己的需要设置字段以及内容
    // 全局有效，可以在api的options中进行单独覆盖配置
    // 您可以不提供该配置，当failReject为null的时候，会自动reject错误信息(uni.request的fail错误信息)
    failReject: {
        type: 'error',
        text: "网络异常，请求发送失败，请检查网络"
    }
}

// 设置自己的请求拦截器，必须加上 `async`
// 请求前的拦截，比如是否登录/过期/刷新token/...
const reqInterceptor = async (options) => {
	//console.log('<<<<<<<<'+options);
    // 必须返回一个 Object 或者 false
    // false 代表该 请求被拦截，不会进行请求
    // 请求被拦截时，也可以配置拦截时的提示信息：cancelReject-对象
    // return {mypReqToCancel: true, cancelReject: {...}}
    // 或者返回配置，配置中可以携带 请求失败时的提示信息 failReject-对象
	if(options.header.encrypt === "aes"){
		let seq = new Date().getTime()
		options.header = Object.assign(options.header,{
			encryptSeq:seq
		})
		
		options.data = Encrypt(JSON.stringify({
			seq:seq,
			data:options.data
		}))
	}
    return options
}

// 设置自己的响应拦截器
// 统一对返回的数据进行整理，方便接口统一使用
const resInterceptor = (response, conf={}) => {
    // todo your logic, must return the data u needed. it will be resolved.
    // if u want to reject, u could return {mypReqToReject:true,...other k-v}
    // 必须返回你需要处理的数据，将会进入resolve（then中处理）
    // 如果需要reject，需要设置mypReqToReject:true，还可以携带自己定义的任何提示内容（catch中处理）
	if(conf.header.encrypt === "aes"){
		if(response.statusCode === 200){
			if(response.data.result!==0){
				return {
					mypReqToReject:true,
					errorMsg:response.data.reason
				}
			}
			let data = JSON.parse(Decrypt(response.data.content))
			if(data.seq === conf.header.encryptSeq){
				response.data = data.data
			}else{
				return {
					mypReqToReject:true,
					errorMsg:"数据异常！！！"
				}
			}
		}else
			return response
	}
    return response
}

// 实例化请求器
// 您可以根据需要实例化多个请求器
const req = new Request(config, reqInterceptor, resInterceptor)

export default req