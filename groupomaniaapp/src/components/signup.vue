 <!-- inscription -->
<template>
  <div>
    <h2>S'inscrire</h2>
    <form class="signup" @submit.prevent="handleSubmit">
      <label for="username">Prénom NOM</label>
      <div>
        <input
          id="username"
          type="text"
          v-model="username"
          required
          autofocus
        />
      </div>
      <label for="email">Adresse mail</label>
      <div>
        <input id="email" type="email" v-model="email" required />
      </div>

      <label for="password">Mot de passe</label>
      <div>
        <input id="password" type="password" v-model="password" required />
      </div>
      <label for="password-confirm">Confirmez votre mot de passe</label>
      <div>
        <input
          id="password-confirm"
          type="password"
          v-model="password_confirmation"
          required
        />
      </div>
      <div>
        <b-button class="btnsend" variant="info" type="submit"
          >Envoyer</b-button
        >
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "RegisterComponent",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    };
  },
  methods: {
    // Submit inscription + localstorage setup username, token etc
    handleSubmit: function () {
      const { username, email, password } = this;
      console.log({ username, email, password }, "CLD");
      if (this.password == this.password_confirmation ) {
      axios
        .post("http://localhost:3000/api/auth/signup", {
          username,
          email,
          password,
        })
        .then((resp) => {
          
            console.log("resp", resp);
            localStorage.setItem("username", username);
            localStorage.setItem("UserToken", resp.data.token);
            localStorage.setItem("isAdmin", resp.data.isAdmin);
            localStorage.setItem("userId", resp.data.userId);
            axios.defaults.headers.common["Authorization"] = resp.data.token;
            this.$router.push("./accueil");
            alert("Bienvenue sur le site de Groupomania!");          
        })
        .catch((error) => {
          console.error(error);
        });
    }
    else {
      alert('Vos mots de passe ne correspondent pas')
    }
    },
  },
};
</script>

<style scoped>
h2 {
  border-bottom: black 1px solid;
  width: 35%;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 30px;
}

label {
  margin-top: 10px;
}

.btnsend {
  font-weight: 700;
  font-size: 1.2rem;
  margin-top: 20px;
}
</style>