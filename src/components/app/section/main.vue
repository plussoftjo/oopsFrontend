<template>
    <div class="main">

        <!-- ADDS TOOLS NAV -->
        <tools :url="url" :main="true"></tools>

        <v-container grid-list-xs>
            <v-layout row wrap>
                <v-flex xs4>
                    <v-btn large fab class="blue" @click="$router.push({name:'addFriend'})"><v-icon class="white--text">person_add</v-icon></v-btn>
                </v-flex>
                <v-flex xs8>
                    <userImageHZ :url="url"></userImageHZ>
                </v-flex>
            </v-layout>
        </v-container>
    

        <v-card class="ml-1 mr-1" v-if="show">
            <newPost :url="url" :user="user"></newPost>
        </v-card>
        <v-divider></v-divider>
        <v-card class="ma-1">
            <v-card-title primary-title>
                <div class="title">
                    Last Post
                </div>
            </v-card-title>
            <v-card-title class="fullWidth pa-1">
                <div class="fullWidth">
                    <postCard v-for="(post,index) in posts" :key="index" :url="url" :post="post">
                        
                    </postCard>
                
                <center>
                    <v-btn @click="install">
                        load More
                    </v-btn>
                </center>
                </div>

            </v-card-title>
        </v-card>
        <bottomNav :bottomNav="'Main'" :id="user.id"></bottomNav>
        <loaderWait v-if="loader"></loaderWait>
    </div>
</template>
<script>
import tools from '@/components/Global/toolsNav/tools'
import bottomNav from '@/components/Global/bottomNav'
import userImageHZ from './main/userImageHZ'
import postCard from '@/components/Global/postCard'
import newPost from './main/newPost';

    export default {
        components:{tools,userImageHZ,postCard,bottomNav,newPost},
        created() {
            const vm = this;
           var token = localStorage.getItem('tk');
            if(!token) {
                vm.$router.push({name:'login'})
                
            }else {
            window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
               axios.get(vm.url + 'api/main/iam').then(response => {
                    vm.user = response.data;

                    if(vm.user.active == true) {
                        vm.install();
                        vm.show = true;
                    }else {
                        vm.$router.push({name:'stepthree'});
                    }
                }).catch(err => {
                });
            }
        },
        props:['url'],
        methods:{
            install() {
                const vm = this;
                axios.get(vm.url + 'api/main/globalPost?page='+vm.page).then(response=> {
                    response.data.data.forEach(trg => {
                        vm.posts.push(trg)
                    });
                    vm.loader = false;
                   vm.page = vm.page + 1;
                }).catch(err => {
                });
            },
           
        },
        data() {
            return {
                posts:[],
                user:{},
                loader:true,
                show:false,
                page:1
            }
        },
        mounted() {

        }
    }
</script>
<style>

</style>