import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

// 引入 element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
// 引入vue-router
import router from './router'
// 映入vue-axios
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
//引入代码高亮
import highlight from 'highlight.js';
Vue.use(ElementUI, { locale })
Vue.use(highlight);
Vue.config.productionTip = false


//将代码高亮封装成一个指令
Vue.directive('highlight', (el) => {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    highlight.highlightBlock(block)

  })

})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
