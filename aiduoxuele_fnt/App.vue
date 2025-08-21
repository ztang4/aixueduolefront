<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			// uni.showModal({
			// 	content: '尽快下线',
			// 	cancelText: '取消',
			// 	confirmColor: '确定'
			// })
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			uni.getSystemInfo({
				success: (res) => {
					// console.log(res.statusBarHeight);
					Vue.prototype.mpheight = (menuButtonInfo.top - res.statusBarHeight) * 2 + res
						.statusBarHeight +
						menuButtonInfo.height
				}
			})
			Vue.prototype.mptop = menuButtonInfo.top
		},
		onShow: function() {

		},
		onHide: function() {

		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
</style>