<template>
    <div class="postCard fullWidth">
        <v-card class="mt-3">
            <div class="HeaderPostCard">
                 <div class="date">
                        {{post.created_at}}
                    </div>
                <v-list class="pa-0 grey lighten-5" >
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                        <img :src="url + 'images/profile/orginal/' + post.user.avatar">
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                        <v-list-tile-title>{{post.user.name}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </div>
            <v-card-title class="fullWidth">
                <div class="bodyPostCard">
                   
                    <div class="postIs">
                        {{post.content}}                   
                    </div>
                </div>
            </v-card-title>
            <v-card-actions class="pa-0">
                <v-layout row wrap>
                    <v-flex xs4>
                        <v-btn block ><v-icon small>favorite</v-icon> Like</v-btn>
                    </v-flex>
                    <v-flex xs4>
                        <v-btn block><v-icon small>chat</v-icon> Comment</v-btn>
                    </v-flex>
                    <v-flex xs4>
                        <v-btn block><v-icon small>more</v-icon> More</v-btn>
                    </v-flex>
                </v-layout>
            </v-card-actions>
        </v-card>

        
    </div>
</template>
<script>
    export default {
        data() {
            return {
                avatarImg:require('@/assets/app/start/reg/man.png'),

            }
        },
        props:['post','url']
    }
</script>
<style>
.HeaderPostCard{position: relative;}
.HeaderPostCard .date{position:absolute;  bottom: 0px; right: 5px; font-weight:600; text-align:center;}
#app > div > main > div > div > div.v-card.theme--light > div.v-card__title.fullWidth.pa-1 > div > div > div:nth-child(1){margin-top:0px;}
.bodyPostCard{min-height: 70px;}
</style>