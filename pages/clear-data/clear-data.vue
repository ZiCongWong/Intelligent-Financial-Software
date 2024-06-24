<template>
	<view class="main">
		<view class="box">
			<view class="setting">
				<view class="image">
					<image src="../../static/setting/symbol.png" mode=""></image>
				</view>
				<p class='text'>数据已自动备份，如确定清除以下数据，服务器</p>
				<view class="text-box">
					<p>备份也会一并清除，无法恢复</p>
				</view>
			</view>
		</view>
		<view class="box-big">
			<view class="setting-left">
				<p class="text-red">将清除以下数据</p>
			</view>
			<view class="setting-right">
				<view class="circle">
				</view>
				<p class="text-little">账本数据</p>
			</view>
			<view class="setting-right">
				<view class="circle">
				</view>
				<p class="text-little">账单、图片数据</p>
			</view>
			<view class="setting-right">
				<view class="circle">
				</view>
				<p class="text-little">账户数据</p>
			</view>
			
		</view>
		<view class="box-button" @click="cleardata">
			<p class='button'>确定清除数据</p>
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
      cleardata() {
        uni.showModal({
        	title: '提示',
        	content: '你确定要删除吗',
        	success: (res)=> {
        		if (res.confirm) {
        			console.log('确定')
              this.clear()
        		} else if (res.cancel) {
        			console.log('取消');
        		}
        	}
        });
      },
      async clear() {
        await this.request({
        url:`/xlzb/removeALL/${uni.getStorageSync('userId')}`,
        method:'DELETE',
        }).then(res=> {
          if(res.code === 200) {  
            console.log("删除成功")
            uni.navigateTo({
              url:'/pages/login/login'
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },
		},
	}
</script>

<style>
	.main {}

	.box {
		width: 690rpx;
		height: 270rpx;
		margin: 50rpx 30rpx;
		background-color: rgba(255, 255, 255, 1);
		border-radius: 20rpx;
	}

	.box-big {
		width: 690rpx;
		height: 357rpx;
		margin: 50rpx 30rpx;
		background-color: rgba(255, 255, 255, 1);
		border-radius: 20rpx;
	}

	.setting {
		padding: 32rpx 50rpx;
	}
	.setting-left {
		display: flex;
		justify-content: flex-start;
		width: 250rpx;
		height: 52rpx;
		padding: 32rpx 50rpx 15rpx 50rpx;
	}
	.setting-right {
		display: flex;
		justify-content: flex-start;
		width: 250rpx;
		height: 52rpx;
		padding: 20rpx 50rpx 0 50rpx;
		
	}
	.circle {
		width: 12rpx;
		height: 12rpx;
		background-color: rgba(213, 48, 12, 1);
		border-radius: 50%;
		margin-top: 15rpx;
		margin-right: 20rpx;
	}

	.image {
		display: flex;
		justify-content: center;
	}

	image {
		width: 64rpx;
		height: 64rpx;
	}

	.text {
		color: rgba(21, 21, 21, 1.0);
		font-size: 28rpx;
		font-family: "Alibaba_Medium";
		margin-top: 40rpx;
	}

	.text-red {
		font-size: 32rpx;
		color: rgba(213, 48, 12, 1);
		font-family: "Alibaba_Extra_bold";
	}

	.text-little {
		font-size: 28rpx;
		color: rgba(0, 0, 0, 1);
		font-family: "Alibaba_Extra_bold";
	}

	.text-box {
		display: flex;
		justify-content: center;
		color: rgba(21, 21, 21, 1.0);
		font-size: 28rpx;
		font-family: "Alibaba_Medium";
		margin-top: 15rpx;
	}

	.box-button {
		width: 690rpx;
		height: 112rpx;
		margin: 0 30rpx 0 30rpx;
		position: absolute;
		bottom: 100rpx;
		background-color: rgba(213, 48, 12, 1);
		border-radius: 20rpx;
		line-height: 112rpx;
		display: flex;
		justify-content: center;
	}

	.button {
		color: rgba(255, 255, 255, 1);
	}
</style>
