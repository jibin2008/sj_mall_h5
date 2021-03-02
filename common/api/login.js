export default {}

export function loadVisitOpenId() {
	return new Promise((resolve)=>{
        uni.login({
          provider: 'weixin',
          scopes: 'auth_user',
          success: (loginRes) => {
            uni.request({
              url: getApp().globalData.URL + '/sj/service/gzwz/code2Session?js_code=' + loginRes.code,
              success: (res) => {
                if (undefined != res) {//成功
                  wx.setStorageSync('memberSessionKey', res.data.resultData.session_key);
                  let visitorOpenid = res.data.resultData.openid;
                  //将访问的用户openid保存到本地缓存中
                  wx.setStorageSync('openId', visitorOpenid);
				  resolve()
				}
              }
            });
          },
        });
	})
}