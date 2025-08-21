<template>
	<view class="container">
		<rich-text :nodes="content"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: "",
				num: ""
			};
		},
		onLoad(op) {
			if (op.num) {
				this.num = op.num

			}
		},
		onShow() {
			this.getpeizhi()
		},
		methods: {
			getpeizhi() {
				this.http('/api/index/systemConfig').then(res => {
					if (this.num == 1) {
						this.content = res.data.user_agreement
						uni.setNavigationBarTitle({
							title: '用户协议'
						})
					}
					if (this.num == 2) {
						this.content = res.data.privacy_agreement
						uni.setNavigationBarTitle({
							title: '隐私协议'
						})
					}
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
		padding: 30rpx;
	}
</style>