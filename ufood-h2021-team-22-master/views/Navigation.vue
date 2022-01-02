<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img
          src="../src/assets/logo.png"
          alt="site logo"
          style="max-height: 100px"
        />
      </a>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        v-on:click="responsiveMenu()"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" id="nav-links">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item" id="home">Accueil</router-link>
        <router-link to="/restaurant" class="navbar-item" id="restaurant"
          >Restaurant</router-link
        >
        <div class="navbar-item field" id="search-bar">
          <p class="control has-icons-right">
            <input
              class="input"
              type="text"
              list="data_list"
              v-model="search_input"
              placeholder="Rechercher utilisateur..."
              v-on:keyup="searchUser()"
              v-on:click="searchUser()"
            />
            <datalist id="data_list"></datalist>
          </p>
          <button class="clear-button" v-on:click="clearSearch()" type="button">
            <span class="icon is-medium is-right">
              <i class="material-icons left">close</i>
            </span>
          </button>
        </div>
      </div>

      <div class="navbar-end">
        <div v-if="loggedIn === false">
          <router-link to="/register" class="navbar-item" id="register"
            >Enregistrement</router-link
          >
          <router-link to="/login" class="navbar-item" id="login"
            >Se connecter</router-link
          >
        </div>

        <div v-if="loggedIn === true">
          <p class="navbar-item" id="displayName">{{ username }}</p>
          <router-link
            :to="{ name: 'User', params: { id: userId } }"
            class="navbar-item"
            id="account"
            >Mon compte</router-link
          >
          <button
            v-on:click="logout()"
            class="navbar-item"
            id="button-disconnect"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script type="text/javascript" src="../repo/nav.js"></script>

<style>
#button-disconnect {
  border: none;
  background: none;
  padding-left: 50px;
}

#account {
  border: none;
  background: none;
  padding-left: 50px;
}

#home {
  border: none;
  background: none;
  padding-left: 50px;
}

#restaurant {
  border: none;
  background: none;
  padding-left: 50px;
  display: none;
}

#search-bar {
  padding-left: 50px;
}

#account:hover {
  color: #00b3b3;
}

#home:hover {
  color: #00b3b3;
}

#restaurant:hover {
  color: #00b3b3;
}

#button-disconnect:hover {
  color: #00b3b3;
}

#displayName {
  font-weight: bold;
  font-size: 30px;
  color: #00b3b3;
}

@media screen and (max-width: 680px) {
  #home {
    padding-left: 13px;
  }

  #restaurant {
    padding-left: 13px;
  }

  .navbar-burger {
    display: inline-block;
  }

  #search-bar {
    padding-left: 13px;
    width: 400px;
  }

  #search-bar span {
    width: 0px;
    display: flex;
  }

  #button-disconnect {
    padding-left: 13px;
    width: 350px;
  }

  #account {
    width: 350px;
    padding-left: 13px;
  }

  .navbar {
    padding-bottom: 20px;
  }
}
</style>
