<template>
    <div id="booksInformation">
<el-row gutter="20">
        <el-col :span="6">
            <img id="logo2" class="grid-content" src="../assets/py.png" alt="logo">
        </el-col>
        <el-col :span="10">
          <div style="padding-top:80px">
            <el-input v-model="input" placeholder="请输入片名或xp标签"></el-input>
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

    <el-row>
        <el-col :span="2">
            1
        </el-col>
        <el-col :span="6">
            <img class="mainBook" src="../assets/py.png" alt="摆渡人">
        </el-col>
        <el-col :span="12">
            <div class="sale_info">
                <div class="book_info" style="border-top: silver 2px solid;">
                <h3>摆渡人（系列畅销千万册。如果命运是一条孤独的河流，谁会是你灵魂的摆渡人？《摆渡人》完结篇即将上市！）</h3>
                <p>（同名有声剧上线音频平台，由知名演员海铃、谢治勋领衔演绎，带你走进迪伦和崔斯坦的荒原世界！
                《青春有你》王喆推荐！令千万读者灵魂震颤的人性救赎之作。如果我真的存在，也是因为你需要我。白马时光）</p>
                </div>
                <span class="introduce">作者:[中]
                <a href="#">谷恒条野</a>
                出品</span>
                <span class="introduce">出版社:
                <a href="#">五邑大学出版社</a>
                </span>
                <span class="introduce">
                出版时间:2020/11/18
                </span>
                <p>
                <span class="introduce">
                在
                <a href="#">谷恒条野书本榜</a>
                排名第一位
                </span>
                <span class="introduce">
                书本剩余数量：
                <span pp_name="count">
                10086
                </span>
                </span>
                <span class="introduce">
                书本价格:
                <span class="introduce" pp_name="price">
                24.7w
                </span>
                </span>
                </p>
                <p>
                <el-button type="primary" round>借它就完事了！！</el-button>
                <el-button type="danger" round disabled>很遗憾，本书已经被借完</el-button>
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
    data: () => ({
      show: true
    })
  }
</script>

<style scoped>
img{
  height: 100%;
  width: 100%;
  border-radius: 20px;
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
  width: 300px;
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
  min-height: 200px;
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