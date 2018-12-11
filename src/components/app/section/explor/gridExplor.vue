<template>
    <div class="gridExplor">
       <v-container grid-list-md class="mt-0 pt-0">
           <v-layout row wrap>
               <v-flex xs6>
                   <v-card>
                       <v-img
                       :src="img1"
                       aspect-ratio="2.75"
                       height="157px"
                       
                       >
                       <div class="blackScreen"></div>
                       <div class="stickName">
                           this is some text from the post in the sectio
                       </div>
                       </v-img>
                       
                   </v-card>
               </v-flex>
               <v-flex xs6>
                   <v-card class="mb-3">
                       <v-img
                       :src="img2"
                       aspect-ratio="2.75"
                       height="157px"
                       
                       >
                       <div class="blackScreen"></div>
                       
                       <div class="stickName">
                           this is some text from the post in the sectio
                       </div>
                       </v-img>
                   </v-card>
               </v-flex>
               <v-flex xs12>
                   <v-card>
                       <v-img
                       :src="img3"
                       aspect-ratio="2.75"
                       height="150px"

                       >
                       <div class="blackScreen"></div>

                       <div class="stickName">
                           this is some text from the post in the sectio
                       </div>
                       </v-img>
                   </v-card>
               </v-flex>
               <v-flex xs6>
                   <v-card>
                       <v-img
                       :src="img4"
                       aspect-ratio="2.75"
                       height="150px"
                       >
                       <div class="blackScreen"></div>

                       <div class="stickName">
                           this is some text from the post in the sectio
                       </div>
                       </v-img>
                   </v-card>
               </v-flex>
               <v-flex xs6>
                   <v-card>
                       <v-img
                       :src="img5"
                       aspect-ratio="2.75"
                       height="150px"
                       >
                       <div class="blackScreen"></div>

                       <div class="stickName">
                           this is some text from the post in the sectio
                       </div>
                       </v-img>
                   </v-card>
               </v-flex>
           </v-layout>
       </v-container>


        
    </div>
</template>
<script>
    export default {
        data() {
            return {
                test:require('@/assets/test.png'),
                img1:require('@/assets/explor/1.jpg'),
                img2:require('@/assets/explor/2.png'),
                img3:require('@/assets/explor/3.jpg'),
                img4:require('@/assets/explor/4.jpg'),
                img5:require('@/assets/explor/5.jpg'),
            }
        }
    }
</script>
<style scoped>
.stickName{ position:absolute;  bottom: 0px; left:0px; width:100%; padding:5px; color:white; text-align:center; z-index:4; background-color:rgba(0,0,0,0.3);}
.blackScreen{ position:absolute;  bottom: 0px; left:0px; min-width:100%; padding:5px; color:white; min-height:100%; background-color:black; opacity: 0.2;}
</style>