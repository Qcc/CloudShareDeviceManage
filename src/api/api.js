import reqwest from 'reqwest'

export function fetch (url, onComplate, params, ...states) {
  if (typeof onComplate !== 'function') {
    return
  }
  reqwest({
    url: url,
    method: 'POST',
    crossDomain: true,
    withCredentials: true,
    data: {
      ...params
    },
    type: 'json'
  })
  .then((data) => {
    if (data.status === 200) {
      onComplate(data, states)
    } else {
      onComplate(null)
    }
  })
  .fail((err, msg) => {
    console.log(err, msg)
    onComplate(null)
  })
};
export function fetch2 (url, onComplate, params, ...states) {
  if (typeof onComplate !== 'function') {
    return
  }
  reqwest({
    url: url,
    method: 'POST',
    crossDomain: true,
    withCredentials: true,
    data: JSON.stringify(params),
    dataType: 'json',
    contentType: 'application/json;charset=utf-8'
  })
  .then((data) => {
    if (data.status === 200) {
      onComplate(data, states)
    } else {
      onComplate(null)
    }
  })
  .fail((err, msg) => {
    console.log(err, msg)
    onComplate(null)
  })
};
export function customQueryPagerURL (obj) {
  return ROOTURL + '/iDevice/protected/' + obj + '/queryPager.api'
}
export const ROOTURL = 'http://192.168.200.104:8080'
export const login = ROOTURL + '/iDevice/public/1/login.api'
export const logoutApi = ROOTURL + '/iDevice/public/logout.api'
export const isLoggedIn = ROOTURL + '/iDevice/public/isLoggedIn.api'
export const validateCodeImg = ROOTURL + '/iDevice/public/validateCodeImg.api'
export const checkValidateCode = ROOTURL + '/iDevice/public/checkValidateCode.api'

export const createUser = ROOTURL + '/iDevice/protected/user/create.api'
export const updateUser = ROOTURL + '/iDevice/protected/user/update.api'
export const batchUpdateUser = ROOTURL + '/iDevice/protected/user/batchUpdate.api'
export const readUser = ROOTURL + '/iDevice/protected/user/read.api'
export const deleteUser = ROOTURL + '/iDevice/protected/user/delete.api'
export const batchDeleteUser = ROOTURL + '/iDevice/protected/user/batchDelete.api'
export const getCountUser = ROOTURL + '/iDevice/protected/user/getCount.api'
export const getPagerUser = ROOTURL + '/iDevice/protected/user/getPager.api'
export const queryCountUser = ROOTURL + '/iDevice/protected/user/queryCount.api'
export const queryPagerUser = ROOTURL + '/iDevice/protected/user/queryPager.api'

