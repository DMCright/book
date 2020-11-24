<template>
<div id="frame" style="">
<el-container style="height:700px;">
  <!--<el-aside style="width:400px;">
      <div id="left_back" alt="py"></div>
  </el-aside>-->
  <el-container>
    <el-main>
      <h2 style="color:#fff;">欢迎注册Piny图书馆</h2>
      <div class="inframe">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input @blur.prevent="checkUser" v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passwordConfirm">
          <el-input v-model="form.passwordConfirm" placeholder="请再次输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="telephone">
          <el-input v-model="form.telephone" placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input @blur.prevent="check" v-model="form.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%;" @click="submit('form')">快速注册</el-button>
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
        callback(new Error('密码必须包含大小写和特殊字符，且不超过30个字符!'))
      }else{
        callback()
      }
    }
    var checkPasswordConfirm = (rule, value, callback) =>{
      if(this.form.password !=this.form.passwordConfirm){
        callback(new Error('两次输入的密码不一样!'))
      }else{
        callback()
      }
    }
    var checkTelephone = (rule, value, callback) =>{
      var check = /^[0-9]*$/
      if(!check.test(value)){
        callback(new Error('号码必须为11位数字!'))
      }else{
        callback()
      }
    }
    var checkEmail = (rule, value, callback) =>{
      var check = /^[a-z|A-Z|0-9|_]+@[a-z|A-Z|0-9|_]+\.[a-z|A-Z|0-9|_]+$/
      if(!check.test(value)){
        callback(new Error('邮箱地址格式不正确!'))
      }else{
        callback()
      }
    }
    return {
      userExist:false,
      emailExist:false,
      form:{
        username: '',
        password:'',
        passwordConfirm:'',
        telephone: '',
        email: ''
      },
      rules:{
        username:[
          {required:true, message:"请输入用户名!", trigger:"change"},
          {min:1, max:20, message:"用户名不能超过20个字符!", trigger:"change"}
        ],
        password:[
          {required:true, message:"请输入密码!", trigger:"change"},
          {min:8, max:30, message:"密码必须包含大小写和特殊字符，在8到30个字符以内!", trigger:"change"},
          {validator: checkPassword, trigger: 'change' },
        ],
        passwordConfirm:[
          {required:true, message:"请确认密码!", trigger:"change"},
          {validator: checkPasswordConfirm, trigger: 'change' }
        ],
        telephone:[
          {required:true, message:"请输入联系方式!", trigger:"change"},
          {min:11,max:11, message:"号码必须为11位数字!", trigger:'change'},
          {validator:checkTelephone, trigger:'change'}
        ],
        email:[
          {required:true, message:"请输入邮箱!", trigger:"change"},
          {max:30, message:'长度不能超过30',trigger:'change'},
          {validator:checkEmail, trigger:'change'}
        ]
      }
    }
  },
  methods: {
    checkUser(){
      this.$http.get(this.MYLINK.link8001+'/user/getUserByUsername?username='+this.form.username)
          .then(res=>{
            if(res!=null){
              console.log(res)
              if(res.data.code==200){
                this.fail("该用户名已被注册,请更换用户名")
                this.userExist = true
              }else{
                this.userExist = false
              }
            }
          })
    },
    check(){
      this.$http.get(this.MYLINK.link8001+'/user/getUser?email='+this.form.email)
      .then(res=>{
        if(res!=null){
          if(res.data.code==200){
          this.fail("该邮箱已被注册,请更换邮箱")
          this.emailExist = true
        }else{
          this.emailExist = false
        }
        }
      }).catch((e)=>{
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
    submit(formName) {
      var judge = false
      this.$refs[formName].validate((valid)=>{
        if(!valid){
          console.log("input mistake")
          judge = false
          return false
        }else{
          judge = true
        }
      })
      if(!judge){
        return
      }
      if(this.emailExist){
        this.fail("该邮箱已被注册,请更换邮箱")
        return
      }
      if(this.userExist){
        this.fail("该用户名已被注册,请更换用户名")
        return
      }
       let temp = this.$qs.stringify(this.form);
       console.log(temp)
      //  this.$http.post('http://10.10.102.162:8001/user/save',temp)
      //  this.$http.post('http://100.2.201.23:8001/user/save',temp)
       this.$http.post(this.MYLINK.link8001+'/user/register',temp)
       .then(res=>{
         if(res != null){
          console.log(res.data)
          if(res.data.data == 1){
            this.success('注册成功,已跳转到登录页面')
            // let params = {username:'',password:''}
            // params.username = this.form.username
            // params.password = this.form.password
            // this.$router.push({name:'Login'},params)
            this.$router.push({path:'/login'})
          }else{
            this.fail('注册失败')
          }
         }else{
           this.fail("无法访问网络")
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
body{
  min-width: 1000px;
}
#left_back{
  width: 100%;
  height: 100%;
  background-image: url(../assets/images/background1.gif);
  background-repeat: no-repeat;
  background-size: cover;
}
.inframe{
  margin-left: 25%;
  width: 50%;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  padding:30px 20px 20px 0px;
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