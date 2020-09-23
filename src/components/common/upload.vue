<!--  -->
<template>
<div class=''>
  <el-upload
    class="avatar-uploader"
    :action="baseurl+'/mine/upload'"
    :show-file-list="false"
    :before-upload = "beforeUpload"
    :on-success="handleAvatarSuccess"
    :data="fileinfo"
    ref="uploads"
    >
    <img v-if="img" :src="img" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
  </el-upload>
</div>
</template>

<script>
import { isJpgPng } from '@/utils/validate'
import { geturl } from '@/utils/service'
import { getToken } from '@/utils/auth'
export default {
  components: {},
  data () {
    return {
      baseurl: geturl(),
      fileinfo: {
        uid: getToken('shop_uid'),
        token: getToken('shop_token')
      }
    }
  },
  props: {
    img: {
      type: String,
      default: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    handleAvatarSuccess (res, file) {
      if (res.code == 200) {
        this.$emit('update', res.data.url)
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
    }
  },
  created () {
  }
}
</script>
<style lang='scss' scoped>
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
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.avatar {
  width: 80px;
  height: 80px;
  display: block;
}
</style>
