<template>
	<div class="uni-popup-dialog">
		<div class="uni-dialog-title" style="padding-bottom: 10px;">
			<text class="uni-dialog-title-text uni-popup__success">需要您的授权</text>
		</div>
		<div class="uni-dialog-content">
			 <text  class="uni-dialog-content-text" style="text-align: center;">为了更好的购物体验，请在稍后的弹窗（授权手机号码）点击“允许”</text>
		 </div>
		<div class="uni-dialog-button-group">
			<button class="uni-dialog-button" @click="close">
				<text class="uni-dialog-button-text">取消</text>
			</button>
			<button class="uni-dialog-button uni-border-left" 
				type='primary' open-type="getPhoneNumber" @getphonenumber="getPhoneNum" >
				<text class="uni-dialog-button-text uni-button-color" style="font-weight: 600;">确定</text>
			</button>
		</div>

	</div>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import member from '@/common/api/member.js';
	export default {
		name: "uniPopupPhoneauth",
		computed: {
			...mapState(['storeMemberInfo']),
		},
		props: {
		},
		data() {
			return {
				dialogType: 'error',
				focus: false,
				val: ""
			}
		},
		inject: ['popup'],
		watch: {
			type(val) {
				this.dialogType = val
			},
			mode(val) {
				if (val === 'input') {
					this.dialogType = 'info'
				}
			},
			value(val) {
				this.val = val
			}
		},
		created() {
			// 对话框遮罩不可点击
			this.popup.mkclick = false
			if (this.mode === 'input') {
				this.dialogType = 'info'
				this.val = this.value
			} else {
				this.dialogType = this.type
			}
		},
		mounted() {
			this.focus = true
		},
		methods: {
			...mapMutations(['setStoreMemberInfo']),
			/**
			 * 点击确认按钮
			 */
			getPhoneNum (e) {
				uni.showLoading({
					title: '授权中...'
				});
				let $this = this;
				if(e.detail.errMsg == 'getPhoneNumber:ok'){
					let requetsJson={
							memberSessionKey:wx.getStorageSync('memberSessionKey'),
							encryptedData:e.detail.encryptedData,
							iv:e.detail.iv,
							openId:wx.getStorageSync('openId')
						};
					console.log("手机号获取授权接口调用：requetsJson=");
					console.log(requetsJson);
					member.changeMemberPhone(requetsJson).then((data) => {
							uni.hideLoading();
							let [error, res] = data
							let resData = res.data
							if(resData.resultCode == '1'){
								let storeMemberInfo = $this.storeMemberInfo
								uni.setStorageSync('memberSid', res.header['Set-Cookie']); //保存Cookie到Storage
								storeMemberInfo.phone = resData.phonenumber2;
								storeMemberInfo.phoneEncry = resData.phonenumber1;
								storeMemberInfo.isBind = '2' ;
								$this.setStoreMemberInfo(storeMemberInfo);
								$this.close();
							}else{
								uni.showLoading({
									title: '授权异常！'
								});
								$this.close();
							}
					}).catch(e => console.error(e))
					.finally(() => uni.hideLoading())
				}else{
					uni.showModal({
						title: "获取手机号码失败",  
						content: e.detail.errMsg  
					})
				}
				
			},
			/**
			 * 点击取消按钮
			 */
			close() {
				if (this.beforeClose) {
					this.$emit('close', () => {
						this.popup.close()
					})
					return
				}
				this.popup.close()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-popup-dialog {
		width: 300px;
		border-radius: 15px;
		background-color: #fff;
	}

	.uni-dialog-title {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		padding-top: 15px;
		padding-bottom: 5px;
	}

	.uni-dialog-title-text {
		font-size: 16px;
		font-weight: 500;
	}

	.uni-dialog-content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 5px 15px 15px 15px;
	}

	.uni-dialog-content-text {
		font-size: 14px;
		color: #6e6e6e;
	}

	.uni-dialog-button-group {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		border-top-color: #f5f5f5;
		border-top-style: solid;
		border-top-width: 1px;
	}

	.uni-dialog-button {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */

		flex: 1;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 45px;
		background-color: #ffffff;
		border-radius: 10px;
	}

	.uni-border-left {
		border-left-color: #f0f0f0;
		border-left-style: solid;
		border-left-width: 1px;
	}

	.uni-dialog-button-text {
		font-size: 14px;
		background-color: #FFFFFF;
	}

	.uni-button-color {
		color: #ff4b1f;
	}

	.uni-dialog-input {
		flex: 1;
		font-size: 14px;
	}

	.uni-popup__success {
		color: #000000;
		font-weight: 800;
		text-align: left;
	}


	.uni-popup__info {
		color: #909399;
	}
</style>
