<!--  -->
<template>
<div class='app-container'>
    <div class="powerlist">
      <el-button type="primary" size="medium" @click="edit(0)" class="mb20">添加菜单</el-button>
      <el-table :data="list" :row-key="getRowKeys" border stripe v-loading="loadding">
        <el-table-column
          prop="id"
          label="ID"
          >
        </el-table-column>
        <el-table-column
          prop="title"
          label="权限名称"
          >
        </el-table-column>
        <el-table-column
          prop="router_name"
          label="路由名称"
          >
        </el-table-column>
         <el-table-column
          prop="name"
          label="控制器方法"
          >
        </el-table-column>
        <el-table-column
          prop="status_name"
          label="状态"
          >
        </el-table-column>
        <el-table-column
          label="操作"
        >
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="edit(1,scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="edit(2,scope.row.id)">删除</el-button>
        </template>
        </el-table-column>
      </el-table>
    </div>
    <dialogPower v-if="dialogFlag" :parentList="list" :item="item" :type="type" @confirmDialog="confirmDialog"  @closeDiaglog="closeDiaglog"></dialogPower>
</div>
</template>

<script>
import { AuthMenuList, authMenuDelete } from 'api'
import dialogPower from '@c/usermanage/dialogpower'
export default {
  components: {
    dialogPower
  },
  data () {
    return {
      list: [],
      loadding: false,
      item: null,
      type: 0,
      dialogFlag: false,
      expand: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 获取row的key值
    getRowKeys (row) {
      return row.id
    },
    getAuthMenuList () {
      this.loadding = true
      AuthMenuList({}).then(res => {
        this.list = res.data.list
        // this.expand.push(this.list[3].id)
        this.loadding = false
      })
    },
    closeDiaglog () {
      this.dialogFlag = false
    },
    confirmDialog () {
      this.dialogFlag = false
      const text = this.type == 0 ? '添加成功' : '修改成功'
      this.$message({
        type: 'success',
        message: text
      })
      this.getAuthMenuList()
    },
    edit (type, item) {
      switch (type) {
        case 0:
          this.item = null
          this.type = 0
          this.dialogFlag = true
          break
        case 1:
          this.item = null // 防止不必要的麻烦
          this.item = item
          this.type = 1
          this.dialogFlag = true
          break
        case 2:
          this.$confirm('确认删除', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          }).then(res => {
            authMenuDelete({ id: Number(item) }).then(res => {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getAuthMenuList()
            })
          })
          break
      }
    }
  },
  created () {
    this.getAuthMenuList()
  }
}
</script>
<style lang='scss' scoped>
</style>
