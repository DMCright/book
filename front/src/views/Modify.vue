<template>
    <div style="height:600px;">
    <el-container>
        <el-container>
            <el-aside> 
                <el-menu class="el-menu-vertical-demo">
                    <el-menu-item index="1" @click="toModify">
                    <i class="el-icon-document"></i>
                    <span slot="title">个人信息修改</span>
                    </el-menu-item>
                    <el-menu-item index="2" @click="toPersonHistory">
                    <i class="el-icon-menu"></i>
                    <span slot="title">借阅历史</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
    </div>
</template>

<script>
export default {
    data(){
        return{
            user:{
                id:-1,
                username:'',
                telephone:'',
                email:'',
                head_image:'',
                statue:-1,
                registerDate:''
            },
            headUrl:"../assets/logo.png"
        }
    },
    mounted() {
        // 加载用户信息
        this.user.id = this.$route.query.id
        this.$http.get(this.MYLINK.link8001+'/user/get/'+this.user.id)
        .then(res=>{
            console.log(res)
            this.user.username = res.data.data.username
            this.user.telephone = res.data.data.telephone
            this.user.email = res.data.data.email
            this.user.head_image = res.data.data.headImage
            this.user.status = res.data.data.status
            this.user.registerDate = res.data.data.registerDate
            }
        )
        
    },
    methods:{
        // 提示
        success(msg) {
        this.$message({
          message: msg,
          type: 'success'
        });
        },
        fail(msg) {
            this.$message.error(msg);
        },
        // 子路由跳转到修改个人信息页面
        toModify(){
            if(sessionStorage.getItem("token")==null){
                this.fail('未登录')
                this.$router.push({path:'/login'})
                return
            }
            this.$router.push({path:"/modify/msgModify",
            query:{id:this.user.id,
            head_image:this.user.head_image,
            username:this.user.username,
            telephone:this.user.telephone,
            email:this.user.email}})
        },
        // 子路由跳转到修改个人借阅历史页面
        toPersonHistory(){
            if(sessionStorage.getItem("token")==null){
                this.fail('未登录')
                this.$router.push({path:'/login'})
                return
            }
            this.$router.push({path:"/modify/personHistory",
            query:{id:this.user.id,
            head_image:this.user.head_image,
            username:this.user.username,
            telephone:this.user.telephone,
            email:this.user.email}})
        },
        //自定义跳转路由路径,通过newpath来决定路径
        toNewPath(newpath){
            if(sessionStorage.getItem("token")==null){
                this.fail('未登录')
                this.$router.push({path:'/login'})
                return
            }
            if(newpath == null || newpath == '' || newpath ==undefined)
            return
            this.$router.push({path:newpath,
            query:{id:this.user.id,
            head_image:this.user.head_image,
            username:this.user.username,
            telephone:this.user.telephone,
            email:this.user.email}})
        }
    }
}
</script>

<style>
.el-aside{
    width: 25%;
    line-height: 100px;
    height: 600px;
    background:rgba(255, 255, 255, 0.7);
}
.headimg{
    width: 150px;
    height: 150px;
}
.el-header{
    padding-top: -20px;
    text-align: left;
}
</style>