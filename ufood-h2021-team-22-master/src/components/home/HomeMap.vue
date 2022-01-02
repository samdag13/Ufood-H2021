<template>
  <div class="container py-5 map-area">
    <gmap-map
      :center="this.center"
      :zoom="12"
      map-type-id="terrain"
      style="width: 100%; height: 800px"
    >
      <gmap-info-window
        :option="infoWindowOptions"
        :position="infoWindowPosition"
        :opened="infoWindowOpened"
        @closeclick="closeInfoWindow()"
      >
        <div class="info-window" v-if="this.activeRestaurant.location">
          <img class="img-map" v-bind:src="this.activeRestaurant.pictures[0]" />

          <p class="restaurant-name">
            {{ this.activeRestaurant.name }}
          </p>
          <p class="restaurant-adr">
            {{ this.activeRestaurant.address }}
          </p>

          <router-link
            :to="{
              name: 'Restaurant',
              params: { restId: this.activeRestaurant.id }
            }"
          >
            <span class="restaurant-link" v-on:click="updateCurrentId()"
              >Consulter la page du restaurateur</span
            >
          </router-link>
        </div>
      </gmap-info-window>
      <gmap-marker
        v-for="(r, index) in restaurants"
        :key="index"
        :position="getGeolocation(r)"
        :clickable="true"
        :draggable="false"
        @click="markerClick(r)"
      >
      </gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: "home-map",

  data: () => ({
    center: { lat: 0, lng: 0 },
    infoWindowOptions: {
      pixelOff: {
        width: 0,
        height: -35
      }
    },
    activeRestaurant: {},
    infoWindowOpened: false
  }),

  computed: {
    infoWindowPosition() {
      if (!this.activeRestaurant.location) {
        return;
      } else {
        return {
          lat: parseFloat(this.activeRestaurant.location.coordinates[1]),
          lng: parseFloat(this.activeRestaurant.location.coordinates[0])
        };
      }
    }
  },

  props: ["restaurants"],

  methods: {
    currentGeolocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.center.lng = position.coords.longitude;
          this.center.lat = position.coords.latitude;
        });
      }
    },

    getGeolocation(r) {
      return {
        lat: parseFloat(r.location.coordinates[1]),
        lng: parseFloat(r.location.coordinates[0])
      };
    },
    markerClick(r) {
      this.activeRestaurant = r;
      this.infoWindowOpened = true;
    },
    closeInfoWindow() {
      this.activeRestaurant = {};
      this.infoWindowOpened = false;
    },

    updateCurrentId() {
      this.$emit("restaurant-id", this.activeRestaurant.id);
    }
  },

  created() {
    this.currentGeolocation();
  },

  watch: {
    restaurants: function(newVal) {
      this.restaurants = newVal;
    }
  }
};
</script>

<style>
.img-map {
  width: 13rem;
  height: 11rem;
}

.info-window {
  height: fit-content;
  width: 13.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.restaurant-name {
  font-size: 16px;
  font-weight: bold;
  margin: 7px;
}

.restaurant-adr {
  margin: 7px;
  font-size: 13px;
  font-weight: bolder;
  margin: 7px;
}

.restaurant-link {
  border-style: ridge;
  font-weight: bold;
  background-color: #00b3b3;
  color: black;
  padding: 2px;
}
</style>
