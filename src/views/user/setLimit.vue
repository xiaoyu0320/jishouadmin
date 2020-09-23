<template>
  <div class='editNode container'>
    <div class="_title">
      添加用户
    </div>
    <el-divider/>
    <div class="item">
      <div class="head">
        登录账号:
      </div>
      <div class="body">
        <el-input v-model="info.mobile" placeholder="输入手机号"></el-input>
      </div>
      <div class="foot">
        该用户及其伞下用户不能与团队以外的用户进行互转ASC
      </div>
    </div>
    <div class="item">
      <div class="head"></div>
      <div class="body">
        <el-checkbox v-model="info.is_limit">不能与伞下用户互转</el-checkbox>
      </div>
    </div>
    <div style="text-align: center;margin-top: 100px;">
      <el-button type="primary" size="medium" @click.native="confirm">确认</el-button>
    </div>
  </div>
</template>
<script>
import * as api from 'api'
export default {
  components: {},
  data () {
    // 这里存放数据
    return {
      info: {
        mobile: '',
        is_limit: false
      }
    }
  },
  methods: {
    add () {
      let is = this.info.is_limit ? '1' : '0'
      this.info.is_limit = is
      api.limitAdd(this.info).then(res => {
        this.$message({
          type: 'success',
          message: '操作成功'
        })
        this.$router.back()
      }).catch(() => {
        this.init()
      })
    },
    init () {
      const info = {
        mobile: '',
        is_limit: false
      }
      this.info = info
    },
    confirm () {
      this.add()
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {

  }
}
</script>
<style lang='scss' scoped>
.container{
  width: 100%;
  height: 100%;
  position: absolute;
  overflow-y: auto;
  top: 0;
  left: 0;
  background: #fff;
  padding: 40px;
  box-sizing: border-box;
  z-index: 1002;
  .close{
    font-size: 32px;
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .item{
    display: flex;
    margin-bottom:20px;
    align-items: center;
    .head{
      width: 120px;
      text-align: right;
      margin-right: 15px;
    }
    .body{
      overflow: hidden;
      display: flex;
      align-items: center;
      .tips{
        font-size: 12px;
        color: #999;
      }
    }
    .foot{
      margin-left: 20px;
    }
  }
}
</style>
