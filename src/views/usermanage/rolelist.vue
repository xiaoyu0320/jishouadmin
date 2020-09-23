<!--  -->
<template>
<div class='app-container'>
   <div class="rolelist">
     <el-button type="primary" size='medium' @click="edit(0)">新建角色</el-button>
     <el-table :data="list" border stripe style="margin-top:20px" v-loading="loading">
       <el-table-column
         prop="id"
         label="ID"
         >
       </el-table-column>
       <el-table-column
         prop="title"
         label="角色"
         >
       </el-table-column>
       <el-table-column
         label="状态"
         >
         <template slot-scope="scope">
           <el-button size="medium" type="small" v-if="scope.row.status==0&&scope.row.id!=1" @click.native="editStatus(scope.row,1)">开启</el-button>
           <el-button size="medium" type="small" v-if="scope.row.status==1&&scope.row.id!=1" @click.native="editStatus(scope.row,0)">关闭</el-button>
           <p v-if="scope.row.id==1">管理员</p>
         </template>
       </el-table-column>
       <el-table-column
         label="操作"
         >
         <template slot-scope="scope">
           <el-button size="small" v-if="scope.row.id!=1" type="primary" @click.native="auth(scope.row)">授权</el-button>
           <el-button size="small" v-if="scope.row.id!=1" plain @click.native="edit(1, scope.row)">编辑</el-button>
           <p v-if="scope.row.id==1">管理员</p>
         </template>
       </el-table-column>
     </el-table>
   </div>
   <editrole v-if="dialogFlag" :item="item" :type="type" @confirmDialog="confirmDialog"  @closeDiaglog="closeDiaglog"></editrole>
   <editrule v-if="dialogRule" :item="item" @confirmDialog="confirmAuth"  @closeDiaglog="closeAuth"></editrule>
</div>
</template>

<script>
import { AuthGroupList, AuthEditGroupPost } from 'api'
import editrole from '@c/role/editrole'
import editrule from '@c/role/editrule'
export default {
  components: {
    editrole, editrule
  },
  data () {
    return {
      rolename: '',
      list: [],
      item: null,
      type: 0,
      dialogFlag: false,
      dialogRule: false,
      loading: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    editStatus (item, type) {
      const obj = {
        'id': item.id,
        'status': type,
        'title': item.title
      }
      AuthEditGroupPost(obj).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        this.getAuthGroupList()
      })
    },
    edit (type, item) {
      this.item = null
      this.dialogFlag = true
      this.type = type
      if (type == 1) {
        this.item = item
      }
    },
    confirmDialog () {
      this.dialogFlag = false
      const text = this.type == 0 ? '添加成功' : '修改成功'
      this.$message({
        type: 'success',
        message: text
      })
      this.getAuthGroupList()
    },
    closeDiaglog () {
      this.dialogFlag = false
    },
    confirmAuth () {
      this.dialogRule = false
      this.$message({
        type: 'success',
        message: '权限修改成功，下次登录生效'
      })
    },
    closeAuth () {
      this.dialogRule = false
    },
    auth (item) {
      this.item = null
      this.item = item
      this.dialogRule = true
    },
    getAuthGroupList () {
      this.loading = true
      AuthGroupList({ path: -1 }).then(res => {
        this.loading = false
        this.list = res.data.list
      })
    }
  },
  created () {
    this.getAuthGroupList()
  }
}
</script>
<style lang='scss' scoped>
</style>
