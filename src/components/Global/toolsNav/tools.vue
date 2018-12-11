<template>
    <div class="tools"> 
        <v-toolbar
        app
        :clipped-left="clipped"
        v-if="main"
        >
        
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title v-if="hasTitle">{{title}}</v-toolbar-title>
        

            <v-spacer></v-spacer>
        
        <req :url="url"></req>
        <notfy :url="url"></notfy>
        <v-btn icon @click="$router.push({name:'search'})"><v-icon>search</v-icon></v-btn>
        <v-btn icon @click="$router.push({name:'message'})">
            <v-icon v-if="seen">message</v-icon>
            <v-icon v-if="!seen" class="red--text">message</v-icon>
        </v-btn>
        

        
        </v-toolbar>  
        <v-toolbar
        app
        :clipped-left="clipped"
        v-else
        >

     
    <v-btn icon @click="$router.go(-1)">
        <v-icon >keyboard_backspace</v-icon>
    </v-btn>
            <v-toolbar-title v-if="hasTitle">{{title}}</v-toolbar-title>
       

        </v-toolbar>  
            <v-navigation-drawer
            persistent
            :clipped="clipped"
            v-model="drawer"
            enable-resize-watcher
            fixed
            dark
            app
            >
            <v-toolbar flat class="blue darken-3">
                        <v-list class="pa-0">
                        <v-list-tile avatar>
                           <!--  <v-list-tile-avatar>
                            <img :src="avatarImg">
                            </v-list-tile-avatar> -->
                            <v-list-tile-content>
                            <v-list-tile-title>Menu</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <navDrawer></navDrawer>
                        </v-list>
                    </v-toolbar>
            </v-navigation-drawer>
    </div>
</template>
<script>
import navDrawer from './drawer.vue';
import notfy from './notfy.vue'
import req from './req.vue'
    export default {
    data () {
        return {
        clipped: false,
        avatarImg:require('@/assets/man.png'),
        drawer: false,
        seen:true
      
        
        }
    },
    props:['main','title','hasTitle','url'],
    components:{navDrawer,notfy,req},
    created() {
        const vm = this;
        axios.get(vm.url + 'api/message/checkState').then(response => {
            vm.seen = response.data.seen;
        }).catch(err => {
        });
    }
    }
</script>
