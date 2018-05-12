import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Tasks from "./views/Tasks";

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
      name: "tasks",
      component: Tasks
    }
  ]
});
