<template>
  <div class="home-parent-div">
    <home-banner />
    <home-search
      @ReturnRestaurants="updateRestaurants($event)"
      v-bind:restaurants="restaurants"
    />
    <p class="container switch-container">
      Liste
      <label class="switch py-3">
        <input type="checkbox" />
        <span class="slider round" v-on:click="switchListView()"></span>
      </label>
      Carte
    </p>
    <home-modal v-bind:userId="userId" v-bind:restaurant="modal_restaurant"/>
    <home-tiles
      class="container tiles"
      id="tiles-list"
      v-bind:rows="restaurant_triplets"
      @restaurant-id="updateCurrentId($event)"
    />
    <home-map
      class="home-map is-hidden"
      id="map-list"
      v-bind:restaurants="restaurants"
      @restaurant-id="updateCurrentId($event)"
    />
  </div>
</template>

<style scoped>
@media screen and (max-width: 680px) {

  .is-hidden {
    display: none;
  }
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.switch-container {
  font-size: 24px;
  display: flex;
  flex-direction: row;
  align-self: flex-end;
}
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>

<script type="text/javascript">
import HomeBanner from "@/components/home/HomeBanner.vue";
import HomeTiles from "@/components/home/HomeTiles.vue";
import HomeSearch from "@/components/home/HomeSearch.vue";
import HomeMap from "@/components/home/HomeMap.vue";
import HomeModal from "@/components/home/HomeModal.vue";
import { getRestaurants, getRestaurantsUnsecured } from "../repo/api.js";

export default {
  name: "home",

  components: {
    HomeBanner,
    HomeTiles,
    HomeSearch,
    HomeMap,
    HomeModal
  },
  methods: {
    filterCuisine(cuisine) {
      const restaurant_list = this.searchRestaurants();
      let matching_result = [];

      for (let i = 0; i < restaurant_list.length; i++) {
        if (
          restaurant_list[i].genres
            .toUpperCase()
            .indexOf(cuisine.toUpperCase()) > -1
        ) {
          matching_result.push(restaurant_list[i]);
        }
      }
    },

    filterRating(rating) {
      const restaurant_list = this.searchRestaurants();
      let matching_result = [];

      for (let i = 0; i < restaurant_list.length; i++) {
        if (restaurant_list[i].rating === rating) {
          matching_result.push(restaurant_list[i]);
        }
      }
    },

    filterPrice(price) {
      const restaurant_list = this.searchRestaurants();
      let matching_result = [];

      for (let i = 0; i < restaurant_list.length; i++) {
        if (restaurant_list[i].price_range === price) {
          matching_result.push(restaurant_list[i]);
        }
      }
    },

    tripletsList() {
      let triplets = [];
      let num_row = 1;
      let new_triplet = [];
      triplets.push(new_triplet);
      const num_restaurants = this.restaurants.length;
      for (let index = 1; index <= num_restaurants; index++) {
        if (triplets[num_row - 1].length < 3) {
          triplets[num_row - 1].push(this.restaurants[index - 1]);
        } else {
          let new_triplet = [];
          triplets.push(new_triplet);
          num_row++;
          triplets[num_row - 1].push(this.restaurants[index - 1]);
        }
      }
      this.restaurant_triplets = triplets;
    },
    updateRestaurants(e) {
      this.restaurants = e;
      this.tripletsList();
    },
    updateCurrentId(resto) {
      this.$emit("restaurant-id", resto.id);
      console.log(resto);
      this.modal_restaurant = resto;
    },
    switchListView() {
      const tiles = document.getElementById("tiles-list");
      const map = document.getElementById("map-list");
      tiles.classList.toggle("is-hidden");
      map.classList.toggle("is-hidden");
    }
  },

  watch: {
    modal_restaurant: function(newVal) {
      this.modal_restaurant = newVal;
    }
  },

  props: ["restId", "userId"],

  data: () => ({
    restaurants: [],
    restaurant_triplets: [],
    modal_restaurant: {}
  }),

  async created() {
    if (this.$cookies.get("user_token") !== null) {
      this.restaurants = await getRestaurants(this.$cookies.get("user_token"));
    } else {
      this.restaurants = await getRestaurantsUnsecured();
    }

    this.tripletsList();
    this.modal_restaurant = this.restaurants[0];
  }
};
</script>
