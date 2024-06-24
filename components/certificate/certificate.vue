<template>
  <view class="number-box">
    <view class="position-box">
      <input type="number" focus="true" class="hide-input" @input="getValue" />
      <block v-for="(item, index) in ranges" :key="index">
        <view :class="['item', 'box',{ active: codeIndex === item}]">
          <view class="line"></view>
          <block v-if="false && codeArr.length >= item">
            <text class="dot">.</text>
          </block>
          <block v-else> {{ codeArr[index] ? codeArr[index] : ''}}</block>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'certificate',
    props:["usercode"],
    // props: {
    //   isPwd: {
    //     type: Boolean,
    //     default: false,
    //   },
    //   code: {
    //     type:Number,
    //     require:true,
    //   }
    // },
    watch: {
      async codeIndex(newValue, oldValue) {
        console.log('w', newValue)
        if (newValue == 7) {
          console.log("输入完了")
          this.yancode()
        }
      }
    },
    data() {
      return {
        codeIndex: 1,
        codeArr: [],
        // code:this.usercode,
        ranges: [1, 2, 3, 4, 5, 6]
      }
    },
    methods: {
      async yancode() {
        console.log("qingqiu")
        console.log("code",this.usercode)
        await this.request({
          url:'/xlzb/verifySMS',
          method: 'POST',
          data: {
            "phone":uni.getStorageSync('userphone'),
            "code":this.usercode
          }
        }).then(res => {
          if (res.code === "200") {
            console.log("CODE",this.code)
            if(this.code == res.data) {
              console.log("通过")
            }
            uni.navigateTo({
              url:'/pages/set-password/set-password'
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getValue(e) {
        // console.log("得到",this.code)
        let {
          value
        } = e.detail
        this.codeArr = value
        console.log(this.codeArr)
        let arr = value.split('')
        this.codeIndex = arr.length + 1
        // this.codeArr = arr

        // if (this.codeIndex > Number(6)) {
        //   this.$emit('finish', this.codeArr.join(''))
        // }
      },
    },
    
  }
</script>

<style scoped>
  @keyframes twinkling {
    0% {
      opacity: 1;
    }

    50% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  .number-box {
    text-align: center;
  }

  .position-box {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    position: relative;
  }

  .position-box .hide-input {
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    text-align: left;
    z-index: 9;
    opacity: 1;
  }

  .position-box .item {
    position: relative;
    width: 100rpx;
    height: 100rpx;
    margin-right: 18rpx;
    font-size: 70rpx;
    font-weight: 600;
    color: rgba(34, 37, 44, 1);
    line-height: 100rpx;
  }

  .position-box .item:last-child {
    margin-right: 0;
  }


  .position-box .box {

    border-radius: 12rpx;
    background-color: rgba(60, 207, 177, 0.08);

  }



  .positon-box .active {
    border-color: #00C777;
  }

  .position-box .active .line {
    display: block;
  }

  .position-box .line {
    display: none;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 2rpx;
    height: 40rpx;
    background: #333333;
    animation: twinkling 1.5s infinite ease;
  }

  .position-box .dot {
    font-size: 80rpx;
    line-height: 40rpx;
  }

  .position-box .bottom-line {
    height: 4rpx;
    background: #000000;
    width: 80%;
    position: absolute;
    border-radius: 2rpx;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
