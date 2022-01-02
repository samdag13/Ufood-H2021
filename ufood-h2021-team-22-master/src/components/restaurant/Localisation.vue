<template>
  <div class="map-div" name="mapDiv">
    <GmapMap
      :center="this.position"
      :zoom="14"
      map-type-id="terrain"
      style="width: 100%; height: 500px"
    >
      <GmapMarker :position="this.position" />
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: "mapgoogle",

  props: ["position"]
};
</script>

<style>
.map-div {
  margin-left: 0px;
  width: 100%;
}
GmapMap {
  witdh: 100%;
  height: 500px;
}
</style>
