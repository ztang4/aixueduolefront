<template>
	<view class="container">
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: ""
			}
		},
		onLoad() {
			// uni.hideTabBar()
			this.geturl()
		},
		methods: {
			geturl() {
				this.http('/api/index/systemConfig').then(res => {
					this.url = res.data.parties_link
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #F8F8F8;
	}

	.container {
		box-sizing: border-box;
	}
</style>