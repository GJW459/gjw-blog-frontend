<template>
  <div class="app-container">
    <!--搜索栏-->
    <el-form :inline="true" :model="typeInline" class="demo-form-inline">
      <el-form-item label="分类名称">
        <el-input v-model="typeInline.typeName" placeholder="分类名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchType">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="addTypes">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="clearTypes">清空所有分类</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="ReturnAllTypes">还原所有分类</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table v-loading="loading" :data="types" stripe border>
      <el-table-column prop="typeName" label="分类名称" width="100" align="center"/>
      <el-table-column prop="typeBlogCount" sortable label="分类博客数" width="50" align="center"/>
      <el-table-column prop="isEnable" label="是否启用" width="100" align="center"/>
      <el-table-column label="操作"
                       align="center">
        <template slot-scope="scope">
          <el-dropdown size="small" split-button type="primary">
            操作
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button size="mini" type="primary" @click="editType(scope.row.typeId)">编辑
                </el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="mini" type="danger" @click="deleteType(scope.row.typeId)">删除
                </el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
   <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="this.currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="this.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>-->
    <!--添加弹窗-->
    <el-dialog title="添加" :visible.sync="dialogTypeAddVisible" width="30vw" top="10vh">
      <type-add @closeTypeAddDialog="closeTypeAddDialog"></type-add>
    </el-dialog>
    <!--修改弹窗-->
    <el-dialog title="修改" :visible.sync="dialogTypeEditVisible" v-if="dialogTypeEditVisible" width="30vw" top="10vh">
      <type-edit @closeTypeEditDialog="closeTypeEditDialog" :typeId.sync="typeId"></type-edit>
    </el-dialog>
  </div>
</template>

<script>
  import {getAllTypeInfo} from "../../../api/type"
  import {getTypeByCondition} from "../../../api/type"
  import {deleteOneType} from "../../../api/type";
  import {deleteAllTypes} from "../../../api/type";
  import {returnAllTypes} from "../../../api/type";
  import typeAdd from "./typeAdd";
  import typeEdit from "./typeEdit";

  export default {
    name: "typeList",
    data() {
      return {
        typeInline: {
          typeName: ''
        },
        currentPage:1,
        pageSize:5,
        total: 10000,
        types: [],
        loading: true,
        dialogTypeAddVisible: false,
        dialogTypeEditVisible: false,
        typeId: ''
      }
    },
    methods: {
      searchType() {
        getTypeByCondition(this.typeInline).then(res => {
          this.types = res.data.typeListReturns
        })
      },
      addTypes() {
        this.dialogTypeAddVisible = true
      },
      clearTypes() {

        deleteAllTypes().then(res => {
          if (res.success == true) {
            this.$message.success(res.data.message)
            this.searchType()
          } else {
            this.$message.error("删除所有分类失败")
          }
        })
      },
      ReturnAllTypes() {
        returnAllTypes().then(res => {
          if (res.success == true) {
            this.$message.success(res.data.message)
            this.searchType()
          } else {
            this.$message.error("还原所有分类失败")
          }
        })
      },
      editType(row) {
        this.dialogTypeEditVisible = true
        this.typeId = row

      },
      deleteType(row) {

        deleteOneType(row).then(res => {
          if (res.success == true) {
            this.$message.success(res.data.message)
            this.searchType()
          } else {
            this.$message.error("删除失败")
          }
        })

      },
      closeTypeAddDialog(msg) {
        console.log(msg)
        this.dialogTypeAddVisible = msg
        this.searchType()
      },
      closeTypeEditDialog(msg) {
        console.log(msg)
        this.dialogTypeEditVisible = msg
        this.searchType()
      },
      handleSizeChange(size){
        this.pageSize=size;
        this.searchType(this.currentPage,this.pageSize);
      },
      handleCurrentChange(currentPage){
        this.currentPage=currentPage;
        this.searchType(this.currentPage,this.pageSize);
      }
    },
    created() {
      getAllTypeInfo().then(res => {
        this.loading = false
        console.log(res)
        this.types = res.data.typeListReturns
      })
    },
    watch: {
      "typeInline.typeName"(newVal, oldVal) {
        this.searchType(this.currentPage,this.pageSize);
      }
    },
    components: {
      typeAdd,
      typeEdit
    }
  }
</script>

<style scoped>
  .el-dropdown-menu__item {
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
