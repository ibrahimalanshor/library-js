import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import { Home, Read, Book, Rack, NotFound } from '@/pages'
import { RackView } from '@/pages/rack'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      home: true
    }
  },
  {
    path: '/book',
    name: 'Book',
    component: Book
  },
  {
    path: '/rack',
    name: 'Rack',
    component: Rack
  },
  {
    path: '/book/:book',
    name: 'Read',
    component: Read
  },
  {
    path: '/rack/:slug',
    name: 'RackView',
    component: RackView
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  }
]

export default new VueRouter({
  routes,
  mode: 'history'
})