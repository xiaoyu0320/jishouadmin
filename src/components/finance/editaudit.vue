
<template>
<div class='masked' @click="close">
  <div class="dialog" @click.stop="stopBubbling">
    <i class="el-icon-close" @click="close"></i>
    <div class="title">USDT充提</div>
    <div class="main">
      <div class="item">
        <div class="head">币种:</div>
        <div class="body">
          USDT
        </div>
      </div>
      <div class="item">
        <div class="head">类型:</div>
        <div class="body">
          <el-radio v-model="trade_type" label="0">USDT线下充币</el-radio>
          <el-radio v-model="trade_type" label="1">USDT线下提币</el-radio>
        </div>
      </div>
      <div class="item">
        <div class="head">用户账户:</div>
        <div class="body">
          <el-input v-model="mobile" placeholder="输入手机号"></el-input>
        </div>
      </div>
      <div class="item">
        <div class="head">数量:</div>
        <div class="body">
          <el-input v-model="coin" placeholder="输入数量"></el-input>
        </div>
      </div>
      <div class="item">
        <div class="head">交易哈希:</div>
        <div class="body flex-1">
          <el-input v-model="hash" placeholder="交易哈希（选填）"></el-input>
        </div>
      </div>
      <div class="item">
        <div class="head">备注:</div>
        <div class="body">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="多行输入（必填）"
            v-model="memo">
          </el-input>
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
  data () {
    return {
      mobile: '',
      coin: '',
      hash: '',
      memo: '',
      trade_type: '',
      options: [
        {
          key: 0,
          label: '充币'
        },
        {
          key: 1,
          label: '提币'
        }
      ],
      stop: false
    }
  },
  methods: {
    close () {
      this.$emit('close', true)
    },
    confirm () {
      if (this.mobile == '') {
        this.$message.error('手机号不能为空')
        return
      }
      if (this.coin == '') {
        this.$message.error('数量不能为空')
        return
      }
      if (this.memo == '') {
        this.$message.error('备注不能为空')
        return
      }
      if (this.stop) {
        return
      }
      this.stop = true
      let obj = {
        mobile: this.mobile,
        coin: this.coin,
        hash: this.hash,
        memo: this.memo,
        trade_type: this.trade_type
      }
      api.addAudit(obj).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.$emit('close', true)
      }).catch(() => {
        this.stop = false
      })
    }
  }
}
</script>
<style lang='scss' scoped>
@import '../usermanage/dialog1.scss';
</style>
