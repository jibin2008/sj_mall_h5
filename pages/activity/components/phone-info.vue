<template>
	<view class="body">
		<view class="phone" :class="seleced?'select':''">
			<view class="img">
				<img :src="imgUrl">
			</view>
			<view class="info">
				<view class="name">{{name}}</view>
				<view class="desc">{{desc}}</view>
				<view class="price">
					<text style="font-size: 33rpx;">￥</text>
				{{price}}<text style="font-size: 33rpx;color: #3b3224;">起</text></view>
			</view>
			<img v-if="seleced" class="select-icon" src="https://ah.189.cn/sj/cms/activity/img/202103/xz.png"/>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			imgUrl:{},
			price:{},
			name:{},
			desc:{},
			seleced:{
				default(){
					return false
				}
			}
		}
	}
</script>

<style scoped>
	.body{
		padding: 20rpx 24rpx;
	}
	.phone{
		background: #e4eef9;
		border-radius: 10rpx;
		height: 348rpx;
		display: flex;
		padding: 0rpx 10rpx;
		position: relative;
	}
	.img{
		width: 210rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.img img{
		width: 208rpx;
	}
	.info{
		padding: 70rpx 0rpx 0rpx 32rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	.info .name{
		font-size: 38rpx;
		color: #515151;
		font-weight: bold;
	}
	.info .desc{
		font-size: 24rpx;
		color: #575757;
		line-height: 24rpx;
	}
	.info .price{
		font-size: 54rpx;
		color: #ff0000;
		font-weight: bold;
		padding-top: 40rpx;
	}
	.select {
		border: 2rpx solid #f45a24;
	}
	.select-icon{
		position: absolute;
		bottom: 0rpx;
		right: 0rpx;
		width: 120rpx;
		height: 84rpx;
	}
</style>
