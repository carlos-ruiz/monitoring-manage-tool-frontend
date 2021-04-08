import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import Vuex from 'vuex'
import store from './store'
import Toast, {POSITION} from 'vue-toastification'
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css'

const options = {
  // You can set your default options here
  position: POSITION.TOP_CENTER,
  timeout: 3000
}

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  Vuex,
  store,
  render: (h) => h(App)
}).$mount('#app')

Vue.use(Toast, options)
