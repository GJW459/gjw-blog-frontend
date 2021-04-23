<template>

  <div class="app-container">
    <!--搜索栏-->
    <el-form :inline="true" :model="blogInline" class="demo-form-inline">
      <el-form-item label="博客标题">
        <el-input v-model="blogInline.title" placeholder="博客标题"></el-input>
      </el-form-item>
      <el-form-item label="博客分类">
        <el-select v-model="blogInline.type" placeholder="博客分类">
          <el-option v-for="item in types" :key="item.typeId" :label="item.typeName" :value="item.typeId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始日期">
        <el-date-picker
          v-model="blogInline.begin"
          type="date"
          placeholder="开始日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束日期">
        <el-date-picker
          v-model="blogInline.end"
          type="date"
          placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchBlogs">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="addBlogs">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="clearBlogs">清空博客</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="ReturnAllBlogs">还原博客</el-button>
      </el-form-item>
    </el-form>

    <!--列表-->
    <el-table v-loading="loading" :data="blogs" stripe border>
      <el-table-column prop="blogTitle" label="标题" width="100" align="center"/>
      <el-table-column prop="typeName" sortable label="分类" width="100" align="center"/>
      <el-table-column prop="blogImage" label="图片" width="120">
        <template slot-scope="scope">
          <el-image
            style="width: 100%;height: 100px"
            :src="scope.row.blogImage"
            :preview-src-list="[scope.row.blogImage]"
          />
        </template>
      </el-table-column>
      <el-table-column prop="blogGoods" sortable label="点赞数" width="50" align="center"/>
      <el-table-column prop="blogRead" sortable label="阅读数" width="50" align="center"/>
      <el-table-column prop="blogCollection" sortable label="收藏数" width="50" align="center"/>
      <el-table-column prop="blogComment" sortable label="评论数" width="50" align="center"/>
      <el-table-column prop="blogSource" label="文章来源" width="100" align="center"/>
      <el-table-column prop="blogCreateTime" sortable label="创建时间" width="100" align="center"/>
      <el-table-column prop="blogModifiedTime" sortable label="修改时间" width="100" align="center"/>
      <el-table-column prop="blogRemark" label="备注" width="100" align="center"/>
      <el-table-column label="操作"
                       align="center">
        <template slot-scope="scope">
          <el-dropdown size="small" split-button type="primary">
            操作
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button size="mini" type="primary" @click="editBlog(scope.row.blogId)">编辑
                </el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="mini" type="primary" @click="lookBlog(scope.row.blogId)">查看
                </el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="mini" type="danger" @click="deleteBlog(scope.row.blogId)">删除
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
      :current-page="this.blogInline.currentPage"
      :page-sizes="[5, 10, 20, 40]"
    :page-size="this.blogInline.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
    </el-pagination>
    <!--添加弹窗-->
    <el-dialog title="添加" :visible.sync="dialogBlogAddVisible" width="80vw" top="10vh">
      <blog-add @closeAddDialog="closeAddDialog"/>
    </el-dialog>
    <!--阅读弹窗-->
    <el-dialog title="阅读" :visible.sync="dialogBlogLookVisible" v-if="dialogBlogLookVisible" width="80vw" top="10vh">
      <blog-look @closeLookDialog="closeLookDialog" :blogId.sync="blogId"/>
    </el-dialog>
    <!--修改弹窗-->
    <el-dialog title="修改" :visible.sync="dialogBlogEditVisible" v-if="dialogBlogEditVisible" width="80vw" top="10vh">
      <blog-edit @closeEditDialog="closeEditDialog" :blogId.sync="blogId"/>
    </el-dialog>
  </div>
</template>

<script>
  import {getBlogListByCondition} from '../../../api/blog'
  import {deleteBlogById} from '../../../api/blog'
  import {deleteAllBlogs} from '../../../api/blog'
  import {returnAllBlogs} from '../../../api/blog'
  import {getTypeList} from '../../../api/type'
  import blogAdd from "./blogAdd";
  import BlogLook from "./blogLook";
  import BlogEdit from "./blogEdit";

  export default {
    name: "blogList",
    data() {
      return {
        // 默认博客查询 根据标题 博客分类
        types: [],
        blogInline: {
          title: '',
          type: "",
          begin: '',
          end: '',
          currentPage:1,
          pageSize:5
        }
        ,
        blogs: [],
        total:1000,
        loading: true,
        dialogBlogAddVisible: false,
        dialogBlogLookVisible: false,
        dialogBlogEditVisible: false,
        blogId: ''
      }
    },
    methods: {
      searchBlogs() {
        getBlogListByCondition(this.blogInline)
          .then(res => {
            if (res.data.blogs != null) {
              this.blogs = res.data.blogs.list;
              this.total=res.data.blogs.total;
              this.loading = false;
            }
          })
          .catch(res => {
            console.log(res)
          })
      }
      , addBlogs() {
        // 添加blog 添加弹出框
        this.dialogBlogAddVisible = true
      }
      ,
      editBlog(row) {
        //编辑指定博客
        this.dialogBlogEditVisible = true
        this.blogId = row
      },
      lookBlog(row) {
        //查看指定博客
        this.dialogBlogLookVisible = true
        this.blogId = row
      },
      deleteBlog(row) {
        // 删除指定博客
        deleteBlogById(row).then(res => {
          console.log(res)
          if (res.success) {
            this.$message.success(res.data.message)
            this.searchBlogs()
          } else {
            this.$message.error("删除失败")
          }
        })
      },
      clearBlogs() {
        // 清空所有博客
        deleteAllBlogs().then(res => {
          if (res.success) {
            this.$message.success(res.data.message)
            this.searchBlogs()
          } else {
            this.$message.error("删除所有blog失败")
          }
        })

      },
      ReturnAllBlogs() {
        // 还原所有blog
        returnAllBlogs().then(res => {
          if (res.success) {
            this.$message.success(res.data.message)
            this.searchBlogs()
          } else {
            this.$message.error("还原所有blog失败")
          }
        })

      },
      closeAddDialog(msg) {
        this.dialogBlogAddVisible = msg
        this.searchBlogs();
        getTypeList().then(res => {
          this.types = res.data.typeReturns;
        })
      },
      closeLookDialog(msg) {
        this.dialogBlogLookVisible = msg
        this.searchBlogs();
        getTypeList().then(res => {
          this.types = res.data.typeReturns;
        })
      },
      closeEditDialog(msg) {
        this.dialogBlogEditVisible = msg
        this.searchBlogs();
        getTypeList().then(res => {
          this.types = res.data.typeReturns;
        })
      },
      handleSizeChange(size){
        this.blogInline.pageSize=size;
        this.searchBlogs();
      },
      handleCurrentChange(currentPage){
        this.blogInline.currentPage=currentPage;
        this.searchBlogs();
      }
    },
    created() {

      this.searchBlogs();
      getTypeList().then(res => {
        this.types = res.data.typeReturns;
      })
    },
    /*监听对象属性*/
    watch: {
      "blogInline.title"(newVal, oldVal) {
        this.searchBlogs();
      },
      "blogInline.type"(newVal, oldVal) {
        this.searchBlogs();
      },
      "blogInline.begin"(newVal, oldVal) {
        this.searchBlogs();
      },
      "blogInline.end"(newVal, oldVal) {
        this.searchBlogs();
      }
    },
    components: {
      BlogEdit,
      BlogLook,
      blogAdd
    }
  }
</script>

<style scoped>
  .el-dropdown-menu__item {
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
