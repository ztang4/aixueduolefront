<template>
	<view class="container" v-if="Object.keys(obj2).length !=0">

		<!-- 数据 -->
		<view class="box">
			<view class="item2">
				<view class="head">
					<image :src="baseImg + obj2.user.avatar" class="avatar" mode="">
					</image>
					<view class="hr">
						<view class="name">{{obj2.user.nickname}}</view>
						<view class="time">{{obj2.create_time_text}}</view>
					</view>
				</view>
				<view class="content">
					{{obj2.title}}
				</view>
				<!-- 富文本 -->
				<!-- <rich-text :nodes="formatRichText(content)"></rich-text> -->
				<!-- 	<mp-html :content="obj.info" /> -->
				<view class="content2">{{obj2.info}}</view>
				<!-- 图片/视频 -->
				<image v-if="obj2.type == 0" :src="baseImg + obj2.image" class="sucai" mode="">
				</image>
				<!-- :enable-play-gesture='false' :show-center-play-btn='false' :show-fullscreen-btn='false' :show-play-btn='false' -->
				<video v-else :src="baseImg + obj2.video" class="sucai2"></video>
			</view>
		</view>
		<!-- 评论 -->
		<view class="plbox" v-if="Object.keys(obj2).length != 0">
			<view class="title">共{{obj2.comment.length}}条评论</view>
			<view class="a" v-for="(item,index) in obj2.comment" :key="index">
				<image :src="baseImg + item.user_info.avatar" style="width: 52rpx;height: 52rpx;border-radius: 50%;"
					mode=""></image>
				<view class="ar">
					<view class="name">
						{{item.user_info.nickname}}
					</view>
					<view class="common">
						{{item.content}}
					</view>
					<view class="time">
						{{item.create_time_text}}
					</view>
				</view>
			</view>
		</view>
		<!-- 底部 -->
		<view class="bbox">
			<view class="l">
				<image src="/static/pushpl.png" style="width:36rpx;height:36rpx;margin-right: 14rpx;" mode=""></image>
				<input type="text" v-model="content" @blur="send" class="ipt" placeholder="说点什么..."
					placeholder-class="default" />
			</view>
			<view class="r">
				<view class="zan" @click="dianzanFn">
					<image v-if="obj2.is_like == 0 " src="/static/zan.png"
						style="width: 36rpx;height: 36rpx;margin-right: 8rpx;" mode="">
					</image>
					<image v-else src="/static/zanact.png" style="width: 36rpx;height: 36rpx;margin-right: 8rpx;"
						mode=""></image>
					<view>{{obj2.like_count}}</view>
				</view>
				<view class="pl">
					<image src="/static/pinglun.png" style="width: 36rpx;height: 36rpx;margin-right: 8rpx;" mode="">
					</image>
					<view>{{obj2.comment.length}}</view>
				</view>
				<view class="pl"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: "",
				id: "",
				obj: {},
				list: [],
				baseImg: this.baseImg,
				obj2: {}
			}
		},
		onLoad(op) {
			if (op.id) {
				this.id = op.id
			}
			// if (op.data) {
			// 	this.obj = JSON.parse(decodeURIComponent(op.data))
			// }
		},
		onShow() {
			this.getdetail()
		},
		//1.发送给朋友
		onShareAppMessage() {
			return {

				path: '/pages/commondetail/commondetail?id=' + this.id
			}
		},
		//2.分享到朋友圈
		onShareTimeline() {
			return {

				path: '/pages/commondetail/commondetail?id=' + this.id
			}
		},
		methods: {
			dianzanFn() {
				this.http('/api/index/like', {
					updates_id: this.id
				}).then(res => {
					this.getdetail()
				})
			},
			send() {
				if (this.content.trim() == '') {
					return uni.showToast({
						title: '发送的内容不能为空',
						icon: "none"
					})
				}
				this.http('/api/index/comment', {
					content: this.content,
					updates_id: this.id
				}).then(res => {
					uni.showToast({
						title: res.msg,
						icon: "none"
					})
					if (res.code == 1) {
						this.content = ''
						this.getdetail()
					}
				})
			},
			getdetail() {
				uni.showLoading()
				this.http('/api/index/updatesInfo', {
					id: this.id
				}).then(res => {
					uni.hideLoading()
					this.obj2 = res.data
				})
			},
			formatRichText(html) {
				let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
					match = match.replace(/style="[^"]*"/gi, '').replace(/style='[^']+'/gi, '');
					match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
					match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
					return match;
				});
				newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
					match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi,
						'max-width:100%;');
					return match;
				});
				newContent = newContent.replace(/<br[^>]*\/>/gi, '');
				newContent = newContent.replace(/\<img/gi,
					'<img style="max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"');
				return newContent;
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



		.plbox {
			box-sizing: border-box;
			width: 100%;
			background-color: #ffffff;
			padding: 32rpx;
			padding-bottom: 50rpx;

			.title {
				font-weight: bold;
				font-size: 30rpx;
				color: #000000;
				margin-bottom: 14rpx;
			}

			.a {
				display: flex;
				margin-bottom: 42rpx;

				.ar {
					box-sizing: border-box;
					padding-left: 12rpx;
					flex: 1;

					.name {
						font-weight: 500;
						font-size: 28rpx;
						color: #666666;
					}

					.common {
						font-weight: 500;
						font-size: 28rpx;
						color: #000000;
						margin: 4rpx 0 8rpx 0;
					}

					.time {
						font-weight: 500;
						font-size: 24rpx;
						color: #8F8F8F;
					}
				}
			}
		}

		.bbox {
			box-sizing: border-box;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			background-color: #ffffff;
			padding: 24rpx 32rpx;
			padding-bottom: env(safe-area-inset-bottom);
			display: flex;
			align-items: center;

			.l {
				box-sizing: border-box;
				display: flex;
				align-items: center;
				width: 448rpx;
				height: 70rpx;
				background: #F2F2F2;
				border-radius: 36rpx 36rpx 36rpx 36rpx;
				padding: 0 22rpx;
				font-size: 26rpx;
				color: #000000;

				.default {
					font-weight: 500;
					font-size: 26rpx;
					color: #666666;
				}
			}

			.r {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: space-evenly;

				.zan {
					display: flex;
					align-items: center;
					font-weight: 500;
					font-size: 26rpx;
					color: #222222;
				}

				.pl {
					display: flex;
					align-items: center;
					font-weight: 500;
					font-size: 26rpx;
					color: #222222;
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

				.sucai {
					width: 100%;
					height: 420rpx;
					border-radius: 20rpx;
					margin-bottom: 24rpx;
				}

				.sucai2 {
					width: 100%;
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

				.content2 {
					font-weight: 500;
					font-size: 26rpx;
					color: #222222;
					margin-bottom: 20rpx;
				}
			}
		}
	}
</style>