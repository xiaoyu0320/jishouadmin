
<template>
  <!-- eslint-disable vue/require-component-is -->
  <component
    :is="type"
    v-bind="linkProps(to)"
    @click.native="clickLink(to)"
  >
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    isExternal () {
      return isExternal(this.to)
    },
    type () {
      if (this.isExternal) {
        return 'a'
      }
      return 'router-link'
    }
  },
  methods: {
    clickLink(path) {
      this.$router.push({
        path,
        query: {
          t: +new Date() // 保证每次点击路由的query项都是不一样的，确保会重新刷新view
        }
      })
    },
    linkProps (_to) {
      if (this.isExternal) {
        return {
          href: _to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        to: _to + '?plan='
      }
    }
  }
}
</script>
