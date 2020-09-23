<!--  -->
<template>
<div class='entityasc' v-loading="loading">
  <div class="top">
    <el-input placeholder="交易哈希值" v-model="hash">
      <template slot="prepend">交易哈希</template>
    </el-input>
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
    <el-button type="primary" size="small" @click="add">epc充提</el-button>
  </div>
  <el-table :data="list" border stripe style="margin-top:20px" height="700">
    <el-table-column
      label="交易时间"
      prop="create_time"
    >
    </el-table-column>
    <el-table-column
      label="交易数量"
      prop="coin"
    >
      <template slot-scope="data">
        <div>
          {{data.row.in_or_out == 0 ? '+' : '-'}}
          {{data.row.coin}}
        </div>
      </template>
    </el-table-column>
    <el-table-column
      label="充提账号"
      prop="account"
    >
    </el-table-column>
    <el-table-column
      label="交易类型"
      prop="type_name"
    >
    </el-table-column>
    <el-table-column
      label="状态"
      prop="status_name"
    >
    </el-table-column>
    <el-table-column
      label="备注"
      prop="memo"
    >
    </el-table-column>
    <el-table-column
      label="拒绝理由"
      prop="remark"
    >
    </el-table-column>
    <el-table-column
      label="操作人"
      width="150"
    >
      <template slot-scope="scope">
        <div>
          <div>{{scope.row.admin_mobile}}创建</div>
          <div>{{scope.row.auditor_mobile}}审核</div>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          v-if="scope.row.status == 0"
          @click="audit(scope.row.id)"
          type="primary"
          size="small">
          审核
        </el-button>
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
  <editaudit v-if="dialogeditAudit" @close="close"/>
  <audit v-if="dialogaudit" :id="id" @close="close" />
</div>
</template>

<script>
import * as api from 'api'
export default {
  components: {
    editaudit: () => import('@c/finance/editasc'),
    audit: () => import('@c/finance/auditasc')
  },
  data () {
    return {
      hash: '',
      mobile: '',
      page: 1,
      list: [],
      total: 1,
      single: true,
      loading: false,
      between_time: '',
      dialogeditAudit: false,
      dialogaudit: false,
      id: ''
    }
  },
  methods: {
    audit (id) {
      this.id = id
      this.dialogaudit = true
    },
    close () {
      this.id = ''
      this.dialogaudit = false
      this.dialogeditAudit = false
      this.getList()
    },
    add () {
      this.dialogeditAudit = true
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
      obj.hash = this.hash
      obj.mobile = this.mobile
      obj.between_time = time
      obj.trade_type = 2
      this.loading = true
      api.auditList(obj).then(res => {
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
