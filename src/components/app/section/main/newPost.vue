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
        	<div class="btnPO ml-0" style="width: 100%;">
            <div class="image">
            <div v-if="images.length == 0">
             <v-btn small @click="makeTheImg"><v-icon>perm_media</v-icon> Photo</v-btn>
            </div>
              <div v-else class="pb-1">
                <header class="scrollo">
                <div class="hzImageItemo" v-for="(i,index) in images" :key="index">
                <v-card class="mr-1">
                  <v-img
                  :src="i.local"
                  height="75px"
                  ></v-img>
                </v-card>
            </div>
            <div class="hzImageItemo">
                <v-card class="mr-1">
                  <v-img
                  @click="makeTheImg"
                  :src="addPhoto"
                  height="75px"
                  ></v-img>
                </v-card>
            </div>
                </header>
              </div>
            </div>
        		 <v-divider class="ml-2 mr-5"></v-divider>
             <v-layout row wrap>
               <v-flex xs4>
                   <v-btn

                    :loading="loading3"
                    :disabled="loading3"
                    color="blue-grey"
                    block
                    style="height: 48px;"
                    class="white--text mt-0"
                    @click.native="() => {loader = 'loading3'; store()}"
                  >
                    Post
                    <v-icon right dark>create</v-icon>
                  </v-btn>  
               </v-flex>
               <v-flex xs8>
                 <v-select
                  label="Type"
                  :items="subCatg"
                  v-model="theSubCatg"
                  solo></v-select>
               </v-flex>
             </v-layout>

       
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



    <!-- DIALOG  -->
    <v-dialog v-model="photo_dialog">
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
                 <v-btn block @click="photo_dialog = !photo_dialog">
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
      <span v-if="!sn.multiLine">{{sn.text}}</span>
      <span v-else><i v-for="t in sn.errors" :key="t">
        {{t[0]}}
      </i></span>

    </v-snackbar>

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
		sn:{snackbar:false,color:'success',timeout:3000,text:'',mode:''},
    subCatg:[],
    theSubCatg:'',
    photo_dialog:false,
    images:[],
    addPhoto:require('@/assets/addPhoto.png'),
    image:'',
    sn:{color:'',text:'',model:false,multiLine:false,errors:[]}

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
    			 vm.sn.multiLine = false;
                vm.sn.model = true;
              vm.sn.color = 'red';
              vm.sn.text = "You can't post Empty !"
    		}else {
          if(vm.images.length == 0) {
            var hasImage = false;
          }else {
            var hasImage = true;
          }

    			axios.post(vm.url + 'api/post/store',{content:vm.content,subCatg:vm.theSubCatg,hasImage:hasImage,images:vm.images}).then(response => {
    				vm.sn.snackbar = true;
			          vm.sn.color = 'blue darken-2';
			          vm.sn.text = 'You Post Has Publis'
			          vm.content = '';
			          vm.loader = null
                 location.reload();
    			}).catch(err => {
    			});
    		


        }
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
        axios.post(vm.url + 'api/post/upload/image',{image:img}).then(response => {
        vm.images.push({local:vm.image,name:response.data.image});
        vm.photo_dialog = false;
        }).catch(err => {
          if(err.response.data.errors)
              {
                vm.sn.multiLine = true;
                vm.sn.model = true;
              vm.sn.color = 'red';
              vm.sn.text = err.response.data.errors
              
              vm.sn.errors = err.response.data.errors
              }else{
                vm.sn.multiLine = false;
                vm.sn.model = true;
              vm.sn.color = 'red';
              vm.sn.text = "There Are Error In network"
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
    },
    props:['url','user'],
    created() {
      const vm = this;
      if(vm.user.profile.catg == 'Clothes') {
        vm.subCatg = ['Male','Female','Boy','Girle','Lingary','Other']
      }
      if(vm.user.profile.catg == 'Shoes') {
        vm.subCatg = ['Male','Female', 'Boy','Girle']
      }
    }
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
  .v-text-field__details{display: none !important;}


.scrollo {
  white-space: nowrap; /* [1] */
  overflow-x: auto; /* [2] */
  -webkit-overflow-scrolling: touch; /* [3] */
  -ms-overflow-style: -ms-autohiding-scrollbar; /* [4] */ 
  }
  .scrollo::-webkit-scrollbar {
  display: none; 
  }
    .hzImageItemo{
        display:inline-block;
        width:20%;
    }

</style>