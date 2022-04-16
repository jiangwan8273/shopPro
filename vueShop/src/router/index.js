import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../pages/Login.vue'
// import Home from '../pages/Home.vue'
// import Users from '../pages/users/Users.vue'
// import Rights from '../pages/rights/Rights.vue'
// import Roles from '../pages//roles/Roles.vue'
// import Categories from '../pages/categories/Categories.vue'
// import Params from '../pages/params/Params.vue'
// import Goods from '../pages/goods/Goods.vue'
// import GoodsAdd from '../pages/goods/AddShop.vue'
// import Orders from '../pages/orders/Orders.vue'
// import Reports from '../pages/reports/Reports.vue'
// import Exceldata from '../pages/importdata/excel_data.vue'

const Login = () => import('../pages/Login.vue')
const Home = () => import('../pages/Home.vue')
const Users = () => import('../pages/users/Users.vue')
const Rights = () => import('../pages/rights/Rights.vue')
const Roles = () => import('../pages//roles/Roles.vue')
const Categories = () => import('../pages/categories/Categories.vue')
const Params = () => import('../pages/params/Params.vue')
const Goods = () => import('../pages/goods/Goods.vue')
const GoodsAdd = () => import('../pages/goods/AddShop.vue')
const Orders = () => import('../pages/orders/Orders.vue')
const Reports = () => import('../pages/reports/Reports.vue')
const Exceldata = () => import('../pages/importdata/excel_data.vue')

/* const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
} */

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '/',
        component: Users
      },
      {
        path: '/users',
        component: Users
      }, {
        path: '/rights',
        component: Rights
      }, {
        path: '/roles',
        component: Roles
      },
      {
        path: '/categories',
        component: Categories
      },
      {
        path: '/params',
        component: Params
      },
      {
        path: '/goods',
        component: Goods
      },
      {
        path: '/goodsAdd',
        component: GoodsAdd
      },
      {
        path: '/orders',
        component: Orders
      },
      {
        path: '/reports',
        component: Reports
      },
      {
        path: '/exceldata',
        component: Exceldata
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
