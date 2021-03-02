import request from '@/common/request/request.js'
/**
 * 根据店铺ID查询店铺信息
 * @param {Object} storeId
 */
export function queryStore(storeId,userId) {
    return request.request({
        url:'/sj/service/gzwz/shop/queryStoreInfo',
        method: 'GET',
		data: {
			 storeId:storeId,
			 userId:userId,
		}
    })
}
/**
 * 查询店铺已上架商品
 * @param {Object} storeId
 */
export function queryStoreProduct(storeId) {
    return request.request({
        url:'/sj/service/gzwz/shop/queryStoreProduct',
        method: 'GET',
		data: {
			 storeId:storeId
		}
    })
}
/**
 * 根据店铺/标签分页查询商品列表
 * @param {Object} storeId	店铺ID
 * @param {Object} labelId	标签ID
 * @param {Object} pageNum	当前页码
 */
export function queryStoreLabelProduct(data) {
    return request.request({
        url:'/sj/service/gzwz/shop/queryStoreLabelProduct',
        method: 'GET',
		data: data
    })
}
export function checkGoodsDetail(storeId,userId,productId,productCode) {
    return request.request({
       url:'/sj/service/gzwz/shop/checkDetail',
       method: 'GET',
       data: {
		    storeId:storeId,
			userId:userId,
			productId:productId,
           productCode:productCode
	   }
    })
}

export function queryGoodsDetail(productId) {
    return request.request({
        url:'/sj/service/gzwz/shop/goodsDetail',
        method: 'GET',
		data: {
			productId:productId
		}
    })
}

export function saveVisitRecorder(data) {
    return request.request({
        url:'/sj/service/gzwz/visitor/add',
        method: 'POST',
		data:data
    })
}

export function queryStoreInfoByUserId(data) {
    return request.request({
        url:'/sj/service/gzwz/shop/queryStoreInfoByUserId',
        method: 'GET',
		data:data
    })
}

export function buy(data) {
    return request.request({
        url:'/sj/service/gzwz/shop/buy',
        method: 'get',
		data:data
    })
}

export function mobileBuy(data) {
    return request.request({
        url:'/sj/service/gzwz/shop/mobileBuy',
        method: 'get',
		data:data
    })
}
export function queryLiveProductDetail(goodsCode,phoneNum) {
    return request.request({
        url:'/sj/service/gzwz/shop/queryLiveProductDetail',
        method: 'get',
		data: {
			goodsCode:goodsCode,
			phoneNum:phoneNum
		}
    })
}

export function bannerActPicList(storeId) {
    return request.request({
        url:'/sj/coupon/bannerActPicList',
        method: 'get',
		data: {
			storeId:storeId
		}
    })
}
export function mySaleActivityList(storeId) {
    return request.request({
        url:'/sj/service/gzwz/group/mySaleActivityList',
        method: 'get',
		data: {
			storeId:storeId
		}
    })
}

export function goodsShelfDetail(productId,storeId) {
    return request.request({
        url:'/sj/service/gzwz/shop/goodsShelfDetail',
        method: 'GET',
        data: {
            productId:productId,
            storeId:storeId
        }
    })
}

export function queryProductNameByCodes(codes) {
    return request.request({
        url:'/sj/service/product/queryProductNameByCodes',
        method: 'GET',
        data: {
            productCodes:codes
        }
    })
}