<template >
<div id="frame">
<el-container style="height:1000px;">
  <el-aside style="width:450px;">
      <!-- <img id="left_back" src="../assets/img/v_girl2.jpg" alt="py"> -->
      <div id="left_back" alt="py"></div>
  </el-aside>
  <el-container>
    <el-main>
      <h2>大头虾找回密码</h2>
      <div class="inframe">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名" clearable></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="telephone">
            <el-input  v-model="form.telephone" placeholder="请输入手机号" clearable></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="20">
                <el-form-item label="验证码" prop="checkCode">
                    <el-input :disabled="!changeable" v-model="checkCode" placeholder="请输入验证码"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4"><el-button plain style="position:absolute; right:0px;" v-text="this.buttonTip" @click="getCheckCode" :disabled="!clickable"></el-button></el-col>
          </el-row>
            <el-form-item label="新密码" prop="password">
            <el-input :disabled="!changeable" v-model="form.password" placeholder="请输入新密码" show-password></el-input>
          </el-form-item>
            <el-form-item label="确认密码" prop="passwordConfirm">
                <el-input :disabled="!changeable" v-model="form.passwordConfirm" placeholder="请再次确认新密码" show-password></el-input>
            </el-form-item>
          <el-form-item style="text-align:right;">
            <el-button type="primary" style="width: 100%; align-self: flex-end;" @click="submit('form')">确认使用新密码</el-button>
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
    return {
      rules:{
        checkCode:[
            {required:true, message:"请输入获取的验证码", trigger:"change"}
        ],
        username:[
          {required:true, message:"请输入用户名", trigger:"change"},
          {min:1, max:20, message:"用户名不能超过20个字符", trigger:"change"}
        ],
        password:[
          {required:true, message:"请输入新密码!", trigger:"change"},
          {min:3, max:30, message:"密码必须包含大小写和特殊字符，且不超过30个字符!", trigger:"change"},
          {validator: checkPassword, trigger: 'change' }
        ],
        passwordConfirm:[
          {required:true, message:"请再次确认密码!", trigger:"change"},
          {validator: checkPasswordConfirm, trigger: 'change' }
        ],
        telephone:[
          {required:true, message:"请输入电话号码!", trigger:"change"},
          {min:11,max:11, message:"号码必须为11位数字!", trigger:'change'},
          {validator:checkTelephone, trigger:'change'}
        ],
      },
      form:{
        username: '',
        telephone:'',
        password:'',
        passwordConfirm:'',
      },
      changeable:false,
      checkCode:'',
      realCheckCode:'',
      buttonTip:'获取验证码',
      interval:null,
      clickable:true,
      count:60
    }
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
      console.log(judge)
      if(!judge){
        return
      }
       this.$http.post(this.MYLINK.link+'/user/login',{"username":this.form.username,"password":this.form.password})
       .then(res=>{
          // alert(res.data.message)
          console.log(res)
          if(res !=null){
            if(res.data.data != null && res.data.code ==200){

                this.$router.push({path:'/login'})
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
    getCheckCode(){
        this.changeable = true
        this.clickable = false
        clearInterval(this.interval);
        this.buttonTip = '还剩'+this.count+'秒'
        this.count--                                   //这样子感观上好点
        this.interval = setInterval(() => {
            if(this.count>0){
                this.buttonTip = '还剩'+this.count+'秒'
                this.count--
            }else{
                this.count = 60;
                this.buttonTip = '获取验证码';
                clearInterval(this.interval)
                this.clickable = true
            }
        }, 1000);
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