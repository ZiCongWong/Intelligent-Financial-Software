<template>
	<view>
		<view class="tabbar-box"
			style="padding-bottom: constant(safe-area-inset-bottom);padding-bottom: env(safe-area-inset-bottom);">
      <image src="../../static/Vector.png" mode="" class="tabbar-img"></image>
			<view class="tabbar-list-box" v-for="(item,index) in list" :key="item.id" @click="SwitchTab(item)">
				<image :src="item.id==state?item.selectedIconPath:item.iconPath" mode="heightFix" class="img-icon"
					:class="{rotate:item.id==3&&isAddButtonRotated==true}">
				</image>
				<view class="tabbar-text"
					:style="{color:item.id==state?'rgba(59, 206, 177, 1)':'rgba(153, 153, 153, 1)'}">{{item.text}}
				</view>
			</view>
			<view class="mask" :style="{'top':top + 'rpx'}">
				<view class="manual-entry" @click="goManual_entry">
					手动录入
				</view>
				<view class="scan-entry" @click="goScan_entry">
					扫描录入
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "tabbar3",
		props: {
			state: '',
		},
		data() {
			return {
				Becomegreen: false,
				isAddButtonRotated: false,
				top: 170,
				flag: false,
				list: [{
						id: '1',
						text: "首页",
						pagePath: "/pages/index3/index3",
						iconPath: "../../static/home.png",
						selectedIconPath: "../../static/home-active.png"
					},
					{
						id: '2',
						text: "明细",
						pagePath: "/pages/details3/details3",
						iconPath: "../../static/details.png",
						selectedIconPath: "../../static/details-active.png"
					},
					{
						id: '3',
						text: '',
						iconPath: "../../static/input.png",
						selectedIconPath: "../../static/input.png"
					},
					{
						id: '4',
						text: "统计",
						pagePath: "/pages/statistics3/statistics3",
						iconPath: "../../static/statistics.png",
						selectedIconPath: "../../static/statistics-active.png"
					},
					{
						id: '5',
						text: "我的",
						pagePath: "/pages/my3/my3",
						iconPath: "../../static/my.png",
						selectedIconPath: "../../static/my-active.png"
					}
				]
			};
		},
		methods: {
			SwitchTab(item) {
				this.top = 170
				if (item.id == '3') {
					if (this.isAddButtonRotated === false) {
						this.top = -220
						this.isAddButtonRotated = true
					} else if (this.isAddButtonRotated === true) {
						this.top = 170
						this.isAddButtonRotated = false
					}
				} else {
					console.log(item)
					uni.redirectTo({
						url: item.pagePath
					});
					this.isAddButtonRotated = false
				}
				console.log(item)
			},
			goManual_entry() {
				this.isAddButtonRotated = false
				// Becomegreen = true
				this.top = 170
				uni.navigateTo({
					url: '/pages/manual-entry3/manual-entry3'
				})
			},
			goScan_entry() {
				// Becomegreen = true
        this.$emit('scanentry')
			},
		}
	}
</script>

<style scoped>
	.tabbar-box {
		display: flex;
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 99;
		/* background-color: rgba(255, 255, 255, 1); */
		justify-content: space-around;
		align-items: center;
		padding: 15rpx 0rpx 15rpx 0;
		/* box-shadow: 10rpx 10rpx 20rpx #a2a2a2; */

	}
  .tabbar-img {
    position: absolute;
    width: 100%;
    z-index: -1;
    left: 0;
    bottom: 0;
    height: 128rpx;
    /* height: 30rpx; */
  }
	.tabbar-list-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

	}

	.tabbar-list-box:nth-child(4) {
		margin: -100rpx -50rpx 0 -50rpx;
	}

	.tabbar-list-box:nth-child(4) image {
		width: 120rpx;
		height: 120rpx;
		transition-duration: 0.3s;
		transition-delay: 0.1s;
		transition-timing-function: ease-in;

	}

	.rotate {
		transform: rotate(45deg);

	}

	.img-icon {
		width: 50rpx;
		height: 50rpx;
	}

	.tabbar-text {
		margin-top: 5rpx;
		font-size: 35rpx;
		font-weight: 600;
	}

	.mask {
		font-size: 32rpx;
		font-weight: 600;
		position: absolute;
		top: 150rpx;
		text-align: center;
		line-height: 75rpx;
		border-radius: 10rpx;
		transition: all 0.6s ease-in-out;
		width: 151rpx;
		z-index: 99;
		height: 162rpx;

	}

	.manual-entry {
		width: 151rpx;
		height: 75rpx;
		border-radius: 10rpx;
		background-color: #ffffff;
		color: rgba(59, 206, 177, 1);
		box-shadow: 0 0 5rpx 2rpx #3bceb1;
	}

	.scan-entry {
		width: 151rpx;
		height: 75rpx;
		color: #ffffff;
		border-radius: 10rpx;
		background-color: rgba(59, 206, 177, 1);
    box-shadow: 0 0 5rpx 2rpx #3bceb1;
	}

	.mask::after {
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		left: 65rpx;
		bottom: -14rpx;
		border-top: 15rpx solid rgba(59, 206, 177, 1);
		border-bottom: 15rpx solid transparent;
		border-right: 15rpx solid transparent;
		border-left: 15rpx solid transparent;
	}
</style>