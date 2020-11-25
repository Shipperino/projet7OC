<template>
<div>
    <logins />
      <h2>Se connecter</h2>
    <form class="login" @submit.prevent="login">
      <label>Adresse mail</label>
      <input required v-model="email" type="text" placeholder="email" />
      <label>Mot de passe</label>
      <input
        required
        v-model="password"
        type="password"
        placeholder="Password"
      />
      <button type="submit">Se connecter</button>
    </form> 
    <h2>Je ne suis pas inscrit?</h2>
    <a href='./signup'> <button class="buttonsignup">S'inscrire</button></a>
    <!-- <button v-on:click="fcttest"> new button</button> -->
  </div>
</template>
<script>
import axios from "axios"
import logins from '../components/login'
export default {
  
  name: "login",
  components: {logins},
  data() {
    return {
      email: "a@a",
      password: "lol",
    };
  },

  methods: {
 login: function () {
   const { email, password } = this
   console.log(email,password, "CLD")

  axios.post('http://localhost:3000/api/auth/login',  {email,password})
    .then(resp => {
      console.log("resp", resp);
      localStorage.setItem('UserToken', resp.data.token);
      localStorage.setItem('username',  resp.data.username);
      axios.defaults.headers.common['Authorization']= resp.data.token;
      this.$router.push('./accueil')
    })
  .catch(err => {
    console.log("err", err)
    
  })
 },
}
}
</script>

<style scoped>
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