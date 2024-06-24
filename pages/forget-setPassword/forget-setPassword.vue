<template>
	<view class="con">
		<view class="main">
			<view class="register">
				<image class="register-back" src="../../static/login-register/back.png" mode="" @click="backTocertificate"></image>
				<p class="title">忘记密码</p>
			</view>
			
			<view class="text-box">
				<view class="set-text">
					<p class="black">请设置新的登录密码</p>
				</view>
				
			</view>
			<view class="form">
				<view class="item" :class="'login_user ' + nameFocus">
					<input type="safe-password" class="input-ui u-border" placeholder="8-20位，且不同与旧密码" @input="bindUsername"
						@focus="onFocusName" @blur="onBlurName" :password="!showPassword" />
					<view class="showPwd">
						<image class="text-icon-2"
							:src="showPassword ? '../../static/login-register/4.png' : '../../static/login-register/3.png'"
							@tap="showPassword = !showPassword"></image>
					</view>
				</view>
				
			</view>
			<view class="tips-box">

				<view class="all">
					<view class="tips">备注：请将密码设置为8-20位，并且由字母、数字和符号两种以上组合，不能与旧密码相同。</view>

				</view>
			</view>
			<view class="botton-ui" @click="goIndex">
				<p class="denglu">完成</p>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: "",
				nameFocus: '',
				psd: "",
				psdFocus: '',
				showPassword: false,
			}
		},
		methods: {
			backTocertificate() {
				console.log(this.name)
				console.log(this.psd)
				uni.navigateBack({
					delta:1
				})
			},
			goIndex(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			}
		},
	}
</script>

<style>
	.con {
		background-color: rgba(255, 255, 255, 1);
		width: 750rpx;
		height: 2000rpx;
		
		
	}

	.main {
		padding: 48rpx;
		height: 400rpx;
		background: linear-gradient(180deg, rgba(59, 206, 177, 0.4),rgba(255, 255, 255, 1));
		background-repeat:no-repeat;
		 background-size:750rpx 400rpx;
	}

	.register {
		display: flex;
		justify-content: flex-start;
		margin-top: 50rpx;

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

	

	.text-box {
		display: flex;
		justify-content: flex-start;
		margin-top: 100rpx;

	}


	.name {
		display: flex;
	}

	

	.black {
		color: rgba(0, 0, 0, 1);
		font-family: "Alibaba_Medium";
		font-size: 34rpx;
	}

	.form {
		margin-top: 32rpx;
	}

	.item {
		position: relative;
		margin-bottom: 30rpx;
	}

	.input-ui {
		background-color: #f8f9ff;
		height: 96rpx;
		padding: 0 40rpx;
		border-radius: 16rpx;
		font-size: 32rpx;
		color: rgba(34, 37, 44, 1);
	}
	
	input::input-placeholder{
	  color:rgba(153, 153, 153, 1);
	}

	.showPwd {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 999;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 96rpx;
		height: 96rpx;
		margin-right: 20rpx;
	}


	.botton-ui {
		width: 100%;
		display: flex;
		background: rgba(60, 207, 177, 1);
		color: #fff;
		text-align: center;
		border-radius: 48rpx;
		font-size: 32rpx;
		height: 96rpx;
		box-shadow: 0rpx 8rpx 13rpx 0rpx rgba(106, 147, 199, 0.35);
	}

	.text-icon-1 {
		width: 35rpx;
		height: 35rpx;
	}

	.text-icon-2 {
		width: 42rpx;
		height: 35rpx;
	}

	.denglu {
		margin: auto;
	}

	.tips-box {
		display: flex;
		flex-direction: column;
		width: 670rpx;
		height: 150rpx;

	}

	.tick {
		width: 35rpx;
		height: 35rpx;
		margin-right: 10rpx;
	}

	.tips {

		font-size: 26rpx;
		color: rgba(112, 112, 112, 1);
	}

	.click-1 {
		margin-left: 10rpx;
		font-size: 26rpx;
		color: rgba(60, 207, 177, 1);
	}

	.click-2 {
		margin-left: 10rpx;
		font-size: 26rpx;
		color: rgba(60, 207, 177, 1);
	}

	.all {
		display: flex;

		flex-wrap: nowrap;
	}

	.padding {
		margin-left: 35rpx;
		margin-top: 5rpx;
	}

	.forget-box {
		width: 115rpx;
		height: 39rpx;
	}

	.forget {
		font-size: 28rpx;

	}

	.center-box {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top: 45rpx;
	}

	.xian {
		width: 219rpx;
		height: 1rpx;
		opacity: 0.4;
		background: rgba(181, 187, 202, 0.5);
		margin: auto;
	}

	.way-login {
		display: flex;
		justify-content: center;
		margin-top: 250rpx;
	}

	.way-text {
		font-size: 26rpx;
		color: rgba(181, 187, 202, 1);
		margin: 0 10rpx 0 10rpx;
	}
	.way-icon {
		display: flex;
		justify-content: center;
		margin-top: 35rpx;
	}
	.icon-way {
		width: 70rpx;
		height: 70rpx;
		
	}
	.middle {
		margin: 0 130rpx 0 130rpx;
	}
	.date {
		display: flex;
		justify-content: center;
		margin-top: 55rpx;
	}
	.date-text {
		font-size: 26rpx;
		color: rgba(167, 172, 188, 1);
	}
</style>
