<template>
<div id="frame">
<el-container style="height:600px;">
  <el-aside style="width:450px;">
      <img id="left_back" src="../assets/img/v_girl2.jpg" alt="py">
  </el-aside>
  <el-container>
    <el-main>
      <h2>欢迎登录品品品图书馆</h2>
      <div class="inframe">
      <!-- <el-input v-model="username" placeholder="请输入用户名"></el-input>
      <el-input v-model="password" placeholder="请输入密码" show-password></el-input>
      <el-input v-model="tel" placeholder="请输入电话号码"></el-input>
      <el-input v-model="email" placeholder="请输入电子邮箱"></el-input>
      <el-button type="primary" style="width: 100%;" @click="submit">快速注册</el-button> -->
      <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="用户名">
    <el-input @keyup.enter.native="submit" v-model="form.username" placeholder="请输入用户名"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input @keyup.enter.native="submit" v-model="form.password" placeholder="请输入密码" show-password></el-input>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" style="width: 100%;" @click="submit">登录</el-button>
  </el-form-item>
</el-form>
      </div>
    </el-main>
    <el-footer>
      <span>v 1.0</span>
    </el-footer>
  </el-container>
</el-container>
</div>
</template>
<script>

export default {
  data() {
    return {
      form:{
        username: '',
        password:''
      }
    }
  },
  mounted(){
    // console.log(this.$route.params.username)
    //   this.form.username = this.$route.params.username
    //   this.form.password = this.$route.params.password
  },
  methods: {
    success(msg) {
        this.$message({
          message: msg,
          type: 'success'
        });
      },
      fail(msg) {
        this.$message.error(msg);
      },
    submit() {
       this.$http.post('http://10.10.102.162:8001/user/login',{"username":this.form.username,"password":this.form.password})
       .then(res=>{
          // alert(res.data.message)
          if(res.data.data != null){
            let usermsg = {username:this.form.username,id:res.data.data[0]}
            sessionStorage.setItem("id",usermsg.id)
            sessionStorage.setItem("username",usermsg.username)
            this.$emit("listenLogin",
            usermsg)
            this.$router.push({path:'/'})
            this.success(res.data.message)
          }else{
            this.fail(res.data.message)
          }
          console.log(res)
       })
    }
  }
}

</script>
<style>
#left_back{
  width: 400px;
  height: 600px;
}
.inframe{
  margin-left: 25%;
  width: 50%;
}

    .el-header, .el-footer {
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    overflow-y: hidden;
  }
  
  .el-main {
    text-align: center;
    line-height: 50px;
  }
  
  .el-container {
    
    margin-bottom: 0px;
  }

  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>