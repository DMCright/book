<template>
<div id="booksIndex" style="width:99%;">
      <el-row :gutter="20">
        <el-col :span="6">
            <img id="logo" class="grid-content" src="../assets/img/newlogo.png" alt="logo">
        </el-col>
        <el-col :span="10">
          <div style="padding-top:30px;">
            <el-autocomplete popper-class="inputText"
            :popper-append-to-body="false"
            v-model="state" placeholder="请输入书名/作者/检索号/编号查询" 
            :fetch-suggestions="querySearchAsync" 
            @keyup.native="dynamicSearch"
            @keydown.enter.native="toBooksList"
            @select="handleSelect"
            style="width:100%;">
            </el-autocomplete>
          </div>
        </el-col>
        <el-col :span="2">
          <div style="padding-top:30px">
            <el-button icon="el-icon-search" circle @click="toBooksList"></el-button>
          </div>
        </el-col>
        <!--<el-col :span="6" style="padding-top:80px">
          <el-button type="warning" icon="el-icon-shopping-cart-2" circle></el-button>
          <el-button type="warning">我的订单</el-button>
        </el-col>-->
    </el-row>

   <el-row>
        <el-col :span="2" style="color:#a7d8ec">
            1
        </el-col>
        <el-col :span="20">
            <div style="border-top:#138fbc 2px solid"></div>
        </el-col>
        <el-col :span="2" style="color:#a7d8ec">
            1
        </el-col>
    </el-row>

    <el-row :gutter="20">
        <el-col :span="1">
          <div class="tool"></div>
        </el-col>
        <el-col :span="4">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo leftmenu"
      @open="handleOpen"
      @close="handleClose"
      background-color="#138fbc"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>书籍类别展开</span>
        </template>
          <el-menu-item @click="toBooksListByCategory(it.id)" v-for="(it, index) in allType" :key="index">{{it.categoryName}}</el-menu-item>
      </el-submenu>
    </el-menu>
    
  </el-col>
        <el-col :span="14">
            <div className="rollplay medium" class="rollContainer">
              <el-carousel :interval="3500" type="card" arrow="hover" style="height:400px;">
              <el-carousel-item v-for="(it,index) in guess" :key="index">
                <img  v-bind:src="it.cover" @click="toBooksInformation(it.bookName,it.id)">
              </el-carousel-item>
              </el-carousel>
    </div>
        <ul>
          <li class="book" v-for="(it,index) in guess2" :key="index">
            <a :href="'/booksInformation?bookname='+it.bookName+'&id='+it.id">
              <img class="books" v-bind:src="imgList[index].url" alt="books">
              <p>《{{it.bookName}}》</p>
            </a>
          </li>
        </ul>
        </el-col>
        <el-col :span="5">
            <el-card class="box-card" shadow="hover">
              <div class="text item" style="color: black">
                推荐书籍
                <!--<p><a href="#" class="text item">《如何有效阅读一本书》</a></p>
                <p><a href="#" class="text item">《证据法学》</a></p>
                <p><a href="#" class="text item">《服饰》</a></p>-->
                <p v-for="(it,index) in guess" :key="index">
                  <a :href="'/booksInformation?bookName='+it.bookName+'&id='+it.id" class="text item">
                  《{{it.bookName}}》</a>
                </p>
             </div>
            </el-card>
        </el-col>
        <!-- <el-col :span="1"></el-col> -->
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'booksIndex',
  mounted(){
    this.loadGuess()
    this.loadType()
  },
  data() {
      return {
        guess2:[{id:31,bookName:'资本论'},{id:38,bookName:'球状闪电'},{id:68,bookName:'水浒传'},{id:69,bookName:'高等数学'}],
        allType:[{id:4,categoryName:''},{id:6,categoryName:''},{id:8,categoryName:''},
        {id:9,categoryName:''},{id:4,categoryName:''}],
        typeData:[],
        onlogin:false,
        guess:[],
        notices:[],
        state: '',
        timeout:  null,
        searchResult:[],
        activeIndex: '1',
        activeIndex2: '1',
        imgList:[
        {url:require('../assets/images/b31.jpg')},
        {url:require('../assets/images/b38.jpg')},
        {url:require('../assets/images/b68.jpg')},
        {url:require('../assets/images/b69.jpg')}
      ]
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
      // 提示
      fail(msg) {
        this.$message.error(msg);
      },
      // 加载所有书籍类别
      loadType(){
        this.$http.get(this.MYLINK.link2+"/admin/category/select/"
        + 10 + "/" + 1)
        .then(res=>{
          if(res != null){
            console.log(res)
            this.allType = res.data.data.list
          }else{
            this.fail("访问失败")
          }
        })
        
      },
      // 前往书籍详情
      toBooksInformation(pname,pid,cid){
        if(cid==null){
          this.$router.push({path:'/booksInformation',query:{boonName:pname,id:pid}})
        }else{
          this.$router.push({path:'/booksInformation',query:{boonName:pname,id:pid,categoryId:cid}})
        }
      },
      // 加载推荐书籍列表
      loadGuess(){
        let id = 60
        if(sessionStorage.getItem("id") != null){ 
          id = sessionStorage.getItem("id")    
          this.onlogin = true
        }else{
          this.onlogin = false
        }
        this.$http.get(this.MYLINK.link9001+'/book/guess/'+id)
          .then(res=>{
            if(res!=null){
              console.log(res)
              this.guess = res.data.data.list
            }
          })
      },
      // 前往书籍列表展示
      toBooksList(){
        this.$router.push({path:'/bookslist',query:{state:this.state}})
      },
      // 按照类别筛选前往书籍列表
      toBooksListByCategory(id){
        this.$router.push({path:'/bookslist',query:{state:this.state,categoryId:id}})//注意参数变化
      },
       
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      // 搜索书籍
      dynamicSearch(){
        this.$http.get(this.MYLINK.link9001+'/book/selectByCondition/10/1?keyword='+this.state)//pageSize为10，查找1页即可
        .then(res=>{
          console.log(res)
          this.searchResult = res.data.data.list
          if(res.data.data != null){
            for(let i = 0;i < this.searchResult.length;i++){
              this.searchResult[i].value = this.searchResult[i].bookName //必须要指定一个value值el-autocomplete才可以正常显示
            }
          }
        })
      },
      // 异步搜索
      querySearchAsync(queryString, cb){
        cb(this.searchResult)
      },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.rollContainer{
  background: rgba(255, 255, 255, 0.4);
  border-radius: 20px;
  padding: 50px 20px 0px 20px;
}
.rollBooksName{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 40%;
}
.rollBooks{
  background-image: url(../assets/images/mybook.png);
  height: 100%;
  width: 100%;
  border-radius: 20px;
  background-size:cover;
  background-position: center;
  background-repeat: no-repeat;
}
img{
  height: 100%;
  width: 100%;
  border-radius: 20px;
  background-size:cover;
  background-position: center;
  background-repeat: no-repeat;
}
#logo{
  margin-left: 10%;
  border-radius: 50px;
  width: 180px;
  height: 100px;
}
.el-col {
    border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 100px;
}
.advertising{
  border-radius: 4px;
  min-height: 36px;
  text-align: center;
  background: url("../assets/logo.png");
  background-size: cover;
  color: white;
}
.text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    border-radius: 20px;
    width: 120%;
    height: 450px;
  }
  
  .loginsign{
    padding: 10px;
    position: absolute;
    right: 2px;
  }
  ul{
    list-style: none;
  }
  .books{
    border-radius: 2px;    
    width: 100px;
    height: 160px;
  }
  .book{
    float: left;
    text-align: center;
    margin-left: 50px;
  }
  .el-card{
    background: rgba(255, 255, 255, 0.4);
  }
  .leftmenu{
    width: 92%;
    overflow: hidden;
    border-radius: 20px;
    height: 570px;
    //height: 100%;
    margin-left: 8%;
  }
</style>
