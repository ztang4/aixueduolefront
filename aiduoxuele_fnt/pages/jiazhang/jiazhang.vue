<template>
	<view class="container">

		<image src="/static/jiazhangbgc.png" class="bgc" mode=""></image>
		<view class="nav" :style="{height:mpheight+'px',paddingTop:mptop + 'px'}">
			<uni-icons @click="goback" type="left" size="20"></uni-icons>
			<view style="font-weight: bold;
font-size: 36rpx;
color: #000000;">家长社区</view>
			<view style="width: 40rpx;"></view>
		</view>
		<view class="box">
			<image src="/static/codeimg.png" class="img2" mode=""></image>
			<view class="codebox">
				<image :show-menu-by-longpress="true" :src="baseImg + img " class="img3" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mpheight: this.mpheight,
				mptop: this.mptop,
				img: "",
				baseImg: this.baseImg
			};
		},
		onShow() {
			this.getpeizhi()
		},
		methods: {
			getpeizhi() {
				this.http('/api/index/systemConfig').then(res => {
					this.img = res.data.group_qrcode

				})
			},
			goback() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	.container {
		box-sizing: border-box;
		width: 100%;
		height: 100vh;

		.box {
			box-sizing: border-box;
			width: 690rpx;
			height: 760rpx;
			position: relative;
			margin: 0 auto;
			margin-top: 82rpx;

			.codebox {
				box-sizing: border-box;
				width: 492rpx;
				height: 470rpx;
				border: 20rpx solid #5764E2;
				border-radius: 42rpx 42rpx 42rpx 42rpx;
				position: absolute;
				top: 194rpx;
				left: 116rpx;
				text-align: center;
				padding-top: 8rpx;

				.img3 {
					width: 420rpx;
					height: 420rpx;
				}

			}


			.img2 {
				width: 100%;
				height: 100%;
			}
		}

		.nav {

			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;
			z-index: 99;
			top: 0;
			left: 0;
			padding: 0 20rpx;
		}

		.bgc {
			position: fixed;
			width: 100%;
			height: 100vh;
			top: 0;
			left: 0;
		}
	}
</style>