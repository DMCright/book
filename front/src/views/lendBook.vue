<template>
    <!--  -->
    <div id="lendBook">
        <el-container>
            <el-header style="height:100%;">
                <el-form ref="form" :model="lendBook" label-width="100px">
                    <el-row :gutter="10">
                        <el-col :span="6"><el-form-item label="借书用户ID:">
                            <el-input v-model="lendBook.userId" placeholder="请输入借书用户ID"></el-input>
                        </el-form-item></el-col>
                        <el-col :span="6"><el-form-item label="要借书籍ID:">
                            <el-input v-model="lendBook.bookId" placeholder="请输入要借书籍ID"></el-input>
                        </el-form-item></el-col>
                        <el-col :span="6" ><el-form-item >
                            <el-button type="primary" @click="lend" >使该用户借书</el-button>
                        </el-form-item></el-col>
                    </el-row>
                </el-form>
                <el-row :gutter="10">
                <el-col :span="2">
                        用户ID:
                    </el-col>
                    <el-col :span="6">
                        <el-input v-model="userId" placeholder="根据ID查询用户借阅历史"></el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-button type="primary" @click="loadTableData">查询该用户借阅历史</el-button>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
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
                    label="是否返还"
                    width="120">
                    </el-table-column>
                    <el-table-column
                        label="点击返还">
                        <template slot-scope="scope">
                            <el-button
                            @click="returnBook(scope.$index, scope.row)">返还书籍
                            </el-button>
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
        </el-container>
    </div>

</template>

<script>
export default {
    name:"lendBook",
    data(){
        return{
            lendBook:{
                userId:null,
                bookId:null
            },
            userId:null,
            dialogMsg:[],
            selectedRow:-1,
            dialogVisible:false,
            currentPage:1,
            total:0,
            pageSizes:[5,10,20],
            pageSize:5,
            tableData: [],
            lastPage:0
        }
    },
    methods:{
        // 提示
        success(msg) {
        this.$message({
            message: msg,
            type: 'success'
        });
        },
        // 失败
        fail(msg) {
            this.$message.error(msg);
        },
        // 借书
        lend(){
            this.$http.post(this.MYLINK.link15001+'/admin/lend/'+this.lendBook.userId+'/'+this.lendBook.bookId)
            .then(res=>{
                if(res!=null){
                    console.log(res)
                    if(res.data.code == 200){
                        this.success("借书成功")
                    }else{
                        this.fail(res.data.message)
                    }
                }else{
                    this.fail("访问失败")
                }
            }).catch((e)=>{
                this.fail("无法访问")
                console.log(e)
            })
        },
        // 加载用户借阅历史数据
        loadTableData(){
            this.$http.get(this.MYLINK.link12001+'/userBook/getByUid'+
            '/'+this.pageSize+'/'+this.currentPage+'/'+this.userId)
            .then(res=>{
                if(res!=null){
                    if(res.data.data!=null){
                        console.log(res)
                        this.tableData = []
                        for(let i = 0;i < res.data.data.list.length;i++){
                            if(res.data.data.list[i].status == 0){       //筛选用户未返还书籍
                                this.tableData.push(res.data.data.list[i])
                            }
                        }
                        this.total = this.tableData.length
                        // this.total = res.data.data.total
                        // this.tableData = res.data.data.list
                        for(let i = 0;i < this.tableData.length;i++){
                            if(this.tableData[i].status ==1){
                                this.tableData[i].statusString = "已返还"
                            }else{
                                this.tableData[i].statusString = "未返还"
                            }
                        }
                        this.tableData.reverse()
                    }else{
                        return
                    }
                }else{
                    this.fail("访问失败")
                }
            }).catch((e)=>{
                this.fail("无法访问")
                console.log(e)
            })
        },
        // 返还书籍
        returnBook(index, row){
            this.$http.post(this.MYLINK.link15001+'/admin/returnBook/'+row.id)
            .then(res=>{
                if(res!=null){
                    console.log(res)
                    if(res.data.code == 200){
                        this.success("该书籍已还")
                        this.loadTableData()
                    }else{
                        this.fail(res.data.message)
                    }
                }else{
                    this.fail("访问失败")
                }
            }).catch((e)=>{
                this.fail("无法访问")
                console.log(e)
            })
        },
        // 表格大小改变
        handleSizeChange(val) {
            this.pageSize = val
            this.loadTableData()
        },
        // 表格当前页面改变
        handleCurrentChange(val) {
            this.currentPage = val
            this.loadTableData()
        },
        // 根据书籍返还状态来设置表格行的颜色,未返还的书籍为警告色,返还了的书籍为浅绿色
        tableRowClassName({rowIndex}) {
            if (this.tableData[rowIndex].status === 0) {
            return 'warning-row';
            }
            return 'success-row';
        },
        
    }
    
}
</script>

<style scoped>
.myBotton{
    margin-left: 0px;
}
</style>