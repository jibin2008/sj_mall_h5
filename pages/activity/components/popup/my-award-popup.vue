<template>
	<pop ref='popup'>
		<div class="wdjp_tit">
		    <b>我的奖品</b>
		</div>
		<div class="wdjp_con">
		    <ul>
		        <li v-for="itm in awardRecordList">
		            <div class="cpmc">{{itm.couponName}}</div>
		            <!-- <div class="lqzt" v-if="itm.couponCode!==null&&itm.couponCode!=''">已领取</div> -->
					<!-- <div class="qrlq" v-else>确认领取</div> -->
					<div class="qrlq" @click="$emit('use',itm.awardId)">立即使用</div>
		        </li>
		    </ul>
		</div>
	</pop>
</template>

<script>
	import pop from './popup.vue'
	export default{
		components:{pop},
		props:{
			awardRecordList:{}
		},
		methods:{
			open(){
				this.$refs.popup.open()
			}
		}
	}
</script>

<style>
	.wdjp_tit {
	    color: #ff3233;
	    font-size: 18px;
	    text-align: center;
	    padding: 10px;
	}
	.wdjp_con .cpmc {
	    float: left;
	    color: #ff3233;
	    width: 60%;
	}
	.wdjp_con .lqzt {
	    float: left;
	    color: #999999;
	    border: 1px solid #999;
	    border-radius: 20px;
	    width: 35%;
	    text-align: center;
	    height: 30px;
	    line-height: 30px;
	}
	
	.wdjp_con .qrlq {
	    float: left;
	    color: #ff3233;
	    border: 1px solid #ff3233;
	    border-radius: 20px;
	    width: 35%;
	    text-align: center;
	    height: 30px;
	    line-height: 30px;
	}
	
	.wdjp_con ul li {
	    padding-top: 10px;
	    height: 40px;
	    line-height: 30px;
	    border-bottom: 1px dashed #ff3233;
	}
</style>
