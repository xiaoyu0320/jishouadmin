
<template>
<div class='masked' @click="close">
  <div class="dialog" @click.stop="stopBubbling">
    <i class="el-icon-close" @click="close"></i>
    <div class="title">查看授权详情</div>
    <el-tree
      class="tree"
      :data="list"
      show-checkbox
      node-key="id"
      ref="tree"
      :default-checked-keys="checked"
      :default-expanded-keys="checked"
      :props="defaultProps">
    </el-tree>
    <div class="button-wrap">
        <el-button class="centerbutton" type="primary" plain @click.prevent="confirm">确认</el-button>
        <el-button class="centerbutton" plain @click.prevent="close">取消</el-button>
    </div>
  </div>
</div>
</template>

<script>
import { authList, authPost } from 'api'
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
      id: '',
      list: [],
      checked: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    close () {
      this.$emit('closeDiaglog', true)
    },
    confirm () {
      let rule = this.$refs.tree.getCheckedKeys()
      if (this.$refs.tree.getHalfCheckedKeys().length > 0) {
        rule = rule.concat(this.$refs.tree.getHalfCheckedKeys())
      }
      const obj = {
        id: this.id,
        rule_id: rule.join(',')
      }
      authPost(obj).then(res => {
        this.$emit('confirmDialog', true)
      })
    },
    getAuth () {
      authList({ id: this.id }).then(res => {
        const { data } = res
        this.list = data.list
        this.checked = data.rules
      })
    }
  },
  created () {
    this.id = this.item.id
    this.getAuth()
  }
}
</script>
<style lang='scss' scoped>
@import '../usermanage/dialog.scss';
.tree{
  max-height: 330px;
  overflow-y: scroll
}
</style>
