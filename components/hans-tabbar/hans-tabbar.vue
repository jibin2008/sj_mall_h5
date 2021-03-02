<template>
	<div class="weui-tabbar" :class="extClass" style="z-index: 9999;">
		<!-- 选中的时候往weui-tabbar__item加class:weui-bar__item_on -->
		<div  @click="tabChange(index)" v-for="(item, index) in list" :key="index" class="weui-tabbar__item" :class="{'weui-bar__item_on':item.curr === '0' }">
			<div style="position: relative;display:inline-block;"><image :src="item.curr === '0' ? item.selectedIconPath : item.iconPath" class="weui-tabbar__icon"></image></div>
			<div class="weui-tabbar__label">{{ item.text }}</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		list: {
			type: Array,
			default: function() {
				return []
			}
		}
	},
	data() {
		return {
			extClass: '',
			current: 0
		};
	},
	methods: {
		tabChange(index) {
			
			/* if (index === this.current) {
				return;
			} */
			this.current = index;
			this.$emit('tabChange',index);
		}
	}
};
</script>

<style lang="scss" scoped >
.weui-tabbar {
	display: flex;
	position: relative;
	z-index: 500;
	background-color: #F7F7F7;
}
.weui-tabbar:before {
	content: ' ';
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	height: 1px;
	border-top: 1rpx solid #b6b6b6;
	color: rgba(0, 0, 0, 0.1);
}
.weui-tabbar__item {
	display: block;
	flex: 1;
	padding: 8px 0 4px;
	padding-bottom: calc(8px + constant(safe-area-inset-bottom));
	padding-bottom: calc(8px + env(safe-area-inset-bottom));
	font-size: 0;
	color: rgba(0, 0, 0, 0.5);
	text-align: center;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.weui-tabbar__item:first-child {
	padding-left: constant(safe-area-inset-left);
	padding-left: env(safe-area-inset-left);
}
.weui-tabbar__item:last-child {
	padding-right: constant(safe-area-inset-right);
	padding-right: env(safe-area-inset-right);
}
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon,
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i,
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
	color: #ff4b1f;
}
.weui-tabbar__icon {
	display: inline-block;
	width: 28px;
	height: 28px;
	margin-bottom: 2px;
}
i.weui-tabbar__icon,
.weui-tabbar__icon > i {
	font-size: 24px;
	color: rgba(0, 0, 0, 0.5);
}
.weui-tabbar__icon image {
	width: 100%;
	height: 100%;
}
.weui-tabbar__label {
	color: #000000;
	font-size: 10px;
	line-height: 1.4;
}
</style>
