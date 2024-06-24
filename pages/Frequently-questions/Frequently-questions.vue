<template>
	<view class="con">
		<view class="big-box">
			<view class="every-colum">
				<p class="text">如何修改周期设定？</p>
				<image src="../../static/set.png" mode=""></image>
			</view>
			<view class="every-colum">
				<p class="text">首页怎么显示剩余预算？</p>
				<image src="../../static/set.png" mode=""></image>
			</view>
			<view class="every-colum">
				<p class="text">怎么导出数据？</p>
				<image src="../../static/set.png" mode=""></image>
			</view>
			<view class="every-colum">
				<p class="text">如果卸载软件数据会丢失吗？</p>
				<image src="../../static/set.png" mode=""></image>
			</view>
			<view class="every-colum">
				<p class="text">如何快速查看我的消费指南</p>
				<image src="../../static/set.png" mode=""></image>
			</view>
			
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

		}
	}
</script>

<style>
	.con {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.big-box {
		width: 630rpx;
		height: 479rpx;
		border-radius: 20px;
		background: rgba(255, 255, 255, 1);
		padding: 30rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-top: 30rpx;
	}

	.every-colum {
		display: flex;
		justify-content: space-between;font-size: 32rpx;
	}
	image {
		width: 45rpx;
		height: 45rpx;
	}
</style>
