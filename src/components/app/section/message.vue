<template>
	<div class="message">
		<v-card class="blue darken-2">
			<v-toolbar
			class="transparent"
			>
				<v-btn icon @click="$router.go(-1)"><v-icon class="white--text">keyboard_backspace</v-icon></v-btn>	
			</v-toolbar>
			<v-card-title style="width: 100%;">
				<div style="width: 100%;" class="font-weight-black title white--text text-xs-center">
					Chat with Admin
				</div>
			</v-card-title>
		</v-card>
		<v-card class=" blue darken-2">
			<v-layout row wrap>
				<v-flex xs8>
					<v-text-field
					label="Message ..."
					v-model="message"
					solo
					class="mign"></v-text-field>
				</v-flex>
				<v-flex xs4>
					<v-btn class="blue darken-2 mb-0 mt-0" style="height: 48px;" dark block @click="store">
						 Send <v-icon>send</v-icon>
					</v-btn>
				</v-flex>
			</v-layout>
		</v-card>
		<div class="pb-5 mb-1 cxxc">
			<div v-for="message in messages" >
				<listTile :user="user.id"  :message="message" :url="url"></listTile>
			</div>
		</div>
		
		
	</div>
</template>
<script>
	import listTile from './message/listTile'
	export default {
		components:{listTile},
		data() {
			return {
				message:'',
				messages:[],
				user:{},
				show:false
			}
		},
		methods:{
			install() {
				const vm = this;
				axios.get(vm.url + 'api/message/index').then(response => {
					vm.messages = response.data;
				}).catch(err => {
				});
			},
			store() {
				const vm = this;
				axios.post(vm.url + 'api/message/store',{message:vm.message}).then(response => {
					vm.message = '';
					vm.install()
				}).catch(err => {
				});
			}
		},
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
                        vm.install();
                        vm.show = true;
                    }else {
                        vm.$router.push({name:'stepthree'});
                    }
                }).catch(err => {
                });



              	
            }
		},
		props:['url']
	}
</script>
<style>
	.send_sheet{position: fixed; bottom: 0px; left: 0px; width: 100%;}
	.mign .v-input__slot{margin-bottom: 0px;}
	
</style>