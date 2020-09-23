<!--  -->
<template>
<div class='drawLogList app-container'>
  <div class="top">
    <el-input style="width:300px" placeholder="输入手机号" v-model="mobile">
      <template slot="prepend">手机号</template>
    </el-input>
    <el-input style="margin-left: 15px;width:300px" placeholder="中奖次数" v-model="count">
      <template slot="prepend">中奖次数</template>
    </el-input>
    <el-input v-model="minday" style="margin-left: 15px;width:160px" placeholder="锁住天数开始"></el-input>到
    <el-input v-model="maxday" style="width:160px"  placeholder="锁住天数截止"></el-input>
    <el-select v-model="type" clearable placeholder="全部账号">
      <el-option
        v-for="item in options"
        :key="item.key"
        :label="item.label"
        :value="item.key">
      </el-option>
    </el-select>
    <el-checkbox v-model="isFirst">首次报名用户</el-checkbox>
    <el-button type="primary" size="small" @click.native="search">搜索</el-button>
  </div>
  <div>总人数：{{all}}</div>
  <el-table :data="list"  v-loading="loading"  border stripe style="margin-top:20px" height="650" @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="account"
      label="账号"
    >
    </el-table-column>
    <el-table-column
      prop="level_name"
      label="社区等级"
    >
    </el-table-column>
    <el-table-column
      label="中奖次数"
      prop="count"
    >
    </el-table-column>
    <el-table-column
      label="已锁天数"
      prop="days"
    >
    </el-table-column>
    <el-table-column
      label="最后一次中奖纪录"
      prop="drawTime"
    >
    </el-table-column>
    <el-table-column
      label="操作"
      width="200px"
    >
      <template slot-scope="scope">
        <el-button
          type="danger"
          size="small"
          @click="frzzen(1, scope.row.user_id)"
          v-if="scope.row.is_lock == 0"
        >锁住</el-button>
        <el-button
          type="primary"
          size="small"
          @click="frzzen(0, scope.row.user_id)"
          v-if="scope.row.is_lock == 1"
        >解锁</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="dp-flex" style="align-items: center;justify-content: space-between;margin-top:20px;">
    <el-button type="primary" size="mini" @click="unlock">批量解锁</el-button>
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
      mobile: '',
      page: 1,
      list: [],
      total: 1,
      single: true,
      count: '',
      minday: '',
      maxday: '',
      ids: [],
      all: '',
      loading: false,
      type: '2',
      options: [
        {
          key: '2',
          label: '全部账号'
        },
        {
          key: '0',
          label: '主号'
        },
        {
          key: '1',
          label: '子号'
        }
      ],
      isFirst: false
    }
  },
  methods: {
    unlock () {
      if (this.ids.length == 0) {
        this.$message.error('请先选择需要进行解锁的账号')
        return
      }
      this.frzzen(0, this.ids)
    },
    handleSelectionChange(val) {
      this.ids = []
      val.forEach(item => {
        this.ids.push(item.user_id)
      })
      this.ids = this.ids.join(',')
    },
    frzzen (op, id) {
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
    changePage (val) {
      this.page = val
      this.getList()
    },
    search () {
      this.page = 1
      this.getList()
    },
    getList () {
      let betweenday = ''
      betweenday = this.minday + '-' + this.maxday
      const obj = {}
      obj.page = this.page
      obj.mobile = this.mobile
      obj.count = this.count
      obj.between_day = betweenday
      obj.type = this.type
      obj.is_first = this.isFirst ? '1' : '0'
      this.loading = true
      api.drawList(obj).then(res => {
        this.list = res.data.list
        this.total = res.data.count
        this.all = res.data.all
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
.top{
  margin-bottom: 20px;
}
</style>
