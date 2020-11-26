<template>
    <div id="booksList" style="width:99%;">
    <el-row :gutter="20">
        <el-col :span="6">
            <img id="logo2" class="grid-content" src="../assets/images/newlogo.png" alt="logo">
        </el-col>
        <el-col :span="10">
          <div style="padding-top:30px;">
            <el-autocomplete popper-class="inputText"
            :popper-append-to-body="false"
            v-model="state" placeholder="请输入书名/作者/检索号/编号查询" 
            :fetch-suggestions="querySearchAsync" 
            @keyup.native="dynamicSearch"
            @keydown.enter.native="search"
            @select="handleSelect"
            style="width:100%;">
            </el-autocomplete>
          </div>
        </el-col>
        <el-col :span="2">
          <div style="padding-top:30px;">
            <el-button icon="el-icon-search" circle @click="search"></el-button>
          </div>
        </el-col>
    </el-row>

    <el-row>
        <el-col :span="2" style="color:white">
            
        </el-col>
        <el-col :span="20" style="margin-left:10%;">
            <div class="choosen">
            <font style="color:white">书籍分类筛选:</font>
            <el-select v-model="selectedCategory" filterable placeholder="请选择类别" style="padding-left:30px;padding-right:30px;">
                <el-option
                    v-for="item in category"
                    :key="item.value"
                    :label="item.categoryName"
                    :value="item.value">
                </el-option>
            </el-select>

            <el-button type="primary" round @click="loadDataByCategory(selectedCategory)">筛选</el-button>

            </div>
            <p style="padding-top:20px">
                <ul>          
                    <li class="list" v-for="(it,index) in this.searchResultCopy" :key="index">
                    
                      <a :href="'/booksInformation?bookName='+it.bookName+'&id='+it.id">
                            <img class="books" :src="it.cover" :alt="it.bookName">
                        </a>
                            <a class="infos" :href="'/booksInformation?bookName='+it.bookName+'&id='+it.id"  style="margin-left:21px">《{{it.bookName}}》({{it.bookDesc}})</a>
                            <p class="infos" style="margin-left:210px;width:800px;height:20px;bottom:130px;">书架:{{it.bookShelf}}  层:{{it.bookFloor}}</p>
                            <p class="infos" style="margin-left:210px;width:800px;height:20px;bottom:80px;"><a href="#">作者：{{it.author}}</a><span>---出版时间：{{it.pressDate}}---</span><span><a href="#">出版社：{{it.press}}</a></span></p>
                    </li>
                </ul>
            </p>
        </el-col>

        <el-col :span="10" style="color:white">
            
        </el-col>
    </el-row>
    </div>
</template>

<script>
  export default {
    created(){
      this.state = this.$route.query.state
      this.loadCategory()
    },
    mounted(){
      if(this.$route.query.categoryId !=null){
        this.loadDataByCategory(this.$route.query.categoryId)
      }else{
        this.loadData()
      }
    },
    data() {
      return {
        selectedCategory:'',
        state:'',
        timeout:  null,
        searchResultCopy:[],
        searchResult:[],
        options: [{
          value: '选项1',
          label: '谷恒条野出版社'
        }, {
          value: '选项2',
          label: '五邑大学出版社'
        }, {
          value: '选项3',
          label: 'AK把AK放下换起加特林！'
        }, {
          value: '选项4',
          label: 'Nigger出版社'
        }, {
          value: '选项5',
          label: '母人出版社'
        }],
        value:'',
        authors:[{
          value: '选项1',
          label: '谷恒条野'
        }, {
          value: '选项2',
          label: '吉村春代'
        }, {
          value: '选项3',
          label: 'AK把AK放下换起加特林！'
        }, {
          value: '选项4',
          label: '粥粥'
        }, {
          value: '选项5',
          label: '秋媃嫣姬'
        }],
        value2:'',
        category:[{
          value: '选项1',
          label: '言情'
        }, {
          value: '选项2',
          label: '喜剧'
        }, {
          value: '选项3',
          label: '沙雕'
        }, {
          value: '选项4',
          label: '生活'
        }, {
          value: '选项5',
          label: '艺术'
        }]
      }
    },
    methods:{
      loadCategory(){
        this.$http.get(this.MYLINK.link2+"/admin/category/select/"
        + 100 + "/" + 1)
        .then(res=>{
          if(res != null){
            console.log(res)
            this.category = res.data.data.list
            for(let i = 0;i < this.category.length;i++){
              this.category[i].value = this.category[i].id
            }
          }else{
            this.fail("访问失败")
          }
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
      loadDataByCategory(id){
        this.$http.get(this.MYLINK.link15001+'/admin/categoryBookList/'+id
        +'/'+100+'/'+1)//pageSize为10，查找1页即可
        .then(res=>{
          if(res != null){
            if(res.data.data!=null){
              this.searchResultCopy = res.data.data.list
            }else{
              this.fail("没有该类别的书籍")
            }
          }else{
            this.fail("访问失败")
          }
        }).catch((e)=>{
          console.log(e)
          this.fail("无法访问")
        })
      },
      // 加载符合条件的书籍
      loadData(){
        this.$http.get(this.MYLINK.link9001+'/book/selectByCondition/10/1?keyword='+this.state)//pageSize为10，查找1页即可
        .then(res=>{
          // console.log(res)
          this.searchResult = res.data.data.list
          for(let i = 0;i < this.searchResult.length;i++){
            this.searchResult[i].value = this.searchResult[i].bookName //必须要指定一个value值el-autocomplete才可以正常显示
          }
          this.search()                         //在钩子函数内复制变量的方法一定要放在axios内的then才能生效
        })
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
      dynamicSearch(){
        this.$http.get(this.MYLINK.link9001+'/book/selectByCondition/10/1?keyword='+this.state)//pageSize为10，查找1页即可
        .then(res=>{
          console.log(res)
          if(res!=null){
            if(res.data.data.list !=null){
              this.searchResult = res.data.data.list
              for(let i = 0;i < this.searchResult.length;i++){
                this.searchResult[i].value = this.searchResult[i].bookName //必须要指定一个value值el-autocomplete才可以正常显示
              }
            }
          }else{
            this.fail("无法访问")
          }
        })
      },
      // 按照条件搜索书籍
      search(){
        clearTimeout(this.timeout)
        this.dynamicSearch()
        this.searchResultCopy = this.searchResult
      },
      // 异步搜索
      querySearchAsync(queryString, cb){
        cb(this.searchResult)
      },
      // 前往书籍详情
      toBooksInformation(name){
        this.$router.push({path:'/booksInformation',query:{boonName:name}})
      }
    }
  }
</script>

<style scoped>
body{
  min-width: 800px;
}
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
#logo2{
  margin-left: 10%;
  border-radius: 50px;
  width: 180px;
  height: 100px;
}
.el-row {
   /* margin-bottom: 20px;*/
}
.el-col {
    border-radius: 4px;
}
.advertising{
  border-radius: 4px;
  min-height: 36px;
  text-align: center;
  background: url("../assets/images/色图.jpg");
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
  .books{
      width: 200px;
      height: 200px;
      background-size:cover;
      background-position: center;
      background-repeat: no-repeat;
  }
  ul{
      list-style: none;
  }
  .infos{
      position: absolute;
      line-height: 20px;
      margin-left: 21px;
  }
  .list{
    padding-bottom: 20px;
    position: relative;
  }
</style>