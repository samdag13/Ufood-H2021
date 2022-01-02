<template>
  <div class="visit-modal">
    <div class="modal-background"></div>
    <div class="modal-content">
      <article class="message is-danger">
        <div class="message-header">
          <p>Information sur la visite</p>
          <button
            class="delete"
            aria-label="delete"
            v-on:click="closeModal"
          ></button>
        </div>
        <div class="message-body">
          <p>Date de la visite: {{ formattedDate }}</p>
          <p>Cote: {{ visit.rating }}</p>
          <p>Commentaire: {{ visit.comment }}</p>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import * as api from "../../../repo/api";
import moment from "moment";

export default {
  name: "visit-modal",
  props: ["userId", "modalVisitId"],
  data() {
    return {
      visit: []
    };
  },
  computed: {
    formattedDate() {
      moment.locale("fr-ca");
      return moment(this.visit.date).format("LL");
    }
  },
  methods: {
    closeModal() {
      this.$emit("closeModal", false);
    }
  },

  created() {
    api
      .getVisitInfo(`${this.userId}`, `${this.modalVisitId}`)
      .then(response => {
        this.visit = response;
      });
  }
};
</script>

<style scoped>
.modal-background {
  overscroll-behavior: inherit;
  height: 100vh;
}

.modal-content {
  position: absolute;
  display: flex;
  margin-top: 60px;
  justify-content: center;
  align-items: center;
  width: 100vw;
}

.modal-background {
  height: 100%;
  overflow-y: hidden;
}
</style>
