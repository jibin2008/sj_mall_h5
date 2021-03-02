<!-- 下拉刷新区域 -->
<template>
	<div v-if="mOption.use" class="mescroll-downwarp" :style="{'background-color':mescroll.optDown.bgColor,'color':mescroll.optDown.textColor}">
		<div class="downwarp-content">
			<div class="downwarp-progress" :class="{'mescroll-rotate': isDownLoading}" :style="{'border-color':mescroll.optDown.textColor, 'transform':downRotate}"></div>
			<div class="downwarp-tip">{{downText}}</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		option: Object , // down的配置项
		type: Number, // 下拉状态（inOffset：1， outOffset：2， showLoading：3， endDownScroll：4）
		rate: Number // 下拉比率 (inOffset: rate<1; outOffset: rate>=1)
	},
	computed: {
		// 支付宝小程序需写成计算属性,prop定义default仍报错
		mOption(){
			return this.option || {}
		},
		// 是否在加载中
		isDownLoading(){
			return this.type === 3
		},
		// 旋转的角度
		downRotate(){
			return 'rotate(' + 360 * this.rate + 'deg)'
		},
		// 文本提示
		downText(){
			switch (this.type){
				case 1: return this.mOption.textInOffset;
				case 2: return this.mOption.textOutOffset;
				case 3: return this.mOption.textLoading;
				case 4: return this.mOption.textLoading;
				default: return this.mOption.textInOffset;
			}
		}
	}
};
</script>

<style>
@import "./mescroll-down.css";
</style>
