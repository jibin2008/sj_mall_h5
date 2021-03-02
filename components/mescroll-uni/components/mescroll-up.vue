<!-- 上拉加载区域 -->
<template>
	<div class="mescroll-upwarp" :style="{'background-color':mescroll.optUp.bgColor,'color':mescroll.optUp.textColor}">
		<!-- 加载中 (此处不能用v-if,否则android小程序快速上拉可能会不断触发上拉回调) -->
		<div v-show="isUpLoading">
			<div class="upwarp-progress mescroll-rotate" :style="{'border-color':mescroll.optUp.textColor}"></div>
			<div class="upwarp-tip">{{ mOption.textLoading }}</div>
		</div>
		<!-- 无数据 -->
		<div v-if="isUpNoMore" class="upwarp-nodata">{{ mOption.textNoMore }}</div>
	</div>
</template>

<script>
export default {
	props: {
		option: Object, // up的配置项
		type: Number // 上拉加载的状态：0（loading前），1（loading中），2（没有更多了）
	},
	computed: {
		// 支付宝小程序需写成计算属性,prop定义default仍报错
		mOption() {
			return this.option || {};
		},
		// 加载中
		isUpLoading() {
			return this.type === 1;
		},
		// 没有更多了
		isUpNoMore() {
			return this.type === 2;
		}
	}
};
</script>

<style>
@import './mescroll-up.css';
</style>
