<!--  -->
<template>
<div class='app-container' v-loading="loading">
  <div class="tips dp-flex fl-al-center">
      <img src="@/assets/common/lock.png" alt="" class="lock">
      <p class="flex-1">如有其他问题，请联系平台方客服～</p>
  </div>
  <div class="item" style="margin-top:40px;">
    <div class="_item">
       <div class="head">旧密码</div>
       <el-input type="password" class="flex-1" v-model="oldpassword" placeholder="请输入旧密码"></el-input>
    </div>
  </div>
  <div class="item">
     <div class="_item">
       <div class="head">新密码</div>
       <el-input type="password" class="flex-1" v-model="newpassword" placeholder="请输入新密码"></el-input>
    </div>
  </div>
  <div class="item">
     <div class="_item">
       <div class="head">确认新密码</div>
       <el-input type="password" class="flex-1" v-model="renewpassword" placeholder="请重新输入密码"></el-input>
    </div>
  </div>
  <div class="button-wrap">
    <el-button class="centerbutton" type="primary" plain @click.prevent="confirm">确认</el-button>
    <el-button class="centerbutton" plain @click.prevent="reset">重置</el-button>
  </div>
</div>
</template>

<script>
import { editPassword } from 'api'
import store from '@/store/store'
export default {
  components: {},
  data () {
    return {
      oldpassword: '',
      newpassword: '',
      renewpassword: '',
      loading: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    reset () {
      this.oldpassword = ''
      this.newpassword = ''
      this.renewpassword = ''
    },
    confirm () {
      if (!this.oldpassword.trim()) {
        this.$message({
          type: 'info',
          message: '请输入旧密码!'
        })
        return
      }
      if (!this.newpassword.trim()) {
        this.$message({
          type: 'info',
          message: '请输入新密码!'
        })
        return
      }
      if (!this.renewpassword.trim()) {
        this.$message({
          type: 'info',
          message: '请重新输入新密码!'
        })
        return
      }
      if (this.renewpassword.trim() != this.newpassword.trim()) {
        this.$message({
          type: 'info',
          message: '两次密码不一致!'
        })
        return
      }
      this.$confirm('确认修改', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // do confirm something
        this.loading = true
        const { oldpassword, newpassword } = this
        editPassword({ oldPassword: oldpassword, password: newpassword }).then(res => {
          this.$message({
            type: 'success',
            message: '修改成功!请重新登录'
          })
          // 确认事件
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
          this.reset()
        }, error => {
          this.loading = false
          this.$message({
            type: 'error',
            message: error
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
        this.loading = false
      })
    }

  },
  created () {

  },
  mounted () {

  },
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
  .app-container{
    .item{
      margin-top: 20px;
      text-align: center;
      ._item{
        display: inline-flex;
        .head{
          width: 100px;
          font-size: 16px;
          color: #353535;
          text-align: left;
          margin-right:20px;
        }
      }
    }
  }
  .button-wrap{
    text-align: center;
    margin-top: 30px;
    .centerbutton{
      display: inline-block;
      margin: 0 10px;
    }
  }
</style>
