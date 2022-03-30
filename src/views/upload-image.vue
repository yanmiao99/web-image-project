<template>
  <div class="upload-image">
    <div class="upload-top">
      <el-alert
          :title="alertData.title"
          type="info"
          :description="alertData.text"
          show-icon
          :closable="false"
      >
      </el-alert>
    </div>
    <div class="upload-main">
      <el-upload
          ref="upload"
          class="upload-demo"
          drag
          :before-upload="beforeAvatarUpload"
          :http-request="uploadRequest"
          :auto-upload="false"
          action=''
          multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip" style="text-align: center">请上传jpeg文件，且不超过500kb</div>
      </el-upload>
    </div>
    <div class="upload-bottom">
      <el-button type="primary" plain @click="submitUpload">开始识别</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'upload-image',
  data() {
    return {
      alertData: {
        title: '注意事项',
        text: '请检查您的图片,已确保其中包含盲道图像.请使用JPG形式附件'
      }
    }
  },
  methods: {
    uploadRequest(param) {
      let params = new FormData()
      params.append('picture', param.file)
      let url = 'api/upload'
      this.$axios({
        headers: {
          'Content-Type': 'multipart/form-data' //请求头
        },
        method: 'post',
        url: url,
        data: params
      })
          .then(res => {
            if (res.data.code !== "200") {
              this.$message.error('上传失败');
            } else {
              this.$message.success(res.data.msg);
            }
          })
          .catch(e => {
            this.$message.error('上传失败');
            console.log(e);
          })
    },
    // 点击上传图片
    submitUpload() {
      this.$refs.upload.submit();
    },
    // 处理上传格式
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>

<style scoped lang="scss">
.upload-image {
  .upload-main {
    margin: 20px 0;

    ::v-deep .el-upload {
      width: 100%;

      .el-upload-dragger {
        width: auto;
      }
    }
  }

  .upload-bottom {
    text-align: center;
  }
}
</style>
