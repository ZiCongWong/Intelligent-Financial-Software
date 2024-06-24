<template>
	<view>
		<view class="small-main">
			<!-- <image src="../../static/set-period/1.png" mode=""></image> -->
			<p class="date">每月{{date}}日</p>
		</view>
		<view class="big-main">
			<view class="top">
				<view class="left">
					<!-- <image src="../../static/set-period/2.png" mode=""></image> -->
					<p class="type">{{type}}</p>
				</view>
				<p class="right">{{money}}</p>
			</view>
			<hr class="hr1">
			<view class="medium">
				<p class="time-text">下笔账单添加时间：{{time}}</p>
				<EvanSwitch active-value="false" size="20" active-color="rgba(60, 207, 177, 1)"></EvanSwitch>
			</view>
			<view class="bottom">
				<p class="tips-text">更改已设置周期内容</p>
				<view class="button-box">
					立即修改
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import EvanSwitch from '../../components/evan-switch/evan-switch'
	export default {
		name: "setPeriod",
		data() {
			return {
				date: 15,
				type: '房租水电',
				time: '2023-12-15 20:00',
				money: '+1600'
			};
		},
		components: {
			EvanSwitch,
		}
	}
</script>

<style>
	.small-main {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-top: 50rpx;
	}

	.small-main image {
		width: 40rpx;
		height: 40rpx;
	}

	.date {
		font-size: 30rpx;
		font-family: "Alibaba_Medium";
		color: rgba(153, 153, 153, 1);
		margin-left: 5rpx;
	}

	.big-main {
		border-radius: 20rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 6rpx 20rpx 4rpx rgba(219, 219, 219, 0.25);
		width: 630rpx;
		height: 279rpx;
		padding: 30rpx;
		margin-top: 25rpx;
	}

	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.left {
		display: flex;
		align-items: center;
		font-size: 36rpx;
		font-family: "Alibaba_Medium";
	}

	.left image {
		width: 92rpx;
		height: 92rpx;
		opacity: 1;
		border-radius: 20rpx;
		margin-right: 30rpx;
	}

	.right {
		font-size: 40rpx;
		font-weight: 700;
	}

	.medium {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 24rpx;
		color: rgba(102, 102, 102, 1);
		font-family: "Alibaba_Medium";
	}

	.bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 25rpx;
	}

	.tips-text {
		font-size: 24rpx;
		color: rgba(102, 102, 102, 1);
		font-family: "Alibaba_Medium";
	}
	.button-box {
		width: 140rpx;
		height: 50rpx;
		opacity: 1;
		border-radius: 90px;
		background: rgba(60, 207, 177, 1);
		font-size: 22rpx;
		color: rgba(255, 255, 255, 1);
		line-height: 50rpx;
		text-align: center;
		font-family: "Alibaba_bold";
	}
	hr {
		border: 1rpx solid #f3f3f3;
		margin-top: 60rpx;
		margin:30rpx 0 30rpx 0;
	}
</style>
