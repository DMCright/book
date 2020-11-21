import Vue from 'vue'
import VueRouter from 'vue-router'
import Regist from '../views/Regist.vue'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Index',
        component: () =>
            import ('../views/BooksIndex.vue')
    },
    {
        path: '/reg',
        name: 'Regist',
        component: Regist
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../views/Login.vue')
    },
    {
        path: '/modify',
        name: 'Modify',
        redirect: '/modify/msgModify',
        component: () =>
            import ('../views/Modify.vue'),
        children: [{
                path: 'msgModify',
                name: 'MsgModify',
                component: () =>
                    import ('../components/MsgModify.vue')
            },
            {
                path: 'personHistory',
                name: 'PersonHistory',
                component: () =>
                    import ('../components/PersonHistory.vue')
            }
        ]
    },
    {
        path: '/booksInformation',
        name: 'BooksInformation',
        component: () =>
            import ('../views/BooksInformation.vue')
    },
    {
        path: '/booksList',
        name: 'BooksList',
        component: () =>
            import ('../views/BooksList.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router