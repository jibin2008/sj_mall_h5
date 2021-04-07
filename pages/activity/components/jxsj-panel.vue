<template>
	<cPanel titleImg='https://ah.189.cn/sj/cms/activity/img/202104/w_06.jpg'>
		<phoneInfo v-for="itm in phoneList"
			:imgUrl="itm.img"
			:name="itm.name"
			:desc="itm.desc"
			:price="itm.price"
		></phoneInfo>
	</cPanel>
</template>

<script>
	import cPanel from "./c-panel.vue"
	import phoneInfo from "./phone-info.vue"
	export default{
		components:{
			cPanel,
			phoneInfo
		},
		props:{
			phoneList:{
				default(){
					return []
				} 
			}
		}
	}
</script>

<style scoped>
	
</style>
