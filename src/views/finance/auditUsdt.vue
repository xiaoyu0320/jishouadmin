<!--  -->
<template>
  <div class='auditUsdt' v-loading="loading">
    <div class="theme">用户资金情况</div>
    <div class="details">
      <div class="details-box">
        <div class="icon">当前余额：{{asc}} epc</div>
        <div class="total">统计后的余额：{{ascTotal}} epc</div>
        <div class="view" @click="check(2)">查看明细</div>
      </div>
      <div class="details-box">
        <div class="icon">当前余额：{{usdt}} USDT</div>
        <div class="total">统计后的余额：{{usdtTotal}} USDT</div>
        <div class="view" @click="check(1)">查看明细</div>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="theme">审核</div>
    <div class="main">
      <div class="main-box">
        <div class="item">
          <label>上级用户</label>
          <div class="body">{{parent}}</div>
        </div>
        <div class="item">
          <label>币种</label>
          <div class="body">USDT</div>
        </div>
        <div class="item">
          <label>类型</label>
          <div class="body">{{trade_type}}</div>
        </div>
        <div class="item">
          <label>数量</label>
          <div class="body">{{coin}}</div>
        </div>
        <div class="item">
          <label>备注</label>
          <div class="body">{{memo}}</div>
        </div>
      </div>
      <div class="main-box">
        <div class="item">
          <label>节点用户</label>
          <div class="body">
            {{my_node}}
          </div>
        </div>
        <div class="item">
          <label>提交时间</label>
          <div class="body">
            {{create_time}}
          </div>
        </div>
        <div class="item">
          <label>提币账户</label>
          <div class="body">
            {{mobile}}
          </div>
        </div>
        <div class="item" v-if="is_interior != 1">
          <label>交易哈希</label>
          <div class="body">
            <el-input v-model="hash" placeholder="交易哈希"></el-input>
          </div>
        </div>
        <div class="item">
          <label>审核失败理由</label>
          <div class="body">
            <el-input type="textarea" :rows="2" placeholder="请输入（选填）" v-model="remark"></el-input>
          </div>
        </div>
        <div class="item">
          <label>提币地址</label>
          <div class="body">
            <div @click="getCopy" :data-clipboard-text="to" class="copybutton"><span>{{to}}</span><span v-if="to">({{is_interior != 1 ? '复制' : '公司内部地址'}})</span></div>
            <div v-if="is_interior != 1"><qrcode-vue v-if="to" :value="to" style="margin-top: 30px" class="qrcode-auto"></qrcode-vue></div>
          </div>
        </div>
      </div>
    </div>
    <div class="button-wrap">
      <el-button class="centerbutton" type="primary" plain @click.prevent="auditPost(1)">审核通过</el-button>
      <el-button class="centerbutton" plain @click.prevent="auditPost(2)">审核失败</el-button>
    </div>
    <finance v-if="dialog" :icon="type == 1 ? usdt : asc" :totals="type == 1 ? usdtTotal : ascTotal" :uid="uid" :type="type" @close="close"/>
  </div>
</template>

<script>
import * as api from 'api'
import QrcodeVue from 'qrcode.vue'
import Clipboard from 'clipboard'
export default {
  components: {
    QrcodeVue,
    finance: () => import('@c/finance/finance')
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
      stop: false,
      usdt: 0,
      ascTotal: 0,
      asc: 0,
      usdtTotal: 0,
      uid: '',
      dialog: false,
      to: '',
      loading: false,
      parent: '',
      my_node: '',
      is_interior: ''
    }
  },
  methods: {
    getCopy () {
      let clipboard = new Clipboard('.copybutton')
      clipboard.on('success', () => {
        this.$message({
          message: '已复制',
          type: 'success'
        })
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', () => {
        // 不支持复制
        this.$message.error('该浏览器不支持自动复制')
        // 释放内存
        clipboard.destroy()
      })
    },
    close () {
      this.type = ''
      this.dialog = false
    },
    check (type) {
      this.type = type
      this.dialog = true
    },
    getInfo () {
      this.loading = true
      api.audit({ id: this.$route.query.id }).then(res => {
        const { data } = res
        this.mobile = data.account
        this.coin = data.coin
        this.hash = data.hash
        this.memo = data.memo
        this.trade_type = data.type_name
        this.create_time = data.create_time
        this.type = data.type
        this.usdt = data.usdt
        this.usdtTotal = data.usdtTotal
        this.ascTotal = data.ascTotal
        this.asc = data.asc
        this.to = data.to
        this.uid = data.uid
        this.parent = data.parent
        this.my_node = data.my_node
        this.is_interior = data.is_interior
        this.loading = false
      }).catch(() => {
        this.loading = false
        this.$router.back()
      })
    },
    auditPost (status) {
      if (this.stop) {
        return
      }
      this.stop = true
      api.auditPost({ id: this.$route.query.id, status: status, remark: this.remark, hash: this.hash }).then(res => {
        this.$notify({
          title: '成功',
          message: res.msg,
          type: 'success'
        })
        this.$router.back()
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
  .auditUsdt {
    .theme{
      font-size: 18px;
      font-weight: bold;
    }
    .details{
      font-size: 14px;
      padding: 30px 20px 0;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .details-box{
        min-width: 620px;
        flex: 1;
        display: flex;
        .total{
          padding: 0 30px;
        }
        .view{
          color: #409EFF;
          cursor:pointer
        }
      }
    }
    .main{
      font-size: 14px;
      padding: 30px 20px 0;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .main-box{
        flex: 1;
        .item{
          display: flex;
          padding-bottom: 15px;
          label{
            width: 90px;
          }
          .body{
            width: 400px;
          }
        }
      }
    }
  }
  .button-wrap{
    margin-top: 50px;
    text-align: center;
    .centerbutton{
      display: inline-block;
      margin: 0 10px;
    }
  }
</style>
