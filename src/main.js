import Vue from 'vue'
import App from './App.vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VuePlyr from 'vue-plyr'
import axios from 'axios'
import VueAxios from 'vue-axios'
import device from "current-device";


Vue.use(BootstrapVue, IconsPlugin, axios, VueAxios, device)

Vue.use(VuePlyr, {
  plyr: {
    fullscreen: { enabled: false }
  },
  emit: ['ended']
})


Vue.config.productionTip = false
Vue.prototype.$http = axios


new Vue({
  render: h => h(App),
}).$mount('#app')
