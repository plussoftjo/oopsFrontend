<template>
      <v-container fill-height id="login">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
    
        <div class="bigIcon">
          <v-icon>tag_faces</v-icon>
          <v-spacer></v-spacer>
          <span class="BitMag">Thank You For Register .</span>
          <v-spacer></v-spacer>
          <span class="titlxe">Now please Make one Post to contnue </span>
        </div>
          

				<div class="loginBtnDisplay mt-3">
					<v-btn class="blue darken-1 loginBtn" dark large block @click="$router.push({name:'stepthree'})">Make First Post</v-btn>
				</div>
          </v-flex>
        </v-layout>
      </v-container>
</template>
<script>
  export default {
    data: () => ({
      drawer: null,

    }),
    props: {
      source: String,
      url: String
    },

  }
</script>
<style>
	#reg{background-size: 100%; overflow-y:hidden;}


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

  .bigIcon{width: 100%; text-align: center;}
  .bigIcon .BitMag{font-size: 20px; font-weight: 700; }
  .bitIcon .titlxe{font-size: 16px !important; font-weight: 500;}
  .bigIcon i {font-size: 98px !important;}
</style>