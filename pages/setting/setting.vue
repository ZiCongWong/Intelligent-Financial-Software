<template>
	<view class="main">
		<view class="box-top">
			<view class="setting" @tap="goAccountsetting()">
				<p class="text">账号设置</p>
				<image src="../../static/setting/image.png.png" mode=""></image>
			</view>
			<view class="setting" @tap="goCleardata()">
				<p class="text">清除数据</p>
				<image src="../../static/setting/image.png.png" mode=""></image>
			</view>
		</view>
		<view class="box">
			<view class="setting">
				<p class="text">意见反馈</p>
				<image src="../../static/setting/image.png.png" mode=""></image>
			</view>
			<view class="setting" @click="toabout">
				<p class="text">关于小绿账本</p>
				<image src="../../static/setting/image.png.png" mode=""></image>
			</view>
		</view>
		<view class="box-button" @click='backTologin'>
			<p class='button'>退出登录</p>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			goAccountsetting() {
				uni.navigateTo({
					url: '/pages/account-setting/account-setting'
				})
			},
			goCleardata() {
				uni.navigateTo({
					url: '/pages/clear-data/clear-data'
				})
			},
			backTologin(){
				uni.removeStorageSync('userId');
				uni.reLaunch({
					url:"/pages/login/login"
				})
				
			},
      toabout() {
        uni.navigateTo({
          url:'/pages/concerning/concerning'
        })
      }
		}
	}
</script>

<style>
	.main {
		width: 750rpx;
		height: 1400rpx;

	}

	.box-top {
		width: 690rpx;
		height: 216rpx;
		margin: 40rpx 30rpx 0 30rpx;
		background-color: rgba(255, 255, 255, 1);
		border-radius: 20rpx;

	}

	.box {
		width: 690rpx;
		height: 216rpx;
		margin: 50rpx 30rpx;
		background-color: rgba(255, 255, 255, 1);
		border-radius: 20rpx;

	}

	.setting {
		display: flex;
		justify-content: space-between;
		padding: 32rpx 30rpx;
	}

	image {
		width: 44rpx;
		height: 44rpx;
	}

	.text {
		color: rgba(21, 21, 21, 1.0);
	}

	.box-button {
		width: 690rpx;
		height: 112rpx;
		margin: 50rpx 30rpx;
		background-color: rgba(255, 255, 255, 1);
		border-radius: 20rpx;
		line-height: 112rpx;
		display: flex;
		justify-content: center;
	}

	.button {
		color: rgba(59, 206, 177, 1);
	}
</style>
