<template>
	<div class="addFriend">

		 <v-toolbar
		 tabs
		 >
        <v-btn icon @click="$router.go(-1)">
       	 <v-icon >keyboard_backspace</v-icon>
    	</v-btn>

      <v-toolbar-title>Add Friend</v-toolbar-title>

	      <v-spacer></v-spacer>
      </v-toolbar>
			<div class="search-and-add fullWidth mt-2">
                <v-layout row wrap>
                    <v-flex xs10>
                        <v-text-field
                        v-model="id"
                        label="USER ID"
                        solo
                      	
                        class="borderTextField "
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs2>
                        <v-btn style="margin-top: -3px;" fab class="blue darken-2"  icon @click="selectedUser">
                            <v-icon class="white--text font-weight-black">search</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </div>

			<div v-if="hasSearch">
				<v-list subheader v-if="selected">
          <v-list-tile
            avatar
            @click="$router.push({name:'profile',params:{id:selected.id}})"
          >
            <v-list-tile-avatar>
              <img :src="url + 'images/profile/orginal/' + selected.avatar">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-html="selected.name"></v-list-tile-title>
              <v-list-tile-title style="font-size: 12px;" v-html="selected.profile.location"></v-list-tile-title>
            </v-list-tile-content>
<!-- 
            <v-list-tile-action>
              <v-icon :color="item.active ? 'teal' : 'grey'">chat_bubble</v-icon>
            </v-list-tile-action> -->
          </v-list-tile>
         		<div class="shipCondition">
			<div v-if="shipType == 'NO_SHIP'">
				 <v-btn class="purple darken-3" dark large @click="add">
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
        </v-list>
			</div>

			
			<div v-else>
				<v-card>
					<v-card-title style="width:100%;">
						<div style="width: 100%;"> 
							<span class="font-weight-black title text-xs-center">
								No Search Result ...
							</span>
						</div>
					</v-card-title>
				</v-card>
			</div>			
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
	</div>
</template>
<script>
	export default {
		data() {
			return {
				user:{},
				id:'',
				selected:'',
				hasSearch:true,
				shipType:'',
				sn:{snackbar:false,color:'success',timeout:3000,text:'',mode:''},

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
                }).catch(err => {
                });
            }
		},
		methods:{
			add() {
				const vm = this;
				axios.get(vm.url + 'api/frindship/add/' + vm.id).then(response => {
					vm.shipType = 'PINDING_REQ_FROM_AUTH';

					vm.sn.snackbar = true;
			          vm.sn.color = 'success';
			          vm.sn.text = 'You Have Send Friend Request!'
				}).catch(err => {
				});
			},
			selectedUser() {
				const vm = this;
				axios.get(vm.url + 'api/user/see/' + vm.id).then(response => {
					vm.selected = response.data;
					if(response.data) {
						vm.hasSearch = true;
					}
					vm.checkState();
				}).catch(err => {
					vm.hasSearch = false;
				});
			},
			checkState() {
				const vm = this;
				axios.get(vm.url + 'api/frindship/checkState/' + vm.selected.id).then(response => {
					vm.shipType = response.data.msg;
				}).catch(err => {
				})
			},
			accept_frind()
			{
				const vm  = this;
				axios.get(vm.url + 'api/frindship/accept_friend/' + vm.selected.id).then(response => {
					vm.shipType = 'IS_FRINDS';
					vm.sn.snackbar = true;
			          vm.sn.color = 'success';
			          vm.sn.text = 'You Have Accept Friend Request!'
				}).catch(err => {
				})
			},
		},
		props:['url']
	}
</script>