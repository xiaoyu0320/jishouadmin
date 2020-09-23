import Vue from 'vue'
Vue.use(Vue => {
  ((requireContext) => {
    const arr = requireContext.keys().map(requireContext)
    console.log(arr);
    (arr || []).forEach(directive => {
      directive = directive.__esModule && directive.default ? directive.default : directive
      Object.keys(directive).forEach(key => {
        Vue.directive(key, directive[key])
      })
    })
  })(require.context('../directive', false, /\.js$/))
})
