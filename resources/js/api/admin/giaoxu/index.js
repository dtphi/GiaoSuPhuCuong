import {
  fn_get_base_api_url,
  fn_get_base_api_detail_url
} from '@app/api/utils/fn-helper';
import {
  API_GIAO_XUS_RESOURCE
} from 'store@admin/types/api-paths';


/**
 * [description]
 * @param  {[type]} infoId    [description]
 * @param  {[type]} resolve   [description]
 * @param  {[type]} errResole [description]
 * @return {[type]}           [description]
 */
export const apiGetInfoGiaoXuById = (infoId, resolve, errResole) => {
  return axios.get(fn_get_base_api_detail_url(API_GIAO_XUS_RESOURCE, infoId))
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
    .catch(errors => {
      console.log(errors)
      if (errors.response) {
        errResole(errors);
      }
    })
}

/**
 * [description]
 * @param  {[type]} resolve   [description]
 * @param  {[type]} errResole [description]
 * @param  {[type]} params    [description]
 * @return {[type]}           [description]
 */
export const apiGetGiaoXuInfos = (resolve, errResole, params) => {
  return axios.get(fn_get_base_api_url(API_GIAO_XUS_RESOURCE), {
      params: params
    })
    .then((response) => {
      console.log(response)
      if (response.status === 200) {
        resolve({
          data: response.data.data
        });
      } else {
        errResole([{
          status: response.status,
          msg: 'error test'
        }]);
      }
    })
    .catch(errors => {
      console.log(errors);
      if (errors.response) {
        errResole([{
          status: errors.response.status,
          messageCommon: errors.response.data.message,
          messages: errors.response.data.errors
        }])
      }

    })
}

/**
 * [description]
 * @param  {[type]} info      [description]
 * @param  {[type]} resolve   [description]
 * @param  {[type]} errResole [description]
 * @return {[type]}           [description]
 */
export const apiUpdateInfo = (info, resolve, errResole) => {
  console.log(fn_get_base_api_detail_url(API_GIAO_XUS_RESOURCE, info.data.id), 'test');
  return axios.put(fn_get_base_api_detail_url(API_GIAO_XUS_RESOURCE, info.data.id), info)
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
 * @param  {[type]} info      [description]
 * @param  {[type]} resolve   [description]
 * @param  {[type]} errResole [description]
 * @return {[type]}           [description]
 */
export const apiInsertInfoGiaoXu = (info, resolve, errResole) => {
  return axios.post(fn_get_base_api_url(API_GIAO_XUS_RESOURCE), info)
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
 * @param  {[type]} infoId    [description]
 * @param  {[type]} resolve   [description]
 * @param  {[type]} errResole [description]
 * @return {[type]}           [description]
 */
export const apiDeleteInfo = (infoId, resolve, errResole) => {
  return axios.delete(fn_get_base_api_detail_url(API_INFOMATIONS_RESOURCE, infoId))
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