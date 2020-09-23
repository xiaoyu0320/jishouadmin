<!--  -->
<template>
<div class='masked' @click="close">
  <div class="dialog" @click.stop="stopBubbling" v-loading="loading">
    <div class="title">{{returnTitle()}}</div>
    <div class="item">
      <div class="head">
        广告类型
        <font style="color:red">*</font>:
      </div>
      <div class="body">
        <el-radio-group v-model="radio">
        <el-radio :label="1">单图</el-radio>
        <el-radio :label="2">轮播图</el-radio>
        <el-radio :label="3">商品</el-radio>
      </el-radio-group>
      </div>
    </div>
    <div class="item">
      <div class="head">
         业务模块
        <font style="color:red">*</font>:
      </div>
      <div class="body">
        <el-select v-model="moduleName" placeholder="请选择模块">
          <el-option v-for="item in modulelist"
            :key="item.module"
            :label="item.name"
            :value="item.module">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="item">
      <div class="head">
        位置名称
        <font style="color:red">*</font>:
      </div>
      <div class="body">
        <el-input v-model="position" placeholder="请输入位置名称"></el-input>
      </div>
    </div>
    <div class="item">
      <div class="head">
        位置描述
        <font style="color:red">*</font>:
      </div>
      <div class="body">
        <el-input v-model="remark" placeholder="请输入位置描述"></el-input>
      </div>
    </div>
    <div class="item">
      <div class="head">
        排序
        <font style="color:red">*</font>:
      </div>
      <div class="body">
        <el-input v-model="sort" placeholder="数字越大越前面"></el-input>
      </div>
    </div>
    <div class="item">
      <div class="head">
        状态
      </div>
      <div class="body">
        <el-switch
          v-model="status"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </div>
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
  props: {
    modulelist: {
      type: Array,
      default: () => []
    },
    type: [String, Number],
    item: {
      type: Object,
      default: () => {}
    }
  },
  components: {
  },
  data () {
    return {
      loading: false,
      radio: 1,
      moduleName: '',
      position: '',
      remark: '',
      sort: '',
      status: true
    }
  },
  computed: {},
  watch: {},
  methods: {
    confirm () {
      this.loading = true
      const obj = {
        module: this.moduleName,
        name: this.position,
        remark: this.remark,
        sort: this.sort,
        status: Number(this.status)
      }
      if (this.type == 0) {
        obj.type = this.radio
        api.confirmAdPostionAdd(obj).then(res => {
          this.loading = false
          this.$emit('confirmDiaglog', true)
        }, () => {
          this.loading = false
        })
      }
      if (this.type == 1) {
        obj.id = this.item.id
        api.confirmAdPositionEdit(obj).then(res => {
          this.loading = false
          this.$emit('confirmDiaglog', true)
        }, () => {
          this.loading = false
        })
      }
    },
    close () {
      this.$emit('closeDiaglog', true)
    },
    returnTitle () {
      return this.type == 0 ? '新增广告位' : '编辑广告位'
    }
  },
  created () {
    if (this.type == 1) {
      this.radio = Number(this.item.type)
      this.moduleName = this.item.module
      this.position = this.item.name
      this.remark = this.item.remark
      this.sort = this.item.sort
      this.status = Boolean(Number(this.item.status))
    }
  }
}
</script>
<style lang='scss' scoped>
@import '../usermanage/dialog.scss';
.bottom-wrap{
  text-align: center;
  .centerbutton{
    display: inline-block;
    margin: 0 10px;
  }
}
</style>
