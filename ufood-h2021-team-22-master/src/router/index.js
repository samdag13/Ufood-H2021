import Vue from "vue";
import Router from "vue-router";
import VueCookies from "vue-cookies";
import Home from "../../views/Home";
import Restaurant from "../../views/Restaurant";
import User from "../../views/User";
import Login from "../../views/Login";
import Register from "../../views/Register";

Vue.use(Router);

Vue.use(VueCookies);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/restaurant/:restId",
      name: "Restaurant",
      component: Restaurant,
      props: true,
    },
    {
      path: "/user/:id",
      name: "User",
      component: User,
      props: true,
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    }
  ]
});
