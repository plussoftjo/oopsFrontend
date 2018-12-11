<template>
	<div class="sharingLayout" v-if="show">
		
		<v-container>
			<div class="font-weight-black">
			is Share ..
		</div>
			 <v-card class="mt-3">
            <div class="HeaderPostCard">
                <!--  <div class="date">
                        {{post.created_at}}
                    </div> -->
                <v-list class="pa-0 grey lighten-5" >
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                        <img :src="url + 'images/profile/orginal/' +  sharePost.user.avatar">
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                        <v-list-tile-title class="font-weight-black" @click="$router.push({name:'profile',params:{id:sharePost.user.id}})">{{sharePost.user.name}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </div>
            <v-card-title class="fullWidth" >
                <div class="bodyPostCard" style="width: 100%;">
                   
                    <div class="postIs font-weight-black" @click="$router.push({name:'post',params:{id:post.id}})">
                        {{post.content}}               
                    </div>
                    <div style="width: 100%;">
                      <header class="scrollo">
                    <div class="hzImageItemo" v-for="(i,index) in post.images" :key="index" v-if="post.images">
                    <v-card class="mr-2 brStyle">
                      <v-img
                       @click="selectImage(i.image)"
                      :src="url + 'images/posts/' + i.image"
                      height="75px"
                      ></v-img>
                    </v-card>
                    </div>
                    </header>  
                    </div>
                
                    <div class="subCatgContent">
                    {{post.subCatg}}
                </div>
                </div>
            </v-card-title>
          <!--   <v-card-actions>
                <v-divider style="width: 100%;"></v-divider>
                <div style="width: 100%;">
                    <postLike v-for="(like,index) in post.likes" :key="index" :url="url" :like="like"></postLike>                    
                </div>
            </v-card-actions> -->
        </v-card>
		</v-container>
		 <v-dialog v-model="photoDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card v-if="photoDialog">
                <v-toolbar dark >
                      <v-btn icon dark @click.native="photoDialog = false">
                        <v-icon>close</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-img
                    :src="url + 'images/posts/' +  theImage"></v-img>
                </v-card>
            </v-dialog>
	</div>
</template>
<script>
	export default {
		props:['url','post'],
		created() {
			const vm = this;
			axios.get(vm.url + 'api/post/showPost/' + vm.post.postid).then(response => {
				vm.sharePost = response.data;
				vm.show = true;
			}).catch(err => {
				console.log(err)
			});
		},
		data() {
			return {
				sharePost:{},
				show:false,
                  theImage:'',
                photoDialog:false
			}
		}
	}
</script>