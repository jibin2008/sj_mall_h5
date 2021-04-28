<template>
	<uni-popup ref="popSelf">
		<view class="cntx">
			<view class="body">
				<img class="icon" src="https://ah.189.cn/sj/cms/activity/img/202103/t_06.png"/>
				
				<img @click="$refs.popSelf.close()" class="icon icon-close" src="https://ah.189.cn/sj/cms/activity/img/202103/close.png"/>
				
				<view class="item-body">
					<view class="item" v-for="itm in awardRecordList">
						<view class="fl item-name">
							<view class="name1">{{itm.couponName}}</view>
							<view class="name2">{{getDateStr(itm.createTime.time)}}</view>
						</view>
						<!-- <view class="fr btn" v-if="itm.type===5&&itm.status===0" @click="$emit('use',itm.rcdId)">立即领取</view>
						<view class="fr btn btn-use" v-else-if="itm.type===5">已领取</view> -->
						<view v-if="itm.canUse" class="fr btn" @click="$emit('use',itm.awardId)">使用</view>
						
					</view>
					<view class="item" v-if="awardRecordList.length===0">
						<view class="fl item-name">
							<view class="name1">暂无中奖记录</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
	// import pop from './popup.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import {formatDate} from '@/common/date'
	export default{
		components:{uniPopup},
		props:{
			awardRecordList:{}
		},
		methods:{
			open(){
				this.$refs.popSelf.open()
			},
			getDateStr(val){
				return formatDate(new Date(val),'yyyy-MM-dd')
			}
		}
	}
</script>

<style scoped>
	.cntx{
		width: 652rpx;
	}
	.body{
		background: #FFFFFF;
		border-radius: 20rpx;
		margin-top: 30rpx;
		position: relative;
		padding-top: 100rpx;
	}
	.icon{
		width: 379rpx;
		height: 118rpx;
		top: -30rpx;
		position: absolute;
	}
	.item-body{
		padding: 0 50rpx;
	}
	.item{
		height: 150rpx;
		display: flex;
		align-items: center;
		position: relative;
		/* border-bottom: 1rpx solid #7a6d6a; */
	}
	.item-name{
		display: flex;
		flex-direction: column;
	}
	.item-name .name1{
		font-size: 36rpx;
		font-weight: bold;
		line-height: 36rpx;
	}
	.item-name .name2{
		margin-top: 16rpx;
		font-size: 26rpx;
		font-weight: bold;
		line-height: 26rpx;
		color: #aaaa7f;
	}
	.btn{
		background-color: #e26538;
		border-radius: 64rpx;
		color: #FFFFFF;
		font-size: 28rpx;
		font-weight: bold;
		height: 64rpx;
		text-align: center;
		width: 165rpx;
		position: absolute;
		right: 0rpx;
	}
	.icon-close{
		width: 70rpx;
		height: 70rpx;
		right: 40rpx;
		top: -100rpx;
	}
	.btn-use{
		border: 2rpx solid #e26538;
		color: #e26538;
		background: none;
	}
</style>
