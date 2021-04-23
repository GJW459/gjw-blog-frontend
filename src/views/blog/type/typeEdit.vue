<template>
  <div class="app-container">
    <el-form>
      <el-form-item label="分类名">
        <el-input autocomplete="off" v-model="typeEditParam.typeName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="onSubmit">提交</el-button>
        <el-button size="mini" @click="closeEditDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {getTypeById} from "../../../api/type";
  import {editOneType} from "../../../api/type";
  export default {
    name: "typeEdit",
    props: ["typeId"],
    data() {
      return {
        typeEditParam: {
          typeId: '',
          typeName: ''
        }
      }
    },
    methods: {
      onSubmit() {
        if (this.typeEditParam.typeName === '') {
          alert("需要输入typeName")
        } else {
          //edit
          editOneType(this.typeEditParam).then(res => {
            if (res.success) {
              this.$message.success(res.data.message)
              this.$emit("closeTypeEditDialog", false)
              this.typeSaveParam = {}
            } else {
              this.$message.error("编辑失败")
            }
          })

        }
      },
      closeEditDialog() {
        this.$emit("closeTypeEditDialog", false)
        this.typeSaveParam = {}
      }
    },
    created() {
      getTypeById(this.$props.typeId).then(res => {

        this.typeEditParam.typeId = res.data.typeEditReturn.typeId
        this.typeEditParam.typeName = res.data.typeEditReturn.typeName
      })
    }

  }
</script>

<style scoped>

</style>
