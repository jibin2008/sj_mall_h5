<template>
	<view class="fp">
		<fp :awardName="awardName" :award="awardL[0]" id="itm1" class="itm" :show="idxShow(0)" @showRslt="click(0)"></fp>
		<fp :awardName="awardName" :award="awardL[1]" id="itm2" class="itm" :show="idxShow(1)" @showRslt="click(1)"></fp>
		<fp :awardName="awardName" :award="awardL[2]" id="itm3" class="itm" :show="idxShow(2)" @showRslt="click(2)"></fp>
	</view>
</template>

<script>
	import fp from "./fz.vue"
	export default{
		components:{
			fp
		},
		data(){
			return {
				show:false,
				resultIndex:0,
				hasClick:false,
				awardL:[
					false,false,false
				],
				awardName:''
			}
		},
		methods:{
			idxShow(idx){
				return this.show&&idx===this.resultIndex
			},
			showResult(idx,award,awardName){
				let awT=[false,false,false]
				awT[idx]=award
				this.awardL=awT
				this.awardName=awardName
				this.resultIndex=idx
				this.show=true
			},
			reset(){
				this.hasClick=false
				this.show=false
			},
			click(idx){
				// if(this.hasClick)
				// 	return
				// this.hasClick=true
				this.$emit("fz",idx)
			}
		}
	}
</script>

<style scoped>
	.fp{
		padding: 40rpx 0rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.fp .itm{
		width: 187rpx;
		height: 239rpx;
		margin: 0rpx 5rpx;
	}
</style>
