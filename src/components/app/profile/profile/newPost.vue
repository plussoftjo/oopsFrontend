<template>
	<div class="newPost">
		<v-container class="pb-1 pa-1 newPost">
			<div class="newPost pa-1 pb-3">
				<v-textarea
	          solo
	          name="input-7-4"
	          label="What In Your Mind ?"
	         v-model="content"
        ></v-textarea>
        	<div class="btnPO ml-1 " style="width: 100%;">
        		 <v-divider class="ml-2 mr-5"></v-divider>
		        		 <v-btn
		      :loading="loading3"
		      :disabled="loading3"
		      color="blue-grey"
		      class="white--text"
		      @click.native="() => {loader = 'loading3'; store()}"
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
	</div>
</template>
<script>
	export default {
		data() {
			return {
				content:'',
				loader: null,
				      loader: null,
        loading: false,
        loading2: false,
        loading3: false,
        loading4: false,
		sn:{snackbar:false,color:'success',timeout:3000,text:'',mode:''}

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
    		if(vm.content == '')
    		{
    			// DO SOME THING 
    		}else {
    			axios.post(vm.url + 'api/post/store',{content:vm.content}).then(response => {
    				vm.sn.snackbar = true;
			          vm.sn.color = 'blue darken-2';
			          vm.sn.text = 'You Post Has Publis'
			          vm.content = '';
			          vm.loader = null
    			}).catch(err => {
    			});
    		}
    	}
    },
    props:['url']
	}
</script>
<style>
	/*.btnPO{position: absolute; left:0px; bottom: 5px;}*/
	.newPost{border:1px solid #E0E0E0;}

	.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>