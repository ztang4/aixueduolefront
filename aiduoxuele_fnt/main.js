// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import {
	http
} from "@/common/request.js"
import config from "@/common/baseurl.js"
Vue.prototype.baseImg = config.baseImgUrl
Vue.prototype.http = http
Vue.config.productionTip = false
// 导入并挂载全局的分享方法
import share from '@/common/share.js'
Vue.mixin(share)

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif