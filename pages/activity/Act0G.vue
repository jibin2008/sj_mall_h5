<template>
	<Loading :logout="isLogout" @ready="dataReady" v-if="loading" :storeId="storeId"></Loading>
	<div v-else class="body" :class="storeInfo.sjUser.latnId==='555'?'bg-mas':''">
		<div class="logout">
			<text>{{this.isLogin?this.phoneS:'您好！'}}【</text>
			<text style="text-decoration: underline;" @click="logout">{{this.isLogin?'退出':'请登录'}}</text>
			<text>】</text>
		</div>
		
		<StoreInfo :storeName="storeInfo.storeName"></StoreInfo>
		
		<view class="wl">
			<view v-if="showNetAgeInfo" class="wl-bg">
				<img class='wl-lb' src="https://ah.189.cn/sj/cms/activity/img/lb.png"/>
				<text>经检测: 您当前已经在网</text>
				<text class="wl-zd">{{awardInfo.netAge}}年</text>
				<text>，可获得</text>
				<text class="wl-zd">{{awardInfo.netAgeAmount}}元</text>
				<text>购机直降金额</text>
			</view>
		</view>
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
		    <div class="mt20 btn">
		        <div @click="openMy" class=" fl w50"><img src="https://ah.189.cn/sj/cms/activity/img/icon_hdgz.png"></div>
		        <div @click="$refs.activityRulesPopup.open()" class=" fl w50 ml10"><img src="https://ah.189.cn/sj/cms/activity/img/icon_wdjp.png"></div>
		    </div>
		    <div class=" clear">
		</div>
		<!--中奖名单-->
		<div class="zjmd">
			<div class="fc yahei tc jinse"> 
				<div class="bgt"><img src="https://ah.189.cn/sj/cms/activity/img/c_06.jpg"></div>
				<div >
					<ul id="sliderUl">
						<swiper class="list_lh"
							display-multiple-items='6'
							:interval='3000'
							:vertical='true'
							:duration='1000'
							:autoplay='allAwardListTop.length>6'
						>
							<swiper-item class="bbxd" v-for="itm in allAwardListTopC">
								<li>{{itm.tel}}<span class="pl10 pr10">{{itm.tel?'抽中':''}}</span>{{itm.cnp}}</li>
							</swiper-item>
						</swiper>
					</ul>
				</div>
			</div>
		</div>
		
		</div>
		
		<view class="jxsj">
			<!-- <view style="left: 310rpx; top: 320rpx;" class="btn-ljqg">立即抢购</view>
			<view style="left: 310rpx; top: 693rpx;" class="btn-ljqg">立即抢购</view>
			<view style="left: 310rpx; top: 1066rpx;" class="btn-ljqg">立即抢购</view> -->
		</view>
		<!-- <div class="footer">版权所有  中国电信安徽公司</div> -->
		<div @click="copyUrl" class="fx">
	      <img src="https://ah.189.cn/sj/cms/activity/img/icon-fx.png"/>分享链接
		</div>
		<MyAwardPopup @use='useNow' ref='myAwardPop' :awardRecordList='myAwardList1'></MyAwardPopup>
		<ActivityRulesPopup :latnId='storeInfo.sjUser.latnId' ref='activityRulesPopup'></ActivityRulesPopup>
		<AwardResultAlreadyPop ref='awardResultAlreadyPop'
			@viewAward='$refs.myAwardPop.open()'
			:isTks="this.awardIndex!==7"
		></AwardResultAlreadyPop>
		<AwardResultSuccessPop ref='awardResultSuccessPop'
			@use='useNow(curRcdId)'
			:cnpName="cnpText"
		></AwardResultSuccessPop>
		<AwardResultSuccessPopNew ref='awardResultSuccessPopNew'
			@use='buyPhone'
			:cnpName="cnpTextNew"
		></AwardResultSuccessPopNew>
		
		<!-- <ChangePhonePopup ref="changePhonePopup" v-model="phone"></ChangePhonePopup> -->
	</div>
</template>

<script>
	import Turntable from "./components/turntable/turntable.vue"
	import MyAwardPopup from "./components/popup/my-award-popup.vue"
	import ActivityRulesPopup from "./components/popup/activity-rules-popup.vue"
	import AwardResultAlreadyPop from "./components/popup/award-result-already-popup.vue"
	import AwardResultSuccessPop from "./components/popup/award-result-success-popup.vue"
	import AwardResultSuccessPopNew from "./components/popup/award-result-success-popup_new.vue"
	
	import { 
		useAward,getActAward,getActAwardRecord
		,getActAwardRecordTop20,receiveCoupon
		,getAwardList,insertAwardInterviewLog 
		,recode,terminalBuy} from './api0G.js'
	import {parseType,getCookie} from '@/common/utils.js'
	
	import StoreInfo from './components/store-name.vue'
	import Loading from './loading.vue'
	const terminal_price=[2999,3299,6499]
	const terminal_name=["OPPO Reno5","VIVO S9","华为METO40"]
	export default {
		components:{Turntable,
			MyAwardPopup,
			ActivityRulesPopup,
			AwardResultAlreadyPop,
			AwardResultSuccessPop,
			StoreInfo,
			Loading,
			AwardResultSuccessPopNew
		},
		computed:{
			cnpText(){
				if(this.awardIndex&&this.awardsList.length>0){
					let award = this.awardsList[this.awardIndex]
					return award.text + parseType(award.type) + (award.netAgeAmount?`,并且鉴于您是老用户还将赠送您#{award.netAgeAmount}元5G终端购机券`:'')
				}else{
					return ''
				}
			},
			cnpTextNew(){
				if(this.awardIndex&&this.awardsList.length>0){
					let award = this.awardsList[this.awardIndex]
					let total = this.awardsList[this.awardIndex].price + this.awardInfo.netAgeAmount
					return total+ '元' + parseType(award.type) + (award.netAgeAmount?`,并且鉴于您是老用户还将赠送您#{award.netAgeAmount}元5G终端购机券`:'')
				}else{
					return ''
				}
			},
			phoneS(){
				return this.phone===''?'':(this.phone.substr(0,3)+'****'+this.phone.substr(7,4))
			},
			isLogin(){
				return this.phone!==''
			},
			allAwardListTopC(){
				let list=JSON.parse(JSON.stringify(this.allAwardListTop))
				if(list.length<6){
					for(let n=0;n<6-list.length;n++)
						list.push({})
				}
				return list
			},
			myAwardList1(){
				return this.myAwardRecordList.filter(it1=>{
					return it1.awardId!==7
				}).map(it=>{
					return {
						couponName:this.awardsList[it.awardId].text + parseType(this.awardsList[it.awardId].type),
						awardId:it.awardId,
						rcdId:it.id,
						type:this.awardsList[it.awardId].type,
						status:it.status,
						createTime:it.createTime
					}
				})
			},
			showNetAgeInfo(){
				return this.awardInfo.netAge&&this.awardInfo.netAge!==0
			}
		},
		data() {
			return {
				awardsList:[],
				allAwardListTop:[],
				myAwardRecordList:[],
				awardIndex:0,
				phone:'',
				userId:'',
				storeId:'741',
				byChanel:'',
				sourceCode:'',
				netAge:0,
				netAgeAmount:200,
				storeInfo:{
					sjUser:{}
				},
				loading:true,
				awardInfo:{},
				isLogout:false,
				hasRotate:false,
				curRcdId:''
			}
		},
		methods: {
			rotateStart(){
				if(!this.hasRotate&&this.awardInfo.awardIndex){
					this.hasRotate=true
					this.$refs.turntable.rotate(this.awardIndex)
				}else if(this.myAwardRecordList.length===0){
					
				}
				else{
					this.$refs.awardResultAlreadyPop.open()
				}
			},
			useNow(rcdId){
				uni.showLoading({
					title: '努力加载中，请稍候'
				})
				useAward({
					actId:rcdId,
					storeId:this.storeId,
					userId:this.userId
				}).then(resp=>{
					uni.hideLoading()
					this.myAwardRecordList = this.myAwardRecordList.map(it=>{
						if(it.id===rcdId)
							it.status=1
						return it
					})
					uni.showToast({
						title: "使用成功！"
					})
				})
			},
			logout(){
				this.isLogout=true
				this.loading=true
			},
			copyUrl(){
				window.clipboardData.setData("Text",window.location.href)
				uni.showToast({
					title: "复制成功！"
				})
			},
			getAward(){
				if(this.awardIndex!==7){
					if(this.awardIndex===0
						||this.awardIndex==2
						||this.awardIndex==4
						||this.awardIndex==6){
						this.$refs.awardResultSuccessPopNew.open()
					}else{
						this.$refs.awardResultSuccessPop.open()
					}
				}
				else
					uni.showToast({
						title: "感谢您的参与！！"
					})
			},
			dataReady(data){
				this.awardsList=data.itmLst
				this.myAwardRecordList=data.rcdLst
				this.awardInfo=data.awardInfo
				this.storeInfo=data.storeInfo
				this.phone = data.phoneNum
				this.loading=false
				this.awardIndex=this.awardInfo.awardIndex
				this.curRcdId = this.awardInfo.actiId
				getActAwardRecordTop20().then(resp=>{
					let awardRecordList = resp.data.content
					if(awardRecordList)
						this.allAwardListTop=awardRecordList.map(itm=>{
							let award=this.awardsList[itm.awardId];
							return {
								tel:itm.phoneNumber,
								cnp:award.text + parseType(award.type)
							}
						})
				})
			},
			openMy(){
				this.$refs.myAwardPop.open()
			},
			buyPhone(idx){
				uni.showLoading({
					title:"正在下单，请稍后。。"
				})
				terminalBuy({
					storeId:this.storeId
					,phoneNum:this.phone
					,rcdId:this.curRcdId
					// ,rcdId:'f7eb5791f8a245588c832cb2deb79d6f'
					,age:this.awardInfo.netAge
					// ,age:37
					,userId:this.storeInfo.managerUserId
					,price:terminal_price[idx]
					,iterm:terminal_name[idx]
					,yh:this.awardsList[this.awardIndex].price
				}).then(resp=>{
					if(resp.data.result==0){
						uni.hideLoading()
						uni.showToast({
							title: "下单成功！"
						})
					}else{
						uni.showToast({
							title: "下单失败！"
						})
					}
				})
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
			recode()
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
		background: url(https://ah.189.cn/sj/cms/activity/img/cj-bg.jpg) no-repeat top;
		background-size: contain;
		padding-top: 109rpx;
		overflow: hidden;
		height: 3500rpx;
	}
	.bg-mas{
		background: url(https://ah.189.cn/sj/cms/activity/img/202103/cj-bg1.jpg) no-repeat top;
		background-size:contain
	}
	.top{width: 100%;}
	.top img{
		width: 750rpx;
		height: 311rpx;
	}
	.w50{ width:48%;}
	.con{ width:90%; margin:125rpx 5% 0rpx 5%;}
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
	.zjmd{ position:relative;margin-top: 25rpx;}
	.jinse{ color:#da7906;  border:1px solid #fdd067; border-radius:10px; padding-bottom:20px;background-color: #fff;}
	.couten{
		width:750rpx; 
		margin:26rpx auto 0rpx auto; 
		text-align:center;
		background-size: contain;
		height: 665rpx;
		padding-left: 54.5rpx;
		padding-right: 54.5rpx;
	}
	.bbxd{border-bottom:1px dashed #c9c8c1;}
	.logout{
		position: absolute;
		top: 1%;
		right: 3%;
		color: #FFFFFF;
	}
	.fx{
		position: absolute;
		right: 0px;
		top: 900rpx;
		background: #441bbf47;
		border-radius: 60rpx 0px 0px 60rpx;
		color: white;
		display: none;
	}
	.fx img{
		height: 48rpx;
	}
	.jxsj{
		width: 674rpx;
		height: 1212rpx;
		margin-top: 38rpx;
		margin-left: 38rpx;
		background: url(https://ah.189.cn/sj/cms/activity/img/jxsj.jpg) no-repeat top;
		background-size: contain;
		position: relative;
		border: 2rpx solid #fdd067;
		border-radius: 20rpx;
	}
	.btn-ljqg{
		position: absolute;
		width: 195rpx;
		height: 60rpx;
		font-size: 32rpx;
		line-height: 32rpx;
		background-color: #fa3f48;
		font-weight: 900;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 32rpx;
	}
	.wl{
		display: flex;
		justify-content: center;
		margin-top: 534rpx;
	}
	.wl-bg{
		height: 63rpx;
		color: #FFFFFF;
		font-size: 22rpx;
		font-weight: 700;
		background-color: #083671;
		border-radius: 63rpx;
		padding: 0rpx 20rpx;
	}
	.wl-lb{
		width: 36rpx;
		height: 30rpx;
	}
	.wl-zd{
		color: #ffe358;
	}
</style>
