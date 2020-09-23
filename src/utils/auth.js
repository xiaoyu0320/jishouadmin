import Cookies from 'js-cookie'

/**
 * 当前设置的cookie有以前两种
 * const TokenKey = 'shop_token'
 * const uidKey = 'shop_uid'
 */
export function getToken (TokenKey) {
  return Cookies.get(TokenKey)
}
// 如果没有设置的话 则默认浏览器关闭cookie就失效
// example  Cookies.set('name','value',{ expires: 7 })  设置一个7天后过期的cookie
// 为有效测试 测试环境下改成1天后 生产环境切换成当前浏览器关闭

export function setToken (TokenKey, token) {
  return Cookies.set(TokenKey, token, {
    expires: 7
  })
}

export function removeToken (TokenKey) {
  return Cookies.remove(TokenKey)
}
