<template>
  <div class="box" id="price-range-div">
    <div>
      <h3 class="title is-3">{{ nameResto }}</h3>
      <div class="genresDiv">
        <Genre
          v-for="genre in genres"
          v-bind:genre="genre"
          v-bind:key="genre"
        ></Genre>
      </div>
      <p>
        <i class="fas fa-utensils fa-lg"></i>
        &nbsp;
        <i class="fas fa-dollar-sign" id="dollar1"></i>
        <i class="fas fa-dollar-sign" id="dollar2"></i>
        <i class="fas fa-dollar-sign" id="dollar3"></i>
      </p>
    </div>
    <div class="ban-button-div">
      <button
        class="button is-primary"
        id="visite-button"
        v-on:click="addVisite"
      >
        Ajouter une visite!
      </button>
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
            <input type="radio" name="radioEval" id="eval1" /></th>
          <th>
            <input type="radio" name="radioEval" id="eval2" /></th>
          <th>
            <input type="radio" name="radioEval" id="eval3" checked="checked" />
          </th>
          <th>
            <input type="radio" name="radioEval" id="eval4" /></th>
          <th>
            <input type="radio" name="radioEval" id="eval5" /></th>
        </tr>
        <tr>
          <th colspan="5">Commentaire* :</th>
        </tr>
        <tr>
          <th colspan="5">
            <input type="text" id="commentaire-eval" />
          </th>
        </tr>
        <tr>
          <th colspan="5">Date* :</th>
        </tr>
        <tr>
          <th colspan="5">
            <input type="date" id="date-eval" />
          </th>
        </tr>
      </table>
      <p id="alert-message-visite" style="display: none"></p>
    </div>
    <div class="ban-button-div">
      <button class="button is-primary" id="fav-button" v-on:click="addFav">
        Ajouter aux favoris!
      </button>
      <p class="fav-button-helpers">Liste* :</p>
      <select class="form-control" v-model="selected" id="option-list">
        <option>
          Choisir une liste
        </option>
        <option v-for="list in listFavorites" v-bind:value="list.id">{{
          list.name
        }}</option>
      </select>
      <p id="alert-message-favoris" style="display: none"></p>
    </div>
  </div>
</template>

<script>
import Genre from "./Genre";
import visiteApi from "../../../repo/visiteApi";
import favApi from "../../../repo/favApi";
import * as api from "../../../repo/api";

export default {
  name: "banner",
  components: { Genre },
  props: [
    "nameResto",
    "genres",
    "price_range",
    "userId",
    "restoId",
    "listName"
  ],
  data() {
    return {
      selected: "Choisir une liste",
      listFavorites: []
    };
  },
  beforeMount() {
    api.getListsForUser(this.userId).then(response => {
      this.listFavorites = response;
    });
  },
  created() {
    if (this.price_range >= 1) {
      document.getElementById("dollar1").style.color = "#A1A1A1";
    }
    if (this.price_range >= 2) {
      document.getElementById("dollar2").style.color = "#A1A1A1";
    }
    if (this.price_range >= 3) {
      document.getElementById("dollar3").style.color = "#A1A1A1";
    }
  },
  methods: {
    addFav: async function() {
      var sel = document.getElementById("option-list");
      var list_name = sel.options[sel.selectedIndex].text;
      if (this.userId === "0" && list_name === "Choisir une liste") {
        document.getElementById("alert-message-favoris").style.display = "flex";
        document.getElementById("alert-message-favoris").innerHTML = "Veuillez vous connecter.";
      } else if (list_name === "Choisir une liste" && this.userId !== "0") {
        document.getElementById("alert-message-favoris").style.display = "flex";
        document.getElementById("alert-message-favoris").innerHTML = "Veuillez sélectionnner une liste de favoris.";
      } else {
        document.getElementById("alert-message-favoris").style.display = "none";
        alert(`${this.nameResto} ajouté à la liste ` + list_name + ".");
        const response = await favApi.postFavResto(
          this.userId,
          list_name,
          this.restoId
        );
        return response;
      }
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
      if (
        document.getElementById("commentaire-eval").value === "" &&
        this.userId !== "0"
      ) {
        document.getElementById("alert-message-visite").style.display = "flex";
        document.getElementById("alert-message-visite").innerHTML = "Veuillez ajouter un commentaire."
      } else if (this.userId === "0") {
        document.getElementById("alert-message-visite").style.display = "flex";
        document.getElementById("alert-message-visite").innerHTML = "Veuillez vous connecter."
      } else if (
        this.userId === "0" &&
        document.getElementById("commentaire-eval").value !== ""
      ) {
        document.getElementById("alert-message-visite").style.display = "flex";
        document.getElementById("alert-message-visite").innerHTML = "Veuillez vous connecter."
      } else if (
        document.getElementById("date-eval").value === "" &&
        document.getElementById("commentaire-eval").value !== "" &&
        this.userId !== "0"
      ) {
        document.getElementById("alert-message-visite").style.display = "flex";
        document.getElementById("alert-message-visite").innerHTML = "Veuillez entrer une date."
      } else {
        document.getElementById("alert-message-visite").style.display = "none";
        alert("Visite ajoutée!");
        const response = await visiteApi.postVisiteResto(
          this.userId,
          this.restoId,
          document.getElementById("commentaire-eval").value,
          evalNum,
          document.getElementById("date-eval").value
        );
        console.log(document.getElementById("date-eval").value)
        return response;
      }
    }
  }
};
</script>

<style>
.fav-button-helpers {
  margin-left: 10px;
  margin-bottom: 10px;
}

#table-vis {
  margin-left: 10px;
}

.ban-button-div {
  width: 200px;
  margin: 10px;
}

.genresDiv {
  display: flex;
  flex-direction: row;
}

#price-range-div {
  width: 60%;
  background-color: #e9eeee;
  display: flex;
  flex-direction: row;
}

#fav-button,
#visite-button {
  height: 30px;
  width: 200px;
  margin: 10px;
}

#option-list {
  margin-left: 10px;
}

#alert-message-favoris {
  color: red;
  margin-left: 10px;
  margin-top: 10px;
}

#alert-message-visite {
  color: red;
  margin-left: 10px;
  margin-top: 10px;
}

@media (max-width: 800px) {
  #price-range-div {
    width: 100%;
    flex-direction: column;
    margin-right: 0px;
  }

  #fav-button,
  #visite-button {
    width: 100%;
  }

  .ban-button-div {
    width: 80%;
  }
}
</style>
