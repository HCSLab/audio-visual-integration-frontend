import Vue from 'vue'
import App from './App.vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VuePlyr from 'vue-plyr'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VuePlyr, {
  plyr: {
    fullscreen: { enabled: false }
  },
  emit: ['ended']
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
