import Vue from 'vue';
import VueRouter from "vue-router";
// import {Container} from "element-ui";
// import UserList from "../UserList";
// import UserNews from "../UserNews";
// import BackHome from "../App";
//安装路由
Vue.use(VueRouter);

//配置导出路由
export default new VueRouter({
    routes: [
        {
            path: '/Home',
            component: () => import('../Home'),
            // children: [
            //     {
            //         path: 'UserList',
            //         component: () => import('../UserList')
            //     }
            // ]
        },
        {
          path:'/UserList',component:()=>import('../UserList')
        },
        {
          path:'/UserNews',component:()=>import('../UserNews')
        }
        // {
        //     path: '/Home',
        //     component: ()=>import('../Home'),
        //     // children:[
        //     //     {
        //     //         path:'UserList',
        //     //         component: ()=>import('../UserList')
        //     //     }
        //     // ]
        // },

        // {
        //     path:'/Home',
        //     component:()=>import('../Home'),
        //      // redirect:'/UserList',
        //     children:[{path:'/UserList',component:UserList}]
        // },
        // {
        //   path:'/',component:()=>import('../Home')
        // }
        // {path:'/UserNews',component:UserNews},
        // {path:'/BackHome',component:BackHome},
    ]
})
