<!--  -->
<template>
<div class='error'>
  <img src="../../assets/common/404.png" alt="">
  <p>找不到页面了～点击下方按钮返回首页</p>
  <div class="button" @click="goback">返回首页</div>
</div>
</template>

<script>

export default {
  components: {},
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  methods: {
    goback () {
      this.$router.replace('/login')
    }
  },
  created () {
  }
}
</script>
<style lang='scss' scoped>
  .error{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    img{
      width: 700px;
      display: block;
      height: auto;
      margin: 0 auto
    }
    p{
      color:#999;
      margin-top: -100px;
      margin-bottom: 30px;
    }
    .button{
      display: inline-block;
      padding: 8px 20px;
      border-radius: 6px;
      background: #1bcefc;
      color:#fff;
      font-size: 15px;
    }
  }
</style>
