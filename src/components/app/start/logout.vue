<template>
	<div class="logout">
		You are Logout ! 
	</div>
</template>
<script>
	export default {
		created() {
			const vm = this;
			localStorage.removeItem('tk');
		}
	}
</script>