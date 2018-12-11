<template>
      <v-container fill-height text-xs-center id="login">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
           	<!-- logo -->
				<div class="logoDisplay">
	           		<img src="@/assets/logo.png" width="100" height="100" alt="">
				</div>
				<div class="smallBorder"></div>
				<v-alert type="error" :value="true" v-if="hasError">
					<span>
						There Are problem In the Phone\Password
					</span>
				</v-alert>
				<div class="textField mt-3">
					<v-container>
					<v-text-field
		            label="Phone"
		            v-model="user.phone"
		            solo
		            class="borderTextField"
		          ></v-text-field>
		          <v-text-field
		            label="Password"
		            v-model="user.password"
		            solo
		            type="password"
		            class="borderTextField"
		          ></v-text-field>
					</v-container>

				</div>
				<div class="loginBtnDisplay">
					<v-btn class="blue darken-1 loginBtn" style="width:140px;" dark large @click="login">Login</v-btn>
					<v-btn class="blue darken-1 loginBtn" style="width:140px;" dark large @click="$router.push({name:'reg'})">Signup</v-btn>
				</div>
          </v-flex>
        </v-layout>
        <loaderWait v-if="loader"></loaderWait>
      </v-container>
</template>
<script>
  export default {
    data: () => ({
      drawer: null,
			user:{phone:'',password:''},
			hasError:false,
			loader:false
			
    }),
    props: {
      source: String,
      url: String
    },
    methods:{
    	login() {
    		const vm = this;
    		vm.loader = true;
    		axios.post(vm.url + 'api/user/login',vm.user).then(response => {
    				vm.loader = false;
					localStorage.setItem('tk', response.data.success.token);
					vm.$router.push({name:'main'})
    		}).catch(err => {
    			vm.hasError = true;
    			vm.loader = false;
    		});
    	}
    }
  }
</script>
<style>
	#login{background-size: 100%; background-size:100%; overflow-y:hidden;}
	.logoDisplay{display: flex; justify-content: center;}
	.borderTextField .v-input__control > .v-input__slot {border-radius: 30px;}
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
border-bottom-right-radius: 30px;}
	.stickyFooter{position: fixed; bottom:10px; left: 0px; width: 100%; text-align: center; font-weight: 700; font-size: 16px;}
.smallBorder{border-bottom:1px solid grey; opacity:0.3; }
.loginIcon{ padding-bottom:20px;}
</style>
