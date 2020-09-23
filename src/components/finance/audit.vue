
<template>
<div class='masked' @click="close">
  <div class="dialog" @click.stop="stopBubbling">
    <i class="el-icon-close" @click="close"></i>
    <div class="title">审核</div>
    <div class="item">
      <div class="head">币种：</div>
      <div class="body">
        USDT
      </div>
    </div>
    <div class="item">
      <div class="head">类型：</div>
      <div class="body">
        {{trade_type}}
      </div>
    </div>
    <div class="item">
      <div class="head">{{type == 0 ? '用户' : '提币'}}账户：</div>
      <div class="body">
        {{mobile}}
      </div>
    </div>
    <div class="item">
      <div class="head">数量：</div>
      <div class="body">
        {{coin}}
      </div>
    </div>
    <div class="item">
      <div class="head">交易哈希：</div>
      <div class="body">
        <el-input v-model="hash" placeholder="交易哈希"></el-input>
      </div>
    </div>
    <div class="item">
      <div class="head">备注：</div>
      <div class="body">
        {{memo}}
      </div>
    </div>
    <div class="item">
      <div class="head">提交时间：</div>
      <div class="body">
        {{create_time}}
      </div>
    </div>
    <div class="item">
      <div class="head">拒绝理由:</div>
      <div class="body">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="多行输入（选填）"
          v-model="remark">
        </el-input>
      </div>
    </div>
    <div class="button-wrap">
      <el-button class="centerbutton" type="primary" plain @click.prevent="auditPost(1)">审核通过</el-button>
      <el-button class="centerbutton" plain @click.prevent="auditPost(2)">审核失败</el-button>
    </div>
  </div>
</div>
</template>

<script>
import * as api from 'api'
export default {
  props: {
    id: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      mobile: '',
      coin: '',
      hash: '',
      memo: '',
      trade_type: '',
      create_time: '',
      type: '',
      remark: '',
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
    getInfo () {
      api.audit({ id: this.id }).then(res => {
        const { data } = res
        this.mobile = data.account
        this.coin = data.coin
        this.hash = data.hash
        this.memo = data.memo
        this.trade_type = data.type_name
        this.create_time = data.create_time
        this.type = data.type
      }).catch(() => {
        this.$emit('close', true)
      })
    },
    close () {
      this.$emit('close', true)
    },
    auditPost (status) {
      if (this.stop) {
        return
      }
      this.stop = true
      api.auditPost({ id: this.id, status: status, remark: this.remark, hash: this.hash }).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.close()
      }).catch(() => {
        this.stop = false
      })
    }
  },
  created () {
    this.getInfo()
  }
}
</script>
<style lang='scss' scoped>
@import '../usermanage/dialog.scss';
</style>
