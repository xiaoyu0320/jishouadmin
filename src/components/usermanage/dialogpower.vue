<!--  -->
<template>
<div class='masked' @click="close">
  <div class="dialog" @click.stop="stopBubbling" v-loading="loading">
    <i class="el-icon-close" @click="close"></i>
    <div class="title">{{returnTitle()}}</div>
    <div class="item">
      <div class="head">上层菜单:</div>
      <el-cascader
      v-model="parentId"
      :options="list"
      :props="{value:'id',label:'title'}"
      @change="handleChange"
      class="flex-1"
      change-on-select
      >
      </el-cascader>
    </div>
    <div class="item">
      <div class="head">菜单名称:</div>
      <el-input v-model="menuname" placeholder="请输入菜单名称"></el-input>
    </div>
    <div class="item">
      <div class="head">规则:</div>
      <el-input v-model="name" placeholder="请输入控制器"></el-input>
    </div>
    <div class="item">
      <div class="head">路由名称:</div>
      <el-input v-model="router_name" placeholder="请输入路由名称"></el-input>
    </div>
    <div class="item" style="margin-top:5px;">
      <div class="head"></div>
      <div style="font-size:12px;color:#999;">如路由名称不填，则对应的模块设置权限不会体现</div>
    </div>
    <div class="item">
      <div class="head">状态:</div>
      <el-select v-model="statusFlag" placeholder="请选择状态">
        <el-option v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="button-wrap">
        <el-button class="centerbutton" type="primary" plain @click.prevent="confirm">确认</el-button>
        <el-button class="centerbutton" plain @click.prevent="close">取消</el-button>
    </div>
  </div>
</div>
</template>

<script>
import { deepClone } from '@/utils/utils'
import { addMenuPost, editMenuPost, AuthEditMenu } from 'api'
export default {
  components: {},
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    parentList: {
      type: Array,
      dafault: () => []
    },
    type: [Number]
  },
  data () {
    return {
      menuname: '',
      name: '',
      router_name: '',
      list: [],
      parentId: [],
      statusFlag: '',
      options: [
        {
          value: 0,
          label: '关闭'
        },
        {
          value: 1,
          label: '开启'
        }
      ],
      loading: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    returnTitle () {
      return this.type == 0 ? '新增菜单' : '编辑菜单'
    },
    close () {
      this.$emit('closeDiaglog', true)
    },
    confirm () {
      this.loading = true
      const parentLength = this.parentId.length
      const _parent = deepClone(this.parentId)
      const obj = {
        title: this.menuname,
        name: this.name,
        status: this.statusFlag,
        pid: this.parentId[parentLength - 1],
        router_name: this.router_name === null ? '' : this.router_name,
        path: JSON.stringify(_parent)
      }
      if (this.type == 1) {
        obj.id = this.item.id
        editMenuPost(obj).then(res => {
          this.loading = false
          this.$emit('confirmDialog', {})
          // eslint-disable-next-line handle-callback-err
        }, error => {
          this.loading = false
        })
        return
      }
      if (this.type == 0) {
        addMenuPost(obj).then(res => {
          this.loading = false
          this.$emit('confirmDialog', {})
        // eslint-disable-next-line handle-callback-err
        }, error => {
          this.loading = false
        })
      }
    },
    handleChange (val) {
    },
    toAuthEditMenu () {
      this.loading = true
      AuthEditMenu({ id: this.item.id }).then(res => {
        this.loading = false
        const { data } = res
        const list = data.list
        list.push({
          id: 0,
          title: '顶级菜单'
        })
        this.parentId = data.detail.path
        list.reverse()
        this.list = list
        this.name = data.detail.name
        this.statusFlag = Number(data.detail.status)
        this.menuname = data.detail.title
        this.router_name = data.detail.router_name
      }, () => {
        this.loading = false
      })
    }
  },
  created () {
    if (this.type == 0) {
      // 新增的情况
      this.list = deepClone(this.parentList)
      const list = this.list
      list.push({
        id: 0,
        title: '顶级菜单'
      })
      list.reverse()
      this.list = list
    }
    if (this.type == 1) {
      this.toAuthEditMenu()
    }
  }
}
</script>
<style lang='scss' scoped>
@import '../usermanage/dialog.scss';
</style>
