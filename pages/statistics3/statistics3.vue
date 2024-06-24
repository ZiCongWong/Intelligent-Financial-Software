<template>
  <view class="con">
    <colhead></colhead>
    <tabbar3 :state="state"></tabbar3>
    <view class="main">
      <banelOld :color="col" :bgimg="url" :col="cols" :width="width" :value="processval" :selimg="selimg"></banelOld>
      <view class="contaniner">
        <view class="line-chart">
          <view class="head">
            <view class="head-item" :class="move===index?'move':''" v-for="(item,index) in headitem" :key="item.id"
              @click="change(index)">
              <view class="title">{{item.title}}</view>
            </view>
          </view>
          <view class="" v-if="current === 0">
            <view class="choise-time">
              <image src="../../static/left.png" mode="" class="left"></image>
              <view class="timer" @click="chosemonth">
                <view class="timer-head">
                  <p>{{year}}年{{month<10?'0'+month:month}}月</p>
                  <image src="../../static/jiaobiao.png" mode=""></image>
                </view>
              </view>
              <image src="../../static/right.png" mode="" class="right"></image>
            </view>
            <!-- 折线图主题部分 -->
            <view class="line-chart-head">
              <view class="line-chart-head-left">
                <image src="../../static/label1.png" mode=""></image>
                <p>收/支走势</p>
              </view>
            </view>
            <p class="unit">(单位：千元)</p>
            <view class="charts-box">
              <qiun-data-charts type="line" :opts="opts" :chartData="chartData" :ontouch="true" />
            </view>
            <view class="count-info">
              <view class="count-info-item">
                <p class="money">￥{{highestincome}}</p>
                <p>最高收入</p>
              </view>
              <view class="line"></view>
              <view class="count-info-item">
                <p class="money">￥{{minimumincome}}</p>
                <p>最低收入</p>
              </view>
              <view class="line"></view>
              <view class="count-info-item">
                <p class="money">￥{{highestpayout}}</p>
                <p>最高支出</p>
              </view>
              <view class="line"></view>
              <view class="count-info-item">
                <p class="money">￥{{minimumpayout}}</p>
                <p>最低支出</p>
              </view>
            </view>
          </view>
          <view class="" v-if="current === 1">
            <view class="choise-time">
              <image src="../../static/left.png" mode="" class="left"></image>
              <view class="timer" @click="choseyear">
                <view class="timer-head">
                  <p>{{year3}}年</p>
                  <image src="../../static/jiaobiao.png" mode=""></image>
                </view>
              </view>
              <image src="../../static/right.png" mode="" class="right"></image>
            </view>
            <!-- 折线图主题部分 -->
            <view class="line-chart-head">
              <view class="line-chart-head-left">
                <image src="../../static/label1.png" mode=""></image>
                <p>收/支走势</p>
              </view>
            </view>
            <p class="unit">(单位：千元)</p>
            <view class="charts-box">
              <qiun-data-charts type="line" :opts="opts" :chartData="chartData3" :ontouch="true" />
            </view>
            <view class="count-info">
              <view class="count-info-item">
                <p class="money">￥{{highestincome2}}</p>
                <p>最高收入</p>
              </view>
              <view class="line"></view>
              <view class="count-info-item">
                <p class="money">￥{{minimumincome2}}</p>
                <p>最低收入</p>
              </view>
              <view class="line"></view>
              <view class="count-info-item">
                <p class="money">￥{{highestpayout2}}</p>
                <p>最高支出</p>
              </view>
              <view class="line"></view>
              <view class="count-info-item">
                <p class="money">￥{{minimumpayout2}}</p>
                <p>最低支出</p>
              </view>
            </view>
          </view>

        </view>
        <view class="pie-chart">
          <view class="head2">
            <view class="head-item2" :class="move2===index?'move2':''" v-for="(item,index) in headitem" :key="item.id"
              @click="change2(index)">{{item.title}}</view>
          </view>
          <view class="" v-if="current2=== 0">
            <view class="choise-time">
              <image src="../../static/left.png" mode="" class="left"></image>
              <view class="timer" @click="chosemonth2">
                <view class="timer-head">
                  <p>{{year2}}年{{month2<10?'0'+month2:month2}}月</p>
                  <image src="../../static/jiaobiao.png" mode=""></image>
                </view>
                <!-- <view class="time">
                  01/01-01/31
                </view> -->
              </view>
              <image src="../../static/right.png" mode="" class="right"></image>
            </view>
            <!-- 饼状图主体部分 -->
            <view class="pie-chart-head">
              <view class="pie-chart-head-left">
                <image src="../../static/label1.png" mode=""></image>
                <p>消费占比</p>
                <image src="../../static/select.png" mode="" class="choise-img"></image>
              </view>
              <view class="pie-chart-head-right">
                (单位：%)
              </view>
            </view>
            <view class="pie">
              <view class="charts-box">
                <qiun-data-charts type="pie" :opts="opts2" :chartData="chartData2" />
              </view>
            </view>
            <view class="process-itemss" v-for="(item,index) in processitemslist" :key="item.id">
              <itemsprocess :col="itemcol" :width="itemwidth" :value="item.precent" :url="item.url" :text="item.text"
                :count="item.count"></itemsprocess>
            </view>
          </view>
          <view class="" v-if="current2=== 1">
            <view class="choise-time">
              <image src="../../static/left.png" mode="" class="left"></image>
              <view class="timer" @click="choseyear2">
                <view class="timer-head">
                  <p>{{year4}}年</p>
                  <image src="../../static/jiaobiao.png" mode=""></image>
                </view>
              </view>
              <image src="../../static/right.png" mode="" class="right"></image>
            </view>
            <!-- 饼状图主体部分 -->
            <view class="pie-chart-head">
              <view class="pie-chart-head-left">
                <image src="../../static/label1.png" mode=""></image>
                <p>消费占比</p>
                <!-- <image src="../../static/select.png" mode="" class="choise-img"></image> -->
              </view>
              <view class="pie-chart-head-right">
                (单位：%)
              </view>
            </view>
            <view class="pie">
              <view class="charts-box">
                <qiun-data-charts type="pie" :opts="opts2" :chartData="chartData4" />
              </view>
            </view>
            <view class="process-itemss" v-for="(item,index) in processitemslist2" :key="item.id">
              <itemsprocess :col="itemcol" :width="itemwidth" :value="item.precent" :url="item.url" :text="item.text"
                :count="item.count"></itemsprocess>
            </view>
          </view>

        </view>
      </view>
    </view>
    <!-- 浅灰色背景遮罩 -->
    <view class="model-box" :style="{'top':top+'rpx'}">

    </view>
    <!-- 选择弹出框 -->
    <!-- 折线图月份选择器 -->
    <view class="chose" :style="{'bottom':bottom+'rpx'}">
      <view class="model-head">
        <p>选择日期</p>
        <image src="../../static/close.png" mode="" @click="close"></image>
      </view>
      <p class="head-time">{{year}}/{{month<10?'0'+month:month}}</p>
      <view class="this-month">
        <p>本月</p>
      </view>
      <view class="time">
        <picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChange" class="picker-view">
          <picker-view-column>
            <view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
          </picker-view-column>
          <picker-view-column>
            <view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
          </picker-view-column>
        </picker-view>
      </view>
      <view class="sure" @click="sure">
        确定
      </view>
    </view>
    <!-- 折线图年份选择器 -->
    <view class="chose" :style="{'bottom':bottom3+'rpx'}">
      <view class="model-head">
        <p>选择日期</p>
        <image src="../../static/close.png" mode="" @click="close3"></image>
      </view>
      <p class="head-time">{{year3}}</p>
      <view class="this-month">
        <p>本年</p>
      </view>
      <view class="time">
        <picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChange3" class="picker-view">
          <picker-view-column>
            <view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
          </picker-view-column>
        </picker-view>
      </view>
      <view class="sure" @click="sure3">
        确定
      </view>
    </view>
    <!-- 饼状图月份选择器 -->
    <view class="chose" :style="{'bottom':bottom2+'rpx'}">
      <view class="model-head">
        <p>选择日期</p>
        <image src="../../static/close.png" mode="" @click="close2"></image>
      </view>
      <p class="head-time">{{year2}}/{{month2<10?'0'+month2:month2}}</p>
      <view class="this-month">
        <p>本月</p>
      </view>
      <view class="time">
        <picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChange2" class="picker-view">
          <picker-view-column>
            <view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
          </picker-view-column>
          <picker-view-column>
            <view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
          </picker-view-column>
        </picker-view>
      </view>
      <view class="sure" @click="sure2">
        确定
      </view>
    </view>
    <!-- 饼状图年份选择器 -->
    <view class="chose" :style="{'bottom':bottom4+'rpx'}">
      <view class="model-head">
        <p>选择日期</p>
        <image src="../../static/close.png" mode="" @click="close4"></image>
      </view>
      <p class="head-time">{{year4}}</p>
      <view class="this-month">
        <p>本年</p>
      </view>
      <view class="time">
        <picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChange4" class="picker-view">
          <picker-view-column>
            <view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
          </picker-view-column>
        </picker-view>
      </view>
      <view class="sure" @click="sure4">
        确定
      </view>
    </view>
  </view>
</template>

<script>
  import banelOld from '../../components/banelOld/banelOld.vue'
  import colhead from '../../components/colhead/colhead.vue'
  import tabbar3 from '../../components/tabbar3/tabbar3.vue'
  import itemsprocess from '../../components/itemsprocess/itemsprocess.vue'
  export default {
    data() {
      const date = new Date()
      const years = []
      const year = date.getFullYear()
      const typeyear = date.getFullYear()
      const typeyear2 = date.getFullYear()
      const year2 = date.getFullYear()
      const year3 = date.getFullYear()
      const year4 = date.getFullYear()
      const months = []
      const month = date.getMonth() + 1
      var typemonth = date.getMonth() + 1
      typemonth = typemonth < 10 ? '0' + typemonth : typemonth
      const typemonth2 = date.getMonth() + 1
      const month2 = date.getMonth() + 1
      const days = []
      const day = date.getDate()
      for (let i = 2000; i <= date.getFullYear(); i++) {
        years.push(i)
      }
      for (let i = 1; i <= 12; i++) {
        months.push(i)
      }
      for (let i = 1; i <= 31; i++) {
        days.push(i)
      }
      return {
        years,
        year,
        year2,
        year3,
        year4,
        months,
        month,
        month2,
        days,
        day,
        top: 2000,
        bottom: -750,
        bottom2: -750,
        bottom3: -750,
        bottom4: -750,
        value: [9999, month - 1, day - 1],
        indicatorStyle: `height: 50rpx;line-height: 50rpx;`,
        state: '4',
        col: '#fff',
        current: 0,
        date: '',
        move: 0,
        // 0为月,1为年选择器
        type: 0,
        type2: 0,
        selimg: '../../static/sectle2.png',
        url: '../../static/bg2.png',
        current2: 0,
        move2: 0,
        chartData: {},
        chartData2: {},
        chartData3: {},
        chartData4: {},
        cols: '#FAD56B',
        itemcol: '#3BCEB1',
        itemprecent: 10,
        itemwidth: 100,
        width: 100,
        processval: 10,
        typemonth,
        typeyear,
        typemonth2,
        typeyear2,
        highestincome: 0,
        minimumincome: 0,
        highestpayout: 0,
        minimumpayout: 0,
        highestincome2: 0,
        minimumincome2: 0,
        highestpayout2: 0,
        minimumpayout2: 0,
        // 折线图选择的时间
        linechoiseyear: '',
        linechoisemonth: '',
        // 饼状图选择的时间
        pinechoiseyear: '',
        pinechoisemonth: '',

        processitemslist: [{
            id: '001',
            text: '餐饮消费',
            url: '../../static/eat.png',
            precent: 0,
            count: 0
          },
          {
            id: '002',
            text: '出行消费',
            url: '../../static/car.png',
            precent: 0,
            count: 0
          },
          {
            id: '003',
            text: '娱乐消费',
            url: '../../static/play.png',
            precent: 0,
            count: 0
          },
          {
            id: '004',
            text: '学习消费',
            url: '../../static/book.png',
            precent: 0,
            count: 0
          },
          {
            id: '005',
            text: '其它消费',
            url: '../../static/other.png',
            precent: 0,
            count: 0
          },
        ],
        processitemslist2: [{
            id: '001',
            text: '餐饮消费',
            url: '../../static/eat.png',
            precent: 0,
            count: 0
          },
          {
            id: '002',
            text: '出行消费',
            url: '../../static/car.png',
            precent: 0,
            count: 0
          },
          {
            id: '003',
            text: '娱乐消费',
            url: '../../static/play.png',
            precent: 0,
            count: 0
          },
          {
            id: '004',
            text: '学习消费',
            url: '../../static/book.png',
            precent: 0,
            count: 0
          },
          {
            id: '005',
            text: '其它消费',
            url: '../../static/other.png',
            precent: 0,
            count: 0
          },
        ],
        opts2: {
          color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
          padding: [5, 5, 5, 5],
          enableScroll: false,
          extra: {
            pie: {
              activeOpacity: 0.5,
              activeRadius: 10,
              offsetAngle: 0,
              labelWidth: 15,
              border: false,
              borderWidth: 3,
              borderColor: "#FFFFFF"
            }
          }
        },
        opts: {
          color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
          padding: [15, 10, 0, 15],
          enableScroll: true,
          legend: {},
          xAxis: {
            disableGrid: true,
            scrollShow: true,
            itemCount: 4
          },
          yAxis: {
            gridType: "dash",
            dashLength: 2
          },
          extra: {
            line: {
              type: "straight",
              width: 2,
              activeType: "hollow"
            }
          }
        },
        headitem: [{
            id: '001',
            title: '月'
          },
          {
            id: '002',
            title: '年'
          }
        ],
      }
    },
    components: {
      tabbar3,
      colhead,
      banelOld,
      itemsprocess
    },
    beforeCreate() {
      uni.hideTabBar()
    },
    onShow() {
      this.get_date()
      this.getuserbid()

      this.getServerlinemonthData();
      this.getServerlineyearData()

      this.getServerpinemonthData()
      this.getServerpineyearData()

      this.processvalue()
    },
    methods: {
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
      // 根据进度条的百分比计算进度条的宽度
      processvalue() {
        var w = 600 * this.processval / 100
        this.width = w
        console.log(w)
      },
      get_date() {
        // let date = new Date()
        // var year = date.getFullYear()
        // var month = date.getMonth() + 1
        // month = month<10?'0'+month : month
        // var d = date.getDate()
        // d = d<10?'0'+d : d
        this.date = this.year + '-' + this.month + '-' + '01'
        console.log(this.date)
      },
      // 获取折线图月数据
      async getServerlinemonthData() {
        console.log(this.year)
        console.log(this.month)
        await this.request({
          url: '/xlzb/getUserStatistics',
          method: 'POST',
          data: {
            "user_id": uni.getStorageSync('userId'),
            "date": this.year + '-' + this.month + '-' + '01',
            "type": 0
          }
        }).then(resdata => {
          if (resdata.code === "200") {
            console.log("折线图月选择数据", resdata)
            console.log(resdata.data.dates)
            if (resdata.data.expenses.length == 0) {
              this.highestpayout = 0
              this.minimumpayout = 0
              this.highestincome = 0
              this.minimumincome = 0
            } else {
              let maxout = resdata.data.expenses[0]
              let minout = resdata.data.expenses[0]
              let maxin = resdata.data.incomes[0]
              let minin = resdata.data.incomes[0]
              for (var i = 0; i < resdata.data.expenses.length; i++) {
                // 最高最低支出判断
                if (resdata.data.expenses[i] > maxout) {
                  maxout = resdata.data.expenses[i]
                  // 最高支出
                  this.highestpayout = maxout
                }
                if (resdata.data.expenses[i] < minout) {
                  minout = resdata.data.expenses[i]
                  // 最低支出
                  this.minimumpayout = minout
                }
                // 最高最低收入判断

                if (resdata.data.incomes[i] > maxin) {
                  maxin = resdata.data.incomes[i]
                  // 最高支出
                  this.highestincome = maxin
                }
                if (resdata.data.incomes[i] < minin) {
                  minin = resdata.data.incomes[i]
                  // 最低支出
                  this.minimumincome = minin
                }
              }
              console.log("000", this.highestpayout)
              console.log("000", this.minimumpayout)
              console.log("000", this.highestincome)
              console.log("000", this.minimumincome)
            }
            //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
            let res = {
              // 横坐标
              categories: resdata.data.dates,
              // 多少条线这里三个series，三条线
              series: [{
                  name: "收入",
                  // 各横坐标对应纵坐标的值
                  data: resdata.data.incomes
                },
                {
                  name: "支出",
                  data: resdata.data.expenses
                },
              ]
            };
            this.chartData = JSON.parse(JSON.stringify(res));
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 获取折线图年数据
      async getServerlineyearData() {
        console.log("year3" + this.year3 + '-01-01')
        await this.request({
          url: '/xlzb/getUserStatistics',
          method: 'POST',
          data: {
            "user_id": uni.getStorageSync('userId'),
            "date": this.year3 + '-01-01',
            "type": 1
          }
        }).then(resdata => {
          if (resdata.code === "200") {
            console.log("折线图年选择数据", resdata)
            console.log(resdata.data.dates)
            if (resdata.data.expenses.length == 0) {
              this.highestpayout2 = 0
              this.minimumpayout2 = 0
              this.highestincome2 = 0
              this.minimumincome2 = 0
            } else {
              let maxout = resdata.data.expenses[0]
              let minout = resdata.data.expenses[0]
              let maxin = resdata.data.incomes[0]
              let minin = resdata.data.incomes[0]
              for (var i = 0; i < resdata.data.expenses.length; i++) {
                // 最高最低支出判断
                if (resdata.data.expenses[i] > maxout) {
                  maxout = resdata.data.expenses[i]
                  // 最高支出
                  this.highestpayout2 = maxout
                }
                if (resdata.data.expenses[i] < minout) {
                  minout = resdata.data.expenses[i]
                  // 最低支出
                  this.minimumpayout2 = minout
                }
                // 最高最低收入判断

                if (resdata.data.incomes[i] > maxin) {
                  maxin = resdata.data.incomes[i]
                  // 最高支出
                  this.highestincome2 = maxin
                }
                if (resdata.data.incomes[i] < minin) {
                  minin = resdata.data.incomes[i]
                  // 最低支出
                  this.minimumincome2 = minin
                }
              }
              console.log("000", this.highestpayout)
              console.log("000", this.minimumpayout)
              console.log("000", this.highestincome)
              console.log("000", this.minimumincome)
            }
            //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
            let res = {
              // 横坐标
              categories: resdata.data.dates,
              // 多少条线这里三个series，三条线
              series: [{
                  name: "收入",
                  // 各横坐标对应纵坐标的值
                  data: resdata.data.incomes
                },
                {
                  name: "支出",
                  data: resdata.data.expenses
                },
              ]
            };
            this.chartData3 = JSON.parse(JSON.stringify(res));
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 获取饼状图月数据
      async getServerpinemonthData() {
        console.log("++++", this.typeyear2)
        console.log("++++", this.typemonth2)
        await this.request({
          url: '/xlzb/getUserExpensesPercent',
          method: 'POST',
          data: {
            "user_id": uni.getStorageSync('userId'),
            "date": this.year2 + '-' + this.month2 + '-' + '01',
            "type": 0
          }
        }).then(resdata => {
          if (resdata.code === "200") {
            console.log("饼状图月数据")
            console.log(resdata.data)
            console.log(resdata.data[0].sum)
            this.processitemslist[0].precent = resdata.data[0].percent
            this.processitemslist[0].count = resdata.data[0].sum
            this.processitemslist[1].precent = resdata.data[1].percent
            this.processitemslist[1].count = resdata.data[1].sum
            this.processitemslist[2].precent = resdata.data[2].percent
            this.processitemslist[2].count = resdata.data[2].sum
            this.processitemslist[3].precent = resdata.data[3].percent
            this.processitemslist[3].count = resdata.data[3].sum
            this.processitemslist[4].precent = resdata.data[4].percent
            this.processitemslist[4].count = resdata.data[4].sum
            //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
            let res = {
              series: [{
                data: [{
                  "name": "餐饮",
                  "value": resdata.data[0].percent
                }, {
                  "name": "出行",
                  "value": resdata.data[1].percent
                }, {
                  "name": "娱乐",
                  "value": resdata.data[2].percent
                }, {
                  "name": "学习",
                  "value": resdata.data[3].percent
                }, {
                  "name": "其它",
                  "value": resdata.data[4].percent
                }]
              }]
            };
            this.chartData2 = JSON.parse(JSON.stringify(res));
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 获取饼状图月数据
      async getServerpineyearData() {
        console.log("++++", this.year4)
        await this.request({
          url: '/xlzb/getUserExpensesPercent',
          method: 'POST',
          data: {
            "user_id": uni.getStorageSync('userId'),
            "date": this.year4 + '-01-01',
            "type": 1
          }
        }).then(resdata => {
          if (resdata.code === "200") {
            console.log("饼状图年数据")
            console.log(resdata.data)
            console.log(resdata.data[0].sum)
            this.processitemslist2[0].precent = resdata.data[0].percent
            this.processitemslist2[0].count = resdata.data[0].sum
            this.processitemslist2[1].precent = resdata.data[1].percent
            this.processitemslist2[1].count = resdata.data[1].sum
            this.processitemslist2[2].precent = resdata.data[2].percent
            this.processitemslist2[2].count = resdata.data[2].sum
            this.processitemslist2[3].precent = resdata.data[3].percent
            this.processitemslist2[3].count = resdata.data[3].sum
            this.processitemslist2[4].precent = resdata.data[4].percent
            this.processitemslist2[4].count = resdata.data[4].sum
            //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
            let res = {
              series: [{
                data: [{
                  "name": "餐饮",
                  "value": resdata.data[0].percent
                }, {
                  "name": "出行",
                  "value": resdata.data[1].percent
                }, {
                  "name": "娱乐",
                  "value": resdata.data[2].percent
                }, {
                  "name": "学习",
                  "value": resdata.data[3].percent
                }, {
                  "name": "其它",
                  "value": resdata.data[4].percent
                }]
              }]
            };
            this.chartData4 = JSON.parse(JSON.stringify(res));
          }
        }).catch(err => {
          console.log(err)
        })
      },


      chosemonth() {
        this.top = 0
        this.bottom = 0
      },
      chosemonth2() {
        this.top = 0
        this.bottom2 = 0
      },
      choseyear() {
        this.top = 0
        this.bottom3 = 0
      },
      choseyear2() {
        this.top = 0
        this.bottom4 = 0
      },
      close() {
        this.top = 2000
        this.bottom = -750
      },
      close2() {
        this.top = 2000
        this.bottom2 = -750
      },
      close3() {
        this.top = 2000
        this.bottom3 = -750
      },
      close4() {
        this.top = 2000
        this.bottom4 = -750
      },
      // 确定月选择查询线图
      sure() {
        this.top = 2000
        this.bottom = -750
        this.getServerlinemonthData()
      },
      // 确定月选择查询饼图
      sure2() {
        this.top = 2000
        this.bottom2 = -750
        this.getServerpinemonthData()
      },
      // 确定年选择查询线图
      sure3() {
        console.log(this.year3)
        this.top = 2000
        this.bottom3 = -750
        this.getServerlineyearData()
      },
      // 确定年选择查询饼图
      sure4() {
        this.top = 2000
        this.bottom4 = -750
        this.getServerpineyearData()
      },
      // 折线月选择
      bindChange: function(e) {
        const val = e.detail.value
        this.year = this.years[val[0]]
        this.month = this.months[val[1]]
      },
      // 饼状月选择
      bindChange2: function(e) {
        const val = e.detail.value
        this.year2 = this.years[val[0]]
        this.month2 = this.months[val[1]]
      },
      // 折线年选择
      bindChange3: function(e) {
        const val = e.detail.value
        this.year3 = this.years[val[0]]
      },
      // 饼状年选择
      bindChange4: function(e) {
        const val = e.detail.value
        this.year4 = this.years[val[0]]
      },
      change(index) {
        this.move = index,
          this.current = index
        // 0为月1为年
        // if (index == 0) {
        //   this.type = 0
        //   this.typeyear = this.year
        //   this.typemonth = this.month
        //   console.log(this.type)
        // }
        // if (index == 1) {
        //   this.type = 1
        //   this.typeyear = this.year2
        //   this.typemonth = '01'
        //   console.log(this.type)
        // }
      },
      change2(index) {
        this.move2 = index,
          this.current2 = index
        // if (index == 0) {
        //   this.type2 = 0
        //   this.typeyear2 = this.year3
        //   this.typemonth2 = this.month2
        //   console.log(this.type2)
        // }
        // if (index == 1) {
        //   this.type2 = 1
        //   this.typeyear2 = this.year4
        //   this.typemonth2 = '01'
        //   console.log(this.type2)
        // }
      },
      yeardown() {
        this.year3 = this.year3 - 1
        if (this.year3 <= 2000) {
          this.year3 = 2000
        }
      },
      yearup() {
        var date = new Date()
        var yy = date.getFullYear()
        this.year3 = this.year3 + 1
        if (this.year3 >= yy) {
          this.year3 = yy
        }
      },
      yeardown2() {
        this.year4 = this.year4 - 1
        if (this.year4 <= 2000) {
          this.year4 = 2000
        }
      },
      yearup2() {
        var date = new Date()
        var yy = date.getFullYear()
        this.year4 = this.year4 + 1
        if (this.year4 >= yy) {
          this.year4 = yy
        }
      },
      monthdown() {
        this.month = this.month - 1
        if (this.month <= 0) {
          this.year--
          this.month = 12
          if (this.year <= 2000) {
            this.year = 2000
          }
        }
      },
      monthup() {
        var date = new Date()
        var month = date.getMonth() + 1
        var year = date.getFullYear()
        this.month = this.month + 1
        if (this.month > 12) {
          this.year++
          this.month = 1
          if (this.year >= year) {
            this.year = year
          }
        }
        if (this.month >= month && this.year >= year) {
          this.month = month
          this.year = year
        }
      },
      monthdown2() {
        this.month2 = this.month2 - 1
        if (this.month2 <= 0) {
          this.year2--
          this.month2 = 12
          if (this.year2 <= 2000) {
            this.year2 = 2000
          }
        }
      },
      monthup2() {
        var date = new Date()
        var month = date.getMonth() + 1
        var year = date.getFullYear()
        this.month2 = this.month2 + 1
        if (this.month2 > 12) {
          this.year2++
          this.month2 = 1
          if (this.year2 >= year) {
            this.year2 = year
          }
        }
        if (this.month2 >= month && this.year2 >= year) {
          this.month2 = month
          this.year2 = year
        }
      }
    }
  }
</script>

<style scoped>
  .contaniner {
    padding-bottom: 150rpx;
  }
  .charts-box {
    width: 650rpx;
    height: 500rpx;
  }

  .main {
    padding: 30rpx;
    height: 800rpx;
    background: linear-gradient(180deg, #d5f0ec, rgba(59, 206, 177, 0.01));
  }

  .choise-time {
    width: 650rpx;
    margin: 40rpx auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .choise-time .left {
    width: 40rpx;
    height: 40rpx;
  }

  .choise-time .right {
    width: 40rpx;
    height: 40rpx;
  }

  .timer {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .timer-head {
    display: flex;
    color: rgba(0, 0, 0, 1);
    align-items: center;
	font-size: 35rpx;
	font-weight: 600;
  }

  .timer-head image {
    width: 16rpx;
    margin-left: 10rpx;
    height: 14rpx;
  }

  .time {
    font-size: 35rpx;
    color: rgba(153, 153, 153, 1);
  }

  .head {
    width: 400rpx;
    border-radius: 10rpx;
    border: 2rpx solid rgba(60, 207, 177, 1);
    margin: 20rpx auto;
    display: flex;
    height: 66rpx;
  }

  .head-item {
    font-weight: 600;
	font-size: 40rpx;
    display: flex;
    text-align: center;
    align-items: center;
    height: 66rpx;
  }

  .title {
    width: 198rpx;
    border-right: 2rpx solid rgba(60, 207, 177, 1);
    text-align: center;
    line-height: 66rpx;
	
  }

  .move {
    color: #fff;
    background-color: rgba(60, 207, 177, 1);
  }

  .line-chart {
    padding-top: 30rpx;
    padding-bottom: 30rpx;
    background-color: #fff;
    margin-top: 20rpx;
    border-radius: 20rpx;
    width: 690rpx;
  }

  .line-chart-head {
    display: flex;
    justify-content: space-between;
    padding: 0 50rpx;
  }

  .line-chart-head-left {
    font-weight: 600;
    display: flex;
	font-size: 43rpx;
  }

  .line-chart-head-left image {
    width: 40rpx;
    height: 40rpx;
    margin-right: 20rpx;
  }

  .unit {
    padding: 25rpx 50rpx;
    color: rgba(153, 153, 153, 1);
    font-size: 35rpx;
    font-weight: 600;
  }

  .count-info {
    width: 610rpx;
    padding: 0 50rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .count-info-item {
    font-size: 35rpx;
	font-weight: 600;
    color: rgba(153, 153, 153, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .money {
    color: rgba(51, 51, 51, 1);
    font-size: 40rpx;
    font-weight: 600;
  }

  .line {
    width: 2rpx;
    height: 26rpx;
    background-color: rgba(204, 204, 204, 1);
  }

  .pie-chart {
    margin-top: 20rpx;
    padding-top: 30rpx;
    background-color: #fff;
    border-radius: 20rpx;
  }

  .head2 {
    width: 500rpx;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
  }

  .head2-item {
    color: rgba(153, 153, 153, 1);
    font-weight: 600;
    padding: 0 5rpx 10rpx 5rpx;
  }

  .move2 {
    font-size: 40rpx;
    color: rgba(51, 51, 51, 1);
    font-weight: 600;
    border-bottom: 6rpx solid rgba(59, 206, 177, 1);
  }

  .pie-chart-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 50rpx;
  }

  .pie-chart-head-left {
    font-weight: 600;
    display: flex;
    align-items: center;
  }

  .pie-chart-head-left image {
    width: 40rpx;
    height: 40rpx;
    margin-right: 20rpx;
  }

  .pie-chart-head-right {
    color: rgba(153, 153, 153, 1);
    font-size: 35rpx;
    font-weight: 600;
  }

  .pie-chart-head .choise-img {
    width: 24rpx;
    height: 22rpx;
    margin-left: 10rpx;
  }

  .pie {
    margin-top: 40rpx;
  }

  .pie-process-item {
    padding: 30rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .left-head image {
    width: 30rpx;
    margin-right: 6rpx;
    height: 30rpx;
  }

  .pro {
    font-weight: 600;
    margin-left: 10rpx;
    color: rgba(153, 153, 153, 1);
  }

  .left-head {
    font-weight: 600;
    display: flex;
    font-size: 35rpx;
    align-items: center;
  }

  .process-box {
    width: 406rpx;
    height: 11rpx;
    margin-top: 10rpx;
    border-radius: 20rpx;
    background-color: rgba(59, 206, 177, 1);
  }

  .pie-process-right {
    font-size: 40rpx;
    font-weight: 600;
    display: flex;
  }

  .pie-process-right image {
    width: 40rpx;
    height: 40rpx;
    margin-left: 8rpx;
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
    font-size: 45rpx;
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
	font-size: 50rpx;
  }

  .time {
    display: flex;
    justify-content: space-around;
  }

  .head-time {
    text-align: center;
    color: rgba(153, 153, 153, 1);
    font-size: 35rpx;
	font-weight: 600;
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
    font-size: 35rpx;
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
	font-weight: 600;
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
