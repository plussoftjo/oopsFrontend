<template>
	<div class="notfy">
		<span>
			asdasdasd
		</span>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				items:[]
			}
		},
		created() {
			const vm = this;
			/////////THIS FOR ALL VUE FILE 
			var token = localStorage.getItem('tk');
			if(!token) {
				vm.$router.push({name:'login'})
			}else {
				window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
			}
			vm.install();
		},
		methods:{
			install() {
				const vm = this;
				axios.get(vm.url + 'api/notfy/index').then(response => {
				}).catch(err => {
				});
			}
		},
		props:['url']
	}
</script>