<!--  -->
<template>
<div class='masked' @click="close">
  <div class="dialog" @click.stop="stopBubbling">
    <div class="title">添加币券</div>
    <div class="item">
      <div class="head">活动名称</div>
      <div class="body">
        <el-input v-model="name" placeholder="请输入活动名称"></el-input>
      </div>
    </div>
    <div class="item">
      <div class="head">发行数量</div>
      <div class="body">
        <el-input v-model="qty" type="number" placeholder="请输入发行数量"></el-input>
      </div>
    </div>
    <div class="item">
      <div class="head">领取有效时间</div>
      <div class="body">
        <el-date-picker
          v-model="time"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
    </div>
    <div class="item">
      <div class="head">面值</div>
      <div class="body">
        <el-input v-model="cost" type="number" placeholder="请输入面值"></el-input>
      </div>
      <div class="foot">
        epc
      </div>
    </div>
    <div class="item">
      <div class="head">每人限领</div>
      <div class="body">
        <el-input v-model="limit" type="number" placeholder="请输入每人限购数量"></el-input>
      </div>
      <div class="foot">张</div>
    </div>
    <div class="bottom-wrap">
        <el-button class="centerbutton" type="primary" plain @click.prevent="confirm">确认</el-button>
        <el-button class="centerbutton" plain @click.prevent="close">取消</el-button>
    </div>
  </div>
</div>
</template>

<script>
import * as api from 'api'
export default {
  components: {},
  data () {
    return {
      name: '',
      qty: '',
      start_time: '',
      end_time: '',
      cost: '',
      limit: 1, // 限购默认1
      time: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    close () {
      this.$emit('close', '')
    },
    confirm () {
      if (!this.name) {
        this.$message({
          type: 'warning',
          message: '请输入名称'
        })
        return false
      }
      if (this.qty == '') {
        this.$message({
          type: 'warning',
          message: '请输入数量'
        })
        return false
      }
      if (this.time == '') {
        this.$message({
          type: 'warning',
          message: '请选择时间'
        })
        return false
      }
      if (this.cost == '') {
        this.$message({
          type: 'warning',
          message: '请输入面值'
        })
        return false
      }
      if (this.limit == '') {
        this.$message({
          type: 'warning',
          message: '请输入限购数量'
        })
        return false
      }
      const obj = {
        name: this.name,
        qty: this.qty,
        start_time: new Date(this.time[0]).getTime() / 1000,
        end_time: new Date(this.time[1]).getTime() / 1000,
        cost: this.cost,
        limit: this.limit
      }
      api.couponAdd(obj).then(res => {
        this.$emit('confirm', '')
      })
    }
  },
  created () {
  }
}
</script>
<style lang='scss' scoped>
@import '../usermanage/dialog.scss';
.bottom-wrap{
  text-align: center;
  margin-top: 15px;
  .centerbutton{
    display: inline-block;
    margin: 0 10px;
  }
}
.foot{
  font-size: 12px;
  color: #999;
  margin-left: 10px;
}
</style>
