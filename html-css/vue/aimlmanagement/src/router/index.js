import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Tree from '@/components/Tree'
import index from '../pages/index.vue'
import pageUiButton from '../pages/pageUiButton.vue'
import pageUiList from '../pages/pageUiList.vue'
import pageUiNav from '../pages/pageUiNav.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
    	path: "/Tree",
    	name: 'Tree',
    	component: Tree
    },
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/ui',
      name: 'ui',
      component: index,
      children: [{
        path: '/button',
        name: 'uiButton',
        component: pageUiButton
      },{
        path: '/list',
        name: 'uiList',
        component: pageUiList
      },{
        path: '/nav',
        name: 'uiNav',
        component: pageUiNav
      }]
    }
  ]
})
