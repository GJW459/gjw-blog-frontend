<template>

  <div class="app-container">
    <!--搜索栏-->
    <el-form :inline="true" :model="aboutInline" class="demo-form-inline">
      <el-form-item label="关于我的标题">
        <el-input v-model="aboutInline.title" placeholder="博客标题"></el-input>
      </el-form-item>
      <el-form-item label="开始日期">
        <el-date-picker
          v-model="aboutInline.begin"
          type="date"
          placeholder="开始日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束日期">
        <el-date-picker
          v-model="aboutInline.end"
          type="date"
          placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchAbout">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="addAbout">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="clearAbouts">清空关于我的</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="ReturnAllAbouts">还原关于我的</el-button>
      </el-form-item>
    </el-form>

    <!--列表-->
    <el-table v-loading="loading" :data="abouts" stripe border>
      <el-table-column prop="aboutTitle" label="标题" width="100" align="center"/>
      <el-table-column prop="aboutRead" sortable label="阅读数" width="50" align="center"/>
      <el-table-column prop="aboutCreateTime" sortable label="创建时间" width="100" align="center"/>
      <el-table-column prop="aboutModifiedTime" sortable label="修改时间" width="100" align="center"/>
      <el-table-column label="操作"
                       align="center">
        <template slot-scope="scope">
          <el-dropdown size="small" split-button type="primary">
            操作
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button size="mini" type="primary" @click="editAbout(scope.row.aboutId)">编辑
                </el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="mini" type="primary" @click="lookAbout(scope.row.aboutId)">查看
                </el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="mini" type="danger" @click="deleteAbout(scope.row.aboutId)">删除
                </el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="this.aboutInline.currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="this.aboutInline.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!--添加弹窗-->
    <el-dialog title="添加" :visible.sync="dialogAboutAddVisible" width="80vw" top="10vh">
      <about-add @closeAddDialog="closeAddDialog"/>
    </el-dialog>
    <!--阅读弹窗-->
    <el-dialog title="阅读" :visible.sync="dialogAboutLookVisible" v-if="dialogAboutLookVisible" width="80vw" top="10vh">
      <about-look @close="closeLookDialog" :aboutId.sync="aboutId"/>
    </el-dialog>
    <!--修改弹窗-->
    <el-dialog title="修改" :visible.sync="dialogAboutEditVisible" v-if="dialogAboutEditVisible" width="80vw" top="10vh">
      <about-edit @closeEditDialog="closeEditDialog" :aboutId.sync="aboutId"/>
    </el-dialog>
  </div>
</template>


<script>

  import aboutAdd from "./aboutAdd";
  import aboutEdit from "./aboutEdit";
  import aboutLook from "./aboutLook";
  import {clearAllAbout, deleteOneAbout, getAboutListByCondition, returnAllAbout} from "../../../api/about";

  export default {
    name: "aboutList",
    data() {
      return {
        aboutInline: {
          title: '',
          begin: '',
          end: '',
          currentPage:1,
          pageSize:5
        },
        abouts: [],
        total:1000,
        dialogAboutAddVisible: false,
        dialogAboutLookVisible: false,
        dialogAboutEditVisible: false,
        aboutId: '',
        loading: true
      }
    },
    methods: {
      searchAbout() {
        //查询
        getAboutListByCondition(this.aboutInline).then(res => {
          console.log(res)
          this.abouts = res.data.abouts.list;
          this.total=res.data.abouts.total;
          this.loading = false
        })
      },
      addAbout() {
        this.dialogAboutAddVisible = true
      },
      clearAbouts() {

        clearAllAbout().then(res => {
          if (res.success) {
            this.$message.success(res.data.message)
            this.searchAbout()
          } else {
            this.$message.error("删除所有about失败")
          }
        })
      }
      ,
      ReturnAllAbouts() {
        returnAllAbout().then(res => {
          if (res.success) {
            this.$message.success(res.data.message)
            this.searchAbout()
          } else {
            this.$message.error("还原所有about失败")
          }
        })
      },
      closeAddDialog(msg) {

        this.dialogAboutAddVisible = msg
        this.searchAbout()
      },
      closeLookDialog(msg) {
        this.dialogAboutLookVisible = msg
      },
      closeEditDialog(msg) {
        this.dialogAboutEditVisible = msg
        this.searchAbout()

      },
      editAbout(row) {
        this.aboutId = row;
        this.dialogAboutEditVisible = true;
      },
      lookAbout(row) {
        this.aboutId = row;
        this.dialogAboutLookVisible = true;
      },
      deleteAbout(row) {

        deleteOneAbout(row).then(res => {
          if (res.success) {
            this.$message.success(res.data.message)
            this.searchAbout()
          } else {
            this.$message.error("删除失败")
          }
        })

      },
      handleSizeChange(size){
        this.aboutInline.pageSize=size;
        this.searchAbout();
      },
      handleCurrentChange(currentPage){
        this.aboutInline.currentPage=currentPage;
        this.searchAbout();
      }

    },
    components: {
      aboutLook,
      aboutEdit,
      aboutAdd
    },
    created() {
      this.searchAbout()
    },
    /*监听对象属性*/
    watch: {
      "aboutInline.title"(newVal, oldVal) {
        this.searchAbout()
      },
      "aboutInline.begin"(newVal, oldVal) {
        this.searchAbout();
      },
      "aboutInline.end"(newVal, oldVal) {
        this.searchAbout();
      }
    }
  }
</script>

<style scoped>

</style>
