<template>
  <div class="visit-link" v-on:click="openModal">{{ formattedDate }}</div>
</template>

<script>
import moment from "moment";

export default {
  name: "visit-link",
  props: ["visit"],
  computed: {
    formattedDate() {
      moment.locale("fr-ca");
      return moment(this.visit.date).format("LL");
    }
  },
  methods: {
    openModal() {
      this.$emit("openModal", true, this.visit.id);
    }
  }
};
</script>

<style></style>
