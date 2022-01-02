<template>
  <div class="container">
    <div class="container filters">
      <div class="rating">
        <button type="button" class="filter" v-on:click="clickRatingFilter()">
          <i class="fas fa-star"></i>
        </button>
        <div class="hidden menu" id="rating-trigger">
          <li v-on:click="filterRating(1)" class=" filter-item">
            <i class="fas fa-star "></i>
          </li>

          <li v-on:click="filterRating(2)" class=" filter-item">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </li>

          <li v-on:click="filterRating(3)" class=" filter-item">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </li>

          <li v-on:click="filterRating(4)" class=" filter-item">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </li>

          <li v-on:click="filterRating(5)" class=" filter-item">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </li>
        </div>
      </div>

      <div class="price">
        <button type="button" class="filter" v-on:click="clickPriceFilter()">
          <i class="fas fa-dollar-sign"></i>
        </button>
        <div class="hidden menu" id="price-trigger">
          <li v-on:click="filterPrice(1)" class=" filter-item">
            <i class="fas fa-dollar-sign"></i>
          </li>

          <li v-on:click="filterPrice(2)" class=" filter-item">
            <i class="fas fa-dollar-sign"></i>
            <i class="fas fa-dollar-sign"></i>
          </li>

          <li v-on:click="filterPrice(3)" class=" filter-item">
            <i class="fas fa-dollar-sign"></i>
            <i class="fas fa-dollar-sign"></i>
            <i class="fas fa-dollar-sign"></i>
          </li>

          <li v-on:click="filterPrice(4)" class=" filter-item">
            <i class="fas fa-dollar-sign"></i>
            <i class="fas fa-dollar-sign"></i>
            <i class="fas fa-dollar-sign"></i>
            <i class="fas fa-dollar-sign"></i>
          </li>

          <li v-on:click="filterPrice(5)" class=" filter-item">
            <i class="fas fa-dollar-sign"></i>
            <i class="fas fa-dollar-sign"></i>
            <i class="fas fa-dollar-sign"></i>
            <i class="fas fa-dollar-sign"></i>
            <i class="fas fa-dollar-sign"></i>
          </li>
        </div>
      </div>

      <div class="cuisine">
        <button type="button" class="filter" v-on:click="clickCuisineFilter()">
          <i class="fas fa-utensils fa-lg"></i>
        </button>
        <div class="hidden menu" id="cuisine-trigger">
          <li
            v-for="(value, index) in genres_cuisine"
            v-bind:key="index"
            v-on:click="filterCuisine(value)"
            class=" filter-item"
          >
            {{ value }}
          </li>
        </div>
      </div>
    </div>
    <input
      class="home-search"
      v-model="search_input"
      v-on:keyup="searchRestaurants()"
      v-on:click="searchRestaurants()"
      type="text"
    />
    <button class="clear-button" v-on:click="clearSearch()" type="button">
      <i class="fas fa-times"></i>
    </button>
  </div>
</template>

<script>
import { getRestaurants, getRestaurantsUnsecured } from "../../../repo/api.js";
export default {
  name: "home-search",

  data: () => ({
    genres_cuisine: [
      "desserts",
      "bistro",
      "ambiance",
      "fast-food",
      "fruits de mer",
      "hamburgers",
      "santé",
      "végétarien",
      "mexicain",
      "libanais",
      "asiatique",
      "happy hour",
      "boulangerie",
      "pizzeria",
      "vietnamien",
      "européen",
      "steakhouse",
      "grec",
      "charcuterie",
      "café",
      "cuisine moléculaire",
      "indien",
      "italien",
      "japonais"
    ],
    search_input: "",
    restaurant_list: []
  }),

  props: ["restaurants"],

  methods: {
    clickPriceFilter() {
      let is_active = document.getElementsByClassName("active");
      if (is_active.length === 1) {
        is_active[0].classList.toggle("hidden");
        is_active[0].classList.toggle("active");
      } else {
        let trigger = document.getElementById("price-trigger");
        trigger.classList.toggle("hidden");
        trigger.classList.toggle("active");
      }
    },
    clickRatingFilter() {
      let is_active = document.getElementsByClassName("active");
      if (is_active.length === 1) {
        is_active[0].classList.toggle("hidden");
        is_active[0].classList.toggle("active");
      } else {
        let trigger = document.getElementById("rating-trigger");
        trigger.classList.toggle("hidden");
        trigger.classList.toggle("active");
      }
    },
    clickCuisineFilter() {
      let is_active = document.getElementsByClassName("active");
      if (is_active.length === 1) {
        is_active[0].classList.toggle("hidden");
        is_active[0].classList.toggle("active");
      } else {
        let trigger = document.getElementById("cuisine-trigger");
        trigger.classList.toggle("hidden");
        trigger.classList.toggle("active");
      }
    },
    async searchRestaurants() {
      let restaurant_list;

      if (this.$cookies.get("user_token") !== null) {
        restaurant_list = await getRestaurants(this.$cookies.get("user_token"));
      } else {
        restaurant_list = await getRestaurantsUnsecured();
      }

      const search_input = this.search_input;
      let matching_result = [];
      if (search_input !== "") {
        for (let i = 0; i < restaurant_list.length; i++) {
          if (
            restaurant_list[i].name
              .toUpperCase()
              .indexOf(search_input.toUpperCase()) > -1 ||
            restaurant_list[i].address
              .toUpperCase()
              .indexOf(search_input.toUpperCase()) > -1
          ) {
            matching_result.push(restaurant_list[i]);
            this.restaurant_list = matching_result;
            this.updateRestaurantList();
          }
        }
      } else {
        if (this.$cookies.get("user_token") !== null) {
          matching_result = await getRestaurants(
            this.$cookies.get("user_token")
          );
        } else {
          matching_result = await getRestaurantsUnsecured();
        }
      }
      this.restaurant_list = matching_result;
      this.updateRestaurantList();
      return matching_result;
    },

    updateRestaurantList() {
      this.$emit("ReturnRestaurants", this.restaurant_list);
    },

    async filterRating(rating) {
      let restaurant_list;
      if (this.$cookies.get("user_token") !== null) {
        restaurant_list = await getRestaurants(this.$cookies.get("user_token"));
      } else {
        restaurant_list = await getRestaurantsUnsecured();
      }
      let matching_result = [];

      for (let i = 0; i < restaurant_list.length; i++) {
        if (
          Math.round(restaurant_list[i].rating) === rating &&
          (restaurant_list[i].name
            .toUpperCase()
            .indexOf(this.search_input.toUpperCase()) > -1 ||
            restaurant_list[i].address
              .toUpperCase()
              .indexOf(this.search_input.toUpperCase()) > -1)
        ) {
          matching_result.push(restaurant_list[i]);
        }
      }
      this.restaurant_list = matching_result;
      this.updateRestaurantList();
    },

    async filterPrice(price) {
      let restaurant_list;
      if (this.$cookies.get("user_token") !== null) {
        restaurant_list = await getRestaurants(this.$cookies.get("user_token"));
      } else {
        restaurant_list = await getRestaurantsUnsecured();
      }
      let matching_result = [];

      for (let i = 0; i < restaurant_list.length; i++) {
        if (
          restaurant_list[i].price_range === price &&
          (restaurant_list[i].name
            .toUpperCase()
            .indexOf(this.search_input.toUpperCase()) > -1 ||
            restaurant_list[i].address
              .toUpperCase()
              .indexOf(this.search_input.toUpperCase()) > -1)
        ) {
          matching_result.push(restaurant_list[i]);
        }
      }
      this.restaurant_list = matching_result;
      this.updateRestaurantList();
    },

    async filterCuisine(cuisine) {
      let restaurant_list;
      if (this.$cookies.get("user_token") !== null) {
        restaurant_list = await getRestaurants(this.$cookies.get("user_token"));
      } else {
        restaurant_list = await getRestaurantsUnsecured();
      }
      let matching_result = [];

      for (let i = 0; i < restaurant_list.length; i++) {
        restaurant_list[i].genres.forEach(genre => {
          if (
            genre.toUpperCase().indexOf(cuisine.toUpperCase()) > -1 &&
            (restaurant_list[i].name
              .toUpperCase()
              .indexOf(this.search_input.toUpperCase()) > -1 ||
              restaurant_list[i].address
                .toUpperCase()
                .indexOf(this.search_input.toUpperCase()) > -1)
          ) {
            matching_result.push(restaurant_list[i]);
          }
        });
      }
      this.restaurant_list = matching_result;
      this.updateRestaurantList();
    },

    async clearSearch() {
      this.search_input = "";
      if (this.$cookies.get("user_token") !== null) {
        this.restaurant_list = await getRestaurants(
          this.$cookies.get("user_token")
        );
      } else {
        this.restaurant_list = await getRestaurantsUnsecured();
      }
      this.updateRestaurantList();
    }
  },

  watch: {
    restaurants: function(newVal) {
      this.restaurants = newVal;
    }
  },

  created() {
    this.searchRestaurants();
  }
};
</script>

<style scoped>
.filters {
  display: flex;
  flex-direction: row;
}
.filter {
  margin-right: 10px;
  margin-top: 25px;
  background-color: white;
  border-radius: 5px;
}
.menu {
  position: absolute;
  background-color: white;
  z-index: 1;
  border-style: groove;
  margin-top: 5px;
  border-radius: 5px;
  height: 150px;
  overflow: scroll;
}

.home-search {
  width: 95%;
  border-left-style: solid;
  border-top-style: solid;
  border-bottom-style: solid;
  border-right-style: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  margin-bottom: 15px;
  margin-top: 15px;
  margin-left: 15px;
  outline: none;
  box-shadow: none;
}

.clear-button {
  background-color: white;
  border-left-style: none;
  border-top-style: solid;
  border-bottom-style: solid;
  border-right-style: solid;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  outline: none;
  box-shadow: none;
}

.hidden {
  display: none;
}

.filter-item {
  cursor: pointer;
}
</style>
