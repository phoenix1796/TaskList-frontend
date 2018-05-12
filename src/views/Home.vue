<template>
  <div class="home">
    <img src="../assets/logo.png">
    <AuthForm/>
  </div>
</template>

<script>
// @ is an alias to /src
import AuthForm from "@/components/AuthForm.vue";

export default {
  name: "home",
  components: {
    AuthForm
  }
};
</script>
