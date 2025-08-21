import config from "@/common/baseurl.js"
let baseurl = config.baseUrl
export function http(url, data, method = 'POST') {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseurl + url,
			data,
			timeout: 100000,
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				'token': uni.getStorageSync('token') || ''
			},
			method,
			success: (res) => {
				// console.log(url,data,res,"接口")
				if (res.data.code == 1 || res.data.code == 6 || res.data.code == 200) { //请求成功
					resolve(res.data)
					uni.hideLoading()
				} else if (res.data.code == 401) {
					uni.removeStorage({
						key: 'token'
					})
					uni.hideLoading()
					// uni.showToast({
					//   title: res.data.msg,
					//   icon: 'none'
					// })

					toLogin();
				} else {
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					})

				}
			},
			fail: (res) => {
				uni.hideLoading()
				// uni.showToast({
				// 	title: '网络链接错误，刷新下',
				// 	icon: 'none'
				// })
			},
			complete: () => {

			}
		});
	})
}

function toLogin(e) {
	uni.hideLoading()
	uni.removeStorageSync('token')

	// uni.clearStorageSync()
	setTimeout(() => {
		uni.reLaunch({
			url: "/pages/login/login"
		})
	}, 800)

}