import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _07137886 = () => interopDefault(import('../pages/company/edit.vue' /* webpackChunkName: "pages/company/edit" */))
const _10695dcc = () => interopDefault(import('../pages/company/list.vue' /* webpackChunkName: "pages/company/list" */))
const _32201a58 = () => interopDefault(import('../pages/company/new.vue' /* webpackChunkName: "pages/company/new" */))
const _976d6f22 = () => interopDefault(import('../pages/users/list.vue' /* webpackChunkName: "pages/users/list" */))
const _47db3cdf = () => interopDefault(import('../pages/users/new.vue' /* webpackChunkName: "pages/users/new" */))
const _e75ed1d0 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/company/edit",
    component: _07137886,
    name: "company-edit"
  }, {
    path: "/company/list",
    component: _10695dcc,
    name: "company-list"
  }, {
    path: "/company/new",
    component: _32201a58,
    name: "company-new"
  }, {
    path: "/users/list",
    component: _976d6f22,
    name: "users-list"
  }, {
    path: "/users/new",
    component: _47db3cdf,
    name: "users-new"
  }, {
    path: "/",
    component: _e75ed1d0,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
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
