<template>
    <div id="booksList">
    <el-row :gutter="20">
        <el-col :span="6">
            <img id="logo2" class="grid-content" src="../assets/images/newlogo.png" alt="logo">
        </el-col>
        <el-col :span="10">
          <div style="padding-top:80px;">
            <el-autocomplete popper-class="inputText"
            :popper-append-to-body="false"
            v-model="state" placeholder="请输入书名" 
            :fetch-suggestions="querySearchAsync" 
            @keydown.enter.native="toBooksList"
            @select="handleSelect"
            style="width:100%;">
            </el-autocomplete>
          </div>
        </el-col>
        <el-col :span="2">
          <div style="padding-top:80px;">
            <el-button icon="el-icon-search" circle></el-button>
          </div>
        </el-col>
        <el-col :span="6" style="padding-left:30px;padding-top:80px;">
          <el-button type="warning" icon="el-icon-shopping-cart-2" circle></el-button>
          <el-button type="warning">我的订单</el-button>
        </el-col>
    </el-row>

    <el-row>
        <el-col :span="2" style="color:white">
            1
        </el-col>

        <el-col :span="20">
            <div class="choosen">

            <font style="color:white">书籍分类筛选:</font>

            <el-select v-model="value" placeholder="请选择出版社" style="padding-left:30px">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>

            <el-select v-model="value2" placeholder="请选择作者" style="padding-left:30px">
                <el-option
                    v-for="item in authors"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>

            <el-select v-model="value3" multiple placeholder="请选择类别" style="padding-left:30px;padding-right:30px;">
                <el-option
                    v-for="item in category"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>

            <el-button type="primary" round>筛选！</el-button>

            </div>
            <p style="padding-top:20px">
                <ul>
                    <li class="list">
                        <a href="#">
                            <img class="books" src="../assets/images/摆渡人.jpg" alt="摆渡人">
                        </a>
                            <a class="infos" href="#" style="margin-left:21px">摆渡人（系列畅销千万册。如果命运是一条孤独的河流，谁会是你灵魂的摆渡人？《摆渡人》完结篇即将上市！）</a>
                            <p class="infos" style="margin-left:210px;width:800px;height:20px;bottom:130px;">（同名有声剧上线音频平台，由知名演员海铃、谢治勋领衔演绎，带你走进迪伦和崔斯坦的荒原世界！
                                《青春有你》王喆推荐！令千万读者灵魂震颤的人性救赎之作。如果我真的存在，也是因为你需要我。白马时光）</p>
                            <p class="infos" style="margin-left:210px;width:800px;height:20px;bottom:80px;"><a href="#">谷恒条野</a><span>/</span><span>2020/11/18</span><span><a href="#">谷恒条野出版社</a></span></p>
                    </li>
                    <li class="list">
                        <a href="#">
                            <img class="books" src="../assets/images/摆渡人.jpg" alt="摆渡人">
                        </a>
                            <a class="infos" href="#" style="margin-left:21px">摆渡人（系列畅销千万册。如果命运是一条孤独的河流，谁会是你灵魂的摆渡人？《摆渡人》完结篇即将上市！）</a>
                            <p class="infos" style="margin-left:210px;width:800px;height:20px;bottom:130px;">谷恒条野特别推荐</p>
                            <p class="infos" style="margin-left:210px;width:800px;height:20px;bottom:80px;"><a href="#">谷恒条野</a><span>/</span><span>2020/11/18</span><span><a href="#">谷恒条野出版社</a></span></p>

                    </li>
                </ul>
            </p>
        </el-col>

        <el-col :span="2" style="color:white">
            1
        </el-col>
    </el-row>
    </div>
</template>

<script>
  export default {
    mounted(){
      this.state = this.$route.query.state
      this.searchResult = this.loadAll()
    },
    data() {
      return {
        state:'',
        timeout:  null,
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
        }],
        value3:''
      }
    },
    methods:{
      loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
          { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
          { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
          { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
          { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
          { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
          { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
          { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
          { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
          { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
          { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
          { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
          { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
          { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
          { "value": "枪会山", "address": "上海市普陀区棕榈路" },
          { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
          { "value": "钱记", "address": "上海市长宁区天山西路" },
          { "value": "壹杯加", "address": "上海市长宁区通协路" },
          { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
          { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
          { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
          { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
          { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
          { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
          { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
          { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
          { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
          { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
          { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
          { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
          { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
          { "value": "浏阳蒸菜", "address": "天山西路430号" },
          { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
          { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
          { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
          { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
          { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
          { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
          { "value": "阳阳麻辣烫", "address": "天山西路389号" },
          { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
        ];
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
      querySearchAsync(queryString, cb){
        var restaurants = this.searchResult;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 500 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
    }
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
  background: url("../assets/images/色图.jpg");
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
  .books{
      width: 200px;
      height: 200px;
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