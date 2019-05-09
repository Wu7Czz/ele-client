import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import VueKonva from 'vue-konva'
import VCalendar from 'v-calendar'
import axios from '@/utils/axios'
import lodash from 'lodash'
import '@/styles/index.scss'
import 'v-calendar/lib/v-calendar.min.css'
import { Button, NavBar, Tabbar, TabbarItem, Row, Col, Toast, Uploader, Icon, Collapse, CollapseItem, Cell, CellGroup, DatetimePicker, Picker, Field, Popup, TreeSelect, Tab, Tabs, Panel, Checkbox, CheckboxGroup, Stepper, SwitchCell, Dialog, List, SwipeCell } from 'vant'
Vue.use(Button).use(Tabbar).use(NavBar).use(TabbarItem).use(Row).use(Col).use(Toast).use(Uploader).use(Icon).use(Collapse).use(CollapseItem).use(Cell).use(CellGroup).use(DatetimePicker).use(Picker).use(Field).use(Popup).use(TreeSelect).use(Tab).use(Tabs).use(Panel).use(Checkbox).use(CheckboxGroup).use(Stepper).use(SwitchCell).use(Dialog).use(List).use(SwipeCell)
Vue.use(VCalendar, {
  componentPrefix: 'v',
  firstDayOfWeek: 2,
  isExpanded: true,
  screens: {
    tablet: '576px',
    laptop: '992px',
    desktop: '1200px'
  }
})
Vue.use(VueKonva)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype._ = lodash

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
