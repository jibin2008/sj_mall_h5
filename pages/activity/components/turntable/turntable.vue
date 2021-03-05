<template>
	<div class="main" :style="mainStyle">
		<div class="lp ms">
			<div class="lp-context">
				<div class="lp-item-bgs ms">
					<div 
						v-if="idx%2===0" 
						v-for="(item,idx) in awardsList" 
						:style="''+ getTransformItemBg(idx)"
						class="ptl0 lp-item-bg"></div>
				</div>
				<div class="lp-items ms ptl0">
					<div class="lp-item ms ptl0"
						v-for="(item,idx) in awardsList" 
						:style="''+ getTransformItem(idx)"
					>
						<div class="lp-item-context ms">
							<div>{{item.text}}</div>
							<div>{{getTypeText(item.type)}}</div>
							<image mode="aspectFit" class="img" :src="item.icon"></image>
						</div>
					</div>
				</div>
				<view ref='pointer' :animation="animationData" class="lp-point ms ptl0">
					<image @click="$emit('startClick')" class="img" src="https://ah.189.cn/sj/cms/activity/img/pointer.png"></cover>
				</view>
			</div>
		</div>
	</div>
</template>

<script>	
	import {parseType} from '../../utils.js'
	export default {
		props:{
			awardsList:{},
			width:{
				default:'641rpx'
			},
			abaled:{
				type:Boolean,
				default:true
			}
		},
		data(){
			return {
				animationData:null,
				isRunning:false
			}
		},
		computed:{
			height(){
				return this.width
			},
			mainStyle(){
				return `width: ${this.width};height: ${this.height};`
			},
			skewY(){
				return 360/this.awardsList.length
			}
		},
		methods:{
			getTransformItemBg(idx){
				return `transform:rotate(${this.getItemBgRotate(idx)}deg) skewY(-${this.skewY}deg)`
			},
			getTransformItem(idx){
				return `transform:rotate(${this.getItemRotate(idx)}deg)`
			},
			getItemBgRotate(idx){
				return this.getRotate(this.skewY*idx)
			},
			getItemRotate(idx){
				return this.getRotate(this.skewY*(idx+0.5))
			},
			getRotate(rotate){
				return rotate>180?(rotate-360):rotate
			},
			getTypeText(type){
				return parseType(type)
			},
			getRandom(n){
				return Math.floor(n*Math.random())
			},
			rotate(idx){
				if(this.abaled&&!this.isRunning){
					this.$refs.pointer.$el.style=''
					this.isRunning=true
					let runNum = 5+this.getRandom(5);
					// 旋转角度
					let runDeg = 360*runNum+this.getItemRotate(idx)
					//动画时长
					let len=1000*(4+this.getRandom(4))
					
					let animationRun = uni.createAnimation({
					  duration: len,
					  timingFunction: 'ease'
					})
					animationRun.rotate(runDeg).step();
					this.animationData = animationRun.export();
					setTimeout(()=>{
						this.$emit('end')
						this.isRunning=false
					},len)
				}
			}
		}
	}
</script>

<style scoped>
	.main {
	    overflow: hidden;
	    position: relative;
	    background: no-repeat center / contain;
	    cursor: default;
		background-image: url(https://ah.189.cn/sj/cms/activity/img/zpbg1_03.png);
		padding: 7rpx;
	}
	.lp{
		background-image: url(https://ah.189.cn/sj/cms/activity/img/zpbg1_03.png);
	    background: no-repeat center / contain;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.lp-context{
		background-color: #fefaea;
		height: calc(100% - 60rpx);
		width: calc(100% - 60rpx);
		border-radius: calc(100% - 60rpx);
		overflow: hidden;
	}
	.lp-item-bgs{
		transform: rotate(0deg) /*针对mac safari浏览器兼容*/
	}
	.lp-item-bg{
		width: 50%;
		height: 50%;
		left: 50% !important;
		transform-origin: 0% 100%;
		background-color: #ffe358;
	}
	.lp-item{
		font-size: 24rpx;
		color: #f32f27;
		line-height: 30rpx;
		font-weight: bold;
		transform-origin: 50% 50%;
	}
	.lp-item-context{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;
		padding-top: 120rpx;
	}
	.lp-item .img{
		width: 80rpx;
		height: 80rpx;
		margin-top: 20rpx;
	}
	.lp-items {
	}
	.ms{
		width: 100%;
		height: 100%;
	}
	.ptl0{
		position: absolute;
		top: 0rpx;
		left: 0rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.lp-point .img{
		width: 210rpx;
		height: 210rpx;
	}
</style>
