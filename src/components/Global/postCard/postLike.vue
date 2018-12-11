<template>
	<div class="postLike">
		<img :src="url + 'images/profile/orginal/' + like.user.avatar" height="25px" width="25px" class="borderImage ml-1"  alt="">
	</div>
</template>
<script>
	export default {
		props:['url','like'],
		created() {
		}
	}
</script>
<style>
	.postLike { display: inline-block; }
	.postLike img{display: inline-block;}
</style>