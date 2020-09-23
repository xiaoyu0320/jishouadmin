<template>
  <div class='editNode container'>
    <div class="_title">
      设置用户等级
    </div>
    <el-divider/>
    <div class="item">
      <div class="head">
        手机号:
      </div>
      <div class="body">
        <el-input :disabled="id != 0 ? true : false" v-model="info.mobile" placeholder="输入手机号"></el-input>
      </div>
    </div>
    <div class="item">
      <div class="head">
        社区等级:
      </div>
      <div class="body">
        <el-select v-model="info.settle_level" placeholder="选择等级">
          <el-option
            v-for="item in options"
            :key="item.key"
            :label="item.label"
            :value="item.key">
          </el-option>
        </el-select>
      </div>
      <div class="foot">
        该等级只用于结算，不作为用户前台展示，如果自然等级比较高结算使用自然等级
      </div>
    </div>
    <div style="text-align: center;margin-top: 100px;">
      <el-button type="primary" size="medium" @click.native="confirm">确认</el-button>
    </div>
  </div>
</template>
<script>
import * as api from 'api'
export default {
  components: {},
  data () {
    // 这里存放数据
    return {
      id: '',
      info: {
        mobile: '',
        settle_level: ''
      },
      options: [{
        key: '1',
        label: 'v1'
      },
      {
        key: '2',
        label: 'v2'
      },
      {
        key: '3',
        label: 'v3'
      },
      {
        key: '4',
        label: 'v4'
      },
      {
        key: '5',
        label: 'v5'
      },
      {
        key: '6',
        label: '合伙人'
      }]
    }
  },
  methods: {
    add () {
      if (this.id != 0) {
        this.info.id = this.id
      }
      api.setSettle(this.info).then(res => {
        this.$message({
          type: 'success',
          message: '操作成功'
        })
        if (this.id == 0) {
          this.init()
        }
      })
    },
    init () {
      const info = {
        mobile: '',
        settle_level: ''
      }
      this.info = info
    },
    confirm () {
      this.add()
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.id = Number(this.$route.query.id) !== 0 ? Number(this.$route.query.id) : 0
    if (this.id != 0) {
      api.settleDetail({ id: this.id }).then(res => {
        let { data } = res
        let info = {
          mobile: data.mobile,
          settle_level: data.settle_level
        }
        this.info = info
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.container{
  width: 100%;
  height: 100%;
  position: absolute;
  overflow-y: auto;
  top: 0;
  left: 0;
  background: #fff;
  padding: 40px;
  box-sizing: border-box;
  z-index: 1002;
  .close{
    font-size: 32px;
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .item{
    display: flex;
    margin-bottom:20px;
    align-items: center;
    .head{
      width: 120px;
      text-align: right;
      margin-right: 15px;
    }
    .body{
      overflow: hidden;
      display: flex;
      align-items: center;
      .tips{
        font-size: 12px;
        color: #999;
      }
    }
    .foot{
      margin-left: 20px;
    }
  }
}
</style>
