export default{
  // 开启命名空间
  namespaced:true,
  
  state:() => ({
    // 当前月预算
    monthbudget:'',
    // 当前月支出
    monthout:'',
    // 当前月收入
    monthincome:'',
    monthbalance:''
  }),
  // 模块的 mutations 方法
  mutations: {
    // updatename(state,name) {
    //   // 更新数据仓里的用户名字
    //   state.name = name
    //   // 保存用户名
    //   this.commit('userdata/savename')
    // },
    // savename(state) {
    //   console.log('被调用了保存name')
    //   uni.setStorageSync('phone',state.name)
    // }
    // 获取当前月的预算
    getmonthbudget(state,monthbudget) {
      state.monthbudget = monthbudget
    },
    // 获取当前月的支出
    getmonthout(state,monthout) {
      state.monthout = monthout
    },
    // 获取当月的收入
    getmonthincome(state,monthincome) {
      state.monthincome = monthincome
    },
    // 获取当月结余
    getmonnthbalance(state,monthbalance) {
      state.monthbalance = monthbalance
    }
  },
  
    // 模块的 getters 属性
    getters: {
      // total(state){
      //   // let c = 0
      //   // state.cart.forEach(goods => c+= goods.goods_count)
      //   // return c
        
      //   return state.cart.reduce((total,item) => total +=item.cartNum,0)
      // },
      // checkedCount(state){
      //   // 先使用 filter 方法，从购物车中过滤器已勾选的商品
      //     // 再使用 reduce 方法，将已勾选的商品总数量进行累加
      //     // reduce() 的返回值就是已勾选的商品的总数量
      //  return state.cart.filter(x => x.status).reduce((total,item) => total +=item.cartNum,0)
      // },
      // checkedGoodsAmount(state){
      //   return state.cart.filter( x => x.status).reduce((total,item) => total +=item.cartNum * item.cartPrice,0)
      // }
    },
}