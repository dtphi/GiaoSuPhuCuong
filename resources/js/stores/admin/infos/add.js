import AppConfig from 'api@admin/constants/app-config'
import { MODULE_INFO, } from '../types/module-types'
import { apiInsertInfo, apiGetDropdownInfos, } from 'api@admin/information'
import {
  INFOS_MODAL_SET_LOADING,
  INFOS_MODAL_INSERT_INFO_SUCCESS,
  INFOS_MODAL_INSERT_INFO_FAILED,
  SET_ERROR,
  INFOS_FORM_ADD_INFO_TO_CATEGORY_LIST,
  INFOS_FORM_ADD_INFO_TO_CATEGORY_DISPLAY_LIST,
  INFOS_FORM_ADD_INFO_TO_RELATED_LIST,
  INFOS_FORM_ADD_INFO_TO_RELATED_DISPLAY_LIST,
  INFOS_FORM_SET_MAIN_IMAGE,
  INFOS_FORM_SET_DROPDOWN_RELATED_LIST,
  INFOS_FORM_GET_DROPDOWN_RELATED_FAILED,
  INFOS_FORM_SELECT_DROPDOWN_INFO_TO_RELATED,
} from '../types/mutation-types'
import {
  ACTION_SET_LOADING,
  ACTION_INSERT_INFO,
  ACTION_RELOAD_GET_INFO_LIST,
  ACTION_ADD_INFO_TO_CATEGORY_LIST,
  ACTION_REMOVE_INFO_TO_CATEGORY_LIST,
  ACTION_ADD_INFO_TO_RELATED_LIST,
  ACTION_REMOVE_INFO_TO_RELATED_LIST,
  ACTION_INSERT_INFO_BACK,
  ACTION_SET_IMAGE,
  ACTION_GET_DROPDOWN_RELATED_LIST,
  ACTION_SELECT_DROPDOWN_RELATED_INFO,
} from '../types/action-types'
import { getField, updateField } from 'vuex-map-fields'

const defaultState = () => {
  return {
    isOpen: false,
    action: null,
    classShow: 'modal fade',
    styleCss: '',
    info: {
      image: {
        basename: '',
        dirname: '',
        extension: '',
        filename: '',
        path: '',
        size: 0,
        thumb: '', //url thumb
        timestamp: null,
        type: null,
      },
      date_available: null,
      sort_order: 1,
      status: 1,
      name: '',
      meta_title: '',
      sort_description: '',
      information_type: 1,
      description: '',
      tag: '',
      meta_description: '',
      meta_keyword: '',
      multi_images: [],
      relateds: [],
      categorys: [],
      downloads: [],
      special_carousels: [],
      album: null,
      selected_tac_gia:'',
    },
    isImgChange: true,
    listCategorysDisplay: [],
    listRelatedsDisplay: [],
    dropdownsRelateds: [],
    albumDropdowns: [],
    infoRelated: {
      information_id: 0,
      name: '',
    },
    infoId: 0,
    loading: false,
    insertSuccess: false,
    errors: [],
  }
}

export default {
  namespaced: true,
  state: defaultState(),
  getters: {
    isOpen(state) {
      return state.isOpen
    },
    info(state) {
      return state.info
    },
    loading(state) {
      return state.loading
    },
    updateSuccess(state) {
      return state.updateSuccess
    },
    errors(state) {
      return state.errors
    },
    isError(state) {
      return state.errors.length
    },
    getInfoField(state) {
      return getField(state.info)
    },
  },

  mutations: {
    INFOS_FORM_SET_DROPDOWN_ALBUMS_LIST(state, payload) {
      state.albumDropdowns = payload
    },
    [INFOS_FORM_SELECT_DROPDOWN_INFO_TO_RELATED](state, payload) {
      state.infoRelated = payload
    },

    [INFOS_FORM_SET_DROPDOWN_RELATED_LIST](state, payload) {
      state.dropdownsRelateds = payload
    },

    [INFOS_MODAL_SET_LOADING](state, payload) {
      state.loading = payload
    },

    [INFOS_MODAL_INSERT_INFO_SUCCESS](state, payload) {
      state.updateSuccess = payload
    },

    [INFOS_MODAL_INSERT_INFO_FAILED](state, payload) {
      state.updateSuccess = payload
    },

    [SET_ERROR](state, payload) {
      state.errors = payload
    },

    [INFOS_FORM_ADD_INFO_TO_CATEGORY_LIST](state, payload) {
      state.info.categorys = payload
    },

    [INFOS_FORM_ADD_INFO_TO_CATEGORY_DISPLAY_LIST](state, payload) {
      state.listCategorysDisplay = payload
    },

    [INFOS_FORM_ADD_INFO_TO_RELATED_LIST](state, payload) {
      state.info.relateds = payload
    },

    [INFOS_FORM_ADD_INFO_TO_RELATED_DISPLAY_LIST](state, payload) {
      state.listRelatedsDisplay = payload
    },

    [INFOS_FORM_SET_MAIN_IMAGE](state, payload) {
      state.info.image = payload
      state.isImgChange = true
    },

    INFOS_FORM_ADD_INFO_PUSH_UPDATE_CATEGORY_LIST(state, payload) {
      state.info.categorys.push(payload.category_id)
      state.listCategorysDisplay.push(payload)
    },
    INFOS_FORM_ADD_INFO_PUSH_UPDATE_RELATED_LIST(state, payload) {
      state.info.relateds.push(payload.information_id)
      state.listRelatedsDisplay.push(payload)
    },

    updateInfoField(state, field) {
      return updateField(state.info, field)
    },
  },

  actions: {
    update_special_carousel({ state, }, specialCarousel) {
      state.info.special_carousels = specialCarousel
    },

    [ACTION_SET_LOADING]({ commit, }, isLoading) {
      commit(INFOS_MODAL_SET_LOADING, isLoading)
    },

    [ACTION_INSERT_INFO]({ dispatch, commit, }, info) {
      apiInsertInfo(
        info,
        (result) => {
          if (result) {
            commit(
              INFOS_MODAL_INSERT_INFO_SUCCESS,
              AppConfig.comInsertNoSuccess
            )
            commit(SET_ERROR, [])
          }

          dispatch(ACTION_SET_LOADING, false)
          window.location.reload()
        },
        (errors) => {
          commit(
            INFOS_MODAL_INSERT_INFO_FAILED,
            AppConfig.comInsertNoFail
          )
          commit(SET_ERROR, errors)

          dispatch(ACTION_SET_LOADING, false)
        }
      )
    },

    [ACTION_INSERT_INFO_BACK]({ dispatch, commit, }, info) {
      apiInsertInfo(
        info,
        (result) => {
          if (result) {
            commit(
              INFOS_MODAL_INSERT_INFO_SUCCESS,
              AppConfig.comInsertNoSuccess
            )
            dispatch(`${MODULE_INFO}_${ACTION_RELOAD_GET_INFO_LIST}`,
              'page', { root: true, }
            )
          }
        },
        (errors) => {
          commit(
            INFOS_MODAL_INSERT_INFO_FAILED,
            AppConfig.comInsertNoFail
          )
          commit(SET_ERROR, errors)

          dispatch(ACTION_SET_LOADING, false)
        }
      )
    },

    [ACTION_ADD_INFO_TO_CATEGORY_LIST]({ commit, state, }, category) {
      const categorys = state.info.categorys

      if (typeof category === 'object' && Object.keys(category).length) {
        if (
          categorys.indexOf(category.category_id) === -1 &&
                    parseInt(category.category_id) > 0
        ) {
          commit('INFOS_FORM_ADD_INFO_PUSH_UPDATE_CATEGORY_LIST', category)
        }
      }
    },

    [ACTION_REMOVE_INFO_TO_CATEGORY_LIST]({ state, commit, }, category) {
      const categorys = state.info.categorys
      const listCateShow = state.listCategorysDisplay

      commit(
        INFOS_FORM_ADD_INFO_TO_CATEGORY_LIST,
        _.remove(categorys, function(cateId) {
          return cateId - category.category_id !== 0
        })
      )
      commit(
        INFOS_FORM_ADD_INFO_TO_CATEGORY_DISPLAY_LIST,
        _.remove(listCateShow, function(item) {
          return item.category_id - category.category_id !== 0
        })
      )
    },

    [ACTION_SET_IMAGE]({ commit, }, imgFile) {
      commit(INFOS_FORM_SET_MAIN_IMAGE, imgFile)
    },

    [ACTION_ADD_INFO_TO_RELATED_LIST]({ state, commit, }, related) {
      const relateds = state.info.relateds

      if (typeof related === 'object' && Object.keys(related).length) {
        if (
          relateds.indexOf(related.information_id) === -1 &&
                    parseInt(related.information_id) > 0
        ) {
          commit('INFOS_FORM_ADD_INFO_PUSH_UPDATE_RELATED_LIST', related)
        }
      }
    },

    [ACTION_REMOVE_INFO_TO_RELATED_LIST]({ state, commit, }, related) {
      const relateds = state.info.relateds
      const listRelatedShow = state.listRelatedsDisplay

      commit(
        INFOS_FORM_ADD_INFO_TO_RELATED_LIST,
        _.remove(relateds, function(infoId) {
          return infoId - related.information_id !== 0
        })
      )
      commit(
        INFOS_FORM_ADD_INFO_TO_RELATED_DISPLAY_LIST,
        _.remove(listRelatedShow, function(item) {
          return item.information_id - related.information_id !== 0
        })
      )
    },

    [ACTION_GET_DROPDOWN_RELATED_LIST]({ commit, }, filterName) {
      const params = {
        filter_name: filterName,
      }
      apiGetDropdownInfos(
        (result) => {
          commit(INFOS_FORM_SET_DROPDOWN_RELATED_LIST, result)
        },
        (errors) => {
          commit(SET_ERROR, errors)
        },
        params
      )
    },

    ACTION_GET_DROPDOWN_ALBUM_LIST({ commit, }, filters) {
      const params = {
        ...filters,
      }
      apiGetDropdownInfos(
        (result) => {
          commit('INFOS_FORM_SET_DROPDOWN_ALBUMS_LIST', result)
        },
        (errors) => {
          commit(SET_ERROR, errors)
        },
        params
      )
    },

    [ACTION_SELECT_DROPDOWN_RELATED_INFO]({ commit, }, information) {
      commit(INFOS_FORM_SELECT_DROPDOWN_INFO_TO_RELATED, information)
    },
  },
}
