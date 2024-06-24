<template>
	<view class="con">
		<view class="topbar">
			<image class="register-back" src="../../static/log-res-back.png" mode="" @click="backtoMy">
			</image>
			<p class="title">绑定手机</p>
		</view>
		<view class="input-box">
			<view class="input-little1">
				<image src="../../static/set-phone.png" mode=""></image>
				<input type="number" placeholder="手机号码" v-model="phone">
			</view>
			<!-- <view class="input-little2">
				<view class="input-in-little1">
					<image src="../../static/code.png" mode=""></image>
				<input type="number" placeholder="输入验证码">
				</view>
				<view class="get">
					获取验证码
				</view>
			</view>
			<view class="input-little3">
				<view class="input-in-little2">
					<image src="../../static/password.png" mode=""></image>
				<input type="number" placeholder="密码">
				</view>
				<image src="" mode=""></image>
			</view> -->
			<view class="tips">
				绑定后可以通过手机号码密码登录
			</view>
		</view>
		<view class="binding" @click="modifyphone">
			绑定
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:'',
			}
		},
		methods: {
			async modifyphone() {
			  await this.request({
			  url:`/xlzb/updateUser`,
			  method:'POST',
			  data: {
			    "user_id":uni.getStorageSync('userId'),
			    "phone":this.phone
			  }
			  }).then(res=> {
			    if(res.code === "200") {
			      uni.setStorageSync("userphone",this.phone)
			      uni.showToast({
			        title:'绑定成功'
			      })
			      var timer = setInterval(()=> {
			        uni.navigateTo({
			          url:'/pages/account-setting/account-setting'
			        })
			        clearInterval(timer)
			      },1500)
			    }
			  }).catch(err => {
			    console.log(err)
			  })
			},
		}
	}
</script>

<style>
.con {
		width: 750rpx;
		background-color: rgb(255, 247, 226);
		display: flex;
		flex-direction: column;
		align-items: center;
		/* height: 2000rpx; */
    height: 100vh;
		opacity: 1;
		background: linear-gradient(180deg, rgba(189, 242, 232, 1) 0%, rgba(59, 206, 177, 1) 100%);
	}
	
	.register-back {
		width: 50rpx;
		height: 50rpx;
	}
	
	.topbar {
		display: flex;
		justify-content: flex-start;
    align-items: center;
		margin-top: 65rpx;
		width: 690rpx;
		margin-top: 70rpx;
	}
	
	.title {
		margin-left: 220rpx;
		font-size: 36rpx;
		font-family: "Alibaba_Medium";
	}
	.input-box {
		width: 530rpx;
		height: 300rpx;
		opacity: 1;
		border-radius: 40rpx;
		background: rgba(255, 255, 255, 1);
		padding: 80rpx;
		margin-top: 110rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.input-little1 {
		display: flex;
		justify-content: flex-start;
    align-items: center;
		border-bottom: 3rpx solid rgba(71, 209, 182, 1);   
		width: 517rpx;
		height: 80rpx;
	}
	.input-little2 {
		display: flex;
		justify-content: space-between;
    align-items: center;
		width: 517rpx;
		height: 80rpx;
	}
	.input-in-little1 {
		display: flex;
		justify-content: flex-start;
    align-items: center;
		border-bottom: 3rpx solid rgba(71, 209, 182, 1);
		width: 320rpx;
		height: 80rpx;
	}
	.get {
		width: 188rpx;
		height: 74rpx;
		border-radius: 10rpx;
		background: rgba(59, 206, 177, 1);
		line-height: 74rpx;
		text-align: center;
		color: rgba(255, 255, 255, 1);
	}
	.input-in-little2 {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 320rpx;
		height: 80rpx;
	}
	.input-little3 {
		display: flex;
		justify-content: space-between;
    align-items: center;
		border-bottom: 3rpx solid rgba(71, 209, 182, 1);   
		width: 517rpx;
		height: 80rpx;
	}
  .input-little1 image {
    margin-right: 20rpx;
  }
  .input-in-little1 image {
    margin-right: 20rpx;
  }
  .input-in-little2 image {
    margin-right: 20rpx;
  }
		
	input {
		width: 270rpx;
		height: 80rpx;
		border: none;
	}
	.binding {
		width: 490rpx;
		height: 132rpx;
		opacity: 1;
		border-radius: 90rpx;
		background: rgba(255, 255, 255, 1);
		margin-top: 90rpx;
		line-height: 132rpx;
		text-align: center;
		font-size: 44rpx;
		color: rgba(72, 210, 183, 1);
	}
	image {
		
		width: 45rpx;height: 45rpx;
	}
	.tips {
		color: rgba(71, 209, 182, 1);
		font-size: 24rpx;
		width: 517rpx;
		height: 30rpx;
		text-align: center;
		line-height: 30rpx;
	}
</style>
