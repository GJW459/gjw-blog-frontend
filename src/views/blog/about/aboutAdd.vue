<template>
  <div class="el-container">
    <el-form>
      <el-form-item label="标题" :label-width="formLabelWidth">
        <el-input autocomplete="off" v-model="AboutUploadParam.aboutTitle"></el-input>
      </el-form-item>
      <el-form-item label="内容" :label-width="formLabelWidth">
        <el-upload
          class="upload-demo"
          action="http://localhost:8082/image/upload"
          :on-change="handleChange"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传markdown文件</div>
        </el-upload>
        <mavon-editor ref=md :ishljs="true" @imgAdd="imgAdd" v-model="AboutUploadParam.aboutContent"></mavon-editor>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth">
        <el-button type="primary" size="mini" @click="onSubmit">提交</el-button>
        <el-button size="mini" @click="closeAddDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {uploadFileRequest} from "../../../api/ImageUpload";
  import {saveOneAbout} from "../../../api/about";
  import {mavonEditor} from "mavon-editor";
  import "mavon-editor/dist/css/index.css";

  export default {
    name: "aboutAdd",
    data() {
      return {
        formLabelWidth: '120px',
        AboutUploadParam: {
          aboutTitle: '',
          aboutContent: '',
        },
        fileList: []
      }
    },
    methods: {
      handleChange(file, fileList) {
        this.fileList = fileList.slice(-3);
      },
      imgAdd(pos, $file) {
        // 将图片上传到服务器，返回地址替换到md中
        let formData = new FormData();//表单数据
        formData.append("image", $file);
        // 访问后台服务器
        uploadFileRequest(formData).then(res => {
          console.log(res)
          // 图片回显
          if (res.success === true) {
            this.$refs.md.$img2Url(pos, res.data.url);
            this.$message.success('上传成功')
          } else {
            this.$message('上传失败,请重新上传')
          }
        })
      },
      onSubmit() {

        console.log(this.AboutUploadParam)
        //上传about
        //1 标题不能为空
        if (this.AboutUploadParam.aboutTitle == "") {
          // 当about的标题为空的时候
          alert("标题不能为空")
        } else {
          saveOneAbout(this.AboutUploadParam).then(res=>{

            console.log(res)
            if (res.success==true){
              //保存成功
              this.$message.success(res.data.message)
              this.AboutUploadParam={}
              //关闭Add框
              this.$emit("closeAddDialog",false);

            }
          })
        }

      },
      closeAddDialog() {
        this.$emit("closeAddDialog",false);
      }
    },
    components: {
      mavonEditor
    }
  }
</script>

<style scoped>

</style>
