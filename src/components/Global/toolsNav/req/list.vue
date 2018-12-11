<template>

	<v-list-tile
			
            avatar
          >
      <v-list-tile-avatar>
              <img :src="url + 'images/profile/orginal/' + i.avatar">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title class="title font-weight-black">{{i.name}}</v-list-tile-title>
             
            </v-list-tile-content>

			
            <v-btn v-if="ac">Accepted</v-btn>
            <v-btn @click="accept_frind" v-else>accept</v-btn>
              
          </v-list-tile>

</template>
<script>
	export default {
		props:['i','url'],
		methods:{
			accept_frind()
			{
				const vm  = this;
				axios.get(vm.url + 'api/frindship/accept_friend/' + vm.i.id).then(response => {
					vm.ac = true;
					
				}).catch(err => {
					console.log(err)
				})
			}
		},
		data() {
			return {
				ac:false
			}
		}
	}
</script>