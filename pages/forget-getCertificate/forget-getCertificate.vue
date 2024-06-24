<template>
	<view class="content">
		<view class="main">
			<view class="register">
				<image class="register-back" src="../../static/login-register/back.png" mode="" @click="backToregister">
				</image>
				<p class="title">忘记密码</p>
			</view>
			<view class="icon">
				<image class="logo" src="../../static/login-register/phone.png"></image>
			</view>
			<view class="text-box">
				<view class="login-text">
					<p class="black">请输入验证码</p>
				</view>
			</view>
			<view class="send-box">
				<p class="location">已发送至+86</p>
				<p class="phone-number">190******06</p>
			</view>
			<view class="certificate-box">
				<fc></fc>
			</view>
		</view>

	</view>
</template>

<script>
	import fc from '../../components/fc/fc.vue'
	export default {
		components: {
			fc,
		},
		data() {
			return {

			}
		},
		onLoad() {

		},
		methods: {
			backToregister(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style>
	.content {
		background-color: rgba(255, 255, 255, 1);
		width: 750rpx;
		height: 2000rpx;
		
	}

	.main {
		padding: 48rpx 0 48rpx 0;
		height: 400rpx;
		background: linear-gradient(180deg, rgba(59, 206, 177, 0.4),rgba(255, 255, 255, 1));
		background-repeat:no-repeat;
		 background-size:750rpx 400rpx;
	}

	.register {
		display: flex;
		justify-content: flex-start;
		margin-top: 50rpx;
		align-items: center;
		margin-left: 48rpx;
	}

	.title {
		margin-left: 245rpx;
		font-size: 36rpx;
		font-family: "Alibaba_Medium";
	}

	.register-back {
		width: 19rpx;
		height: 34rpx;
	}

	.icon {
		display: flex;
		justify-content: center;
		margin-top: 80rpx;
	}

	.logo {
		width: 150rpx;
		height: 150rpx;
	}

	.text-box {
		display: flex;
		justify-content: center;
		margin-top: 60rpx;
	}

	.black {
		font-size: 40rpx;
		color: rgba(34, 37, 44, 1);
		font-family: "Alibaba_Medium";
	}

	.certificate-box {
		display: flex;
		justify-content: center;
	}

	.send-box {
		display: flex;
		justify-content: center;
		margin: 20rpx 0 45rpx 0;
	}

	.location {
		font-size: 30rpx;
		color: rgba(112, 112, 112, 1);

	}

	.phone-number {
		font-size: 30rpx;
		color: rgba(34, 37, 44, 1);
		margin-left: 10rpx;
		font-family: "Alibaba_Medium";
	}
</style>
