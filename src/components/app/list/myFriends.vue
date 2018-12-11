<template>
	<div class="myFriends">
		<tools :url="url" :main="true"></tools>

	<v-list subheader>
          <v-list-tile
            v-for="item in users"
            :key="item.id"
            avatar
            @click="$router.push({name:'profile',params:{id:item.id}})"
          >
            <v-list-tile-avatar>
              <img :src="url + 'images/profile/orginal/' + item.avatar">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-html="item.name"></v-list-tile-title>
              <v-list-tile-title style="font-size: 12px;" v-html="item.profile.location"></v-list-tile-title>
            </v-list-tile-content>
<!-- 
            <v-list-tile-action>
              <v-icon :color="item.active ? 'teal' : 'grey'">chat_bubble</v-icon>
            </v-list-tile-action> -->
          </v-list-tile>
        </v-list>






		<loaderWait v-if="loader"></loaderWait>
	</div>
</template>
<script>
	import tools from '@/components/Global/toolsNav/tools'
	export default {
		components:{tools},
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
             axios.get(vm.url + 'api/post/MyFriends').then(response => {
				vm.users = response.data
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
				users:[],
				loader:true
			}
		}
	}
</script>