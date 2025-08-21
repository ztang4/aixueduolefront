<template>
	<view class="container">

		<view class="logo">
			<image src="/static/logo.png" style="width: 296rpx;height: 296rpx;" mode=""></image>
			<view class="txt">爱多学乐</view>
		</view>
		<!--  一键登录 -->
		<button class="btn" v-if="ischeck" open-type="getPhoneNumber" @getphonenumber="phonelogin">
			手机号快速验证
		</button>
		<view class="btn" style="margin: 0 auto;margin-top: 154rpx;" v-if="!ischeck" @click="gotip"> 手机号快速验证</view>
		<!-- 协议 -->
		<view class="xieyi" @click.stop="ischeck = !ischeck">
			<radio :checked="ischeck" style="transform: scale(0.7);" color='#2774F6'></radio>
			<view>
				勾选即表明同意<text style="color: #2774F6;" @click.stop="goxieyi(1)">《用户协议》</text>和 <text
					style="color: #2774F6;" @click.stop="goxieyi(2)">《隐私政策》</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ischeck: false
			}
		},
		methods: {
			goxieyi(num) {
				uni.navigateTo({
					url: '/pages/xieyi/xieyi?num=' + num
				})
			},
			gotip() {
				uni.showToast({
					title: '请先阅读协议',
					icon: "none"
				})
			},
			phonelogin(e) {
				uni.login({
					success: (res) => {
						console.log(res.code);
						console.log(e.detail.code);
						this.http('/api/user/wxlogin', {
							miniappLoginCode: res.code,
							miniappMobileCode: e.detail.code
						}).then(res2 => {
							console.log(res2);
							uni.setStorageSync('userinfo', res2.data.userinfo)
							uni.setStorageSync('token', res2.data.userinfo.token)
							if (res2.code == 1) {
								uni.reLaunch({
									url: "/pages/index/index"
								})
							}
						})
					}
				})

			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #ffffff;
	}

	.container {
		box-sizing: border-box;

		.logo {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			font-weight: bold;
			font-size: 42rpx;
			color: #000000;
			margin: 0 auto;
			margin-top: 100rpx;
		}

		.btn {
			width: 630rpx;
			height: 94rpx;
			background: #008CE9;
			border-radius: 50rpx 50rpx 50rpx 50rpx;
			text-align: center;
			line-height: 94rpx;
			font-weight: 500;
			font-size: 32rpx;
			color: #FFFFFF;
			margin-top: 154rpx;
		}

		.xieyi {

			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: 500;
			font-size: 26rpx;
			color: #222222;
			margin-top: 36rpx;
		}
	}
</style>