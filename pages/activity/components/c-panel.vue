<template>
	<div class="zjmd">
		<div class="fc yahei tc jinse"> 
			<div class="bgt"><img :src="titleImg"></div>
			<div >
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			titleImg:{}
		},
		data(){
			return {}
		}
	}
</script>

<style scoped>
	.zjmd{ position:relative;margin-top: 25rpx;}
	.jinse{ color:#da7906;  border:2rpx solid #fdd067; border-radius:20rpx; background-color: #fff;}
	.bgt{ width:100%; display: flex;justify-content: center;}
	.bgt img{
		height: 68rpx;
		width: 40%;
	}
</style>
