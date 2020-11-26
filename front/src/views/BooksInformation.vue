<template>
    <div id="booksInformation" style="height:600px; width:99%;">
<el-row :gutter="20">
        <el-col :span="6">
            <img id="logo2" class="grid-content" src="../assets/images/newlogo.png" alt="logo">
        </el-col>
        <el-col :span="10">
          <div style="padding-top:30px">
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
    </el-row>

    <el-row>
        <el-col :span="2" style="color:#a7d8ec">
            
        </el-col>
        <el-col :span="20">
            <div style="border-top:#138fbc 2px solid"></div>
        </el-col>
        <el-col :span="2" style="color:#a7d8ec">
            
        </el-col>
    </el-row>

    <el-row>
        <el-col :span="2">
            
        </el-col>
        <el-col :span="6" style="margin-left:100px;">
            <img class="mainBook" :src="this.book.cover" :alt="this.book.bookName">
        </el-col>
        <el-col :span="12">
            <div class="sale_info">
                <div class="book_info" style="border-top: silver 2px solid;">
                <h3>{{this.book.bookName}}</h3>
                <p>（{{this.book.bookDesc}}）</p>
                </div>
                <span class="introduce">作者:
                <a href="#">{{this.book.author}}</a>
                出品</span>
                <span class="introduce">出版社:
                <a href="#">{{this.book.press}}</a>
                </span>
                <span class="introduce">
                出版时间:{{this.book.publishDate}}
                </span>
                <p>
                <span class="introduce">
                日点击量:{{this.book.dayClickCount}}
                </span>
                <!--<span class="introduce">
                月点击量:{{this.book.mouthClickCount}}
                </span>-->
                <span class="introduce">
                书本剩余数量：
                <span pp_name="count">
                {{this.book.bookCount}}
                </span>
                </span>
                <span class="introduce">
                书本价格:
                <span class="introduce" pp_name="price">
                {{this.book.price}}
                </span>
                </span>
                </p>
                <p>
                  <span class="introduce">
                    书架:{{this.book.bookShelf}}
                  </span>
                  <span class="introduce">
                    层:{{this.book.bookFloor}}
                  </span>
                </p>
                <p>
                <el-button v-show="isLend" type="danger" round disabled>很遗憾，本书已经被借完</el-button>
                </p>
            </div>
        </el-col>
        <el-col :span="4" style="text-align:center">
            <!-- <div style="border-left: orange 2px solid;color:white;"> -->
                广告位招租
            <!-- </div> -->
        </el-col>
    </el-row>
    <transition name="el-fade-in-linear">
        <div id="guanggao" v-show="show">
            <el-button id="close" type="danger" icon="el-icon-close" circle @click="show = !show"></el-button>
            <img src="../assets/py.png" alt="GGG">
        </div>
    </transition>    

    </div>
</template>

<script>
    export default {
      created(){
        this.state = this.$route.query.bookName
        this.id = this.$route.query.id
        this.loadBookData()
      },
    data: () => ({
      isLend:false,
      id:-1,
      book:{},
      show: true,
      state: '',
      timeout:  null,
      searchResult:[]
    }),
    methods:{
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
      // 加载书籍详情
      loadBookData(){
        this.$http.get(this.MYLINK.link9001+'/book/get/'+this.id)
        .then(res=>{
          // console.log(res)
          if(res !=null){
            if(res.data.data != null){
              this.book = res.data.data
              this.isLend = this.book.isLend
              console.log(this.book)
            }else{
              this.fail('没有该书')
            }
          }else{
            this.fail('无法访问')
          }
        }).catch((e)=>{
          console.log(e)
          this.fail('访问异常')
        })
      },
      // 前往书籍列表
      toBooksList(){
        this.$router.push({path:'/bookslist',query:{state:this.state}})
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
      // 书籍搜索
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

<style scoped>
img{
  height: 100%;
  width: 100%;
  border-radius: 20px;
  background-size:cover;
  background-position: center;
  background-repeat: no-repeat;
}
.loginsign{
    padding: 10px;
    position: absolute;
    right: 2px;
  }
.mainBook{
    width: 320px;
    height: 320px;
}
.search{
  padding-top: 10%;
}
#logo2{
  margin-left: 10%;
  border-radius: 50px;
  width: 180px;
  height: 100px;
}
.el-row {
    margin-bottom: 20px;
}
.el-col {
    border-radius: 4px;
}
.advertising{
  border-radius: 4px;
  min-height: 36px;
  text-align: center;
  background: url("../assets/py.png");
  background-size: cover;
  color: white;
}
.grid-content {
  border-radius: 4px;
  min-height: 100px;
}
.text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }
  .introduce{
      padding-right: 25px;
      font: 12px Verdana,"Microsoft Yahei";
  }
  #guanggao{
      
      position: absolute;
      bottom: 10%;
      right: 0;
  }
  #close{
      position: absolute;
      top:0;
      right: 0;
  }
</style>