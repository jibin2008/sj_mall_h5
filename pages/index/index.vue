<template>
	<view class="img content">
		<view class="img btn"></view>
	</view>
</template>

<script>
	import api from "./api.js"
	export default {
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
		onLoad() {

		},
		methods: {
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
