<template>
<div id="booksIndex">
  <div class="line"></div>
  <el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#138fbc"
  text-color="#fff"
  active-text-color="#a7d8ec">
  <el-menu-item index="1" @click="toIndex">首页</el-menu-item>
  <el-submenu index="2">
    <template slot="title">个人</template>
    <el-menu-item index="2-1">我的书架</el-menu-item>
    <el-menu-item index="2-2" @click="toModify">个人信息修改</el-menu-item>
    <el-menu-item index="2-3" @click="toModifyHistory">借阅历史</el-menu-item>
  </el-submenu>
  <el-menu-item index="3" disabled>谷恒条野妙妙屋</el-menu-item>
  <el-menu-item index="4"><a href="https://www.bilibili.com" target="_blank">友商页面</a></el-menu-item>
  <div class="loginsign">
    <span v-if="onlogin">
    <img class="headElephant" src="./assets/py.png" alt="headElephant" @click="toModify"></span>
    <el-button id="user_tip" v-if="onlogin" @click="toModify" type="text">您好,{{username}}</el-button>
    <el-button id="out_login_tip" v-if="onlogin" type="text" @click="outLogin">退出</el-button>
    <el-button v-if="!onlogin" type="primary" @click="toLogin" plain>登录</el-button>
    <el-button v-if="!onlogin" type="success" @click="toReg" plain >注册</el-button>
  </div>
</el-menu> 
 <router-view v-on:listenLogin="login" />
  </div>

</template>

<script>


export default {
  name: 'booksIndex',
  created(){
    let user = {id:-1,username:'',token:''}
    user.id = sessionStorage.getItem("id")
    user.username = sessionStorage.getItem("username")
    user.token = sessionStorage.getItem("token")
    if(sessionStorage.getItem("id") != null){
      this.login(user)
    }
  },
  data() {
      return {
        onlogin:false,
        id:-1,
        username:'',
        input: '',
        activeIndex: '1',
        activeIndex2: '1',
        imgList:[
        {url:require('./assets/logo.png')},
        {url:require('./assets/logo.png')},
        {url:require('./assets/logo.png')},
        {url:require('./assets/logo.png')}
      ]
      }
    },
    methods: {
      loadSessionData(){
        let user = {id:-1,username:'',token:''}
        user.id = sessionStorage.getItem("id")
        user.username = sessionStorage.getItem("username")
        user.token = sessionStorage.getItem("token")
      },
      success(msg) {
        this.$message({
          message: msg,
          type: 'success'
        });
      },
      fail(msg) {
        this.$message.error(msg);
      },
      outLogin() {
        this.$confirm('是否退出登录？', '退出 ',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          sessionStorage.removeItem("id")
          sessionStorage.removeItem("username")
          sessionStorage.removeItem("token")
          this.id = -1
          this.username = ''
          this.onlogin = false
          this.$router.push({path:'/'})
          this.$message({
            type: 'success',
            message: '已退出登录'
          });
        }).catch(() => {       
          });
      },
      toModify(){
        if(this.id<0 || this.username==''){
          this.fail("未登录")
          this.$router.push({path:'/login'})
          return;
        }
        this.$router.push({path:'/modify',query:{
          id:this.id,
          username:this.username
        }})
      },
      toModifyHistory(){
        if(this.id<0 || this.username==''){
          this.fail("未登录")
          this.$router.push({path:'/login'})
          return
        }
        this.$router.push({path:'/modify/personHistory',query:{
          id:this.id,
          username:this.username,
          navpath:"personHistory"
        }})
      },
      toIndex(){
          this.$router.push({path:'/'})
      },
      toReg(){
        this.$router.push({path:'/reg'})
      },
      toLogin(){
        this.$router.push({path:'/login'})
      },
      login(user){
        this.id = user.id
        this.username = user.username
        this.onlogin = true
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #user_tip{
    color: #fff;
  }
  #user_tip:hover{
    color: #a7d8ec;
  }
  #out_login_tip{
    margin-left: 30px;
    color: #a7d8ec;
  }
  #out_login_tip:hover{
    color: #fff;
  }
  #booksIndex{
    background-color: #a7d8ec;
  }

  #booksIndex > img{
  height: 100%;
  width: 100%;
  border-radius: 20px;
}
.el-row {
    margin-bottom: 20px;
}
.el-col {
    border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 200px;
}
.advertising{
  border-radius: 4px;
  min-height: 36px;
  text-align: center;
  background: url("./assets/logo.png");
  background-size: cover;
  color: white;
}
.text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 200px;
  }
  
  .loginsign{
    padding: 10px;
    position: absolute;
    right: 2px;
  }
  ul{
    list-style: none;
  }
  .books{
    margin-left: 50px;
    border-radius: 2px;    
    width: 100px;
    height: 160px;
  }
  .headElephant{
    cursor: pointer;
    width:30px;
    height: 30px;
    border-radius: 20px;
    padding: 2px;
  }
</style>
