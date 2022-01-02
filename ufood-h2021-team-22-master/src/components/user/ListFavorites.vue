<template>
  <div class="list-favorites">
    <div class="box" id="list-container">
      <div id="list-header">
        <span class="title is-4">{{ list.name }}</span>
        <button
          v-if="id === userId"
          class="delete is-large"
          aria-label="delete"
          v-on:click="deleteList"
        ></button>
      </div>
      <div v-if="id === userId" class="modify-list">
        <input
          class="input is-primary"
          v-model="newName"
          id="modify-list-input"
          type="text"
          placeholder="Nouveau nom"
        />
        <button
          class="button is-primary is-light is-small"
          v-on:click="modifyListName"
        >
          Modifier le nom de la liste
        </button>
      </div>
      <p id="alert-message-modify" style="display: none"></p>

      <div class="resto-list">
        <p>{{ noRestaurants }}</p>
        <list-fav-item
          id="resto-list"
          v-for="restaurant in list.restaurants"
          v-bind:key="restaurant.id"
          v-bind:restaurant="restaurant"
          v-bind:restaurants="restaurants"
          v-bind:list="list"
          v-bind:userId="userId"
          
        />
      </div>
    </div>
  </div>
</template>

<script>
import * as api from "../../../repo/api";
import ListFavItem from "./ListFavItem.vue";

export default {
  components: {
    ListFavItem
  },
  name: "list-favorites",
  props: ["list", "restaurants", "user", "userId", "id"],
  data() {
    return {
      newName: ""
    };
  },
  computed: {
    noRestaurants() {
      if (this.list.restaurants.length === 0) {
        return "Liste vide";
      }
    }
  },
  methods: {
    deleteList: async function() {
      const response = await api.deleteListFavorites(this.list.id, this.$cookies.get('user_token'));
      return response;
    },

    modifyListName: async function() {
      if (this.newName === "") {
        document.getElementById("alert-message-modify").style.display = "flex";
        document.getElementById("alert-message-modify").innerHTML = "Veuillez écrire un nom."
        return;
      } else if (this.newName === this.list.name) {
        document.getElementById("alert-message-modify").style.display = "flex";
        document.getElementById("alert-message-modify").innerHTML = "Ce nom de liste existe déjà."
        return;
      }

      const response = await api.modifyListFavoritesName(
        this.list.id,
        this.newName,
        this.user.email,
        this.$cookies.get('user_token')
      );
      this.newName = "";
      return response;
    }
  }
};
</script>

<style scoped>
#list-header {
  display: flex;
  justify-content: space-between;
}

.modify-list {
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
}

.resto-list {
  margin-bottom: 30px;
}

.list-favorites {
  margin-bottom: 20px;
}

#alert-message-modify {
  color: red;
  margin-top: -10px;
  margin-bottom: 20px;
}
</style
>>
