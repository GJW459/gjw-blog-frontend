<template>
  <div class="app-container">
    <el-form>
      <el-form-item label="分类名">
        <el-input autocomplete="off" v-model="typeSaveParam.typeName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="onSubmit">提交</el-button>
        <el-button size="mini" @click="closeAddDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {insertOneType} from "../../../api/type"

  export default {
    name: "typeAdd",
    data() {
      return {
        typeSaveParam: {
          typeName: ''
        }
      }
    },
    methods: {
      onSubmit() {
        if (this.typeSaveParam.typeName === '') {
          alert("需要输入typeName")
        } else {
          //插入
          insertOneType(this.typeSaveParam).then(res => {
            if (res.success === true) {
              //成功
              console.log(res)
              this.$emit("closeTypeAddDialog", false)
              this.typeSaveParam = {}
            } else {
              //失败
              this.$message.error("插入分类失败")
            }
          })
        }
      },
      closeAddDialog() {
        this.$emit("closeTypeAddDialog", false)
        this.typeSaveParam = {}
      }

    }
  }
</script>

<style scoped>

</style>
