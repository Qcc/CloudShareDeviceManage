import reqwest from 'reqwest'

export function fetch(url, onComplate, params, ...states) {
  if (typeof onComplate !== 'function') {
    return;
  }
  reqwest({
      url: url,
      method: 'POST',
      crossDomain: true,
      withCredentials: true,
      data: {...params },
      type: 'json'
    })
    .then((data) => {
      if (data.status === 200) {
        onComplate(data, states);
      } else {
        onComplate(null);
      }
    })
    .fail((err, msg) => {
      onComplate(null);
    })
};
export function fetch2(url, onComplate, params, ...states) {
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
      onComplate(null)
    })
};
// export function customQueryPagerURL(obj) {
//   return ROOTURL + '/protected/' + obj + '/queryPager.api'
// }
//new server
// export const ROOTURL = 'http://123.56.68.222:8080/idev'
// export const BASICURL = 'http://123.56.68.222:8080/idev/protected/'
export const QRUrl = 'http://test.szcloudshare.com/idev/test/idx.api?d='
  // export const QRUrl =  'http://szcloudshare.com/idev/idx.api?d='
export const ROOTURL = 'http://test.szcloudshare.com/idev'
export const BASICURL = 'http://test.szcloudshare.com/idev/protected/'
  // export const ROOTURL = 'http://123.56.68.222:8080/idev'
  // export const BASICURL = 'http://123.56.68.222:8080/idev/protected/'
  // export const ROOTURL = 'http://192.168.200.104:8080/idev'
  // export const BASICURL = 'http://192.168.200.104:8080/idev/protected/'

//使用人次
export const chartUrl = BASICURL + 'shebei/getStat.api';
//门店总数
export const parnterUrl = BASICURL + 'shebei/getStat1.api';
// 获取分成比例
export const fencheng = BASICURL + 'gongsi/chaxunfenchengbili.api';

export const loginhref = ROOTURL + '/public/'
export const login = ROOTURL + '/public/1/login.api'
export const logoutApi = ROOTURL + '/public/logout.api'
export const isLoggedIn = ROOTURL + '/public/isLoggedIn.api'
export const validateCodeImg = ROOTURL + '/public/validateCodeImg.api'
export const checkValidateCode = ROOTURL + '/public/checkValidateCode.api'
  // 角色
  // export const createUser = ROOTURL + '/protected/user/create.api'
  // export const updateUser = ROOTURL + '/protected/user/update.api'
  // export const batchUpdateUser = ROOTURL + '/protected/user/batchUpdate.api'
  // export const readUser = ROOTURL + '/protected/user/read.api'
  // export const deleteUser = ROOTURL + '/protected/user/delete.api'
  // export const batchDeleteUser = ROOTURL + '/protected/user/batchDelete.api'
  // export const getCountUser = ROOTURL + '/protected/user/getCount.api'
  // export const getPagerUser = ROOTURL + '/protected/user/getPager.api'
  // export const queryCountUser = ROOTURL + '/protected/user/queryCount.api'
  // export const queryPagerUser = ROOTURL + '/protected/user/queryPager.api'
  // 伙伴公司
  // export const createCompany = ROOTURL + '/protected/company/create.api'
  // export const updateCompany = ROOTURL + '/protected/company/update.api'
  // export const batchUpdateCompany = ROOTURL + '/protected/company/batchUpdate.api'
  // export const readCompany = ROOTURL + '/protected/company/read.api'
  // export const deleteCompany = ROOTURL + '/protected/company/delete.api'
  // export const batchDeleteCompany = ROOTURL + '/protected/company/batchDelete.api'
  // export const getCountCompany = ROOTURL + '/protected/company/getCount.api'
  // export const getPagerCompany = ROOTURL + '/protected/company/getPager.api'
  // export const queryCountCompany = ROOTURL + '/protected/company/queryCount.api'
  // export const queryPagerCompany = ROOTURL + '/protected/company/queryPager.api'
  // 修改密码
export const modPassword = ROOTURL + '/public/modifyPassword.api'