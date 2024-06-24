<template>
  <view class="main">
    <view class="main-head-box">
      <view class="con">
        <view class="head">
          <view class="head-item" :class="move===index?'move':''" v-for="(item,index) in headitem" :key="item.id"
            @click="change(index)">
            <view class="title">{{item.title}}</view>
          </view>
        </view>
        <view class="show-box" v-show="current === 0">
          <view class="show-box-head">
            <input type="text" placeholder="0.00" v-model="money1">
            <view class="kind-box">
              <view class="kind" v-for="(item,index) in kinditemlist" :key="item.id" @click="change2(index,item.url,item.text)">
                <view class="kind-item">
                  <image :src="flag==index?item.urlactive:item.url" mode=""></image>
                  <p>{{item.text}}</p>
                </view>
              </view>
            </view>
          </view>
          <view class="info">
            <view class="count-kind">
              <p class="title">消费类型</p>
              <view class="count-kind-item">
                <image :src="img" mode=""></image>
                <p>{{text}}</p>
              </view>
            </view>
            <view class="count-time">
              <p class="title">消费时间</p>
              <view class="count-time-box">
                <uni-datetime-picker type="date" :clear-icon="false" v-model="single1" @maskClick="maskClick" />
              </view>
            </view>
            <view class="count-home">
              <p class="title">消费店家</p>
              <input type="text" placeholder="请输入消费店铺的名字(如校宝贝)" v-model="shop1">
            </view>
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
                <goodsitem v-for="(item,index) in productList" :key="item.data" :text="item.data" :amount="item.amount"
                  :price="item.price" @delitem="delitem(index)" @edit="edit(index,item)"></goodsitem>
              </view>
            </view>
            <view class="count-image">
              <p class="title">上传凭证</p>
              <uni-file-picker class='file-picker' fileMediatype="image" mode="grid" :limit="1" @select="select" :imageStyles="imageStyles" />
            </view>
            <view class="count-text">
              <p class="title">备注</p>
              <input type="text" placeholder="请填写相关备注..." v-model="remark1">
            </view>
            <view class="save" @click="putmessage">
              保存
            </view>
          </view>
        </view>
        <view class="show-box" v-show="current === 1">
          <view class="show-box-head">
            <input type="text" placeholder="0.00" v-model="money2">
            <view class="kind-box">
              <view class="kind">
                <view class="kind-item">
                  <image src="../../static/weixin-revenue3.png" mode=""></image>
                  <p>收入</p>
                </view>
              </view>
            </view>
          </view>
          <view class="info">
            <view class="count-kind">
              <p class="title">收入类型</p>
              <view class="count-kind-item">
                <image src="../../static/weixin-revenue3.png" mode=""></image>
                <p>收入</p>
              </view>
            </view>
            <view class="count-time">
              <p class="title">收入时间</p>
              <view class="count-time-box">
                <uni-datetime-picker type="date" :clear-icon="false" v-model="single2" @maskClick="maskClick" />
              </view>
            </view>
            <view class="count-home">
              <p class="title">收入来源</p>
              <input type="text" placeholder="请输入收入来源" v-model="shop2">
            </view>
            <view class="count-image">
              <p class="title">上传凭证</p>
              <uni-file-picker class='file-picker' fileMediatype="image" mode="grid" @select="select" :limit="1" :imageStyles="imageStyles" />
            </view>
            <view class="count-text">
              <p class="title">备注</p>
              <input type="text" placeholder="请填写相关备注..." v-model="remark2">
            </view>
            <view class="save" @click="save">
              保存
            </view>
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
</template>

<script>
  export default {
    data() {
      return {
        current: 0,
        flag:0,
        move: 0,
        top: 2000,
        bottom: -750,
        bottom2: -750,
        indexflag:0,
        productList: [],
        goodsname:'',
        goodscount:'',
        goodsprice:'',
        goodsname2:'',
        goodscount2:'',
        goodsprice2:'',
        // 消费时间
        single1: '',
        // 收入时间
        single2: '',
        // 支出消费金额
        money1: '',
        money2:'',
        //收入消费金额
        // 消费店家
        shop1: '',
        // 备注
        remark1: '',
        remark2:'',
        tempFilePaths: '',
        tempFilePaths2: '',
        img:'../../static/eat2-active.png',
        text:'餐饮',
        nowtime:'',
        headitem: [{
            id: '001',
            title: '支出'
          },
          {
            id: '002',
            title: '收入'
          }
        ],
        imageStyles: {
        	width: '160rpx',
        	height: '160rpx',
        	border: {
        		radius: 6,
        		color:'#d5d5d5'
        	}
        },
        kinditemlist:[
          {
            id:'001',
            url:'../../static/eat2.png',
            urlactive:'../../static/eat2-active.png',
            text:'餐饮'
          },
          {
            id:'002',
            url:'../../static/education2.png',
            urlactive:'../../static/education2-active.png',
            text:'学习'
          },
          {
            id:'003',
            url:'../../static/travels2.png',
            urlactive:'../../static/travels2-active.png',
            text:'出行'
          },
          {
            id:'004',
            url:'../../static/paly2.png',
            urlactive:'../../static/play2-active.png',
            text:'娱乐'
          },
          {
            id:'005',
            url:'../../static/others2.png',
            urlactive:'../../static/others2-active.png',
            text:'其它'
          },
        ],
      }
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
      putmessage() {
        if (this.tempFilePaths == '') {
          this.getnowtime()
          this.computetotal()
          this.request({
            url: '/xlzb/manalUploadBills_noFile',
            method: 'POST',
            data: {
              'user_id': uni.getStorageSync('userId'),
              'count': this.money1,
              'timestamp': this.single1 + this.nowtime,
              'is_income': "false",
              'type': this.text,
              'method': '手动录入',
              'merchants': this.shop1,
              "note": this.remark1,
              "product_list":this.productList
            }
          }).then(res => {
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
          this.computetotal()
          this.getnowtime()
          uni.uploadFile({
            url: 'http://139.9.197.13:8080/xlzb/manalUploadBills',
            filePath: this.tempFilePaths,
            name: 'file',
            formData: {
              'user_id': uni.getStorageSync('userId'),
              'count': this.money1,
              'timestamp': this.single1 + this.nowtime,
              'is_income': "false",
              'type': this.text,
              'method': '手动录入',
              'merchants': this.shop1,
              "note": this.remark1,
              "product_list_str":JSON.stringify(this.productList)
            },
            success: (res) => {
              console.log(res)
              var data = JSON.parse(res.data)
              if(data.code == '200') {
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
              'type': "收入",
              'method': '手动录入',
              'merchants': this.shop2,
              "note": this.remark2
            }
          }).then(res => {
            var data = JSON.parse(res.data)
           if(data.code == '200') {
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
              'type': "收入",
              'method': '手动录入',
              "note": this.remark2
            },
            success: (res) => {
               var data = JSON.parse(res.data)
              if(data.code == '200') {
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
      // 计算总结,提交数据给接口，然后返回首页
      computetotal() {
      	let total = 0
        if(this.productList.length==0) {
          return
        }
        for(var i = 0;i<this.productList.length;i++) {
          total = total + this.productList[i].amount * this.productList[i].price
        }
        this.money1 = total
        console.log("总价",total)
      },
      additem() {
        this.top = 0
        this.bottom = 0
      },
      // 删除指定项
      delitem(index) {
        console.log("被调用了")
        console.log("index",index)
        this.productList.splice(index,1)
        console.log("删除后数组为",this.productList)
        this.computetotal()
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
      change(index) {
        this.move = index,
        this.current = index
      },
      change2(index,img,text) {
        this.flag = index
        this.img = img
        this.text = text
      },
    }
  }
</script>

<style scoped>
.main {
    z-index: 101;
    transition: all 0.6s;
  }

  .main-head {
    width: 690rpx;
    background-color: #3BCEB1;
    display: flex;
    padding: 30rpx;
    color: #ffffff;
    align-items: center;
  }
  .main-head p {
    margin-left: 230rpx;
    font-weight: 600;
  }
  .head {
    width: 690rpx;
    padding: 0 30rpx 30rpx 30rpx;
    background-color: #3BCEB1;
    display: flex;
    align-items: center;
  }
  .head-item {
    opacity: 0.6;
    color: #fff;
    margin-right: 50rpx;
  }
  .move {
    font-size: 34rpx;
    font-weight: 600;
    opacity: 1;
    color: #fff;
  }
  .show-box-head {
    padding:  20rpx 30rpx 50rpx 30rpx;
    background-color: #3BCEB1;
  }
  .show-box-head input {
    width: 690rpx;
    height: 105rpx;
    font-size: 70rpx;
    padding-bottom: 20rpx;
    color: #FFFFFF;
    border-bottom: 2rpx solid #FFFFFF;
  }
  .kind-item {
    display: flex;
    font-size: 28rpx;
    flex-direction: column;
    color: #FFFFFF;
    align-items: center;
  }
  .kind-item image {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
  }
  .kind-item p {
    margin-top: 10rpx;
  }
  .kind-box {
    padding: 30rpx 20rpx 0rpx 20rpx;
    /* padding-top: 40rpx; */
    display: flex;
    justify-content: space-between;
  }
.info {
  padding: 40rpx 30rpx 40rpx 30rpx;
  background-color: #FFFFFF;
  margin-top: -20rpx;
  border-radius: 30rpx 30rpx 0 0 ;
}
.count-kind-item image {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
}
.count-kind-item {
  display: flex;
  font-size: 28rpx;
  flex-direction: column;
}
.count-kind-item p {
  margin-left: 10rpx;
}
.count-time-box {
  display: flex;
  width: 330rpx;
  height: 60rpx;
  margin-top: 10rpx;
  line-height: 60rpx;
  align-items: center;
}
.count-time {
  margin-top: 30rpx;
}
.count-time-box image {
  width: 27rpx;
  margin-left: 8rpx;
  height: 19rpx;
}
.count-time-box p {
  margin-left: 20rpx;
}
.count-home {
  margin-top: 30rpx;
}
.count-home input,.count-text input {
  font-size: 26rpx;
  margin-top: 10rpx;
  color: #999999;
}
.title {
  font-weight: 600;
}
.count-image {
  margin-top: 30rpx;
}
.count-image .title {
  margin-bottom: 20rpx;
}
.count-text {
  margin-top: 30rpx;
  padding-bottom: 110rpx;
}
.save {
  background-color: #3BCEB1;
  width: 626rpx;
  height: 100rpx;
  margin: 30rpx auto;
  border-radius: 20rpx;
  text-align: center;
  line-height: 100rpx;
  color: #FFFFFF;
  font-size: 36rpx;
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

  .text-type {
    font-size: 29rpx;
    margin-left: 20rpx;
    font-family: "Alibaba_bold";
  }

  .goods {
    margin: 25rpx;
  }

  .goods-box {
    margin-top: 40rpx;
  }

  .goods-box-head {
    display: flex;
    align-items: center;
  }

  .goods-box-head image {
    width: 55rpx;
    height: 55rpx;
    margin-left: -6rpx;
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
  .goods-box-head .hui {
    display: flex;
    align-items: center;
    font-family: "Alibaba_Extra_bold";
    font-size: 34rpx;
    margin-left: 16rpx;
  }
  
  .goods-box-head .hui p:nth-child(2) {
    font-size: 26rpx;
    color: #7b7b7b;
    display: flex;
    align-items: center;
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
