import { apiGetDetail, } from '@app/api/front/HanhCacThanh'
import { INIT_LIST, SET_ERROR, } from '@app/stores/front/types/mutation-types'
import { GET_DETAIL, } from '@app/stores/front/types/action-types'

export default {
  namespaced: true,
  state: {
    mainMenus: [],
    pageLists: {
      name: '',
      description: '',
    },
    infoRelateds: [],
    errors: [],
  },
  getters: {
    mainMenus(state) {
      return state.mainMenus
    },
    pageLists(state) {
      return state.pageLists
    },
    infoRelateds(state) {
      return state.infoRelateds
    },
  },
  mutations: {
    [INIT_LIST](state, payload) {
      state.pageLists = payload
    },
    [SET_ERROR](state, payload) {
      state.errors = payload
    },
  },
  actions: {
    [GET_DETAIL]({ commit, }, routeParams) {
      const hasHanhIdProp = Object.prototype.hasOwnProperty.call(routeParams, 'id')
      if (hasHanhIdProp) {
        apiGetDetail(routeParams.id,
          (result) => {
            commit(INIT_LIST, result)
          },
          (errors) => {
            commit(SET_ERROR, errors)
          }, routeParams)
      }
    },
  },
}