<template >
<div id="frame">
<el-container style="height:1000px;">
  <el-aside style="width:450px;">
      <!-- <img id="left_back" src="../assets/img/v_girl2.jpg" alt="py"> -->
      <div id="left_back" alt="py"></div>
  </el-aside>
  <el-container>
    <el-main>
      <h2>欢迎登录品品品图书馆</h2>
      <div class="inframe">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input @keyup.enter.native="submit('form')" v-model="form.username" placeholder="请输入用户名" clearable></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input @keyup.enter.native="submit('form')" v-model="form.password" placeholder="请输入密码" show-password clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%;" @click="submit('form')">登录</el-button>
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
    var checkPassword = (rule, value, callback) =>{
      var check = /(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/
      if(!check.test(value)){
        callback(new Error('密码必须包含大小写和特殊字符，且不超过30个字符'))
      }else{
        callback()
      }
    }
    return {
      rules:{
        username:[
          {required:true, message:"请输入用户名", trigger:"change"},
          {min:1, max:20, message:"用户名不能超过20个字符", trigger:"change"}
        ],
        password:[
          {required:true, message:"请输入密码", trigger:"change"},
          {min:3, max:30, message:"密码必须包含大小写和特殊字符，且不超过30个字符", trigger:"change"},
          {validator: checkPassword, trigger: 'change' }
        ]
      },
      form:{
        username: '',
        password:'',
        token:''
      },
    }
  },
  mounted(){
    // console.log(this.$route.params.username)
    //   this.form.username = this.$route.params.username
    //   this.form.password = this.$route.params.password
  },
  methods: {
    checkPassword(rule,value,callback){
      var check = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{3,30}/
      if(!check.test(value)){
        callback(new Error('必须包含大小写和特殊字符，且不超过30个字符'))
      }else{
        callback()
      }
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
    submit(formName) {
      this.$refs[formName].validate((valid)=>{
        if(!valid){
          console.log("input mistake")
          return false
        }
      }
      )
       this.$http.post(this.MYLINK.link+'/user/login',{"username":this.form.username,"password":this.form.password})
       .then(res=>{
          // alert(res.data.message)
          console.log(res)
          if(res !=null){
            if(res.data.data != null && res.data.code ==200){
            let usermsg = {username:this.form.username,id:res.data.data[0],token:res.data.data[1]}
            sessionStorage.setItem("id",usermsg.id)
            sessionStorage.setItem("username",usermsg.username)
            sessionStorage.setItem("token",usermsg.token)
            this.$emit("listenLogin",
            usermsg)
            this.$router.push({path:'/'})
            this.success("登录成功")
            }else{
              this.fail(res.data.message)
            }
          }else{
            this.fail('无法访问网络')
          }
       }).catch((e)=>{
         this.fail("无法访问")
         console.log(e)
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