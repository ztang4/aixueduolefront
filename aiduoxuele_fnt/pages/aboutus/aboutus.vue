<template>
	<view class="container">
		<view class="box">
			<image src="/static/logo.png" class="img1" mode=""></image>
			<view class="txt1">爱学多乐</view>
		</view>
		<view class="txt2">
			<rich-text :nodes="formatRichText(content)"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: ""
			};
		},
		onShow() {
			this.getpeizhi()
		},
		methods: {
			getpeizhi() {
				this.http('/api/index/systemConfig').then(res => {
					this.content = res.data.about_us
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
	.container {
		box-sizing: border-box;

		.txt2 {
			box-sizing: border-box;
			margin-top: 74rpx;
			padding: 0 40rpx;
		}

		.box {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			margin: 0 auto;
			margin-top: 50rpx;

			.img1 {
				width: 296rpx;
				height: 296rpx;
			}

			.txt1 {
				font-weight: bold;
				font-size: 42rpx;
				color: #000000;
			}
		}
	}
</style>