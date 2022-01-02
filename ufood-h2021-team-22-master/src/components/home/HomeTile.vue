<template>
  <div class="column home-tile has-background-grey-lighter my-3 mx-2 pb-6 ">
    <router-link
      :to="{ name: 'Restaurant', params: { restId: restaurant.id } }"
    >
      <img
        class="img-restaurant"
        v-bind:src="current_pic"
        v-on:click="updateCurrentId()"
      />
    </router-link>

    <div class="container">
      <button type="button" class="prev" v-on:click="prev()">
        <i class="fas fa-arrow-circle-left"></i>
      </button>

      <button type="button" class="next" v-on:click="next()">
        <i class="fas fa-arrow-circle-right"></i>
      </button>

      <button
        type="button"
        class="visit"
        v-bind:restaurant="restaurant.id"
        v-on:click="toggleModal()"
      >
        Enregistrer une visite
      </button>
    </div>

    <p>
      {{ restaurant.name }}
    </p>
    <p>
      {{ restaurant.address }}
    </p>

    <span
      v-for="index in Math.round(restaurant.rating)"
      v-bind:key="index + restaurant.id"
    >
      <i class="fas fa-star"></i>
    </span>
    <span
      v-for="index in 5 - Math.round(restaurant.rating)"
      v-bind:key="restaurant.id + index"
    >
      <i class="far fa-star"></i>
    </span>

    <p><i class="fas fa-utensils"></i> Cuisine(s):</p>
    <li
      v-for="genre in restaurant.genres"
      v-bind:key="genre + restaurant.place_id"
    >
      {{ genre }}
    </li>
    <span
      v-for="index in restaurant.price_range"
      v-bind:key="index + restaurant.place_id"
    >
      <i class="fas fa-dollar-sign"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: "home-tile",

  props: ["restaurant"],

  data: () => ({
    image: "",
    id: 0,
    current_pic: "",
    index: 0,
    current_user: ""
  }),

  methods: {
    next() {
      this.index++;
      this.diplayCurrentImg();
    },

    prev() {
      this.index--;
      this.diplayCurrentImg();
    },

    diplayCurrentImg() {
      let list_length = this.restaurant.pictures.length;
      let current_index = Math.abs(this.index % list_length);
      this.current_pic = this.restaurant.pictures[current_index];
    },

    updateCurrentId() {
      this.$emit("restaurant-id", this.restaurant);
    },

    toggleModal() {
      this.updateCurrentId();
      const modal = document.getElementById("home-modal");
      modal.classList.toggle("is-active");
    }
  },

  created() {
    this.diplayCurrentImg();
  }
};
</script>

<style scoped>
.home-tile:hover {
  color: #00b3b3;
}
.home-tile {
  border: 1px solid transparent;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  cursor: pointer;
  line-height: 1.5;
  max-height: fit-content;
  max-width: 437px;
  position: relative;
  color: black;
}
.img-restaurant {
  width: stretch;
  height: 320px;
}
.visit {
  position: absolute;
  right: 0;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 20px;
  cursor: pointer;
}

.prev {
  border-radius: 20px;
  margin-right: 7px;
  cursor: pointer;
}
.next {
  border-radius: 20px;
  margin-left: 7px;
  cursor: pointer;
}
</style>
