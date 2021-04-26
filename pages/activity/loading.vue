<template>
	<view class="lg-bd" :class="isSpecial(this.stIf.sjUser.latnId)?'bg1':''">
		<StoreInfo :storeName="stIf.storeName"></StoreInfo>
		
		<ChangePhonePopup ref="changePhonePopup" v-model="phoneNum"></ChangePhonePopup>
	</view>
</template>

<script>
	
	import { queryLocalPhoneNumber } from '@/common/mm.js'
	import ChangePhonePopup from "./components/popup/change-phone-popup.vue"
	import StoreInfo from './components/store-name.vue'
	import { getStoreInfo,getActAward,getAwardList,getActAwardRecord,isSpecial,getLatnLvlPrice } from './api0G.js'
	export default{
		props:{
			storeId:{},
			userId:{},
			sourceCode:{},
			byChanel:{},
			logout:{
				default:false
			},
			phone:{}
		},
		components:{
			ChangePhonePopup,
			StoreInfo
		},
		data(){
			return {
				phoneNum:'',
				stIf:{
					sjUser:{}
				},
				hasLoading:false
			}
		},
		created() {
		},
		methods:{
			loadData(phoneNum){
				if(this.hasLoading||!this.stIf.sjUser||!phoneNum||phoneNum==='')
					return
				this.hasLoading=true
				uni.showLoading({
					title: '努力加载中'
				})
				let latnId=this.stIf.sjUser.latnId
				let itmLst=[]
				let rcdLst=[]
				let awardInfo = null
				Promise.all([
					getAwardList().then(itmLst_=>{
						let awdLst = JSON.parse(itmLst_.data.content)
						itmLst = awdLst.map(it=>{
							if(it.type===4){
								let p=this.get4Text(latnId,it.lvl)
								it.text=`${p}元`,
								it.price=p
							}
							return it
						})
					}),
				this.loadMyRecord(phoneNum).then((myAwardRecordList)=>{
					rcdLst=myAwardRecordList
					if(myAwardRecordList.length===0){
						return getActAward({
							phoneNum:phoneNum,
							storeId:this.storeId,
							userId:this.userId,
							sourceCode:this.sourceCode,
							byChanel:this.byChanel
						}).then(rsp=>{
							if(rsp.data.result===0){
								awardInfo = rsp.data.content
								return this.loadMyRecord(phoneNum).then(rcdLst_=>{
									rcdLst=rcdLst_
								})
							}else{
								uni.showToast({
									title: rsp.data.content,
									icon:'none'
								})
							}
						})
					}
				})]).then(()=>{
					uni.hideLoading()
					this.$emit("ready",{
						// awardInfo:{
						// 	awardIndex:0,
						// 	actiId:"11354455",
						// 	netAgeAmount:500,
						// 	netAge:37,
						// 	lvlAmount:129
						// },
						awardInfo,
						rcdLst,
						itmLst,
						storeInfo:this.stIf,
						phoneNum
					})
				})
			},
			loadMyRecord(phoneNum){
				return getActAwardRecord(phoneNum).then(resp=>{
					return Promise.resolve(resp.data.content.filter(i=>i.type!==0))
				})
			},
			get4Text(latnId,lvl){
				let idx=lvl-1
				return getLatnLvlPrice(latnId)[idx]
			},
			loadStoreInfo(){
				return getStoreInfo(this.storeId).then(resp=>{
						this.stIf=resp.data.resultData.store
						this.loadData(this.phoneNum)
					})
			},
			isSpecial(latnId){
				return isSpecial(latnId)
			},
			init(){
				uni.showLoading({
					title: '努力加载中'
				})
				this.loadStoreInfo().then(()=>{
					if(this.logout){
						this.$refs.changePhonePopup.open()
					}else{
						new Promise((rs,rj)=>{
							if(!this.phone||this.phone===''){
								return queryLocalPhoneNumber()
									.then(phoneNum=>{
										return new Promise(()=>{
											this.phoneNum=phoneNum
											this.loadData(phoneNum)
										})
									})
									.catch(msg=>{
										this.$refs.changePhonePopup.open()
										rj(msg)
									})
							}
							else{
								return new Promise(()=>{
									this.phoneNum=this.phone
									this.loadData(this.phone)
								})
							}
						})
						.finally(()=>{
							uni.hideLoading()
						})
					}
				})
			}
		},
		watch:{
			phoneNum(val){
				this.loadData(val)
			}
		}
	}
</script>

<style scoped>
	.lg-bd{
		background-image: url(https://ah.189.cn/sj/cms/activity/img/lg-loading.jpg);
		width: 750rpx;
		height: 1334rpx;
		background-size: 750rpx 1334rpx;
		padding-top: 70rpx;
	}
	
	.bg1{
		background-image: url(https://ah.189.cn/sj/cms/activity/img/lg-loading1.jpg);
	}
</style>
