<template>
<div id="booksIndex" style="height:100%; width:99%;">
      <el-row :gutter="20">
        <el-col :span="6">
            <img id="logo" class="grid-content" src="../assets/img/newlogo.png" alt="logo">
        </el-col>
        <el-col :span="10">
          <div style="padding-top:80px">
            <el-input v-model="input" placeholder="请输入书名" @focus="toBooksList"></el-input>
          </div>
        </el-col>
        <el-col :span="2">
          <div style="padding-top:80px">
            <el-button icon="el-icon-search" circle></el-button>
          </div>
        </el-col>
        <el-col :span="6" style="padding-top:80px">
          <el-button type="warning" icon="el-icon-shopping-cart-2" circle></el-button>
          <el-button type="warning">我的订单</el-button>
        </el-col>
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
          <div class="tool">1</div>
        </el-col>
        <el-col :span="4">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#138fbc"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>同性交友</span>
        </template>
        <el-menu-item-group>
          <template slot="title">男同</template>
          <el-menu-item index="1-1">三人行</el-menu-item>
          <el-menu-item index="1-2">Van</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="女同">
          <el-menu-item index="1-3">两女一杯</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">disgusting</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
            <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>同性交友</span>
        </template>
        <el-menu-item-group>
          <template slot="title">男同</template>
          <el-menu-item index="2-1">三人行</el-menu-item>
          <el-menu-item index="2-2">Van</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="女同">
          <el-menu-item index="2-3">两女一杯</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="2-4">
          <template slot="title">disgusting</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
    
  </el-col>
        <el-col :span="14">
            <div className="rollplay medium">
            <el-carousel :interval="4000" type="card" arrow="hover">
            <el-carousel-item v-for="(img,index) in imgList" :key="index">
      <img v-bind:src="img.url">
    </el-carousel-item>
    </el-carousel>
    </div>
        <ul>
          <li class="book">
            <a href="booksInformation">
              <img class="books" src="../assets/logo.png" alt="books">
              <p>书名1</p>              
            </a>
          </li>
          <li class="book">
            <a href="booksList">
              <img class="books" src="../assets/logo.png" alt="books">
              <p>书名2</p>              
            </a>
          </li>
          <li class="book">
            <a href="#">
              <img class="books" src="../assets/logo.png" alt="books">
              <p>书名3</p>              
            </a>
          </li>
          <li class="book">
            <a href="#">
              <img class="books" src="../assets/logo.png" alt="books">
              <p>类别</p>
              <p>书名4</p>
            </a>
          </li>
        </ul>
      </el-col>
        <el-col :span="4">
            <el-card class="box-card" shadow="hover">
              <div class="text item" style="color: black">
                今日推荐
                <p><a href="#" class="text item">金</a></p>
                <p><a href="#" class="text item">东游记</a></p>
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
  data() {
      return {
        input: '',
        activeIndex: '1',
        activeIndex2: '1',
        imgList:[
        {url:require('../assets/logo.png')},
        {url:require('../assets/logo.png')},
        {url:require('../assets/logo.png')},
        {url:require('../assets/logo.png')}
      ]
      }
      
    },
    methods: {
      toBooksList(){
        this.$router.push({path:'/bookslist'})
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img{
  height: 100%;
  width: 100%;
  border-radius: 20px;
}
#logo{
  margin-left: 10%;
  border-radius: 50px;
  width: 300px;
  height: 100px;
}
.el-row {
    margin-bottom: 20px;
}
.el-col {
    border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 200px;
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
    width: 200px;
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
</style>
