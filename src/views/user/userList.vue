<!--  -->
<template>
<div class='userList app-container'>
  <div class="top mb10">
    <el-input placeholder="请输入手机号" v-model="mobile">
      <template slot="prepend">手机号</template>
    </el-input>
    <el-button type="primary" size="small" @click.native="search">搜索</el-button>
  </div>
  <div class="dp-flex mb10 fl-wrap">
    <div style="padding-right: 20px;">主/子号总数：{{all.main_account_count + '/' + all.son_account_count}}</div>
    <div style="padding-right: 20px;">昨日新增主/子号总数：{{yesterday.main_account_count + '/' + yesterday.son_account_count}}</div>
    <div>今日新增主/子号总数：{{today.main_account_count + '/' + today.son_account_count}}</div>
  </div>
  <el-table :data="list" v-loading="loading" border stripe height="700">
    <el-table-column
      label="账号"
      width="250"
    >
      <template slot-scope="scope">
        <div>
          <div>{{scope.row.mobile}}{{scope.row.type == 1 ? '(子账号)' : ''}}</div>
          <div>上级：{{scope.row.p_mobile}}</div>
          <div>社区等级：{{scope.row.level_name}}</div>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      label="USDT余额"
      prop="usdt"
    >
    </el-table-column>
      <el-table-column
      label="总充币/提币"
    >
      <template slot-scope="scope">
          {{scope.row.usdt_charge_total}}/{{scope.row.usdt_extract_total}}
      </template>
    </el-table-column>
    <el-table-column
      label="epc余额"
      prop="asc"
    >
    </el-table-column>
    <el-table-column
      label="主/子报名"
    >
     <template slot-scope="scope">
         {{scope.row.signup_count}}/{{scope.row.signup_child_count}}
      </template>
    </el-table-column>
    <el-table-column
      label="主/子中奖"
    >
     <template slot-scope="scope">
         {{scope.row.winning_count}}/{{scope.row.winning_child__count}}
      </template>
    </el-table-column>
    <el-table-column
      label="直推账号"
      prop="push"
    >
      <template slot-scope="scope">
        <div style="display:flex;">
          <div>{{scope.row.push}}</div>
          <div v-if="scope.row.child != 0">/{{scope.row.child}}</div>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      label="创建时间"
      prop="create_time"
    >
    </el-table-column>
    <el-table-column
      label="操作"
      width="380px"
    >
      <template slot-scope="scope">
        <el-button
          type="danger"
          size="small"
          @click="frzzen(1, scope.row.id)"
          v-if="scope.row.is_disable == 0"
        >禁用</el-button>
        <el-button
          type="primary"
          size="small"
          @click="frzzen(0, scope.row.id)"
          v-if="scope.row.is_disable == 1"
        >启用</el-button>
        <el-button
          type="danger"
          size="small"
          @click="lock(1, scope.row.id)"
          v-if="scope.row.is_lock == 0"
        >中奖锁</el-button>
        <el-button
          type="primary"
          size="small"
          @click="lock(0, scope.row.id)"
          v-if="scope.row.is_lock == 1"
        >中奖解锁</el-button>
        <el-button
          type="primary"
          size="small"
          @click="child(scope.row)"
        >查看子账号</el-button>
        <el-button
          type="primary"
          size="small"
          @click="alert(scope.row)"
        >提币预警</el-button>
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
  <checkchild v-if="dialogchild" @close="close" :uuid="uuid" />
  <user-alert v-if="dialogalert" @close="close" :uuid="uuid"/>
</div>
</template>

<script>
import * as api from 'api'
export default {
  components: {
    checkchild: () => import('@c/user/checkchild'),
    userAlert: () => import('@c/user/userAlert')
  },
  data () {
    return {
      mobile: '',
      page: 1,
      list: [],
      total: 1,
      single: true,
      loading: false,
      uuid: '',
      dialogchild: false,
      dialogalert: false,
      all: {
        main_account_count: 0,
        son_account_count: 0
      },
      yesterday: {
        main_account_count: 0,
        son_account_count: 0
      },
      today: {
        main_account_count: 0,
        son_account_count: 0
      }
    }
  },
  methods: {
    getcounts () {
      api['countList']({}).then(res => {
        const { data } = res
        this.all = data.all
        this.yesterday = data.yesterday
        this.today = data.today
      })
    },
    alert (item) {
      this.uuid = item.uid
      this.dialogalert = true
    },
    close () {
      this.uuid = ''
      this.dialogchild = false
      this.dialogalert = false
    },
    child (item) {
      this.uuid = ''
      this.uuid = item.uid
      this.dialogchild = true
    },
    isadmins (item, type) {
      let text = type == 0 ? `确认取消该管理员吗` : `确认启用该管理员吗`
      this.$confirm(text, {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(res => {
        api.setAdmin({ managerUid: item.row.uid, isadmin: type }).then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    lock (op, id) {
      let text = op == 1 ? '是否锁住当前账户' : '是否解锁当前账户'
      this.$confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (op == 0) {
          api.unlock({
            ids: id
          }).then(res => {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.search()
          })
        } else {
          api.lock({
            ids: id
          }).then(res => {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.search()
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    frzzen (op, id) {
      let text = op == 1 ? '是否禁用当前账户' : '是否启用当前账户'
      this.$confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.setUserStatus({
          del_flag: op,
          id: id
        }).then(res => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.search()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
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
      this.loading = true
      api.userList({ page: this.page, mobile: this.mobile }).then(res => {
        let tmp = []
        res.data.list.map(item => {
          let obj = {
            mobile: item.mobile,
            p_mobile: item.p_mobile,
            level_name: item.level_name,
            usdt: item.usdt,
            usdt_charge_total: item.usdt_charge_total,
            usdt_extract_total: item.usdt_extract_total,
            asc: item.asc,
            signup_count: item.signup_count,
            signup_child_count: item.signup_child_count,
            id: item.id,
            uid: item.uid,
            push: item.push,
            child: item.child,
            winning_child__count: item.winning_child__count,
            winning_count: item.winning_count
          }
          tmp.push(obj)
        })
        this.list = Object.freeze(res.data.list)
        this.total = res.data.count
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  },
  created () {
    this.getList()
    this.getcounts()
  }
}
</script>
