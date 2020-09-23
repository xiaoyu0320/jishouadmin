
const defaultImg = 'https://cdnpic.ezoonet.com/wallet/defaultImg.jpg'
export default {
  //  传入一个真实的地址，假如这个地址是有存在的话，就直接判断加载成功就赋值上去，假如是一个空的地址，就返回默认图。
  // 假如传的是一个在线的图片，判断能否加载成功
  loadImg: {
    async bind (el, binding) {
      let imgUrl = binding.value
      if (imgUrl) {
        let exist = await this.imageIsExist(imgUrl)
        if (exist) {
          el.setAttribute('src', imgUrl)
        } else {
          // 图片加载出错
          el.setAttribute('src', defaultImg)
        }
      } else {
        // 空地址处理
        el.setAttribute('src', defaultImg)
      }
    },
    async unbind (el, binding) { },
    imageIsExist (url) {
      return new Promise(resolve => {
        var img = new Image()
        img.onload = function () {
          if (this.complete == true) {
            resolve(true)
            img = null // 销毁掉 防止内存泄漏
          }
        }
        img.onerror = function () {
          resolve(false)
          img = null
        }
        img.src = url
      })
    }
  }
}
