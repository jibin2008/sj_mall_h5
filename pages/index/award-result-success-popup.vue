<template>
	<AwardResultPopup ref='popSelf'
		icon='https://ah.189.cn/sj/cms/activity/img/smile.png'
	>
		<template>
			<p class="f18 dgray">恭喜您获得</p>
			<p class="f18 huangss">办理资格</p>
		</template>
		<template v-slot:bt>
			<div class="btn_an mt25">
				<text @click="close" class="dblock fl no_btn tc f16">关闭</text>
				<text @click="use" class="dblock fr go_btn tc f16">立即办理</text>
				<div class="clear"></div>
			</div>
		</template>
	</AwardResultPopup>
</template>

<script>
	import AwardResultPopup from './award-result-popup.vue'
	export default{
		components:{AwardResultPopup},
		methods:{
			open(){
				this.$refs.popSelf.open()
			},
			use(){
				this.close()
				this.$emit('use')
			},
			close(){
				this.$refs.popSelf.close()
			}
		}
	}
</script>

<style scoped>
	.btn_an {
	    border-top: 1px solid #dddddd;
	}
	.btn_an .no_btn {
	    border-right: 1px solid #dddddd;
	    color: #9494a0;
	    height: 45px;
	    line-height: 45px;
	    width: 49%;
	}
	.btn_an .go_btn {
	    color: #f45a24;
	    height: 45px;
	    line-height: 45px;
	    width: 49%;
	}
</style>
