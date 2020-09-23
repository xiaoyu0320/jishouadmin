<!--  -->
<template>
  <div class='masked' @click="close">
    <div class="dialog" @click.stop="stopBubbling">
      <i class="el-icon-close" @click="close"></i>
      <div class="title">查看子账号</div>
      <div class="body">
        <el-table :data="list" height="400">
          <el-table-column property="mobile" label="账号"></el-table-column>
          <el-table-column property="usdt" label="USDT余额"></el-table-column>
          <el-table-column property="asc" label="epc余额"></el-table-column>
          <el-table-column property="draw_count" label="中奖次数"></el-table-column>
          <el-table-column property="status_name" label="状态"></el-table-column>
          <el-table-column property="create_time" label="创建时间"></el-table-column>
        </el-table>
        <el-pagination
          style="margin-top: 20px"
          background
          layout="prev, pager, next"
          :hide-on-single-page="single"
          @current-change="changePage"
          :page-size="15"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from 'api'
export default {
  props: {
    uuid: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      list: [],
      total: 1,
      single: true,
      page: 1
    }
  },
  methods: {
    changePage (val) {
      this.page = val
      this.getList()
    },
    close () {
      this.$emit('close', true)
    },
    getList () {
      api.childList({ uuid: this.uuid, page: this.page }).then(res => {
        const { data: { list, count } } = res
        this.list = list
        this.total = count
      }).catch(() => {
        this.$emit('close', true)
      })
    }
  },
  created () {
    this.getList()
  }
}
</script>
<style lang='scss' scoped>
@import '../usermanage/dialog.scss';
</style>
