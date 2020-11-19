<template>
<div id="frame">
<el-container style="height:600px;">
  <el-aside style="width:450px;">
      <div id="left_back" alt="py"></div>
  </el-aside>
  <el-container>
    <el-main>
      <h2>欢迎注册品品品图书馆</h2>
      <div class="inframe">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="form.passwordConfirm" placeholder="请再次输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="form.telephone" placeholder="请输入电话号码"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="form.email" placeholder="请输入电子邮箱"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%;" @click="submit">快速注册</el-button>
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
        password:'',
        passwordConfirm:'',
        telephone: '',
        email: ''
      }
    }
  },
  methods: {
    submit() {
      if(this.form.password != this.form.passwordConfirm){
        alert("两次输入的密码不一样，请重试")
        return
      }
      // let jsondata ={"username":this.form.username,"password":this.form.password,"telephone":this.form.telephone,"email":this.form.email}
       let temp = this.$qs.stringify(this.form);
       console.log(temp)
       this.$http.post('http://10.10.102.162:8001/user/save',temp)
       .then(res=>{
          console.log(res.data)
          if(res.data.data == 1){
            alert("注册成功！")
            // let params = {username:'',password:''}
            // params.username = this.form.username
            // params.password = this.form.password
            // this.$router.push({name:'Login'},params)
            this.$router.push({path:'/login'})
          }else{
            alert("注册失败！")
          }
       })
    }
  }
}

</script>
<style>
#left_back{
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/v_girl2.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  
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
    text-align: center;
    line-height: 200px;
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