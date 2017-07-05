import reqwest from 'reqwest'

export function fetch (url, onComplete, params = {}, method = 'POST') {
  if (typeof onComplete !== 'function') {
    return
  }
  reqwest({
    url: url,
    method: method,
    crossDpmain: true,
    data: {
      ...params
    },
    type: 'json'
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
    crossDpmain: true,
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

