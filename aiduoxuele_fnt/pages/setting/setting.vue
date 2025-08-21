<template>
	<view class="container">
		<view class="box">
			<view class="item" @click="goxieyi(2)" style="border-bottom: 1rpx solid #E7E7E7;">
				<view>隐私政策</view>
				<uni-icons type="right" size="18"></uni-icons>
			</view>
			<view class="item" @click="goaboutus">
				<view>关于我们</view>
				<uni-icons type="right" size="18"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			goaboutus() {
				uni.navigateTo({
					url: '/pages/aboutus/aboutus'
				})
			},
			goxieyi(num) {

				uni.navigateTo({
					url: '/pages/xieyi/xieyi?num=' + num
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

		.box {
			box-sizing: border-box;
			width: 690rpx;
			height: 240rpx;
			background: #FFFFFF;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			margin: 48rpx auto;

			.item {
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 40rpx;
				font-weight: 500;
				font-size: 28rpx;
				color: #222222;
			}
		}
	}
</style>