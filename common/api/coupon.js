export default {
	request(method, data, url) {
		let baseUrl = getApp().globalData.URL
		return uni.request({
			url: `${baseUrl}${url}`,
			method: method,
			data: data,
			header: {
				'cookie': uni.getStorageSync("sessionid"),
				'content-type': 'application/json;charset=utf-8'
			}
		})
	},

	/** 查询店铺优惠券列表
	 * @param {Object} storeId
	 * @param {Object} status
	 */
	queryStoreActivityList(storeId,status,currentpage) {
		return this.request('GET', { storeId,status,currentpage}, '/sj/coupon/queryStoreActivityList')
	},
	/**
	 * 创建优惠券活动
	 * @param {Object} param
	 */
	createCoupon(param){
		return this.request('POST', JSON.stringify(param), `/sj/coupon/createCoupon`)
	},
	/**查询素材库
	 * @param {Object} picType
	 */
	queryActPic(picType){
		return this.request('GET', {picType}, `/sj/coupon/queryActPic`)
	},
	/**
	 * 优惠券核销
	 * @param  storeId
	 * @param  phone
	 * @param  couponCode
	 * @param  mobile
	 * @param  terminalCode
	 */
	writeoff(storeId,phone,couponCode,mobile,terminalCode){
		return this.request('GET', { storeId,phone,couponCode,mobile,terminalCode}, '/sj/coupon/writeoff')
	},
	/**
	 * 分页查询核销记录列表
	 * @param {Object} storeId
	 * @param {Object} num
	 */
	writeoffList(storeId,num) {
		return this.request('GET', { storeId,num}, '/sj/coupon/writeoffList')
	},
	
}
