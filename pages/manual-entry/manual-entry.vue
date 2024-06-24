<template>
  <view>
    <view class="main">
      <view class="ad">
        <image class="picture" src="../../static/manual-entry/picture.png" mode=""></image>
      </view>

      <view class="select-bar" v-show="Inv==0">
        <view class="select">
          <view class="icon-select" v-for="(item,index) in kinditemlist" :key="item.id"
            @click="changeIcon(index,item.url,item.text)">
            <image :src="item.url" mode=""></image>
            <p class="text-type-one">{{item.text}}</p>
          </view>
        </view>
      </view>
      <view class="select-bar" v-show="Inv==1">
        <view class="select">
          <view class="icon-select">
            <image src="../../static/manual-entry/05.png" mode=""></image>
            <p class="text-type-one">收入</p>
          </view>
        </view>
      </view>
      <view class="main2">
        <view class="shou-zhi">
          <view class="zhichu" @click="Inv=0,isActive=true,isout=true">
            <p :class="{'click':isActive}">支出</p>
            <view class="hengxian" v-show="Inv==0"></view>
          </view>
          <view class="shouru" @click="Inv=1,isActive=false,isout=false">
            <p :class="{'click':!isActive}">收入</p>
            <view class="hengxian" v-show="Inv==1"></view>
          </view>
        </view>
        <hr>
        <view class="out" v-show="Inv==0">
          <view class="type">
            <image src="../../static/manual-entry/note.png.png (5).png" mode=""></image>
            <p class="text">消费类型</p>
            <image :src="img" mode="" class="type-picture"></image>
            <p class="text-type">
              {{text1}}
            </p>
          </view>
          <hr class="ms">
          <view class="date">
            <image src="../../static/manual-entry/note.png.png (4).png" mode=""></image>
            <p class="text-date">消费日期</p>
            <uni-datetime-picker type="date" :clear-icon="false" v-model="single1" @maskClick="maskClick" />
          </view>
          <hr class="ms">
          <view class="money">
            <image src="../../static/manual-entry/note.png.png (3).png" mode=""></image>
            <p class="text">消费金额</p>
            <uni-easyinput class="uni-mt-5" trim="all" placeholder="请输入金额(单位元)" type="number" maxlength="15"
              :inputBorder='false' v-model="money1"></uni-easyinput>
          </view>
          <hr class="ms">
          <view class="seller">
            <image src="../../static/manual-entry/note.png.png (1).png" mode=""></image>
            <p class="text">消费店家</p>
            <uni-easyinput class="uni-mt-5" trim="all" placeholder="请输入消费店家" type="text" :inputBorder='false'
              v-model="shop1"></uni-easyinput>
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
              <goodsitem v-for="(item,index) in productList" :key="item.data" :text="item.data" :amount="item.amount"
                :price="item.price" @delitem="delitem(index)" @edit="edit(index,item)"></goodsitem>
            </view>
          </view>
          <view class="upload">
            <view class="upload-left">
              <image src="../../static/manual-entry/note.png(0).png" mode=""></image>
              <p class="text">上传图片</p>
            </view>
            <!-- <view class="upload-right" >
							<uni-file-picker 
								v-model="imageValue" 
								fileMediatype="image" 
								mode="grid" 
								@select="select"
                @delete="deleteImg"
							/>
						</view> -->
            <view class="upload-right">
              <uni-file-picker v-model="imageValue" fileMediatype="image" mode="grid" :limit="1" @select="select" />
            </view>

          </view>
          <hr class="ms">
          <view class="tips">
            <image src="../../static/manual-entry/note.png.png (2).png" mode=""></image>
            <p class="text">备注</p>
            <input type="text" placeholder="点击输入备注..." v-model="remark1">
            <image class='edit' src="../../static/manual-entry/ju2.png" mode=""></image>
          </view>
          <hr class="ms">
          <view class="button" @click="putmessage">
            <view class="bt">保存</view>
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
            <p class="text-date">收入日期</p>
            <uni-datetime-picker type="date" :clear-icon="false" v-model="single2" @maskClick="maskClick" />
          </view>
          <hr class="ms">
          <view class="money">
            <image src="../../static/manual-entry/note.png.png (3).png" mode=""></image>
            <p class="text">收入金额</p>
            <uni-easyinput class="uni-mt-5" trim="all" placeholder="请输入金额(单位元)" type="number" maxlength="15"
              :inputBorder='false' v-model="money2"></uni-easyinput>
          </view>
          <hr class="ms">
          <view class="seller">
            <image src="../../static/manual-entry/note.png.png (1).png" mode=""></image>
            <p class="text">收入来源</p>
            <uni-easyinput class="uni-mt-5" trim="all" placeholder="请输入来源" type="text" :inputBorder='false'
              v-model="shop2"></uni-easyinput>
          </view>
          <hr class="ms">
          <view class="upload">
            <view class="upload-left">
              <image src="../../static/manual-entry/note.png(0).png" mode=""></image>
              <p class="text">上传图片</p>
            </view>
            <view class="upload-right">
              <uni-file-picker v-model="imageValue" fileMediatype="image" mode="grid" :limit="1" @select="select2" />
            </view>
          </view>
          <hr class="ms">
          <view class="tips">
            <image src="../../static/manual-entry/note.png.png (2).png" mode=""></image>
            <p class="text">备注</p>
            <input type="text" placeholder="点击输入备注..." v-model="remark2">
            <image class='edit' src="../../static/manual-entry/ju2.png" mode=""></image>
          </view>
          <hr class="ms">
          <view class="button" @click="save">
            <view class="bt">保存</view>
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
      <view class="chose2" :style="{'bottom':bottom2+'rpx'}">
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
        Inv: 0,
        isActive: true,
        src: '0.png',
        flag: 0,
        isout: true,
        indexflag:0,
        goodsname:'',
        goodscount:'',
        goodsprice:'',
        goodsname2:'',
        goodscount2:'',
        goodsprice2:'',
        nowtime:'',
        top: 2000,
        bottom: -750,
        bottom2: -750,
        // 支出消费时间
        single1: '',
        // 收入消费时间
        single2: '',
        // 支出消费金额
        money1: '',
        //收入消费金额
        money2: '',
        // 消费店家
        shop1: '',
        // 收入来源
        shop2: '',
        imgArr: [],
        productList: [],
        tempFilePaths: '',
        tempFilePaths2: '',
        // 备注
        remark1: '',
        remark2: '',
        imageStyles: {
          width: '160rpx',
          height: '160rpx',
          border: {
            radius: 6,
            color: '#d5d5d5'
          }
        },
        img: '../../static/manual-entry/01.png',
        // 消费类型
        text1: '餐饮',
        text2: '收入',
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
      close2() {
        this.top = 2000
        this.bottom2 = -750
      },
      changeIcon(index, url, text) {
        this.flag = index;
        this.img = url;
        this.text1 = text;
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
              'type': this.text1,
              'method': '手动录入',
              'merchants': this.shop1,
              "note": this.remark1,
              "product_list":this.productList
            }
          }).then(res => {
            // var data = JSON.parse(res.data)
            console.log("没有图片",res)
            if(res.code == '200') {
              uni.showToast({
                title: '添加成功'
              })
              var timer = setInterval(() => {
                uni.switchTab({
                  url: '/pages/index/index'
                })
                clearInterval(timer)
              }, 1500)
            }
            
          })
        } else {
          this.computetotal()
          this.getnowtime()
          console.log("productList:")
          console.log(this.productList)
          uni.uploadFile({
            url: 'http://139.9.197.13:8080/xlzb/manalUploadBills',
            filePath: this.tempFilePaths,
            name: 'file',
            formData: {
              'user_id': uni.getStorageSync('userId'),
              'count': this.money1,
              'timestamp': this.single1 + this.nowtime,
              'is_income': "false",
              'type': this.text1,
              'method': '手动录入',
              'merchants': this.shop1,
              "note": this.remark1,
              "product_list_str":JSON.stringify(this.productList)
            },
            success: (res) => {
              console.log("有图片",res)
              var data = JSON.parse(res.data)
              if(data.code == '200') {
                console.log(res)
                uni.showToast({
                  title: '添加成功'
                })
                var timer = setInterval(() => {
                  uni.switchTab({
                    url: '/pages/index/index'
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
              'type': this.text2,
              'method': '手动录入',
              'merchants': this.shop2,
              "note": this.remark2
            }
          }).then(res => {
            console.log(res)
            var data = JSON.parse(res.data)
            if(data.code == '200') {
              uni.showToast({
                title: '添加成功'
              })
              var timer = setInterval(() => {
                uni.switchTab({
                  url: '/pages/index/index'
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
              'type': this.text2,
              'method': '手动录入',
              "note": this.remark2
            },
            success: (res) => {
              console.log(res)
              var data = JSON.parse(res.data)
              if(data.code == '200') {
                uni.showToast({
                  title: '添加成功'
                })
                var timer = setInterval(() => {
                  uni.switchTab({
                    url: '/pages/index/index'
                  })
                  clearInterval(timer)
                }, 1500)
              }
              

            }
          });
        }

      },
      // // 获取上传状态tempFilePaths tempFiles
      // 			select(e){
      //         console.log(e)

      //         for(let i =0;i < e.tempFiles.length;i++){
      //           let img = {
      //             'name':'',
      //             'uri':''
      //           }
      //             img.name = e.tempFiles[i].name
      //             img.uri = e.tempFiles[i].path
      //             this.imgArr.push(img)
      //         }
      //         // this.imgArr.tempFilePaths.push(...e.tempFilePaths)
      //         // this.imgArr.tempFiles.push(...e.tempFiles)
      //         // console.log(nums)
      //         console.log('选择后',this.imgArr)
      // 			},
      // 			// 获取上传进度
      // 			progress(e){
      // 				console.log('上传进度：',e)
      // 			},

      // 			// 上传成功
      // 			success(e){
      // 				console.log('上传成功')
      // 			},
      // 			deleteImg(e){
      //         console.log('删除文件',e)

      //         let index_path = this.imgArr.tempFilePaths.indexOf(e.tempFilePath)
      //         if(index_path>-1) this.imgArr.tempFilePaths.splice(index_path,1)
      //         this.imgArr.tempFiles.forEach((item,index)=>{
      //           if(item.uuid===e.tempFile.uuid){
      //               this.imgArr.tempFiles.splice(index,1)
      //           }
      //         })

      //         console.log('删除后',this.imgArr)
      //       },
      // 			// 上传失败
      // 			fail(e){
      // 				console.log('上传失败：',e)
      // 			},
      // chooseImg3() {
      //   console.log(11)
      //   uni.chooseImage({
      //   	count:9,
      //   	success: res => {
      //   	  this.imgArr.push(...res.tempFilePaths)
      //       console.log("imgArr",res.tempFilePaths)
      //   	}
      //   })
      // },
      // Manuallyenterexpenses() {
      //   console.log(this.imgArr)
      //   uni.uploadFile({
      //   	url: 'http://192.168.188.138:8084/lvzb/manalUploadBills', 
      //     files: this.imgArr,
      //     filePath:'',
      //     name:'file',
      //   	formData: {
      //         'user_id': uni.getStorageSync('userId'),
      //         'count':this.money1,
      //         'timestamp':this.single1,
      //         'isIncome':this.isout,
      //         'type':this.text1,
      //         'method':'手动录入',
      //         "note":this.remark1
      //   	},
      //     header: {"Content-Type": "multipart/form-data"},  
      //   	success: (res) => {
      //       console.log(res)
      //   	}
      //   });
      // },
	  // 获取日期:2023-02-02 星期日
	  getdate() {
	  	let date = new Date()
	  	var year = date.getFullYear()
	  	var month = date.getMonth() + 1
	  	month = month < 10 ? '0' + month : month
	  	var d = date.getDate()
	  	d = d < 10 ? '0' + d : d
	  	var week = date.getDay()
	  	switch (week) {
	  		case 0:
	  			week = '星期日'
	  			break;
	  		case 1:
	  			week = '星期一'
	  			break;
	  		case 2:
	  			week = '星期二'
	  			break;
	  		case 3:
	  			week = '星期三'
	  			break;
	  		case 4:
	  			week = '星期四'
	  			break;
	  		case 5:
	  			week = '星期日五'
	  			break;
	  		case 6:
	  			week = '星期日六'
	  			break;
	  	}
	  	this.week = week
	  	console.log("week", week)
	  	this.today = month + '月' + d + '日' + ' ' + week
	  	console.log(this.today)
	  },
	  get_date() {
	  	this.date = this.year + '-' + this.month + '-' + '01'
	  	console.log(this.date)
	  },
	  // 获取用户的某个月的收入和支出
	  async getUserQuickStat() {
	  	await this.request({
	  		url: '/xlzb/getUserQuickStat',
	  		method: 'POST',
	  		data: {
	  			"user_id": uni.getStorageSync('userId'),
	  			"date": this.year + '-' + this.month + '-' + '01'
	  		}
	  	}).then(res => {
	  		if (res.code === "200") {
	  			console.log("----", res)
	  			// 这个月的支出
	  			this.monthout = res.data.expenses
	  			// this.getmonthout(this.monthout)
	  			// 这个月的收入
	  			this.monthincome = res.data.income
	  			// this.getmonthincome(this.monthincome)
	  			// 这个月的结余
	  			this.balance = this.monthincome - this.monthout
	  			// this.getmonnthbalance(this.balance)
	  			if (this.balance < 0) {
	  				this.balance = 0
	  			}
	  		}
	  	}).catch(err => {
	  		console.log(err)
	  	})
	  },
	  async gettodaydata() {
	  	await this.request({
	  		url: '/xlzb/getBills',
	  		method: 'POST',
	  		data: {
	  			"user_id": uni.getStorageSync('userId')
	  		}
	  	}).then(res => {
	  		if (res.code === "200") {
	  			this.todaydatalist = res.data
	  			if (this.todaydatalist.length == 0) {
	  				console.log("0000")
	  				this.havedata = 0
	  				console.log(this.havedata)
	  			} else {
	  				this.havedata = 1
	  			}
	  			var incount = 0
	  			var outcount = 0
	  			for (var i = 0; i < res.data.length; i++) {
	  				// 消费统计
	  				if (res.data[i].income == false) {
	  					console.log("消费")
	  					outcount = outcount + res.data[i].count
	  				}
	  				// 收入统计
	  				if (res.data[i].income == true) {
	  					incount = incount + res.data[i].count
	  				}
	  				if (res.data[i].type == '餐饮') {
	  					this.todaydatalist[i].imgurl = '../../static/catering.png'
	  				}
	  				if (res.data[i].type == '收入') {
	  					this.todaydatalist[i].imgurl = '../../static/weixin-revenue.png'
	  				}
	  				if (res.data[i].type == '娱乐') {
	  					this.todaydatalist[i].imgurl = '../../static/amusement.png'
	  				}
	  				if (res.data[i].type == '出行') {
	  					this.todaydatalist[i].imgurl = '../../static/travel.png'
	  				}
	  				if (res.data[i].type == '学习') {
	  					this.todaydatalist[i].imgurl = '../../static/manual-entry/02.png'
	  				}
	  				if (res.data[i].type == '其它') {
	  					this.todaydatalist[i].imgurl = '../../static/manual-entry/03.png'
	  				}
	  			}
	  			this.insum = incount
	  			this.outsum = outcount
	  
	  			console.log(this.todaydatalist)
	  		}
	  	}).catch(err => {
	  		console.log(err)
	  	})
	  },
	  // 获取进度条方法系列getuserbid()
	  // 1.获取用户的预算信息和账单id用来计算进度条
	  // 获取用户的预算信息，账单id，进度条百分比
	  async getuserbid() {
	  	console.log(11)
	  	await this.request({
	  		url: '/xlzb/getUserBudget',
	  		method: 'POST',
	  		data: {
	  			"user_id": uni.getStorageSync('userId'),
	  			"date": this.date
	  		}
	  	}).then(res => {
	  		if (res.code === "200") {
	  			console.log(res.data)
	  			this.budgetId = res.data.budgetId
	  			console.log("-----", res.data.budgetId)
	  			this.monthbudget = res.data.budgetCount
	  			// this.getmonthbudget(this.monthbudget )
	  			this.monthout = res.data.expenses
	  			// this.getmonthout(this.monthout)
	  			console.log("next")
	  			// this.getpercent()
	  			// 获取进度条比例
	  			this.processval = res.data.process.slice(0, -1)
	  			console.log(this.processval)
	  			this.processvalue()
	  		}
	  	}).catch(err => {
	  		console.log(err)
	  	})
	  },
    },
	onBackPress(){
		
		console.log(111)
		// 获取日期
		this.getdate()
		// 获取进度条所需传的时间
		this.get_date()
		// 获取用户的某个月的收入和支出
		this.getUserQuickStat()
		// 获取用户今日数据
		this.gettodaydata()
		// 获取进度条相关信息
		this.getuserbid()
	},
  }
</script>

<style scoped>
  .main {
    background-color: rgba(247, 248, 249, 1);
  }

  .ad {
    height: 210rpx;
  }

  .picture {
    width: 690rpx;
    position: absolute;
    height: 210rpx;
    border-radius: 25rpx;
    top: 50rpx;
    left: 30rpx;
  }

  .select-bar {
    height: 99rpx;
    margin-top: 70rpx;
  }

  .select {
    padding: 20rpx 65rpx;
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
    align-items: center;
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

  .text {
    font-size: 34rpx;
    font-family: "Alibaba_Extra_bold";
    margin-left: 20rpx;

  }

  .text-date {
    font-size: 34rpx;
    font-family: "Alibaba_Extra_bold";
    margin-left: 20rpx;
    margin-right: 20rpx;
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

  .tips input {
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
  .chose2 {
    width: 650rpx;
    height: 550rpx;
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
  goodsitem {
    margin-left: 20rpx;
  }
</style>
