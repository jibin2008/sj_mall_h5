<template>
	<view class="fp">
		<fp id="itm1" :result="resultIMg" class="itm" :show="idxShow(0)" @showRslt="showResult(0)"></fp>
		<fp id="itm2" :result="resultIMg" class="itm" :show="idxShow(1)" @showRslt="showResult(1)"></fp>
		<fp id="itm3" :result="resultIMg" class="itm" :show="idxShow(2)" @showRslt="showResult(2)"></fp>
	</view>
</template>

<script>
	import fp from "./fz.vue"
	export default{
		props:{
			resultIMg:{
			}
		},
		components:{
			fp
		},
		data(){
			return {
				show:false,
				resultIndex:0,
				hasClick:false
			}
		},
		methods:{
			idxShow(idx){
				return this.show&&idx===this.resultIndex
			},
			showResult(idx){
				if(this.hasClick)
					return
				this.hasClick=true
				this.resultIndex=idx
				this.show=true
				this.$emit("kj")
			},
			reset(){
				this.hasClick=false
				this.show=false
			}
		}
	}
</script>

<style scoped>
	.fp{
		width: 630rpx;
		padding: 40rpx 0rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.fp .itm{
		width: 187rpx;
		height: 239rpx;
		margin: 0rpx 10rpx;
	}
</style>
