<template>
  <div class="el-container">
    <el-form>
      <el-form-item label="标题" :label-width="formLabelWidth">
        <div class="content">{{title}}</div>
      </el-form-item>
      <el-form-item label="分类" :label-width="formLabelWidth">
        <div class="content">{{typeName}}</div>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="封面">
        <div class="content">
          <el-image
            style="width: 100px; height: 100px"
            :src="blogImage"></el-image>
        </div>
      </el-form-item>
      <el-form-item label="内容" :label-width="formLabelWidth">
        <div class="content">
          <div v-highlight v-html="blogHtml" class="styleClass"></div>
        </div>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <div class="content">{{blogRemark}}</div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  // 引入高亮样式，其他样式见https://blog.csdn.net/qq_39826207/article/details/109265099
  import "highlight.js/styles/atelier-forest-dark.css";
  import {getBlogHtml} from "../../../api/blog"

  export default {
    name: "blogLook",
    props: ["blogId"],
    data() {
      return {
        formLabelWidth: '120px',
        title: '',
        typeName: '',
        blogImage: '',
        blogHtml: '',
        blogRemark: ''
      }
    },
    methods: {
      getBlogInfo() {
        getBlogHtml(this.$props.blogId).then(res => {
          this.title=res.data.blogHtmlReturn.blogTitle
          this.blogImage=res.data.blogHtmlReturn.blogImage
          this.typeName=res.data.blogHtmlReturn.typeName
          this.blogHtml=res.data.blogHtmlReturn.blogHtml
          this.blogRemark=res.data.blogHtmlReturn.blogRemark
        })
      }
    },
    created() {
      this.getBlogInfo()
    }
  }
</script>

<style scoped>
  .content{
    border-color: #409EFF;
    border-width: 1px 1px 1px 1px;
    border-style: solid ;
  }
</style>
