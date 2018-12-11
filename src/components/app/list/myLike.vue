<template>
	<div class="myPost">
		<tools :url="url" :main="true"></tools>

		 <postCard v-for="(post,index) in posts" :key="index" :url="url" :post="post">
         </postCard>
	<loaderWait v-if="loader"></loaderWait>
	</div>
</template>
<script>
	import tools from '@/components/Global/toolsNav/tools'
	import postCard from '@/components/Global/postCard'
	export default {
		components:{tools,postCard},
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
                     axios.get(vm.url + 'api/post/myLike').then(response => {
				vm.posts = response.data
				vm.loader = false;
			}).catch(err => {
				vm.loader = false;

			});
                    }else {
                        vm.$router.push({name:'stepthree'});
                    }
                }).catch(err => {
				vm.loader = false;
                    
                });
            }
			
			
		},
		props:['url'],
		data() {
			return {
				posts:[],
				loader:true
			}
		}
	}
</script>