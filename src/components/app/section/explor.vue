<template>
    <div class="expolor">
        <!-- tools Nav -->
        <tools :main="true"></tools>
        <!-- body section -->
        

        <v-card>

        <div class="expolorBody fullWidth">
            
            <div class="search-and-add fullWidth mt-2">
                <v-layout row wrap>
                    <v-flex xs10>
                        <v-text-field
                        v-model="search"
                        label="Search"
                        solo
                        append-icon="search"
                        class="borderTextField "
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs2>
                        <v-btn fab class="blue" dark small icon>
                            <v-icon>add_box</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </div>
            

            <div class="gridExplor">
                <gridExplor></gridExplor>
            </div>
        </div>
        </v-card>
        
        <!-- EndBody Sectoion  -->
        <v-card>
            <v-card-title primary-title>
                <div class="title">
                    Last Post
                </div>
            </v-card-title>
            <v-card-title class="fullWidth pa-1">
                <div class="fullWidth">
                    <postCard v-for="i in 6" :key="i"></postCard>
                </div>
            </v-card-title>
        </v-card>
        <!-- bottomNav -->
        <bottomNav bottomNav="Explor"></bottomNav>
    </div>
</template>
<script>
import tools from '@/components/Global/toolsNav/tools'
import bottomNav from '@/components/Global/bottomNav'
import gridExplor from './explor/gridExplor'
import postCard from './main/postCard'
    export default {
    components:{tools,bottomNav,gridExplor,postCard},
        data() {
            return {
                search:''
            }
        }        
    }
</script>