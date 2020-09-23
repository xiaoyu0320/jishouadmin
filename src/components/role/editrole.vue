
<template>
<div class='masked' @click="close">
  <div class="dialog" @click.stop="stopBubbling">
    <i class="el-icon-close" @click="close"></i>
    <div class="title">{{returnTitle()}}</div>
    <div class="item">
      <div class="head">角色名称:</div>
      <el-input v-model="rolename" placeholder="请输入角色名称"></el-input>
    </div>
    <div class="button-wrap">
        <el-button class="centerbutton" type="primary" plain @click.prevent="confirm">确认</el-button>
        <el-button class="centerbutton" plain @click.prevent="close">取消</el-button>
    </div>
  </div>
</div>
</template>

<script>
import { AuthAddGroupPost, AuthEditGroupPost } from 'api'
export default {
  components: {},
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    type: [Number]
  },
  data () {
    return {
      rolename: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    returnTitle () {
      return this.type == 0 ? '新增角色' : '编辑角色'
    },
    close () {
      this.$emit('closeDiaglog', true)
    },
    confirm () {
      if (!this.rolename) {
        this.$message({
          type: 'waring',
          message: '角色名称不能为空'
        })
        return
      }
      if (this.type == 0) {
        AuthAddGroupPost({ title: this.rolename }).then(res => {
          this.$emit('confirmDialog', {})
        })
      }
      if (this.type == 1) {
        AuthEditGroupPost({ title: this.rolename, id: this.item.id, status: this.item.status }).then(res => {
          this.$emit('confirmDialog', {})
        })
      }
    }
  },
  created () {
    if (this.type == 1) {
      this.rolename = this.item.title
    }
  }
}
</script>
<style lang='scss' scoped>
@import '../usermanage/dialog.scss';
</style>
