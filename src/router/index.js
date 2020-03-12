import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index'),
    },
    {
      path: '/',//首页
      component: Layout,
      redirect: '/home',
      children: [{
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index'),
        meta: {
          title: '首页'
        }
      }]
    },
    {
      path: '/loan-input',//贷款申请
      component: Layout,
      redirect: '/loan-input/index',
      children: [{
        path: 'index',
        name: 'loan-input',
        component: () => import('@/views/loan-input/index'),
        meta: {
          title: '贷款申请'
        }
      }]
    },
    {
      path: '/input-manger',//申请管理
      component: Layout,
      redirect: '/input-manger/index',
      children: [
        {
          path: 'index',
          name: 'input-manger',
          component: () => import('@/views/input-manger/index'),
          meta: {
            title: '申请管理'
          }
        }
      ]
    },
    {
      path: '/loan-approve',//贷款审批
      component: Layout,
      meta:{
        title:'贷款审批'
      },
      redirect: '/loan-approve/first',
      children: [
        {
          path: 'first',
          name: 'first',
          component: () => import('@/views/loan-approve/first'),
          meta: {
            title: '初审'
          }
        },
        {
          path: 'end',
          name: 'end',
          component: () => import('@/views/loan-approve/end'),
          meta: {
            title: '终审'
          }
        }
      ]
    },
    {
      path: '/contract',
      component: Layout,
      redirect: '/contract/index',
      children: [
        {
          path: 'index',
          name: 'contract',
          component: () => import('@/views/contract/index'),
          meta: {
            title: '标的管理'
          }
        }
      ]
    },
    {
      path: '/permission',
      component: Layout,
      meta: {
        title: '权限管理'
      },
      redirect: '/permission/create',
      children: [
        {
          path: 'create',
          component: () => import('@/views/permission/create'),
          meta: {
            title: '创建管理员'
          }
        },
        {
          path: 'list',
          component: () => import('@/views/permission/list'),
          meta: {
            title: '列表展示'
          }
        }
      ]
    }
  ]
})
