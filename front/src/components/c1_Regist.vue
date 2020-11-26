<template>
<div id="frame" style="">
<el-container style="height:700px;">
  <!--<el-aside style="width:400px;">
      <div id="left_back" alt="py"></div>
  </el-aside>-->
  <el-container>
    <el-main>
      <h2 style="color:#fff;">欢迎注册Piny图书馆</h2>
      <div class="inframe2">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item class="in" label="用户名" prop="username">
          <el-input @blur.prevent="checkUser" v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item class="in" label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item class="in" label="确认密码" prop="passwordConfirm">
          <el-input v-model="form.passwordConfirm" placeholder="请再次输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item class="in" label="联系方式" prop="telephone">
          <el-input v-model="form.telephone" placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <el-form-item class="in" label="邮箱" prop="email">
          <el-input @blur.prevent="check" v-model="form.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item class="in">
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
    // 自定义密码校验规则
    var checkPassword = (rule, value, callback) =>{
      var check = /(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/
      if(!check.test(value)){
        callback(new Error('密码必须包含大小写和特殊字符，且不超过30个字符!'))
      }else{
        callback()
      }
    }
    // 自定义确认密码校验规则
    var checkPasswordConfirm = (rule, value, callback) =>{
      if(this.form.password !=this.form.passwordConfirm){
        callback(new Error('两次输入的密码不一样!'))
      }else{
        callback()
      }
    }
    // 自定义手机号校验规则
    var checkTelephone = (rule, value, callback) =>{
      var check = /^[0-9]*$/
      if(!check.test(value)){
        callback(new Error('号码必须为11位数字!'))
      }else{
        callback()
      }
    }
    // 自定义邮箱校验规则
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
        // 用户名校验规则
        username:[
          {required:true, message:"请输入用户名!", trigger:"change"},
          {min:1, max:20, message:"用户名不能超过20个字符!", trigger:"change"}
        ],
        // 密码校验规则
        password:[
          {required:true, message:"请输入密码!", trigger:"change"},
          {min:8, max:30, message:"必须包含大小写和特殊字符,在8到30个字符以内", trigger:"change"},
          {validator: checkPassword, trigger: 'change' },
        ],
        // 确认密码校验规则
        passwordConfirm:[
          {required:true, message:"请确认密码!", trigger:"change"},
          {validator: checkPasswordConfirm, trigger: 'change' }
        ],
        // 手机号校验规则
        telephone:[
          {required:true, message:"请输入联系方式!", trigger:"change"},
          {min:11,max:11, message:"号码必须为11位数字!", trigger:'change'},
          {validator:checkTelephone, trigger:'change'}
        ],
        // 邮箱校验规则
        email:[
          {required:true, message:"请输入邮箱!", trigger:"change"},
          {max:30, message:'长度不能超过30',trigger:'change'},
          {validator:checkEmail, trigger:'change'}
        ]
      }
    }
  },
  methods: {
    // 用户名是否已被注册
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
    // 邮箱是否已被注册
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
    // 成功提示
      success(msg) {
        this.$message({
          message: msg,
          type: 'success'
        });
      },
      // 失败提示
      fail(msg) {
        this.$message.error(msg);
      },
      // 注册表单提交
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
       this.$http.post(this.MYLINK.link8001+'/user/register',temp)
       .then(res=>{
         if(res != null){
          console.log(res.data)
          if(res.data.data == 1){
            this.success('注册成功,已跳转到登录页面')
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
.in{
  width: 87%;
}
#left_back{
  width: 100%;
  height: 100%;
  background-image: url(../assets/images/background1.gif);
  background-repeat: no-repeat;
  background-size: cover;
}
.inframe2{
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