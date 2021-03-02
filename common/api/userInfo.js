import Request from '@/common/request/request.js'
export default {
    request(method, data, url) {
        return Request.request({url:url, method: method, data: data})
    },

    /**
     * 根据userId查询用户信息
     * @param {number} userId
     * @returns {*}
     */
    queryUserInfo(userId) {
        return this.request('GET', {userId:userId}, '/sj/service/user/getByUserId')
    },

}