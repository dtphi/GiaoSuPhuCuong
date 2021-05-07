import AppConfig from 'api@admin/constants/app-config';
import {
  apiGetSettingByCode,
  apiInsertSetting
} from 'api@admin/setting';
import {
  apiGetCategoryByIds
} from 'api@admin/category';
import {
  SELECT_DROPDOWN_PARENT_CATEGORY,
  SELECT_DROPDOWN_INFO_TO_PARENT_CATEGORY
} from '../../types/mutation-types';
import {
  ACTION_SET_LOADING,
  ACTION_RESET_NOTIFICATION_INFO,
  ACTION_SELECT_DROPDOWN_PARENT_CATEGORY,
  ACTION_SELECT_DROPDOWN_INFO_TO_PARENT_CATEGORY,
  ACTION_INSERT_SETTING,
  ACTION_GET_SETTING
} from '../../types/action-types';
const settingCategory = {
  key: 'module_category_icon_side_bar_categories', 
  value: [],
  serialize: true
}

const defaultState = () => {
  return {
    module_category_icon_side_bar_categories: settingCategory,
    moduleData: {
      code: 'module_category_icon_side_bar',
      keys: [
        settingCategory
      ]
    },
    infoCategory: {
      category_name: '',
      category_id: null
    },
    dropdownCategory: [],
    nameQuery: '',
    newsGroupId: 0,
    loading: false,
    updateSuccess: false,
    errors: []
  }
}

export default {
  namespaced: true,
  state: defaultState(),
  getters: {
    dropdownCategory(state) {
      return state.dropdownCategory;
    },
    settingCategory(state) {
      return state.module_category_icon_side_bar_categories;
    },
    moduleData(state) {
      return state.moduleData
    },
    infoCategory(state) {
      return state.infoCategory
    },
    getNameQuery(state) {
      var str = state.nameQuery;

      if (typeof str === 'undefined' || str === null) {
        return '';
      }
      return str;
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
    }
  },

  mutations: {

    MODULE_UPDATE_SET_LOADING(state, payload) {
      state.loading = payload
    },

    MODULE_UPDATE_SETTING_SUCCESS(state, payload) {
      state.updateSuccess = payload
    },

    MODULE_UPDATE_SETTING_FAILED(state, payload) {
      state.updateSuccess = payload
    },

    MODULE_UPDATE_SET_ERROR(state, payload) {
      state.errors = payload
    },

    [SELECT_DROPDOWN_PARENT_CATEGORY](state, payload) {
      if (parseInt(payload.category_id) !== parseInt(state.newsGroupId)) {
        state.nameQuery = payload.name;
        state.newsGroup.parent_id = payload.category_id;
      }
    },

    [SELECT_DROPDOWN_INFO_TO_PARENT_CATEGORY](state, payload) {
      state.nameQuery = payload.name;
      state.infoCategory = payload;
    },

    resetSettingData(state, payload) {
      state.module_category_icon_side_bar_categories.value = payload;
    },

    setKeys(state, payload) {
      state.module_category_icon_side_bar_categories = payload.module_category_icon_side_bar_categories;
      state.moduleData.keys = [];
      state.moduleData.keys.push(payload.module_category_icon_side_bar_categories);
    },

    setDropdownCategory(state, payload) {
      state.dropdownCategory = payload;
    }
  },

  actions: {
    [ACTION_GET_SETTING]({
      dispatch,
      state,
      commit
    }, params) {
      dispatch(ACTION_SET_LOADING, true);
      apiGetSettingByCode(
        state.moduleData.code,
        (res) => {
          commit('setKeys', res.data.results);

          dispatch('get_category_byIds', res.data.results.module_category_icon_side_bar_categories.value);
        },
        (errors) => {
          dispatch(ACTION_SET_LOADING, false);
        }
      );
    },

    get_category_byIds({commit, dispatch}, cateIds) {
      const params = {
        cateIds: cateIds
      }
      apiGetCategoryByIds(
        (res) => {
          commit('setDropdownCategory', res);

          dispatch(ACTION_SET_LOADING, false);
        },
        (errors) => {
          dispatch(ACTION_SET_LOADING, false);
        },
        params
      );
    },

    [ACTION_INSERT_SETTING]({commit, dispatch}, settingData) {
      dispatch(ACTION_SET_LOADING, true);
      apiInsertSetting(
        settingData,
        (result) => {
          commit('MODULE_UPDATE_SETTING_SUCCESS', AppConfig.comInsertNoSuccess);
          commit('MODULE_UPDATE_SET_ERROR', []);

          dispatch(ACTION_SET_LOADING, false);
        },
        (errors) => {
          commit('MODULE_UPDATE_SETTING_FAILED', AppConfig.comInsertNoFail);
          commit('MODULE_UPDATE_SET_ERROR', errors);

          dispatch(ACTION_SET_LOADING, false);
        }
      )
    },

    actionResetSettingData({commit}, payload) {
      commit('resetSettingData', payload)
    },

    [ACTION_SET_LOADING]({
      commit
    }, isLoading) {
      commit('MODULE_UPDATE_SET_LOADING', isLoading);
    },

    [ACTION_RESET_NOTIFICATION_INFO]({
      commit
    }, values) {
      commit('MODULE_UPDATE_SETTING_SUCCESS', values)
    },

    [ACTION_SELECT_DROPDOWN_PARENT_CATEGORY]({
      commit
    }, category) {
      commit(SELECT_DROPDOWN_PARENT_CATEGORY, category);
    },

    [ACTION_SELECT_DROPDOWN_INFO_TO_PARENT_CATEGORY]({
      commit
    }, category) {
      commit(SELECT_DROPDOWN_INFO_TO_PARENT_CATEGORY, category);
    }
  }
}