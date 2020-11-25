<template>
  <div id="signup">
    <logins/>
    <registerComponent  />
  </div>
</template>

<script>
import logins from "../components/login"
import registerComponent from "../components/signup.vue"
// import { mapState } from "vuex"
export default {
  name: "signup",
  components: {
    registerComponent,logins
    },
 
};
</script>

<style scoped>
#secure {
  background-color: #ffffff;
  border: 1px solid #cccccc;
  padding: 20px;
  margin-top: 10px;
}
</style>