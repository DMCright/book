<template>
    <div style="height:100%;">
    <el-container>
        <el-header></el-header>
        <el-container>
        <el-aside width="25%"> 
            <img class="headimg"  src="../assets/images/mercy.jpg" alt="">
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
        this.user.id = this.$route.query.id
        this.$http.get(this.MYLINK.link+'/user/get/'+this.user.id)
        .then(res=>{
            console.log(res)
            this.user.username = res.data.data.username
            this.user.telephone = res.data.data.telephone
            this.user.email = res.data.data.email
            this.user.head_image = res.data.data.headImage
            this.user.status = res.data.data.status
            this.user.registerDate = res.data.data.registerDate

            // if(this.$route.query.navpath == null || this.$route.query.navpath == '' || this.$route.query.navpath ==undefined){
            //     this.toModify()
            //     return 
            // }
            // let newpath = "/modify/"+this.$route.query.navpath
            // this.toNewPath(newpath)
            }
        )
        
    },
    methods:{
        toModify(){
            this.$router.push({path:"/modify/msgModify",
            query:{id:this.user.id,
            head_image:this.user.head_image,
            username:this.user.username,
            telephone:this.user.telephone,
            email:this.user.email}})
        },
        toPersonHistory(){
            this.$router.push({path:"/modify/personHistory",
            query:{id:this.user.id,
            head_image:this.user.head_image,
            username:this.user.username,
            telephone:this.user.telephone,
            email:this.user.email}})
        },
        toNewPath(newpath){
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
    line-height: 100px;
}
.headimg{
    width: 150px;
    height: 150px;
}
</style>