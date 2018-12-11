<template>
    <div class="postCard fullWidth" >
        <v-card class="mt-3" v-if="post.isShare == 0">
            <div class="HeaderPostCard">
                 <div class="date">
                     <span style="font-weight: 600; font-size: 12px">{{post.user.profile.location}}</span>
                     <br>
                        {{post.created_at}}
                    </div>
                <v-list class="pa-0 grey lighten-5" >
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                        <img :src="url + 'images/profile/orginal/' +  post.user.avatar">
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                        <v-list-tile-title class="font-weight-black" @click="$router.push({name:'profile',params:{id:post.user.id}})">

                            {{post.user.name}}
                            

                      </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </div>
            <v-card-title class="fullWidth">
                <div class="bodyPostCard" style="width: 100%;">
                   
                    <div class="postIs font-weight-black"  @click="$router.push({name:'post',params:{id:post.id}})">
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
                      lazy-src
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
            <v-card-actions>
                <v-divider style="width: 100%;"></v-divider>

                <div style="width: 100%;">
                    <postLike v-for="(like,index) in post.likes" :key="index" :url="url" :like="like"></postLike>                    
                </div>
                
            </v-card-actions>
            <v-card-actions class="pa-0">
                <v-layout row wrap>
                    <v-flex xs4 v-if="!liked">
                        <v-btn block @click="like"><v-icon small>favorite_border</v-icon> Like</v-btn>
                    </v-flex>
                    <v-flex xs4 v-else>
                        <v-btn block @click="unLike" class="blue--text"><v-icon small class="blue--text">favorite_border</v-icon> Liked</v-btn>
                    </v-flex>
                    <v-flex xs4>
                        <v-btn block @click="$router.push({name:'post',params:{id:post.id}})"><v-icon small>chat</v-icon> Comment</v-btn>
                    </v-flex>
                    <v-flex xs4>
                        <v-btn block @click="share"><v-icon small>note_add</v-icon> Share</v-btn>
                    </v-flex>
                </v-layout>
            </v-card-actions>
            <div class="postLoader" v-if="loader">
                <v-progress-circular
                  indeterminate
                  color="red"
                ></v-progress-circular>
            </div>
        </v-card>

        <v-card class="mt-3" v-else>
            <div class="HeaderPostCard">
                 <div class="date">
                        {{post.created_at}}
                    </div>
                <v-list class="pa-0 grey lighten-5" >
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                        <img :src="url + 'images/profile/orginal/' +  post.user.avatar">
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                        <v-list-tile-title class="font-weight-black" @click="$router.push({name:'profile',params:{id:post.user.id}})">{{post.user.name}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </div>
            <sharingLayout :url="url" :post="post"></sharingLayout>
            <v-card-actions>
                <v-divider style="width: 100%;"></v-divider>
                <div style="width: 100%;">
                    <postLike v-for="(like,index) in post.likes" :key="index" :url="url" :like="like"></postLike>                    
                </div>
            </v-card-actions>
            <v-card-actions class="pa-0">
                <v-layout row wrap>
                    <v-flex xs4 v-if="!liked">
                        <v-btn block @click="like"><v-icon small>favorite_border</v-icon> Like</v-btn>
                    </v-flex>
                    <v-flex xs4 v-else>
                        <v-btn block @click="unLike" class="blue--text"><v-icon small class="blue--text">favorite_border</v-icon> Likeed</v-btn>
                    </v-flex>
                    <v-flex xs4>
                        <v-btn block @click="$router.push({name:'post',params:{id:post.id}})"><v-icon small>chat</v-icon> Comment</v-btn>
                    </v-flex>
                    <v-flex xs4>
                        <v-btn block @click="share"><v-icon small>note_add</v-icon> Share</v-btn>
                    </v-flex>
                </v-layout>
            </v-card-actions>
        </v-card>
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
    import postLike from './postCard/postLike'
    import sharingLayout from './postCard/sharingLayout'
    export default {
        data() {
            return {
                avatarImg:require('@/assets/app/start/reg/man.png'),
                liked:false,
                sn:{snackbar:false,color:'success',timeout:3000,text:'',mode:''},
                theImage:'',
                photoDialog:false,
                loader:true
            }
        },
        props:['url','post'],
        components:{postLike,sharingLayout},
        methods:{
            like() {
                const vm = this;
                vm.loader = true;
                vm.liked = true;
                axios.get(vm.url + 'api/post/like/' + vm.post.id).then(response => {
                    vm.liked = true;
                    vm.loader = false;
                }).catch(err => {
                });
            },
            isLiked() {
                const vm = this;
                axios.get(vm.url + 'api/post/isLiked/' + vm.post.id).then(response => {
                    vm.liked = response.data.isLiked;
                    vm.loader = false;
                }).catch(err => {
                });
            },
            unLike() {
                const vm = this;
                vm.loader = true;
                vm.liked = false;
                axios.get(vm.url + 'api/post/unlike/' + vm.post.id).then(response => {
                    vm.liked = false;
                    vm.loader = false;   
                }).catch(err => {
                });
            },
            share() {
                const vm = this
                axios.get(vm.url + 'api/post/share/' +  vm.post.id).then(response => {
                    if(response.data.error == 1) {
                        vm.sn.snackbar = true;
                      vm.sn.color = 'red';
                      vm.sn.text = response.data.state
                    }else {
                       vm.sn.snackbar = true;
                      vm.sn.color = 'success';
                      vm.sn.text = response.data.state
                    }
                }).catch(err => {
                });
            },
            selectImage(image)
            {
                this.theImage = image;
                this.photoDialog = true;
            }


        },
        created() {
                const vm = this;
                 vm.isLiked();
            },
            watch: {
                post() {
                    const vm = this;
                    // vm.isLiked();
                }
            }
    }
</script>
<style>
.HeaderPostCard{position: relative;}
.HeaderPostCard .date{position:absolute;  bottom: 0px; right: 5px; font-weight:600; text-align:center;}
#app > div > main > div > div > div.v-card.theme--light > div.v-card__title.fullWidth.pa-1 > div > div > div:nth-child(1){margin-top:0px;}
.borderImage{border-radius: 50%;}
.postIs{min-height: 70px;}
.subCatgContent{position: absolute; right: 7px; bottom: 50px; }
.brStyle{border:#e7e7e7 solid 3px; }
.postLoader{position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; background-color: rgba(0,0,0,0.3); display: flex; justify-content: center; padding-top: 20%; }
</style>