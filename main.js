import Vue from 'vue'
import App from './App'
import store from './store'

Vue.config.productionTip = false

App.mpType = 'app'

import 'static/css/main1.0.7.css'
import 'static/css/css.css'
import 'static/css/app.css'
import 'static/css/content.css'
import 'static/css/main.css'
import 'static/css/user-center.css'


const app = new Vue({
	store,
    ...App
})
app.$mount()
