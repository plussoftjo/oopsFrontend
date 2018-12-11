<template>
  <v-card flat>
    <v-bottom-nav
      :active.sync="bottomNav"
      :value="true"
      app
        class="likeLight"
      
    >
      <v-btn
        color="blue darken-1"
        flat
        value="frinds"
        @click="$router.push({name:'frinds'})"
      >
        <span>Friends Post</span>
        <v-icon>people</v-icon>
      </v-btn>

      <v-btn
        color="blue darken-1"
        flat
        value="Main"
        @click="$router.push({name:'main'})"
      >
        <span>Main</span>
        <v-icon>home</v-icon>
      </v-btn>

      <v-btn
        color="blue darken-1"
        flat
        value="profile"
        @click="$router.push({name:'profile',params:{id:id}})"
      >
        <span>My Profile</span>
        <v-icon>person</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-card>
</template>
<script>
  export default {
    props:['bottomNav','id']
  }
</script>
<style>
.likeLight{background:#f5f5f5;}
</style>