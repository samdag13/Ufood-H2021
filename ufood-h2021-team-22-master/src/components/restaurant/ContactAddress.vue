<template>
  <div class="box" id="info-resto">
    <p>{{ address }}</p>
    <p>{{ tel }}</p>
  </div>
</template>

<script>
export default {
  name: "contactAdress",

  props: ["address", "tel"]
};
</script>

<style>
#info-resto {
  background-color: aqua;
}
</style>
