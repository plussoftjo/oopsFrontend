<template>
    <div class="post" v-if="show">
        <tools :main="false" :url="url"></tools>


        <!-- POST LAY OUT  -->

        <postLayout v-if="post" :post="post" :url="url" ></postLayout>
        <commentLayout :post="post" :url="url"></commentLayout>
        <comments :post="post" :url="url"></comments>


        <!-- <bottomNav></bottomNav> -->
        <loaderWait v-if="loader"></loaderWait>
    </div>
</template>
<script>
import tools from '@/components/Global/toolsNav/tools'
import bottomNav from '@/components/Global/bottomNav'
import postLayout from '@/components/Global/postCard'
import commentLayout from './post/commentLayout'
import comments from './post/comments'
    export default {
        components:{tools,postLayout,commentLayout,comments,bottomNav},
        created() {
            const vm = this;
              var token = localStorage.getItem('tk');
              if(!token) {
                vm.$router.push({name:'login'})
                
            }else {
                window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
               axios.get(vm.url + 'api/main/iam').then(response => {
                    vm.user = response.data;
                }).catch(err => {
                });
               axios.get(vm.url + 'api/post/showPost/' + vm.$route.params.id).then(response => {
                vm.post = response.data;
                vm.loader = false;
                vm.show = true;
            }).catch(err => {
            });
            }

            
        },
        props:['url'],
        data() {
            return {
                post:null,
                loader:true,
                show:true
            }
        }
    }
</script>
<style>

</style>