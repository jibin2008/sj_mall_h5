<template>
	<uni-popup ref="popSelf">
		<p class="tc"><img class='close-icon' :src="icon" alt=""></p>
		<div class="wp90 fc baigbg">
			<div class="quan tc">
				<slot>
					
				</slot>
			</div>
			<slot name="bt"></slot>
		</div>
	</uni-popup>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default{
		components:{uniPopup},
		props:{
			icon:{
				type:String
			}
		},
		methods:{
			open(){
				this.$refs.popSelf.open()
			},
			close(){
				this.$refs.popSelf.close()
			}
		}
	}
</script>

<style scoped>
	.wp90{
		width: 675rpx;
	}
	
	.baigbg {
	    background: #fff;
	    border-radius: 10rpx;
	    margin-top: -60rpx;
	}
	
	.close-icon{
		width: 377rpx;
		height: 299rpx;
	}
	.quan{
		padding-top: 60rpx;
	}
</style>
