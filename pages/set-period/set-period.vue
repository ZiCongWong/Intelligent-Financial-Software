<template>
	<view class="center-box">
		<setPeriod></setPeriod>
		<setPeriod></setPeriod>
		<setPeriod></setPeriod>
		<setPeriod></setPeriod>
		<view class="circle">
			<!-- <image src="../../static/set-period/add.png" mode=""></image> -->
		</view>
	</view>
</template>

<script>
	import setPeriod from '../../components/setPeriod/setPeriod'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		components : {
			setPeriod
		}
	}
</script>

<style>
.center-box {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.circle {
	width: 98rpx;
	height: 98rpx;
	opacity: 1;
	background: rgba(250, 213, 107, 1);
	box-shadow: 0rpx 5rpx 10rpx 0rpx rgba(250, 213, 107, 0.6);
	border-radius: 50rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	bottom: 150rpx;
	right: 90rpx;
}
.circle image {
	width: 60rpx;
	height: 60rpx;
}
</style>
