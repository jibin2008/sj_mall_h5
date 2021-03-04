<template>
	<div class="body">
		<div @click="logout" class="logout">【退出】</div>
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
		        <div @click="$refs.myAwardPop.open()" class=" fl w50"><img src="https://ah.189.cn/sj/cms/activity/img/icon_hdgz.png"></div>
		        <div @click="$refs.activityRulesPopup.open()" class=" fl w50 ml10"><img src="https://ah.189.cn/sj/cms/activity/img/icon_wdjp.png"></div>
		    </div>
		    <div class=" clear"></div>
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
		        </div>
		    </div>
		</div>
		
		</div>
		<div class="footer">版权所有  中国电信安徽公司</div>
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
	
	import { getActAward,getActAwardRecord,getActAwardRecordTop20,receiveCoupon,getAwardList } from './apiNew.js'
	import {parseType} from './utils.js'
	import { queryLocalPhoneNumber } from '@/common/mm.js'
	
	
	export default {
		components:{Turntable,
			MyAwardPopup,
			ActivityRulesPopup,
			AwardResultAlreadyPop,
			AwardResultSuccessPop,
			ChangePhonePopup
		},
		computed:{
			cnpText(){
				if(this.awardsList.length>0){
					let award = this.awardsList[this.awardIndex]
					return award.text + parseType(award.type)
				}else{
					return ''
				}
			}
		},
		data() {
			return {
				awardsList:[],
				allAwardListTop:[
					{tel:'177****9369',cnp:'30元天翼看家优惠券'},
					{tel:'177****9369',cnp:'30元天翼看家优惠券'},
					{tel:'177****9369',cnp:'30元天翼看家优惠券'},
					{tel:'177****9369',cnp:'30元天翼看家优惠券'},
					{tel:'177****9369',cnp:'30元天翼看家优惠券'},
					{tel:'177****9369',cnp:'30元天翼看家优惠券'},
					{tel:'177****9369',cnp:'30元天翼看家优惠券'},
					{tel:'177****9369',cnp:'30元天翼看家优惠券'},
					{tel:'177****9369',cnp:'30元天翼看家优惠券'},
				],
				myAwardRecordList:[],
				awardIndex:0,
				phone:'',
				userId:'',
				storeId:''
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
				this.refreshActAwardRecord(()=>{
					if(this.myAwardRecordList.length>0){
						this.$refs.awardResultAlreadyPop.open()
					}else{
						uni.showLoading({
						    title: '请稍后'
						})
						getActAward(this.phone).then(rsp=>{
							uni.hideLoading()
							if(rsp.data.result===0){
								this.awardIndex=rsp.data.awardIndex
								this.$refs.turntable.rotate(rsp.data.awardIndex)
								this.refreshActAwardRecord()
							}else if(rsp.data.result===1){
								uni.showToast({
									title: rsp.data.errorMsg,
									icon:'none'
								})
							}else{
								this.refreshActAwardRecord()
							}
						})
					}
				})
			},
			refreshActAwardRecord(callback){
				getActAwardRecord(this.phone).then(rsp=>{
					if(rsp.data.result===0){
						if(rsp.data.awardRecordList.length>0){
							this.myAwardRecordList=rsp.data.awardRecordList.map(itm=>{
								let award = this.awardsList[itm.awardId]
								return {
									couponName:award.text+parseType(award.type),
									awardId:itm.awardId,
									prodCode:award.productCode
								}
							})
						}
						if(callback)
							callback()
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
			logout(){
				this.$refs.changePhonePopup.open()
			}
		},
		onLoad(option){
			if(option.phoneNum)
				this.phone=option.phoneNum
			if(option.userId)
				this.userId=option.userId
			if(option.storeId)
				this.storeId=option.storeId
		},
		created() {
			getAwardList().then(resp=>{
				this.awardsList=resp.data
				getActAwardRecordTop20().then(resp=>{
					this.allAwardListTop=resp.data.awardRecordList.map(itm=>{
						let award=this.awardsList[itm.awardId];
						return {
							tel:itm.phoneNumber,
							cnp:award.text + parseType(award.type)
						}
					})
				})
			})
		},
		onReady() {
			queryLocalPhoneNumber()
				.then(phoneNum=>{
					this.phone=phoneNum
					this.refreshActAwardRecord()
				})
				.catch(msg=>{
					this.$refs.changePhonePopup.open()
				})
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
		background: #3280ed url(https://ah.189.cn/sj/cms/activity/img/cjbg_01.png) no-repeat top;
		background-size: contain;
		padding-top: 311rpx;
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
	.zjmd{ position:relative;margin-top: 25rpx;}
	.jinse{ color:#da7906;  border:1px solid #fdd067; border-radius:10px; padding-bottom:20px;background-color: #fff;}
	.couten{
		width:100%; 
		margin:0 auto; 
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

</style>
