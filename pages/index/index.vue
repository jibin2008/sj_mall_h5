<template>
	<div class="content">
		<div class="logout">
			<text>{{this.isLogin?this.phoneS:'您好！'}}【</text>
			<text style="text-decoration: underline;" @click="logout">{{this.isLogin?'退出':'请登录'}}</text>
			<text>】</text>
		</div>

		<text class="dczc-hdgz" @click="$refs.jhPop.open()">激活教程</text>
		<img src="https://ah.189.cn/sj/cms/activity/dc/static/img/btn.png" class="bl-btn" @click="handle" />

		<fzItm ref="fp" :resultIMg="isTarget?'https://ah.189.cn/sj/cms/activity/dc/static/img/4.png':'https://ah.189.cn/sj/cms/activity/dc/static/img/3.png'" class="fpv"></fzItm>
		<ChangePhonePopup ref="changePhonePopup" v-model="phoneNum"></ChangePhonePopup>
		<uni-popup ref="jhPop">
			<scroll-view class="jh-view">
				<img class="jh-img" src="/static/img/jh.png"></img>
			</scroll-view>
		</uni-popup>
	</div>
</template>

<script>
	import fzItm from "./fzItm.vue"
	import api from "./api.js"
	import ChangePhonePopup from "../activity/components/popup/change-phone-popup.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import {
		queryLocalPhoneNumber
	} from '@/common/mm.js'
	export default {
		components: {
			fzItm,
			ChangePhonePopup,
			uniPopup
		},
		computed: {
			isLogin() {
				return this.phoneNum !== ''
			},
			phoneS() {
				return this.phoneNum === '' ? '' : (this.phoneNum.substr(0, 3) + '****' + this.phoneNum.substr(7, 4))
			}
		},
		data() {
			return {
				phoneNum: "",
				isTarget: true,
				storeId:"",
				userId:"",
				sourceCode:""
			}
		},
		onLoad(options) {
			if(options.storeId)
				this.storeId=options.storeId
			if(options.userId)
				this.userId=options.userId
			if(options.sourceCode)
				this.sourceCode=options.sourceCode
			uni.showLoading({
				title: "请稍后~~~",
				mask: true
			})
			queryLocalPhoneNumber()
				.then(phoneNum => {
					this.phoneNum = phoneNum
				})
				.catch(msg => {
					uni.hideLoading()
					this.$refs.changePhonePopup.open()
				})
		},
		methods: {
			showAward(e) {},
			handle() {
				if (this.isTarget) {
					uni.setStorageSync("phoneNum",this.phoneNum)
					uni.redirectTo({
						url: `/pages/index/setup?userId=${this.userId}&storeId=${this.storeId}&sourceCode=${this.sourceCode}`
					})
				}
			},
			logout() {
				this.phoneNum = ""
				this.$refs.fp.reset()
			}
		},
		watch: {
			phoneNum(val) {
				if (val && val !== "") {
					uni.showLoading({
						title: "请稍后~~~",
						mask: true
					})
					api.isTarget(val).then(resp => {
						uni.hideLoading()
						this.isTarget = resp.data
					})
				} else {
					this.$refs.changePhonePopup.open()
				}
			}
		}
	}
</script>

<style>
	.content {
		background-image: url(../../static/img/bg.jpg);
		background-repeat: no-repeat;
		background-size: contain;
		width: 750rpx;
		height: 4675rpx;
		position: relative;
	}

	.dczc-hdgz {
		position: fixed;
		right: 0rpx;
		top: 100rpx;
		width: 126rpx;
		height: 44rpx;
		font-size: 22rpx;
		line-height: 44rpx;
		text-align: center;
		background: #ff8201;
		color: #FFFFFF;
		font-weight: bold;
		border-radius: 22rpx 0rpx 0rpx 22rpx;
	}

	.fpv {
		position: absolute;
		top: 974rpx;
		left: 60rpx;
	}

	.bl-btn {
		position: absolute;
		bottom: 30rpx;
		width: 650rpx;
		height: 106rpx;
		left: 50rpx;
	}

	.logout {
		position: absolute;
		top: 1%;
		right: 3%;
		color: #FFFFFF;
	}
	.jh-view{
		width: 640rpx;
		height: 900rpx;
	}
	.jh-img{
		width: 640rpx;
	}
</style>
