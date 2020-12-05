<!-- Page de connexion sécurisée -->
<template>
  <div class="log">
    <logins />
    <h2>Se connecter</h2>
    <form class="login" @submit.prevent="login">
      <label>Adresse mail</label>
      <b-form-input
          v-model="email"
          placeholder="Email"
          type="email"
          required
        ></b-form-input>
      <label>Mot de passe</label>
      <b-form-input
          v-model="password"
          placeholder="Password"
          type="password"
          required
        ></b-form-input>
      <b-button class="btnsend" variant="info" type="submit"
        >Se connecter</b-button
      >
    </form>
    <h2>Je ne suis pas inscrit ?</h2>
    <a href="./signup">
      <b-button class="btnsend" variant="info" type="submit"
        >S'inscrire</b-button
      ></a
    >
  </div>
</template>
<script>
import axios from "axios";
import logins from "../components/login";
export default {
  name: "login",
  components: { logins },
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    login: function () {
      const { email, password } = this;
      console.log(email, password, "CLD");

      axios
        .post("http://localhost:3000/api/auth/login", { email, password })
        .then((resp) => {
          console.log("resp", resp);
          localStorage.setItem("UserToken", resp.data.token);
          localStorage.setItem("username", resp.data.username);
          localStorage.setItem("isAdmin", resp.data.isAdmin);
          localStorage.setItem("userId", resp.data.userId);
          axios.defaults.headers.common["Authorization"] = resp.data.token;
          this.$router.push("./accueil");
        })
        .catch((err) => {
          console.log("err", err);
          alert("Utilisateur introuvable");
        });
    },
  },
};
</script>

<style scoped>
label {
  font-size: 1.3rem;
}
input {
  margin-bottom: 20px;
}
.log {
  background-color: #f3f3f3;
}
h2 {
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
  width: 15%;
  padding-bottom: 30px;
}

.btnsend {
  font-weight: 700;
  font-size: 1.2rem;
  margin-top: 10px;
  background-color: #1A2C4B;
  border-color: #1A2C4B;
  transition: 200ms;
}
.btnsend:hover {
  background-color: #1A2C4B;
  transform: scale(1.1);
  transition: 200ms;}
</style>