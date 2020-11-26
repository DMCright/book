<template >
<div id="frame" style="">
<el-container style="height:600px;">
  <el-container>
    <el-main>
      <h2 style="color:#fff;">登录</h2>
      <div class="inframe1">
        <el-form class="inForm" ref="form" :model="form" :rules="rules" label-width="80px" >
          <el-form-item class="in" label="用户名" prop="username">
            <el-input @keyup.enter.native="submit('form')" v-model="form.username" placeholder="请输入用户名" clearable></el-input>
          </el-form-item>
          <el-form-item class="in" label="密码" prop="password">
            <el-input @keyup.enter.native="submit('form')" v-model="form.password" placeholder="请输入密码" show-password clearable></el-input>
          </el-form-item>
          <el-form-item class="in" style="text-align:right;">
            <el-button type="primary" style="width: 100%; align-self: flex-end;" @click="submit('form')">登录</el-button>
            <el-link type="primary" style="left:0px;" @click="toFindPassword">忘记密码?</el-link>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
    <el-footer>
      
    </el-footer>
  </el-container>
</el-container>
</div>
</template>
<script>

export default {
  data() {
    // 密码规则
    var checkPassword = (rule, value, callback) =>{
      var check = /(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/
      if(!check.test(value)){
        callback(new Error('密码必须包含大小写和特殊字符，且不超过30个字符'))
      }else{
        callback()
      }
    }
    return {
      // 校验规则汇总
      rules:{
        username:[
          {required:true, message:"请输入用户名", trigger:"change"},
          {min:1, max:20, message:"用户名不能超过20个字符", trigger:"change"}
        ],
        password:[
          {required:true, message:"请输入密码", trigger:"change"},
          {min:8, max:30, message:"必须包含大小写和特殊字符,在8到30个字符以内", trigger:"change"},
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
  methods: {
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
      //提交登录信息表单
    submit(formName) {
      let judge
      this.$refs[formName].validate((valid)=>{
        if(!valid){
          console.log("input mistake")
          judge = false
          return false
        }else{
          judge = true
        }
      })
      console.log(judge)//根据校验规则判断是否输入有错,有错则终止提交
      if(!judge){
        return
      }
       this.$http.post(this.MYLINK.link8001+'/user/login',{"username":this.form.username,"password":this.form.password})
       .then(res=>{
          // alert(res.data.message)
          console.log(res)
          if(res !=null){
            if(res.data.data != null && res.data.code ==200){
            let usermsg = {username:this.form.username,id:res.data.data[0],token:res.data.data[1],status:res.data.data[2]}
            sessionStorage.setItem("id",usermsg.id)
            sessionStorage.setItem("username",usermsg.username)
            sessionStorage.setItem("token",usermsg.token)
            sessionStorage.setItem('status',usermsg.status)
            this.$emit("listenLogin",
            usermsg)
            this.$router.push({path:'/'})
            this.success("欢迎使用Piny图书管理系统")
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
    },
    // 前往找回密码页面
    toFindPassword() {
      this.$router.push({path:'/findPassword'})
    }
  }
}

</script>
<style>
body{
  min-width: 1000px;
}
.inForm{
}
.in{
  width: 87%;
}
#left_back{
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/v_girl2.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}
.inframe1{
  margin-left: 50%;
  transform: translateX(-50%);
  width: 30%;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  padding:30px 20px 5px 20px;
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
    background-image: url(../assets/images/background1.gif);
    background-repeat: no-repeat;
    background-size: cover;
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