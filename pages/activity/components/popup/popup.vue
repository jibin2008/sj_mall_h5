<template>
	<uni-popup ref="popSelf">
		<div class="section">
			<div class="layermchild  layermanim" style="background-color:#ff5f46; color:#666; border:none; ">
				<div class="layermcont">
					<div class="jptc">
						<div class="cla" @click="$refs.popSelf.close()">
							<img class='img' src="https://ah.189.cn/sj/cms/activity/img/fail.png">
						</div>
						<div class="wdjp">
							<slot></slot>
						</div>
					</div>
				</div>
			</div>
		</div>
	</uni-popup>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default{
		components:{uniPopup},
		methods:{
			open(){
				this.$refs.popSelf.open()
			}
		}
	}
</script>

<style scoped>
	.section{
		display: table-cell;
		vertical-align: middle;
		text-align: center;
		width: 100%;
	}
	.layermanim {
	    animation-name: bounceIn;
	    -webkit-animation-name: bounceIn;
		min-width: 600rpx;
	}
	.layermchild {
	    text-align: left;
	    background-color: #fff;
	    font-size: 14px;
	    border-radius: 6px;
	    box-shadow: 0 0 8px rgb(0 0 0 / 10%);
	    pointer-events: auto;
	    -webkit-animation-fill-mode: both;
	    animation-fill-mode: both;
	    -webkit-animation-duration: .18s;
	    animation-duration: .18s;
	}
	.layermbtn span, .layermchild {
	    display: inline-block;
	    position: relative;
	}
	
	.layermcont {
	    padding: 10px;
	    line-height: 22px;
	    border-radius: 5px;
	}
	
	.jptc {
	    padding: 10px;
	    background-color: #fef9e4;
	    padding: 10px;
	    max-height: 300px;
	    overflow: hidden;
	}
	
	.jptc .cla {
	    position: absolute;
	    top: -36px;
	    right: 5px;
	}
	
	.wdjp {
	    max-height: 300px;
	    overflow: hidden;
	}
	.cla .img{
		width: 30px;
		height: 30px;
	}
</style>
