<template>
	<AwardResultPopup ref='popSelf'
		icon='https://ah.189.cn/sj/cms/activity/img/lw.png'
	>
		<template>
			<p class="f18 dgray">恭喜您获得</p>
			<p class="f18 huangss">{{cnpName}}</p>
			<view @click="select(0)" class="phone phone1" :class="pIndex===0?'select':''">
				<img class="img" src="https://ah.189.cn/sj/cms/activity/img/202103/oprn5.jpg"/>
				<img src="https://ah.189.cn/sj/cms/activity/img/202103/xz.png" v-if="pIndex===0" class="slct-img"/>
			</view>
			<view @click="select(1)" class="phone phone2" :class="pIndex===1?'select':''">
				<img class="img" src="https://ah.189.cn/sj/cms/activity/img/202103/vvs9.png"/>
				<img src="https://ah.189.cn/sj/cms/activity/img/202103/xz.png" v-if="pIndex===1" class="slct-img"/>
			</view>
			<view @click="select(2)" class="phone phone3" :class="pIndex===2?'select':''">
				<img class="img" src="https://ah.189.cn/sj/cms/activity/img/202103/hwmt40.jpg"/>
				<img src="https://ah.189.cn/sj/cms/activity/img/202103/xz.png" v-if="pIndex===2" class="slct-img"/>
			</view>
		</template>
		<template v-slot:bt>
			<div class="bt-div">
				<text @click="use" class="look_btn">确定</text>
			</div>
		</template>
	</AwardResultPopup>
</template>

<script>
	import AwardResultPopup from './award-result-popup.vue'
	export default{
		components:{AwardResultPopup},
		props:{
			cnpName:{}
		},
		data(){
			return {
				pIndex:0
			}
		},
		methods:{
			open(){
				this.$refs.popSelf.open()
			},
			use(){
				this.close()
				this.$emit('use',this.pIndex)
			},
			close(){
				this.$refs.popSelf.close()
			},
			select(idx){
				this.pIndex=idx
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
	.phone1 .img{
		width: 610rpx;
		height: 244rpx;
	}
	.phone2 .img{
		width: 611rpx;
		height: 237rpx;
	}
	.phone3 .img{
		width: 611rpx;
		height: 245rpx;
	}
	.phone{
		position: relative;
		margin-top: 20rpx;
	}
	.select .img{
		border: 2rpx solid #f45a24;
	}
	.select .slct-img{
		position: absolute;
		right: 32rpx;
		bottom: 0rpx;
		width: 120rpx;
		height: 84rpx;
	}
	
	.look_btn {
	    background: linear-gradient(to right,#ffb763,#ff8763);
	    width: 80%;
	    height: 80rpx;
	    margin: 40rpx auto;
	    display: block;
	    text-align: center;
	    line-height: 80rpx;
	    border-radius: 48rpx;
	    color: #fff;
		font-size: 38rpx;
		margin-bottom: 40rpx;
	}
	.bt-div{
		padding: 20rpx;
	}
</style>
