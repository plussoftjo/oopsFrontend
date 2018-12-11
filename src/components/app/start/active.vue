<template>
      <v-container fill-height id="login">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
           	<!-- logo -->
				<div class="logoDisplay">
	           		<img src="@/assets/logo.png" width="100" height="100" alt="">
				</div>
<!-- 				<div class="textField mt-3">
					<v-text-field
		            label="Phone"
		            v-model="phoneNum"
		            solo
		            class="borderTextField"
		          ></v-text-field>
				</div>
				<div class="loginBtnDisplay">
					<v-btn class="green darken-1 CBtn" dark large>Send Code</v-btn>

				</div> -->
			<!-- 	<div class="loginBtnDisplay">
					<span style="text-align: center;" class="blue--text darken-3">60:00</span>

				</div> -->

				
				<div class="activeBtn mt-5">
					<v-text-field
		            label="Code"
		            v-model="code"
		            solo
		            class="borderTextField"
		          ></v-text-field>
				</div>
					<div class="loginBtnDisplay">
					<v-btn class="blue darken-1 CBtn" dark large @click="$router.push({name:'main'})">Verify Code</v-btn>
				</div>

          </v-flex>
        </v-layout>
      </v-container>
</template>
<script>
  export default {
    data: () => ({
      drawer: null,
      user:{email:''}
    }),
    props: {
      source: String,
      url: String
    }
  }
</script>
<style>
	#login{background-size: 100%; background-image:url('https://wallpapertag.com/wallpaper/full/8/5/0/801924-cool-white-wallpaper-1920x1080-for-full-hd.jpg'); overflow-y:hidden;}

	.logoDisplay{display: flex; justify-content: center;}
	.borderTextField .v-input__control > .v-input__slot {border-radius: 30px;}

	.CBtn{border-radius: 7px; }
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

</style>