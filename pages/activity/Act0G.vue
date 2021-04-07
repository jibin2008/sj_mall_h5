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
		<ZjmdPanel :rcdList='allAwardListTopC'></ZjmdPanel>
		
		<!-- 精选手机 -->
		<JxsjPanel :phoneList="phoneList"></JxsjPanel>
		
		</div>
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
			:phoneList="phoneList"
		></AwardResultSuccessPopNew>
		<AwardResultFailPop ref="awardResultFailPop"></AwardResultFailPop>
		
		<!-- <ChangePhonePopup ref="changePhonePopup" v-model="phone"></ChangePhonePopup> -->
	</div>
</template>

<script>
	import Turntable from "./components/turntable/turntable.vue"
	import MyAwardPopup from "./components/popup/my-award-popup.vue"
	import ActivityRulesPopup from "./components/popup/activity-rules-popup.vue"
	import AwardResultAlreadyPop from "./components/popup/award-result-already-popup.vue"
	import AwardResultSuccessPop from "./components/popup/award-result-success-popup.vue"
	import AwardResultFailPop from "./components/popup/award-result-fai-popup.vue"
	import AwardResultSuccessPopNew from "./components/popup/award-result-success-popup_new.vue"
	import ZjmdPanel from "./components/zjmd-panel.vue"
	import JxsjPanel from "./components/jxsj-panel.vue"
	
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
			AwardResultSuccessPopNew,
			AwardResultFailPop,
			ZjmdPanel,
			JxsjPanel
		},
		computed:{
			cnpText(){
				let award = this.awardsList[this.awardIndex]
				return award?
					(award.text + parseType(award.type) )
					:""
			},
			cnpTextNew(){
				let award = this.awardsList[this.awardIndex]
				return award?(this.yh+ '元' + parseType(award.type)):"奖项文字"
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
			},
			yh(){
				let award = this.awardsList[this.awardIndex]
				if(award){
					return this.awardsList[this.awardIndex].price + (this.awardInfo.netAgeAmount?this.awardInfo.netAgeAmount:0)
				}else
					return 0
			}
		},
		data() {
			return {
				awardsList:[],
				allAwardListTop:[],
				myAwardRecordList:[],
				awardIndex:-1,
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
				curRcdId:'',
				isRoate:false,
				phoneList:[
						{
							name:"天翼一号",
							desc:"1080P高清屏 | 5000mAh大电池",
							img:"https://ah.189.cn/sj/cms/activity/img/202104/tyn01.png",
							price:"1099"
						},
						{
							name:"VIVO S9",
							desc:"前置4400万超清双摄",
							img:"https://ah.189.cn/sj/cms/activity/img/202104/vivo-s9.png",
							price:"2399"
						},
						{
							name:"OPPO Reno5",
							desc:"6400万四摄 | 65W超级闪充",
							img:"https://ah.189.cn/sj/cms/activity/img/202104/oppo-reno5.png",
							price:"2699"
						},
						{
							name:"iPhone12",
							desc:"升维大提速",
							img:"https://ah.189.cn/sj/cms/activity/img/202104/iphone12.png",
							price:"5499"
						}
					]
			}
		},
		methods: {
			rotateStart(){
					// this.$refs.turntable.rotate(this.awardIndex)
					// return
				if(!this.hasRotate&&this.awardIndex!==-1){
					this.hasRotate=true
					this.$refs.turntable.rotate(this.awardIndex)
				}else if(this.myAwardRecordList.length===0){
					
				}
				else{
					this.$refs.awardResultAlreadyPop.open()
				}
			},
			useNow(rcdId,hideLoad,yh){
				if(!hideLoad)
					uni.showLoading({
						title: '努力加载中，请稍候'
					})
				useAward({
					actId:rcdId,
					storeId:this.storeId,
					userId:this.userId,
					yh:this.yh
				}).then(resp=>{
					uni.hideLoading()
					this.myAwardRecordList = this.myAwardRecordList.map(it=>{
						if(it.id===rcdId)
							it.status=1
						return it
					})
					if(!hideLoad)
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
						this.useNow(this.curRcdId,true,this.yh)
						this.$refs.awardResultSuccessPopNew.open()
					}else{
						this.$refs.awardResultSuccessPop.open()
					}
				}
				else
					this.$refs.awardResultFailPop.open()
					// uni.showToast({
					// 	title: "感谢您的参与！！"
					// })
			},
			dataReady(data){
				this.awardsList=data.itmLst
				this.myAwardRecordList=data.rcdLst
				if(data.awardInfo){
					this.awardInfo=data.awardInfo
					this.awardIndex=data.awardInfo.awardIndex
				}
				this.storeInfo=data.storeInfo
				this.phone = data.phoneNum
				this.loading=false
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
				// this.$refs.awardResultSuccessPopNew.open()
				// this.$refs.awardResultFailPop.open()
			},
			buyPhone(phoneIfo){
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
					,price:phoneIfo.price
					,iterm:phoneIfo.name
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
		background: #0342a1 url(https://ah.189.cn/sj/cms/activity/img/cj-bg.jpg) no-repeat top;
		background-size: contain;
		padding-top: 109rpx;
		/* overflow: hidden;
		height: 3500rpx; */
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
	.footer{text-align:center; font:30rpx "微软雅黑";color: #FFFFFF;}
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
