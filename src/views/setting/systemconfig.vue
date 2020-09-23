<template>
  <div class="AscConfig app-container" v-loading="loading">
    <el-form
      :inline="true"
      class="formData"
    >
      <el-form-item
        v-for="item in AscList"
        :label="item.name"
        :key="item.key"
        v-show="item.name"
        class="poso-absoluete"
      >

        <div v-if="item.key == 'serviceFeeType'" style="margin-right:15px">
            <template >
              <el-radio v-model="item.value" label="1">百分比</el-radio>
              <el-radio v-model="item.value" label="2">固定值</el-radio>
            </template>
        </div>
        <div v-if="item.type == 1 && item.key != 'serviceFeeType'">
          <el-input
            v-model="item.value"
            placeholder="请输入规则"
          ></el-input>
        </div>
        <div v-else>
          <div v-if="item.name=='报名规则介绍'">
            <editor
              :content="incontent"
              :catchData="getEditorCode1"
            ></editor>
          </div>
        </div>
        <label class="pos-lable" v-if="(item.key != 'serviceFee') && (item.key !='serviceFeeType')">{{item.remarks}}</label>
      </el-form-item>
      <el-form-item style="padding-left:120px">
        <el-button
          type="primary"
          @click="onSubmit"
        >提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { editsystem, getsystemlist } from 'api'
import editor from '@c/common/editor'
import { deepClone } from '@/utils/utils'
export default {
  components: {
    editor
  },
  // import引入的组件需要注入到对象中才能使用
  data () {
    // 这里存放数据
    return {
      AscList: [],
      content: '',
      incontent: '',
      contentHtml: '',
      incontent2: '',
      contentHtml2: '',
      loading: false,
      radio: '1'
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    getEditorCode1 (val) {
      this.contentHtml = val
    },
    getEditorCode2 (val) {
      this.contentHtml2 = val
    },
    // 提交
    onSubmit () {
      let deepData = deepClone(this.AscList)
      let tmp = []
      for (let i = 0; i < deepData.length; i++) {
        if (deepData[i]['name'] === '报名规则介绍') {
          deepData[i].value = this.contentHtml
        }
        let obj = {
          key: deepData[i].key,
          id: deepData[i].id,
          value: deepData[i].value
        }
        tmp.push(obj)
      }
      let ascInfo = JSON.stringify(tmp)
      let obj = {
        config: ascInfo
      }
      editsystem(obj).then(res => {
        if (res.code === 200) {
          this.$message({
            showClose: true,
            type: 'success',
            message: res.msg
          })
          this._AscConfig()
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    // 获取系统配置
    _AscConfig () {
      this.loading = true
      getsystemlist({}).then(res => {
        if (res.code === 200) {
          if (res.data.list.length != 0) {
            this.AscList = res.data.list
            let deepData = res.data.list
            for (let i = 0; i < deepData.length; i++) {
              if (deepData[i]['name'] === '报名规则介绍') {
                // todo watch监听必须先为空 后赋值
                setTimeout(() => {
                  this.incontent = deepData[i].value
                })
                this.contentHtml = deepData[i].value
              }
            }
          }
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error'
          })
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this._AscConfig()
  }
}
</script>
<style lang="scss" scoped>
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
  /deep/ .el-input__inner {
    width: 300px;
  }
}
.textarea {
  resize: none;
  width: 480px;
  height: 200px;
  border: 1px solid #eee;
  font-size: 16px;
  padding: 10px;
  color: #999;
}
</style>
