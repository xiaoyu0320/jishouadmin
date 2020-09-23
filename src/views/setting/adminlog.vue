<!--  -->
<template>
<div class='signupList'>
  <div class="top">
    <el-input placeholder="请输入手机号" v-model="mobile">
      <template slot="prepend">手机号</template>
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
  <el-table :data="list" v-loading="loading" border stripe style="margin-top:20px" height="700">
    <el-table-column
      label="操作时间"
      prop="log_time"
    >
    </el-table-column>
    <el-table-column
      label="操作功能"
      prop="title"
    >
    </el-table-column>
    <el-table-column
      label="类型"
      prop="type_name"
    >
    </el-table-column>
    <el-table-column
      label="IP"
      prop="ip"
    >
    </el-table-column>
    <el-table-column
      label="操作人"
      prop="mobile"
    >
    </el-table-column>
    <el-table-column
      label="备注"
      prop="log_info"
    >
      <template slot-scope="scope">
        <el-button type="primary" size="small" @click.native="check(scope.row.log_info)">查看备注</el-button>
      </template>
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
      between_time: '',
      loading: false
    }
  },
  methods: {
    check (log) {
      this.$alert(log, '备注', {
        confirmButtonText: '确定'
      })
    },
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
      obj.mobile = this.mobile
      obj.between_time = time
      this.loading = true
      api.adminlog(obj).then(res => {
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
  }
}
</script>
<style lang='scss' scoped>
</style>
