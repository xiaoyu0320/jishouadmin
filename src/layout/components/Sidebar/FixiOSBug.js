export default {
  computed: {
    device () {
      return this.$store.state.app.device
    }
  },
  mounted () {
    // 修复ios下有可能导致的bug
    this.fixBugIniOS()
  },
  methods: {
    fixBugIniOS () {
      const $subMenu = this.$refs.subMenu
      if ($subMenu) {
        const handleMouseleave = $subMenu.handleMouseleave
        $subMenu.handleMouseleave = (e) => {
          if (this.device === 'mobile') {
            return
          }
          handleMouseleave(e)
        }
      }
    }
  }
}
