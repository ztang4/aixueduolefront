<template>
	<view class="container">
		<view class="item" v-for="(item,index) in list" @click="godetail(item)" :key="index">
			<view class="head">
				<view class="hl">
					<image src="/static/logo.png" class="img1" mode=""></image>
					<view class="txt1">爱多学乐</view>
				</view>
				<view class="hr">{{item.createtime}}</view>
			</view>
			<view class="content">
				{{item.title}}
			</view>
			<view class="ib">
				<view class="txt2">查看详情</view>
				<image src="/static/rightimggray.png" class="img2" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		onShow() {
			this.getlist()
		},
		methods: {
			getlist() {
				this.http('/api/index/message').then(res => {
					this.list = res.data
				})
			},
			godetail(item) {
				uni.navigateTo({
					url: '/pages/messagedetail/messagedetail?item=' + encodeURIComponent(JSON.stringify(item))
				})
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
		padding: 30rpx;

		.item {
			box-sizing: border-box;
			width: 100%;
			padding: 20rpx;
			background-color: #ffffff;
			margin-bottom: 30rpx;
			border-radius: 20rpx 20rpx 20rpx 20rpx;

			.ib {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 22rpx;

				.txt2 {
					font-weight: 500;
					font-size: 26rpx;
					color: #666666;
				}

				.img2 {
					width: 26rpx;
					height: 26rpx;
				}
			}

			.content {
				font-weight: 500;
				font-size: 28rpx;
				color: #000000;
				padding-bottom: 22rpx;
				border-bottom: 1rpx solid #E7E7E7;
			}

			.head {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 22rpx;

				.hl {
					display: flex;
					align-items: center;

					.txt1 {
						font-weight: bold;
						font-size: 26rpx;
						color: #000000;
						padding-left: 16rpx;
					}

					.img1 {
						width: 56rpx;
						height: 56rpx;

					}
				}

				.hr {
					font-weight: 500;
					font-size: 26rpx;
					color: #666666;
				}
			}
		}
	}
</style>