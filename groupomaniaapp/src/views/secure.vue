<template>
  <div id="secure">
    <Nav />
    <mypost />
    <template v-for="item in posts">
      <usersposts v-bind:post="item" :key="item.id" />
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import Nav from "../components/Navigation";
import mypost from "../components/mypost.vue";
import usersposts from "../components/userpost.vue";
// import { mapState } from "vuex"
export default {
  name: "secure",
  computed: {
    ...mapGetters(["posts"]),
  },
  components: { mypost, usersposts, Nav },
  mounted() {
    axios.get("http://localhost:3000/api/posts").then((resp) => {
      this.$store.dispatch("SETPOSTS", resp.data.posts);
    });
  },
};
</script>

<style scoped>
.mypost {
  border-bottom: rgb(180, 180, 180) 1px solid;
  box-shadow: 0px 0px 14px -5px #000000;
}
#secure {
  background-color: rgb(243, 243, 243);
}

.usersposts {
  margin-top: 40px;
  width: 65%;
}

.navbar {
  background-color: rgb(61, 61, 61);
}
</style>