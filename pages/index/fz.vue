<template>
	<view @click="showRslt" class="bd f-main" :class="award?'':'thk'">
		<view v-if="award" class="bd rslt">
			<text class="t1">恭喜您</text>
			<text class="t2">抽中</text>
			<view class="dt">
				<div class="t2 dts">{{awardName}}</div>
			</view>
		</view>
		<view ref="gz" :animation="animationData" class="bd fg" :style="`background-image: url(${cover})`">
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			cover:{
				default:"https://ah.189.cn/sj/cms/activity/dc/static/img/1.png"
			},
			show:{
				default:false
			},
			award:{
				default:false
			},
			awardName:{
				default:""
			}
		},
		data(){
			return {
				animationData:''
			}
		},
		methods:{
			showRslt(){
				this.$emit("showRslt")
			}
		},
		watch:{
			show(val){
				if(val){
					let anm = uni.createAnimation({
						  transformOrigin: "50% 50%",
						  duration: 1000,
						  timingFunction: "ease",
						  delay: 0
					})
					anm.scale(0).rotate(360*3).step()
					this.animationData = anm.export()
				}else{
					this.$refs.gz.$el.style=`background-image: url(${this.cover})`
				}
			}
		}
	}
</script>

<style scoped>
	.f-main{
		position: relative;
	}
	.bd{
		background-repeat: round;
		height: 100%;
		width: 100%;
	}
	.fg{
		position: absolute;
		top: 0rpx;
	}
	.rslt{
		background-image: url(../../static/img/p-bg.png);
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
	}
	.t1{
		font-size: 36rpx;
		color: #bc4a01;
		font-weight: bold;
		margin-top: 20rpx;
		margin-bottom: 10rpx;
	}
	
	.t2{
		font-size: 22rpx;
		color: #bd4c00;
		font-weight: bold;
		line-height: 30rpx;
	}
	.dt{
		display: table;
		max-width: 80%;
	}
	.dts{
		display: table-cell;
		vertical-align: middle;
		text-align: center;
	}
	.thk{
		background-image: url(../../static/img/3.png);
	}
</style>
