<template>
  <div class="login">
    <div class="hero is-fullheight is-warning" id="main-section">
      <div class="hero-body">
        <div class="container">
          <div class="box">
            <h3 class="title has-text-black has-text-centered">
              Connexion - compte existant
            </h3>
            <hr class="login-hr" />

            <div class="field">
              <label class="label" for="email">Email</label>
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

            <button class="button is-warning" v-on:click="login">Login</button>

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
  name: "Login",
  data() {
    return {
      //errors: [],
      userId: "",
      token: "",
      email: "",
      password: "",
      users: []
    };
  },
  methods: {
    login: async function() {
      document.getElementById("error-message").innerHTML = "";
      if (
        !this.email ||
        this.email.trim() === "" ||
        !this.password ||
        this.password.trim() === ""
      ) {
        document.getElementById("error-message").innerHTML = "Champ manquant";
        return;
      }

      if (!this.validEmail(this.email)) {
        document.getElementById("error-message").innerHTML =
          "Courriel invalide";
        return;
      }

      if (!this.findUserInUsers()) {
        document.getElementById("error-message").innerHTML =
          "Utilisateur inexistant";
        return;
      }

      try {
        const res = await api.login(this.email, this.password);
        this.token = await res.token;
        this.userId = await res.id;
        this.$cookies.set("user_token", this.token);
        this.$router.push({ path: "/" });
        this.$emit("loginInfo", true, this.userId);
      } catch (e) {
        document.getElementById("error-message").innerHTML =
          "Mot de passe invalide";
        return;
      }
    },

    validEmail: function(email) {
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

<style></style>
