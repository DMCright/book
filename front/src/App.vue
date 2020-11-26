<template>
<div id="booksIndex">
  <div class="line"></div>
  <el-menu
  style="border:none;"
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
    <!--<el-menu-item index="2-1">我的书架</el-menu-item>-->
    <el-menu-item index="2-2" @click="toModify">个人信息修改</el-menu-item>
    <el-menu-item index="2-3" @click="toModifyHistory">借阅历史</el-menu-item>
  </el-submenu>
  <!-- <el-menu-item><el-button type="success" @click="toNoticeManager" plain >公告管理测试</el-button></el-menu-item> -->
  <!-- <el-menu-item index="3" disabled>谷恒条野妙妙屋</el-menu-item> -->
  <!--<el-menu-item index="4"><a href="https://www.bilibili.com" target="_blank">友商页面</a></el-menu-item>-->
  <!--<el-menu-item><el-button type="success" @click="toLendBook" plain >借书测试</el-button></el-menu-item>-->
  <el-menu-item index="3" class="notice" @click="loadNotice">
    <el-dropdown :hide-on-click="false" trigger="click"  @command="handleCommand">
      <span class="el-dropdown-link" style="color:#fff;">
        公告({{total}})
        <i style="color:#fff;" class="el-icon-arrow-down el-icon--right"></i>
        <el-badge :is-dot="total > 0" class="dot"></el-badge>
      </span>
      <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :command="readAll" style="color:red; padding-left:0px;padding-right:0px;"><el-button type="primary" style="width:100%;">全读</el-button></el-dropdown-item>
      <el-dropdown-item disabled>
      <i class="el-icon-arrow-down el-icon--right"></i>单击读公告
      </el-dropdown-item>
        <el-dropdown-item v-for="(it,index) in notices" :key="index" :command="it.id">{{it.message}}</el-dropdown-item>
        <!--<el-dropdown-item :command="test">黄金糕asdasdasdas</el-dropdown-item>
        <el-dropdown-item command="b">狮子头</el-dropdown-item>
        <el-dropdown-item command="c" >螺蛳粉</el-dropdown-item>
        <el-dropdown-item command="d">蚵仔煎</el-dropdown-item>-->
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu-item>
  <el-menu-item index="4" @click="toTuShiLin" v-if="this.showAdmin">管理员入口</el-menu-item>
  <div class="loginsign">
    <!--<span v-if="onlogin">
    <img class="headElephant" src="./assets/py.png" alt="headElephant" @click="toModify"></span>-->
    <el-button id="user_tip" v-if="onlogin" @click="toModify" type="text">{{username}},{{this.managerGreeting}}您好</el-button>
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
    this.loadNotice()
    let user = {id:-1,username:'',token:'',status:-1}
    user.id = sessionStorage.getItem("id")
    user.username = sessionStorage.getItem("username")
    user.token = sessionStorage.getItem("token")
    user.status = sessionStorage.getItem("status")
    if(sessionStorage.getItem("id") != null){
      if(user.status == 1){
        this.managerGreeting = '尊敬的管理员'
        this.showAdmin = true
      }
      this.login(user)
    }
  },
  data() {
      return {
        notices:[],
        pageSize:10,
        currentSize:1,
        total:0,
        test:'a',
        readAll:true,
        showAdmin:false,
        managerGreeting:'',
        onlogin:false,
        id:-1,
        username:'',
        input: '',
        status:-1,
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
      toLendBook(){
        this.$router.push({path:'/lendBook'})
      },
      toTuShiLin(){
        window.location.href = 'http://10.10.102.165:8080' 
      },
      toNoticeManager(){
        this.$router.push({path:'/noticeManager'})
      },
      loadSessionData(){
        let user = {id:-1,username:'',token:'',status:-1}
        user.id = sessionStorage.getItem("id")
        user.username = sessionStorage.getItem("username")
        user.token = sessionStorage.getItem("token")
        user.status = sessionStorage.getItem("status")
      },
      loadNotice(){
        if(sessionStorage.getItem('id') == null){
          return
        }
        // this.$http.get(this.MYLINK.link2+'/admin/notice/select/'+10+'/'+1)
        this.$http.get(this.MYLINK.link2+'/admin/message/getUnReadMsgByUserId/'+sessionStorage.getItem('id'))
        .then(res=>{
          if(res!=null){
            console.log(res)
            if(res.data.data!=null){
              this.total = res.data.data.length
              if(res.data.data.length >10){
                this.notices = res.data.data.slice(0,10)
              }else{
                this.notices = res.data.data
              }
            }else{
              this.total = 0
            }
          }else{
            this.fail("访问公告失败")
            this.total = 0
          }
        }).catch(e=>{
          this.fail("访问失败")
          console.log(e)
        })
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
      outLoginNow(){
          sessionStorage.removeItem("id")
          sessionStorage.removeItem("username")
          sessionStorage.removeItem("token")
          sessionStorage.removeItem("status")
          this.id = -1
          this.username = ''
          this.onlogin = false
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
          sessionStorage.removeItem("status")
          this.notices = []
          this.total = 0
          this.id = -1
          this.username = ''
          this.onlogin = false
          this.$router.push({path:'/'})
          this.showAdmin = false
          this.managerGreeting = ''
          this.status = 0
          this.$message({
            type: 'success',
            message: '已退出登录'
          });
        }).catch(() => {       
          });
      },
      toModify(){
        if(sessionStorage.getItem("token") == null){
          this.fail("未登录")
          this.outLoginNow()
          this.$router.push({path:'/login'})
          return;
        }
        this.$router.push({path:'/modify',query:{
          id:this.id,
          username:this.username
        }})
      },
      toModifyHistory(){
        if(sessionStorage.getItem("token") == null){
          this.fail("未登录")
          this.outLoginNow()
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
        this.status = user.status
        this.onlogin = true
        if(this.status == 1){
          this.managerGreeting = '尊敬的管理员'
          this.showAdmin = true
        }
        this.loadNotice()
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleCommand(command){ 
        console.log(command)          //公告点击   
        if(command == null){
          return
        }
        if(sessionStorage.getItem('id') == null){
                return
              }
        if(command == this.readAll){
            this.$confirm('是否全部已读？', '全读 ',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
              for(let i = 0;i < this.notices.length;i++){
                this.readOne(this.notices[i].id)
              }
              this.loadNotice()
            this.$message({
              type: 'success',
              message: '已全读'
            });
            this.total = 0
          }).catch(() => {       
            });
        }else{
          // this.$http.get(this.MYLINK.link2+'/admin/message/getUnReadMsgByUserId/'+sessionStorage.getItem('id'))
          this.readOne(command)
          this.loadNotice()
        }
        
      },
      readOne(nid){
        this.$http.post(this.MYLINK.link2+
          '/admin/message/setRead/'+sessionStorage.getItem('id')+'/'+nid)
          .then(res=>{
          if(res!=null){
              this.success("已读")
              this.loadNotice()
            }else{
              this.fail("失败")
              this.total = 0
            }
          }).catch(e=>{
            this.fail("访问失败")
            console.log(e)
          })
      }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*.notice-container{
  z-index:10;
  width: 0px;
  height: 0px;
  border: solid 1px;
  background-color: #fff;
  transition: height 1s;
}
.notice:hover .notice-container{
  height: 300px;
  width: 300px;
}
.notice:hover{
  text-align: center;
  padding-left: 0px;
  padding-right: 0px;
}*/
.dot{
  position: absolute;
}
body{
  min-width: 800px;
}
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
  z-index: 1;
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
