<template>
	<AwardResultPopup ref='popSelf'
		icon='https://ah.189.cn/sj/cms/activity/img/cry.png'
	>
		<template>
			<p class="f18 dgray pt10 pb40">呜呜~您与大奖擦身而过！<br>感谢您对本次活动的支持！</p>
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
