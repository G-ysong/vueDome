/* ==========引入第三方包 -S========== */
import Vue from 'vue'
// 引路由对象
import VueRouter from 'vue-router'
/* 引用自己的vue文件 S */
import App from './app.vue'
import Home from './components/home/home.vue'
import Member from './components/member/menber.vue'
import ShopCart from './components/shopcart/shopcart.vue'
import Search from './components/search/search.vue'
import NewsList from './components/newsList/newsList.vue'
import NewsDetail from './components/newsList/newsDetail.vue'
import PicShare from './components/pic/picShare.vue'
import PicDetail from './components/pic/picDetail.vue'
import NavBar from './components/common/nav-bar.vue'
import ProList from './components/pro/proList.vue'
import ProDetail from './components/pro/proDetail.vue'
/* 引用自己的vue文件 E */

// 引入mint-ui
import Mint from 'mint-ui'
// 引入mint-ui css
import 'mint-ui/lib/style.css'

// 引入mui
import '../static/vendors/mui/dist/css/mui.css'

import '../static/css/global.css' // 引入全局样式

// vue-preview的引入
import VuePreview from 'vue-preview'

// Axios: 引入axios
import Axios from 'axios' // 默认配置

import Moment from 'moment' // 引入moment
// 挂载原型
Vue.prototype.$ajax = Axios
Axios.defaults.baseURL = 'https://www.apiopen.top/'

// axios: 拦截器
Axios.interceptors.request.use(function (config) {
  Mint.Indicator.open({
    text: 'Loading...',
    spinnerType: 'fading-circle'
  })
  return config
})
Axios.interceptors.response.use(function (config) {
  Mint.Indicator.close()
  return config
})
/* ==========引入第三方包 -E========== */

/* 定义全局过滤器 S */
Vue.filter('converDate', function (value) {
  return Moment(value).format('YYYY-MM-DD')
})
Vue.component('navBar', NavBar)

/* 定义全局过滤器 E */

/* 安装插件 S */
// Mint: 安装插件
Vue.use(Mint)
Vue.config.productionTip = false
// VueRouter: 安装插件
Vue.use(VueRouter)
// VuePreview: 安装插件
Vue.use(VuePreview)
/* 安装插件 E */

Vue.config.productionTip = false

let router = new VueRouter({
  linkActiveClass: 'mui-active',
  routes: [
    {path: '/', redirect: {name: 'home'}},
    {name: 'home', path: '/home', component: Home},
    {name: 'member', path: '/member', component: Member}, // 会员
    {name: 'shopCart', path: '/shopcart', component: ShopCart}, // 购物车
    {name: 'search', path: '/search', component: Search}, // 查找
    {name: 'news.list', path: '/news/list', component: NewsList}, // 新闻列表
    {name: 'news.detail', path: '/news/detail', component: NewsDetail}, // 新闻详情
    {name: 'pic.share', path: '/pic/picShare', component: PicShare},
    {name: 'pic.detail', path: '/pic/detail/:id', component: PicDetail},
    {name: 'pro.list', path: '/pro/list', component: ProList},
    {name: 'pro.detail', path: '/pro/detail', component: ProDetail}
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: c => c(App)
})
