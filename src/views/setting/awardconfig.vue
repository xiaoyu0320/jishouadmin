<!--  -->
<template>
  <div class="app-container" v-loading="loading">
    <el-form
    v-if="list.length != 0"
      :inline="true"
      class="formData"
    >
      <el-form-item
        v-for="item in list"
        :label="item.name"
        :key="item.key"
        v-show="item.name"
        class="poso-absoluete"
      >
        <div v-if="item.key == 'level'">
          <div class="item" v-for="(lv, index) in item.value" :key="'lv' + index">
            <div class="name">{{lv.name + '：'}}</div>
            <div style="padding-right: 10px;">直推</div>
            <el-input v-model="lv.push_num"></el-input>
            <div style="padding: 0 10px;">
              人 <el-checkbox v-model="lv.sub_account1"></el-checkbox>含子账号
            </div>
            <div style="width: 52.88px;" v-if="index != 0">直推LV{{index}}</div>
              <el-input v-if="index == 1" v-model="lv.push_num_lv1"></el-input>
              <el-input v-if="index == 2" v-model="lv.push_num_lv2"></el-input>
              <el-input v-if="index == 3" v-model="lv.push_num_lv3"></el-input>
              <el-input v-if="index == 4" v-model="lv.push_num_lv4"></el-input>
              <el-input v-if="index == 5" v-model="lv.push_num_lv5"></el-input>
            <div>
              <span v-if="index != 0">人</span>{{list[2].value == 2 ? '， 团队业绩' : '， 团队人数'}}<el-input v-model="lv.sub_num"></el-input>{{list[2].value == 2 ? 'epc' : '人'}}
            </div>
            <div>
              ，含<el-checkbox v-model="lv.sub_account"></el-checkbox>子账号,
            </div>
            <div>
              奖励<el-input v-model="lv.value"></el-input>%，获得报名奖的百分比奖励 <span v-if="index == 5">，再平分</span>
            </div>
          </div>
        </div>
        <div v-else-if="item.key == 'recalc'">
          <el-radio v-model="item.value" label="0">不启用</el-radio>
          <el-radio v-model="item.value" label="1">按当天参与拼团人数</el-radio>
          <el-radio v-model="item.value" label="2">按当天参与拼团业绩</el-radio>
        </div>
        <div v-else >
          <el-input
            v-model="item.value"
            placeholder="请输入规则"
          ></el-input>
        </div>
        <label class="pos-lable">{{item.remarks}}</label>
      </el-form-item>
    </el-form>
    <div class="button-wrap">
      <el-button class="centerbutton" type="primary" plain @click.prevent="confirm">确认</el-button>
    </div>
  </div>
</template>

<script>
import * as api from 'api'
export default {
  components: {},
  data() {
    return {
      loading: false,
      list: []
    }
  },
  computed: {},
  methods: {
    // 确认修改奖励配置
    confirm() {
      let ascInfo = JSON.stringify(this.list)
      let obj = {
        data: ascInfo
      }
      api.editAwardsPost(obj).then(res => {
        this.$message({
          showClose: true,
          type: 'success',
          message: res.msg
        })
        this.getList()
      })
    },
    // 获取奖励配置
    getList() {
      this.loading = true
      api.awardsList({}).then(res => {
        if (res.data.list.length != 0) {
          let deepData = res.data.list
          for (let i = 0; i < deepData.length; i++) {
            if (deepData[i]['name'] === '社区等级及奖励设置') {
              deepData[i].value = JSON.parse(deepData[i].value)
            }
          }
          this.list = deepData
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  },
  created() {
    this.getList()
  }
}
</script>
<style lang='scss' scoped>
.app-container {
  .item {
    padding-bottom: 20px;
    display: flex;
    .name{
      width: 70px;
    }
  }
}
.button-wrap {
  text-align: center;
  margin-top: 30px;
  .centerbutton {
    display: inline-block;
    margin: 0 10px;
  }
}
.el-form--inline .el-form-item {
  display: flex;
}
.el-form {
  /deep/ .el-form-item__content{
    display: flex;
  }
  /deep/ .el-form-item__label {
    width: 150px;
  }
  /deep/ .pos-lable {
    color: #999;
    margin-left: 20px;
  }
}
.el-input {
  width: 100px;
  /deep/ .el-input__inner {
    width: 100px;
  }
}
</style>
