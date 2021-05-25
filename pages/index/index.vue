<template>
	<div class="content">
		<div class="logout">
			<text>{{this.isLogin?this.phoneS:'您好！'}}【</text>
			<text style="text-decoration: underline;" @click="logout">{{this.isLogin?'退出':'请登录'}}</text>
			<text>】</text>
		</div>
		
		<image mode="widthFix" src="../../static/img/f_01.jpg"></image>
		<view class="fp-view">
			<fzItm ref="fp" @fz="kj" 
				:resultIMg="'https://ah.189.cn/sj/cms/activity/dc/static/img/3.png'" 
				class="fpv">
				
			</fzItm>
		</view>
		<ZjmdPanel :rcdList="allAwardListTop"></ZjmdPanel>
		<panel title="活动规则">
			<view class="rules">
				<p>一、参与用户范围：安徽电信用户。</p>
				<p>二、活动时间：2021年6月1日—2021年6月30日。</p>
				<p>三、抽奖规则：活动期间内，同一手机号码每日可参与1次翻卡，中奖概率随机。</p>
				<p>四、奖品包含：20元优惠券、50元优惠券（仅限办理指定业务使用）。</p>
				<p>五、奖品使用范围：</p>
				<p>1、若您翻到优惠券类奖品，将跳转至相应的活动页，具体办理规则以跳转活动页提示为准。业务订购成功后，优惠券将以翼支付权益金的形式在7个工作日内充值到参与号码的翼支付账户中。</p>
				<p>2、优惠券有效期为24小时，请您抽到奖品后及时使用。</p>
				<p>六、翼支付权益金到账及使用说明：</p>
				<p>1、使用规则：可在翼支付合作的各类商户及翼支付客户端使用，可拆分多次使用，有效期120天(过期作废不可补赠送)，翼支付账户等级必须为二星级及以绑卡上用户，更多使用详情见翼支付客户端；</p>
				<p>2、查询方式：登录翼支付客户端—我的—权益金；</p>
				<p>3、办理前请先确认翼支付账户是否正常，若翼支付账户异常（未开通账户/黑名单限制/星级未达到二星等）则无法赠送，解决账户异常后可在我的奖品中补领。</p>
				<p>七、特别提醒:</p>
				<p>1、对于任何通过不正当或第三方技术手段恶意攻击、篡改活动的参与活动者，安徽电信有权在不事先通知的情况下取消其参加活动及得奖资格；</p>
				<p>2、如遇不可抗力因素，本次活动因故无法进行时，安徽电信在法律允许的范围内有权决定取消、终止、修改或暂停本活动。</p>
			</view>
		</panel>
		
		
		<span class="dczc-hdgz" 
		@click="$refs.myAwardPop.open()">
			<image mode="widthFix" src="../../static/img/icon.png"></image>
		</span>
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
	import { 
		getActAwardRecord,
		getActAward,
		getActAwardRecordTop20,
		recode
	} from "./api.js"
	import ChangePhonePopup from "../activity/components/popup/change-phone-popup.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import myAwardRcd from "../activity/components/popup/my-award-popup.vue"
	import panel from "./panel.vue"
	import ZjmdPanel from "./zjmd-panel.vue"	
	import {
		queryLocalPhoneNumber
	} from '@/common/mm.js'
	export default {
		components: {
			fzItm,
			ChangePhonePopup,
			uniPopup,
			myAwardRcd,
			panel,
			ZjmdPanel
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
				awardsList:[
					{
						"productCode": 18367,
						"icon": "/static/imgs/50.png",
						"text": "50元直升5G",
						textType:"优惠券"
					},
					{
						"productCode": 18981,
						"icon": "/static/imgs/20.png",
						"text": "20元语音流量",
						textType:"优惠券"
					},
					{
						"icon": "/static/imgs/VR.png",
						"text": "VR体验券"
					},
					{
						"icon": "/static/imgs/5.png",
						"text": "谢谢参与"
					},
					{
						"productCode": 18953,
						"icon": "/static/imgs/50.png",
						"text": "50元5G畅想",
						textType:"年包优惠券"
					},
					{
						"productCode": 11161,
						"icon": "/static/imgs/20.png",
						"text": "20元会员权益",
						textType:"月包优惠券"
					}
				],
				phoneNum: "",
				storeId:"",
				userId:"",
				sourceCode:"",
				myAwardList:[],
				allAwardListTop:[]
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
					uni.hideLoading()
					this.phoneNum = phoneNum
					this.refreshActAwardRecord()
				})
				.catch(msg => {
					uni.hideLoading()
					this.$refs.changePhonePopup.open()
				})
			recode()
			getActAwardRecordTop20().then(resp=>{
				this.allAwardListTop=resp.data.filter(itm=>{
					return itm.awardId!==2
				}).map(itm=>{
					let award=this.awardsList[itm.awardId];
					return {
						tel:itm.phoneNumber,
						cnp:award.text + (award.textType?award.textType:"")
					}
				})
			})
		},
		methods: {
			showAward(e) {},
			handle() {
			},
			logout() {
				this.phoneNum = ""
				this.$refs.fp.reset()
			},
			kj(idx){
				if(this.phone===''){
					this.$refs.changePhonePopup.open()
					return
				}
				uni.showLoading({
					title: '请稍后'
				})
				this.refreshActAwardRecord(()=>{
					if(this.myAwardList.length>0){
						uni.hideLoading()
						uni.showToast({
							title:"您今天已经参加过本次活动！"
						})
					}else{
						getActAward({
							phoneNumber:this.phoneNum,
							storeId:this.storeId,
							userId:this.userId,
							sourceCode:this.sourceCode,
							byChanel:this.byChanel
						}).then(rsp=>{
							uni.hideLoading()
							this.awardIndex=rsp.data
							let award = this.awardsList[this.awardIndex]
							this.$refs.fp.showResult(idx,this.awardIndex!==3,award.text)
							this.refreshActAwardRecord()
						})
					}
				})
			},
			useNow(awardIdx){
				if(awardIdx===7){
					window.location.href=`https://ah.189.cn/sj/cms/socialH5/product/productList.html?type=0&storeId=${this.storeId}&userId=${this.userId}`
				}
				else{
					let prodCode=this.awardsList[awardIdx].productCode
					window.location.href=`https://ah.189.cn/sj/cms/socialH5/product/other/Detail.html?shareType=1&storeId=${this.storeId}&userId=${this.userId}&productId=${prodCode}`
				}
			},
			refreshActAwardRecord(callback){
				getActAwardRecord(this.phoneNum).then(rsp=>{
					this.myAwardList=rsp.data
					.filter(itm=>{return itm.awardId!==3&&itm.awardId!==2})
					.map(itm=>{
						let award = this.awardsList[itm.awardId]
						return {
							couponName:award.text+(award.textType?award.textType:""),
							awardId:itm.awardId,
							prodCode:award.productCode,
							createTime:itm.createTime
						}
					})
					if(callback)
						callback()
				})
			}
		}
	}
</script>

<style>
	.content {
		background: #ec454f;
		position: relative;
	}
	.content image{
		width: 750rpx;
	}
	.fp-view{
		background: url(../../static/img/f_02.jpg) no-repeat;
		background-size: contain;
		height: 391rpx;
		width: 750rpx;
		padding-top: 130rpx;
	}
	.dczc-hdgz {
		position: absolute;
		right: 0rpx;
		top: 628rpx;
	}
	.dczc-hdgz image{
		width: 172rpx;
		height: 74rpx;
	}

	.fpv {
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
	.rules {
		padding: 0rpx 30rpx;
		font-size: 24rpx;
		color: #999;
		line-height: 36rpx;
	}
</style>
