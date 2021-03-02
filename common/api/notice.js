export default {
    request(method, data, url) {
        let baseUrl = getApp().globalData.URL
        return uni.request({
            url: `${baseUrl}${url}`,
            method: method,
            data: data,
            header: {
                'cookie': uni.getStorageSync("sessionid"),
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
        })
    },

    /**
     * 查询到货通知记录是否存在
     * @param data
     * @returns {*}
     */
    queryNoticeByUserParam(data) {
        return this.request('POST', data, '/sj/service/gzwz/notice/queryNoticeByUserParam')
    },

    /**
     * 新增到货通知记录
     * @param data
     * @returns {*}
     */
    addNotice(data) {
        return this.request('POST', data, '/sj/service/gzwz/notice/add')
    },

    /**
     * 分页查询到货通知记录
     * @param storeId
     * @param num
     * @returns {*}
     */
    noticeList(storeId,index,pageSize) {
        return this.request('POST', { storeId,index,pageSize}, '/sj/service/gzwz/notice/listPage')
    },
}