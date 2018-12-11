<template>
	<div class="myPost">
		<tools :url="url" :main="true"></tools>

		  <v-card class="grey lighten-5 mt-3" v-for="(comment,index) in comments">
           
            <div class="sender">
                <v-list class="pa-0 grey lighten-5" >
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                        <img :src="url + 'images/profile/orginal/' + comment.user.avatar">
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                        <v-list-tile-title class="text-xs-left font-weight-black">{{comment.user.name}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                <v-card-title class="pt-2 pb-2 ml-5 white lighten-5">
                    <div class="senderText font-weight-black" style="min-height: 40px;" @click="$router.push({name:'comment',params:{id:comment.id}})" >
                       {{comment.comment}}
                    </div>
                </v-card-title>
<!--                 <v-card-actions class="grey lighten-5">
                    <v-spacer></v-spacer>
                    <v-btn class="blue darken-3" dark>Replay</v-btn>
                </v-card-actions> -->
                
            </div>
         

         
           
        </v-card>
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
                     axios.get(vm.url + 'api/post/myCommentList').then(response => {
				vm.comments = response.data
				vm.loader = false;
			}).catch(err => {
				
                
			});
                    }else {
                        vm.$router.push({name:'stepthree'});
                    }
                }).catch(err => {
                   
                });
            }
			
			
		},
		props:['url'],
		data() {
			return {
				comments:[],
				loader:true
			}
		}
	}
</script>