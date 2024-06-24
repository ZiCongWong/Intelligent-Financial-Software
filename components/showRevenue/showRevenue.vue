<template>
	<view>
		<view class="main">
			<view class="table">
				<view class="icon">
					<image class='logo' src="../../static/manual-entry/05.png" mode=""></image>
				</view>
			</view>
			<view class="money">
				<view class="money-card">
					<view class="detail-money">
						<view class="little-line">
							<p class='little'>收入</p>
						</view>
						<p class="big">+{{count}}</p>
					</view>
				</view>
			</view>

			<view class="detail">
				<view class="detail-card">
					<view class="detail-total">
						<view class="xijie">
							<p class="hui">录入方式</p>
							<p class="hei">{{method}}</p>
						</view>
						<view class="xijie">
							<p class="hui">记账人</p>
							<p class="hei">{{username}}</p>
						</view>
						<view class="xijie">
							<p class="hui">入账日期</p>
							<p class="hei">{{time}}</p>
						</view>
						<view class="xijie">
							<p class="hui">备注</p>
							<p class="hei">{{note}}</p>
						</view>
						<view class="xijie">
							<p class="hui">照片</p>
						</view>
						<view class="xijie">
							<image class="show"
              @click="previewimage"
								:src="picture"
								mode=""></image>
						</view>
						<!-- <view class="total">
							<p class="total-tips">截止本单该月微信支出6898,00元</p>
						</view> -->

					</view>
				</view>
			</view>
			<view class="box">
				<view class="delete" @click="open()">
					<image class='icons' src="../../static/consumption-detail/delete.png" mode=""></image>
					<view class="container">
						<p class="wenzi">删除</p>
					</view>
				</view>
				<!-- <view class="edit">
					<image class='icons' src="../../static/consumption-detail/edit.png" mode=""></image>
					<view class="container">
						<p class="wenzi">修改</p>
					</view>
				</view> -->
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" class='popup' background-color="" :mask-click="true">
			<view class="pop">
				<view class="text-pop">
					<p class="popup-title">删除账单</p>
					<p class="popup-tips">确认删除吗，删除后不可恢复</p>
				</view>
				<view class="bt-box">
					<view @click="close()" class="bt">取消</view>
					<view class="separated"></view>
					<view class="bt-green" @click="delbill(billsId)">删除</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name: "showRevenue",
    props:["billsId","count","imgurl","merchants","method","note","time","type","picture"],
		data() {
			return {
        username:uni.getStorageSync('username')
			};
		},
		methods: {
			open() {
				this.$refs.popup.open('center');
			},
			close() {
				this.$refs.popup.close()
			},
      previewimage() {
      	console.log(this.picture)
      	let imgsrc=[]
      	imgsrc[0]=this.picture
      	uni.previewImage({
      		urls:imgsrc,
      		current:0
      	})
      },
			async delbill(billsId) {
			  console.log("删除")
			  await this.request({
			    url: `/xlzb/delBills/${billsId}`,
			    method: 'DELETE',
			  }).then(res => {
			    if (res.code === "200") {
			      uni.showToast({
			        title: '删除成功'
			      });
			      var timer = setInterval(()=> {
			        this.close()
              uni.navigateBack({
                delta:1
              })
			        // if(uni.getStorageSync('usermode') == 0) {
			        //   uni.switchTab({
			        //     url:'/pages/details/details'
			        //   })
			        // }
			        // if(uni.getStorageSync('usermode') == 1) {
			        //   uni.redirectTo({
			        //     url:'/pages/details2/details2'
			        //   })
			        // }
			        // if(uni.getStorageSync('usermode') == 2) {
			        //   uni.redirectTo({
			        //     url:'/pages/details3/details3'
			        //   })
			        // }
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
	.main {}

	.money {

		width: 750rpx;
		height: 271rpx;
		display: flex;
		justify-content: center;
		z-index: 1;
		padding-top: 140rpx;
	}

	.money-card {
		background-color: #ffffff;
		width: 690rpx;
		height: 271rpx;
		border-radius: 20rpx;
		display: flex;
		justify-content: center;
		border-bottom: 2rpx dashed #ccc;
	}

	.table {
		display: flex;
		justify-content: center;
		width: 750rpx;
		height: 190rpx;
		z-index: 2;
		position: absolute;
		top: 40rpx;
	}

	.icon {
		display: flex;
		justify-content: center;
		width: 170rpx;
		height: 170rpx;
		background-color: #ffffff;
		border-radius: 50%;
		border: 10rpx solid #3bceb1;
	}

	.logo {
		width: 110rpx;
		height: 110rpx;
		margin-top: 25rpx;
	}

	.detail {

		width: 750rpx;
		height: 820rpx;
		display: flex;
		justify-content: center;
		z-index: 1;
		margin-top: 2rpx;
	}

	.detail-card {
		background-color: #ffffff;
		width: 690rpx;
		height: 820rpx;
		border-radius: 20rpx;

	}

	.xijie {
		display: flex;
		justify-content: space-between;
		margin-bottom: 35rpx;

	}

	.show {
		width: 132rpx;
		height: 132rpx;
		opacity: 0.6;
		border-radius: 6rpx;
	}

	.detail-total {
		margin: 70rpx 79rpx;
	}

	.hui {
		font-family: "Alibaba_Medium";
		color: rgba(153, 153, 153, 1);

	}

	.hei {
		font-family: "Alibaba_Extra_bold";
		color: rgba(51, 51, 51, 1);
	}

	.total {
		display: flex;
		justify-content: center;
		margin-top: 75rpx;
		font-size: 28rpx;
	}

	.total-tips {
		font-family: "Alibaba_Medium";
		color: rgba(153, 153, 153, 1);
	}

	.detail-money {
		margin-top: 120rpx;
	}

	.little {
		font-family: "Alibaba_Medium";
		color: rgba(153, 153, 153, 1);
		margin-bottom: 10rpx;
	}

	.big {
		font-family: "Alibaba_Extra_bold";
		color: rgba(51, 51, 51, 1);
		font-size: 50rpx;
	}

	.little-line {
		display: flex;
		justify-content: center;
	}

	.box {
		display: flex;
		justify-content: space-around;
		padding: 60rpx 0;
	}

	.icons {
		width: 120rpx;
		height: 120rpx;
	}

	.container {
		display: flex;
		justify-content: center;
		margin-top: 8rpx;
		font-size: 28rpx;
		font-family: "Alibaba_Medium";
		color: rgba(255, 255, 255, 1);
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

	.popup-p {
		border-radius: 30rpx;
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
</style>
