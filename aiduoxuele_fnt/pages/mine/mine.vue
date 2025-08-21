<template>
	<view class="container">
		<image src="/static/minebgc.png" class="bgc" mode=""></image>
		<view class="nav" :style="{height:mpheight +'px',paddingTop:mptop+'px'}">
			爱多学乐
		</view>
		<view class="info" @click.stop="gouserinfo">
			<view class="l" v-if="Object.keys(info).length !=0">
				<image :src="baseImg + info.avatar" class="img1" mode=""></image>
				<view class="txt1">
					{{info.nickname}}
				</view>
			</view>
			<image @click.stop="gosetting" src="/static/settingimg.png" class="img2" mode=""></image>
		</view>

		<!-- 我的教师 -->
		<view class="teacher">
			<view style="display: flex;align-items: center;">
				<image src="/static/myteacher.png" style="width: 54rpx;height: 54rpx;margin-right: 14rpx;" mode="">
				</image>
				<view style="font-weight: bold;
font-size: 28rpx;
color: #222222;">我的老师</view>
			</view>

			<scroll-view scroll-x="true"
				style="width: 100%;white-space: nowrap;margin-top: 36rpx;box-sizing: border-box;">
				<view class="item" v-for="(item,index) in info.teacher" :key="index">
					<image :src="baseImg+item.profile_image" class="img2" mode=""></image>
					<view class="txt2">{{item.nickname}}</view>
				</view>
			</scroll-view>
		</view>

		<!-- 我的班级 -->
		<view class="myclass">
			<view class="item2" v-for="(item,index) in info.group_str" :key="index">
				<view class="head">
					<image src="/static/myclass.png" class="img3" mode=""></image>
					<view class="txt3">我的班级</view>
				</view>
				<view class="txt4">{{item}}</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				mphieght: this.mphieght,
				mptop: this.mptop + 2,
				info: {},
				baseImg: this.baseImg
			}
		},
		onShow() {
			this.getuserinfo()
		},
		methods: {
			getuserinfo() {
				this.http('/api/user/userinfo').then(res => {
					this.info = res.data
				})
			},
			gosetting() {
				uni.navigateTo({
					url: '/pages/setting/setting'
				})
			},
			gouserinfo() {
				uni.navigateTo({
					url: '/pages/userinfo/userinfo'
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

		.bgc {
			position: absolute;
			width: 100%;
			height: 722rpx;
			top: 0;
			left: 0;
		}

		.nav {
			box-sizing: border-box;
			font-weight: bold;
			font-size: 36rpx;
			color: #000000;
			text-align: center;
			position: relative;
			top: 0;
			left: 0;
			z-index: 99;
		}

		.info {
			box-sizing: border-box;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 34rpx 0 58rpx;
			position: relative;
			z-index: 99;
			top: 50rpx;

			.l {
				display: flex;
				align-items: center;

				.img1 {
					width: 124rpx;
					height: 124rpx;
					border-radius: 70rpx 70rpx 70rpx 70rpx;
					margin-right: 32rpx;
				}

				.txt1 {
					font-weight: bold;
					font-size: 32rpx;
					color: #222222;
				}
			}

			.img2 {
				width: 48rpx;
				height: 48rpx;
			}
		}

		.teacher {
			box-sizing: border-box;
			width: 690rpx;
			height: 376rpx;
			background: #FFFFFF;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			margin: 0 auto;
			position: relative;
			z-index: 99;
			top: 70rpx;
			padding: 30rpx 20rpx;

			.item {
				display: inline-block;
				box-sizing: border-box;
				width: 186rpx;
				height: 200rpx;
				padding-top: 18rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 0rpx 4rpx 2rpx rgba(0, 0, 0, 0.16);
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				margin: 10rpx 0;
				margin-right: 35rpx;
				margin-left: 5rpx;
				text-align: center;


				.img2 {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50rpx 50rpx 50rpx 50rpx;
				}

				.txt2 {
					font-weight: 500;
					font-size: 28rpx;
					color: #222222;
					margin-top: 20rpx;
					max-width: 186rpx;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
			}
		}

		.myclass {
			box-sizing: border-box;
			padding: 24rpx 30rpx;
			margin-top: 80rpx;

			.item2 {
				box-sizing: border-box;
				width: 100%;
				padding: 30rpx 20rpx;
				background-color: #ffffff;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				margin-bottom: 30rpx;

				.head {
					display: flex;
					align-items: center;
					margin-bottom: 38rpx;

					.img3 {
						width: 54rpx;
						height: 54rpx;
						margin-right: 14rpx;
					}

					.txt3 {
						font-weight: bold;
						font-size: 28rpx;
						color: #222222;
					}
				}

				.txt4 {
					font-weight: bold;
					font-size: 30rpx;
					color: #222222;
				}
			}
		}
	}
</style>