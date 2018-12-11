<template>
  <v-card flat v-if="show">
  	<v-img
  	:src="cloud"
  	height="400px" lazy>
	  	<v-toolbar
	      color="transparent"
	      flat
	    >
		     <v-btn icon class="primary" @click="$router.go(-1)">
		        <v-icon >keyboard_backspace</v-icon>
		    </v-btn>
	    </v-toolbar>

	    <div class="profileDetails">
	    	<img v-if="userx.avatar" :src="url + 'images/profile/orginal/'+ userx.avatar" height="120px" width="120px" alt="">
	    	
	    </div
	      >
		<div class="headline font-weight-black
 text-xs-center pt-2 white--text" style="width: 100%;">
	    		{{userx.name}}
	    	</div>
	    	<div class="font-weight-bold white--text pt-1 text-xs-center" style="width: 100%;" v-if="profile.about">
	    		{{profile.about}}
	    	</div>
	    	<div class="loaction">
				<div>
					<v-icon style="color:#e9e9e9;">perm_identity</v-icon> ID:{{profile.id}}
				</div>
	    		<div>
		    		<v-icon style="color:#E0E0E0;">my_location</v-icon> {{profile.location}}
		    	</div>
		    	<div v-if="shipType == 'IS_FRINDS'">
		    		<div v-if="profile.wechat_id">WeChat: {{profile.wechat_id}}</div>
	    			<div v-if="profile.whatsapp_id">Whatsapp: {{profile.whatsapp_id}}</div>
		    	</div>
		    	<div v-if="owner">
		    		<div v-if="profile.wechat_id">WeChat: {{profile.wechat_id}}</div>
	    			<div v-if="profile.whatsapp_id">Whatsapp: {{profile.whatsapp_id}}</div>
		    	</div>
	    		
	    	</div>
	    	<div class="editIcon" v-if="owner">
				<setting :profile="profile" :user="userx" :url="url"></setting>
	    	</div>

  	</v-img>

    <v-container text-xs-center justify-center>
    	<div v-if="!owner">
    	 
		<!-- RELATIONSHIP COPNDITION -->
		<div class="shipCondition">
			<div v-if="shipType == 'NO_SHIP'">
				 <v-btn class="purple darken-3" dark large @click="add_frind">
		    		Add Friend
		    	</v-btn>
			</div>
			<div v-if="shipType == 'PINDING_REQ_FROM_AUTH'">
				<v-card>
					<v-card-title style="width: 100%; text-align: center;">
						You Have Sent Friend Rquest
					</v-card-title>
				</v-card>
			</div>
			<div v-if="shipType == 'GET_REQUEST_FROM_USER'">
				<v-btn class="success darken-3" dark @click="accept_frind">
					Accept Friend
				</v-btn>
			</div>
			<div v-if="shipType == 'IS_FRINDS'">
				<v-btn class="primary">
					Friends
				</v-btn>
			</div>
		</div>
    		
    	</div>
 
  
    </v-container>
<v-card class="ml-1 mr-1" v-if="owner">
            <newPost :url="url" :user="userx"></newPost>
        </v-card>
	<v-card class="pl-3 pr-3">
		<postCard v-for="post in posts" :post="post" :url="url"></postCard>
		<div v-if="posts.length < 1" class="title">
			<v-card class="mt-4">
				<v-card-title>
					<div style="width:100%;" class="title font-weight-black text-xs-center">
						No Post Here !
					</div>
				</v-card-title>
			</v-card>
		</div>
	</v-card>
	<!-- SETTING DIALOG -->
	<!-- <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
	</v-dialog> -->
    <v-snackbar
      v-model="sn.snackbar"
      :color="sn.color"
      :timeout="sn.timeout"
      :vertical="sn.mode === 'vertical'"
    >
      {{ sn.text }}
      <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
   <bottomNav :bottomNav="'profile'" :id="userx.id" v-if="owner"></bottomNav>
   <bottomNav :bottomNav="'frinds'" :id="userx.id" v-else></bottomNav>

   <loaderWait v-if="loader"></loaderWait>
  </v-card>
</template>
<script>
	import postCard from '@/components/Global/postCard'
	import newPost from '@/components/app/section/main/newPost';
	import bottomNav from '@/components/Global/bottomNav'
	import setting from './profile/setting'
	export default {
		data() {
			return {
		man:require('@/assets/pt.jpg'),
		profile:{},
		user:{},
		cloud:require('@/assets/cloud.jpg'),
		owner:false,
		dialog:false,
		shipType:'',
		sn:{snackbar:false,color:'success',timeout:3000,text:'',mode:''},
		posts:[],
		user:{},
		loader:true,
		show:true,
		userx:{}

			}
		},
		components:{postCard,setting,newPost,bottomNav},
		created() {
			const vm = this;
			/////////THIS FOR ALL VUE FILE 
			var token = localStorage.getItem('tk');
			if(!token) {
				vm.$router.push({name:'login'})
			}else {
				window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
				 axios.get(vm.url + 'api/main/iam').then(response => {
                    vm.user = response.data;
                    vm.installProfile()
                }).catch(err => {
                });
			}
			
		},
		methods:{
			installProfile() {
				const vm = this;

				axios.get(vm.url + 'api/user/show/' + vm.$route.params.id).then(response => {
					vm.userx = response.data.user;
					vm.profile = response.data.profile;
					vm.owner = response.data.owner;

					// CHECK IF HAS PINDING REQUEST
					if(!vm.owner)
					{
						vm.checkState();
					}

					vm.getPost();
					vm.loader = false;
					vm.show = true;
				}).catch(err => {
				});
			},
			add_frind() {
				const vm = this;
				axios.get(vm.url + 'api/frindship/add/' + vm.$route.params.id).then(response => {
					vm.shipType = 'PINDING_REQ_FROM_AUTH';

					vm.sn.snackbar = true;
			          vm.sn.color = 'success';
			          vm.sn.text = 'You Have Send Friend Request!'
			          setTimeout(function() {
			            
			          }, 2000);
				}).catch(err => {
				});
			},
			checkState() {
				const vm = this;
				axios.get(vm.url + 'api/frindship/checkState/' + vm.$route.params.id).then(response => {
					vm.shipType = response.data.msg;
				}).catch(err => {
				})
			},
			accept_frind()
			{
				const vm  = this;
				axios.get(vm.url + 'api/frindship/accept_friend/' + vm.$route.params.id).then(response => {
					vm.shipType = 'IS_FRINDS';
					vm.sn.snackbar = true;
			          vm.sn.color = 'success';
			          vm.sn.text = 'You Have Accept Friend Request!'
				}).catch(err => {
				})
			},
			getPost() {
				const vm = this;
				axios.get(vm.url + 'api/post/show/' + vm.$route.params.id).then(response => {
					vm.posts =response.data;
				}).catch(err => {
				});
			}
		},
		props:['url']
	}
</script>
<style scoped>
	.card--flex-toolbar {
    margin-top: -64px;
  }
  .sect { display: flex; justify-content: center; }
  .sect div { flex-shrink: 1; text-align: center; }
  .ds{display: flex; justify-content: center;}
  .borderBtn{border-radius: 30px;}

  .profileDetails {display: flex; justify-content: center;}
  .profileDetails img { border-radius: 50%; border:2px solid white; }

  .loaction{position: absolute; left: 0px; bottom: 0px; padding: 5px 8px; color: #E0E0E0; font-weight: 600; background-color: rgba(0,0,0,0.3);}
  .editIcon{position: absolute;top: 3px; right: 3px;  }
  .editIcon i {font-size: 22px; font-weight: 700; color:#E0E0E0;}
</style>