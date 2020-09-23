<!--  -->
<template>
<div class='masked' @click="close">
  <div class="dialog" @click.stop="stopBubbling" v-loading="loading">
    <div class="title">添加商品广告</div>
    <div class="item">
      <div class="head">
         广告位置
        <font style="color:red">*</font>:
      </div>
      <div class="body">
        <el-select v-model="moduleName" placeholder="请选择业务模块" @change="changeList">
          <el-option v-for="item in moduleList"
             :key="item.imoduled"
            :label="item.name"
            :value="item.module">
          </el-option>
        </el-select>
        <el-select v-model="cid" placeholder="请选择">
          <el-option v-for="item in cityList"
             :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="item">
      <div class="head">
        广告类型
        <font style="color:red">*</font>:
      </div>
      <div class="body">
        <textarea  class="textarea" v-model="goods_id" placeholder="输入商品id,多个用,间隔"></textarea>
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
    moduleList: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  data () {
    return {
      loading: false,
      cityList: [],
      moduleName: '',
      cid: '',
      goods_id: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    changeList () {
      const obj = {}
      obj.module = this.moduleName
      obj.type = 3 // TODO智灵说传2
      api.adPositionList(obj).then(res => {
        this.cid = '' // 清除可能残留的数据
        this.cityList = res.data.list
      })
    },
    close () {
      this.$emit('closeDiaglog', true)
    },
    confirm () {
      const obj = {}
      obj.goods_id = this.goods_id
      obj.cid = this.cid
      api.addGoodsAd(obj).then(res => {
        this.$emit('confirmDiaglog', true)
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
.textarea{
  resize: none;
  width: 250px;
  height: 200px;
  border: 1px solid #eee;
  font-size: 16px;
  padding: 10px;
  color: #999;
}
</style>
