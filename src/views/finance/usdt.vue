<!--  -->
<template>
<div class='entityasc' v-loading="loading">
  <div class="top mb20">
    <el-input placeholder="请输入手机号" v-model="mobile">
      <template slot="prepend">手机号</template>
    </el-input>
    <el-input placeholder="交易哈希值" v-model="hash">
      <template slot="prepend">交易哈希</template>
    </el-input>
    <el-select v-model="reasontype" clearable placeholder="请选择类型">
      <el-option
        v-for="item in options"
        :key="item.key"
        :label="item.label"
        :value="item.key">
      </el-option>
    </el-select>
    <el-date-picker
      v-model="between_time"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    <el-button type="primary" size="small" @click.native="search">搜索</el-button>
  </div>
  <div class="dp-flex mb10 fl-wrap">
    <div style="padding-right: 20px;">用户总收入：{{in_count}}USDT</div>
    <div style="padding-right: 20px;">用户总支出：{{out_count}}USDT</div>
    <div style="padding-right: 20px;">总充：{{usdt_charge_total}}USDT</div>
    <div style="padding-right: 20px;">总提/待审核：{{usdt_extract_total}}USDT / {{usdt_extract_pending_total}}USDT</div>
    <div style="padding-right: 20px;">线下总充epc：{{asc_charge_total}}epc</div>
    <div>会员当前总余额：{{usdt_total}}USDT / {{asc_total}}epc</div>
  </div>
  <el-table :data="list" border stripe height="700">
    <el-table-column
      label="交易时间"
      prop="createtime"
    >
    </el-table-column>
    <el-table-column
      width="140"
      label="钱包地址"
      prop="pa"
    >
      <template slot-scope="data">
        <el-popover placement="top-start" width="360" trigger="hover" :content="data.row.pa">
          <div slot="reference">{{maskAddress(data.row.pa)}}</div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      width="140"
      label="交易哈希"
      prop="hash"
    >
      <template slot-scope="data">
        <el-popover placement="top-start" width="360" trigger="hover" :content="data.row.hash">
          <div slot="reference">{{maskAddress(data.row.hash)}}</div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
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
      label="当前余额"
      prop="real_balance"
    >
    </el-table-column>
    <el-table-column
      label="手续费"
      prop="service_fee"
    >
    </el-table-column>
    <el-table-column
      label="类型"
      prop="reasontype_name"
    >
    </el-table-column>
    <el-table-column
      label="账号"
      prop="mobile"
    >
    </el-table-column>
    <el-table-column
      label="节点/社区"
      prop="my_node"
    >
      <template slot-scope="data">
        <div>
          <div>{{data.row.my_node}}</div>
          <div>{{data.row.community}}</div>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      label="备注"
      prop="memo"
    >
    </el-table-column>
  </el-table>
   <el-pagination
    background
    layout="prev, pager, next"
    :hide-on-single-page="single"
    @current-change="changePage"
    :page-size="15"
    :total="total">
  </el-pagination>
</div>
</template>

<script>
import * as api from 'api'
export default {
  data () {
    return {
      hash: '',
      mobile: '',
      type: 1, // USDT明细
      page: 1,
      list: [],
      total: 1,
      single: true,
      loading: false,
      between_time: '',
      reasontype: '',
      options: [
        {
          key: 1,
          label: 'USDT充值'
        },
        {
          key: 2,
          label: 'USDT提现'
        },
        {
          key: 3,
          label: 'USDT兑epc'
        },
        {
          key: 4,
          label: 'epc兑USDT'
        },
        {
          key: 15,
          label: '线下充币'
        },
        {
          key: 16,
          label: '线下提币'
        }
      ],
      in_count: 0,
      out_count: 0,
      usdt_charge_total: 0,
      usdt_extract_total: 0,
      usdt_extract_pending_total: 0,
      asc_charge_total: 0,
      asc_total: 0,
      usdt_total: 0
    }
  },
  methods: {
    changePage (val) {
      this.page = val
      this.getList()
    },
    search () {
      this.page = 1
      this.getList()
    },
    getList () {
      let time = ''
      if (this.between_time != '' && this.between_time != null) {
        time = new Date(this.between_time[0]).getTime() / 1000 + '-' + new Date(this.between_time[1]).getTime() / 1000
      } else {
        time = ''
      }
      const obj = {}
      obj.page = this.page
      obj.hash = this.hash
      obj.mobile = this.mobile
      obj.type = this.type
      obj.between_time = time
      obj.reasontype = this.reasontype
      this.loading = true
      api.financeList(obj).then(res => {
        this.list = Object.freeze(res.data.list)
        this.in_count = res.data.in_count
        this.total = res.data.count
        this.out_count = res.data.out_count
        this.usdt_total = res.data.usdt_total
        this.asc_total = res.data.asc_total
        this.asc_charge_total = res.data.asc_charge_total
        this.usdt_extract_pending_total = res.data.usdt_extract_pending_total
        this.usdt_charge_total = res.data.usdt_charge_total
        this.usdt_extract_total = res.data.usdt_extract_total
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  },
  created () {
    this.getList()
  }
}
</script>
<style lang='scss' scoped>
</style>
