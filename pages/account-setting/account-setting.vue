<template>
	<view class="main">
		<view class="box">
			<view class="setting-image">
				<image :src="avatr" mode="aspectFill" @click="viewImage" class="avatar-image"></image>
				<view class="change" @click="chooseImg">
					<p class="text-green">更换头像</p>
				</view>
			</view>
		</view>
		<view class="box-little">
			<view class="setting" @click="open">
				<p class="text">昵称</p>
				<view class="option-box">
				  <p class="text-hui">{{name}}</p>
          <image src="../../static/setting/image.png.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="box-big">
			<view class="setting" @click="goBindingphone">
				<p class="text">手机</p>
				<p class="text-hui">{{phone}}</p>
        <view class="option-box">
          <p class="text-hui">{{phone}}</p>
          <image src="../../static/setting/image.png.png" mode=""></image>
        </view>
			</view>
			<view class="setting" @click="goBindingemail">
				<p class="text">邮箱</p>
        <view class="option-box">
          <p class="text-green">{{email}}</p>
          <image src="../../static/setting/image.png.png" mode=""></image>
        </view>
			</view>
			<!-- <view class="setting">
				<p class="text">微信</p>
				<p class="text-hui">未绑定</p>
			</view>
			<view class="setting">
				<p class="text"> QQ</p>
				<p class="text-hui">未绑定</p>
			</view> -->
		</view>
		<view class="box-little">
			<view class="setting">
				<p class="text">账号注销</p>
				<image class="icon" src="../../static/setting/image.png.png" mode=""></image>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" class='popup' background-color="" :mask-click="true">
			<view class="pop">
				<view class="text-pop">
					<p class="popup-title">修改昵称</p>
					<view class="border-input">
						<uni-easyinput class="uni-mt-5" trim="all" placeholder='请输入昵称' type="text" maxlength="20"
						:inputBorder='false' v-model="name"></uni-easyinput>
					</view>
					
				</view>
				
				<view class="bt-box">
					<view @click="close()" class="bt">取消</view>
					<view class="separated"></view>
					<view class="bt-green" @click="modifyname">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	// import {
	// 	mapState,
	// 	mapMutations
	// } from 'vuex'
	
	export default {
		data() {
			return {
				avatr: uni.getStorageSync('userheadAvrUrl'),
				name :'',
				phone:'',
				email:''
			}
		},
		onShow() {
			this.getUserID()
			this.getUserPhone()
		},
		methods: {
			open() {
				this.$refs.popup.open('center');
			},
			close() {
				this.name=uni.getStorageSync('namesync');
				this.$refs.popup.close();
			},
			goBindingphone(){
				uni.navigateTo({
					url:'/pages/binding-phone/binding-phone'
				})
			},
			goBindingemail(){
				uni.navigateTo({
					url:'/pages/binding-email/binding-email'
				})
			},
			// ...mapMutations('userdata', ['updateuserheadAvrUrl']),
			chooseImg() {
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						console.log(chooseImageRes.tempFilePaths[0])
						this.avatr = chooseImageRes.tempFilePaths[0]
						uni.uploadFile({
							url: `http://139.9.197.13:8080/xlzb/setHeadAvr/${uni.getStorageSync('userId')}`,
							filePath: tempFilePaths[0],
							name: 'file',
							success: (res) => {
								console.log(res)
								console.log(res.data.slice(35, -2))
								this.avatr = res.data.slice(35, -2)
								// this.updateuserheadAvrUrl(this.avatr)
								uni.setStorageSync('userheadAvrUrl',res.data.slice(35,-2))
							}
						});
			 	}
				})
			},
			viewImage() {
				console.log(this.avatr)
				let imgsrc=[]
				imgsrc[0]=this.avatr
				uni.previewImage({
					urls:imgsrc,
					current:0
				})
			},
			async getUserID() {
			  await this.request({
			  url:`/xlzb/getUserInfo/${uni.getStorageSync('userId')}`,
			  method:'GET',
			  
			  }).then(res=> {
			    if(res.code === "200") {
			      console.log("ttt",res)
			      this.name = res.data.name
            // uni.setStorageSync('namesync',res.data.name)
			      console.log('ok11',res.data.name)
			    }
			  }).catch(err => {
			    console.log('errorsss',err)
				console.log('errorss',uni.getStorageSync('userId'))
			  })
			},
			async getUserPhone() {
			  await this.request({
			  url:`/xlzb/getUserInfo/${uni.getStorageSync('userId')}`,
			  method:'GET',
			  }).then(res=> {
			    if(res.code === "200") {
			      this.phone = res.data.phone,
            this.email=res.data.mail
			    }
			  }).catch(err => {
			    
			  })
			},
      async modifyname() {
        await this.request({
        url:`/xlzb/updateUser`,
        method:'POST',
        data: {
          "user_id":uni.getStorageSync('userId'),
          "name":this.name
        }
        }).then(res=> {
          if(res.code === "200") {
            uni.setStorageSync("username",this.name)
            this.$refs.popup.close();
          }
        }).catch(err => {
          
        })
      },
		},
	}
</script>

<style>
	.main {
		width: 750rpx;
	}

	.box {
		width: 690rpx;
		height: 216rpx;
		margin: 50rpx 30rpx;
		background-color: rgba(255, 255, 255, 1);
		border-radius: 20rpx;

	}

	.box-little {
		width: 690rpx;
		height: 127rpx;
		margin: 50rpx 30rpx;
		background-color: rgba(255, 255, 255, 1);
		border-radius: 20rpx;

	}

	.box-big {
		width: 690rpx;
		height: 210rpx;
		margin: 50rpx 30rpx;
		background-color: rgba(255, 255, 255, 1);
		border-radius: 20rpx;
	}

	.setting {
		display: flex;
		justify-content: space-between;
		padding: 42rpx 40rpx 0rpx 40rpx;
	}

	.setting-image {
		display: flex;
		justify-content: space-between;
		padding: 40rpx;
		line-height: 150rpx;
	}

	.avatar-image {
		width: 143rpx;
		height: 143rpx;
		border-radius: 20rpx;
		border: 2rpx ;
	}

	.text {
		color: rgba(21, 21, 21, 1.0);
	}

	.text-green {
		color: rgba(59, 206, 177, 1);
	}

	.text-hui {
		color: rgba(153, 153, 153, 1);
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

	.icon {
		width: 44rpx;
		height: 44rpx;
	}
	.pop {
		border-radius: 30rpx;
		background-color: rgba(255, 255, 255, 1);
		width: 690rpx;
		height: 312rpx;
	}
	.separated {
		width: 2rpx;
		height: 34.05rpx;
		background-color: rgba(175, 175, 175, 1.0);
		margin-top: 10rpx;
	}
	.text-pop {
		width: 690rpx;
		height: 206rpx;
		padding: 36rpx 50rpx;
	}
	.popup-title {
		color: rgba(51, 51, 51, 1);
		font-size: 36rpx;
		font-family: "Alibaba_Medium";
		margin-bottom: 32rpx;
	}
	.popup-tips {
		color: rgba(51, 51, 51, 1);
		font-size: 30rpx;
		font-family: "Alibaba_Medium";
		
	}
	.bt-box {
		height: 90rpx;
		display: flex;
		text-align: center;
		position: absolute;
		bottom: 0;
	}
	
	.bt {
		width: 344rpx;
		color: rgba(51, 51, 51, 1);
		font-size: 36rpx;
		font-family: "Alibaba_Medium";
	}
	.bt-green {
		width: 344rpx;
		color: rgba(60, 207, 177, 1);
		font-size: 36rpx;
		font-family: "Alibaba_Medium";
	}
	.border-input {
		width: 600rpx;
	}
  .option-box {
    display: flex;
    align-items: center;
  }
  .option-box image {
    width: 40rpx;
    height: 40rpx;
  }
</style>
