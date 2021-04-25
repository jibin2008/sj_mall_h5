<template>
	<AwardResultPopup ref='popSelf'
		icon='https://ah.189.cn/sj/cms/activity/img/lw.png'
	>
		<template>
			<p class="dgray">恭喜您获得</p>
			<p class="huangss">{{cnpName}}</p>
			<p v-if="lvlAmount">注：升{{lvlAmount}}元5G套餐大礼包</p>
			
			<view class="s-text">选择手机：</view>
			<phoneInfo
				:imgUrl="selectPhone.img"
				:name="selectPhone.name"
				:desc="selectPhone.desc"
				:price="selectPhone.price"
				:seleced="true"
			></phoneInfo>
			<view class="dxsj">
				<view @click="select(idx)" class="item"  v-for="(itm,idx) in phoneList">
					<view class="img-top">
						<img v-if="selected(idx)" src="https://ah.189.cn/sj/cms/activity/img/202104/aa.png"/>
					</view>
					<view class="p-img" :class="selected(idx)?'selected':''">
						<img :src="itm.img" />
					</view>
				</view>
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
	import PhoneInfo from "../phone-info.vue"
	export default{
		components:{AwardResultPopup,PhoneInfo},
		props:{
			cnpName:{},
			phoneList:{},
			lvlAmount:{}
		},
		data(){
			return {
				pIndex:0
			}
		},
		computed:{
			selectPhone(){
				return this.phoneList[this.pIndex]
			}
		},
		methods:{
			open(){
				this.$refs.popSelf.open()
			},
			use(){
				this.close()
				this.$emit('use',this.selectPhone)
			},
			close(){
				this.$refs.popSelf.close()
			},
			select(idx){
				this.pIndex=idx
			},
			selected(idx){
				return this.pIndex===idx
			}
		}
	}
</script>

<style scoped>
	.selected {
		border: 2rpx solid #f45a24;
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
	.s-text{
		width: 100%;
		padding-left: 20rpx;
		text-align: left;
		margin-top: 45rpx;
		font-size: 28rpx;
		font-weight: bold;
	}
	.dxsj{
		display: flex;
	}
	.item{
		width: 25%;
		padding: 10rpx;
	}
	.item img{
		width: 100%;
	}
	.img-top{
		display: flex;
		justify-content: center;
		height: 13rpx;
	}
	.img-top img{
		width: 14rpx;
		height: 13rpx;
	}
	.p-img{
		padding: 10rpx;
	}
	.dgray{
		font-size: 60rpx;
		color: #f75e25;
	}
	.huangss{
		font-size: 50rpx;
		color: #f75e25;
		margin-top: 20rpx;
	}
</style>
