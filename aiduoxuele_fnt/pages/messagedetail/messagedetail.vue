<template>
	<view class="container">
		<!-- 	<view class="head">
			<image src="/static/logo.png" class="img1" mode=""></image>
			<view class="txt1">爱多学乐</view>
		</view> -->
		<view class="txt1">{{obj.title}}</view>
		<view class="time">{{obj.createtime}}</view>
		<view>
			<rich-text :nodes="formatRichText(obj.content)"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '下看你国庆',
				obj: {}
			};
		},
		onLoad(op) {
			if (op.item) {
				this.obj = JSON.parse(decodeURIComponent(op.item))
			}
		},
		methods: {
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
		background-color: #ffffff;
	}

	.container {
		box-sizing: border-box;
		padding: 28rpx;

		.txt1 {
			font-weight: bold;
			font-size: 30rpx;
			color: #222222;
		}

		.head {
			display: flex;
			align-items: center;
			font-weight: bold;
			font-size: 30rpx;
			color: #222222;

			.img1 {
				width: 56rpx;
				height: 56rpx;
			}
		}

		.time {
			font-weight: bold;
			font-size: 26rpx;
			color: #666666;
			margin: 16rpx 0 30rpx 0;
		}
	}
</style>