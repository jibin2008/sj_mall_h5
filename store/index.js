import Vue from 'vue'
import Vuex from 'vuex'

//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
	state: { //存放的键值对就是所要管理的状态
		hasWxProvider: true,
		loggedWxCode: '', //微信的code
		loggedWxCodeExpire: Date.parse(new Date()),
		loggedWxUser: { //包区经理微信的用户信息
			"nickName": "",
			"gender": null,
			"language": "",
			"city": "",
			"province": "",
			"country": "",
			"avatarUrl": ""
		},
		forcedLogin: true,
		hasLogin: false,
		loggedOpenId: '',
		loggedUser: {
			role: null,
			userId: '',
			userName: '',
			nickName: '',
			latnId: '',
			phoneNum: '',
			jobNum: '',
			thirdUnitId: '',
			fourthUnitId: '',
			createTime: '',
			avatarUrl: '',//
			avatar: '',
			workAccount:'',
		},
		loggedStore: {
			storeId: '',
			storeOpenId: '',
			storeWxId: '',
			storeName: '',
			storePhone: '',
			storeAddress: '',
			storeLogo: '',
			createDate: '',
			managerJobNum: '',
			managerUserId: '',
			longitude: '',
			latitude: '',
			jtStoreId: '',
			userRole: '',
			storePayCode: '',
			mchId:'',
			secretKey:''
		},
		userRole: 1,
		storeMemberInfo:{
			openId:'',
			nickName:'',
			avatarUrl:'',
			isBind:'0',	//未登录	 1 已绑定基本信息 2 已绑定手机号码
			phone:''
		},
	},
	mutations: {
		/**
		 * 退出登录
		 */
		logout(state) {
			state.hasLogin = false;
			//清空用户信息和店铺信息
			for (var key in state.loggedUser) {
				state.loggedUser[key] = undefined;
			}
			for (var key in state.loggedStore) {
				state.loggedStore[key] = undefined;
			}
		},
		updateHasWxProvider(state, payload) { //用法: this.$store.commit('updateHasWxProvider',true) 或者 用mapMutations
			state.hasWxProvider = payload;
		},
		updateLoggedWxCode(state, payload) {
			state.loggedWxCode = payload;
			state.loggedWxCodeExpire = Date.parse(new Date()) + 5 * 60 * 1000; //code有效期5分钟
			console.log('store.state.loggedWxCode == ' + state.loggedWxCode);
		},
		updateLoggedWxUser(state, payload) {
			// state.loggedWxUser = payload;
			for (var key in payload) {
				if (undefined != state.loggedWxUser[key]) {
					state.loggedWxUser[key] = payload[key];
				}
			}
			console.log('store.state.loggedWxUser == ' + JSON.stringify(state.loggedWxUser));
		},
		updateHasLogin(state, payload) {
			state.hasLogin = payload;
			console.log('store.state.hasLogin == ' + state.hasLogin);
		},
		updateLoggedUser(state, payload) {
			// state.loggedUser = payload;
			for (var key in payload) {
				if (undefined != state.loggedUser[key]) {
					state.loggedUser[key] = payload[key];
				}
			}
			console.log('store.state.loggedUser == ' + JSON.stringify(state.loggedUser));
		},
		updateLoggedStore(state, payload) {
			// state.loggedStore = payload;
			for (var key in payload) {
				if (undefined != state.loggedStore[key]) {
					state.loggedStore[key] = payload[key];
				}
			}
			console.log('store.state.loggedStore == ' + JSON.stringify(state.loggedStore));
		},
		updateLoggedOpenId(state, payload) {
			state.loggedOpenId = payload;
			console.log('store.state.loggedOpenId == ' + state.loggedOpenId);
		},
		updateUserRole(state, payload) {
			state.userRole = payload;
			console.log('store.state.userRole == ' + state.userRole);
		},
		setStoreMemberInfo(state, storeMemberInfo) {
			//state.storeMemberInfo = storeMemberInfo
			Vue.set(state,'storeMemberInfo',storeMemberInfo)
			console.log('store.state.storeMemberInfo == ' + JSON.stringify(state.storeMemberInfo));
		},
	}
})

export default store
