<template>
<div style="max-width: 60%;" class="container">

<form @submit.prevent="loadTasks">
<input type="text" placeholder="New task description" v-model="newTask" name="text" id="">
&nbsp;&nbsp;
<button @click="addTask">Add task</button>
</form>

<h3>Current Tasks:</h3>
<div v-if="typeof(tasks) === 'object'">
<table class="table table-striped">
<thead>
  <th class="text-center">No.#</th>
  <th class="text-center">Task</th>
</thead>
<tbody>
<tr v-for="task in tasks.slice().reverse()" :key="task.id">
<td>{{task.id}}</td>
<td>{{task.description}}</td>
</tr>
</tbody>
</table>
</div>
<div v-else>
  <h3 class="text-left">Login to connect with the API !</h3>
</div>
<hr>
<div :key="msg.date" v-for="msg in errors" class="alert alert-danger alert-dismissible fade in out">
    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
  {{msg.message}}
</div>
</div>
</template>

<script>
import axios from "axios";
const API_URL = "http://127.0.0.1:8080";

export default {
  name: "Tasks",
  data: function() {
    return {
      newTask: "",
      tasks: "API not authorized, login first!",
      errors: []
    };
  },
  mounted: function() {
    this.loadTasks();
  },
  methods: {
    addTask() {
      if (this.newTask == "") return; // Return if empty task description
      axios({
        method: "POST",
        url: API_URL + "/tasks",
        data: {
          description: this.newTask
        },
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token")
        }
      })
        .then(res => {
          console.log(res);
          this.newTask = "";
          this.loadTasks();
        })
        .catch(err => {
          this.errors.push({
            message: "Couldn't contact API, login or try again.",
            date: new Date().getMilliseconds().toString()
          });
          console.log(err);
        });
    },
    loadTasks() {
      axios({
        method: "GET",
        url: API_URL + "/tasks",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token")
        }
      })
        .then(res => res.data)
        .then(data => {
          this.tasks = data;
        });
    }
  }
};
</script>
