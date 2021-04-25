import Vue from 'vue'

const components = {
  LoginComponent: () => import('../..\\components\\LoginComponent.vue' /* webpackChunkName: "components/login-component" */).then(c => c.default || c),
  Logo: () => import('../..\\components\\Logo.vue' /* webpackChunkName: "components/logo" */).then(c => c.default || c),
  Notification: () => import('../..\\components\\Notification.vue' /* webpackChunkName: "components/notification" */).then(c => c.default || c),
  RegisterComponent: () => import('../..\\components\\RegisterComponent.vue' /* webpackChunkName: "components/register-component" */).then(c => c.default || c),
  VuetifyLogo: () => import('../..\\components\\VuetifyLogo.vue' /* webpackChunkName: "components/vuetify-logo" */).then(c => c.default || c)
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
