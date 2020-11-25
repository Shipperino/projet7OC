<template>
 <div>
  <b-navbar toggleable="lg" type="dark" >
    <b-navbar-brand href="./accueil">Groupomania</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
    
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>Profil</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item @click="logout" href="./login">Déconnexion</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<style lang="css" scoped>

.navbar{
  background-color: rgb(61, 61, 61);
;
}

</style>

<script>


   export default {
 
  name: "Nav",
  methods:{
    logout: function() {
      localStorage.clear();
    }
  }
  }
</script>