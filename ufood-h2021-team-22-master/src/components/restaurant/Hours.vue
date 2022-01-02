<template>
  <div class="box" id="info-hour">
    <p>
      <span id="mon">{{ mon }}</span
      ><br /><span id="tue">{{ tue }}</span
      ><br /><span id="wed">{{ wed }}</span
      ><br />
      <span id="thu">{{ thu }}</span
      ><br /><span id="fri">{{ fri }}</span
      ><br /><span id="sat">{{ sat }}</span
      ><br />
      <span id="sun">{{ sun }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "hourss",

  props: ["hours"],

  data: () => ({
    mon: "",
    tue: "",
    wed: "",
    thu: "",
    fri: "",
    sat: "",
    sun: ""
  }),

  watch: {
    hours: function() {
      if (this.hours.monday === null) {
        this.mon = "Lundi: Closed";
      } else {
        this.mon = "Lundi: " + this.hours.monday;
      }
      if (this.hours.tuesday === null) {
        this.tue = "Mardi: Closed";
      } else {
        this.tue = "Mardi: " + this.hours.tuesday;
      }
      if (this.hours.wednesday === null) {
        this.wed = "Mercredi: Closed";
      } else {
        this.wed = "Mercredi: " + this.hours.wednesday;
      }
      if (this.hours.thursday === null) {
        this.thu = "Jeudi: Closed";
      } else {
        this.thu = "Jeudi: " + this.hours.thursday;
      }
      if (this.hours.friday === null) {
        this.fri = "Vendredi: Closed";
      } else {
        this.fri = "Vendredi: " + this.hours.friday;
      }
      if (this.hours.saturday === null) {
        this.sat = "Samedi: Closed";
      } else {
        this.sat = "Samedi: " + this.hours.saturday;
      }
      if (this.hours.sunday === null) {
        this.sun = "Dimanche: Closed";
      } else {
        this.sun = "Dimanche: " + this.hours.sunday;
      }
    }
  }
};
</script>

<style></style>
