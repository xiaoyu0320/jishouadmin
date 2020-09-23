<!--  -->
<template>
<div class='masked' @click="close">
  <div class="dialog" @click.stop="stopBubbling">
    <i class="el-icon-close" @click="close"></i>
    <div class="title">查看详情</div>
    <div class="item">
      <div class="head">上级手机号:</div>
      <div class="body">{{item.clean_parent}}</div>
    </div>
    <div class="item">
      <div class="head">昵称:</div>
      <div class="body">{{item.nickname}}</div>
    </div>
    <div class="item">
      <div class="head">手机号:</div>
      <div class="body">{{item.mobile}}</div>
    </div>
    <div class="item">
      <div class="head">余额:</div>
      <div class="body">{{item.clean_amount}}</div>
    </div>
    <div class="item">
      <div class="head">注册时间:</div>
      <div class="body">{{item.clean_addtime}}</div>
    </div>
    <div class="item">
      <div class="head">邀请会员数:</div>
      <div class="body">{{item.count}}</div>
    </div>
    <div class="button-wrap">
        <el-button class="centerbutton" type="primary" plain @click.prevent="close">确认</el-button>
        <el-button class="centerbutton" plain @click.prevent="close">取消</el-button>
     </div>
  </div>
</div>
</template>

<script>

export default {
  components: {},
  data () {
    return {
    }
  },
  props: {
    item: Object,
    default: () => {}
  },
  computed: {},
  watch: {},
  methods: {
    close () {
      this.$emit('closeDiaglog', true)
    }
  },
  created () {
  }
}
</script>
<style lang='scss' scoped>
  @import './dialog.scss'
</style>
