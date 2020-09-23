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
        <el-select v-model="moduleName" placeholder="请选择业务模块" @change="changeList">
          <el-option v-for="item in modulelist"
             :key="item.module"
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
         广告名称
        <font style="color:red">*</font>:
      </div>
      <div class="body dp-flex fl-al-center">
        <el-input v-model="name" placeholder="请输入广告名称"></el-input>
        <el-checkbox v-model="checked" style="margin-left:10px;">是否显示广告名称</el-checkbox>
      </div>
    </div>
    <div class="item">
      <div class="head">
         广告链接
        <font style="color:red">*</font>:
      </div>
      <div class="body">
        <el-input v-model="url" placeholder="请输入广告链接"></el-input>
      </div>
    </div>
    <div class="item" v-if="moduleName == 'game'">
      <div class="head">
         游戏key
        <font style="color:red">*</font>:
      </div>
      <div class="body">
        <el-input v-model="gameKey" placeholder="请输入游戏key"></el-input>
      </div>
    </div>
    <div class="item">
      <div class="head">
        广告图片
        <font style="color:red">*</font>:
      </div>
      <div class="body">
        <el-upload
          class="avatar-uploader"
          :action="baseurl+'/mine/upload'"
          :show-file-list="false"
          :before-upload = "beforeUpload"
          :on-success="handleAvatarSuccess"
          :data="fileinfo"
          ref="uploads"
          >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
      </div>
    </div>
    <div class="item">
      <div class="head">
        描述
        <font style="color:red">*</font>:
      </div>
      <div class="body">
        <el-input v-model="remark" placeholder="请输入描述"></el-input>
      </div>
    </div>
    <div class="item">
      <div class="head">
        排序
        <font style="color:red">*</font>:
      </div>
      <div class="body">
        <el-input v-model="sort" type="number" placeholder="请输入排序,数值越大越前面"></el-input>
      </div>
    </div>
    <div class="item">
      <div class="head">
        状态
        <font style="color:red">*</font>:
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
import { geturl } from '@/utils/service'
import { getToken } from '@/utils/auth'
import { isJpgPng } from '@/utils/validate'
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
  components: {},
  data () {
    return {
      cityList: [],
      moduleName: '',
      cid: '',
      loading: false,
      name: '',
      url: '',
      checked: false,
      baseurl: geturl(),
      fileinfo: {
        uid: getToken('shop_uid'),
        token: getToken('shop_token')
      },
      imageUrl: '',
      status: true,
      remark: '',
      sort: '',
      gameKey: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    handleAvatarSuccess (res, file) {
      if (res.code == 200) {
        this.imageUrl = res.data.url
      } else {
        this.$message({
          type: 'error',
          message: '上传失败'
        })
      }
    },
    beforeUpload (file) {
      if (!isJpgPng(file.name)) {
        this.$message.warning(`只能上传jpg或者是png图片，请重新选择`)
        return false
      }
    },
    changeList () {
      const obj = {}
      obj.module = this.moduleName
      api.adPositionList(obj).then(res => {
        this.cityList = res.data.list
      })
    },
    close () {
      this.$emit('closeDiaglog', true)
    },
    confirm () {
      if (!this.name) {
        this.$message.error('请输入广告名称')
        return
      }
      if (!this.cid) {
        this.$message.error('请选择广告类型')
        return
      }
      if (!this.url) {
        this.$message.error('请输入广告链接')
        return
      }
      if (!this.imageUrl) {
        this.$message.error('请上传广告图片')
        return
      }
      if (!this.sort) {
        this.$message.error('请输入排序')
        return
      }
      this.loading = true
      const obj = {}
      obj.name = this.name
      obj.show_name = Number(this.checked)
      obj.cid = this.cid
      obj.img_url = this.imageUrl
      obj.url = this.url
      obj.remark = this.remark
      obj.sort = this.sort
      obj.status = Number(this.status)
      obj.game_key = this.gameKey
      if (this.type == 0) {
        // 新增
        api.adAddPost(obj).then(res => {
          this.loading = false
          this.$emit('confirmDiaglog', true)
        }, () => {
          this.loading = false
        })
      }
      if (this.type == 1) {
        // 编辑状态
        obj.id = this.item.id
        api.adEdPost(obj).then(res => {
          this.loading = false
          this.$emit('confirmDiaglog', true)
        }, () => {
          this.loading = false
        })
      }
    },
    returnTitle () {
      return '添加广告'
    }
  },
  created () {
    if (this.type == 1) {
      const data = this.item
      this.moduleName = data.module
      this.cid = data.cid
      this.name = data.name
      this.checked = Boolean(Number(data.show_name)) // 防止数字字符串导致的问题
      this.url = data.url
      this.imageUrl = data.img_url.original_pic
      this.remark = data.remark
      this.sort = data.sort
      this.status = Boolean(Number(data.status))
      this.gameKey = data.game_key
      api.adPositionList({ module: this.moduleName }).then(res => {
        this.cityList = res.data.list
      })
    }
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
.avatar-uploader /deep/ .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader /deep/ .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.body{
  flex:1;
  overflow: hidden;
}
</style>
