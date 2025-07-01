import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'


export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

