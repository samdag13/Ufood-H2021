<template>
  <div class="modal" id="home-modal">
    <div class="modal-background"></div>
    <div class="modal-content is-clipped">
      <div>
        <h2 class="container title" style="text-align: center">
          Évaluez votre visite <br />
          chez {{ restaurant.name }}
        </h2>
        <table id="table-vis">
          <tr>
            <th colspan="5">Évaluation* :</th>
          </tr>
          <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
          </tr>
          <tr>
            <th>
              <input type="radio" name="radioEval" id="eval1" />
            </th>
            <th>
              <input type="radio" name="radioEval" id="eval2" />
            </th>
            <th>
              <input
                type="radio"
                name="radioEval"
                id="eval3"
                checked="checked"
              />
            </th>
            <th>
              <input type="radio" name="radioEval" id="eval4" />
            </th>
            <th>
              <input type="radio" name="radioEval" id="eval5" />
            </th>
          </tr>
          <tr>
            <th colspan="5">Commentaire* :</th>
            <th colspan="5">Date* :</th>
          </tr>
          <tr>
            <th colspan="5">
              <input type="text" v-model="comment" style="width: 300px;" />
            </th>
            <th colspan="5">
              <input type="date" id="date-eval" />
            </th>
          </tr>

          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th>
              <button
                class="button is-primary"
                id="visite-button"
                v-on:click="addVisite"
              >
                Ajouter une visite!
              </button>
            </th>
          </tr>
        </table>
      </div>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @click="closeModal()"
    ></button>
  </div>
</template>

<script>
import visiteApi from "../../../repo/visiteApi";

export default {
  name: "home-modal",
  props: ["userId", "restaurant"],
  data: () => ({
    comment: ""
  }),
  methods: {
    closeModal() {
      const modal = document.getElementById("home-modal");
      modal.classList.remove("is-active");
    },
    addVisite: async function() {
      var evalNum = 0;
      if (document.getElementById("eval1").checked) {
        evalNum = 1;
      } else if (document.getElementById("eval2").checked) {
        evalNum = 2;
      } else if (document.getElementById("eval3").checked) {
        evalNum = 3;
      } else if (document.getElementById("eval4").checked) {
        evalNum = 4;
      } else if (document.getElementById("eval5").checked) {
        evalNum = 5;
      }
      if (this.comment === "" && this.userId !== "0") {
        alert("Veuillez ajouter un commentaire.");
      } else if (this.userId === "0") {
        alert("Veuillez vous connecter.");
      } else if (this.userId === "0" && this.comment !== "") {
        alert("Veuillez vous connecter.");
      } else if (
        document.getElementById("date-eval").value === "" &&
        this.comment !== "" &&
        this.userId !== "0"
      ) {
        alert("Veuillez entrer une date.");
      } else if (
        document.getElementById("date-eval").value !== "" &&
        this.comment !== "" &&
        evalNum === 0 &&
        this.userId !== "0"
      ) {
        alert("Veuillez entrer une évaluation.");
      } else {
        alert("Visite ajoutée!");
        const response = await visiteApi.postVisiteResto(
          this.userId,
          this.restaurant.id,
          this.comment,
          evalNum,
          document.getElementById("date-eval").value
        );
        this.closeModal();
        this.comment = "";
        return response;
      }
    }
  }
};
</script>

<style scoped>
.modal-content {
  background-color: white;
  height: auto;
  border-radius: 15px;
}
.title {
  color: black;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  padding-top: 25px;
}

#visite-button {
  margin-top: 25px;
}
</style>
