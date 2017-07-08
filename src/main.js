// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// External Plugins
import Vuex from 'vuex'

// ElementUI
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-default/index.css'

// App's components
import Hello from './components/Hello.vue'

Vue.config.productionTip = false

// Register Plugins
Vue.use(Vuex)
Vue.use(ElementUI, {locale})

// Store
const store = new Vuex.Store({
  state: {
    // Debug
    count: 20,

    todoList: []
  },
  mutations: {
    increment (state) {
      state.count += 1
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: `
    <div class="app">
      <App></App>
    </div>
  `,
  components: {App, Hello}
})
