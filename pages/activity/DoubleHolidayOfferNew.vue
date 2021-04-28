<template>
	<div class="body">
		<div class="logout">
			<text>{{this.isLogin?this.phoneS:'您好！'}}【</text>
			<text style="text-decoration: underline;" @click="logout">{{this.isLogin?'退出':'请登录'}}</text>
			<text>】</text>
		</div>
		<!--大转盘-->
		<div class="couten">
			<Turntable
				ref='turntable'
				:awardsList="awardsList"
				@end='getAward'
				@startClick='rotateStart'
			></Turntable>
		</div>
		
		<div class="con">
		  <!--中奖名单-->
		  <wPanel title="中奖名单">
			  <ul class="tc">
				<swiper class="list_lh"
					display-multiple-items='6'
					:interval='3000'
					:vertical='true'
					:duration='1000'
					:autoplay='allAwardListTop.length>6'
				>
					<swiper-item class="bbxd" v-for="itm in allAwardListTop">
						<li>{{itm.tel}}<span class="pl10 pr10">抽中</span>{{itm.cnp}}</li>
					</swiper-item>
					<template v-if="allAwardListTop.length<6" >
						<swiper-item class="bbxd" v-for="itm in 6-allAwardListTop.length">
							<li> <span class="pl10 pr10"> </span> </li>
						</swiper-item>
					</template>
				</swiper>
			  </ul>
		  </wPanel>
		  
		  <wPanel title="活动规则">
			  <view class="rules">
				<p>一、参与用户范围：安徽电信用户。</p>
				<p>二、活动时间：2021年5月1日—2021年5月31日；</p>
				<p>三、抽奖规则：活动期间内，同一手机号码每日均可参与1次抽奖，中奖概率随机。</p>
				<p>四、奖品包含：50元直升5G优惠券、20元语音流量优惠券、50元5G畅享年包优惠券、20元会员权益月包优惠券、VR体验券。</p>
				<p>五、奖品规则：</p>
				<p>1、若您抽取了优惠券类奖品，将跳转至相应的活动页，具体办理规则以跳转活动页提示为准。业务订购成功后，优惠券将以翼支付权益金的形式在7个工作日内充值到参与号码的翼支付账户中。</p>
				<p>2 若您抽取了VR体验券，可直接到线下厅店体验使用。</p>
				<p>3、优惠券和VR体验券有效期为24小时，请您抽到奖品后及时使用。</p>
				<p>六、翼支付权益金到账及使用说明：</p>
				<p>1、使用规则：可在翼支付合作的各类商户及翼支付客户端使用，可拆分多次使用，有效期120天(过期作废不可补赠送)，翼支付账户等级必须为二星级及以绑卡上用户，更多使用详情见翼支付客户端；</p>
				<p>2、查询方式：登录翼支付客户端—我的—权益金；</p>
				<p>3、办理前请先确认翼支付账户是否正常，若翼支付账户异常（未开通账户/黑名单限制/星级未达到二星等）则无法赠送，解决账户异常后可在我的奖品中补领。</p>
				<p>七、特别提醒:</p>
				<p>1、对于任何通过不正当或第三方技术手段恶意攻击、篡改活动的参与活动者，安徽电信有权在不事先通知的情况下取消其参加活动及得奖资格；</p>
				<p>2、如遇不可抗力因素，本次活动因故无法进行时，安徽电信在法律允许的范围内有权决定取消、终止、修改或暂停本活动。</p>
			  </view>
		  </wPanel>
		</div>
		<div @click="copyUrl" class="fx">
	      我的奖品
		</div>
		<MyAwardPopup @use='useNow' ref='myAwardPop' :awardRecordList='myAwardRecordList'></MyAwardPopup>
		<ActivityRulesPopup ref='activityRulesPopup'></ActivityRulesPopup>
		<AwardResultAlreadyPop ref='awardResultAlreadyPop'
			@viewAward='$refs.myAwardPop.open()'
		></AwardResultAlreadyPop>
		<AwardResultSuccessPop ref='awardResultSuccessPop'
			@use='useNow(awardIndex)'
			:cnpName="cnpText"
		></AwardResultSuccessPop>
		
		<ChangePhonePopup ref="changePhonePopup" v-model="phone"></ChangePhonePopup>
	</div>
</template>

<script>
	import Turntable from "./components/turntable/turntable.vue"
	import MyAwardPopup from "./components/popup/my-award-popup.vue"
	import ActivityRulesPopup from "./components/popup/activity-rules-popup.vue"
	import AwardResultAlreadyPop from "./components/popup/award-result-already-popup.vue"
	import AwardResultSuccessPop from "./components/popup/award-result-success-popup.vue"
	import ChangePhonePopup from "./components/popup/change-phone-popup.vue"
	
	import { recode,getActAward,getActAwardRecord,getActAwardRecordTop20,receiveCoupon,getAwardList,insertAwardInterviewLog } from './apiNew.js'
	import {parseType,getCookie} from '@/common/utils.js'
	import { queryLocalPhoneNumber } from '@/common/mm.js'
	import wPanel from "./components/panel.vue"
	
	
	export default {
		components:{Turntable,
			MyAwardPopup,
			ActivityRulesPopup,
			AwardResultAlreadyPop,
			AwardResultSuccessPop,
			ChangePhonePopup,
			wPanel
		},
		computed:{
			cnpText(){
				if(this.awardsList.length>0){
					let award = this.awardsList[this.awardIndex]
					return award.text + parseType(award.type)
				}else{
					return ''
				}
			},
			phoneS(){
				return this.phone===''?'':(this.phone.substr(0,3)+'****'+this.phone.substr(7,4))
			},
			isLogin(){
				return this.phone!==''
			}
		},
		data() {
			return {
				awardsList:[
					{
						"productCode": 18367,
						"icon": "https://ah.189.cn/sj/cms/activity/h51/static/imgs/50.png",
						"text": "50元直升5G",
						textType:"优惠券"
					},
					{
						"productCode": 18981,
						"icon": "https://ah.189.cn/sj/cms/activity/h51/static/imgs/20.png",
						"text": "20元语音流量",
						textType:"优惠券"
					},
					{
						"icon": "https://ah.189.cn/sj/cms/activity/h51/static/imgs/VR.png",
						"text": "VR体验券"
					},
					{
						"icon": "https://ah.189.cn/sj/cms/activity/h51/static/imgs/5.png",
						"text": "谢谢参与"
					},
					{
						"productCode": 18953,
						"icon": "https://ah.189.cn/sj/cms/activity/h51/static/imgs/50.png",
						"text": "50元5G畅想",
						textType:"年包优惠券"
					},
					{
						"productCode": 11161,
						"icon": "https://ah.189.cn/sj/cms/activity/h51/static/imgs/20.png",
						"text": "20元会员权益",
						textType:"月包优惠券"
					}
				]
,
				allAwardListTop:[],
				myAwardRecordList:[],
				awardIndex:0,
				phone:'',
				userId:'',
				storeId:'',
				byChanel:'',
				sourceCode:''
			}
		},
		methods: {
			getAward(){
				this.$refs.awardResultSuccessPop.open()
			},
			rotateStart(){
				if(this.phone===''){
					this.$refs.changePhonePopup.open()
					return
				}
				uni.showLoading({
					title: '请稍后'
				})
				this.refreshActAwardRecord(()=>{
					if(this.myAwardRecordList.length>0){
						uni.hideLoading()
						this.$refs.awardResultAlreadyPop.open()
					}else{
						getActAward({
							phoneNumber:this.phone,
							storeId:this.storeId,
							userId:this.userId,
							sourceCode:this.sourceCode,
							byChanel:this.byChanel
						}).then(rsp=>{
							uni.hideLoading()
							this.awardIndex=rsp.data
							this.$refs.turntable.rotate(rsp.data)
							this.refreshActAwardRecord()
						})
					}
				})
			},
			refreshActAwardRecord(callback){
				if(this.phone&&this.phone!=="")
					getActAwardRecord(this.phone).then(rsp=>{
						this.myAwardRecordList=rsp.data.map(itm=>{
							let award = this.awardsList[itm.awardId]
							return {
								couponName:award.text+parseType(award.type),
								awardId:itm.awardId,
								prodCode:award.productCode,
								createTime:itm.createTime
							}
						})
						if(callback)
							callback()
					})
			},
			useNow(awardIdx){
				if(awardIdx===3||awardIdx===2){
					// window.location.href=`https://ah.189.cn/sj/cms/socialH5/product/productList.html?type=0&storeId=${this.storeId}&userId=${this.userId}`
				}
				else{
					let prodCode=this.awardsList[awardIdx].productCode
					window.location.href=`https://ah.189.cn/sj/cms/socialH5/product/other/Detail.html?shareType=1&storeId=${this.storeId}&userId=${this.userId}&productId=${prodCode}`
				}
			},
			logout(){
				this.phone=''
				this.$refs.changePhonePopup.open()
			},
			copyUrl(){
				this.$refs.myAwardPop.open()
			}
		},
		onLoad(option){
			if(option.phoneNum)
				this.phone=option.phoneNum
			if(option.userId)
				this.userId=option.userId
			if(option.storeId)
				this.storeId=option.storeId
			if(option.byChanel)
				this.byChanel=option.byChanel
			recode().catch(res=>{
				console.log(res)
			})
		},
		created() {
			getActAwardRecordTop20().then(resp=>{
				this.allAwardListTop=resp.data.map(itm=>{
					let award=this.awardsList[itm.awardId];
					return {
						tel:itm.phoneNumber,
						cnp:award.text + award.textType
					}
				})
			})
		},
		onReady() {
			queryLocalPhoneNumber()
				.then(phoneNum=>{
					this.phone=phoneNum
					// this.refreshActAwardRecord()
				})
				.catch(msg=>{
					this.$refs.changePhonePopup.open()
				})
		},
		watch:{
			phone(val){
				this.refreshActAwardRecord()
			}
		}
	}
</script>

<style scoped>
	.mt20 {
		margin-top: 20rpx;
	}
	.ml10{
		margin-left: 10rpx;
	}
	.body{
	    font: 28rpx/64rpx "微软雅黑";
		background: #ffd66a url(../../static/imgs/bg.jpg) no-repeat top;
		background-size: 750rpx auto;
		padding-top: 455rpx;
		overflow: hidden;
	}
	.top{width: 100%;}
	.top img{
		width: 750rpx;
		height: 311rpx;
	}
	.w50{ width:48%;}
	.con{ width:90%; margin:50rpx 5% 0rpx 5%;}
	.con .btn {
		display: flex;
	}
	.con .btn img{
		width: 100%;
		height: 118rpx;
	}
	.bgt{ width:100%; display: flex;justify-content: center;}
	.bgt img{
		height: 68rpx;
		width: 40%;
	}
	.list_lh{ height:400rpx; overflow:hidden; padding:0px 20rpx; line-height:70rpx; padding-bottom:-20rpx;}
	.footer{text-align:center; font:30rpx "微软雅黑";color: #FFFFFF;}
	.couten{
		width:750rpx; 
		margin:0 auto; 
		text-align:center;
		background-size: contain;
		height: 665rpx;
		padding-left: 54.5rpx;
		padding-right: 54.5rpx;
		margin-bottom: 187rpx;
	}
	.bbxd{border-bottom:1px dashed #c9c8c1;color: #3a3a3a;}
	.logout{
		position: absolute;
		top: 1%;
		right: 3%;
		color: #FFFFFF;
	}
	.fx{
		position: absolute;
		right: 0px;
		top: 1117rpx;
		background: #0059c6;
		border-radius: 35rpx 0px 0px 35rpx;
		color: white;
		height: 70rpx;
		line-height: 70rpx;
		padding-left: 35rpx;
		padding-right: 18rpx;
		text-align: center;
	}
	.rules{
		padding: 0rpx 30rpx;
		font-size: 24rpx;
		color: #999999;
		line-height: 36rpx;
	}
</style>
