import * as api from "../repo/api";

export default {
  props: ["userId", "loggedIn"],
  data() {
    return {
      username: null,
      search_input: "",
      user_list: []
    };
  },
  methods: {
    login() {
      const username = document.getElementById("input-user").value;
      if (username !== null && username !== "") {
        document.getElementById("displayName").innerHTML = username;
        document.getElementById("button-connect").style.display = "none";
        document.getElementById("button-disconnect").style.display = "flex";
        document.getElementById("account").style.display = "flex";
      }
    },
    logout() {
      api.logout();
      this.$cookies.remove("user_token");
      window.location = "/home";
    },
    responsiveMenu() {
      const x = document.getElementById("nav-links");
      if (x.className === "navbar-menu") {
        x.className = "navbar-burger";
      } else {
        x.className = "navbar-menu";
      }
    },
    async searchUser() {
      let user_list;

      if (this.$cookies.get("user_token") !== null) {
        user_list = await api.getUsers(this.$cookies.get("user_token"));
      } else {
        user_list = await api.getUsersUnsecured();
      }

      const search_input = this.search_input;
      let matching_result = [];
      if (search_input !== "") {
        for (let i = 0; i < user_list.length; i++) {
          if (
            user_list[i].name
              .toUpperCase()
              .indexOf(search_input.toUpperCase()) > -1
          ) {
            matching_result.push(user_list[i].name);
          }
        }
        this.user_list = matching_result;
        this.updateUsersDropList();

        let opts = document.getElementById("data_list").childNodes;
        for (let i = 0; i < opts.length; i++) {
          if (opts[i].value === search_input) {
            this.username = search_input;
            for (let i = 0; i < user_list.length; i++) {
              if (user_list[i].name === this.username) {
                await this.$router.push({ path: `/user/${user_list[i].id}` });
              }
            }
            break;
          }
        }
      }
    },
    async clearSearch() {
      this.search_input = "";
      if (this.$cookies.get("user_token") !== null) {
        this.user_list = await api.getUsers(this.$cookies.get("user_token"));
      } else {
        this.user_list = await api.getUsersUnsecured();
      }
      this.updateUsersDropList();
    },

    updateUsersDropList() {
      let list = document.getElementById("data_list");
      list.innerHTML = "";
      this.user_list.forEach(function(item) {
        let option = document.createElement("option");
        option.value = item;
        list.appendChild(option);
      });
    }
  },

  async created() {
    if (this.$cookies.get("user_token") !== null) {
      this.user_list = await api.getUsers(this.$cookies.get("user_token"));
    } else {
      this.user_list = await api.getUsersUnsecured();
    }
  },

  updated() {
    if (this.$cookies.get("user_token") !== null) {
      api.getTokenInfo(this.$cookies.get("user_token")).then(response => {
        this.username = response.name;
      });
    }
  }
};
