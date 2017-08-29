export function setCookie(cname, cvalue, exdays, s = false) {
  var d = new Date();
  if (!s) {
    exdays = exdays * 24 * 60 * 60 * 1000;
  } else {
    exdays = exdays * 1000;
  }
  d.setTime(d.getTime() + exdays);
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
};

export function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
};

export function checkResults(data, that) {
  if (data === null) {
    that.$notify.error({
      title: '提示',
      message: '网络错误，请刷新（F5）后重试。'
    })
    return false
  }
  if (data.errorCode === 0) {
    return true
  } else if (data.errorCode === 3) {
    that.$notify.error({
      title: '错误',
      message: '当前页面发生错误，' + data.message
    })
    let path = that.$route.path.split('/')
    let login = path[path.length - 2]
    that.$router.push({ path: '/idev/' + login + '/login' })
  } else {
    that.$notify.error({
      title: '错误',
      message: '当前页面发生错误，' + data.message
    })
    return false
  }
};

export function getFristLastDay(split = '-', months = new Date(), last = false) {
  let year, month, day, reDate;
  if (!(months instanceof Date)) {
    months = new Date();
  }
  year = months.getFullYear();
  month = months.getMonth() + 1;
  day = months.getDate();
  if (month < 10) month = '0' + month;
  reDate = year + split + month + split + '01';
  if (last) {
    let d = new Date(year, month, 0).getDate();
    if (d < 10) d = '0' + d;
    reDate = year + split + month + split + d;
  }
  return reDate;
};