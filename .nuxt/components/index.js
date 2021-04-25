export { default as LoginComponent } from '../..\\components\\LoginComponent.vue'
export { default as Logo } from '../..\\components\\Logo.vue'
export { default as Notification } from '../..\\components\\Notification.vue'
export { default as RegisterComponent } from '../..\\components\\RegisterComponent.vue'
export { default as VuetifyLogo } from '../..\\components\\VuetifyLogo.vue'

export const LazyLoginComponent = import('../..\\components\\LoginComponent.vue' /* webpackChunkName: "components/login-component" */).then(c => c.default || c)
export const LazyLogo = import('../..\\components\\Logo.vue' /* webpackChunkName: "components/logo" */).then(c => c.default || c)
export const LazyNotification = import('../..\\components\\Notification.vue' /* webpackChunkName: "components/notification" */).then(c => c.default || c)
export const LazyRegisterComponent = import('../..\\components\\RegisterComponent.vue' /* webpackChunkName: "components/register-component" */).then(c => c.default || c)
export const LazyVuetifyLogo = import('../..\\components\\VuetifyLogo.vue' /* webpackChunkName: "components/vuetify-logo" */).then(c => c.default || c)
