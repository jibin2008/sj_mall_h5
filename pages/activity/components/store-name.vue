<template>
		<view class="shop-info">
			<view class="shop-name">
				<img class='icon-dw' src="https://ah.189.cn/sj/cms/activity/img/icon-dw.png"/>
				<text style="margin-left: 10rpx;">{{storeName}}</text>
			</view>
		</view>
</template>

<script>
	export default{
		props:{
			storeName:{}
		}
	}
</script>

<style scoped>
	.shop-info{
		height: 58rpx;
		display: flex;
		justify-content: center;
		font-size: 32rpx;
		color: #FFFFFF;
	}
	.shop-name{
		background-color: #0956ba;
		text-align: center;
		border:2rpx solid #FFFFFF;
		border-radius: 40rpx;
		padding: 5rpx 40rpx;
		height: 100%;
		display: flex;
		align-items: center;
		font-weight: bold;
	}
	.icon-dw{
		width: 29rpx;
		height: 38rpx;
	}
</style>
