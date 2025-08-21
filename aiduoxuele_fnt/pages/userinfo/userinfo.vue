<template>
	<view class="container">
		<view class="box1" @click="upload">
			<image :src="baseImg + userinfo.avatar" style="width: 114rpx;height: 114rpx;border-radius: 50%;" mode="">
			</image>
			<view class="cream">
				<uni-icons type="camera-filled" size="24"></uni-icons>
			</view>
		</view>

		<view class="name" @click="openbox">
			<view style="font-weight: 500;
font-size: 28rpx;
color: #222222;">昵称</view>
			<view style="font-weight: bold;
font-size: 32rpx;
color: #222222;">{{userinfo.nickname}}</view>
		</view>
		<uni-popup type='center' ref="nickname">
			<view class="namebox">
				<view class="title">修改昵称</view>
				<input type="text" v-model="nickname" class="ipt" placeholder="请输入" placeholder-class="default" />
				<view class="btns">
					<view class="btn1" @click="closeFn">取消</view>
					<view class="btn2" @click="okFn">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickname: '',
				userinfo: {},
				baseImg: this.baseImg
			};
		},
		onShow() {
			this.getuserinfo()
		},
		methods: {
			getuserinfo() {
				this.http('/api/user/userinfo').then(res => {
					this.userinfo = res.data
				})
			},
			upload() {
				uni.chooseMedia({
					count: 1,
					mediaType: ['image'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						console.log(res.tempFiles[0].tempFilePath);
						uni.uploadFile({
							url: this.baseImg + '/api/common/upload', //仅为示例，非真实的接口地址
							filePath: res.tempFiles[0].tempFilePath,
							name: 'file',
							header: {
								token: uni.getStorageSync('token')
							},
							success: (data) => {
								console.log(JSON.parse(data.data));

								this.http('/api/user/profile', {
									avatar: JSON.parse(data.data).data.url
								}).then(res3 => {
									if (res3.code == 1) {
										this.userinfo.avatar = JSON.parse(data.data).data
											.url
										uni.showToast({
											title: '修改成功',
											icon: "none"
										})
									}
								})
							}
						});
					}
				})
			},
			closeFn() {
				this.$refs.nickname.close()
			},
			okFn() {
				if (this.nickname.trim() == '') {
					return uni.showToast({
						title: '请输入昵称',
						icon: "none"
					})
				}
				this.http('/api/user/profile', {
					nickname: this.nickname
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: '修改成功',
							icon: "none"
						})
						this.getuserinfo()
						this.closeFn()
					}
				})
			},
			openbox() {
				this.$refs.nickname.open()
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F8F8F8;
	}

	.container {
		box-sizing: border-box;

		.namebox {
			box-sizing: border-box;
			width: 642rpx;
			height: 366rpx;
			background: #FFFFFF;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			padding: 40rpx 0 0 0;

			.btns {
				display: flex;
				align-items: center;
				border-top: 1rpx solid #E7E7E7;
				margin-top: 50rpx;

				.btn1 {
					width: 49%;
					height: 100rpx;
					border-right: 1rpx solid #E7E7E7;
					text-align: center;
					line-height: 100rpx;
					font-weight: 500;
					font-size: 30rpx;
					color: #666666;
				}

				.btn2 {
					width: 50%;
					height: 100rpx;
					text-align: center;
					line-height: 100rpx;
					font-weight: 500;
					font-size: 30rpx;
					color: #0779EA;
				}
			}

			.default {
				font-weight: 500;
				font-size: 30rpx;
				color: #666666;
			}

			.title {
				font-weight: bold;
				font-size: 32rpx;
				color: #222222;
				text-align: center;
			}

			.ipt {
				box-sizing: border-box;
				width: 558rpx;
				height: 100rpx;
				background: #F2F2F2;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				padding: 0 50rpx;
				margin: 0 auto;
				margin-top: 32rpx;
			}
		}

		.box1 {
			box-sizing: border-box;
			margin: 0 auto;
			margin-top: 50rpx;
			text-align: center;
			// display: flex;
			// align-items: center;
			// justify-content: center;
			// flex-direction: column;
			position: relative;
			width: 144rpx;
			height: 144rpx;
			border-radius: 72rpx 72rpx 72rpx 72rpx;

			.cream {
				width: 48rpx;
				height: 48rpx;
				border-radius: 50%;
				text-align: center;
				line-height: 48rpx;
				position: absolute;
				bottom: 12rpx;
				right: 12rpx;
				background-color: #ffffff;
			}
		}

		.name {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 690rpx;
			height: 120rpx;
			background: #FFFFFF;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			padding: 0 40rpx;
			margin: 0 auto;
			margin-top: 100rpx;
		}
	}
</style>