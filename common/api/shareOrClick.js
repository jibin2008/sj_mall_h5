import Request from '@/common/request/request.js'
export default {
    request(method, data, url) {
        return Request.request({url:url, method: method, data: data})
    },

    /**
     * 新增分享记录
     * @param {Object} data
     * @returns {*}
     */
    addShare(data) {
        return this.request('POST', data, '/sj/service/gzwz/share/add')
    },



    /**
     * 新增点击记录
     * @param {Object} data
     * @returns {*}
     */
    addClick(data) {
        return this.request('POST', data, '/sj/service/gzwz/share/addShareClick')
    },

}