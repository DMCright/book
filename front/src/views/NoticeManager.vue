<template>
    <div id="notice">
    <el-container style="height:600px;">
        <el-main>
            <el-row>
                <el-col :span="22"><el-input v-model="searchInput" placeholder="请输入关键字"></el-input></el-col>
                <el-col :span="2"><el-button @click="search" icon="el-icon-search" circle></el-button></el-col>
            </el-row>
            <el-table
            :data="tableData"
            style="width: 100%">
                <el-table-column
                prop="publishDate"
                label="发布日期"
                width="150">
                </el-table-column>
                <el-table-column
                prop="message"
                label="公告"
                width="500">
                </el-table-column>
                <el-table-column
                label="操作"
                 width="180">
                <template slot-scope="scope">
                    <el-button
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
                </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>
        </el-main>
        <el-aside width="20%" style="position:relative;">
                <el-input
                    style="width:99%; height:500px; position:absolute;left:0px;top:70px;"
                    type="textarea"
                    placeholder="请输入公告内容"
                    :autosize="{ minRows: 21,maxRows:21}"
                    v-model="textarea">
                </el-input>
            <div style="width:100%; position:absolute;top:27px;">
                <el-button @click="publish" style="width:99%; position:absolute; left:0px; top:0px;" plain>发布公告</el-button>
            </div>
            
        </el-aside>
    </el-container>
    <el-dialog title="修改公告" :visible.sync="dialogFormVisible">
        <el-form :model="selected">
        <el-form-item label="公告">
            <el-input v-model="selected.message" autocomplete="off"></el-input>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleEdit">取 消</el-button>
            <el-button type="primary" @click="editNotice">确 定</el-button>
        </div>
</el-dialog>
    </div>
</template>

<script>
export default {
    name:'notice',
    mounted(){
        this.loadTableData()
    },
    data(){
        return{
            dialogFormVisible: false,
            total:-1,
            currentPage:1,
            pageSizes:[5,10,20],
            pageSize:5,
            searchInput:'',
            textarea:'',
            tableData:[],
            form:{
                uid:0,
                message:''
            },
            selected:{
                id:-1,
                message:''
            },
            selectedCopy:{
                message:''
            },
            notice:{
                id:-1,
                message:''
            }
        }
    },
    methods:{
        success(msg) {
        this.$message({
          message: msg,
          type: 'success'
        });
      },
      fail(msg) {
        this.$message.error(msg);
      },
        loadTableData(){
            this.$http.get(this.MYLINK.link2+'/admin/notice/select/'+this.pageSize+'/'+this.currentPage)
            .then(res=>{
                console.log(res)
                this.tableData = res.data.data.list
                this.total = res.data.data.total
            })
        },
        handleEdit(index, row) {
        console.log(index, row);
        this.dialogFormVisible = true
        this.selected.id = row.id
        this.selected.message = row.message
      },
      cancleEdit(){
          this.dialogFormVisible = false
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('是否删除该公告？', '删除 ',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$http.delete(this.MYLINK.link2+'/admin/notice/delete/'+row.id)
            .then(res=>{
            if(res!=null){
                console.log(res)
                if(res.data.code==200){
                    this.success("删除成功")
                    this.loadTableData()
                }else{
                    this.fail(res.data.message)
                }
            }else{
                this.fail("访问失败")
            }
        }).catch((e)=>{
            console.log(e)
            this.fail("无法访问")
        })
        }).catch(() => {       
          });
      },
      handleSizeChange(val){
          this.pageSize = val
          this.search()
      },
      handleCurrentChange(val){
          this.currentPage = val
          this.search()
      },
      publish(){
          if(this.textarea == ''){
              this.fail("公告不能为空")
              return
          }
          this.form.message = this.textarea
          let format =  this.$qs.stringify(this.form)
          this.$http.post(this.MYLINK.link2+'/admin/notice/save',format)
          .then(res=>{
              console.log(res)
              if(res !=null){
                  if(res.data.code==200){
                      this.success('发布成功')
                      this.loadTableData()
                      this.textarea = ''
                  }
              }else{
                  this.fail('发布失败')
              }
          }).catch((e)=>{
              this.fail("无法访问")
              console.log(e)
          })
      },
      search(){
          if(this.searchInput=='' || this.searchInput==null || this.searchInput==undefined){
              this.loadTableData()
              return
          }
          this.$http.get(this.MYLINK.link13001+'/message/selectByMessage/'
          +this.pageSize+'/'+this.currentPage+'/'+this.searchInput)
          .then(res=>{
              console.log(res)
              if(res !=null){
                  if(res.data.code==200){
                    this.tableData = res.data.data.list
                    this.total = res.data.data.total
                  }
              }else{
                  this.fail('失败')
              }
          }).catch((e)=>{
              this.fail("无法访问")
              console.log(e)
          })
      },
      editNotice(){
          if(this.selected.message == '' || this.selected.message == null){
              this.fail('公告不能为空')
              this.dialogFormVisible = false
              return
          }
          this.dialogFormVisible = false
          this.notice.id = this.selected.id
          this.notice.message = this.selected.message
          let format =  this.$qs.stringify(this.notice)
          this.$http.put(this.MYLINK.link2+'/admin/notice/update',format)
          .then(res=>{
              console.log(res)
              if(res !=null){
                  if(res.data.code==200){
                    this.success('修改成功')
                    this.loadTableData()
                  }
              }else{
                  this.fail('修改失败')
              }
          }).catch((e)=>{
              this.fail("无法访问")
              console.log(e)
          })
      }
    }
}
</script>

<style scoped>
body{
  min-width: 1000px;
}
 div > .el-input > input{
    height: 100%;
}
</style>
