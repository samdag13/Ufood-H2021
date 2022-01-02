<template>
  <img
    class="image-resto"
    name="image1"
    src="../../assets/not-found-image.jpg"
  />
</template>

<script>
export default {
  name: "photo",

  props: ["picURL"],

  watch: {
    picURL: function() {
      document.getElementsByName("image1")[0].src = this.picURL;
    }
  }
};
</script>

<style></style>
