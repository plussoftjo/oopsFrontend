<template>
    <div class="commentLayout">
        <v-layout row wrap>
            <v-flex xs9 >
                <div class="commentTextFiled" style="padding-top:6px;">
                    <v-text-field
                        label="Comment"
                        v-model="comment"
                        id="id"
                        solo
                    ></v-text-field>

                </div>
            </v-flex>
            <v-flex xs3 class="pa-0 ma-0">
                <div class="btnLayout">
                <v-btn  block dark class="blue darken-3" style="height:48px;" @click="sendComment"><v-icon dark >send</v-icon></v-btn>
                </div>
            </v-flex>
        </v-layout>
                <div class="postLoader" v-if="loader">
                <v-progress-circular
                  indeterminate
                  color="red"
                ></v-progress-circular>
            </div>
            <loaderWait v-if="bigLoader"></loaderWait>
    </div>
</template>
<script>
export default {
    props:['url','post'],
    data() {
        return {
            comment:'',
            loader:false,
            bigLoader:false
        }
    },
    methods:{
        sendComment() {
            const vm = this;
            vm.loader = true;
            vm.bigLoader = true;
            axios.post(vm.url + 'api/post/comment/send/' + vm.post.id, {comment:vm.comment,touser:vm.post.user.id}).then(response => {
                vm.loader = false;
                location.reload();
            }).catch(err => {
            });
        }
    }
}
</script>
<style>
#app > div > main > div > div > div.commentLayout > div > div.flex.xs10 > div > div > div > div.v-input__slot{border-radius:0px !important;}
#app > div > main > div > div > div.commentLayout > div > div.flex.pa-0.ma-0.xs2 > div > button{border-radius:0px;}
</style>