<template>
	<uni-popup ref='popup'>
	  <div class="ad_tc">
	    <!-- <a @click="$refs.popup.close" class="dblock fr close">
	      <img class="close-img" src="https://ah.189.cn/sj/cms/activity/img/close1.png"/>
	    </a> -->
	    <div class="clear"></div>
	    <div class="box">
	      <p class="tc f20 pt10 dgray">登录</p>
	      <div class="wp90 fc pb10">
	        <div class="xx_box xx_box1 mt15">
	          <input maxlength="11" type="number" v-model.number="phone" class="f14 lgray" placeholder="请输入您的手机号"/>
	        </div>
	        <div class="mt15">
	          <div class="xx_box xx_box2 fl">
	            <input maxlength="6" type="number" v-model.number="verifyCode" class="f14 lgray fl" placeholder="请输入验证码"/>
	          </div>
	          <a @click="getVerifyCode" v-if="!isVerifyCodeReqesting" class="huoqu_btn fr tc f14" :class="sendVerifyCodeAbled?'':'btn-disabled'">获取验证码</a>
	          <a v-else class="huoqu_btn fr tc f14 btn-disabled">{{tim}}秒后重发</a>
	          <div class="clear"></div>
	        </div>
	        <a @click="confirm" class="look_btn f18" :class="loginAbled?'':'btn-disabled'">立刻抽取</a>
	      </div>
	    </div>
	  </div>
	</uni-popup>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import { getSms,userH5Login } from '../../common/mm.js'
	export default{
		components:{uniPopup},
		props:{
			value:{}
		},
		methods:{
			open(){
				// this.phone=this.value
				this.$refs.popup.open()
			},
			confirm(){
				// this.$emit('input','13305633426')
				// return
				if(this.loginAbled){
					uni.showLoading({
						title: '登陆中~~~'
					})
					userH5Login(this.phone,this.verifyCode).then(resp=>{
						uni.hideLoading()
						if(resp.data.result==='0'){
							if(resp.data.phoneNum!==(this.phone+'')){
								uni.showToast({
									icon:'none',
									title: "数据异常!"
								})
								return
							}
							this.$refs.popup.close()
							uni.showToast({
								icon:'success',
								title: "登陆成功！"
							})
							this.$emit('input',resp.data.phoneNum+'')
						}else{
							this.$refs.popup.open()
							uni.showToast({
								title: resp.data.reason
							})
						}
					})
				}
			},
			getVerifyCode(){
				if(this.sendVerifyCodeAbled){
					this.isVerifyCodeReqesting=true
					getSms(this.phone).then(resp=>{
						this.tim=60
						let t = setInterval(()=>{
							this.tim--
							if(this.tim===0){
								this.tim=''
								clearInterval(t)
								this.isVerifyCodeReqesting=false
							}
						},1000)
						if(resp.data.result==='0'){
							uni.showToast({
								icon:'success',
								title: "发送成功！"
							})
						}else{
							uni.showToast({
								title: "发送失败！"
							})
						}
					})
				}
			}
		},
		data(){
			return {
				phone:'',
				tim:'',
				isVerifyCodeReqesting:false,
				verifyCode:''
			}
		},
		watch:{
			value(v){
				this.phone=v
			}
		},
		computed:{
			sendVerifyCodeAbled(){
				return this.isPhoneNum&&!this.isVerifyCodeReqesting
			},
			isPhoneNum(){
				return /^((1[3,5,8,7,9][0-9])|(14[5,7])|(17[0,6,7,8])|(19[1,7]))\d{8}$/.test(this.phone)
			},
			loginAbled(){
				return this.isPhoneNum&&this.verifyCode>=100000&&this.verifyCode<=999999
			}
		}
	}
</script>

<style scoped>
	.btn-disabled{
		background: #b2b2b2 !important;
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
	}
	.f18 {
	    font-size: 36rpx;
	}
	.xx_box input {
	    background: none;
	    padding-left: 10rpx;
	}
	.lgray {
	    color: #9c9c9c;
	}
	.f14 {
	    font-size: 28rpx;
	}
	.xx_box{
	    background: #ffffff;
	    border: 2rpx solid #cccccc;
	    height: 80rpx;
	    line-height: 80rpx;
	    border-radius: 8rpx;
		display: flex;
		align-items: center;
		justify-content: start;
	}
	.xx_box1 {
	    width: 100%;
	}
	.xx_box2 {
	    width: 62%;
	}
	.huoqu_btn {
	    background: linear-gradient(to right,#ffb763,#ff8763);
	    display: block;
	    width: 35%;
	    color: #fff;
		height: 80rpx;
	    line-height: 80rpx;
		border-radius: 8rpx;
	}
	.mt15 {
	    margin-top: 30rpx;
	}
	.pt10 {
	    padding-top: 20rpx;
	}
	.pb10 {
		padding-bottom: 20rpx;
	}
	.ad_tc {
	    width: 80%;
	    position: fixed;
	    top: 15%;
	    left: 10%;
	}
	.box {
	    background: #ffffff;
	    border-radius: 16rpx;
	}
	.close {
	    margin-right: 0rpx;
	    margin-bottom: 20rpx;
		padding: 0rpx;
	}
	.close-img{
		width: 60rpx;
	}
	.dgray {
		color: #444;
	}
	.tc {
		text-align: center;
	}
	.fc {
		margin: 0 auto;
	}
	.wp90 {
		width: 90%;
	}
	.fr {
		float: right;
	}
	.fl {
		float: left;
	}
</style>
