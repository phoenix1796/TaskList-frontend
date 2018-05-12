<template>
<div>
<h4>Current Tasks:</h4>
Tasks array(JSON) will appear here:<br>
{{tasks}}
<br>
<br><br><br><hr>
<input type="text" placeholder="New task description" v-model="newTask" name="text" id="">
<button @click="addTask">Add task</button>
<br><br><br>
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
