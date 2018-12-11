<template>
	<div class="friends">
		 <!-- ADDS TOOLS NAV -->
        <tools :url="url" :main="true"></tools>
        <div class="expolorBody fullWidth">
            
            <div class="search-and-add fullWidth mt-2">
                <v-layout row wrap>
                    <v-flex xs10>
                        <v-text-field
                        v-model="search"
                        label="Search"
                        solo
                        append-icon="search"
                        class="borderTextField "
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs2>
                        <v-btn fab class="blue" dark small icon>
                            <v-icon>add_box</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </div>
        </div>
        </v-card>

		  <v-card>
            <v-card-title primary-title>
                <div class="title">
                    Friends Post
                </div>
            </v-card-title>
            <v-card-title class="fullWidth pa-1">
                <div class="fullWidth">
                    <postCard v-for="(post,index) in posts" :key="index" :url="url" :post="post"></postCard>
                </div>
            </v-card-title>
        </v-card>
<!-- bottomNav -->
        <bottomNav bottomNav="frinds" :id="user.id"></bottomNav>
        <loaderWait v-if="loader"></loaderWait>
	</div>
</template>
<script>
	import tools from '@/components/Global/toolsNav/tools'
	import bottomNav from '@/components/Global/bottomNav'
	import postCard from '@/components/Global/postCard'

	export default {
		components:{tools,postCard,bottomNav,},
		props:['url'],
		methods:{
			install() {
				const vm = this;
				axios.get(vm.url + 'api/main/frindsPost').then(response => {
					vm.posts = response.data;
                    vm.loader = false;
				}).catch(err => {
				});
			}
		},
		created() {
			const vm = this
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
		data() {
			return {
				search:'',
				posts:[],
				user:{},
                loader:true
			}
		}
	}
</script>