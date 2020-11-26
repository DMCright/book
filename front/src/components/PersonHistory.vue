<template>
    <div>
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
    },
    methods: {
      // 借阅历史查询
      search(){
        if(this.input == '' || this.input==null || this.input==undefined){
          this.loadTableData()                                                 //输入的关键字为空默认查看所有数据
        }else{
          console.log(this.input)
        }
      },
      // 历史选中
      handleClick(row){
        console.log("选中"+row)
        this.selectedRow = row
        this.dialogVisible = true
        this.dialogMsg = this.tableData[row]
      },
      // 通过session加载用户数据
      loadUserDataBySession(){
      this.$http.get(this.MYLINK.link8001+"/user/get/"+sessionStorage.getItem('id'))
      .then(res=>{
        if(res !=null){
          console.log(res)
          this.user.id = res.data.data.id
          this.user.username = res.data.data.username
          this.user.telephone = res.data.data.telephone
          this.user.email = res.data.data.email
          this.user.head_image = res.data.data.headImage
          this.loadTableData()
        }else{
          this.fail('数据获取失败')
        }
      }).catch((e)=>{
        console.log(e)
        this.fail("无法访问")
      })
    },
      // 加载表格数据
      loadTableData(){
        this.$http.get(this.MYLINK.link12001+'/userBook/getByUid'+
      '/'+this.pageSize+'/'+this.currentPage+'/'+sessionStorage.getItem("id"))
      .then(res=>{
        if(res.data.data == null){
          return
        }
        console.log(res)
        this.total = res.data.data.total
        this.tableData = res.data.data.list
        this.tableData.reverse()
        for(let i = 0;i < this.tableData.length;i++){
          if(this.tableData[i].status ==1){
            this.tableData[i].statusString = "已返还"
          }else{
            this.tableData[i].statusString = "未返还"
          }
        }
      })
      },
      // 表格大小改变
      handleSizeChange(val) {
        this.pageSize = val
        this.loadTableData()
      },
      handleCurrentChange(val) {
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
        pageSizes:[5,10,20],
        pageSize:5,
        user:{
          id:-1,
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