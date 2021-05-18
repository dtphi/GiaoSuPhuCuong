import {
  apiGetDetail,
  apiGetListsToCategory
} from '@app/api/front/infos';
import {
  INIT_LIST,
  INIT_RELATED_LIST,
  SET_ERROR,
} from '@app/stores/front/types/mutation-types';
import {
  GET_DETAIL,
  GET_RELATED_INFORMATION_LIST_TO_CATEGORY
} from '@app/stores/front/types/action-types';

export default {
  namespaced: true,
  state: {
    mainMenus: [],
    pageLists: {
      name: '',
      description: ''
    },
    infoRelateds: [],
    errors: []
  },
  getters: {
    mainMenus(state) {
      return state.mainMenus
    },
    pageLists(state) {
      return state.pageLists;
    },
    infoRelateds(state) {
      return state.infoRelateds;
    }
  }, 

  mutations: {
    INIT_LIST(state, payload) {
      state.pageLists = payload;
    },
    INIT_RELATED_LIST(state, payload) {
      state.infoRelateds = payload;
    },
    SET_ERROR(state, payload) {
      state.errors = payload;
    }
  },

  actions: {
    [GET_DETAIL]({
      commit,
      dispatch
    }, routeParams) {
      if (routeParams.hasOwnProperty('slug')) {
        apiGetDetail(
          routeParams.slug,
          (result) => {
            console.log(result)
            commit(INIT_LIST, result.data.results);

            dispatch(GET_RELATED_INFORMATION_LIST_TO_CATEGORY, {
              infoType: 2,
              slug: 'category-related-' + result.data.results.related_category
            })
          },
          (errors) => {
            console.log(errors)
          },
          routeParams
        )
      }
    },

    [GET_RELATED_INFORMATION_LIST_TO_CATEGORY]({
      commit,
    }, routeParams) {
      let page = 1;
      let params = {
        limit: 7,
        page: page,
        ...routeParams
      };
      apiGetListsToCategory(
        (result) => {
          commit(INIT_RELATED_LIST, result.data.results);
        },
        (errors) => {
          console.log(errors);
        },
        params
      )
    },
  }
}