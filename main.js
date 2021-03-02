import Vue from 'vue'
import App from './App'
import store from './store'

import 'static/css/main1.0.7.css'
import 'static/css/css.css'
import 'static/css/app.css'
import 'static/css/content.css'
import 'static/css/main.css'
import 'static/css/user-center.css'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
