<!--  -->
<template>
<div class='masked' @click="close">
  <div class="dialog" @click.stop="stopBubbling">
      <i class="el-icon-close" @click="close"></i>
      <div class="title">状态</div>
      <div class="content" v-html="returnStatus()"></div>
      <div class="button-wrap">
          <el-button class="centerbutton" v-if="status==1" type="primary" plain @click.prevent="edit(0)">开启</el-button>
          <el-button class="centerbutton" v-if="status==0" type="danger" plain @click.prevent="edit(1)">禁用</el-button>
          <el-button class="centerbutton" plain @click.prevent="close">取消</el-button>
      </div>
  </div>
</div>
</template>

<script>
import { setCleanStatus } from 'api'
export default {
  components: {},
  props: {
    item: Object,
    default: () => {}
  },
  data () {
    return {
      status: '',
      uuid: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    returnStatus () {
      if (this.status == 1) {
        return `当前状态为<font class="red">禁止</font>`
      }
      if (this.status == 0) {
        return `当前状态为<font class="blue">允许</font>,若账号禁用后，用户将无法登录`
      }
    },
    close () {
      this.$emit('closeDiaglog', true)
    },
    edit (type) {
      let obj = {
        uuid: [this.uuid],
        del_flag: type
      }
      setCleanStatus(obj).then(res => {
        this.$emit('confirmDialog', {})
      })
    }
  },
  created () {
    this.status = this.item.clean_del_flag
    this.uuid = this.item.uid
  }
}
</script>
<style lang='scss' scoped>
  @import './dialog.scss';
</style>
