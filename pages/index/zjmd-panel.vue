<template>
	<cPanel title="中奖名单">
		<ul id="sliderUl">
			<swiper class="list_lh"
				display-multiple-items='6'
				:interval='3000'
				:vertical='true'
				:duration='1000'
				:autoplay='rcdList.length>6'
			>
				<swiper-item class="bbxd" v-for="itm in rcdList">
					<li>{{itm.tel}}<span class="pl10 pr10">{{itm.tel?'抽中':''}}</span>{{itm.cnp}}</li>
				</swiper-item>
			</swiper>
		</ul>
	</cPanel>
</template>

<script>
	import cPanel from "./panel.vue"
	export default{
		components:{
			cPanel
		},
		props:{
			rcdList:{
				default:[]
			}
		}
	}
</script>

<style scoped>
	.list_lh{ height:400rpx; overflow:hidden; padding:0px 20rpx; line-height:70rpx; padding-bottom:-20rpx;}

	.bbxd{border-bottom:1px dashed #c9c8c1;text-align: center;}
	
	#sliderUl {
		padding-bottom: 20rpx;
	}
	
</style>
