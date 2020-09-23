<template>
  <div class='editNode container'>
    <div class="_title">
      添加/编辑线下社区用户
    </div>
    <el-divider/>
    <div class="item">
      <div class="head">
        登录账号:
      </div>
      <div class="body">
        <el-input :disabled="id != 0 ? true : false" v-model="info.mobile" placeholder="输入手机号"></el-input>
      </div>
    </div>
    <div class="item">
      <div class="head">
        线下社区奖励:
      </div>
      <div class="body">
        <el-input v-model="info.reward"></el-input>
      </div>
      <div class="foot">
        %， 获得该用户社区的所有用户的报名奖的百分比奖励
      </div>
    </div>
    <div class="item">
      <div class="head">
        推荐线下社区奖励:
      </div>
      <div class="body">
        <el-input v-model="info.recommend"></el-input>
      </div>
      <div class="foot">
        %， 获得最近线下社区的线下社区奖励的百分比
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
        reward: '',
        recommend: ''
      }
    }
  },
  methods: {
    add () {
      if (this.id != 0) {
        this.info.id = this.id
      }
      api.addcommunity(this.info).then(res => {
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
        reward: '',
        recommend: ''
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
      api.communitydetail({ id: this.id }).then(res => {
        let { data } = res
        let info = {
          mobile: data.mobile,
          reward: data.reward,
          recommend: data.recommend
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
      width: 160px;
      text-align: right;
      margin-right: 15px;
    }
    .body{
      width: 500px;
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
