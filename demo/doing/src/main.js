import Vue from 'vue'
import Router from 'vue-router'
import FastClick from 'fastclick'

import Vum from './vum.js'

import './assets/js/jquery.min.js'
import './assets/js/bootstrap.js'
import './assets/css/bootstrap.min.css'
// demos
import Index from './view/Index'
import ShowPanel from './view/ShowPanel'
import SearchPanel from './view/SearchPanel'

import Page from './demos/Page'
import Buttons from './demos/Buttons'
import Column from './demos/Column'
import Grid from './demos/Grid'
import Modal from './demos/Modal'
import List from './demos/List'
import Contacts from './demos/Contacts'
import Form from './demos/Form'
import Icons from './demos/Icons'
import Tab from './demos/Tab'
import Scroll from './demos/Scroll'
import Popup from './demos/Popup'
import PopWindow from './demos/PopWindow'
import Preloader from './demos/Preloader'
import Actions from './demos/Actions'
import Toast from './demos/Toast'
import Searchbar from './demos/Searchbar'
import Calendar from './demos/Calendar'
import Result from './demos/Result'
import Slide from './demos/Slide'
import SidePanel from './demos/SidePanel'
import Popover from './demos/Popover'
import Stars from './demos/Stars'
import CircleProgress from './demos/CircleProgress'

Vue.use(Router)
Vue.use(Vum)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/show-panel',
      name: 'ShowPanel',
      component: ShowPanel
    },
    {
      path: '/search-panel',
      name: 'SearchPanel',
      component: SearchPanel
    },
    {
      path: '/page',
      component: Page
    },
    {
      path: '/buttons',
      component: Buttons
    },
    {
      path: '/column',
      component: Column
    },
    {
      path: '/grid',
      component: Grid
    },
    {
      path: '/modal',
      component: Modal
    },
    {
      path: '/list',
      component: List
    },
    {
      path: '/contacts',
      component: Contacts
    },
    {
      path: '/form',
      component: Form
    },
    {
      path: '/icons',
      name: 'icons',
      component: Icons
    },
    {
      path: '/tab',
      component: Tab
    },
    {
      path: '/scroll',
      component: Scroll
    },
    {
      path: '/popup',
      component: Popup
    },
    {
      path: '/popwindow',
      component: PopWindow
    },
    {
      path: '/preloader',
      component: Preloader
    },
    {
      path: '/toast',
      name: 'toast',
      component: Toast
    },
    {
      path: '/actions',
      component: Actions
    },
    {
      path: '/searchbar',
      component: Searchbar
    },
    {
      path: '/calendar',
      component: Calendar
    },
    {
      path: '/result',
      name: 'result',
      component: Result
    },
    {
      path: '/slide',
      name: 'slide',
      component: Slide
    },
    {
      path: '/side-panel',
      name: 'side-panel',
      component: SidePanel
    },
    {
      path: '/popover',
      name: 'popover',
      component: Popover
    },
    {
      path: '/stars',
      name: 'stars',
      component: Stars
    },
    {
      path: '/circle',
      name: 'circle',
      component: CircleProgress
    }
  ]
})

new Vue({
  router
}).$mount('#app')

Vum.router(router)

FastClick.attach(document.body)
