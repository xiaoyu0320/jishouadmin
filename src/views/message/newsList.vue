<!--  -->
<template>
<div class='app-container'>
   <div class="rolelist">
     <el-table :data="list" border stripe style="margin-top:20px" height="700" v-loading="loading">
       <el-table-column
         prop="create_time"
         label="发布时间"
         >
       </el-table-column>
       <el-table-column
         prop="title"
         label="标题"
         >
       </el-table-column>
       <el-table-column
         label="操作"
         >
         <template slot-scope="scope">
           <el-button size="small" plain @click.native="edit(scope.row.id)">编辑</el-button>
           <el-button type="danger" size="small" @click="del(scope.row.id)">删除</el-button>
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
</div>
</template>

<script>
import * as api from 'api'
export default {
  data () {
    return {
      list: [],
      type: 0,
      loading: false,
      page: 1,
      total: 1,
      single: true
    }
  },
  methods: {
    edit (id) {
      this.$router.push({
        path: '/message/newsIssue',
        query: {
          id: id
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
        api.newsDelete(obj).then(res => {
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
    changePage (val) {
      this.page = val
      this.getList()
    },
    getList () {
      this.loading = true
      api.newsLists({ page: this.page }).then(res => {
        this.loading = false
        this.list = res.data.list
        this.total = res.data.count
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
