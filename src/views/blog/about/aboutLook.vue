<template>
  <div class="el-container">
    <el-form>
      <el-form-item label="标题" :label-width="formLabelWidth">
        <div class="content">{{aboutTitle}}</div>
      </el-form-item>
      <el-form-item label="内容" :label-width="formLabelWidth">
        <div class="content">
          <div v-highlight v-html="aboutHtml" class="styleClass"></div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {getAboutHtml} from "../../../api/about";

  export default {
    name: "aboutLook",
    props: ["aboutId"],
    data() {
      return {
        formLabelWidth: '120px',
        aboutTitle: '',
        aboutHtml: ''
      }
    },
    methods: {
      getAboutHtml() {
        getAboutHtml(this.$props.aboutId).then(res => {
          console.log(res)
          this.aboutTitle = res.data.aboutHtmlReturn.aboutTitle
          this.aboutHtml = res.data.aboutHtmlReturn.aboutHtml
        })
      }
    },
    created() {
      this.getAboutHtml()
    }
  }
</script>

<style scoped>
  .content {
    border-color: #409EFF;
    border-width: 1px 1px 1px 1px;
    border-style: solid;
  }
</style>
