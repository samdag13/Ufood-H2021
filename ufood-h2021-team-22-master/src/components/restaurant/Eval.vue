<template>
  <div class="box" id="info-eval">
    <p>Évaluation:</p>
    <span class="fa fa-star" id="star1"></span>
    <span class="fa fa-star" id="star2"></span>
    <span class="fa fa-star" id="star3"></span>
    <span class="fa fa-star" id="star4"></span>
    <span class="fa fa-star" id="star5"></span>
  </div>
</template>

<script>
export default {
  name: "Eval",

  props: ["rating"],

  watch: {
    rating: function() {
      if (this.rating > 0.5) {
        document.getElementById("star1").classList.add("checked");
      }
      if (this.rating > 1.5) {
        document.getElementById("star2").classList.add("checked");
      }
      if (this.rating > 2.5) {
        document.getElementById("star3").classList.add("checked");
      }
      if (this.rating > 3.5) {
        document.getElementById("star4").classList.add("checked");
      }
      if (this.rating > 4.5) {
        document.getElementById("star5").classList.add("checked");
      }
    }
  }
};
</script>

<style>
.checked {
  color: yellow;
}
</style>
