
export default {

	/** 微信支付下单
	 * @param {Object} storeId
	 * @param {Object} status
	 */
	unifiedOrder(parameter) {
		parameter.tradeType = 'JSAPI';
		let baseUrl = getApp().globalData.URL
		return uni.request({
			url: `${baseUrl}/sj/weChatPay/unifiedOrder`,
			method: 'POST',
			data: parameter,
			header: {
				'cookie': uni.getStorageSync("sessionid"),
				'content-type': 'application/json;charset=utf-8'
			},
			success: (res) =>{
				res = res.data;
				if(res.prepay_id){
					res.source = parameter.source;
					var orderPayJson = JSON.stringify(res);
					wx.navigateTo({
						url:`../../pagesA/shop/orderPay?orderPayJson=${orderPayJson}`
					})
				}else{
					uni.showModal({
						title: '提示',
						showCancel: false,
						content: res.return_msg
					})
				}
				
			}
		})
	},

	
}
