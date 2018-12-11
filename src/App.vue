<template>
  <v-app>
    
    <v-content>
      <router-view :url="url"/>
    </v-content>
  </v-app>
</template>
<script>
    export default {
    data () {
        return {
        url:'http://127.0.0.1:8000/',
        user:{}
        }
    },
    name: 'App',
    mounted() {
      this.install();
    },
    methods:{
      install() {

      }
    }
    
  }
</script>
<style>
.fullWidth{width:100%;}
</style>