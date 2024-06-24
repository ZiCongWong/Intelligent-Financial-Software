// const BASE_URL = `http://192.168.188.138:8080`

const BASE_URL = `http://139.9.197.13:8080`
export const request = (options) => {
  return new Promise((resolve,reject) => {
    uni.request({
      url:BASE_URL + options.url,
      method:options.method || 'GET',
      // header:{token:uni.getStorageSync('userid')?uni.getStorageSync('user').token:'',"Access-Control-Allow-Origin":"*"},
      header:options.header,
      data:options.data || {},
      success: (res) => {
        const data = res.data
        console.log(data)
        if(data.code === '201') {
          uni.navigateTo({
            url:'/pages/login/login.vue'
          })
          return 
        }else if(res.code=='200') {
          uni.showToast({
            icon:'error',
            title:'操作错误'
          })
        }
        resolve(data)
      },
      fail: (error) => {
        uni.showToast({
          icon:'error',
          title:'网络不佳'
        })
        reject(error)
      }
    })
  })
}
