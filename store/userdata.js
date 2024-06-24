export default{
  // 开启命名空间
  namespaced:true,
  
  state:() => ({
    
    username:uni.getStorageSync('username') || '',
    userphone:uni.getStorageSync('userphone') || '',
    userpassword:uni.getStorageSync('userpassword') || '',
    usermode:uni.getStorageSync('usermode') || '',
    userheadAvrUrl:uni.getStorageSync('userheadAvrUrl') || '',
    userId:uni.getStorageSync('userId') || '',
    userdaycount:uni.getStorageSync('userdaycount') || '',
    userbillsCount:uni.getStorageSync('userbillsCount') || ''
  }),
  // 模块的 mutations 方法
  mutations: {
    updatename(state,name) {
      // 更新数据仓里的用户名字
      state.name = name
      // 保存用户名
      this.commit('userdata/savename')
    },
    updatephone(state,phone) {
      // 更新数据仓里的用户名字
      state.phone = phone
      // 保存用户名
      this.commit('userdata/savephone')
    },
    updateuserheadAvrUrl(state,userheadAvrUrl) {
      console.log("调用了更换头像的接口",userheadAvrUrl)
      // 更新数据仓里的用户名字
      state.userheadAvrUrl = userheadAvrUrl
      // 保存用户名
      this.commit('userdata/saveuserheadAvrUrl')
    },
    savename(state) {
      console.log('被调用了保存name')
      uni.setStorageSync('phone',state.name)
    },
    savephone(state) {
      console.log('被调用了保存phone')
      uni.setStorageSync('phone',state.phone)
    },
    saveuserheadAvrUrl(state) {
      console.log('被调用了保存userheadAvrUrl')
      uni.setStorageSync('userheadAvrUrl',state.userheadAvrUrl)
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