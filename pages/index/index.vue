<template>
	<div class="content">
		<div class="logout">
			<text>{{this.isLogin?this.phoneS:'您好！'}}【</text>
			<text style="text-decoration: underline;" @click="logout">{{this.isLogin?'退出':'请登录'}}</text>
			<text>】</text>
		</div>

		<img class="dczc-hdgz" src="/static/img/hdgz.png"></img>
		<img src="/static/img/btn.png" class="bl-btn" @click="handle" />

		<fzItm ref="fp" :resultIMg="isTarget?'/static/img/4.png':'/static/img/3.png'" class="fpv"></fzItm>
		<ChangePhonePopup ref="changePhonePopup" v-model="phoneNum"></ChangePhonePopup>
	</div>
</template>

<script>
	import fzItm from "./fzItm.vue"
	import api from "./api.js"
	import ChangePhonePopup from "../activity/components/popup/change-phone-popup.vue"
	import {
		queryLocalPhoneNumber
	} from '@/common/mm.js'
	export default {
		components: {
			fzItm,
			ChangePhonePopup
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
				isTarget: false
			}
		},
		onLoad(options) {
			if(options.standardaddressid){
				parent.parent.Comm.setAddress({
					addrId : options.standardaddressid,
					addrName : decodeURI(options.addrName),
					subAreaId : options.subAreaId,
					siteId : options.siteId,
					siteCode : options.siteCode,
					siteName : decodeURI(options.siteName),
					positionType: options.positiontype,
					ability: options.ability
				})
				return
			}
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
						url: `/pages/index/setup`
					})
				}
			},
			logout() {
				window.close()
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
		position: absolute;
		right: 0rpx;
		top: 100rpx;
		width: 126rpx;
		height: 44rpx;
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
</style>
