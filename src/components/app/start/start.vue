<template>
	<div class="start">
		<loaderWait></loaderWait>
	</div>
</template>
<script>
	export default {
		created() {
			const vm = this;
			var token = localStorage.getItem('tk');
            if(!token) {
                vm.$router.push({name:'login'})
                
            }else {
                window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
               axios.get(vm.url + 'api/main/iam').then(response => {
                    vm.user = response.data;
                    if(vm.user.active == true) {
                    	vm.$router.push({name:'main'});
                    }else {
                    	vm.$router.push({name:'stepthree'});
                    }
                }).catch(err => {
                    console.log(err)
                });
            }
		},
		data() {
			return {
				user:{}
			}
		},
        props:['url']
	}
</script>