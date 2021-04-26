<template>
	<view>
		<view class="header">装宽带</view>
		<FormItem label="抽中奖品">{{jp}}</FormItem>
		<Title text="更具国家实名制要求,请准确提供身份证信息"></Title>
		<FormItem label="您的姓名" v-model="name" placeholder="请输入身份证姓名"></FormItem>
		<FormItem label="身份证号" v-model="idCardCode" placeholder="请输入身份证号"></FormItem>
		<FormItem label="联系电话">{{phoneNum}}</FormItem>
		<Title text="请填写宽带安装地址"></Title>
		<FormItem label="宽带选址" v-model="address" placeholder="请选择地址" @vFocus="selectLocation"></FormItem>
		<FormItem :showLabel="false" v-model="addressDetails" placeholder="请手动输入详细安装" ></FormItem>
		<view class="bt">
			<view class="price">
				<view class="lb">订单金额：</view>
				<view class="amont">￥{{price}}</view>
			</view>
			<view class="btn">提交</view>
		</view>
	</view>
</template>

<script>
	import FormItem from "./FormItem.vue"
	import Title from "./FormTitle.vue"
	import api from "./api.js"
	import md5 from "../../common/api/md5.js"
	require("../../common/selectMapUtil.js")
	
	export default{
		components:{
			FormItem,
			Title
		},
		data(){
			return {
				name:"",
				idCardCode:"",
				address:"",
				addressDetails:"",
				phoneNum:'',
				jp:"50M 24个月免费宽带加装",
				price:200,
				adressObj:{
					
				}
			}
		},
		methods:{
			selectLocation(){
				let that = this
				// uni.chooseLocation({
				//     success: function (res) {
				//         console.log('位置名称：' + res.name);
				//         console.log('详细地址：' + res.address);
				//         console.log('纬度：' + res.latitude);
				//         console.log('经度：' + res.longitude);
				// 		that.address=res.address
				//     }
				// })
				Comm.wapMapAddress()
			},
			commit(){
				uni.showLoading({
					mask:true,
					title:"请稍后"
				})
				api.setupCommit({
					name:this.name,
					idCardCode:this.idCardCode,
					address:this.address,
					addressDetails:this.addressDetails,
					phoneNum:this.phoneNum,
					jp:this.jp,
					adressObj:this.adressObj
				}).then(resp=>{
					uni.hideLoading()
					uni.showToast({
						title:"恭喜您下单成功！"
					})
				})
			}
		},
		onLoad() {
			this.phoneNum=uni.getStorageSync("phoneNum")
		}
	}
</script>

<style scoped>
	.bt{
		height: 100rpx;
		width: 100%;
		position: fixed;
		bottom: 0rpx;
		display: flex;
	}
	.price{
		background: #FFFFFF;
		width: 50%;
		display: flex;
		flex-direction: column;
	}
	.btn{
		background: #ff8201;
		font-size: 35rpx;
		line-height: 100rpx;
		text-align: center;
		width: 50%;
		color: #FFFFFF;
	}
	.lb{
		font-size: 30rpx;
		font-weight: bold;
		padding: 18rpx 30rpx 0rpx 30rpx;
	}
	.amont{
		font-size: 25rpx;
		color: #f08113;
		font-weight: bold;
		padding: 10rpx 35rpx;
	}
	.header{
		height: 100rpx;
		width: 100%;
		background-color: #FFFFFF;
		font-size: 40rpx;
		text-align: center;
		line-height: 100rpx;
		margin-bottom: 2rpx;
	}
</style>
