<template >
<div id="frame">
<el-container style="height:1000px;">
    <el-main>
      <h2 style="color:#fff;">找回密码</h2>
      <div class="inframe3">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item class="in" label="邮箱" prop="email">
            <el-input @blur.prevent="check" v-model="form.email" placeholder="请输入邮箱" clearable></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="20">
                <el-form-item  class="in" label="验证码" prop="checkCode">
                    <el-input :disabled="!changeable" v-model="form.code" placeholder="请输入验证码"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4"><el-button plain style="position:absolute; right:13%;" v-text="this.buttonTip" 
            @click="getCheckCode" :disabled="!clickable"></el-button></el-col>
          </el-row>
            <el-form-item class="in" label="新密码" prop="password">
            <el-input :disabled="!changeable" v-model="form.password" placeholder="请输入新密码" show-password></el-input>
          </el-form-item>
            <el-form-item class="in" label="确认密码" prop="confirm">
                <el-input :disabled="!changeable" v-model="confirm" placeholder="请再次确认新密码" show-password></el-input>
            </el-form-item>
          <el-form-item class="in" style="text-align:right;">
            <el-button type="primary" style="width: 100%; align-self: flex-end;" @click="submit('form')">确认使用新密码</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
    <el-footer>
      <span>v 1.0</span>
    </el-footer>
</el-container>
</div>
</template>
<script>

export default {
  data() {
    var checkPassword = (rule, value, callback) =>{
      var check = /(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/
      if(!check.test(value)){
        callback(new Error('必须包含大小写和特殊字符,且不超过30个字符'))
      }else{
        callback()
      }
    }
    var checkConfirm = (rule, value, callback) =>{
      if(this.confirm !=''){
        if(this.form.password !=this.confirm){
          callback(new Error('两次输入的密码不一样!'))
        }else{
          callback()
        }
      }else{
        callback(new Error('请再次输入密码'))
      }
    }
    var checkCode = (rule, value, callback) =>{
      if(this.form.code == ''){
        callback(new Error('请再次邮箱获取的验证码!'))
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
      confirm:'',
      emailExist:false,
      rules:{
        checkCode:[
            {validator:checkCode, message:"请输入邮箱获取的验证码!", trigger:"change"},
        ],
        password:[
          {required:true, message:"请输入新密码!", trigger:"change"},
          {min:8, max:30, message:"必须包含大小写和特殊字符,且不超过30个字符", trigger:"change"},
          {validator: checkPassword, trigger: 'change' }
        ],
        confirm:[
          {validator: checkConfirm, trigger: 'change' }
        ],
        email:[
          {required:true, message:"请输入邮箱!", trigger:"change"},
          {max:30, message:'长度不能超过30',trigger:'change'},
          {validator:checkEmail, trigger:'change'}
        ]
      },
      form:{
        email:'',
        code:'',
        password:''
      },
      changeable:false,
      buttonTip:'获取验证码',
      interval:null,
      clickable:true,
      count:60
    }
  },
  methods: {
    // 邮箱检测
    check(){
      this.$http.get(this.MYLINK.link8001+'/user/getUser?email='+this.form.email)
      .then(res=>{
        if(res!=null){
          if(res.data.code==200){
          this.emailExist = true
        }else{
          this.fail('不存在绑定了该邮箱的用户')
          this.emailExist = false
        }
        }
      }).catch((e)=>{
        console.log(e)
      })
    },
    // 密码规则
    checkPassword(rule,value,callback){
      var check = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{3,30}/
      if(!check.test(value)){
        callback(new Error('必须包含大小写和特殊字符，且不超过30个字符'))
      }else{
        callback()
      }
    },
    // 提示
    success(msg) {
        this.$message({
          message: msg,
          type: 'success'
        });
      },
      // 失败
      fail(msg) {
        this.$message.error(msg);
      },
      // 提交找回密码表单
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
      if(!this.emailExist){
        this.fail('不存在绑定了该邮箱的用户')
      }
      let format = this.$qs.stringify(this.form)
       this.$http.put(this.MYLINK.link8001+'/user/changePwd',format)
       .then(res=>{
          console.log(res)
          if(res !=null){
            if(res.data.data != null && res.data.code ==200){
              this.success('密码已经找回，已跳转到登录界面')
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
    // 得到验证码
    getCheckCode(){
      if(this.form.email == ''){
        this.fail("邮箱不能为空")
        return
      }
      this.$http.get(this.MYLINK.link8001+'/user/getUser?email='+this.form.email)
      .then(res=>{
        if(res!=null){
          if(res.data.code==200){
          this.emailExist = true
          this.changeable = true
          this.clickable = false
          clearInterval(this.interval);
          this.buttonTip = '还剩'+this.count+'秒'
          this.count--                                   //这样子感观上好点
          /*这里设置了60秒计时，计时结束之后按钮恢复可点击状态*/
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
          if(this.emailExist){
            this.$http.get(this.MYLINK.link14001+'/email/sendCode?email='+this.form.email)
          }
        }else{
          this.fail('不存在绑定了该邮箱的用户')
          this.emailExist = false
        }
        }
      }).catch((e)=>{
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
.in{
  width: 87%;
}
.inframe3{
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