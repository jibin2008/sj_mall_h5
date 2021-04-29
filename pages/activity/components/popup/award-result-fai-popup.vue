<template>
	<AwardResultPopup ref='popSelf'
		icon='https://ah.189.cn/sj/cms/activity/img/cry.png'
	>
		<template>
			<p class="xxcy">谢谢参与</p>
			<p class="hdtj"></p>
<!-- 			<img @click="redirect" class="hdimg" src="https://ah.189.cn/sj/cms/activity/img/202104/hd.png"/>
 -->			<view style="height: 40rpx;"></view>
		</template>
	</AwardResultPopup>
</template>

<script>
	import AwardResultPopup from './award-result-popup.vue'
	export default{
		components:{AwardResultPopup},
		methods:{
			open(){
				this.$refs.popSelf.open()
			},
			redirect(){
				window.location.href="https://ah.189.cn/sj/cms/socialH5/activity/oneJiaoCoupon/index.html"
			}
		}
	}
</script>

<style scoped>
	.xxcy {
		font-size: 70rpx;
		margin-top: 40rpx;
		color: #463933;
	}
	.hdtj{
		margin-top: 70rpx;
		font-size: 32rpx;
		color: #da7904;
	}
	.hdimg{
		margin-top: 25rpx;
		width: 600rpx;
		height: 256rpx;
	}
</style>
