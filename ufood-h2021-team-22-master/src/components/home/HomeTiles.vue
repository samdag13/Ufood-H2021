<template>
  <div class="home-tiles">
    <div class="columns" v-for="value in rows" v-bind:key="value.id">
      <home-tile
        class="home-tile"
        v-for="restaurant in value"
        v-bind:key="restaurant.id"
        v-bind:restaurant="restaurant"
        @restaurant-id="updateCurrentId($event)"
      />
    </div>
  </div>
</template>

<script>
import HomeTile from "./HomeTile.vue";
export default {
  name: "home-tiles",

  components: {
    HomeTile
  },

  props: ["rows", "restId", "userId"],

  methods: {
    updateCurrentId(resto) {
      this.$emit("restaurant-id", resto);
    }
  },

  data: () => ({
    row_key: 0
  })
};
</script>

<style scoped></style>
