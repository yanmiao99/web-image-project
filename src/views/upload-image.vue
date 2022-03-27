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
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip" style="text-align: center">请上传jpeg文件，且不超过500kb</div>
      </el-upload>
    </div>
    <div class="upload-bottom">
      <el-button type="primary" plain>开始识别</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'upload-image',
  data(){
    return{
      alertData:{
        title:'注意事项',
        text:'请检查您的图片,已确保其中包含盲道图像.请使用JPG形式附件'
      }
    }
  }

}
</script>

<style scoped lang="scss">
.upload-image {
  .upload-main {
    margin: 20px 0;
    ::v-deep .el-upload{
      width: 100%;
      .el-upload-dragger{
        width: auto;
      }
    }
  }
  .upload-bottom{
    text-align: center;
  }
}
</style>
