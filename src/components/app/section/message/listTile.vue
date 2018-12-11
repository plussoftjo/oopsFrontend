<template>
	<div class="listTile" id="listTile">
	<div dir="rtl" v-if="owner">
			<div class="messageTemplate">
				<v-list two-line class="pa-0">
					<v-list-tile avatar	>
						<v-list-tile-avatar>
			                <img :src="url + 'images/profile/orginal/' + message.user.avatar">
			              </v-list-tile-avatar>
						<v-list-tile-content>
							<v-list-tile-title style="text-align: right;">
								{{message.user.name}}
							</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</v-list>
			</div>
			<v-card-title class="pa-0 pl-2 pr-2">
				<div class="blue darken-2 white--text pa-3 pt-1 pb-1 font-weight-black title">
					{{message.message}}
				</div>
			</v-card-title>
		</div>
		<div v-else>
			<div class="messageTemplate">
				<v-list two-line class="pa-0">
					<v-list-tile avatar	>
						<v-list-tile-avatar>
			                <img :src="url + 'images/profile/orginal/' + message.user.avatar">
			              </v-list-tile-avatar>
						<v-list-tile-content>
							<v-list-tile-title>
								{{message.user.name}}
							</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</v-list>
			</div>
			<v-card-title class="pa-0 pl-2 pr-2">
				<div class="blue darken-2 white--text pa-3 pt-1 pb-1 font-weight-black title">
					{{message.message}}
				</div>
			</v-card-title>
		</div>
	</div>
</template>
<script>
	export default {
		props:['user','message','url'],
		created() {
			const vm = this;
			if(vm.user == vm.message.user_id) {
				vm.owner = true;
			}



		},
		data() {
			return {
				owner:false,
				us:0
			}
		},
		watch:{
			message() {
				const vm = this;
			
			}
		}
	}
</script>
<style>
	
</style>