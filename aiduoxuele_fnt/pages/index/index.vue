<template>
	<view class="container">
		<view class="notice">
			<image src="/static/noticered.png" style="width: 42rpx;height: 42rpx;" mode=""></image>

			<!-- <uni-notice-bar color="#222222" background-color="#FFEEEE" scrollable single
					text="uni-app 版正式发布，，发布iOS、Android、H5、微信小程序、支付宝小程序、百度小程序、头条小程序等7大平台。" /> -->
			<swiper style="width: 100%;height: 100%;" :circular='true' :autoplay="true" :interval="3000"
				:duration="1000">
				<swiper-item @click="gomsgdetail(item)" style="width: 100%;height: 100%;"
					v-for="(item,index) in msglist" :key="index">
					<view class="swiper-item">{{item.title}}</view>
				</swiper-item>

			</swiper>
		</view>
		<!-- 功能 -->
		<view class="fun">
			<view class="item" v-for="(item,index) in funlits" @click="gofun(index)" :key="index">
				<image :src="item.img" class="img" mode=""></image>
				<view class="txt">{{item.text}}</view>
			</view>
		</view>
		<!-- 数据 -->
		<view class="box">
			<view class="item2" @click.stop="godetail(item)" v-for="(item,index) in list" :key="index">
				<view class="head" @click.stop="godetail(item)">
					<image :src="baseImg + item.icon" class="avatar" mode="">
					</image>
					<view class="hr">
						<view class="name">{{item.class_name}}</view>
						<view class="time">{{item.time_ago}}</view>
					</view>
				</view>
				<view class="content">
					{{item.title}}
				</view>
				<!-- 图片/视频 -->
				<image v-if="item.type == 0" :src="baseImg + item.image" class="sucai" mode="">
				</image>
				<video v-else :enable-play-gesture='false' :show-center-play-btn='false' :show-fullscreen-btn='false'
					:show-play-btn='false' :src="baseImg + item.video" class="sucai2"></video>
				<view class="b">
					<view class="bi" @click.stop="dianzanFn(item)">
						<image v-if="item.is_like == 0" src="/static/zan.png" class="zan" mode=""></image>
						<image v-else src="/static/zanact.png" class="zan" mode=""></image>
						<view>{{item.like_count}}</view>
					</view>
					<view class="bi" @click.stop="godetail(item)">
						<image src="/static/pinglun.png" class="pinglun" mode=""></image>
						<view>{{item.comment_count}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 弹框 -->
		<uni-popup ref="popup" type="center">
			<view class="popupbox">
				<image :src="baseImg + poster" class="img1" mode=""></image>
				<view class="time2">{{time}}秒后自动关闭</view>
				<view class="link">
					<view class="link2">
						{{url}}
					</view>
					<view class="btn" @click="copyFn">
						点击复制淘宝链接
					</view>
				</view>
				<image @click="closeFn" src="/static/closeimg.png" class="img2" mode=""></image>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				baseImg: this.baseImg,
				poster: "",
				url: "",
				time: "",
				msglist: [],
				funlits: [{
						img: "../../static/banjidongtai.png",
						text: "班级动态"
					},
					{
						img: "../../static/baobaojiaoyu.png",
						text: "宝宝教育"
					}, {
						img: "../../static/chengzhangjilu.png",
						text: "成长记录"
					}, {
						img: "../../static/jiazhangshequ.png",
						text: "家长社区"
					}
				],
				list: [],
				page: 1
			}
		},
		onReachBottom() {
			this.page++
			this.http('/api/index/indexUpdates', {
				user_id: uni.getStorageSync('userinfo').id,
				page: this.page
			}).then(res => {
				if (res.data.data.length != 0) {
					this.list.push(...res.data.data)
				} else {
					uni.showToast({
						title: '全部加载完毕',
						icon: "none"
					})
				}

			})
		},
		onShow() {
			this.page = 1
			this.list.length = 0

			this.getpeizhi()
			this.getlist()
			this.getmsglist()
			this.checkPopupToday()
			// this.$refs.popup.open()
			// this.timer = setInterval(() => {
			// 	this.time--
			// 	if (this.time == 0) {
			// 		this.$refs.popup.close()
			// 		clearInterval(this.timer)
			// 		this.timer = null
			// 	}
			// }, 1000)
		},
		methods: {
			getTodayKey() {
				const today = new Date();
				return today.toISOString().split('T')[0]; // "YYYY-MM-DD"
			},
			checkPopupToday() {
				const todayKey = this.getTodayKey();
				const lastShown = uni.getStorageSync('popup-shown-date');

				if (lastShown !== todayKey) {
					// 显示弹框
					this.$refs.popup.open()
					this.timer = setInterval(() => {
						this.time--
						if (this.time == 0) {
							this.$refs.popup.close()
							clearInterval(this.timer)
							this.timer = null
						}
					}, 1000)
					// 更新记录
					uni.setStorageSync('popup-shown-date', todayKey);
				}
			},
			gomsgdetail(item) {
				uni.navigateTo({
					url: '/pages/messagedetail/messagedetail?item=' + encodeURIComponent(JSON.stringify(item))
				})
			},
			getmsglist() {
				this.http('/api/index/message').then(res => {
					this.msglist = res.data
				})
			},
			dianzanFn(item) {
				this.http('/api/index/like', {
					updates_id: item.id
				}).then(res => {
					if (res.code == 1) {
						this.page = 1
						this.list.length = 0
						// item.is_like = !item.is_like
						this.getlist()
					}
				})
			},
			getlist() {
				this.http('/api/index/indexUpdates', {
					user_id: uni.getStorageSync('userinfo').id,
					page: this.page
				}).then(res => {
					this.list = res.data.data
				})
			},
			getpeizhi() {
				this.http('/api/index/systemConfig').then(res => {
					this.poster = res.data.poster
					this.url = res.data.education_url
					this.time = res.data.window_show_time
				})
			},
			godetail(item) {
				uni.navigateTo({
					url: '/pages/commondetail/commondetail?id=' + item.id + '&data=' + encodeURIComponent(
						JSON
						.stringify(item))

				})

			},
			gofun(index) {
				if (index == 0) {
					uni.navigateTo({
						url: '/pages/categrage/categrage'
					})
				}
				if (index == 1) {
					uni.switchTab({
						url: '/pages/jiaoyu/jiaoyu'
					})
				}
				if (index == 2) {
					uni.navigateTo({
						url: '/pages/jilu/jilu'
					})
				}
				if (index == 3) {
					uni.navigateTo({
						url: '/pages/jiazhang/jiazhang'
					})
				}
			},
			closeFn() {
				this.$refs.popup.close()
			},
			copyFn() {
				uni.setClipboardData({
					data: this.url,
					success: () => {
						uni.showToast({
							title: '复制成功',
							icon: "none"
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F8F8F8;
	}

	.uni-noticebar__content-wrapper {
		padding-top: 20rpx !important;
		font-weight: 500;
		font-size: 28rpx;
		color: #222222;
	}

	.swiper-item {
		font-weight: 500;
		font-size: 28rpx;
		color: #222222;
		padding-left: 30rpx;
		line-height: 72rpx;
		max-width: 660rpx;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.container {
		box-sizing: border-box;

		.popupbox {
			width: 662rpx;
			height: 1000rpx;
			border-radius: 20rpx 20rpx;
			position: relative;

			.time2 {
				box-sizing: border-box;
				position: absolute;
				right: 20rpx;
				top: 20rpx;
				width: fit-content;
				padding: 10rpx;
				background-color: #999999;
				color: #ffffff;
				font-size: 24rpx;
				border-radius: 10rpx;
			}

			.img1 {
				display: block;
				width: 100%;
				height: 350rpx;
			}

			.img2 {
				display: block;
				width: 42rpx;
				height: 42rpx;
				margin: 0 auto;
				margin-top: 38rpx
			}

			.link {
				box-sizing: border-box;
				width: 100%;
				// height: 334rpx;
				border-radius: 0 0 20rpx 20rpx;
				background-color: #ffffff;
				padding: 20rpx 0 20rpx 0;

				.link2 {
					box-sizing: border-box;
					width: 602rpx;
					height: 90rpx;
					background: #F2F2F2;
					border-radius: 20rpx 20rpx 20rpx 20rpx;
					line-height: 90rpx;
					padding: 0 20rpx;
					margin: 0 auto;
					margin-bottom: 20rpx;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}

				.btn {
					width: 334rpx;
					height: 80rpx;
					background: #008CE9;
					border-radius: 68rpx 68rpx 68rpx 68rpx;
					text-align: center;
					line-height: 80rpx;
					font-weight: 500;
					font-size: 30rpx;
					color: #FFFFFF;
					margin: 0 auto;
				}
			}
		}

		.box {
			box-sizing: border-box;
			padding: 0 30rpx;
			margin-top: 30rpx;

			.item2 {
				box-sizing: border-box;
				width: 100%;
				padding: 26rpx 24rpx;
				background-color: #ffffff;
				margin-bottom: 30rpx;

				.b {
					display: flex;
					align-items: center;
					justify-content: flex-end;

					.bi {
						display: flex;
						align-items: center;
						font-weight: 500;
						font-size: 26rpx;
						color: #222222;
						margin-left: 52rpx;

						.zan {
							width: 36rpx;
							height: 36rpx;
							margin-right: 8rpx;
						}

						.pinglun {
							width: 36rpx;
							height: 36rpx;
							margin-right: 8rpx;
						}
					}
				}

				.sucai {
					width: 646rpx;
					height: 420rpx;
					border-radius: 20rpx;
					margin-bottom: 24rpx;
				}

				.sucai2 {
					width: 646rpx;
					height: 420rpx;
					border-radius: 20rpx;
					margin-bottom: 24rpx;
				}

				.head {
					display: flex;
					align-items: center;
					margin-bottom: 12rpx;

					.avatar {
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
						margin-right: 12rpx;
					}

					.hr {
						flex: 1;

						.name {
							font-weight: bold;
							font-size: 32rpx;
							color: #222222;
							margin-bottom: 8rpx;
						}

						.time {
							font-weight: 500;
							font-size: 26rpx;
							color: #666666;
						}

					}
				}

				.content {
					font-weight: 500;
					font-size: 28rpx;
					color: #222222;
					margin-bottom: 20rpx;
				}
			}
		}

		.fun {
			width: 690rpx;
			// height: 212rpx;
			background: #FFFFFF;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-evenly;
			margin: 20rpx auto;
			padding: 30rpx 0;

			.item {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;

				.img {
					width: 92rpx;
					height: 92rpx;
				}

				.txt {
					font-weight: 500;
					font-size: 30rpx;
					color: #222222;
					margin-top: 18rpx;
					text-align: center;
				}
			}
		}


		.notice {
			box-sizing: border-box;
			width: 100%;
			height: 72rpx;
			background: #FFEEEE;
			display: flex;
			align-items: center;
			padding: 0 28rpx;

		}
	}
</style>