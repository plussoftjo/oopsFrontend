<template>
      <v-list class="pt-0" dense>
        <v-list-tile v-for="(i,index) in items" :key="index" @click="$router.push({name:i.at})">
          <v-list-tile-action>
            <v-icon class="mdi">{{i.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{i.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
         <v-list-tile @click="logout">
          <v-list-tile-action>
            <v-icon class="mdi">clear</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>    
</template>
<script>
  export default {
    data() {
      return {
        items:[
          {title:'Main',icon:'home',at:'main'},
          {title:'Friends',icon:'people',at:'myFriends'},
          {title:'My Post',icon:'announcement',at:'myPost'},
          {title:'My Like',icon:'done_all',at:'myLike'},
          {title:'My Comment',icon:'feedback',at:'myComment'},
          {title:'My Shares',icon:'feedback',at:'myShares'},
        ]
      }
    },
    watch: {
      loader() {
        const vm = this;
        const l = this.loader
            this[l] = !this[l]

            setTimeout(() => (this[l] = false), 3000)

            this.loader = null
      }
    },
    methods:{
      logout() {
        const vm = this;
        localStorage.removeItem('tk');
        vm.$router.push({name:'login'});
      }
    }
  }
</script>