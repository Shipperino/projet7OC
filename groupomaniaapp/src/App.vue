<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "app",
  created: function () {
    let token = localStorage.getItem("UserToken");
    axios.defaults.headers.common["Authorization"] = token;
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html {
 background-color:#F3F3F3;
}
body {
 background-color:#F3F3F3;
}
</style>
