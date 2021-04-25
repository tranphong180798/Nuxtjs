import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _39ba24c3 = () => interopDefault(import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
const _0ce222e2 = () => interopDefault(import('..\\pages\\hello.vue' /* webpackChunkName: "pages/hello" */))
const _e10c3a80 = () => interopDefault(import('..\\pages\\hello2.vue' /* webpackChunkName: "pages/hello2" */))
const _6de8dace = () => interopDefault(import('..\\pages\\hellone.vue' /* webpackChunkName: "pages/hellone" */))
const _6b56faea = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _5f13d5f9 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _04b0082f = () => interopDefault(import('..\\pages\\notfound.vue' /* webpackChunkName: "pages/notfound" */))
const _1a161523 = () => interopDefault(import('..\\pages\\product\\index.vue' /* webpackChunkName: "pages/product/index" */))
const _029153fe = () => interopDefault(import('..\\pages\\refreshToken.vue' /* webpackChunkName: "pages/refreshToken" */))
const _2d1734b7 = () => interopDefault(import('..\\pages\\user\\index.vue' /* webpackChunkName: "pages/user/index" */))
const _0192aa80 = () => interopDefault(import('..\\pages\\product\\delete\\_id.vue' /* webpackChunkName: "pages/product/delete/_id" */))
const _18926741 = () => interopDefault(import('..\\pages\\product\\edit\\_id.vue' /* webpackChunkName: "pages/product/edit/_id" */))
const _d5279a3c = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _39ba24c3,
    name: "admin"
  }, {
    path: "/hello",
    component: _0ce222e2,
    name: "hello"
  }, {
    path: "/hello2",
    component: _e10c3a80,
    name: "hello2"
  }, {
    path: "/hellone",
    component: _6de8dace,
    name: "hellone"
  }, {
    path: "/inspire",
    component: _6b56faea,
    name: "inspire"
  }, {
    path: "/login",
    component: _5f13d5f9,
    name: "login"
  }, {
    path: "/notfound",
    component: _04b0082f,
    name: "notfound"
  }, {
    path: "/product",
    component: _1a161523,
    name: "product"
  }, {
    path: "/refreshToken",
    component: _029153fe,
    name: "refreshToken"
  }, {
    path: "/user",
    component: _2d1734b7,
    name: "user"
  }, {
    path: "/product/delete/:id?",
    component: _0192aa80,
    name: "product-delete-id"
  }, {
    path: "/product/edit/:id?",
    component: _18926741,
    name: "product-edit-id"
  }, {
    path: "/",
    component: _d5279a3c,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config.app && config.app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
