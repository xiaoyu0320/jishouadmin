export const golbal = {
  filters: {
    filterNull: function (val) {
      return val === 'null' ? '' : val
    }
  },
  methods: {
    // 防冒泡 不需要写任何方法 click事件加一个stop即可
    // example @click.stop="stopBubbling"
    stopBubbling () {

    },
    // obj is an object contain mobile and email
    filterNameEmail (obj) {
      if (typeof obj === 'undefined') return ''
      if (obj.mobile && obj.mobile != '' && obj.email && obj.email != '') {
        return obj.mobile + '/' + obj.email
      }
      if (obj.mobile && obj.mobile != '') return obj.mobile
      if (obj.email && obj.email != '') return obj.email
    },
    maskAddress (addr) {
      if (addr != null && addr.length > 8) {
        return addr.substr(0, 6) + '...' + addr.substr(-6)
      } else {
        return addr
      }
    }
  }
}
