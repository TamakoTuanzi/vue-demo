import Vue from 'vue'

var arr = []
const state = {
  orderList:[],
  params:{}
}

const getters = {
  getOrderList: (state) => state.orderList
}

const actions = {
  acOrderList ({commit,state}) {
    Vue.http.post('/api/getOrderList',state.params).then((res) => {
      for( let i = 0; i < res.data.list.length; i++){
        arr.push(res.data.list[i]);
      }
      commit('updateOrderList',arr)
    },(err) => {

    })
  }
}

const mutations = {
  updateOrderList (state,payload) {
    state.orderList = payload
  },
  updateParams (state,payload) {
    for(let key in payload) {
      state.params[key] = payload[key]
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
