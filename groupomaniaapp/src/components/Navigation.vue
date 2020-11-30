<template>
  <div>
    <b-navbar toggleable="lg" type="dark">
      <b-navbar-brand href="./accueil">Groupomania</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Options" class="mr-3" right>
            <b-dropdown-item @click="deleteAcc"
              >Supprimer mon compte</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item @click="logout" href="./login">Se déconnecter</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>



<script>
import axios from "axios";
export default {
  name: "Nav",
  methods: {
    logout: function () {
      localStorage.clear();
    },
    deleteAcc: function () {

      axios.delete("http://localhost:3000/api/auth/delete").then((resp) => {
          console.log(resp);
          this.logout();
          alert("Ce compte à été suprimé");
          this.$router.push("./login");


      });
    },
  },
};
</script>

<style lang="css" scoped>
.navbar {
  background-color: rgb(49, 49, 49);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9999;
}
</style>