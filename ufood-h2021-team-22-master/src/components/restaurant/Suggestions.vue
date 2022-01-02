<template>
  <div class="box" id="sugg-div">
    <div id="para"></div>

    <p id="sugg-para1" v-on:click="updateCurrentId1()"></p>
    <p id="sugg-para2" v-on:click="updateCurrentId2()"></p>

    <p id="sugg-para3" v-on:click="updateCurrentId3()"></p>
  </div>
</template>

<script>
import SuggApi from "../../../repo/SuggestionApi";

export default {
  name: "Suggestions",

  props: ["restoType", "nameResto"],

  data: () => ({
    Sugg1Name: "",
    Sugg2Name: "",
    Sugg3Name: "",
    Sugg1ID: "",
    Sugg2ID: "",
    Sugg3ID: ""
  }),

  watch: {
    restoType: async function() {
      const response = await SuggApi.recommendedRestos();
      let suggNum = 1;

      for (let i = 0; i < response.items.length; i++) {
        if (
          this.restoType[0] == response.items[i].genres[0] ||
          (this.restoType[1] == response.items[i].genres[0] &&
            this.restoType[1] != null) ||
          (this.restoType[0] == response.items[i].genres[1] &&
            response.items[i].genres[1] != null) ||
          (this.restoType[1] == response.items[i].genres[1] &&
            response.items[i].genres[1] != null &&
            this.restoType[1] != null)
        ) {
          if (response.items[i].name != this.nameResto) {
            if (suggNum == 1) {
              this.Sugg1ID = response.items[i].id;
              this.Sugg1Name = response.items[i].name;
              suggNum++;
            } else if (suggNum == 2) {
              this.Sugg2ID = response.items[i].id;
              this.Sugg2Name = response.items[i].name;
              suggNum++;
            } else if (suggNum == 3) {
              this.Sugg3ID = response.items[i].id;
              this.Sugg3Name = response.items[i].name;
              suggNum++;
            }
          }
        }
      }

      let paragraph = document.createElement("P");
      let text = document.createTextNode("Restaurants similaires:");
      paragraph.appendChild(text);

      let textSugg1 = document.createTextNode(this.Sugg1Name);
      let textSugg2 = document.createTextNode(this.Sugg2Name);
      let textSugg3 = document.createTextNode(this.Sugg3Name);

      document.getElementById("para").appendChild(paragraph);
      document.getElementById("sugg-para1").appendChild(textSugg1);
      document.getElementById("sugg-para2").appendChild(textSugg2);
      document.getElementById("sugg-para3").appendChild(textSugg3);
    }
  },
  methods: {
    updateCurrentId1() {
      this.$emit("restaurant-id", this.Sugg1ID);
    },
    updateCurrentId2() {
      this.$emit("restaurant-id", this.Sugg2ID);
    },
    updateCurrentId3() {
      this.$emit("restaurant-id", this.Sugg3ID);
    }
  }
};
</script>

<style scoped></style>
