<template>
	<view class="gt">
		{{text}}
	</view>
</template>

<script>
	export default{
		props:{
			text:{}
		}
	}
</script>

<style scoped>
	.gt{
		height: 85rpx;
		font-size: 30rpx;
		padding-left: 25rpx;
		line-height: 85rpx;
	}
</style>
