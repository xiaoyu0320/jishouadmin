export const deepClone = (source) => {
  const targetObj = source.constructor === Array ? [] : {} // 判断复制的目标是数组还是对象
  for (let keys in source) { // 遍历目标
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') { // 如果值是对象，就递归一下
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else { // 如果不是，就直接赋值
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}
/**
 * 获取blob
 * @param{String} url 目标文件地址
 * @return{cb}
 */
export const getBlob = (url, cb) => {
  const xhr = new XMLHttpRequest()
  xhr.open('get', url, true)
  xhr.responseType = 'blob'
  xhr.onload = function () {
    if (xhr.status === 200) {
      cb(xhr.response)
    }
  }
}
export const saveAs = (blob, filename) => {
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, filename)
  } else {
    const link = document.createElement('a')
    const body = document.querySelector('body')
    link.href = window.URL.createObjectURL(blob)
    link.download = filename

    // fix firefox
    link.style.display = 'none'
    body.appendChild(link)
    link.click()
    body.removeChild(link)
    window.URL.revokeObjectURL(link.href)
  }
}
