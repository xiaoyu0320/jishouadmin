<!--  -->
<template>
<div class='entityasc' v-loading="loading">
  <div class="top">
    <el-input class="mb10" placeholder="请输入手机号" v-model="mobile">
      <template slot="prepend">手机号</template>
    </el-input>
    <el-input class="mb10" placeholder="交易哈希值" v-model="hash">
      <template slot="prepend">交易哈希</template>
    </el-input>
    <el-select class="mb10" v-model="status" clearable placeholder="交易状态">
      <el-option
        v-for="item in options"
        :key="item.key"
        :label="item.label"
        :value="item.key">
      </el-option>
    </el-select>
    <el-date-picker
      class="mb10"
      v-model="between_time"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    <el-button type="primary" size="small" @click.native="search">搜索</el-button>
    <!-- <el-button type="primary" size="small" @click="add">USDT充提</el-button> -->
  </div>
  <div class="mb10">
    <div>提币待审数量：{{amount}}USDT</div>
  </div>
  <el-table :data="list" border stripe height="700">
    <el-table-column
      label="交易时间"
      prop="create_time"
      width="160"
    >
    </el-table-column>
    <el-table-column
      label="交易哈希"
      prop="hash"
    >
      <template slot-scope="data">
        <el-popover placement="top-start" width="360" trigger="hover" :content="data.row.hash">
          <div slot="reference">{{maskAddress(data.row.hash)}}</div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="交易数量"
      prop="coin"
      width="140"
    >
      <template slot-scope="data">
        <div>
          {{data.row.in_or_out == 0 ? '+' : '-'}}
          {{data.row.coin}}
        </div>
      </template>
    </el-table-column>
    <el-table-column
      label="链上状态"
      prop="trading_status_name"
    >
    </el-table-column>
    <el-table-column
      label="充提账号及上级"
      width="200"
    >
      <template slot-scope="data">
        <div>
          <div>{{data.row.account}}</div>
          <div>上级：{{data.row.parent}}</div>
          <div>节点：{{data.row.my_node}}</div>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      label="交易类型"
      prop="type_name"
      width="140"
    >
    </el-table-column>
    <el-table-column
      label="状态"
      prop="status_name"
      width="160"
    >
      <template slot-scope="data">
        <div class="dp-flex">
          <div style="width: 60px;">{{data.row.status_name}}</div>
          <el-tooltip v-if="data.row.is_alert == 1" class="item" effect="dark" :content="data.row.alert_msg" placement="top">
            <el-button type="danger" plain size="mini">预警<i class="el-icon-warning el-icon--right"></i></el-button>
          </el-tooltip>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      label="备注"
      prop="memo"
      width="160"
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
          @click="audit(scope.row)"
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
    editaudit: () => import('@c/finance/editaudit'),
    audit: () => import('@c/finance/audit')
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
      id: '',
      options: [
        {
          key: 0,
          label: '待审核'
        },
        {
          key: 1,
          label: '审核通过'
        },
        {
          key: 2,
          label: '审核失败'
        }
      ],
      status: '',
      amount: 0
    }
  },
  methods: {
    pendingUsdt () {
      api.pendingUsdt({}).then(res => {
        this.amount = res.data.amount
      })
    },
    audit (item) {
      this.$router.push({
        path: '/finance/auditUsdt',
        query: {
          id: item.id
        }
      })
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
      obj.status = this.status
      obj.trade_type = 1
      this.loading = true
      api.auditList(obj).then(res => {
        this.list = Object.freeze(res.data.list)
        this.total = res.data.count
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  },
  created () {
    this.pendingUsdt()
    this.getList()
  }
}
</script>
<style lang='scss' scoped>
</style>
