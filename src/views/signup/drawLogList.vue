<!--  -->
<template>
<div class='drawLogList'  v-loading="loading">
  <div class="top">
    <el-input placeholder="@+手机号为完全匹配查询" v-model="mobile">
      <template slot="prepend">手机号</template>
    </el-input>
    <el-input placeholder="请输入开奖次数" v-model="scene">
      <template slot="prepend">开奖场次</template>
    </el-input>
    <el-date-picker
      v-model="between_time"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    <el-button type="primary" size="small" @click.native="search">搜索</el-button>
  </div>
  <div class="dp-flex mt20 mb10">
    <div>总场次：{{totals}}</div>
    <div style="padding: 0 50px;">昨日总场次：{{yesterday_total}}</div>
    <div>今日总场次：{{today_total}}</div>
    <div style="padding: 0 50px;">未中奖主/子号人数：{{main}} / {{son}}</div>
    <div>已中奖主/子号人数：{{main_lucky_account}} / {{son_lucky_account}}</div>
  </div>
  <el-table :data="list" border stripe height="700">
    <el-table-column
      label="开奖时间"
      prop="addtime"
    >
    </el-table-column>
    <el-table-column
      label="开奖场次"
      prop="scene"
    >
    </el-table-column>
    <el-table-column
      label="中奖账号"
      prop="account"
    >
    </el-table-column>
    <el-table-column
      label="报名编号"
      prop="number"
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
      scene: '',
      loading: false,
      between_time: '',
      totals: '',
      today_total: '',
      yesterday_total: '',
      main: 0,
      son: 0,
      main_lucky_account: 0,
      son_lucky_account: 0
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
      this.getTotal()
    },
    getTotal () {
      let time = ''
      if (this.between_time != '' && this.between_time != null) {
        time = new Date(this.between_time[0]).getTime() / 1000 + '-' + new Date(this.between_time[1]).getTime() / 1000
      } else {
        time = ''
      }
      let obj = {
        scene: this.scene,
        mobile: this.mobile,
        between_time: time
      }
      api.drawTotal(obj).then(res => {
        const { data } = Object.freeze(res)
        this.totals = data.total
        this.today_total = data.today_total
        this.yesterday_total = data.yesterday_total
        this.main = data.main_account_count
        this.son = data.son_account_count
        this.main_lucky_account = data.main_lucky_account
        this.son_lucky_account = data.son_lucky_account
      })
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
      obj.mobile = this.mobile
      obj.scene = this.scene
      obj.between_time = time
      this.loading = true
      api.drawLogList(obj).then(res => {
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
    this.getTotal()
  }
}
</script>
<style lang='scss' scoped>
</style>
