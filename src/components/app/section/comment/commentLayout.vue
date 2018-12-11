<template>
          <v-card class="grey lighten-5 mt-3" >
           
            <div class="sender">
                <v-list class="pa-0 grey lighten-5" >
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                        <img :src="url + 'images/profile/orginal/' + comment.user.avatar">
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                        <v-list-tile-title class="text-xs-left font-weight-black">{{comment.user.name}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                <v-card-title class="pt-2 pb-2 ml-5 white lighten-5">
                    <div class="senderText font-weight-black" style="min-height: 40px;">
                       {{comment.comment}}
                    </div>
                </v-card-title>
<!--                 <v-card-actions class="grey lighten-5">
                    <v-spacer></v-spacer>
                    <v-btn class="blue darken-3" dark>Replay</v-btn>
                </v-card-actions> -->
                
            </div>
         

         
           
        </v-card>
</template>
<script>
    export default {
        data() {
            return {
                avatarImg:require('@/assets/app/start/reg/man.png'),
                liked:false
            }
        },
        props:['url','comment'],
      
        created() {
                const vm = this;

            },
           
    }
</script>
<style>
.HeaderPostCard{position: relative;}
.HeaderPostCard .date{position:absolute;  bottom: 0px; right: 5px; font-weight:600; text-align:center;}
#app > div > main > div > div > div.v-card.theme--light > div.v-card__title.fullWidth.pa-1 > div > div > div:nth-child(1){margin-top:0px;}
.borderImage{border-radius: 50%;}
.bodyPostCard{min-height: 70px;}
</style>