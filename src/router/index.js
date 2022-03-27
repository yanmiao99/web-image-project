import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    name: 'home',
    path: '/',
    redirect: '/upload-image', // 必须使用 path 或者 name
    meta:{
      title:'首页'
    },
    component: () => import('../components/Home.vue'),
    children: [
      {
        name: 'upload-image',
        path: '/upload-image',
        meta:{
          title:'上传图片'
        },
        component: () => import('../views/upload-image.vue'),
      },
      {
        name: 'breakpoint-analysis',
        path: '/breakpoint-analysis',
        meta:{
          title:'断点分析'
        },
        component: () => import('../views/breakpoint-analysis.vue'),
      },
      {
        name: 'history',
        path: '/history',
        meta:{
          title:'历史记录'
        },
        component: () => import('../views/history.vue'),
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
