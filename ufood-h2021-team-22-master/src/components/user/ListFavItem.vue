<template>
  <div class="list-fav-item">
    <router-link :to="{ name: 'Restaurant', params: { restId: restaurant.id }}" class="resto-name">{{
      restaurantName
    }}</router-link>
    <button
      v-if="id === userId"
      class="delete"
      aria-label="delete"
      v-on:click="deleteResto"
    ></button>
  </div>
</template>

<script>
import * as api from "../../../repo/api";

export default {
  name: "list-fav-item",
  props: ["userId", "restaurant", "restaurants", "list", "id"],
  data() {
    return {
      restaurantName: ""
    };
  },
  methods: {
    deleteResto: async function() {
      const response = await api.deleteRestaurantFromFavorites(
        this.list.id,
        this.restaurant.id
      );
      return response;
    }
  },

  created() {
    for (let i in this.restaurants) {
      if (this.restaurants[i].id === this.restaurant.id) {
        this.restaurantName = this.restaurants[i].name;
      }
    }
  },

  updated() {
    for (let i in this.restaurants) {
      if (this.restaurants[i].id === this.restaurant.id) {
        this.restaurantName = this.restaurants[i].name;
      }
    }
  }
};
</script>

<style>
.list-fav-item {
  display: flex;
  justify-content: space-between;
}
</style>
