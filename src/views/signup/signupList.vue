<!--  -->
<template>
<div class='signupList' v-loading="loading">
  <div class="top">
    <div style="padding-bottom: 15px;">
      <el-input placeholder="请输入手机号" v-model="mobile">
        <template slot="prepend">手机号</template>
      </el-input>
      <el-input placeholder="请输入报名编码" v-model="number">
        <template slot="prepend">报名编码</template>
      </el-input>
      <el-input placeholder="请输入开奖场次" v-model="scene">
        <template slot="prepend">开奖场次</template>
      </el-input>
      <el-select v-model="status" clearable placeholder="请选择状态">
        <el-option
          v-for="item in options"
          :key="item.key"
          :label="item.label"
          :value="item.key">
        </el-option>
      </el-select>
    </div>
    <el-date-picker
      v-model="between_time"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    <el-button type="primary" size="small" @click.native="search">搜索</el-button>
  </div>
  <div style="display:flex;margin-top: 20px;">
    <div>主号总报名次数：{{pid_sum}}</div>
    <div style="padding-left: 15px;">子号总报名次数：{{uid_sum}}</div>
  </div>
  <el-table :data="list" border stripe style="margin-top:20px" height="700">
    <el-table-column
      label="报名编码"
      prop="number"
    >
    </el-table-column>
    <el-table-column
      label="开奖场次"
      prop="scene"
    >
    </el-table-column>
    <el-table-column
      label="报名账号"
      prop="account"
    >
    </el-table-column>
    <el-table-column
      label="报名费"
      prop="price"
    >
    </el-table-column>
    <el-table-column
      label="手续费"
      prop="service_fee"
    >
    </el-table-column>
    <el-table-column
      label="状态"
      prop="status_name"
    >
    </el-table-column>
    <el-table-column
      label="报名时间"
      prop="create_time"
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
      mobile: '',
      page: 1,
      list: [],
      total: 1,
      single: true,
      loading: false,
      number: '',
      between_time: '',
      status: '',
      scene: '',
      options: [
        {
          key: 0,
          label: '待开团'
        },
        {
          key: 1,
          label: '已中签'
        },
        {
          key: 2,
          label: '未中签'
        },
        {
          key: 3,
          label: '拼团失败'
        },
        {
          key: 4,
          label: '开团中'
        }
      ],
      pid_sum: '0',
      uid_sum: '0'
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
      obj.mobile = this.mobile
      obj.number = this.number
      obj.status = this.status
      obj.scene = this.scene
      obj.between_time = time
      this.loading = true
      api.signupList(obj).then(res => {
        this.list = res.data.list
        this.total = res.data.count
        this.uid_sum = res.data.uid_sum
        this.pid_sum = res.data.pid_sum
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
