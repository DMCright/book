<template>
    <el-container>
        <el-container>
            <el-aside width=50%>
                <el-header>用户详情</el-header>
            </el-aside>
            <el-main>
                <el-header>用户信息修改</el-header>
                <el-form ref="form" :model="form" label-width="80px">

                    <el-form-item label="用户名">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="用户密码">
                        <el-input v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <el-input v-model="form.telephone"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item label="头像">
                        <el-input v-model="form.head_image"></el-input>
                    </el-form-item>
                    <el-form-item label="身份状态">
                        <el-select v-model="form.status" placeholder="请选择身份状态">
                            <el-option label="普通用户" value=0></el-option>
                            <el-option label="管理员" value=1></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="注册时间">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择注册日期" v-model="form.register_date" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即修改</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    username: '',
                    id: '',
                    password: '',
                    telephone: '',
                    email: '',
                    head_image: '',
                    status: '',
                    register_date: '',
                }
            }
        },

        created(){
            this.$http.get("http://10.10.102.163:8001/user/select/5/1")
            .then(res=>{
                console.log(res.data.data.list);
                this.tableData = res.data.data.list;
            })
        },

        methods: {
            onSubmit() {
                console.log(this.form);
            }
        },
    }
</script>

<!--<style scoped>-->

<!--</style>-->