<template>
	<view>
		<view class="header">装宽带</view>
		<FormItem label="抽中奖品">{{jp}}</FormItem>
		<Title text="更具国家实名制要求,请准确提供身份证信息"></Title>
		<FormItem label="您的姓名" v-model="name" placeholder="请输入身份证姓名"></FormItem>
		<FormItem label="身份证号" v-model="idCardCode" placeholder="请输入身份证号"></FormItem>
		<FormItem label="联系电话">{{phoneNum}}</FormItem>
		<Title text="请填写宽带安装地址"></Title>
		<FormItem label="宽带选址" v-model="adressObj.addrName" placeholder="请选择地址" @vFocus="selectLocation"></FormItem>
		<FormItem :showLabel="false" v-model="addressDetails" placeholder="请手动输入详细安装"></FormItem>
		<view class="bt">
			<view class="price">
				<view class="lb">订单金额：</view>
				<view class="amont">￥{{price}}</view>
			</view>
			<view @click="commit" class="btn">提交</view>
		</view>
	</view>
</template>

<script>
	import FormItem from "./FormItem.vue"
	import Title from "./FormTitle.vue"
	import api from "./api.js"
	import md5 from "../../common/api/md5.js"
	import {isEmpty} from "../../common/common.js"
	require("../../common/selectMapUtil.js")

	export default {
		components: {
			FormItem,
			Title
		},
		data() {
			return {
				name: "",
				idCardCode: "",
				addressDetails: "",
				phoneNum: '',
				jp: "50M 24个月免费宽带加装",
				price: 200,
				adressObj: {
					ability: "",
					addrId: "",
					addrName: "安徽合肥合肥市蜀山区蜀山经济开发区井岗路大富山庄35幢1单元14层1405室",
					positionType: "",
					siteCode: "",
					siteId: "",
					siteName: "",
					subAreaId: ""
				},
				storeId:"",
				userId:"",
				sourceCode:""
			}
		},
		methods: {
			selectLocation() {
				let that = this
				Comm.wapMapAddress((addr) => {
					this.adressObj=addr
				})
			},
			commit() {
				if(isEmpty(this.name)){
					uni.showToast({
						title:"请输入您的姓名！",
						icon:"none"
					})
					return
				}
				if(isEmpty(this.idCardCode)){
					uni.showToast({
						title:"请输入身份证号！",
						icon:"none"
					})
					return
				}
				if(!Comm.verify.isPhone(this.phoneNum)){
					uni.showToast({
						title:"请输入正确的联系电话！",
						icon:"none"
					})
					return
				}
				uni.showLoading({
					mask: true,
					title: "请稍后"
				})
				api.setupCommit({
					name: this.name,
					idCardCode: this.idCardCode,
					addressDetails: this.addressDetails,
					phoneNum: this.phoneNum,
					jp: this.jp,
					adressObj: this.adressObj,
					storeId:this.storeId,
					userId:this.userId,
					sourceCode:this.sourceCode
				})
				.then(resp => {
					uni.hideLoading()
					var orderObj = {
						// isShop:thes.isShop,
						// isWxApp:thes.isWxApp,
						userId: this.userId,
						storeId: this.storeId,
						productId: "20567",
						bodyDetail: "单C转融活动",
						onlineOrderNo: resp.data,
						phone: this.phoneNum,
						// couponActivityCode:"",
						successUrl:location.href,
						sourceCode: this.sourceCode
					}
					api.unifiedOrder(orderObj)
						.then(resp=>{
							let res = JSON.parse(resp.data)
							var mweb_url = decodeURIComponent(res.mweb_url);
							layer.open({
								type: 2,   //类型
								// shadeClose: true,
								title: false,
								//offset  : '20px',
								shade: 0.3,
								move: false,
								area: ['95%', '95%'],
								btn: ['支付验证', '取消'],
								yes(idx){
									api.payStatuQuery(res.out_trade_no)
										.then(resp=>{
											if(resp.data==="1"){
												uni.showToast({
													title:"支付成功！",
													icon:"success",
													success() {
														setTimeout(()=>{
															layer.close(index)
															uni.navigateBack()
														},1500)
													}
												})
											}else{
												uni.showToast({
													title:"支付失败，请稍后验证！",
													icon:"none"
												})
											}
										})
								},
								btn2(index){
									layer.close(index)
								},
								content: mweb_url
							})
						})
						.catch(msg=>{
							console.log(msg)
							uni.showToast({
								icon:"none",
								title:"预支付失败！"
							})
						})
				})
				.catch(msg=>{
					uni.hideLoading()
					console.log(msg)
					uni.showToast({
						icon:"none",
						title:"下单失败！"
					})
				})
			}
		},
		onLoad(options) {
			if(options.storeId)
				this.storeId=options.storeId
			if(options.userId)
				this.userId=options.userId
			if(options.sourceCode)
				this.sourceCode=options.sourceCode
			this.phoneNum = uni.getStorageSync("phoneNum")
		}
	}
</script>

<style scoped>
	.bt {
		height: 100rpx;
		width: 100%;
		position: fixed;
		bottom: 0rpx;
		display: flex;
	}

	.price {
		background: #FFFFFF;
		width: 50%;
		display: flex;
		flex-direction: column;
	}

	.btn {
		background: #ff8201;
		font-size: 35rpx;
		line-height: 100rpx;
		text-align: center;
		width: 50%;
		color: #FFFFFF;
	}

	.lb {
		font-size: 30rpx;
		font-weight: bold;
		padding: 18rpx 30rpx 0rpx 30rpx;
	}

	.amont {
		font-size: 25rpx;
		color: #f08113;
		font-weight: bold;
		padding: 10rpx 35rpx;
	}

	.header {
		height: 100rpx;
		width: 100%;
		background-color: #FFFFFF;
		font-size: 40rpx;
		text-align: center;
		line-height: 100rpx;
		margin-bottom: 2rpx;
	}
</style>
