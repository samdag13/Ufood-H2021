<template>
  <table id="info-table">
    <tr>
      <ContactAdresse
        v-bind:address="address"
        v-bind:tel="tel"
      ></ContactAdresse>
    </tr>
    <tr>
      <Hours v-bind:hours="hours"></Hours>
    </tr>
    <tr>
      <Eval v-bind:rating="rating"></Eval>
    </tr>
    <tr>
      <Suggestions
        v-bind:resto-type="restoType"
        v-bind:nameResto="nameResto"
      ></Suggestions>
    </tr>
    <tr>
      <Photo v-bind:picURL="picURL"></Photo>
    </tr>
  </table>
</template>

<script>
import ContactAdresse from "./ContactAddress";
import Hours from "./Hours";
import Eval from "./Eval";
import Photo from "./Photo";
import Suggestions from "./Suggestions";
export default {
  name: "sideInfo",
  components: { Photo, Eval, Hours, ContactAdresse, Suggestions },

  props: [
    "address",
    "tel",
    "hours",
    "rating",
    "picURL",
    "restoType",
    "nameResto"
  ]
};
</script>

<style>

#info-table {
  float: right;
  width: 30%;
}

@media (max-width: 800px) {
  #info-table {
    float: none;
    width: 100%;
  }
}
</style>
