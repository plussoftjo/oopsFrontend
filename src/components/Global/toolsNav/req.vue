<template>

    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-btn slot="activator" icon :class="{'red--text':hasH}">

      	<v-icon>people</v-icon>

      </v-btn>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click.native="closeNotfy">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Notifiction</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
          </v-toolbar-items>
        </v-toolbar>
        <v-list>
        	<v-card v-if="!hasH">
				<v-card-title>
					<div style="width:100%;" class="title font-weight-black text-xs-center">
						No Friend Req!
					</div>
				</v-card-title>
			</v-card>
        	<div v-for="i in items">
          <list  :i="i" :url="url"></list>
        		<v-divider></v-divider>
        	</div>
        </v-list>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
</template>
<script>
	import list from './req/list'
	export default {
		components:{list},
		data() {
			return {
				items:[],
				dialog:false,
				notfy:[],
				hasH:false,
				count:0
			}
		},
		created() {
			const vm = this;
			/////////THIS FOR ALL VUE FILE 
			var token = localStorage.getItem('tk');
			if(!token) {
				vm.$router.push({name:'login'})
			}else {
				window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
			}
			vm.install();
		},
		methods:{
			install() {
				const vm = this;
				axios.get(vm.url + 'api/frindship/has_frind_req').then(response => {
					if(response.data.has == false)
					{
						
					vm.hasH = false;
					vm.count = 0;					

					}else {
						vm.hasH = true;
						vm.items = response.data.list;
					}

				}).catch(err => {
				});
			},
			closeNotfy() {
				const vm = this;
				vm.hasH = false;
				vm.dialog = false;				
			}
		},
		props:['url'],
		watch:{
			// dialog() {
			// 	const vm = this;

			// 	if(vm.dialog == true) {
			// 		axios.get(vm.url + 'api/notfy/makeasread').then(response => {

			// 		}).catch(err => {
			// 			console.log(err)
			// 		});
			// 	}
			// }
		}
	}
</script>