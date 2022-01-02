<template>
  <div id="app">
    <nav-menu v-bind:loggedIn="loggedIn" v-bind:userId="userId"> </nav-menu>
    <router-view
      v-bind:userId="userId"
      v-bind:restaurants="restaurants"
      @restaurant-id="updateCurrentId($event)"
      v-bind:restId="restId"
      v-bind:loggedIn="loggedIn" 
      @loginInfo="updateLogin"
    >
    </router-view>
  </div>
</template>

<script>
import "bulma/css/bulma.css";
import Navigation from "../views/Navigation";
import * as api from "../repo/api";

export default {
  name: "app",
  data() {
    return {
      userId: "0",
      loggedIn: false,
      restaurants: [],
      restId: ""
    };
  },
  components: {
    "nav-menu": Navigation
  },
  methods: {

    updateCurrentId(id) {
      this.restId = id;
    },

    updateLogin(value1, value2) {
      this.loggedIn = value1;
      this.userId = value2;
    }
  },

  async created() {
    if (this.$cookies.get("user_token") !== null) {
      await api
        .getRestaurants(this.$cookies.get("user_token"))
        .then(response => {
          this.restaurants = response;
        });
    } else {
      await api.getRestaurantsUnsecured().then(response => {
        this.restaurants = response;
      });
    }
  }

};
</script>

<style></style>
