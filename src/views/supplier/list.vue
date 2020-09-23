<!--  -->
<template>
<div class='app-container'>
   <div class="top">
      <el-button type="primary" size="small" @click.native="add">添加管理员</el-button>
   </div>
   <el-table :data="list" border stripe v-loading="loading" height="650px" class="mt20 mb20" >
        <el-table-column
          prop="id"
          label="编号"
          >
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="昵称"
          >
        </el-table-column>
        <el-table-column
          prop="pa"
          label="pa"
          >
        </el-table-column>
        <el-table-column
          prop="invite_code"
          label="邀请码"
          >
        </el-table-column>
         <el-table-column
          prop="title"
          label="所属角色"
          >
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="账号"
          >
        </el-table-column>

        <el-table-column
          label="操作"
          width="250px"
          >
          <template slot-scope="scope">
            <el-button type="primary" size="small"  v-if="scope.row.group_id!='1'" @click.native="isadmins(scope,0)">取消管理员</el-button>
            <el-button type="primary" size="small" v-if="scope.row.del_flag== '0'&&scope.row.group_id!='1'" @click.native="ban(scope,1)" style="margin-bottom:15px">禁用</el-button>
            <el-button type="primary" size="small" v-if="scope.row.del_flag== '1'&&scope.row.group_id!='1'" @click.native="ban(scope,0)" style="margin-bottom:15px">启用</el-button>
            <el-button type="primary" size="small" v-if="scope.row.group_id!='1'" @click="set(scope)">角色关联</el-button>
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
    <editpart v-if="dialogpart" :item="item"  @confirmDialog="confirmDialogPart"  @closeDiaglog="closeDiaglog"></editpart>
    <addAdmin v-if="dialogAdmin" @close="close"/>
</div>
</template>
<script>
import { getSupplierList, setCleanStatus, setAdmin } from 'api'
import editpart from '@c/role/editpart'
import addAdmin from '@c/role/addAdmin'
export default {
  components: {
    editpart, addAdmin
  },
  data () {
    return {
      name: '',
      account: '',
      list: [],
      page: 1,
      loading: false,
      single: false,
      total: 1,
      dialog: false,
      item: null,
      dialogpart: false,
      dialogAdmin: false
    }
  },
  methods: {
    close () {
      this.dialogAdmin = false
    },
    add () {
      this.dialogAdmin = true
    },
    confirmDialog () {
      this.dialog = false
      this.$message({
        type: 'success',
        message: '操作成功'
      })
      this.getList()
    },
    set (item) {
      this.item = item.row
      this.dialogpart = true
    },
    confirmDialogPart () {
      this.dialogpart = false
      this.$message({
        type: 'success',
        message: '操作成功'
      })
      this.getList()
    },
    closeDiaglog () {
      this.item = null
      this.dialog = false
      this.dialogpart = false
    },
    edit (item) {
      this.item = null
      this.item = item.row
      this.dialog = true
    },
    ban (item, type) {
      let text = type == 0 ? `是否确认启用该管理员` : `是否禁用启用该管理员`
      this.$confirm(text, {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(res => {
        setCleanStatus({ managerUid: item.row.uid, del_flag: type }).then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.getList()
        })
      })
    },
    isadmins (item, type) {
      let text = type == 0 ? `确认取消该管理员吗` : `确认启用该管理员吗`
      this.$confirm(text, {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(res => {
        setAdmin({ managerUid: item.row.uid, isadmin: type }).then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.getList()
        })
      })
    },
    getList () {
      this.loading = true
      getSupplierList({ page: this.page }).then(res => {
        this.list = res.data.list
        this.total = res.data.count
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    changePage (val) {
      this.page = val
      this.getList()
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
    align-items: center;
    .el-input{
      width: 400px;
      margin-right: 20px;
    }
  }
</style>
