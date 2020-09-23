<!--  -->
<template>
<div class="dashwrap app-container">
    <div class="tips dp-flex fl-al-center">
      <img src="@/assets/common/lock.png" alt="" class="lock">
      <p class="flex-1">如需修改信息，请联系平台方客服</p>
    </div>
    <div class="item dp-flex">
      <div class="head">手机号码</div>
      <div class="body tel flex-1">{{userinfo.mobile}}</div>
    </div>
    {{text}}
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      int: null,
      text: ''
    }
  },
  created () {
    // update info
    // const hasGetUserInfo = store.getters.name
    // if (!hasGetUserInfo) {
    //   store.dispatch('user/getInfo')
    // }
  },
  mounted () {
  },
  computed: {
    ...mapGetters([
      'userinfo'
    ])
  },
  methods: {
  }
}
</script>
<style lang='scss' scoped>
  .dashwrap{
    .tips{
      height: 50px;
      font-size: 14px;
      background: #eee;
      padding: 0 15px;
      border-radius: 4px;
      color: #353535;
      img{
        width: 20px;
        height: auto;
        display:block;
        margin-right: 10px
      }
    }
    .item{
      margin-top: 20px;
      .head{
        font-size: 17px;
        width: 100px;
        margin-right: 20px;
      }
      .body{
        font-size: 17px;
        &.tel{
          font-size: 20px;
        }
      }
    }
  }
.test{
  width: 300px;
  height: 50px;
  background-color: #42b983;
  color: #ffffff;
  margin-bottom: 20px
}
</style>
