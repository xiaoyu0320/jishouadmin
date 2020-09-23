<!--  -->
<template>
<div class='newsIssue'>
  <div class="item">
    <div class="head">标题：</div>
    <div class="body">
      <el-input
        placeholder="请输入标题"
        v-model="info.title"
        clearable>
      </el-input>
    </div>
  </div>
  <div class="item">
    <div class="head">缩略图：</div>
    <div class="body">
      <el-upload
        class="avatar-uploader"
        :action="baseurl+'/news/upload'"
        :show-file-list="false"
        :before-upload = "beforeUpload"
        :on-success="handleAvatarSuccess"
        :data="fileinfo"
        ref="uploads"
        name="message"
        >
        <img v-if="info.img" :src="info.img" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
      </el-upload>
    </div>
  </div>
  <div class="item">
    <div class="head">内容：</div>
    <div class="body">
       <editor :content="incontent" :catchData="getEditorCode"></editor>
    </div>
  </div>
  <div class="item" style="justify-content: center;">
    <el-button size="medium" type="primary" @click="confirm">确定</el-button>
    <el-button v-if="info.id" size="medium" @click="back">取消</el-button>
  </div>
</div>
</template>

<script>
import * as api from 'api'
import { geturl } from '@/utils/service'
import { getToken } from '@/utils/auth'
import { isJpgPng } from '@/utils/validate'
import editor from '@c/common/editor'
export default {
  components: {
    editor
  },
  data () {
    return {
      baseurl: geturl(),
      fileinfo: {
        uid: getToken('shop_uid'),
        token: getToken('shop_token')
      },
      info: {
        id: this.$route.query.id,
        title: '',
        img: '',
        content: ''
      },
      incontent: '',
      contentHtml: ''
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    newsDetail () {
      api.newsDetail({ id: this.info.id }).then(res => {
        const { data } = res
        this.info = data
        setTimeout(() => {
          this.incontent = this.info.content
        })
        this.contentHtml = this.info.content
      })
    },
    confirm () {
      let obj = {
        id: this.info.id,
        title: this.info.title,
        img: this.info.img,
        content: this.contentHtml
      }
      api.newsPost(obj).then(res => {
        this.$message({
          type: 'success',
          message: res.msg
        })
        this.$router.push({
          path: '/message/newsList'
        })
      })
    },
    getEditorCode (val) {
      this.contentHtml = val
    },
    beforeUpload (file) {
      if (!isJpgPng(file.name)) {
        this.$message.warning(`只能上传jpg或者是png图片，请重新选择`)
        return false
      }
    },
    handleAvatarSuccess (res, file) {
      if (res.code == 200) {
        this.info.img = res.data.url
      } else {
        this.$message({
          type: 'error',
          message: '上传失败'
        })
      }
    }
  },
  created () {
    if (this.info.id) {
      this.newsDetail()
    }
  }
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.item{
  margin-bottom: 20px;
  display: flex;
  .head{
    text-align: right;
    width: 100px;
  }
  .body{
    margin-left: 15px;
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
</style>
