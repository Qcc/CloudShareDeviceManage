import reqwest from 'reqwest'

export function fetch (url, onComplete, params = {}, method = 'POST') {
  if (typeof onComplete !== 'function') {
    return
  }
  reqwest({
    url: url,
    method: method,
    crossDomain: true,
    withCredentials: true,
    type: 'json',
    data: {
      ...params
    }
  })
  .then((data) => {
    if (data.status === 200) {
      onComplete(data)
    } else {
      onComplete(null)
    }
  })
  .fail((err, msg) => {
    console.log(err)
    onComplete(null)
  })
};
export function fetch2 (url, onComplete, params = {}, method = 'POST') {
  if (typeof onComplete !== 'function') {
    return
  }
  reqwest({
    url: url,
    method: method,
    crossDomain: true,
    withCredentials: true,
    data: JSON.stringify(params),
    dataType: 'json',
    contentType: 'application/json;charset=utf-8'
  })
  .then((data) => {
    if (data.status === 200) {
      onComplete(data)
    } else {
      onComplete(null)
    }
  })
  .fail((err, msg) => {
    console.log(err)
    onComplete(null)
  })
};
export function customGetPagerURL (obj) {
  return ROOTURL + '/CloudShareDeviceManager/public/' + obj + '/getPager.api'
}
export const ROOTURL = 'http://192.168.200.104:8080'
export const login = ROOTURL + '/iDevice/public/1/login.api'
export const logoutApi = ROOTURL + '/iDevice/public/logout.api'
export const isLoggedIn = ROOTURL + '/iDevice/public/isLoggedIn.api'
export const validateCodeImg = ROOTURL + '/iDevice/public/validateCodeImg.api'
export const checkValidateCode = ROOTURL + '/iDevice/public/checkValidateCode.api'

export const createUser = ROOTURL + '/CloudShareDeviceManager/public/user/create.api'
export const updateUser = ROOTURL + '/CloudShareDeviceManager/public/user/update.api'
export const batchUpdateUser = ROOTURL + '/CloudShareDeviceManager/public/user/batchUpdate.api'
export const readUser = ROOTURL + '/CloudShareDeviceManager/public/user/read.api'
export const deleteUser = ROOTURL + '/CloudShareDeviceManager/public/user/delete.api'
export const batchDeleteUser = ROOTURL + '/CloudShareDeviceManager/public/user/batchDelete.api'
export const getCountUser = ROOTURL + '/CloudShareDeviceManager/public/user/getCount.api'
export const getPagerUser = ROOTURL + '/CloudShareDeviceManager/public/user/getPager.api'
export const queryCountUser = ROOTURL + '/CloudShareDeviceManager/public/user/queryCount.api'
export const queryPagerUser = ROOTURL + '/CloudShareDeviceManager/public/user/queryPager.api'

