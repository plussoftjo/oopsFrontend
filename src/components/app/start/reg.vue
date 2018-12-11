<template>
      <v-container fill-height id="login">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
           	<!-- Image -->
           	<div class="AV mb-3">
			<img :src="avatarPic" alt="" width="100" height="100"/>
			<div class="addBtn">
				<v-btn fab small dark color="indigo" @click="makeTheImg">
					<v-icon dark>add</v-icon>
			</v-btn>
			</div>
           	</div>

           	 <v-alert
			      :value="true"
			      type="error"
			      v-if="hasError"
			    >
			      <span v-for="err in errors" v-if="justone">
			      	{{err[0]}}
			      	<br>
			      </span>
			      <span v-else>
			      	There Are Problem in network
			      </span>
			    </v-alert>
					
				<div class="textField mt-3">
					<v-text-field
		            label="UserName"
		            v-model="user.name"
		            solo
		            class="borderTextField"
		          ></v-text-field>
					<v-text-field
		            label="Phone Number"
		            v-model="user.phone"
		            solo
		            class="borderTextField"
		          ></v-text-field>
		          <v-text-field
		            label="Email"
		            v-model="user.email"
		            solo
		            class="borderTextField"
		          ></v-text-field>
                  <v-layout row wrap>
                      <v-flex xs12 class="pr-1">
                        <v-text-field
                        label="Password"
                        v-model="user.password"
                        solo
                        type="password"
                        class="borderTextField"
                        ></v-text-field>
                      </v-flex>
                  </v-layout>
		          
		          
				</div>
				<div class="loginBtnDisplay">
					<v-btn class="blue darken-1 loginBtn" dark large block @click="store">Next</v-btn>
				</div>

				<div class="stickyFooter">
					Have Account ? <span class="blue--text darken-1" @click="$router.push({name:'login'})">Sign in</span>
				</div>
          </v-flex>
        </v-layout>
        <loaderWait v-if="loader"></loaderWait>


	 <v-dialog v-model="dialog">
        <v-card>
          <v-card-title>
          <input type="file" v-on:change="onFileChange" class="form-control">
          </v-card-title>
          <v-card-actions>
            <v-container grid-list-md>
              
            <v-layout row wrap>
              <v-flex xs6>
              <v-btn class="primary" dark block @click="upload"> 
              upload
               </v-btn>
              </v-flex>
              <v-flex xs6>
                 <v-btn block @click="dialog = !dialog">
              close
            </v-btn>
              </v-flex>
            </v-layout>
            </v-container>
          </v-card-actions>
        </v-card>   
      </v-dialog>
		

		<v-snackbar
		:top="true"
		:timeout="5000"
		v-model="sn.model"
		:color="sn.color"
		:multi-line="sn.multiLine"
		>
			<span v-if="!sn.multiLine"><i>{{sn.text}}</i></span>
			<span v-else><i v-for="t in sn.errors" :key="t">
				{{t[0]}}
			</i></span>

		</v-snackbar>

      </v-container>
</template>
<script>
  export default {
    data: () => ({
      drawer: null,
      user:{phone:'',password:'',name:'',image:'',email:''},
			avatarPic:require('@/assets/avatar.png'),
			errors:[],
			hasError:false,
			loader:false,
			dialog:false,
			image:'',
			sn:{color:'',text:'',model:false,multiLine:false,errors:[]},
			justone:false
    }),
		props:['url'],
		methods:{
			store() {
				const vm = this;
				vm.loader = true;
				axios.post(vm.url + 'api/user/create',vm.user).then(response => {
					vm.loader = false;
					localStorage.setItem('tk', response.data.success.token);
					vm.$router.push({name:'stepOne'});
				}).catch(err => {
					
					if(!err.response.data.error)
					{
						vm.errors = [{errors:'There Are Problem in Network'}]
						vm.hasError = true;
						vm.loader = false
						vm.justone = false;
					}else {
						vm.errors =err.response.data.error;
						vm.hasError = true;
						vm.loader = false
						vm.justone = true;
					}
					
				});
			},
			uploadImage(e) {
				const vm = this

				vm.onFileChange(e);
				/////////////
				/// TEST IN WEB UPLOAD
				//////

				///////// Change Here To Make To the App Plugin 



			},
			onFileChange(e) {
		        let files = e.target.files || e.dataTransfer.files;
		         if (!files.length)
		            return;
		        this.createImage(files[0]);
		      },
		      createImage(file) {
		         let reader = new FileReader();
		          let vm = this;
		          reader.onload = (e) => {
		              vm.image = e.target.result;
		          };
		          reader.readAsDataURL(file);
		      },
		      upload(img) {
		      	const vm = this;
		      	axios.post(vm.url + 'api/user/uploadImage',{image:img}).then(response =>{
		      		vm.sn.multiLine = false;
		      		vm.sn.model = true;
		      		vm.sn.color = 'success';
		      		vm.sn.text = "Upload Image Success "
		      		vm.user.image = response.data.image
		      		vm.avatarPic = vm.url + 'images/profile/orginal/' + vm.user.image;
		      		vm.dialog = false;
		      	}).catch(err => {
		      		if(err.response.data.errors)
		      		{
		      			console.log(0)
		      			vm.sn.multiLine = true;
		      			vm.sn.model = true;
		      		vm.sn.color = 'red';
		      		vm.sn.text = err.response.data.errors
		      		
		      		vm.sn.errors = err.response.data.errors
		      		}
		      		else{
		      			vm.sn.multiLine = false;
		      			vm.sn.model = true;
		      		vm.sn.color = 'red';
		      		vm.sn.text ='There Are Problem In Netowrk'
		      		}
		      		
		      	});
		      },
		      makeTheImg() {
		      	const vm = this;

		      	navigator.camera.getPicture(onSuccess, onFail, { quality: 100,
			          destinationType: Camera.DestinationType.DATA_URL,
			          sourceType: Camera.PictureSourceType.PHOTOLIBRARY
			       });

		     function onSuccess(imageURL) {
	          vm.avatarPic = "data:image/jpeg;base64," + imageURL;
	          var finalImage = "data:image/jpeg;base64," + imageURL;
	         vm.upload(finalImage);

      			 } // End Make The Img 

      			 function onFail(message) {
		          vm.sn.multiLine = false;
		      			vm.sn.model = true;
		      		vm.sn.color = 'red';
		      		vm.sn.text ='Error:' + message;
		       }

		      }
		}
    
  }
</script>
<style>
	#reg{background-size: 100%; overflow-y:hidden;}

	.avatarPic{display: flex; justify-content: center;}
	.borderTextField .v-input__control > .v-input__slot {border-radius: 30px;}
	.genderBtn{display: flex; justify-content: center;}

	.loginBtnDisplay{display: flex; justify-content: center;}

	.loginBtn{-webkit-border-top-right-radius: 30px;
	-webkit-border-bottom-left-radius: 30px;
	-moz-border-radius-topright: 30px;
	-moz-border-radius-bottomleft: 30px;
	border-top-right-radius: 30px;
	border-bottom-left-radius: 30px;}

	.signupBtn{
	-webkit-border-top-left-radius: 30px;
	-webkit-border-bottom-right-radius: 30px;
	-moz-border-radius-topleft: 30px;
	-moz-border-radius-bottomright: 30px;
	border-top-left-radius: 30px;
	border-bottom-right-radius: 30px;
	}

	.stickyFooter{position: fixed; bottom:10px; left: 0px; width: 100%; text-align: center; font-weight: 700; font-size: 16px;}

	.AV{position: relative; display: flex; justify-content: center;}
	.addBtn{position: absolute; top: -10px; right: 25%;}
</style>