<template>
	<div class="content">
		<img class="dczc-hdgz" src="/static/img/hdgz.png"></img>
		<img src="/static/img/btn.png" class="bl-btn" @click="handle"/>
		
		<fzItm class="fpv"></fzItm>
	</div>
</template>

<script>
	import fzItm from "./fzItm.vue"
	import api from "./api.js"
	export default {
		components:{fzItm},
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			showAward(e){
				debugger
			},
			handle(){
				api.isTarget("17309693263").then(resp=>{
					console.log(resp.data)
				})
			}
		}
	}
</script>

<style>
	.content {
		background-image: url(../../static/img/bg.jpg);
		background-repeat: no-repeat;
		background-size: contain;
		width: 750rpx;
		height: 4675rpx;
		position: relative;
	}
	.dczc-hdgz{
		position: absolute;
		right: 0rpx;
		top: 23rpx;
		width: 126rpx;
		height: 44rpx;
	}
	.fpv{
		position: absolute;
		top: 974rpx;
		left: 60rpx;
	}
	.bl-btn{
		position: absolute;
		bottom: 30rpx;
		width: 650rpx;
		height: 106rpx;
		left: 50rpx;
	}
</style>
