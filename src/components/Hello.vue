<template>
  <div class="spLocation">
    <div id="map_canvas">
        <button id="button" @click="installMap()">Click me!</button>
      </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import VueCordova from 'vue-cordova'
  Vue.use(VueCordova)
  export default {
    mounted() {
      const vm = this;
      // vm.installMap();

    },
    methods:{
      installMap() {
        const vm = this;
        
      var div = document.getElementById("map_canvas");

     plugin.google.maps.environment.setEnv({
        'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyBB4989kMlIB2eCgtvgw7he8Z06pLD14wU',
        'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyDXVEVffM7IqfZdgeLD_wf4DrHBLsQnDFI'
      });

      // Create a Google Maps native view under the map_canvas div.
      var map = plugin.google.maps.Map.getMap(div);

        // Move to the position with animation
        map.animateCamera({
          target: {lat: 37.422359, lng: -122.084344},
          zoom: 17,
          tilt: 60,
          bearing: 140,
          duration: 5000
        });

        // Add a maker
        var marker = map.addMarker({
          position: {lat: 37.422359, lng: -122.084344},
          snippet: "هون المكان",
          animation: plugin.google.maps.Animation.BOUNCE,
          'draggable': true
        });

        // Show the info window

        marker.addEventListener(plugin.google.maps.event.MARKER_DRAG_END, function(position) {
          marker.setTitle(position.toUrlValue());
          marker.setAnimation(plugin.google.maps.Animation.BOUNCE);
          marker.showInfoWindow();
          const x = position;
          setTimeout(function() {
          marker.setPosition({lat: 37.422359, lng: -122.084344})
            },3000);
            // console.log()
        });



      }
    }
  }
</script>
    <style >
    #map_canvas { /* Must bigger size than 100x100 pixels */
      width: 100%;
      height: 500px;
    }
    button {
      padding: .5em;
      margin: .5em;
      position: absolute;
      left:30px;
      bottom: 30px;
    }
    </style>