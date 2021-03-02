import request from '@/common/request/request.js'


export function queryMobileDetail(storeId,productId,goodsCode) {
	console.log(`queryMobileDetail:==>>>storeId:${storeId},productId:${productId},goodsCode:${goodsCode}`);
    return request.request({
        url:'/sj/service/gzwz/mobile/queryMobileDetail',
        method: 'GET',
		data: {
			 storeId:storeId,
			 productId:productId,
			 goodsCode:goodsCode
		}
    })
}
export function queryGroupMobileDetail(storeId,productId,goodsCode,actiCode) {
    return request.request({
        url:'/sj/service/gzwz/mobile/queryGroupMobileDetail',
        method: 'GET',
		data: {
			 storeId:storeId,
			 productId:productId,
			 goodsCode:goodsCode,
			 actiCode:actiCode
		}
    })
}