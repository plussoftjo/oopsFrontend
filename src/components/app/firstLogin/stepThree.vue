<template>
      <v-container fill-height id="login">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
        <v-container class="pb-1 pa-1 newPost">
          <div class="title font-weight-black pa-3">
            Please Make Your First Post
          </div>
          <v-alert type="error" class="mb-2" :value="true" v-if="hasError">
            <span >
              {{errs}}
              <v-spacer></v-spacer>
            </span>
          </v-alert>
      <div class="newPost pa-1 pb-3">
        <v-textarea
            solo
            name="input-7-4"
            label="What In Your Mind ?"
           v-model="content"
        ></v-textarea>
          <div class="ml-1 pt-2" style="width: 100%;">
             <v-divider class="ml-2 mr-5"></v-divider>
                 <v-btn
          :loading="loading3"
          :disabled="loading3"
          color="blue-grey"
          class="white--text"
          @click.native="store"
        >
          Post
          <v-icon right dark>create</v-icon>
        </v-btn>
          </div>
          
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
    </v-container>

          </v-flex>
        </v-layout>
      </v-container>
</template>
<script>
  export default {
    props:['url'],
    created() {
      const vm = this;
      var token = localStorage.getItem('tk');
            if(!token) {
                vm.$router.push({name:'login'})
                
            }else {
                window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
               
            }

    },
    data() {
      return {
        content:'',
        loader: null,
              loader: null,
        loading: false,
        loading2: false,
        loading3: false,
        loading4: false,
        sn:{snackbar:false,color:'success',timeout:3000,text:'',mode:''},
        err:[],
        hasError:false
      }
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      }
    },
    methods:{
      store() {
        const vm = this;
        vm.loader=true;
        if(vm.content == '')
        {
          vm.errs = 'Please Add Some Content';
              vm.hasError = true;
              vm.loader=false;
        }else {
          axios.post(vm.url + 'api/post/first',{content:vm.content}).then(response => {
            vm.sn.snackbar = true;
                vm.sn.color = 'blue darken-2';
                vm.sn.text = 'You Make your First Post '
                vm.content = '';
                vm.loader = null
                setTimeout(function() {
                  vm.$router.push({name:'main'});
                }, 2000);
          }).catch(err => {
            vm.errs = 'There Are Problem in Network';
              vm.hasError = true;
              vm.loader=false;
          });
        }
      }
    },
  }
</script>
<style>
	#reg{background-size: 100%; overflow-y:hidden;}
	.avatarPic{display: flex; justify-content: center;}
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
</style>