
<template>
<div class='masked' @click="close">
  <div class="dialog" @click.stop="stopBubbling">
    <i class="el-icon-close" @click="close"></i>
    <div class="title">{{returnTitle()}}</div>
    <div class="item">
      <div class="head">角色关联:</div>
      <el-select v-model="parent" placeholder="请选择关联的角色">
        <el-option v-for="item in list"
          :key="item.id"
          :label="item.title"
          :value="item.id">
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
import { AuthGroupList, setpower } from 'api'
export default {
  components: {},
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      parent: '',
      list: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    returnTitle () {
      return this.type == 0 ? '新增角色' : '编辑角色'
    },
    close () {
      this.$emit('closeDiaglog', true)
    },
    confirm () {
      if (this.parent == '') {
        this.$message({
          type: 'info',
          message: '请选择关联的角色'
        })
        return
      }
      const obj = {
        id: this.item.id,
        group_id: this.parent
      }
      setpower(obj).then(res => {
        this.$emit('confirmDialog', {})
      })
    },
    getlist () {
      AuthGroupList({ path: -1 }).then(res => {
        res.data.list.map((data, index) => {
          if (data.id == 1) {
            res.data.list.splice(index, 1)
          }
        })
        this.list = res.data.list
      })
    }
  },
  created () {
    this.getlist()
    if (this.item.group_id === null) {
      this.parent = ''
    } else {
      this.parent = this.item.group_id
    }
  }
}
</script>
<style lang='scss' scoped>
@import '../usermanage/dialog.scss';
</style>
