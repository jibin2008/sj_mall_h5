<template>
	<pop ref='popup'>
		<scroll-view class="hdgz" :scroll-y="true">
			<p class="tc f18 red"><b>活动规则</b></p>
			<p>1、参与用户范围：安徽电信用户。</p>
			<p>2、活动时间：2021年4月1日—2021年6月30日。</p>
			<p>3、抽奖规则：活动期间内，同一手机号码每日均可参与1次抽奖，中奖概率随机。</p>
			<template v-if="latnId==='555'">
				<p>4、奖品包含：500元购机券，600元购机券，800元购机券，1200元购机券，全屋智能大礼包，5元翼支付消费券和500M免费流量包。</p>
				<p>5、奖品规则：</p>
				<p>（1） 500元购机券，600元购机券，800元购机券，1200元购机券，购买指定5G手机+橙分期，即可享受购机直降和网龄代金券，详询店内工作人员。</p>
			</template>
			<template v-else>
				<p>4、奖品包含：700元购机券，900元购机券，1100元购机券，1700元购机券，全屋智能大礼包，5元翼支付消费券和500M免费流量包。</p>
				<p>5、奖品规则：</p>
				<p>（1） 700元购机券，900元购机券，1100元购机券，1700元购机券，购买指定5G手机+橙分期，即可享受购机直降和网龄代金券，详询店内工作人员。</p>
			</template>
			<p>（2） 若您抽中了5元翼支付消费券，系统将立即自动充值到参与活动号码的翼支付账户中。</p>
			<p>（3） 若您抽中了500M免费流量包，500M流量将立即充值到参与活动的号码中。</p>
			<p>（4）网龄代金券说明：</p>
			<p class="p1">	a.网龄1-2年可享代金券100元;</p>
			<p class="p1">	b.网龄2-3年可享代金券200元;</p>
			<p class="p1">	c.网龄3-4年可享代金券300元;</p>
			<p class="p1">	d.网龄4-5年可享代金券400元;</p>
			<p class="p1">	e.网龄5年以上可享代金券500元。</p>
			<p>6、翼支付权益金到账及使用说明：</p>
			<p>代金券消费满20元可以抵用，有效期为7天，每笔消费仅可使用一张代金券，代金券不兑现，不找零不参与其他活动。您可登录翼支付客户端—我的—权益金，若翼支付账户异常（未开通账户/黑名单限制/星级未达到二星等）则无法赠送，解决账户异常后可在我的奖品中补领。</p>
			<p>7、特别提醒:</p>
			<p>（1）对于任何通过不正当或第三方技术手段恶意攻击、篡改活动的活动参与者，安徽电信有权在不事先通知的情况下取消参与者的活动参与资格及中奖资格;</p>
			<p>（2）如遇不可抗力因素，本次活动因故无法进行时，安徽电信在法律允许的范围内有权决定取消、修改、暂停或终止本活动；</p>
			<p>（3）凡参与本活动者，即视为接受活动所有规则，且必须遵守中国电信安徽公司法律声明及其它关于营销活动的相关规定。中国电信安徽公司有权在法律允许的范围内对活动规则做出适当调整。</p>
		</scroll-view>
	</pop>
</template>

<script>
	import pop from './popup.vue'
	export default{
		components:{pop},
		props:{
			latnId:{
				
			}
		},
		methods:{
			open(){
				this.$refs.popup.open()
			}
		}
	}
</script>

<style scoped>
	.hdgz {
	    height: 300px;
	    overflow-y: auto;
	}
	
	p{
		text-indent:1em;    /*每个P段落，首行空出两个空格，即缩进两个字符*/
	}
	
	.p1{
		text-indent:2em;    /*每个P段落，首行空出两个空格，即缩进两个字符*/
	}
</style>
