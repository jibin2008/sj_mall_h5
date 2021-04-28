<template>
	<div class="content">
		<div class="logout">
			<text>{{this.isLogin?this.phoneS:'您好！'}}【</text>
			<text style="text-decoration: underline;" @click="logout">{{this.isLogin?'退出':'请登录'}}</text>
			<text>】</text>
		</div>


		<fzItm ref="fp" @kj="kj" :resultIMg="(isTarget&&myAwardList.length==0)?'https://ah.189.cn/sj/cms/activity/dc/static/img/4.png':'https://ah.189.cn/sj/cms/activity/dc/static/img/3.png'" class="fpv"></fzItm>
		
		
		<text class="dczc-hdgz" @click="$refs.jhPop.open()">激活教程</text>
		<text v-if="isLogin" class="dczc-hdgz dczc-wdjp" @click="$refs.myAwardPop.open()">我的奖品</text>
		<img v-if="canBuy" src="https://ah.189.cn/sj/cms/activity/dc/static/img/btn.png" class="bl-btn" @click="handle" />
		<ChangePhonePopup ref="changePhonePopup" v-model="phoneNum"></ChangePhonePopup>
		<uni-popup ref="jhPop">
			<scroll-view :scroll-y="true" class="jh-view">
				<img class="jh-img" src="https://ah.189.cn/sj/cms/activity/dc/static/img/jh.png"></img>
			</scroll-view>
		</uni-popup>		
		<myAwardRcd @use='useNow' ref='myAwardPop' :awardRecordList='myAwardList'></myAwardRcd>
	</div>
</template>

<script>
	import fzItm from "./fzItm.vue"
	import api from "./api.js"
	import ChangePhonePopup from "../activity/components/popup/change-phone-popup.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import myAwardRcd from "../activity/components/popup/my-award-popup.vue"
	import {
		queryLocalPhoneNumber
	} from '@/common/mm.js'
	export default {
		components: {
			fzItm,
			ChangePhonePopup,
			uniPopup,
			myAwardRcd
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
				isTarget: false,
				storeId:"",
				userId:"",
				sourceCode:"",
				canBuy:false,
				myAwardList:[]
			}
		},
		onLoad(options) {
			if(options.storeId)
				this.storeId=options.storeId
			if(options.shopId)
				this.storeId=options.shopId
			if(options.userId)
				this.userId=options.userId
			if(options.mid)
				this.userId=options.mid
				
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
			},
			kj(){
				if(this.isTarget)
					this.canBuy=true
			},
			useNow(){
				this.handle()
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
					api.myRcd(val).then(rsp=>{
						this.myAwardList=rsp.data.map(itm=>{
							return {
								couponName:"0元加装50M宽带，免费24个月",
								createTime:itm.createTime
							}
						})
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
		background-size: cover;
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
	.dczc-wdjp{
		top: 150rpx;
	}

	.fpv {
		position: absolute;
		top: 980rpx;
		left: 56rpx;
	}

	.bl-btn {
		position: fixed;
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
