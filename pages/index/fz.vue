<template>
	<view @click="showRslt" class="bd" :style="`background-image: url(${result})`">
		<view :animation="animationData" class="bd" :style="`background-image: url(${cover})`">
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			result:{
				default:"/static/img/2.png"
			},
			cover:{
				default:"/static/img/1.png"
			},
			show:{
				default:false
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
				}
			}
		}
	}
</script>

<style scoped>
	.bd{
		background-repeat: round;
		height: 100%;
		width: 100%;
	}
</style>
