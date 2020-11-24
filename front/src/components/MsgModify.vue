<template>
    <el-form  ref="form" :model="form" label-width="80px" :rules="rules">
    <el-form-item label="用户名" prop="username">
    <el-input v-model="form.username" :disabled="!editable"></el-input>
    </el-form-item>
    <el-form-item label="联系方式" prop="telephone">
    <el-input v-model="form.telephone" :disabled="!editable"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
    <el-input v-model="form.email" :disabled="!editable"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button type="normal" style="position:absolute; left:0px;" v-text="editTip"  @click="change"></el-button>
        <el-button type="success" style="position:absolute; left:80px"  @click="recover">恢复</el-button>
        <el-button type="primary" style="position:absolute; left:170px;"  @click="submit('form')">确认修改</el-button>
    </el-form-item>
    </el-form>
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
      editTip:'编辑',
      editable:false,
      form:{
        id:-1,
        head_image:'',
        username: '',
        telephone: '',
        email: ''
      },
      copy:{
        head_image:'',
        username: '',
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
          {min:3, max:30, message:"密码必须包含大小写和特殊字符，且不超过30个字符!", trigger:"change"},
          {validator: checkPassword, trigger: 'change' }
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
          {min:1, max:30, message:'长度不能超过30',trigger:'change'},
          {validator:checkEmail, trigger:'change'}
        ]
      }
    }
  },
  created(){
    this.loadUserDataBySession()
  },
  methods: {
    copyUser(){
      this.copy.username = this.form.username
      this.copy.telephone = this.form.telephone

      this.copy.email = this.form.email
      this.copy.head_image = this.form.head_image
    },
    loadUserDataBySession(){
      this.$http.get(this.MYLINK.link8001+"/user/get/"+sessionStorage.getItem('id'))
      .then(res=>{
        console.log(res)
        if(res !=null){
          if(res.data.code==200){
            this.form.id = res.data.data.id
            this.form.username = res.data.data.username
            this.form.telephone = res.data.data.telephone
            this.form.email = res.data.data.email
            this.form.head_image = res.data.data.headImage
            this.copyUser()                                                       //注意，copyUser方法不能在钩子函数里调用,只能放在axios内的then才能生效
          }else{
            this.fail(res.data.data.message)
          }
        }else{
          this.fail('数据获取失败')
        }
      }).catch((e)=>{
        console.log(e)
        this.fail("无法访问")
      })
    },
    recover(){
      this.form.username = this.copy.username
      this.form.telephone = this.copy.telephone
      this.form.email = this.copy.email
      this.form.head_image = this.copy.head_image
    },
    // loadData(){
    //   if(this.$route.query != null){
    //       this.form.id = this.$route.query.id
    //       this.form.head_image = this.$route.query.head_image
    //       this.form.username = this.$route.query.username
    //       this.form.telephone = this.$route.query.telephone
    //       this.form.email = this.$route.query.email
    //     }
    //   },
      success(msg) {
        this.$message({
          message: msg,
          type: 'success'
        });
      },
      fail(msg) {
        this.$message.error(msg);
      },
    change(){
      this.editable = !this.editable
      if(this.editable){
        this.editTip="取消"
      }else{
        this.recover()
        this.editTip="编辑"
      }
    },
    submit(formName) {
      if(this.form.username==this.copy.username && 
      this.form.email==this.copy.email &&
      this.form.telephone==this.copy.telephone){
        this.fail("没有改动")
        return
      }
       let judge = true
       this.$refs[formName].validate((valid)=>{
        if(!valid){
          console.log("input mistake")
          judge = false
          return false
        }
      })
      if(!judge){
        return
      }
      this.$confirm('是否修改？', '修改 ',{
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
            let temp = this.$qs.stringify(this.form);
            this.$http.put(this.MYLINK.link8001+'/user/rupdate',temp)
            // this.$http.put(this.MYLINK.link8001+'/user/update',this.form)
            .then(res=>{
            console.log(res)
            if(res.data.data==null ||res.data.data ==undefined){
              this.fail(res.data.message)
              this.editable = false
              this.recover()
            }
            else{
              this.success(res.data.message)
              this.editable = false
              this.copyUser()
              this.editTip="编辑"
            }
          })
        }).catch((e) => {  
          console.log(e)     
          });

      //  let temp = this.$qs.stringify(this.form);
      //  console.log(temp)
      //  this.$http.put(this.MYLINK.link+'/user/update',temp)
      //  .then(res=>{
      //     console.log(res.data)
      //     if(res.data.data==null ||res.data.data ==undefined){
      //       this.fail(res.data.message)
      //       this.editable = false
      //       this.loadData()
      //     }
      //     else{
      //       this.success(res.data.message)
      //       this.editable = false
      //     }
      //  })
    }
  }
}
</script>