<template>
  <div class="register">
    <div class="hero is-fullheight is-primary" id="main-section">
      <div class="hero-body">
        <div class="container">
          <div class="box">
            <h3 class="title has-text-black has-text-centered">
              Enregistrement - nouveau compte
            </h3>
            <hr class="login-hr" />

            <div class="field">
              <label class="label">Nom</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Nom"
                  name="name"
                  id="name"
                  v-model="name"
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Email</label>
              <input
                class="input"
                type="email"
                placeholder="Email"
                name="email"
                id="email"
                v-model="email"
              />
            </div>

            <div class="field">
              <label class="label" for="password">Mot de passe</label>
              <input
                class="input"
                type="password"
                name="password"
                id="password"
                v-model="password"
              />
            </div>

            <button class="button is-primary" v-on:click="signUp">
              Créer le compte
            </button>

            <div class="help is-danger" id="error-message"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from "../repo/api";
export default {
  name: "Register",
  data() {
    return {
      userId: null,
      token: null,
      name: null,
      email: null,
      password: null,
      users: []
    };
  },
  methods: {
    signUp: async function() {
      document.getElementById("error-message").innerHTML = "";

      if (
        !this.email ||
        this.email.trim() === "" ||
        !this.password ||
        this.password.trim() === "" ||
        !this.name ||
        this.name.trim() === ""
      ) {
        document.getElementById("error-message").innerHTML = "Champ manquant";
        return;
      }

      if (!this.validEmail(this.email)) {
        document.getElementById("error-message").innerHTML =
          "Courriel invalide";
        return;
      }

      if (this.findUserInUsers()) {
        document.getElementById("error-message").innerHTML =
          "Utilisateur deja existant";
        return;
      }

      const res = await api.signup(this.name, this.email, this.password);
      this.userId = await res.id;

      const res2 = await api.login(this.email, this.password);
      this.token = await res2.token;
      this.$cookies.set("user_token", this.token);
      this.$router.push({ path: "/" });
      this.$emit("loginInfo", true, this.userId);
    },

    validEmail: function(email) {
      // eslint-disable-next-line no-useless-escape
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        return true;
      else return false;
    },

    findUserInUsers: function() {
      for (let i in this.users) {
        if (this.email === this.users[i].email) {
          return true;
        }
      }
      return false;
    }
  },

  created() {
    api.getUsersUnsecured().then(response => {
      this.users = response;
    });
  }
};
</script>

<style scoped>
#main-section {
  display: flex;
  flex-direction: column;
}
</style>
