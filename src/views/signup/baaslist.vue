<!--  -->
<template>
<div class='signupList' v-loading="loading">
  <div class="top">
    <div>
      <el-input placeholder="请输入手机号" v-model="mobile">
        <template slot="prepend">手机号</template>
      </el-input>
      <el-select v-model="type" clearable placeholder="请选择状态">
        <el-option
          v-for="item in options"
          :key="item.key"
          :label="item.label"
          :value="item.key">
        </el-option>
      </el-select>
      <el-select v-model="isExchange" clearable placeholder="请选择状态">
        <el-option
          v-for="item in exchange"
          :key="item.key"
          :label="item.label"
          :value="item.key">
        </el-option>
      </el-select>
      <el-button type="primary" size="small" @click.native="search">搜索</el-button>
    </div>
  </div>
  <div style="display:flex;margin-top: 20px;">
    <div>寄售码总量：{{totalbaas}}</div>
    <div style="padding-left: 15px;">已兑换：{{exchangebaas}}</div>
  </div>
  <el-table :data="list" border stripe style="margin-top:20px" height="600">
    <el-table-column
      label="账号"
      prop="account"
    >
    </el-table-column>
    <el-table-column
      label="中奖数量"
      prop="number"
    >
    </el-table-column>
    <el-table-column
      label="已兑换数量"
      prop="exchange"
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
      mobile: '',
      page: 1,
      list: [],
      total: 1,
      single: true,
      loading: false,
      type: '',
      options: [
        {
          key: '',
          label: '全部账号'
        },
        {
          key: 0,
          label: '主号'
        },
        {
          key: 1,
          label: '子号'
        }
      ],
      isExchange: '',
      exchange: [
        {
          key: 1,
          label: '已兑换过'
        },
        {
          key: 0,
          label: '未兑换过'
        }
      ],
      start: '',
      end: '',
      totalbaas: 0,
      exchangebaas: 0
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
      const obj = {}
      obj.page = this.page
      obj.mobile = this.mobile
      obj.is_exchange = this.isExchange
      obj.type = this.type
      obj.between_num = ''
      this.loading = true
      api.baaslist(obj).then(res => {
        this.list = res.data.list
        this.total = res.data.count
        this.totalbaas = res.data.total_baas
        this.exchangebaas = res.data.exchange_baas
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
