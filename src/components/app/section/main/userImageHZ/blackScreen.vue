<template>
	<div>
		
<v-img
:src="url + 'images/profile/orginal/' + i.avatar"
aspect-ratio="2.75"
height="85px"
class="circle"
@click="clicked = true"

>
   <div class="blackScreen" v-if="clicked">
       <div class="text-xs-center title font-weight-black white--text pt-4" @click="addFrind(i.id)" v-if="!shipType">
            +
           <br>
           Add
       </div>
        <div class="text-xs-center title font-weight-black white--text pt-4" v-else>
           <v-icon style="color: white; text-align: center; font-weight: 700;">
           	done_outline
           </v-icon>
       </div>

   </div>
   </v-img>
                   <v-snackbar
      v-model="sn.snackbar"
      :color="sn.color"
      :timeout="sn.timeout"
      :vertical="sn.mode === 'vertical'"
    >
      {{ sn.text }}
      <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
   	</div>
</template>
<script>
	export default {
		data() {
			return {
				shipType:false,
                sn:{snackbar:false,color:'success',timeout:3000,text:'',mode:''},
                clicked:false

			}
		},
		methods:{
			addFrind(i) {
                const vm = this;
                axios.get(vm.url + 'api/frindship/add/' + i).then(response => {
                    vm.shipType = true;

                    vm.sn.snackbar = true;
                      vm.sn.color = 'success';
                      vm.sn.text = 'You Have Send Friend Request!'
                      setTimeout(function() {
                        
                      }, 2000);
                }).catch(err => {
                })
            },
		},
		props:['url', 'i']
	}
</script>