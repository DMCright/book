<template>
    <div>
<!--        添加用户按钮-->
        <div style="padding: 10px">
            <el-button icon="el-icon-plus" type="primary" @click="addDialogVisible=true">添加用户</el-button>
        </div>
<!--        用户表格-->
        <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%;padding: 0px 0px"
                stripe
                border
        >
            <el-table-column
                    type="index">
            </el-table-column>
            <el-table-column
                    label="注册时间"
                    prop="registerDate">
            </el-table-column>
            <el-table-column
                    label="用户名"
                    prop="username">
            </el-table-column>
            <el-table-column
                    label="联系方式"
                    prop="telephone">
            </el-table-column>
            <el-table-column
                    label="邮箱"
                    prop="email">
            </el-table-column>
            <el-table-column
                    align="right">
                <template slot="header">
                    <el-input
                            v-model="search"
                            size="mini"
                            placeholder="输入关键字搜索"/>
                </template>
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.row.id)">修改
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row.id)">删除
                    </el-button>

                </template>
            </el-table-column>
        </el-table>
        <!--        分页区域-->
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pagenum"
                    :page-sizes="[5,10,15]"
                    :page-size="queryInfo.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
        <!--添加用户的对话框-->
        <el-dialog
                title="添加用户"
                :visible.sync="addDialogVisible"
                width="50%"
                @close="addDialogClosed"
        >
            <!--内容主题区-->
            <el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="90px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="telephone">
                    <el-input v-model="addForm.telephone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
                <el-form-item label="身份状态">
                    <el-select v-model="addForm.status" placeholder="自己人？">
                        <el-option label="普通用户" value=0></el-option>
                        <el-option label="管理员" value=1></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <!--底部区-->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </span>
        </el-dialog>

        <!--        修改用户的对话框-->
        <el-dialog
                title="修改用户"
                :visible.sync="editDialogVisible"
                width="70%"
                @close="editDialogClosed"
        >
            <!--内容主题区-->
            <el-form ref="editFormRef" :model="editForm" :rules="editFormRules" label-width="90px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="editForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="editForm.password"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="telephone">
                    <el-input v-model="editForm.telephone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editForm.email"></el-input>
                </el-form-item>
                <el-form-item label="身份状态">
                    <el-select v-if="editForm.status==0" v-model="editForm.status" placeholder="普通用户">
                        <el-option :label="lable0" value=0></el-option>
                        <el-option :label="lable1" value=1></el-option>
                    </el-select>
                    <el-select v-if="editForm.status==1" v-model="editForm.status" placeholder="管理员">
                        <el-option :label="lable0" value=0></el-option>
                        <el-option :label="lable1" value=1></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <!--底部区-->
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editUser">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                search: '',
                queryInfo: {
                    query: '',
                    //当前页数
                    pagenum: 1,
                    //每页显示多少数据
                    pagesize: 5
                },
                total: 0,
                //添加用户对话框的显示与隐藏
                addDialogVisible: false,
                //添加用户的表单数据
                addForm: {
                    username: '111',
                    password: '111aaa111',
                    telephone: '11111111111',
                    email: '123',
                    status: 0,
                    register_date: '',
                },
                //添加表单的验证规则对象
                addFormRules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {
                            max: 40,
                            message: '用户名长度应在20个汉字以内',
                            trigger: 'blur'//在失去焦点时触发验证
                        }
                    ],
                    password: [
                        {required: true, message: '请设置密码', trigger: 'blur'},
                        {
                            min: 8,
                            message: '最少8位密码并同时包含大小写和特殊字符',
                            trigger: 'blur'//在失去焦点时触发验证
                        }
                    ],
                    telephone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {
                            min: 11,
                            max: 11,
                            message: '请输入11位手机号',
                            trigger: 'blur'//在失去焦点时触发验证
                        }
                    ],
                    email: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {
                            min: 1,
                            max: 30,
                            message: '30字符长度限制',
                            trigger: 'blur'//在失去焦点时触发验证
                        }
                    ],
                },
                //编辑表单的验证规则对象
                editFormRules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {
                            max: 40,
                            message: '用户名长度应在20个汉字以内',
                            trigger: 'blur'//在失去焦点时触发验证
                        }
                    ],
                    password: [
                        {required: true, message: '请设置密码', trigger: 'blur'},
                        {
                            min: 8,
                            message: '最少8位密码并同时包含大小写和特殊字符',
                            trigger: 'blur'//在失去焦点时触发验证
                        }
                    ],
                    telephone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {
                            min: 11,
                            max: 11,
                            message: '请输入11位手机号',
                            trigger: 'blur'//在失去焦点时触发验证
                        }
                    ],
                    email: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {
                            min: 1,
                            max: 30,
                            message: '30字符长度限制',
                            trigger: 'blur'//在失去焦点时触发验证
                        }
                    ],
                },
                //控制修改用户对话框的显示与隐藏
                editDialogVisible: false,
                //编辑用户的表单数据
                editForm: {
                    id: 0,
                    username: '',
                    password: '',
                    telephone: '',
                    email: '',
                    status: 0,
                    register_date: '',
                },
                lable0: '普通用户',
                lable1: '管理员'
            }
        },

        created() {
            this.getUser();
            // this.$http.get("http://10.10.102.162:8001/user/select/100/1")
            //     .then(res => {
            //         this.tableData = res.data.data.list;
            //         console.log(this.tableData);
            //     })
        },

        methods: {
            getUser() {
                this.$http.get("http://10.10.102.162:8001/user/select/100/1")
                    .then(res => {
                        this.total = res.data.data.list.length;
                    });
                this.$http.get("http://10.10.102.162:8001/user/select/" + this.queryInfo.pagesize + "/" + this.queryInfo.pagenum)
                    .then(res => {
                        this.tableData = res.data.data.list;
                    });
            },
            //展示编辑用户对话框
            handleEdit(id) {
                console.log(id);
                this.$http.get("http://10.10.102.162:8001/user/get/" + id)
                    .then(res => {
                        // this.total = res.data.data.list.length;
                        if (res.data.code == 200) {
                            this.$message.success(res.data.message)
                        } else {
                            this.$message.error(res.data.message)
                        }
                        console.log(res.data.data)
                        this.editForm.id = id;
                        this.editForm.username = res.data.data.username;
                        this.editForm.password = res.data.data.password;
                        this.editForm.telephone = res.data.data.telephone;
                        this.editForm.email = res.data.data.email;
                        this.editForm.status = res.data.data.status;

                    });
                this.editDialogVisible = true;
            },
            //根据id删除用户信息
            handleDelete(id) {
                this.$confirm(id + '此操作将永久删除该用户的数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$http.delete('http://10.10.102.162:8001/user/delete/' + id)
                        .then(res => {
                            if (res.data.code == 200) {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            } else {
                                this.$message.error('删除失败')
                            }
                            //刷新用户数据表格
                            this.getUser()
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //监听pagesize改变事件
            handleSizeChange(newSize) {
                console.log(newSize);
                this.queryInfo.pagesize = newSize;
                this.getUser();
            },
            //监听页码值改变事件
            handleCurrentChange(newPage) {
                console.log(newPage)
                this.queryInfo.pagenum = newPage;
                this.getUser();
            },
            //监听对话框的关闭事件
            addDialogClosed() {
                this.$refs.addFormRef.resetFields();
            },
            //点击确认按钮，添加新用户
            addUser() {
                this.$refs.addFormRef.validate(async (valid) => {
                    console.log(valid);
                    console.log(this.addForm);
                    const {data: res} = await this.$http.post(
                        'http://10.10.102.162:8001/user/save',
                        this.$qs.stringify(this.addForm));
                    if (res.code !== 200) {
                        this.$message.error(res.message)
                    }
                    console.log(res);
                    this.$message.success(res.message)
                    //隐藏用户对话框
                    this.addDialogVisible = false
                    //重新刷新用户列表数据
                    this.getUser()
                })
            },
            //监听编辑用户对话框关闭事件
            editDialogClosed() {
                //resetFields()清空对话框的输入框
                this.$refs.editFormRef.resetFields();
            },
            //提交修改后的用户信息 表单
            editUser() {
                //validate验证表单
                this.$refs.editFormRef.validate(valid => {
                    //如果验证输入不合法，valid返回false
                    if (!valid) return
                    this.$http.put(
                        'http://10.10.102.162:8001/user/update',
                        this.$qs.stringify(this.editForm)
                        // {      id:this.editForm.id,
                        // username:this.editForm.username,
                        // password:this.editForm.password,
                        // telephone:this.editForm.telephone,
                        // email:this.editForm.email,
                        // status:this.editForm.status,
                        // }
                    ).then(res => {
                            console.log(res.status)
                            if (res.status != 200) {
                                return this.$message.error(res.data.message)
                            } else {
                                //提示修改成功
                                this.$message.success(res.data.message)
                            }
                        }
                    )
                    //关闭对话框
                    this.editDialogVisible = false
                    //刷新数据表格
                    this.getUser()

                })
            }
        },
    }
</script>

<style scoped>
    .el-pagination{
        position: center;
    }
</style>