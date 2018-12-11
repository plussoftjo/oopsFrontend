<template>
	<div class="comment" v-if="show">
		<tools :main="false"></tools>
			
		<commentLayout :url="url" :comment="comment"></commentLayout>
    <div class="commentLayout">
        <v-layout row wrap>
            <v-flex xs9 >
                <div class="commentTextFiled" style="padding-top:6px;">
                    <v-text-field
                        label="Replay"
                        v-model="replay"
                        id="id"
                        solo
                    ></v-text-field>

                </div>
            </v-flex>
            <v-flex xs3 class="pa-0 ma-0">
                <div class="btnLayout">
                <v-btn  block dark class="blue darken-3" style="height:48px;" @click="sendReplay"><v-icon dark >send</v-icon></v-btn>
                </div>
            </v-flex>
        </v-layout>
    </div>
    

    <div class="replays">
        <v-card class="grey lighten-5 mt-3" v-for="(r,index) in comment.replays">
           
            <div class="sender" >
                <v-list class="pa-0 grey lighten-5" >
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                        <img :src="url + 'images/profile/orginal/' + r.user.avatar" width="25px" height="25px">
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                        <v-list-tile-title class="text-xs-left font-weight-black">{{r.user.name}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                <v-card-title class="pt-2 pb-2 ml-5 white lighten-5">
                    <div class="senderText font-weight-black" style="min-height: 40px;">
                       {{r.replay}}
                    </div>
                </v-card-title>
                <v-card-actions class="grey lighten-5">
                    <v-spacer></v-spacer>
                </v-card-actions>
                
            </div>
         
           
        </v-card>
        
    </div>
<loaderWait v-if="loader"></loaderWait>

	</div>
</template>
<script>
import tools from '@/components/Global/toolsNav/tools'
import commentLayout from './comment/commentLayout'
	export default {
	 components:{tools,commentLayout},
	  created() {
            const vm = this;
              var token = localStorage.getItem('tk');
              if(!token) {
                vm.$router.push({name:'login'})
                
            }else {
                window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
               axios.get(vm.url + 'api/main/iam').then(response => {
                    vm.user = response.data;
                }).catch(err => {
                });

                vm.install();
            }

            
        },
        props:['url'],
        data() {
        	return {
        		comment:{},
                replay:'',
                loader:true,
                show:false
        	}
        },
        methods:{
            sendReplay() {
                const vm = this;
                vm.loader = true;
                axios.post(vm.url + 'api/replay/send/' + vm.$route.params.id,{replay:vm.replay}).then(response => {
                    vm.loader= false;
                    vm.install();
                }).catch(err => {
                });
            },
            install() {
                const vm = this;
                axios.get(vm.url + 'api/comment/show/' + vm.$route.params.id).then(response => {
                    vm.comment = response.data
                    vm.loader = false;
                    vm.show = true;
                }).catch(err => {
                })
            }
        }

	}
</script>