<template>
 <div>
  <b-navbar toggleable="lg" type="dark" >
    <b-navbar-brand href="./accueil">Groupomania</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

  </b-navbar>
</div>
</template>
<script>
export default {
  name: "logins",
}
</script>

<style scoped>
.navbar{
  background-color: rgb(61, 61, 61);
;
}
h2{
  
  border-bottom: black 1px solid;
  width: 35%;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 30px;
  }
.login {
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 20%;
  padding-bottom: 30px;
}
.buttonsignup{
  width: 20%;
  margin-top: 30px;
}
button{
  background-color: #343A40;
  color: white;
}
</style>