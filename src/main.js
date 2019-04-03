import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from '@/utils/axios'
import { Button, NavBar, Tabbar, TabbarItem, Row, Col, Toast, Uploader, Icon } from 'vant'
Vue.use(Button).use(Tabbar).use(NavBar).use(TabbarItem).use(Row).use(Col).use(Toast).use(Uploader).use(Icon)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
