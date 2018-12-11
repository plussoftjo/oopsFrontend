<template>
	<div class="search">
		 <!-- ADDS TOOLS NAV -->
<!--         <tools :url="url" :main="true"></tools>
        <div class="expolorBody fullWidth">
            
            <div class="search-and-add fullWidth mt-2">
                <v-layout row wrap>
                    <v-flex xs10>
                        <v-text-field
                        v-model="search"
                        label="Type Something ..."
                        solo
                      	
                        class="borderTextField "
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs2>
                        <v-btn style="margin-top: -3px;" fab class="grey lighten-1"  icon>
                            <v-icon class="white--text font-weight-black">search</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </div>
        </div> -->

          <div>
    <v-toolbar
      
      tabs
    >
        <v-btn icon>
        <v-icon @click="$router.go(-1)">keyboard_backspace</v-icon>
    </v-btn>

      <v-toolbar-title>Search</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-tabs
        slot="extension"
        v-model="tab"
        grow
      >
        <v-tabs-slider color="blue"></v-tabs-slider>

        <v-tab
          v-for="item in items"
          :key="item"
        >
          {{ item }}
        </v-tab>
      </v-tabs>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
      <div class="searchPost" v-if="item == 'Post'">
      	<div class="search-and-add fullWidth mt-2">
                <v-layout row wrap>
                    <v-flex xs10>
                        <v-text-field
                        v-model="search"
                        label="Type Something ..."
                        solo
                      	
                        class="borderTextField "
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs2>
                        <v-btn style="margin-top: -3px;" fab class="blue darken-2"  icon @click="searchPost">
                            <v-icon class="white--text font-weight-black">search</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </div>
            <postCard v-for="(post,index) in posts" :key="index" :url="url" :post="post"></postCard>
            <div v-if="posts.length < 1" style="font-size: 22px; font-weight: 700; text-align: center; padding: 10px;">
            	No Search Result
            </div>
      </div>

       <div class="searchPost" v-if="item == 'User'">
      	<div class="search-and-add fullWidth mt-2">
                <v-layout row wrap>
                    <v-flex xs10>
                        <v-text-field
                        v-model="search"
                        label="Type Something ..."
                        solo
                      	
                        class="borderTextField "
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs2>
                        <v-btn style="margin-top: -3px;" fab class="blue darken-2"  icon @click="searchUser">
                            <v-icon class="white--text font-weight-black">search</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </div>
			<userList :url="url" :users="users"></userList>
            <div v-if="users.length < 1" style="font-size: 22px; font-weight: 700; text-align: center; padding: 10px;">
            	No Search Result
            </div>
      </div>
      <div class="searchPost" v-if="item == 'Filter'">
      	<filterSearch :url="url" :user="user"></filterSearch>
      </div>
      </v-tab-item>
    </v-tabs-items>
  </div>
        <bottomNav bottomNav="frinds" :id="user.id"></bottomNav>
        <loaderWait v-if="loader"></loaderWait>
	</div>
</template>
<script>
	import tools from '@/components/Global/toolsNav/tools'
	import bottomNav from '@/components/Global/bottomNav'
	import postCard from '@/components/Global/postCard'
	import userList from './search/userList'
	import filterSearch from './search/filterSearch'

	export default {
		components:{tools,bottomNav,postCard,userList,filterSearch},
		props:['url'],
		methods:{
			searchPost() {
				const vm = this;
				axios.post(vm.url + 'api/search/post',{search:vm.search}).then(response => {
					vm.posts= response.data;
				}).catch(err => {
				});
			},
			searchUser() {
				const vm = this;
				axios.post(vm.url + 'api/search/user',{search:vm.search}).then(response => {
					vm.users = response.data;
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
            }

		},
		data() {
			return {
				search:'',
				user:{},
                loader:false,
                tab: null,
		        items: [
		          'Post', 'User', 'Filter'
		        ],
		        text: 'Lorem ipsu',
		        posts:[],
		        users:[]
			}
		},

	}
</script>