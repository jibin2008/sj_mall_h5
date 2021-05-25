<template>
	<view class="img content">
		<view @click="targetJudge" class="img btn"></view>
		<GetPhoneNumPop v-model="phone" ref="getPhoneNumPop"></GetPhoneNumPop>
		<SuccessResultPop @use="buy" ref="successResultPop"></SuccessResultPop>
		<FailtResultPop ref="failtResultPop"></FailtResultPop>
	</view>
</template>

<script>
	import api from "./api.js"
	import { queryLocalPhoneNumber,getSms,userH5Login } from "../../common/mm.js"
	import GetPhoneNumPop from "./change-phone-popup.vue"
	import SuccessResultPop from "./award-result-success-popup.vue"
	import FailtResultPop from "./award-result-fai-popup.vue"
	import {isEmpty} from "../../common/common.js"
	export default {
		components:{
			GetPhoneNumPop,FailtResultPop,SuccessResultPop
		},
		data() {
			return {
				phone:'',
				userId:'',
				storeId:'741',
				sourceCode:'',
			}
		},
		computed:{
		},
		onLoad(option) {
			if(option.userId)
				this.userId=option.userId
			if(option.mid)
				this.userId=option.mid
				
			if(option.storeId)
				this.storeId=option.storeId
			if(option.shopId)
				this.storeId=option.shopId
				
			if(option.sourceCode)
				this.sourceCode=option.sourceCode
		},
		methods: {
			targetJudge(){
				if(isEmpty(this.phone)){
					queryLocalPhoneNumber()
					.then(phone=>{
						this.phone=phone
					})
					.catch(msg=>{
						this.$refs.getPhoneNumPop.open()
					})
				}else{
					uni.showLoading({
						title:"请稍后~~~",
						mask:true
					})
					api.isTarget(this.phone).then(isTg=>{
						uni.hideLoading()
						if(isTg.data)
							this.$refs.successResultPop.open()
						else
							this.$refs.failtResultPop.open()
					})
				}
			},
			buy(){
				uni.showLoading({
					title:"请稍后~~~",
					mask:true
				})
				api.buy({
					storeId:this.storeId,
					userId:this.userId,
					phone:this.phone,
					sourceCode:this.sourceCode
				}).then(url=>{
					uni.hideLoading()
					window.location.href=url.data
				}).catch(msg=>{
					uni.hideLoading()
					uni.showToast({
						title:msg
					})
				})
			}
		},
		watch:{
			phone(val){
				this.targetJudge()
			}
		}
	}
</script>

<style>
	.img{
		background-repeat: no-repeat;
		background-size: contain;
	}
	.content {
		background-image: url(../../static/img/kdbg1.jpg);
		width: 750rpx;
		height: 3422rpx;
	}
	.btn{
		background-image: url(../../static/img/icon.png);
		width: 530rpx;
		height: 102rpx;
		left: 110rpx;
		top: 880rpx;
		position: absolute;
	}
</style>
