<template>
	<view>
		<view class="main">
			<view class="shou-zhi">
				<view class="zhichu" @click="Inv=0,isActive=true">
					<p :class="{'click':isActive}">支出</p>
					<view class="hengxian" v-show="Inv==0"></view>
				</view>
				<view class="shouru" @click="Inv=1,isActive=false">
					<p :class="{'click':!isActive}">收入</p>
					<view class="hengxian" v-show="Inv==1"></view>
				</view>
			</view>
			<hr>
			<view class="out" v-show="Inv==0">
				<view class="type">
					<image src="../../static/manual-entry/note.png.png (5).png" mode=""></image>
					<p class="text">消费类型</p>
					<image :src="require('../../static/manual-entry/'+src)" mode="" class="type-picture"></image>
					<uni-data-select v-model="value" :localdata="range" @change="changeType(value)" placeholder="请选择">
					</uni-data-select>
				</view>
				<hr class="ms">
				<view class="date">
					<image src="../../static/manual-entry/note.png.png (4).png" mode=""></image>
					<p class="text">消费日期</p>
					<uni-datetime-picker type="date" :clear-icon="false" v-model="single" @maskClick="maskClick" />
				</view>
				<hr class="ms">
				<view class="money">
					<image src="../../static/manual-entry/note.png.png (3).png" mode=""></image>
					<p class="text">消费金额</p>
					<uni-easyinput class="uni-mt-5" trim="all" placeholder="请输入金额(单位元)" type="number" @input="input"
						maxlength="15" :inputBorder='false'></uni-easyinput>
				</view>
				<hr class="ms">
				<view class="seller">
					<image src="../../static/manual-entry/note.png.png (1).png" mode=""></image>
					<p class="text">消费店家</p>
					<uni-easyinput class="uni-mt-5" trim="all" placeholder="请输入消费店家" type="text" @input="input"
						:inputBorder='false'></uni-easyinput>
				</view>
				<hr class="ms">
				<view class="upload">
					<view class="upload-left">
						<image src="../../static/manual-entry/note.png(0).png" mode=""></image>
						<p class="text">上传图片</p>
					</view>
					<view class="upload-right">
						<uni-file-picker class='file-picker' fileMediatype="image" mode="grid" @select="select"
							@progress="progress" @success="success" @fail="fail" :imageStyles="imageStyles" />
					</view>

				</view>
				<hr class="ms">
				<view class="tips">
					<image src="../../static/manual-entry/note.png.png (2).png" mode=""></image>
					<p class="text">备注</p>
					<input type="text" placeholder="点击输入备注...">
					<image class='edit' src="../../static/manual-entry/ju2.png" mode=""></image>
				</view>
				<hr class="ms">
				<view class="button">
					<view class="bt" @tab="submit()">保存</view>
				</view>
			</view>
			<view class="in" v-show="Inv==1">
				<view class="type">
					<image src="../../static/manual-entry/note.png.png (5).png" mode=""></image>
					<p class="text">收入类型</p>
					<image :src="require('../../static/manual-entry/6.png')" mode="" class="type-picture"></image>
					<p class='text-shouru'>收入</p>
				</view>
				<hr class="ms">
				<view class="date">
					<image src="../../static/manual-entry/note.png.png (4).png" mode=""></image>
					<p class="text">收入日期</p>
					<uni-datetime-picker type="date" :clear-icon="false" v-model="single" @maskClick="maskClick" />
				</view>
				<hr class="ms">
				<view class="money">
					<image src="../../static/manual-entry/note.png.png (3).png" mode=""></image>
					<p class="text">收入金额</p>
					<uni-easyinput class="uni-mt-5" trim="all" placeholder="请输入金额(单位元)" type="number" @input="input"
						maxlength="15" :inputBorder='false'></uni-easyinput>
				</view>
				<hr class="ms">
				<view class="seller">
					<image src="../../static/manual-entry/note.png.png (1).png" mode=""></image>
					<p class="text">收入来源</p>
					<uni-easyinput class="uni-mt-5" trim="all" placeholder="请输入来源" type="text" @input="input"
						:inputBorder='false'></uni-easyinput>
				</view>
				<hr class="ms">
				<view class="upload">
					<view class="upload-left">
						<image src="../../static/manual-entry/note.png(0).png" mode=""></image>
						<p class="text">上传图片</p>
					</view>
					<uni-file-picker class='file-picker' fileMediatype="image" mode="grid" @select="select"
						@progress="progress" @success="success" @fail="fail" :imageStyles="imageStyles" />
				</view>
				<hr class="ms">
				<view class="tips">
					<image src="../../static/manual-entry/note.png.png (2).png" mode=""></image>
					<p class="text">备注</p>
					<input type="text" placeholder="点击输入备注...">
					<image class='edit' src="../../static/manual-entry/ju2.png" mode=""></image>
				</view>
				<hr class="ms">
				<view class="button">
					<view class="bt" @tab="submit()">保存</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "entryMessage",
		data() {
			return {
				Inv: 0,
				isActive: true,
				src: '0.png',
				value: 0,
				imageValue: [],
				imageStyles: {
					width: '160rpx',
					height: '160rpx',
					border: {
						radius: 6,
						color: '#d5d5d5'
					}
				},
				range: [{
						value: 0,
						text: "餐饮"
					},
					{
						value: 1,
						text: "出行"
					},
					{
						value: 2,
						text: "娱乐"
					},
					{
						value: 3,
						text: "学习"
					},
					{
						value: 4,
						text: "其它"
					}
				],
			};
		},
		methods: {
			changeType(key) {
				if (key == 0) {
					this.src = "0.png"
				} else if (key == 1) {
					this.src = "1.png"
				} else if (key == 2) {
					this.src = "2.png"
				} else if (key == 3) {
					this.src = "3.png"
				} else if (key == 4) {
					this.src = "4.png"
				}
			},
			submit() {
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
		},
	}
</script>

<style lang="scss">
	.main {
		background-color: #ffffff;
		height: 1250rpx;
		margin-top: 70rpx;
		border-radius: 30rpx;
		padding: 40rpx 60rpx;
	}

	.shou-zhi,
	.type,
	.date,
	.money,
	.seller,
	.upload-left,
	.tips {
		display: flex;
		font-size: 32rpx;
		height: 38rpx;
		line-height: 45rpx;

	}

	.type,
	.date,
	.money,
	.seller,
	.upload,
	.tips,
	.button {
		margin-top: 45rpx;
	}

	.click {
		font-size: 38rpx;
		font-family: "Alibaba_Extra_bold";
	}

	.hengxian {

		height: 6rpx;
		background-color: #3BCEB1;
		margin: 15rpx 15rpx;
	}

	.shouru {
		margin-left: 80rpx;
	}

	.zhichu {
		width: 80rpx;
	}

	hr {
		background-color: #ffffff;
		border: 1rpx solid #f3f3f3;
		margin-top: 60rpx;
	}

	.ms {
		margin-left: 55rpx;
		margin-top: 45rpx;
	}

	.type image,
	.date image,
	.money image,
	.seller image,
	.upload image,
	.tips image {
		width: 44rpx;
		height: 44rpx;
	}

	.type p,
	.date p,
	.money p,
	.seller p,
	.upload p,
	.tips p {
		font-size: 34rpx;
		font-family: "Alibaba_Extra_bold";
		margin-left: 20rpx;
	}

	.type-picture {
		width: 30rpx;
		height: 30rpx;
		margin-left: 45rpx;
	}

	.uni-mt-5 {
		margin-top: -15rpx;
		margin-left: 20rpx;
	}

	.file-picker {
		margin: 40rpx 0 0 60rpx;
	}

	input {
		background-color: #F4F4F4;
		width: 370rpx;
		height: 52rpx;
		margin-left: 60rpx;
		font-size: 26rpx;
		padding: 0 30rpx 0 30rpx;
		border-radius: 90rpx;
		margin-top: -5rpx;

	}

	.edit {
		position: absolute;
		right: 100rpx;
		width: 30rpx;
		height: 30rpx;

	}

	.bt {
		width: 626rpx;
		height: 100rpx;
		margin-top: 70rpx;
		background-color: rgba(59, 206, 177, 1);
		color: #ffffff;
		border-radius: 20rpx;
		border-style: none;
		text-align: center;
		text-decoration: none;
		outline: none;
		font-size: 42rpx;
		line-height: 100rpx;
	}

	.upload-right {
		padding: 0 50rpx 0 0;
	}
  .upload-left {
    margin-bottom: 20rpx;
  }
  .date .text {
    z-index: 99;
    // margin-right: 15rpx;
  }
</style>
