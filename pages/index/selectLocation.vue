<template>
	<web-view ref="web" :src="url"
	 @onPostMessage="psm"
	></web-view>
</template>

<script>
	import md5 from "../../common/api/md5.js"
	export default{
		data(){
			return {
				url:""
			}
		},
		onLoad() {
			var d = new Date()
			var day = d.getDate()
			var month = d.getMonth() + 1
			var year = d.getFullYear()
			if (month < 10) {
				if (day < 10) {
					var date = year + "0" + month + "0" + day;
				} else {
					var date = year + "0" + month + "" + day;
				}
			} else {
				if (day < 10) {
					var date = year + "" + month + "0" + day;
				} else {
					var date = year + "" + month + "" + day;
				}
			}
			
			var md5Str = md5.hexMD5('admin|' + date + '|zyxz')
			// this.url='http://localhost:8080/#/pages/index/index'
			
			this.url='https://it.jisu8.cn:9999/search/mobileSearch?user=admin&from=wtapp&sign='+md5Str
		},
		watch:{
			url(val){
				console.log('地址变动：'+val)
			}
		},
		onShow() {
			let obj = this.$refs.web
		},
		methods:{
			psm(e){
				debugger
			}
		}
	}
</script>

<style>
</style>
