
<template>
<div class='masked' @click="close">
  <div class="dialog" @click.stop="stopBubbling">
    <i class="el-icon-close" @click="close"></i>
    <div class="title">提币预警用户</div>
    <div class="main">
      <div class="item">
        <div class="head">提币预警：</div>
        <div class="body">
          <el-input v-model="alertAmount" placeholder="单行输入"></el-input>
          <div>社区所有用户提币总和达到预警值，提示</div>
        </div>
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
  props: {
    uuid: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      alertAmount: '',
      stop: false
    }
  },
  methods: {
    getAmount () {
      api.getAmount({ uuid: this.uuid }).then(res => {
        const { data } = res
        this.alertAmount = data.alert_amount
      })
    },
    close () {
      this.$emit('close', true)
    },
    confirm () {
      if (this.alertAmount == '') {
        this.$message.error('输入提币预警值')
        return
      }
      if (this.stop) {
        return
      }
      this.stop = true
      let obj = {
        uuid: this.uuid,
        alert_amount: this.alertAmount
      }
      api.setAmount(obj).then(res => {
        this.stop = false
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.$emit('close', true)
      }).catch(() => {
        this.stop = false
      })
    }
  },
  created () {
    this.getAmount()
  }
}
</script>
<style lang='scss' scoped>
@import '../usermanage/dialog1.scss';
</style>
