
<template>
<div class='masked' @click="close">
  <div class="dialog" @click.stop="stopBubbling">
    <i class="el-icon-close" @click="close"></i>
    <div class="title">添加管理</div>
    <div class="item">
      <div class="head">输入APP登录账户:</div>
      <div class="body">
        <el-input v-model="mobile" placeholder="输入手机号"></el-input>
        <div>添加完账户记得给该账户关联相应角色</div>
      </div>
    </div>
    <div class="button-wrap">
      <el-button class="centerbutton" type="primary" plain @click.prevent="confirm">确认</el-button>
      <el-button class="centerbutton" plain @click.prevent="close">取消</el-button>
    </div>
  </div>
</div>
</template>

<script>
import * as api from 'api'
export default {
  data () {
    return {
      mobile: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    close () {
      this.$emit('close', true)
    },
    confirm () {
      if (this.mobile == '') {
        this.$message({
          type: 'waring',
          message: '手机号不能为空'
        })
        return
      }
      api.addAdmin({ mobile: this.mobile }).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.$emit('close', true)
      })
    }
  }
}
</script>
<style lang='scss' scoped>
@import '../usermanage/dialog.scss';
</style>
