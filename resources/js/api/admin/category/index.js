import {
  fn_get_base_api_url,
  fn_get_base_api_detail_url
} from '@app/api/utils/fn-helper';
import {
  API_NEWS_GROUPS_RESOURCE
} from 'store@admin/types/api-paths';


/**
 * [description]
 * @param  {[type]} newsGroupId [description]
 * @param  {[type]} resolve     [description]
 * @param  {[type]} errResole   [description]
 * @return {[type]}             [description]
 */
export const apiGetNewsGroupById = (newsGroupId, resolve, errResole) => {
  axios.get(fn_get_base_api_detail_url(API_NEWS_GROUPS_RESOURCE, newsGroupId))
    .then((response) => {
      console.log(response)
      if (response.status === 200) {
        var json = {};
        json['data'] = response.data.newsgroup;
        json['status'] = 1000;
        resolve(json);
      } else {
        errResole([{
          status: response.status,
          msg: 'error test'
        }]);
      }
    })
    .catch(errors => errResole(errors))
}

/**
 * [description]
 * @param  {[type]} resolve   [description]
 * @param  {[type]} errResole [description]
 * @param  {[type]} params    [description]
 * @return {[type]}           [description]
 */
export const apiGetNewsGroups = (resolve, errResole, params) => {
  return axios.get(fn_get_base_api_url(API_NEWS_GROUPS_RESOURCE), {
      params: params
    })
    .then((response) => {
      console.log(response)
      if (response.status === 200) {
        const data = {
          newsgroupname: "Danh Mục :",
          id: 0,
          children: response.data.data.results
        };
        resolve(data);
      } else {
        errResole([{
          status: response.status,
          msg: 'error test'
        }]);
      }
    })
    .catch(errors => errResole(errors))
}

/**
 * [description]
 * @param  {[type]} newsGroup [description]
 * @param  {[type]} resolve   [description]
 * @param  {[type]} errResole [description]
 * @return {[type]}           [description]
 */
export const apiUpdateNewsGroup = (newsGroup, resolve, errResole) => {
  return axios.put(fn_get_base_api_detail_url(API_NEWS_GROUPS_RESOURCE, newsGroup.id), newsGroup)
    .then((response) => {
      console.log(response)
      if (response.status === 200) {
        var json = {};
        json['data'] = response.data;
        json['status'] = 1000;
        resolve(json);
      } else {
        errResole([{
          status: response.status,
          msg: 'error test'
        }]);
      }
    })
    .catch(errors => errResole(errors))
}

/**
 * [description]
 * @param  {[type]} newsGroup [description]
 * @param  {[type]} resolve   [description]
 * @param  {[type]} errResole [description]
 * @return {[type]}           [description]
 */
export const apiInsertNewsGroup = (newsGroup, resolve, errResole) => {
  return axios.post(fn_get_base_api_url(API_NEWS_GROUPS_RESOURCE), newsGroup)
    .then((response) => {
      console.log(response)
      if (response.status === 201) {
        var json = {};
        json['data'] = response.data.result;
        json['code'] = response.data.code;
        resolve(json);
      } else {
        errResole([{
          status: response.status,
          msg: 'error test'
        }]);
      }
    })
    .catch(errors => errResole(errors))
}

/**
 * [description]
 * @param  {[type]} newsGroupId [description]
 * @param  {[type]} resolve     [description]
 * @param  {[type]} errResole   [description]
 * @return {[type]}             [description]
 */
export const apiDeleteNewsGroup = (newsGroupId, resolve, errResole) => {
  return axios.delete(fn_get_base_api_detail_url(API_NEWS_GROUPS_RESOURCE, newsGroupId))
    .then((response) => {
      console.log(response)
      if (response.status === 200) {
        var json = {};
        json['data'] = response.data;
        json['status'] = 1000;
        resolve(json);
      } else {
        errResole([{
          status: response.status,
          msg: 'error test'
        }]);
      }
    })
    .catch(errors => errResole(errors))
}

/**
 * [description]
 * @param  {[type]} resolve   [description]
 * @param  {[type]} errResole [description]
 * @param  {[type]} params    [description]
 * @return {[type]}           [description]
 */
export const apiSearchAll = (query, resolve, errResole) => {
  let params = {
          query
      };
  return axios.get(fn_get_base_api_url(`/api/search-news-group`),{params})
    .then((response) => {
      console.log(response)
      if (response.status === 200) {
        resolve(response.data);
      } else {
        errResole([{
          status: response.status,
          msg: 'error test'
        }]);
      }
    })
    .catch(errors => errResole(errors))
}