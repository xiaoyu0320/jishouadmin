const install = (Vue, { handler = () => { } }) => {
  Vue.mixin({
    beforeCreate() {
      const { methods, catchAsyncError } = this.$options
      if (!catchAsyncError) return
      Object.keys(methods).forEach(key => {
        let fn = methods[key]
        this.$options.methods[key] = function (...args) {
          let newFn = fn.apply(this, args)
          console.log(newFn.catch())
          if (newFn && typeof newFn.catch === 'function') {
            return newFn.catch(handler)
          }
          return newFn
        }
      })
    }
  })
}
export default install
