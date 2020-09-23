<template>
<div class='conduct'>
  <div class="top">
    <el-input v-model="mobile" placeholder="手机号/邮箱/姓名">
      <template slot="prepend">
        手机号
      </template>
    </el-input>
    <el-button type="primary" size="small" style="margin-left:15px;" @click.native="search">搜索</el-button>
    <el-button type="primary" size="small" @click.native="edit(0)">设置用户等级</el-button>
  </div>
  <el-table :data="list" border stripe v-loading="loading" style="margin-top:20px;" height="700">
    <el-table-column
      prop="mobile"
      label="账号"
      >
    </el-table-column>
    <el-table-column
      prop="level"
      label="自然等级"
      >
    </el-table-column>
    <el-table-column
      prop="settle_level"
      label="结算等级"
      >
    </el-table-column>
    <el-table-column
      prop="settle_time"
      label="创建时间"
      >
    </el-table-column>
    <el-table-column
      label="操作"
      fixed="right"
      width="300"
      >
      <template slot-scope="data">
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
      page: 1
    }
  },
  methods: {
    del (id) {
      let obj = {}
      obj.id = id
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.settleDel(obj).then(res => {
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
        path: '/user/setnodelv',
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
      api.settleList(obj).then(res => {
        this.list = res.data.list
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
