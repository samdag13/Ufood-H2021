<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <Resto
      v-bind:userId="userId"
      v-bind:restId="restId"
    ></Resto>
  </div>
</template>

<script>
import Resto from "@/components/restaurant/Resto";
export default {
  name: "Restaurant",
  components: {
    Resto
  },
  props: ["userId", "restId"]
};
</script>

<style>

@media (max-width: 800px) {
  .map-div {
    margin-left: 0px;
    width: 100%;
  }
}
</style>
