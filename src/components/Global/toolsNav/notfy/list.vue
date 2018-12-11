<template>

	<v-list-tile
            avatar
          >

            <v-list-tile-content>
              <v-list-tile-title >{{n.message}}</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-avatar>
              <img :src="url + 'images/profile/orginal/' + n.image">
            </v-list-tile-avatar>
          </v-list-tile>

</template>
<script>
	export default {
		props:['n','url'],
	}
</script>