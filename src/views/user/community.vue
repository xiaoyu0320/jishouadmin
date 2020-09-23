<template>
<div class='conduct'>
  <div class="top">
    <el-input v-model="mobile" placeholder="手机号">
      <template slot="prepend">
        手机号
      </template>
    </el-input>
    <el-button type="primary" size="small" style="margin-left:15px;" @click.native="search">搜索</el-button>
    <el-button type="primary" size="small" @click.native="edit(0)">添加线下社区用户</el-button>
  </div>
  <div style="margin-top: 15px;">
    <span style="margin-right:15px;">用户总数：{{count}}</span>
  </div>
  <el-table :data="list" border stripe v-loading="loading" style="margin-top:20px;" height="700">
    <el-table-column
      prop="mobile"
      label="账号"
      >
    </el-table-column>
    <el-table-column
      width="150"
      label="社区报名/有效次数"
      >
      <template slot-scope="data">
        <div>
          {{data.row.signup_count + '/' + data.row.signup_valid_count}}
        </div>
      </template>
    </el-table-column>
    <el-table-column
      width="110"
      prop="winning_count"
      label="社区中奖次数"
      >
    </el-table-column>
    <el-table-column
      prop="usdt_charge_total"
      label="社区总充币"
      width="120"
      >
    </el-table-column>
    <el-table-column
      prop="usdt_extract_total"
      label="社区总提币"
      width="120"
      >
    </el-table-column>
    <el-table-column
      label="线下社区奖励"
      width="120"
      >
       <template slot-scope="data">
        <div>
          {{data.row.reward + '%'}}
        </div>
      </template>
    </el-table-column>
    <el-table-column
      label="推荐下级奖励"
      width="120"
      >
       <template slot-scope="data">
        <div>
          {{data.row.recommend + '%'}}
        </div>
      </template>
    </el-table-column>
    <el-table-column
      width="200"
      prop="create_time"
      label="创建时间"
      >
    </el-table-column>
    <el-table-column
      label="操作"
      fixed="right"
      width="300"
      >
      <template slot-scope="data">
        <el-button size="small" type="primary" @click.native="check(data.row)">查看明细</el-button>
        <el-button size="small" type="primary" @click.native="edit(1, data.row)">编辑</el-button>
        <el-button type="danger" size="small" @click="del(data.row.id)">删除</el-button>
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
      total: 1,
      single: true,
      loading: false,
      list: [],
      mobile: '',
      page: 1,
      count: 0,
      allCash: 0
    }
  },
  methods: {
    check (item) {
      this.$router.push({
        path: '/user/query',
        query: {
          mobile: item.mobile
        }
      })
    },
    del (id) {
      let obj = {}
      obj.id = id
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.delcommunity(obj).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.list = []
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    search () {
      this.page = 1
      this.getList()
    },
    edit (type, item) {
      type = Number(type)
      this.$router.push({
        path: '/user/editcommunity',
        query: {
          id: type === 0 ? 0 : item.id
        }
      })
    },
    changePage (val) {
      this.page = val
      this.getList()
    },
    getList () {
      const obj = {}
      obj.mobile = this.mobile
      obj.page = this.page
      obj.pageSize = 15
      this.loading = true
      api.communitylist(obj).then(res => {
        this.list = res.data.list
        this.count = res.data.count
        this.allCash = res.data.all_cash
        this.total = res.data.count
        this.loading = false
      }, () => {
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
.top{
  display: flex;
  align-items: center
}
</style>
