import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Tasks from "./components/Tasks";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/tasks",
      name: "Tasks(Authorized Endpoint)",
      component: Tasks
    }
  ]
});
