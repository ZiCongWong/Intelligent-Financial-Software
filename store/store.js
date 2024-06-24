import Vue from "vue"
import Vuex from 'vuex'
import userdata from '@/store/userdata.js'
import monthbudget from '@/store/monthbudget.js'
// import collection from '@/store/collection.js'
// import moduleuser from '@/store/user.js'
// import moduleCart from '@/store/cart.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules:{
    userdata,
    monthbudget,
  }
})

export default store