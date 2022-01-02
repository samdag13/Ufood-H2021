<template>
  <div>
    <Banner
      v-bind:nameResto="nameResto"
      v-bind:price_range="price_range"
      v-bind:genres="genres"
      v-bind:userId="userId"
      v-bind:restoId="restoId"
    ></Banner>
    <SideInfo
      v-bind:nameResto="nameResto"
      v-bind:address="address"
      v-bind:tel="tel"
      v-bind:hours="hours"
      v-bind:rating="rating"
      v-bind:picURL="picURL"
      v-bind:resto-type="genres"
    ></SideInfo>
    <Localisation v-bind:position="position"></Localisation>
  </div>
</template>

<script>
import restoApi from "../../../repo/restoApi";
import Banner from "./Banner";
import SideInfo from "./SideInfo";
import Localisation from "./Localisation";

export default {
  name: "resto",

  components: { SideInfo, Banner, Localisation },

  data: () => ({
    nameResto: "",
    price_range: 0,
    genres: [],
    address: "",
    tel: "",
    hours: [],
    rating: 0,
    picURL: "",
    position: {},
    restoId: ""
  }),

  props: ["userId", "restId"],

  async created() {
    const response = await restoApi.getRestoInfo(this.restId);
    this.nameResto = response.name;
    this.price_range = response.price_range;
    this.genres = response.genres;
    this.address = response.address;
    this.tel = response.tel;
    this.hours = response.opening_hours;
    this.rating = response.rating;
    this.picURL = response.pictures[0];
    this.position = {
      lat: response.location.coordinates[1],
      lng: response.location.coordinates[0]
    };
    this.restoId = response.id;
  }
};
</script>

<style>

</style>
