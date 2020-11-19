<template>
    <el-container style="padding: 0">
        <el-header height="50px">
            <div>
                <img src="../src/assets/LibIcon.png" alt="">
                <span>图书馆后台管理系统</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <el-container>
            <el-aside width="150px">
                <el-menu
                        background-color="#138fbc"
                        router
                >
                    <el-menu-item index="/UserList">
                        <template slot="title">
                            <i class="el-icon-user-solid"></i>
                            <span slot="title">用户管理</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="/UserNews">
                        <template slot="title">
                            <i class="el-icon-document-copy"></i>
                            <span slot="title">借阅历史管理</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="/3">
                        <template slot="title">
                            <i class="el-icon-collection"></i>
                            <span slot="title">书籍管理</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="/4">
                        <template slot="title">
                            <i class="el-icon-paperclip"></i>
                            <span slot="title">图书类别管理</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="/5">
                        <template slot="title">
                            <i class="el-icon-bell"></i>
                            <span slot="title">公告栏管理</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="/6">
                        <template slot="title">
                            <i class="el-icon-data-line"></i>
                            <span slot="title">统计管理</span>
                        </template>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped>
    .el-menu {
        overflow: hidden;
    }

    .el-header {
        padding-left: 10px;
        background-color: #a7d8ec;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
    }

    .el-header div {
        display: flex;
        align-items: center;
    }

    .el-header div span {
        margin-left: 10px;
        font-size: 20px;
        font-weight: 700;
        color: #f9ff9c;
    }

    .el-header img {
        height: 50px;
        width: auto;
    }

    .el-header .el-button {
        height: 50px;
        width: 100px;
        font-size: 10px;
        text-align: center;
    }

    .el-menu-item {
        height: 50px;
    }
    .el-menu-item span{
        font-size: 5px;
        color: #f9ff9c;
    }

    .el-main {
        padding: 0;
    }

    .el-aside {
        background-color: #138fbc;
    }

    .el-container {
        /*background-color: antiquewhite;*/
    }

    .home-container {
        height: 500px;
    }
</style>