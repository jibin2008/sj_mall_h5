export default {
	request(method, data, url) {
		let baseUrl = getApp().globalData.URL
		return uni.request({
			url: `${baseUrl}${url}`,
			method: method,
			data: data,
			header: {
				'cookie': uni.getStorageSync("memberSid"),
				'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
			},
		})
	},


	changeMemberPhone(data) {
		return this.request('post', data, `/sj/service/gzwz/member/changeMemberPhone`)
	},
	
	/**
	 * 查询我的订单列表
	 * @param {Object} status
	 * @param {Object} size
	 * @param {Object} num
	 */
	queryMyOrderListByPage(status,size,num) {
		return this.request('GET', { status,size,num }, `/sj/service/gzwz/member/myOrder`)
	},
	
	/**
	 * 查询优惠券列表信息
	 * @param {Object} status
	 * @param {Object} size
	 * @param {Object} num
	 */
	queryMyCouponListByPage(status,storeId,currentPage) {
		return this.request('GET', { status,storeId,currentPage }, `/sj/coupon/queryUserCouponList`)
	},
	
	/**
	 * 查询优惠券详情
	 * @param {Object} activityCode
	 */
	queryCouponDetail(activityCode) {
		return this.request('GET', { activityCode }, `/sj/coupon/queryActivityDetail`)
	},
	/**
	 * 查询优惠券详情
	 * @param {Object} activityCode
	 */
	queryCouponDetailByCode(couponCode) {
		return this.request('GET', { couponCode }, `/sj/coupon/queryCouponInfoByCode`)
	},
	/**
	 * 领取优惠券
	 * @param {Object} activityCode
	 * @param {Object} storeId
	 */
	receive(activityCode,storeId) {
		return this.request('GET', { activityCode,storeId }, `/sj/coupon/receiveCoupon`)
	},
	
	orderDetail(orderNumber) {
		return this.request('GET', { orderNumber}, `/sj/service/gzwz/member/orderDetail`)
	},
}