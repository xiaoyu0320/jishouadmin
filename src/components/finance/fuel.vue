
<template>
<div class='masked' @click="close">
  <div class="dialog" @click.stop="stopBubbling">
    <i class="el-icon-close" @click="close"></i>
    <div class="title">ETH地址</div>
    <div class="item">
      <div class="head">钱包地址：</div>
      <div class="body">
        <el-popover placement="top-start" width="360" trigger="hover" :content="pa">
          <div slot="reference">{{maskAddress(pa)}}</div>
        </el-popover>
      </div>
      <div class="end"> (当前余额：{{eth}}ETH)</div>
    </div>
    <div class="item">
      <div class="head">输入数量：</div>
      <div class="body">
        <el-input placeholder="单行输入" v-model="quantity" clearable></el-input>
      </div>
    </div>
    <div class="item">
      <div class="head">充值后预计：</div>
      <div class="body">
        <span :style="quantity > 0.0145 ? 'color: red' : ''">{{retunQuantity(quantity)}}</span>ETH
      </div>
    </div>
    <div class="button-wrap">
      <el-button class="centerbutton" type="primary" plain @click.prevent="fuelCharge">确定</el-button>
      <el-button class="centerbutton" plain @click.prevent="close">取消</el-button>
    </div>
  </div>
</div>
</template>

<script>
import * as api from 'api'
export default {
  props: {
    pa: {
      type: String,
      default: ''
    },
    eth: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      quantity: '',
      stop: false
    }
  },
  methods: {
    retunQuantity (coin) {
      return Number(coin) + Number(this.eth)
    },
    close () {
      this.$emit('close', true)
    },
    fuelCharge (status) {
      if (this.quantity == '') {
        this.$message.error('请输入充值数量')
        return
      }
      if (this.stop) {
        return
      }
      this.stop = true
      api.fuelCharge({ pa: this.pa, quantity: this.quantity }).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.close()
      }).catch(() => {
        this.stop = false
      })
    }
  }
}
</script>
<style lang='scss' scoped>
@import '../usermanage/dialog.scss';
</style>
