<template>
	<view>
		<view class="con">
			<view class="main">
				<view class="register">
					<image class="register-back" src="../../static/login-register/back.png" mode=""
						@click="backToIndex3"></image>
					<p class="title">扫描结果</p>
				</view>
				<view class="big-box">
					<view class="select-box">
						<view :class="{shouru1:!Inv,shouru2:Inv}" @click="Inv=false">
							<p class="text-shouzhi">收入</p>
						</view>
						<view :class="{zhichu1:Inv,zhichu2:!Inv}" @click="Inv=true">
							<p class="text-shouzhi">支出</p>
						</view>
					</view>
					<view class="select-bar" v-show="Inv==false">
						<view class="select">
							<view class="icon-select" v-for="(item,index) in kinditemlist" :key="item.id"
								@click="changeIcon(index,item.url,item.text)">
								<image :src="item.url" mode=""></image>
								<p class="text-type-one">{{item.text}}</p>
							</view>
						</view>
					</view>
					<view class="select-bar" v-show="Inv==true">
						<view class="select">
							<view class="icon-select">
								<image src="../../static/manual-entry/05.png" mode=""></image>
								<p class="text-type-one">收入</p>
							</view>
						</view>
					</view>
				</view>
				<view class="main2">
					<view class="out" v-show="Inv==0">
						<view class="type">
							<image src="../../static/manual-entry/note.png.png (5).png" mode=""></image>
							<p class="text">消费类型</p>
							<image :src="img" mode="" class="type-picture"></image>
							<p class="text-type">
								{{text}}
							</p>
						</view>
						<hr class="ms">
						<view class="date">
							<image src="../../static/manual-entry/note.png.png (4).png" mode=""></image>
							<p class="text-date">消费日期</p>
							<uni-datetime-picker type="date" :clear-icon="false" v-model="single1"
								@maskClick="maskClick" />
						</view>
						<hr class="ms">
						<view class="money">
							<image src="../../static/manual-entry/note.png.png (3).png" mode=""></image>
							<p class="text">消费金额</p>
							<uni-easyinput class="uni-mt-5" trim="all" :placeholder="money1" type="number"
								@input="input" maxlength="15" :inputBorder='false' v-model="money1"></uni-easyinput>
						</view>
						<hr class="ms">
						<view class="seller">
							<image src="../../static/manual-entry/note.png.png (1).png" mode=""></image>
							<p class="text">消费店家</p>
							<uni-easyinput class="uni-mt-5" trim="all" :placeholder="merchants1" type="text" @input="input"
								:inputBorder='false' v-model="merchants1"></uni-easyinput>
						</view>
						<hr class="ms">
            <view class="goods-box">
              <view class="goods-box-head">
                <view class="goods-box-head-left">
                  <image src="../../static/commodity.png" mode=""></image>
                  <view class="hui">
                    <p>相关商品</p>
                    <p>(左滑可进行操作)</p>
                  </view>
                </view>
                <view class="goods-box-head-right" @click="additem">
                  添加
                </view>
              </view>
              <view class="goods">
                <!-- 商品项 -->
                <!-- <view class="goods-items" v-for="(item,index) in productList" :key="item.data">
                  <view class="goods-items-head">
                    <view class="goods-name">{{item.data}}</view>
                    <view class="goosds-count">*{{item.amount}}</view>
                  </view>
                  <view class="goods-price">单价:￥{{item.price}}</view>     
                </view> -->
                <goodsitem v-for="(item,index) in productList" :key="item.data" :text="item.data" :amount="item.amount" :price="item.price" @delitem="delitem(index)" @edit="edit(index,item)"></goodsitem>
              </view>
            </view>
						<view class="upload">
							<view class="upload-left">
								<image src="../../static/manual-entry/note.png(0).png" mode=""></image>
								<p class="text">上传图片</p>
							</view>
							<view class="upload-right">
                <view v-if="haveimg == 1" class="billimg" @click="previewimage">
                  <image :src="billimg" mode=""></image>
                </view>
								<uni-file-picker 
                v-if="haveimg == 0"
									v-model="imageValue" 
									fileMediatype="image" 
									mode="grid" 
							    :limit="1"
									@select="select"
								/>
							</view>
						</view>
						<hr class="ms">
						<view class="tips">
							<image src="../../static/manual-entry/note.png.png (2).png" mode=""></image>
							<p class="text">备注</p>
							<textarea name="ar" id="" cols="30" rows="10" :placeholder="note1" v-model="note1"></textarea>
						</view>
						<hr class="ms">
						<view class="button" @click="consumptionsubmit">
							<view class="bt">保存</view>
						</view>
					</view>
					<view class="in" v-show="Inv==1">
						<view class="type">
							<image src="../../static/manual-entry/note.png.png (5).png" mode=""></image>
							<p class="text">收入类型</p>
							<image :src="require('../../static/manual-entry/6.png')" mode="" class="type-picture">
							</image>
							<p class='text-shouru'>收入</p>
						</view>
						<hr class="ms">
						<view class="date">
							<image src="../../static/manual-entry/note.png.png (4).png" mode=""></image>
							<p class="text-date">收入日期</p>
							<uni-datetime-picker type="date" :clear-icon="false" v-model="single2"
								@maskClick="maskClick" />
						</view>
						<hr class="ms">
						<view class="money">
							<image src="../../static/manual-entry/note.png.png (3).png" mode=""></image>
							<p class="text">收入金额</p>
							<uni-easyinput class="uni-mt-5" trim="all" :placeholder="money2" type="number"
								@input="input" maxlength="15" :inputBorder='false' v-model="money2"></uni-easyinput>
						</view>
						<hr class="ms">
						<view class="seller">
							<image src="../../static/manual-entry/note.png.png (1).png" mode=""></image>
							<p class="text">收入来源</p>
							<uni-easyinput class="uni-mt-5" trim="all" :placeholder="origin" type="text"
								:inputBorder='false' v-model="origin"></uni-easyinput>
						</view>
						<hr class="ms">
						<view class="upload">
							<view class="upload-left">
								<image src="../../static/manual-entry/note.png(0).png" mode=""></image>
								<p class="text">上传图片</p>
							</view>
							<view class="upload-right" >
                <view v-if="haveimg2 == 1" class="billimg" @click="previewimage">
                  <image :src="billimg" mode=""></image>
                </view>
								<uni-file-picker 
                  v-if="haveimg2 == 0"
									v-model="imageValue" 
									fileMediatype="image" 
									mode="grid" 
							    :limit="1"
									@select="select2"
								/>
							</view>
						</view>
						<hr class="ms">
						<view class="tips">
							<image src="../../static/manual-entry/note.png.png (2).png" mode=""></image>
							<p class="text">备注</p>
							<textarea name="ar" id="" cols="30" rows="10" :placeholder="note2" v-model="note2"></textarea>
						</view>
						<hr class="ms">
						<view class="button" @click="save">
							<view class="bt">保存</view>
						</view>
					</view>
				</view>
			</view>
      <!-- 浅灰色背景遮罩 -->
      <view class="model-box" :style="{'top':top+'rpx'}">
      
      </view>
      <!-- 添加商品 -->
      <view class="chose" :style="{'bottom':bottom+'rpx'}">
        <view class="model-head">
          <p>添加商品</p>
          <image src="../../static/close.png" mode="" @click="close"></image>
        </view>
        <view class="model-body">
          <view class="model-body-item">
            <p>商品名:</p>
            <input type="text" placeholder="输入要添加的商品名" v-model="goodsname">
          </view>
          <view class="model-body-item">
            <p>商品数量:</p>
            <input type="text" placeholder="输入要添加的商品数量" v-model="goodscount">
          </view>
          <view class="model-body-item">
            <p>商品单价:</p>
            <input type="text" placeholder="输入要添加的商品单价" v-model="goodsprice">
          </view>
        </view>
        <view class="sure" @click="adddone">
          添加
        </view>
      </view>
      <!-- 编辑商品 -->
      <view class="chose" :style="{'bottom':bottom2+'rpx'}">
        <view class="model-head">
          <p>添加商品</p>
          <image src="../../static/close.png" mode="" @click="close2"></image>
        </view>
        <view class="model-body">
           <p class="model-body-title">点击需要编辑的项</p>
          <view class="model-body-item">
            <p>商品名:</p>
            <input type="text" :placeholder="goodsname2" v-model="goodsname2">
          </view>
          <view class="model-body-item">
            <p>商品数量:</p>
            <input type="text" :placeholder="goodscount2" v-model="goodscount2">
          </view>
          <view class="model-body-item">
            <p>商品单价:</p>
            <input type="text" :placeholder="goodsprice2" v-model="goodsprice2">
          </view>
        </view>
        <view class="sure" @click="editdone">
          编辑完成
        </view>
      </view>
		</view>
	</view>
</template>

<script>
  import goodsitem from '../../components/goodsitem/goodsitem.vue'
	export default {
		data() {
			return {
				Inv: false,
				isActive: true,
				src: '0.png',
        money1:"",
        money2:"",
        single1:'',
        single2:'',
				flag: 0,
        indexflag:0,
        goodsname:'',
        goodscount:'',
        goodsprice:'',
        goodsname2:'',
        goodscount2:'',
        goodsprice2:'',
        // 是否有img,没有为0,有为1
        haveimg:1,
        haveimg2:1,
        billimg:'',
        top: 2000,
        bottom: -750,
        bottom2: -750,
        productList:[],
        note1:'',
        note2:'',
        merchants1:'',
        merchants2:'',
        origin:'',
        outdata:{},
        tempFilePaths:'',
        tempFilePaths2:'',
        nowtime:"",
				imageStyles: {
					width: '160rpx',
					height: '160rpx',
					border: {
						radius: 6,
						color: '#d5d5d5'
					}
				},
				img: '../../static/manual-entry/01.png',
				text: '餐饮',
				kinditemlist: [{
						id: '001',
						url: '../../static/manual-entry/01.png',

						text: '餐饮'
					},
					{
						id: '002',
						url: '../../static/manual-entry/04.png',

						text: '出行'
					},
					{
						id: '003',
						url: '../../static/manual-entry/06.png',

						text: '娱乐'
					},
					{
						id: '004',
						url: '../../static/manual-entry/02.png',

						text: '学习'
					},
					{
						id: '005',
						url: '../../static/manual-entry/03.png',

						text: '其它'
					},
				],
			};
		},
    onLoad(option) {
      console.log(option)
      this.getnowtime()
      if(option.income == "false") {
        // 最后的数据
        this.outdata = option
        this.money1 = option.count
        this.single1 = option.timestamp.slice(0,10)
        this.billimg = option.picture
        this.merchants1 = option.merchants
        this.productList = JSON.parse(option.productList)
        console.log(this.productList)
        this.computetotal()
      }
    },
    components: {
      goodsitem
    },
		methods: {
      // 获取现在的是时分秒
      getnowtime() {
        var date = new Date()
        var hour = date.getHours()
        hour = hour<10?'0'+hour:hour 
        var minue = date.getMinutes()
        minue = minue<10?'0'+minue:minue 
        var second = date.getSeconds()
        second = second<10?'0'+second:second
        console.log(hour+":"+minue+":"+second)
        this.nowtime = " "+hour+":"+minue+":"+second
      },
      save() {
        if (this.tempFilePaths2 == '') {
          this.getnowtime()
          this.request({
            url: '/xlzb/manalUploadBills_noFile',
            method: 'POST',
            data: {
              'user_id': uni.getStorageSync('userId'),
              'count': this.money2,
              'timestamp': this.single2 + this.nowtime,
              'is_income': "true",
              'type': '收入',
              'method': '扫描录入',
              "picture":this.billimg,
              'merchants': this.merchants2,
              "note": this.note2
            }
          }).then(res => {
            console.log(res)
            // var data = JSON.parse(res.data)
            if(res.code == '200') {
              uni.showToast({
                title: '添加成功'
              })
              var timer = setInterval(() => {
                uni.redirectTo({
                  url: '/pages/index2/index2'
                })
                clearInterval(timer)
              }, 1500)
            }
      
          })
        } else {
          this.getnowtime()
          uni.uploadFile({
            url: 'http://139.9.197.13:8080/xlzb/manalUploadBills',
            filePath: this.tempFilePaths2,
            name: 'file',
            formData: {
              'user_id': uni.getStorageSync('userId'),
              'count': this.money2,
              'timestamp': this.single2 + this.nowtime,
              'is_income': "true",
              'type': '收入',
              'method': '扫描录入',
              "picture":this.billimg,
              "note": this.note2
            },
            success: (res) => {
              console.log(res)
              // var data = JSON.parse(res.data)
              if(res.code == '200') {
                uni.showToast({
                  title: '添加成功'
                })
                var timer = setInterval(() => {
                  uni.redirectTo({
                    url: '/pages/index2/index2'
                  })
                  clearInterval(timer)
                }, 1500)
              }
            }
          });
        }
      },
      // 消费类型计算总结,提交数据给接口，然后返回首页
			consumptionsubmit() {
				this.computetotal()
        let obj = {
            'user_id': uni.getStorageSync('userId'),
            'count': this.money1,
            'timestamp': this.single1 + " 00:00:00",
            'is_income': "false",
            'type': this.text,
            'method': '扫描录入',
            'merchants': this.merchants1,
            "note": this.note1,
            "picture":this.billimg,
            "product_list":this.productList
          }
        this.request({
          url: '/xlzb/manalUploadBills_noFile',
          method: 'POST',
          data: obj
        }).then(res => {
          uni.showToast({
            title: '添加成功'
          })
          var timer = setInterval(() => {
            uni.redirectTo({
              url: '/pages/index2/index2'
            })
            clearInterval(timer)
          }, 1500)
        
        })
			},
      computetotal() {
        let total = 0
        for(var i = 0;i<this.productList.length;i++) {
          total = total + this.productList[i].amount * this.productList[i].price
        }
        this.money1 = total.toFixed(2)
        this.outdata.count = total.toFixed(2)
        console.log("总价",this.outdata.count)
        this.outdata.productList = this.productList
      },
	  previewimage() {
	  	console.log(this.billimg)
	  	let imgsrc=[]
	  	imgsrc[0]=this.billimg
	  	uni.previewImage({
	  		urls:imgsrc,
	  		current:0
	  	})
	  },
      // 编辑项
      edit(index,item) {
        this.indexflag = index
        console.log("xiang",item)
        // 展示该项数据
        this.goodscount2 = item.amount
        console.log(this.goodscount2)
        this.goodsname2 = item.data
        console.log(this.goodsname2)
        this.goodsprice2 = item.price
        console.log(this.goodsprice2)
        // 打开输入面板
        this.top = 0
        this.bottom2 = 0
        
      },
      additem() {
        this.top = 0
        this.bottom = 0
      },
      select(e) {
        console.log(e)
        this.tempFilePaths = e.tempFilePaths[0]
        console.log(this.tempFilePaths)
      },
      select2(e) {
        console.log(e)
        this.tempFilePaths2 = e.tempFilePaths[0]
        console.log(this.tempFilePaths2)
      },
      // 删除指定项
      delitem(index) {
        console.log("被调用了")
        console.log("index",index)
        this.productList.splice(index,1)
        this.computetotal()
        console.log("删除后数组为",this.productList)
        // 删除数组中,指定对象元素
      },
      // 添加完成
      adddone() {
        this.top = 2000
        this.bottom = -750
        let obj = {
          amount:this.goodscount,
          data:this.goodsname,
          price:this.goodsprice
        }
        this.productList.push(obj)
        console.log("添加了的数组",this.productList)
        this.goodscount = ''
        this.goodsname = ''
        this.goodsprice = ''
        this.computetotal()
      },
      // 完成编辑
      editdone() {
        
        // 编辑数据
        this.productList[this.indexflag].amount = this.goodscount2
        this.productList[this.indexflag].data = this.goodsname2
        this.productList[this.indexflag].price = this.goodsprice2
        this.computetotal()
        // 关闭编辑面板
        this.top = 2000
        this.bottom2 = -750
      },
      close() {
        this.top = 2000
        this.bottom = -750
      },
      close2() {
        this.top = 2000
        this.bottom2 = -750
      },
			changeIcon(index, url, text) {
				this.flag = index;
				this.img = url;
				this.text = text;
			},
			backToIndex3(){
				uni.navigateBack({
					delta:1
				})
			}
		},
	}
</script>

<style>
	.con {
		width: 750rpx;
		height: 1790rpx;
		background-image: linear-gradient(180deg, rgba(59, 206, 177, 0.4),rgba(255, 255, 255, 0));
		background-repeat:no-repeat;
		 background-size:750rpx 500rpx;
	}

	.main {
		padding: 31rpx;
		height: 200rpx;
	}

	.register {
		display: flex;
		justify-content: flex-start;
		margin-top: 50rpx;

	}

	.title {
		margin-left: 245rpx;
		font-size: 36rpx;
		font-family: "Alibaba_Medium";
	}


	.register-back {
		width: 19rpx;
		height: 34rpx;
	}

	.big-box {
		width: 630rpx;
		height: 241rpx;
		opacity: 1;
		border-radius: 20rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 6rpx 20rpx 4rpx rgba(219, 219, 219, 0.3);
		padding: 50rpx 30rpx 50rpx 30rpx;
		margin-top: 63rpx;
	}

	.select-box {
		width: 253rpx;
		height: 86rpx;
		border-radius: 90rpx;
		background: rgba(236, 239, 245, 1);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.shouru1,
	.zhichu1 {
		width: 115rpx;
		height: 65rpx;
		border-radius: 90rpx;
		background: rgba(255, 255, 255, 1);
		display: flex;
		justify-content: center;
		align-items: center;


	}

	.shouru2,
	.zhichu2 {
		width: 115rpx;
		height: 65rpx;
		border-radius: 90rpx;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	.text-shouzhi {
		font-size: 32rpx;
		font-weight: 600;
	}

	.select {
		margin: 44rpx 30rpx;
		display: flex;
		justify-content: space-between;
		text-align: center;
	}

	.select image {
		width: 70rpx;
		height: 70rpx;
	}

	.select p {
		font-size: 26rpx;
		font-family: "Alibaba_Extra_bold";
	}


	.main2 {
		background-color: #ffffff;
		margin-top: 30rpx;
		border-radius: 30rpx;
		padding: 40rpx 40rpx;
		box-shadow: 0px 6px 20px 4px rgba(219, 219, 219, 0.24);
	}


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
    align-items: center;
	}

	.tips {
		display: flex;
		justify-content: space-between;
	}



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

	.text {
		font-size: 34rpx;
		font-family: "Alibaba_Extra_bold";
		margin-left: 20rpx;
	}

	.text-tips {
		font-size: 34rpx;
		font-family: "Alibaba_Extra_bold";
		margin-left: -20rpx;
	}

	.text-date {
		font-size: 34rpx;
		font-family: "Alibaba_Extra_bold";
		margin-left: 20rpx;
		margin-right: 45rpx;
	}

	.text-shouru {
		font-size: 26rpx;
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

	textarea {
		width: 370rpx;
		height: 52rpx;
		margin-left: 30rpx;
		font-size: 26rpx;
    line-height: 52rpx;
		padding: 10rpx 0rpx 0 30rpx;
		border-radius: 90rpx;
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
		border-radius: 90rpx;
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

  .model-body-item {
    width: 500rpx;
    height: 80rpx;
    font-size: 28rpx;
    margin: 20rpx auto;
    display: flex;
    align-items: center;
  }
  .model-body-item p {
    margin-right: 20rpx;
    width: 140rpx;
  }
	.text-type {
		font-size: 29rpx;
		margin-left: 20rpx;
		font-family: "Alibaba_bold";
	}

	.text-shouru {
		font-size: 29rpx;
		margin-left: 20rpx;
		font-family: "Alibaba_bold";
	}
  .billimg {
    width: 180rpx;
    height: 180rpx;
    border-radius: 10rpx;
  }
  .billimg image {
    width: 100%;
    height: 100%;
    border-radius: 10rpx;
  }
  
  .goods {
    margin: 25rpx 0;
  }
  
  .goods-items {
    font-size: 28rpx;
    margin: 10rpx 0;
    padding: 10rpx 0;
    border-bottom: 2rpx dashed #ccc;
  }
  .goods-items-head {
    display: flex;
    justify-content: space-between;
  }
  .goods-price {
    display: flex;
    justify-content: flex-end;
  }
  .goods-box {
    margin-top: 40rpx;
  }
  .goods-box-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .goods-box-head-left {
    display: flex;
    align-items: center;
  }
  .goods-box-head-right {
    width: 100rpx;
    height: 50rpx;
    font-size: 28rpx;
    text-align: center;
    line-height: 50rpx;
    border-radius: 40rpx;
    background-color: #3bceb1;
    color: #fff;
  }
  .model-body-title {
    text-align: center;
    color: #3bceb1;
    font-size: 28rpx;
  }
  .goods-box-head image {
    width: 55rpx;
    height: 55rpx;
    margin-left: -6rpx;
  }
  .goods-box-head .hui p:nth-child(2) {
    font-size: 26rpx;
    color: #7b7b7b;
  }
  .goods-box-head .hui {
    display: flex;
    align-items: center;
    font-family: "Alibaba_Extra_bold";
    font-size: 34rpx;
    margin-left: 16rpx;
  }
  .chose {
    width: 650rpx;
    height: 500rpx;
    position: fixed;
    transition: all 0.6s;
    z-index: 99;
    padding: 30rpx 50rpx;
    border-radius: 40rpx 40rpx 0 0;
    background-color: #fff;
  }
  
  .model-head {
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
    justify-content: space-between;
  }
  
  .model-head image {
    width: 61rpx;
    height: 61rpx;
  }
  
  .model-head p {
    color: rgba(51, 51, 51, 1);
    font-weight: 600;
    margin-left: 260rpx;
    font-size: 36rpx;
  }
  
  .picker-view {
    width: 500rpx;
    height: 200rpx;
    font-weight: 600;
    font-size: 34rpx;
    margin-top: 20rpx;
  }
  
  .item {
    color: rgba(51, 51, 51, 1);
    display: flex;
    line-height: 50rpx;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  
  .time {
    display: flex;
    justify-content: space-around;
  }
  
  .head-time {
    text-align: center;
    color: rgba(153, 153, 153, 1);
    font-size: 26rpx;
  }
  
  .this-month {
    display: flex;
    font-weight: 600;
    justify-content: flex-end;
  }
  
  .this-month p {
    width: 121rpx;
    height: 55rpx;
    text-align: center;
    line-height: 55rpx;
    border-radius: 60rpx;
    font-size: 26rpx;
    color: rgba(59, 206, 177, 1);
    border: 2rpx solid rgba(59, 206, 177, 1);
  }
  
  .sure {
    margin: 40rpx auto;
    color: #fff;
    width: 618rpx;
    height: 85rpx;
    line-height: 85rpx;
    text-align: center;
    border-radius: 60rpx;
    background-color: rgba(59, 206, 177, 1);
  }
  
  .model-box {
    position: fixed;
    transition: all 0.6s;
    top: 0;
    z-index: 99;
    width: 100%;
    height: 100%;
    opacity: 0.3;
    background-color: rgba(51, 51, 51, 1);
  }
</style>
