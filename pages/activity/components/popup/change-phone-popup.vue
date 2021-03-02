<template>
	<uni-popup ref='popup'>
		<div class="d-content" style="padding: 0px;">
		    <div class="window yahei pb20 tc dnone" id="dengl" style="display: block;">
		        <div>
		            <a class="dblock fr pr5 pt5 pl10" @click="$refs.popup.close()">
		                <img src="https://ah.189.cn/sj/cms/activity/img/fail.png" width="30">
		            </a>
		            <div class="clear"></div>
		        </div>
		        <div class="mt5 pl30 pr30">
		            <input class="textbox01" placeholder="请输入您激活的手机号" v-model="phone" onfocus="if(value==defaultValue){value='';this.style.color='#000'}" onblur="if(!value){value=defaultValue;this.style.color='#9f9f9f'}" style="color: rgb(159, 159, 159);">
		        </div>
		        <div class="pl30 pr30">
		            <div class="mt5 fl">
		                <input type="tel" class="textbox02" v-model="verifyCode">
		            </div>
		            <a @click="getVerifyCode" class="dblock mt5 fr yzm" :class="sendVerifyCodeAbled?'btn-abled':''">发送验证码{{this.tim}}</a>
		            <div class="clear"></div>
		        </div>
		        <a class="btn02 btn-abled" @click="confirm">确认</a>
		    </div>
		</div>
	</uni-popup>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import { getSms,userH5Login } from '../../apiNew.js'
	export default{
		components:{uniPopup},
		props:{
			value:{},
			verifyCode:''
		},
		methods:{
			open(){
				// this.phone=this.value
				this.$refs.popup.open()
			},
			confirm(){
				if(this.sendVerifyCodeAbled&&this.verifyCode!==''){
					userH5Login(this.phone,this.verifyCode).then(resp=>{
						if(resp.data.result==='0'){
							this.$emit('input',this.phone)
							this.$refs.popup.close()
							uni.showToast({
								icon:'success',
								title: "登陆成功！"
							})
						}else{
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
				isVerifyCodeReqesting:false
			}
		},
		watch:{
			value(v){
				this.phone=v
			}
		},
		computed:{
			sendVerifyCodeAbled(){
				return /^((1[3,5,8,7,9][0-9])|(14[5,7])|(17[0,6,7,8])|(19[1,7]))\d{8}$/.test(this.phone)&&!this.isVerifyCodeReqesting
			}
		}
	}
</script>

<style scoped>
	.pb20 {
	    padding-bottom: 40rpx;
	}
	.pr30 {
		padding-right: 60rpx;
	}
	.pl30 {
		padding-left: 60rpx;
	}
	.mt5 {
		margin-top: 10rpx;
	}
	.d-content { display:inline-block; display:block\0/*IE8 BUG*/; display:inline-block\9\0; *zoom:1; *display:inline; text-align:left; border:0 none;  }
	.window {
	    width: 600rpx;
	    margin: 0 auto;
	    background: #FFF;
	    border-radius: 20rpx;
	    font: 28rpx/64rpx "微软雅黑";
	    color: #9f9f9f;
	}
	.textbox01 {
	    width: 480rpx;
	    height: 64rpx;
	    background: #f7f7f7;
	}
	.textbox02 {
	    width: 280rpx;
	    height: 64rpx;
	    background: #f7f7f7;
	}
	.yzm {
	    width: 180rpx;
	    height: 60rpx;
	    border: 2rpx solid #d7d7d7;
	    color: #9f9f9f;
	}
	.btn02 {
	    display: block;
	    width: 480rpx;
	    height: 60rpx;
	    border-radius: 10rpx;
	    margin: 30rpx 60rpx;
	}
	.btn-abled{
	    background: #f64639;
	    color: #fff;
	}
</style>
