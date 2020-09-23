<!--  -->
<template>
<div class='entityasc' v-loading="loading">
  <div class="top">
    <el-input placeholder="@+手机号为完全匹配查询" v-model="mobile">
      <template slot="prepend">手机号</template>
    </el-input>
    <el-date-picker
      v-model="between_time"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    <el-select v-model="inOrOut" clearable placeholder="请选择收支">
      <el-option
        v-for="item in options"
        :key="item.key"
        :label="item.label"
        :value="item.key">
      </el-option>
    </el-select>
    <el-select v-model="reasontype" clearable placeholder="请选择类型">
      <el-option
        v-for="item in optreason"
        :key="item.key"
        :label="item.label"
        :value="item.key">
      </el-option>
    </el-select>
    <el-button type="primary" size="small" @click.native="search">搜索</el-button>
  </div>
  <el-table :data="list" border stripe style="margin-top:20px" height="700">
    <el-table-column
      label="交易时间"
      prop="createtime"
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
      label="当前余额"
      prop="real_balance"
    >
    </el-table-column>
    <el-table-column
      label="类型"
      prop="reasontype_name"
    >
    </el-table-column>
    <el-table-column
      label="账号"
      prop="mobile"
    >
    </el-table-column>
    <el-table-column
      label="备注"
      prop="memo"
    >
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
      hash: '',
      mobile: '',
      type: 2, // ASC明细
      page: 1,
      list: [],
      total: 1,
      single: true,
      loading: false,
      between_time: '',
      inOrOut: '',
      options: [
        {
          key: 0,
          label: '收入'
        },
        {
          key: 1,
          label: '支出'
        }
      ],
      reasontype: '',
      optreason: [
        {
          key: 3,
          label: 'USDT兑epc'
        },
        {
          key: 4,
          label: 'epc兑USDT'
        },
        {
          key: 5,
          label: '报名费'
        },
        {
          key: 6,
          label: '报名手续费'
        },
        {
          key: 7,
          label: '转币'
        },
        {
          key: 8,
          label: '收币'
        },
        {
          key: 9,
          label: '拼团收益'
        },
        {
          key: 10,
          label: '直推奖励'
        },
        {
          key: 11,
          label: '社区奖励'
        },
        {
          key: 12,
          label: '平超奖励 '
        },
        {
          key: 14,
          label: '节点奖励 '
        },
        {
          key: 15,
          label: '线下充币'
        },
        {
          key: 17,
          label: '手续费收益 '
        },
        {
          key: 18,
          label: '全网分红收益'
        },
        {
          key: 19,
          label: '寄售码兑换'
        },
        {
          key: 20,
          label: '推荐节点奖'
        },
        {
          key: 21,
          label: '线下社区奖'
        },
        {
          key: 22,
          label: '线下社区推荐奖'
        }
      ]
    }
  },
  methods: {
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
      obj.type = this.type
      obj.reasontype = this.reasontype
      obj.in_or_out = this.inOrOut
      this.loading = true
      api.financeList(obj).then(res => {
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
