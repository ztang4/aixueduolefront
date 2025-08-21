<template>
	<view class="container">

		<!-- 数据 -->
		<view class="box">
			<view class="item2" @click="godetail(item)" v-for="(item,index) in list" :key="index">
				<view class="head">
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
				<image v-if="item.type == 0" :src="baseImg + item.image" class="sucai" mode=""></image>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseImg: this.baseImg,
				list: [],
				page: 1
			}
		},
		onReachBottom() {
			this.page++
			this.http('/api/index/classUpdates', {
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
			this.getlist()
		},
		methods: {
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
				this.http('/api/index/classUpdates', {
					page: this.page
				}).then(res => {
					this.list = res.data.data
				})
			},
			godetail(item) {
				uni.navigateTo({
					url: '/pages/commondetail/commondetail?id=' + item.id + '&data=' + encodeURIComponent(
						JSON
						.stringify(item))

				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F8F8F8;
	}

	.container {
		box-sizing: border-box;

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
	}
</style>