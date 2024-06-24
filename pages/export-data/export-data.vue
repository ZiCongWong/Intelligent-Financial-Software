<template>
	<view class="main">
		<view class="box-top">
			<view class="setting" @tap="setData">
				<p class="text">类型数据</p>
				<view class="right">
					<p class="type">{{type}}</p>
					<image src="../../static/setting/image.png.png" mode=""></image>
				</view>

			</view>
			<view class="setting" @tap="open2">
				<p class="text">期限</p>
				<view class="right">
					<p class="type">{{time}}</p>
					<image src="../../static/setting/image.png.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="tips">
			<p>发送导出excel至邮箱</p>
		</view>
		<view class="little-box">
			<view class="left">
				<image src="../../static/emails.png" mode=""></image>
				<p class="emails">{{email}}</p>
			</view>
			<view class="right" @click="open">
				<p class="type">修改</p>
				<image src="../../static/setting/image.png.png" mode=""></image>
			</view>
		</view>
		<view class="button-box" @click="send">
			发送
		</view>
		<view class="model-box" :style="{'top':top+'rpx'}">

		</view>

		<view class="set-budget" :style="{'bottom':bottom2+'rpx'}">
			<view class="model-head">
				<p>类型数据</p>
				<image src="../../static/close.png" mode="" @click="close2"></image>
			</view>
			<p class="title">收支类型</p>
			<view class="top-click">
				<view :class="Inv == 0?'items move' : 'items'" @click="changeout">
					支出
				</view>
				<view :class="Inv == 1?'items move' : 'items'" @click="changein">
					收入
				</view>
        <view :class="Inv == 2?'items move' : 'items'" @click="changeall">
        	全部
        </view>
			</view>
			
			<p class="title">消费类型</p>
			<view class="in" v-show="Inv==0">
				<view class="item-box" v-for="(item,index) in outList" :key="item.id" @click="change(index)">
				  <choseitem :text="item.text" :chose="item.chose"></choseitem>
				</view>
        <view class="sure" @click="done">
        	确定
        </view>
			</view>
			<view class="out" v-show="Inv==1">
				<view class="item-box" v-for="(item,index) in inList" :key="item.id" @click="change2(index)">
				  <choseitem :text="item.text" :chose="item.chose"></choseitem>
				</view>
        <view class="sure" @click="done2">
        	确定
        </view>
			</view>
      <view class="out" v-show="Inv==2">
        <view class="sure" @click="done3">
        	确定
        </view>
      </view>
		</view>
    <uni-popup ref="popup" type="bottom" class='popup' background-color="" :mask-click="true">
    	<view class="pop">
    		<view class="text-pop">
    			<p class="popup-title">修改邮箱</p>
    			<view class="border-input">
    				<uni-easyinput class="uni-mt-5" trim="all" placeholder='请输入邮箱' type="text" maxlength="20"
    				:inputBorder='false' v-model="email"></uni-easyinput>
    			</view>		
    		</view>
    		<view class="bt-box">
    			<view @click="close()" class="bt">取消</view>
    			<view class="separated"></view>
    			<view class="bt-green" @click="modifyemail">确定</view>
    		</view>
    	</view>
    </uni-popup>
    
    <uni-popup ref="popup2" type="bottom" class='popup' background-color="" :mask-click="true">
    	<view class="pop">
    		<view class="text-pop">
    			<p class="popup-title">选择时间</p>
    			<view class="twotimer">
    			  <uni-datetime-picker type="date" :clear-icon="false" v-model="single1" @maskClick="maskClick" />
            <view>—</view>
    			  <uni-datetime-picker type="date" :clear-icon="false" v-model="single2" @maskClick="maskClick" />
    			</view>
        </view>
    		<view class="bt-box">
    			<view @click="close22()" class="bt">取消</view>
    			<view class="separated"></view>
    			<view class="bt-green" @click="timedone">确定</view>
    		</view>
    	</view>
    </uni-popup>
	</view>
</template>

<script>
	import choseitem from '../../components/choseitem/choseitem.vue'
	export default {
		data() {
			return {
				Inv: 0,
				isActive: true,
				type: '',
        flag: false,
        chose:0,
        time:'',
        // 俩个时间
        single1:'',
        single2:'',
				email: uni.getStorageSync('useremail'),
        putemail:'',
				bottom2: -800,
				top: 2000,
				name: "",
        typelist:[],
        outchecklist:["餐饮"],
        inchecklist:["收入"],
        is_income:null,
				outList:[
          {
            id:'001',
            text:'餐饮',
            chose:1
          },
          {
            id:'002',
            text:'出行',
            chose:0
          },
          {
            id:'003',
            text:'娱乐',
            chose:0
          },
          {
            id:'004',
            text:'其它',
            chose:0
          },
          {
            id:'005',
            text:'学习',
            chose:0
          },
        ],
        inList:[
          {
            id:'001',
            text:'收入',
            chose:1
          }
        ],
			}
		},
    components: {
      choseitem
    },
    onLoad() {
      var useremail = uni.getStorageSync('useremail')
      console.log("用户邮箱",useremail)
      this.putemail = useremail
      this.email = useremail
    },
		methods: {
      // 切换到消费
      changeout() {
        this.Inv = 0
      },
      open() {
      	this.$refs.popup.open('center');
      },
      open2() {
      	this.$refs.popup2.open('center');
      },
      timedone() {
        this.$refs.popup2.close();
        this.time = this.single1 + '-' + this.single2
      },
      close() {
      	this.$refs.popup.close();
      },
      close22() {
      	this.$refs.popup2.close();
      },
      // 修改邮箱
      modifyemail() {
        this.$refs.popup.close();
        this.putemail = this.email
      },
        // // 获取用户信息
        // async modifyemail() {
        //   this.$refs.popup.close();
        //   await this.request({
        //     url: '/xlzb/updateUser',
        //     method: 'POST',
        //     data: {
        //       "user_id":uni.getStorageSync('userId'),
        //       "mail":this.email
        //     }
        //   }).then(res => {
        //     if (res.code === "200") {
        //       uni.setStorageSync('useremail',this.email)
        //     }
        //   }).catch(err => {
        //     console.log(err)
        //   })
        // },
      // 切换到收入
      changein() {
        this.Inv = 1
      }, 
      changeall() {
        this.Inv = 2
      },
      done() {
        this.top = 2000
        this.bottom2 = -800
        this.type = this.outchecklist.toString()
        this.typelist = this.outchecklist
        this.is_income = false
        // console.log("最后的消费数组",this.outchecklist)
      },
      // 发送
      async send() {
        if(this.typelist == '') {
          uni.showModal({
            content:'请选择要导出的数据类型'
          })
        }
        else if(this.single1 == '') {
          uni.showModal({
            content:'先选择起始时间'
          })
        }
        else if(this.single2 == '') {
          uni.showModal({
            content:'先选择结束时间'
          })
        }
        else if(this.email == '') {
          uni.showModal({
            content:'先绑定邮箱'
          })
        }else {
          uni.showLoading({
            mask:true,
            title:'导出中...'
          })
          console.log("时间1",this.single1)
          console.log("时间2",this.single2)
          console.log("types",this.typelist)
          await this.request({
            url: '/xlzb/exportDataAsExcel',
            method: 'POST',
            data: {
              "user_id":uni.getStorageSync('userId'),
              "start_time":this.single1 + ' 00:00:00',
              "end_time":this.single2 + ' 00:00:00',
              "is_income":this.is_income,
              "types":this.typelist,
              "mail":this.putemail
            }
          }).then(res => {
            if (res.code === "200") {
              uni.hideLoading()
              uni.showToast({
              	title: '导出成功',
              	duration: 2000
              });
              // uni.setStorageSync('useremail',this.email)
            }
            if(res.code === "100") {
              uni.hideLoading()
              uni.showToast({
              	title: '导出失败',
                icon:error,
              	duration: 2000
              });
              
            }
          }).catch(err => {
            
          })
        }
      },
      // 确定选择收入类型
      done2() {
        this.top = 2000
        this.bottom2 = -800
        this.type = '收入'
        this.typelist =[]
        this.is_income = true
        // console.log("最后的消费数组",this.outchecklist)
      },
      done3() {
        this.top = 2000
        this.bottom2 = -800
        this.type = '全部'
        this.typelist =[]
        this.is_income = null
      },
      change(index) {
        this.outchecklist = []
        this.outList[index].chose = !this.outList[index].chose
        for(var i=0;i<this.outList.length;i++) {
          if(this.outList[i].chose == 1) {
            this.outchecklist.push(this.outList[i].text)
          }
        }
        console.log("消费最后的数组",this.outchecklist)
      },
      change2(index) {
        this.inchecklist = []
        this.inList[index].chose = !this.inList[index].chose
        for(var i=0;i<this.inList.length;i++) {
          if(this.inList[i].chose == 1) {
            this.inchecklist.push(this.inList[i].text)
          }
        }
        console.log("收入最后的数组",this.inchecklist)
      },
			setData() {
				this.bottom2 = 0
				this.top = 0
			},
			close2() {
				this.top = 2000
				this.bottom2 = -800
			},
			updateSurveyData(question, index) {
				this.checkList[index] = question;
				console.log(this.checkList.filter((x) => x != ""));
				console.log(this.checkList.filter((x) => x != "").join());
			},
		}
	}
</script>

<style>
	.main {
		width: 750rpx;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;

	}

	.box-top {
		width: 690rpx;
		height: 216rpx;

		background-color: rgba(255, 255, 255, 1);
		border-radius: 20rpx;
		margin-top: 30rpx;

	}

	.tips {
		width: 690rpx;
		display: flex;
		justify-content: flex-start;
		margin-top: 40rpx;
	}

	.tips p {
		font-size: 32rpx;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);

	}

	.little-box {
		width: 630rpx;
		height: 50rpx;
		border-radius: 20rpx;
		background: rgba(255, 255, 255, 1);
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
		padding: 32rpx 30rpx;
	}

	.left image {
		width: 36rpx;
		height: 36rpx;
		margin-right: 20rpx;
	}

	.left {
		display: flex;
		align-items: center;
	}

	.right {
		display: flex;
		font-size: 28rpx;
		color: rgba(153, 153, 153, 1);
		align-items: center;
	}

	.box {
		width: 690rpx;
		height: 216rpx;
		margin: 50rpx 30rpx;
		background-color: rgba(255, 255, 255, 1);
		border-radius: 20rpx;

	}

	.setting {
		display: flex;
		justify-content: space-between;
		padding: 32rpx 30rpx;
	}

	image {
		width: 44rpx;
		height: 44rpx;
		margin-left: 10rpx;
	}

	.text {
		color: rgba(21, 21, 21, 1.0);
	}

	.button-box {
		width: 690rpx;
		height: 112rpx;
		opacity: 1;
		border-radius: 20rpx;
		background: rgba(255, 255, 255, 1);
		font-size: 32rpx;
		font-weight: 400;
		text-align: center;
		line-height: 112rpx;
		color: rgba(59, 206, 177, 1);
		margin-top: 80rpx;
	}

	.set-budget {
		background-color: #fff;
		height: 744rpx;
		position: fixed;
		transition: all 0.6s;
		z-index: 100;
		width: 650rpx;
		bottom: 0;
		padding: 30rpx 50rpx;
		border-radius: 40rpx 40rpx 0 0;
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
		margin-left: 260rpx;
		font-size: 36rpx;
	}

	.input-budget {
		margin-top: 100rpx;
		height: 60rpx;
		margin-bottom: 80rpx;
		border-bottom: 2rpx solid rgba(166, 166, 166, 1);
	}

	.input-budget input {
		padding-left: 10rpx;
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


	.title {
		font-size: 32rpx;
	}

	.top-click {
		display: flex;
    margin: 20rpx 0;
	}

	.shouru1,
	.zhichu1 {
		width: 170rpx;
		height: 65rpx;
		line-height: 65rpx;
		text-align: center;
    margin-right: 40rpx;
		color: rgba(255, 255, 255, 1);
		border-radius: 70rpx;
		background: rgba(59, 206, 177, 1);
		font-size: 28rpx;
	}

	.shouru2,
	.zhichu2 {
		width: 170rpx;
		height: 65rpx;
		border-radius: 70rpx;
    margin-right: 40rpx;
		background: rgba(204, 204, 204, 0.2);
		line-height: 65rpx;
		text-align: center;
		font-size: 28rpx;
	}
  .in { 
    display: flex;
    flex-wrap: wrap;
  }
	.items {
	    margin: 20rpx 0;
	    width: 170rpx;
	    height: 65rpx;
	    border-radius: 70rpx;
	    margin-right: 40rpx;
	    background: rgba(204, 204, 204, 0.2);
	    line-height: 65rpx;
	    text-align: center;
	    font-size: 28rpx;
	  }
	  .move {
	    color: rgba(255, 255, 255, 1);
	    background: rgba(59, 206, 177, 1);
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
  .twotimer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
