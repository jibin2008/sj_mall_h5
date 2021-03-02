<template>
	<div class="cu-modal " @tap="hideModal">
		<div class="cu-dialog" @tap.stop style="background: none;overflow: visible;">
			<div class="modal-box">
				<image class="head-bg" src="https://shopro.7wpp.com/imgs/nologin_bg.png" mode=""></image>
				<div class="detail">
					<div class="title1">您还没有登录</div>
					<div class="title2">登录即刻开启品质生活</div>
				</div>
				<div class="btn-box y-f">
					<button class="cu-btn login-btn" @tap="onLogin">立即登录</button>
					<button class="cu-btn close-btn" @tap="hideModal">取消</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex';
export default {
	components: {},
	data() {
		return {};
	},
	props: {
		value: {},
		modalType: {
			type: String,
			default: ''
		}
	},
	computed: {
		
	},
	methods: {
		hideModal() {
			this.showModal = false;
		},
		onLogin() {
			this.showModal = false;
		}
	}
};
</script>

<style lang="scss">
// 登录提示
.modal-box {
	width: 610rpx;
	border-radius: 20rpx;
	background: #fff;
	position: relative;
	left: 50%;
	transform: translateX(-50%);
	padding-bottom: 30rpx;

	.head-bg {
		width: 100%;
		height: 210rpx;
	}

	.detail {
		.title1 {
			color: #46351b;
			font-size: 35rpx;
			font-weight: bold;
		}

		.title2 {
			font-size: 28rpx;
			color: #999;
			padding-top: 20rpx;
		}
	}

	.btn-box {
		margin-top: 80rpx;

		.login-btn {
			width: 492rpx;
			height: 70rpx;
			background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
			box-shadow: 0px 7rpx 6rpx 0px rgba(229, 138, 0, 0.22);
			border-radius: 35rpx;
			font-size: 28rpx;
			color: rgba(#fff, 0.9);
		}

		.close-btn {
			width: 492rpx;
			height: 70rpx;
			color: #e9b766;
			font-size: 26rpx;
			margin-top: 20rpx;
			background: none;
		}
	}
}
</style>
