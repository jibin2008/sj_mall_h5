<template>
	<AwardResultPopup ref='popSelf'
		icon='https://ah.189.cn/sj/cms/activity/img/lw.png'
	>
		<template>
			<p class="f18 dgray">您已经抽取过奖品</p>
			<p class="f18 huangss">请前往【我的奖品】进行查看</p>
		</template>
		<template v-slot:bt>
			<div @click="viewAward" class="pb10">
				<text class="dblock txshdz_btn white f16 tc">我的奖品</text>
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
			viewAward(){
				this.$refs.popSelf.close()
				this.$emit('viewAward')
			}
		}
	}
</script>

<style scoped>
	.txshdz_btn {
	    background: linear-gradient(to right,#ffb763,#ff8763);
	    width: 80%;
	    height: 40px;
	    line-height: 40px;
	    border-radius: 20px;
	    margin: 20px auto;
	}
</style>
