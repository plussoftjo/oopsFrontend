<template>
    <div class="userImageHZ">
        <header class="scroll">
            <div class="hzImageItem" v-for="(i,index) in items" :key="index">
                <v-card class="circle mr-1">
                        <blackScreen :url="url" :i="i"></blackScreen>
                </v-card>
            </div>
        </header>
    </div>
</template>
<script>
    import blackScreen from './userImageHZ/blackScreen'
    export default {
        data() {
            return {
                avatar:require('@/assets/app/start/reg/man.png'),
                items:[],
                clicked:false,
                shipType:false,
            }
        },
        props:['url'],
        created() {
            const vm = this;
            axios.get(vm.url + 'api/main/rand_user').then(response => {
                vm.items = response.data;
            }).catch(err => {
            });
        },
        methods:{
            addFrind(i) {
                const vm = this;
                axios.get(vm.url + 'api/frindship/add/' + i).then(response => {
                    vm.shipType = 'Requested';

                    vm.sn.snackbar = true;
                      vm.sn.color = 'success';
                      vm.sn.text = 'You Have Send Friend Request!'
                      setTimeout(function() {
                        
                      }, 2000);
                }).catch(err => {
                })
            },
            select(index)
            {
                const vm = this;
                vm.items[index].clicked = true;
            }
        },
        components:{blackScreen}
    }
</script>
<style>
	.scroll {
	white-space: nowrap; /* [1] */
	overflow-x: auto; /* [2] */
	-webkit-overflow-scrolling: touch; /* [3] */
	-ms-overflow-style: -ms-autohiding-scrollbar; /* [4] */ 
	}
	.scroll::-webkit-scrollbar {
	display: none; 
	}
    .hzImageItem{
        display:inline-block;
        width:40%;
    }
    .circle {
        border-radius:50%;

    }
    .posInTopRight{
        position: absolute;
        right: -5px; 
        top:-5px;
        z-index: 1000;
    }
    .blackScreen{
        position: absolute;
        top: 0px;
        right: 0px;
        z-index: 100;
        width: 100%;
        height: 100%;

        background-color: rgba(0,0,0,0.3);
    }
</style>