import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import Buefy from 'buefy'

import App from './App.vue'

import 'buefy/dist/buefy.css'

import store from './store'
import router from './router'

const options = {
  color: 'hsl(48, 100%, 67%)',
  failedColor: 'hsl(348, 100%, 61%)',
  thickness: '4px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

Vue.use(Buefy, {
  defaultIconPack: 'fas',
})

Vue.use(VueProgressBar, options)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
