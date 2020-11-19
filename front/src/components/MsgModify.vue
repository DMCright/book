<template>
    <el-form  ref="form" :model="form" label-width="80px">
    <el-form-item label="用户名">
    <el-input v-model="form.username" :disabled="!editable"></el-input>
    </el-form-item>
    <el-form-item label="电话号码">
    <el-input v-model="form.telephone" :disabled="!editable"></el-input>
    </el-form-item>
    <el-form-item label="电子邮箱">
    <el-input v-model="form.email" :disabled="!editable"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button type="normal" style="position:absolute; left:0px;"  @click="change">编辑</el-button>
        <el-button type="success" style="position:absolute; left:80px"  @click="loadData">恢复</el-button>
        <el-button type="primary" style="position:absolute; left:170px;"  @click="submit">确认修改</el-button>
    </el-form-item>
    </el-form>
</template>

<script>
export default {
    data() {
    return {
      editable:false,
      form:{
        id:-1,
        head_image:'',
        username: '',
        telephone: '',
        email: ''
      }
    }
  },
  created(){
    this.loadData()
  },
  methods: {
    loadData(){
      if(this.$route.query != null){
        this.form.id = this.$route.query.id
        this.form.head_image = this.$route.query.head_image
        this.form.username = this.$route.query.username
        this.form.telephone = this.$route.query.telephone
        this.form.email = this.$route.query.email
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
    change(){
      this.editable = !this.editable
    },
    submit() {
      console.log(this.form.password);
       let temp = this.$qs.stringify(this.form);
       console.log(temp)
       this.$http.put('http://10.10.102.162:8001/user/update',temp)
       .then(res=>{
          console.log(res.data)
          if(res.data.data==null ||res.data.data ==undefined){
            this.fail(res.data.message)
            this.editable = false
            this.loadData()
          }
          else{
            this.success(res.data.message)
            this.editable = false
          }
       })
    }
  }
}
</script>