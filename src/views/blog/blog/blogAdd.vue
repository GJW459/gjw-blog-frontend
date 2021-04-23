<template>
  <div class="el-container">
    <el-form>
      <el-form-item label="标题" :label-width="formLabelWidth">
        <el-input autocomplete="off" v-model="BlogUploadParam.title"></el-input>
      </el-form-item>
      <el-form-item label="分类" :label-width="formLabelWidth">
        <el-select v-model="BlogUploadParam.type" placeholder="请选择">
          <el-option v-for="item in types" :key="item.typeId" :label="item.typeName" :value="item.typeId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="封面">
        <el-upload class="avatar-uploader"  action=""
                   :show-file-list="false"
                   :before-upload="beforeAvatarUpload"
        >
          <img v-if="BlogUploadParam.blogImage" :src="BlogUploadParam.blogImage" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
        <mavon-editor ref=md :ishljs="true" @imgAdd="imgAdd" v-model="BlogUploadParam.blogContent"></mavon-editor>
      </el-form-item>

      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input v-model="BlogUploadParam.blogRemark" type="textarea"></el-input>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth">
        <el-button type="primary" size="mini" @click="onSubmit">提交</el-button>
        <el-button size="mini" @click="closeAddDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mavonEditor} from "mavon-editor";
  import "mavon-editor/dist/css/index.css";
  import {getTypeList} from "../../../api/type"
  import {uploadFileRequest} from "../../../api/ImageUpload"
  import {uploadBlog} from "../../../api/blog"

  export default {
    name: "blogAdd",
    data() {
      return {
        formLabelWidth: '120px',
        fileList: [],
        types: [],//查询到的类型
        BlogUploadParam: {
          title: "",
          type: "",
          blogImage: "",
          blogContent: "",
          blogRemark: ""
        }
      }
    },
    methods: {
      beforeAvatarUpload(file) {
        // 是否为JPEG类型的图片
        const isJPG = file.type === 'image/jpeg';
        // 是否只有2MB
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        let formData=new FormData();
        formData.append("image",file)
        uploadFileRequest(formData).then(res=>{
          console.log(res)
          // 图片回显
          if (res.success === true) {
            this.BlogUploadParam.blogImage=res.data.url
            this.$message.success('上传成功')
          } else {
            this.$message('上传失败,请重新上传')
          }
        })
        return isJPG && isLt2M;
      },
      closeAddDialog() {
          this.$emit("closeAddDialog",false);
          this.BlogUploadParam={}
      }
      , onSubmit() {

        uploadBlog(this.BlogUploadParam).then(res => {
          console.log(res)
          this.$message.success("成功添加博客")
          this.$emit("closeAddDialog",false);
          this.BlogUploadParam={}
        }).catch(res=>{
          console.log(res)
        })
      }
      ,
      handleChange(file, fileList) {
        this.fileList = fileList.slice(-3);
      },
      // 绑定@imgAdd event
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
      }
    },
    components: {
      mavonEditor
    }
    ,
    created() {
      // 创建时
      getTypeList().then(res => {
        //console.log(res.data.typeReturns)
        this.types = res.data.typeReturns
      })
    }
  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }

  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
</style>
