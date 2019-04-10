import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import VueKonva from 'vue-konva'
import axios from '@/utils/axios'
import lodash from 'lodash'
import '@/styles/index.scss'
import { Button, NavBar, Tabbar, TabbarItem, Row, Col, Toast, Uploader, Icon, Collapse, CollapseItem, Cell, CellGroup, DatetimePicker, Picker, Field, Popup } from 'vant'
Vue.use(Button).use(Tabbar).use(NavBar).use(TabbarItem).use(Row).use(Col).use(Toast).use(Uploader).use(Icon).use(Collapse).use(CollapseItem).use(Cell).use(CellGroup).use(DatetimePicker).use(Picker).use(Field).use(Popup)

Vue.use(VueKonva)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype._ = lodash

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
