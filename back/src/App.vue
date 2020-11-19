 <template>
    <div>
        <el-container class="home-container">
            <el-header>
                <div>
                    <img src="../src/assets/zozo.gif" alt="">
                    <span>图书馆后台管理系统</span>
                </div>
                <el-button type="info" @click="logout">退出</el-button>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-row class="tac">
                        <el-col>
                            <div class="toggle-bottom">
                                <i class="el-icon-bell"></i>
                            </div>
                            <el-menu
                                    index="/UserList"
                                    default-active="2"
                                    class="el-menu-vertical-demo"
                                    @open="handleOpen"
                                    @close="handleClose"
                                    router>
                                <el-submenu index="/UserList"
                                            @click="myclick">
                                    <template slot="title">
                                        <i class="el-icon-user"></i>
                                        <span>用户管理</span>
                                    </template>
                                </el-submenu>
                                <el-submenu index="2">
                                    <template slot="title">
                                        <i class="el-icon-document-copy"></i>
                                        <span>借阅历史管理</span>
                                        <!--                                    <router-link :to="{name:'UserList'}">用户管理</router-link>-->
                                    </template>
                                </el-submenu>
                                <el-submenu index="3">
                                    <template slot="title">
                                        <i class="el-icon-collection"></i>
                                        <span>书籍管理</span>
                                    </template>
                                </el-submenu>
                                <el-submenu index="4">
                                    <template slot="title">
                                        <i class="el-icon-paperclip"></i>
                                        <span>图书类别管理</span>
                                    </template>
                                </el-submenu>
                                <el-submenu index="5">
                                    <template slot="title">
                                        <i class="el-icon-bell"></i>
                                        <span>公告栏管理</span>
                                    </template>
                                </el-submenu>
                                <el-menu-item index="6">
                                    <i class="el-icon-data-line"></i>
                                    <span slot="title">统计管理</span>
                                </el-menu-item>
                            </el-menu>
                        </el-col>
                    </el-row>
                </el-aside>
                <el-main>
                    <!--                <router-view></router-view>-->
                </el-main>
            </el-container>
        </el-container>
        <router-view></router-view>
    </div>
    <!--  <div id="app">-->
    <!--    <img alt="Vue logo" src="./assets/logo.png">-->
    <!--    <HelloWorld msg="法老"/>-->
    <!--  </div>-->
</template>

<script>
    // import HelloWorld from './components/HelloWorld.vue'
    export default {
        data(){
            return {
            }
        },
        created() {
            // this.getMenuList();
        },
        name: 'App',
        components: {},
        methods: {
            // async getMenuList(){
            //     const {data:res}= await this.$http.get('menus');
            //     console.log(res);
            // },
            handleOpen(key, keyPath) {
                console.log("-----"+key, keyPath);
                // this.$router.push("UserList");
                this.$router.push("/UserList");

            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
                // this.$router.push("/UserList")
            },
            myclick(){
                console.log("@@@@@@@@");
            },
            logout(){
                console.log("logout");
                this.$router.push("UserList")
            }
        }
    }
</script>

<style scoped>
    .toggle-bottom{
        background-color: red;
        text-align: center;
    }
    .toggle-bottom i{
        display: flex;
    }
    .el-header {
        padding-left: 10px;
        background-color: #ffc5bb;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .el-header div {
         display: flex;
         align-items: center;
     }
    .el-header div span{
        margin-left: 10px;
        font-size: 20px;
        font-weight: 700;
     }
    .el-header img{
        height: 50px;
        width: 50px;
    }
    .tac{
        background-color: greenyellow;
    }
    .home-container{
        height: 500px;
    }
</style>
