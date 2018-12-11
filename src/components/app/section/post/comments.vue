<template>
    <div class="comments">
        <v-card class="grey lighten-5 mt-3" v-for="(c,index) in comments">
           
            <div class="sender" >
                <v-list class="pa-0 grey lighten-5" >
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                        <img :src="url + 'images/profile/orginal/' + c.user.avatar">
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                        <v-list-tile-title class="text-xs-left font-weight-black">{{c.user.name}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                <v-card-title class="pt-2 pb-2 ml-5 white lighten-5">
                    <div class="senderText font-weight-black" style="min-height: 40px;">
                       {{c.comment}}
                    </div>
                </v-card-title>
                <v-card-actions class="grey lighten-5">
                    <v-spacer></v-spacer>
                    <v-btn @click="$router.push({name:'comment',params:{id:c.id}})" class="blue darken-3" dark>Replay</v-btn>
                </v-card-actions>
                
            </div>
         
           
        </v-card>

        <v-card class="grey lighten-5 mt-3" v-for="(c,index) in myComment">
           
            <div class="sender" >
                <v-list class="pa-0 grey lighten-5" >
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                        <img :src="url + 'images/profile/orginal/' + c.user.avatar">
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                        <v-list-tile-title class="text-xs-left font-weight-black">{{c.user.name}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                <v-card-title class="pt-2 pb-2 ml-5 white lighten-5">
                    <div class="senderText font-weight-black" style="min-height: 40px;">
                       {{c.comment}}
                    </div>
                </v-card-title>
                <v-card-actions class="grey lighten-5">
                    <v-spacer></v-spacer>
                    <v-btn @click="$router.push({name:'comment',params:{id:c.id}})" class="blue darken-3" dark>Replay</v-btn>
                </v-card-actions>
                
            </div>
         
           
        </v-card>
        
    </div>
</template>

<script>
    export default {
        data() {
            return {
                avatarImg:require('@/assets/app/start/reg/man.png'),
                comments:[],
                myComment:[]
            }
        },
        props:['url','post'],
        methods:{
            install() {
            const vm = this
            axios.get(vm.url + 'api/post/comment/comments/' + vm.post.id).then(response => {
                vm.comments = response.data;
            }).catch(err => {
            });
        }
        },
        watch:{
            post() {
                this.install();
            }
        },
        created() {
            const vm = this;
            axios.get(vm.url + 'api/post/myComment/' + vm.$route.params.id).then(response => {
                vm.myComment = response.data;
            }).catch(err => {
            });
        }
        
    }
</script>