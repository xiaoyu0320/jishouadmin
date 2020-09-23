<!--  -->
<template>
<div class='_container' v-loading="loading">
  <i class="close el-icon-close" @click="close"></i>
  <div class="_title">
    {{returnTitle()}}
  </div>
  <el-divider/>
  <div class="item">
    <div class="head">
      奖项名称:
    </div>
    <div class="body">
      <el-input v-model="info.name" placeholder="请输入奖项名称"></el-input>
    </div>
  </div>
  <div class="item" v-if="info.type==1">
    <div class="head">
      奖项值:
    </div>
    <div class="body">
      <el-input v-model="info.value" placeholder="请输入奖项值"></el-input>
    </div>
  </div>
  <div class="item" v-if="info.type==5">
    <div class="head">
      奖品数量
    </div>
    <div class="body">
      <el-input style="width:150px" v-model="info.value" type="number" placeholder="免费抽奖次数"></el-input>
      <div class="tips">中奖当天使用，隔天清零</div>
    </div>
  </div>
  <div class="item">
    <div class="head">
      奖项类型:
    </div>
    <div class="body">
      <el-select v-model="info.type" placeholder="请选择中奖概率">
        <el-option v-for="item in typeList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
  <div class="item" style="font-size:12px;color:#777">
    <div class="head">
      免费抽奖奖项(慎用):
    </div>
    <div class="body">
      <el-checkbox v-model="info.is_free_checked">用户免费抽奖时只允许中该奖项，该设置需要配置两个及以上奖项</el-checkbox>
    </div>
  </div>
  <div class="item">
    <div class="head">
      中奖概率:
    </div>
    <div class="body">
      <el-input v-model="info.profit" type="number" placeholder="请输入中奖概率"></el-input>
    </div>
  </div>
  <div class="item">
    <div class="head">
      排序:
    </div>
    <div class="body">
      <el-input v-model="info.sort" type="number" placeholder="请输入奖项排序"></el-input>
    </div>
  </div>
  <div class="item">
    <div class="head">
      图片:
    </div>
    <div class="body">
      <upload :img="info.img" @update="updateImg"></upload>
    </div>
  </div>
  <div class="item" v-if="info.type==2">
    <div class="head">
      加速券:
    </div>
    <div class="body" style="flex-direction:column;align-items:flex-start">
      <el-button type="primary" style="margin-bottom:20px" size="mini" @click="showChoice">选择加速券</el-button>
      <el-table :data="speedList" border stripe style="width:70%">
        <el-table-column
          label="名称"
          prop="name"
          >
        </el-table-column>
        <el-table-column
          label="加速时长(天)"
          prop="days"
          >
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template>
            <el-button type="text" size="small" @click="clearSpeedList">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <div class="item">
    <div class="head">
      有效时间(秒)
    </div>
    <div class="body">
      <el-input style="width:150px" v-model="info.time" type="number" placeholder="请输入有效时间"></el-input>
      <div class="tips">0表示不限</div>
    </div>
  </div>
  <el-button type="primary" size="small" @click="save">保存</el-button>
  <el-button size="small" @click="close">取消</el-button>
  <chsp @update="update" @close="dialogFlag = false" v-if="dialogFlag"></chsp>
</div>
</template>

<script>
import * as api from 'api'
import upload from '@c/common/upload'
import chsp from '../speed/choicespeed'
import { deepClone } from '@/utils/utils'
export default {
  components: { upload, chsp },
  data () {
    return {
      typeList: [],
      info: {},
      loading: false,
      speedList: [],
      dialogFlag: false

    }
  },
  props: {
    item: {
      type: Object,
      default: () => { }
    },
    typeinfo: {
      type: Object,
      default: () => { }
    }
  },
  computed: {},
  watch: {},
  methods: {
    showChoice() {
      this.dialogFlag = true
    },
    clearSpeedList() {
      this.speedList = []
    },
    update(obj) {
      this.dialogFlag = false
      this.speedList = []
      this.speedList.push(obj)
    },
    updateImg(val) {
      this.info.img = val
    },
    close() {
      this.$emit('close', '')
    },
    save() {
      let info = deepClone(this.info)
      info.profit = Number(info.profit)
      info.is_free = this.info.is_free_checked ? 1 : 0
      if (this.info.type == 2) {
        if (this.speedList.length == 0) {
          this.$message.info('请选择加速券')
          return
        } else {
          info.speed_id = this.speedList[0]['id']
        }
      }
      this.loading = true
      api.editRoulette(info).then(res => {
        this.loading = false
        this.$emit('confirm')
      }, () => {
        this.loading = false
      })
    },
    returnTitle() {
      return this.item._type && (this.item._type == 1) ? '编辑奖项' : '添加奖项'
    },
    resetInfo() {
      return {
        name: '',
        value: '',
        type: '',
        profit: '',
        sort: '',
        img: '',
        time: '',
        speed_id: '',
        is_free_checked: false
      }
    },
    returnStatus(item) {
      return this.typeInfo[item.type]
    },
    getType() {
      let obj = this.typeinfo
      let arr = []
      for (const key in obj) {
        let _obj = {
          value: key,
          label: obj[key]
        }
        arr.push(_obj)
      }
      this.typeList = arr
      if (this.item._type == 0) {
        this.info = this.resetInfo()
        this.speedList = []
      } else {
        this.info = JSON.parse(JSON.stringify(this.item.info, ['id', 'name', 'value', 'type', 'profit', 'sort', 'img', 'time', 'speed_id']))
        // 假如取过来的数据 是免费抽奖次数的话
        if (this.item.info.is_free == 1) {
          this.$set(this.info, 'is_free_checked', true)
        } else {
          this.$set(this.info, 'is_free_checked', false)
        }
        let obj = {
          name: this.item.info.speed_name,
          days: this.item.info.days,
          id: this.item.info.speed_id
        }
        this.speedList = []
        if (this.item.info.speed_name) {
          this.speedList.push(obj)
        }
      }
    }
  },
  created () {
    this.getType()
  }
}
</script>
<style lang='scss' scoped>
@import '../speed/common.scss';
</style>
