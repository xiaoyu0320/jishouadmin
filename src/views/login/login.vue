<!--  -->
<template>
<div class='wrap'>
    <div class="login-wrap">
        <p class="title">{{title}}</p>
        <div class="form-group">
            <input type="text" placeholder="请输入账号" v-model="username">
        </div>
        <div class="form-group">
            <input type="password" placeholder="请输入密码" v-model="password" @keydown="submit($event)">
        </div>
        <div class="signin" @click="signin">sign in</div>
    </div>
</div>
</template>

<script>
import { Loading } from 'element-ui'
import setting from '@/setting'
export default {
  components: {},
  catchAsyncError: true,
  data () {
    return {
      username: '',
      password: '',
      redirect: '',
      title: setting.title
    }
  },
  computed: {},

  watch: {
    $route: {
      // 如果query对象有redirect参数存在的情况下 则读取那个参数
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    submit (e) {
      // key.Code === 13表示回车键
      if (e.keyCode === 13) {
        this.signin()
      }
    },
    // 登录
    async signin () {
      const { username, password } = this
      let loadingService = Loading.service({
        fullscreen: true
      })
      this.$store.dispatch('user/login', { username: username, password: password }).then(res => {
        this.$message({
          type: 'success',
          message: '登陆成功'
        })
        this.$router.push({ path: this.redirect || '/' })
        this.$nextTick(() => {
          loadingService.close()
        })
      }, error => {
        this.$message({
          type: 'error',
          message: error
        })
        this.$nextTick(() => {
          loadingService.close()
        })
      })
    }
  },

  created () {
  },
  mounted () {
  },
  destroyed () {},
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style lang='scss' scoped>
  .wrap{
    overflow: hidden;
    height: 100vh;
    background: url('../../assets/login/bg.png')center center;
    background-size: cover ;
    .login-wrap{
          width: 540px;
          box-shadow: 6px 11px 41px -28px #a99de7;
          position: absolute;
          top:50%;
          left:50%;
          transform:translate(-50%,-50%);
          background:#fff;
          border-radius: 10px;
          padding: 48px 28px;
          box-sizing: border-box;
          .title{
            text-align: center;
            font-size: 24px;
            margin-bottom: 20px;
          }
          .form-group{
            margin-bottom: 30px;
            input{
              height: 45px;
              color: #7a88a1;
              border-bottom: 1px solid #f5f5f5;
              padding: 6px 12px;
              padding-left: 0;
              font-size: 15px;
              line-height: 1.5;
              width: 100%;
              box-sizing: border-box;
            }
          }
          .signin{
            padding: 13px 40px;
            background: #7571f9;
            width: 100%;
            color: #fff;
            line-height: 1.5;
            font-size: 18px;
            text-align: center;
            box-sizing: border-box;
            border-radius: 5px;
          }
    }
  }
</style>
