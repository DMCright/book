<template>
    <div>
 <!--   <el-dialog
  title="书籍详情"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>{{dialogMsg.book.bookName}}</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>-->
<el-row>
  <el-col :span="22"><el-input v-model="input" @keydown.enter.native="search" placeholder="请输入关键字"></el-input></el-col>
  <el-col :span="2"><el-button icon="el-icon-search" @click="search" circle></el-button></el-col>
</el-row>
        <el-table
            :data="tableData"
            style="width: 100%"
            :row-class-name="tableRowClassName">
                  <el-table-column type="expand">
                    <template slot-scope="props">
                      <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="书名">
                          <span>{{props.row.book.bookName}}</span>
                        </el-form-item>
                        <el-form-item label="类别">
                          <span>{{props.row.book.category.categoryName}}</span>
                        </el-form-item>
                        <el-form-item label="作者">
                          <span>{{props.row.book.author}}</span>
                        </el-form-item>
                        <el-form-item label="编号">
                          <span>{{props.row.book.cardId}}</span>
                        </el-form-item>
                        <el-form-item label="出版社">
                          <span>{{props.row.book.press}}</span>
                        </el-form-item>
                        <el-form-item label="出版时间">
                          <span>{{props.row.book.pressDate}}</span>
                        </el-form-item>
                        <el-form-item label="所在书架">
                          <span>{{props.row.book.bookShelf}}</span>
                        </el-form-item>
                        <el-form-item label="书架层号">
                          <span>{{props.row.book.bookShelf}}</span>
                        </el-form-item>
                        <el-form-item label="描述">
                          <span>{{props.row.book.bookDesc}}</span>
                        </el-form-item>
                      </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                prop="lendDate"
                label="借书日期"
                width="150">
                </el-table-column>
                <el-table-column
                prop="book.bookName"
                label="书名"
                width="200">
                </el-table-column>
                <el-table-column
                prop="book.category.categoryName"
                label="类别"
                width="200">
                </el-table-column>
                <el-table-column
                prop="returnDate"
                label="返还时间"
                width="150">
                </el-table-column>
                 <el-table-column
                prop="statusString"
                label="是否返还">
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
    </div>
    
</template>
<script>
  export default {
    mounted(){
      this.loadUserDataBySession()
      // this.user = this.$route.query
      this.loadTableData()
    },
    methods: {
      search(){
        if(this.input == '' || this.input==null || this.input==undefined){
          this.loadTableData()                                                 //输入的关键字为空默认查看所有数据
        }else{
          console.log(this.input)
        }
      },
      handleClick(row){
        console.log("选中"+row)
        this.selectedRow = row
        this.dialogVisible = true
        this.dialogMsg = this.tableData[row]
      },
      loadUserDataBySession(){
      this.$http.get(this.MYLINK.link+"/user/get/"+sessionStorage.getItem('id'))
      .then(res=>{
        if(res !=null){
          this.user.id = res.data.data.id
          this.user.username = res.data.data.username
          this.user.telephone = res.data.data.telephone
          this.user.email = res.data.data.email
          this.user.head_image = res.data.data.headImage
        }else{
          this.fail('数据获取失败')
        }
      }).catch((e)=>{
        console.log(e)
        this.fail("无法访问")
      })
    },
      loadTableData(){
        this.$http.get(this.MYLINK.link+'/admin/history/'+this.user.id+
      '/'+this.pageSize+'/'+this.currentPage)
      .then(res=>{
        console.log(res)
        if(res.data.data == null){
          return
        }
        this.total = res.data.data.endRow
        this.tableData = res.data.data.list
        for(let i = 0;i < this.tableData.length;i++){
          if(this.tableData[i].status ==1){
            this.tableData[i].statusString = "已返还"
          }else{
            this.tableData[i].statusString = "未返还"
          }
        }
      })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val
        this.loadTableData()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val
        this.loadTableData()
      },
      tableRowClassName({rowIndex}) {
        if (this.tableData[rowIndex].status === 0) {
          return 'warning-row';
        }
        return 'success-row';
      }
    },
    data() {
      return {
        input:'',
        dialogMsg:[],
        selectedRow:-1,
        dialogVisible:false,
        currentPage:1,
        total:0,
        pageSizes:[5,10,20,40],
        pageSize:5,
        user:{
          id:0,
          head_image:'',
          username: '',
          telephone: '',
          email: ''
      },
        tableData: []
      }
    }
  }
</script>

<style>
.el-table .warning-row {
    background: rgb(245, 234, 215);
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
   .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>