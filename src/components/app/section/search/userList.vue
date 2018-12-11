<template>
	<div class="userList">
<v-list subheader>
          <v-list-tile
            v-for="item in users"
            :key="item.id"
            avatar
            @click="$router.push({name:'profile',params:{id:item.id}})"
          >
            <v-list-tile-avatar>
              <img :src="url + 'images/profile/orginal/' + item.avatar">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-html="item.name"></v-list-tile-title>
              <v-list-tile-title style="font-size: 12px;" v-html="item.profile.location"></v-list-tile-title>
            </v-list-tile-content>
<!-- 
            <v-list-tile-action>
              <v-icon :color="item.active ? 'teal' : 'grey'">chat_bubble</v-icon>
            </v-list-tile-action> -->
          </v-list-tile>
        </v-list>

	</div>
</template>
<script>
	export default {
		data() {
			return {
			
     		 }		
			},
			props:['users','url']
		}
</script>