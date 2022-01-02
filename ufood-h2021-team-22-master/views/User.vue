<template>
  <div class="user">
    <visit-modal
      v-bind:modalVisitId="modalVisitId"
      v-bind:userId="userId"
      v-if="modalClick"
      @closeModal="closeModal"
    />

    <div class="box px-3 is-uppercase" id="profile-header">
      <div id="profile-info">
        <h1>Profil de l'usager</h1>
        <p class="title is-2">{{ user.name }}</p>
        <p class="subtitle is-6">{{ user.email }}</p>
      </div>
      <div v-if="userId !== id && loggedIn === true" id="follow-options">
        <button v-if="beingFollowed === true" class="button is-warning" id="unfollow-button" v-on:click="unfollow">Unfollow</button>
        <button v-else class="button is-warning is-inverted is-outlined" id="follow-button" v-on:click="follow">Follow</button>
      </div>
    </div>

    <div class="columns is-desktop">
      <div class="column" id="user-column">
        <div class="box" id="score">
          <h1 class="title">Score: {{ user.rating }}</h1>
        </div>

        <div class="box" id="visits-table">
          <h1 class="title">Mes visites</h1>
          <table class="table">
            <thead>
              <th>Restaurants</th>
              <th>Nombre de visites</th>
              <th>Mes visites</th>
            </thead>
          </table>
          <user-visits
            v-for="restaurant in restaurants"
            v-bind:key="restaurant.id"
            v-bind:restaurant="restaurant"
            v-bind:user="user"
            v-bind:id="id"
            @openModal="openModal"
          />
        </div>
      </div>

      <div class="column" id="user-column">
        <div class="box" id="followers-section">
          <h2 class="title">Followers</h2>
          <p v-for="follower in user.followers" v-bind:key="follower.id">
            <router-link :to="{ name: 'User', params: { id: follower.id}}">{{ follower.name }}</router-link>
          </p>
        </div>
        <div class="box">
          <h2 class="title">Following</h2>
          <p v-for="followee in user.following" v-bind:key="followee.id">
            <router-link :to="{ name: 'User', params: { id: followee.id}}">{{ followee.name }}</router-link>
          </p>
        </div>

        <div class="box" id="lists-table">
          <h2 class="title">Mes listes</h2>

          <div v-if="id === userId" class="box" id="create-list">
            <h1 class="title is-6">Ajouter une liste</h1>
            <input
              class="input is-primary"
              id="list-name-input"
              v-model="listName"
              type="text"
              placeholder="Nom de la liste"
            />
            <p id="alert-message-create" style="display: none"></p>

            <button class="button is-warning" v-on:click="createList">
              Créer
            </button>
          </div>

          <list-favorites
            v-for="list in listFavorites"
            v-bind:key="list.id"
            v-bind:list="list"
            v-bind:restaurants="restaurants"
            v-bind:user="user"
            v-bind:userId="userId"
            v-bind:id="id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListFavorites from "@/components/user/ListFavorites.vue";
import * as api from "../repo/api";
import * as followApi from "../repo/followApi";
import UserVisits from "@/components/user/UserVisits.vue";
import VisitModal from "@/components/user/VisitModal.vue";

export default {
  name: "User",

  props: ["id","userId", "restaurants", "loggedIn"],

  data() {
    return {
      user: [],
      visits: [],
      listFavorites: [],
      modalClick: false,
      modalVisitId: "",
      listName: "",
      currentUserFollowing: [],
      beingFollowed: false,
    };
  },

  components: {
    ListFavorites,
    UserVisits,
    VisitModal
  },

  methods: {
    openModal(value1, value2) {
      this.modalClick = value1;
      this.modalVisitId = value2;
    },

    closeModal(value) {
      this.modalClick = value;
    },

    createList: async function() {

      for (const listFav of this.listFavorites) {
        if (listFav.name === this.listName) {
          document.getElementById("alert-message-create").style.display = "flex";
          document.getElementById("alert-message-create").innerHTML = "Ce nom de liste existe déjà."
          return;
        }
      }

      if (this.listName === "") {
        document.getElementById("alert-message-create").style.display = "flex";
        document.getElementById("alert-message-create").innerHTML = "Veuillez écrire un nom."
      } else {
        document.getElementById("alert-message-create").style.display = "none";
        const response = await api.createListFavorites(
          this.listName,
          this.user.email,
          this.$cookies.get('user_token')
        );
        console.log(response);
        this.listName = "";
        return response;
      }
    },

    updateUserProfile() {
      if (this.id === this.userId) {
        this.currentUserFollowing = [];
        api.getUser(this.id, this.$cookies.get('user_token')).then(userInfo => {
          this.user = userInfo;
          for (let i in userInfo.following) {
            this.currentUserFollowing.push(userInfo.following[i].id);
          }
        });

        api.getUserVisits(this.id, this.$cookies.get('user_token')).then(response => {
          this.visits = response.items;
        });

        api.getListsForUser(this.id, this.$cookies.get('user_token')).then(response => {
          this.listFavorites = response;
        });
      } else {

        this.beingFollowed = false;
        for (let i in this.currentUserFollowing) {
          if (this.id === this.currentUserFollowing[i]) {
            this.beingFollowed = true;
          }
        }

        api.getUserUnsecure(this.id).then(userInfo => {
          this.user = userInfo;
        });

        api.getUserVisitsUnsecure(this.id).then(response => {
          this.visits = response.items;
        });

        api.getListsForUserUnsecure(this.id).then(response => {
          this.listFavorites = response;
        });
      }
    },

    follow: async function() {
      this.beingFollowed = true;
      const res1 = await followApi.followUser(this.id, this.$cookies.get('user_token'));
      
      const res2 = await api.getUserUnsecure(this.id);
      this.user = res2;
    },
    unfollow: async function() {
      this.beingFollowed = false;
      const res1 = await followApi.unfollowUser(this.id, this.$cookies.get('user_token'));
      
      const res2 = await api.getUserUnsecure(this.id);
      this.user = res2;
    }
  },

  watch: {
    '$route'() {
      this.updateUserProfile();
    }
  },

  created() {
    this.updateUserProfile();
  },

  updated() {
    if (this.id === this.userId) {
      api.getListsForUser(this.id, this.$cookies.get('user_token')).then(response => {
        this.listFavorites = response;
      });
    } 
  }
};
</script>

<style>
table {
  table-layout: fixed;
  width: 100%;
}

#profile-header {
  background-color: hsl(171, 100%, 41%);
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 40px;
  color: white;
}

#follow-button {
  padding-inline: 40px;
  margin-right: 40px;
  margin-top: 30px;
}

#unfollow-button {
  padding-inline: 40px;
  margin-right: 40px;
  margin-top: 30px;
}

#user-column {
  padding-inline: 60px;
}

#score {
  background-color: hsl(48, 100%, 67%);
  text-align: center;
}

#visits-table {
  background-color: hsl(171, 44%, 86%);
  max-height: 600px;
  overflow-y: auto;
}

#lists-table {
  background-color: hsl(171, 44%, 86%);
}

#list-name-input {
  margin-bottom: 10px;
}

#followers-section {
  max-height: 200px;
  overflow-y: auto;
}

#alert-message-create {
  color: red;
  margin-top: 10px;
  margin-bottom: 20px;
}

</style>
