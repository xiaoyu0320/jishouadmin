
<template>
<div class='masked' @click="close">
  <div class="dialog" @click.stop="stopBubbling">
    <i class="el-icon-close" @click="close"></i>
    <div class="title">{{title}}</div>
    <div class="main">
      <div class="main-price">
        <div>
          用户当前余额：{{icon}} {{type == 1 ? 'USDT' : 'epc'}}
        </div>
        <div class="total">
          统计后的余额：{{totals}} {{type == 1 ? 'USDT' : 'epc'}}
        </div>
        <div>
          相差：{{Number(totals) - Number(icon)}} {{type == 1 ? 'USDT' : 'epc'}}
        </div>
      </div>
      <el-table :data="list" border stripe style="margin-top:20px" height="350" v-loading="loading">
        <el-table-column
          label="交易时间"
          prop="createtime"
          width="160"
        >
        </el-table-column>
        <el-table-column
          width="160"
          label="交易数量"
          prop="coin"
        >
          <template slot-scope="data">
            <div>
              {{data.row.in_or_out == 0 ? '+' : '-'}}
              {{data.row.coin}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          label="手续费"
          prop="service_fee"
        >
        </el-table-column>
        <el-table-column
          width="120"
          label="类型"
          prop="reasontype_name"
        >
        </el-table-column>
        <el-table-column
          label="交易哈希"
          prop="hash"
        >
        </el-table-column>
        <el-table-column
          width="200"
          label="备注"
          prop="memo"
        >
        </el-table-column>
      </el-table>
      <div style="margin-top: 15px;text-align: center;">
        <el-pagination
          layout="prev, pager, next"
          :hide-on-single-page="single"
          @current-change="changePage"
          :page-size="15"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import * as api from 'api'
export default {
  props: {
    type: {
      type: [Number, String],
      default: 1
    },
    uid: {
      type: String,
      default: ''
    },
    totals: {
      type: [Number, String],
      default: 0
    },
    icon: {
      type: [Number, String],
      default: 0
    }
  },
  data () {
    return {
      title: '',
      page: 1,
      list: [],
      total: 1,
      single: true,
      loading: false
    }
  },
  methods: {
    changePage (val) {
      this.page = val
      this.getList()
    },
    close () {
      this.$emit('close', true)
    },
    getList () {
      const obj = {}
      obj.page = this.page
      obj.type = this.type
      obj.log_uid = this.uid
      this.loading = true
      api.financeList(obj).then(res => {
        this.list = res.data.list
        this.total = res.data.count
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  },
  created () {
    this.getList()
    this.title = this.type == 1 ? 'USDT明细' : 'epc明细'
  }
}
</script>
<style lang='scss' scoped>
  @import '../usermanage/dialog1.scss';
  .main {
    padding: 30px 0px 0px 0px !important;
  }
  .main-price{
    display: flex;
    .total{
      padding: 0 30px;
    }
  }
</style>
