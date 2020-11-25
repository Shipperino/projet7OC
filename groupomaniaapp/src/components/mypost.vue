<template>
  <div class="mypost">
    <h2>Bonjour, {{ getAuthor() }}</h2>
    <form @submit="postMyMessage($event)" method="post" id="postmsg">
      <b-form-group class="mb-1" id="input-group-1" label-for="input-1">
        <b-form-input
          v-model="postContent.title"
          placeholder="C'est à quel sujet?"
        ></b-form-input>
      </b-form-group>
      <textarea
        v-model="postContent.content"
        name="the-textarea"
        id="the-textarea"
        maxlength="300"
        placeholder="Que voulez-vous dire?"
        autofocus
      ></textarea>
      <button type="submit">Envoyer</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
// import Vue from "vue"
export default {
  name: "mypost",
  data() {
    return {
      postContent: {
        title: "",
        content: "",
      },
    };
  },
  methods: {
    getAuthor: function () {
      let username = localStorage.getItem("username");

      return username;
    },

    mounted() {
      axios.get("http://localhost:3000/api/posts").then((resp) => {
        this.postList = resp.data.posts;
        console.log("resp", resp.data.posts);
      });
    },
    postMyMessage(e) {
      console.log("postMyMessage", this.postContent);
      axios
        .post("http://localhost:3000/api/posts", {
          postContent: this.postContent,
        })

        .then((resp) => {
          console.log("dds", resp.data.post);
          this.postContent = {
            title: "",
            content: "",
          };
          this.$store.dispatch("ADDPOST", resp.data.post);
        })
        .catch((error) => {
          console.error(error);
        });
      e.preventDefault();
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 40px 0 40px 0;
}
#postmsg {
  -moz-box-shadow: 0px 0px 4px 1px #656565;
  -webkit-box-shadow: 0px 0px 4px 1px #656565;
  -o-box-shadow: 0px 0px 4px 1px #656565;
  box-shadow: 0px 0px 4px 1px #656565;
}
.mypost {
  background-color: #eeeeee;
  width: 45%;
  text-align: center;
  margin: auto;
  border-radius: 8px;
  margin-top: 50px;
}
form {
  flex-direction: column;
  background-color: rgb(209, 206, 206);
  padding-bottom: 5px;
}
textarea {
  width: 100%;
  min-height: 100px;
  resize: none;

  padding: 0.5rem;
}
textarea :focus {
  outline-width: 0;
}
textarea[placeholder] {
  font-style: italic;
  font-size: 1.2rem;
}
button {
  box-sizing: border-box;
  appearance: none;
  background-color: #007bff;
  border: 2px solid rgb(126, 126, 126);
  border-radius: 0.6em;
  color: rgb(255, 255, 255);
  cursor: pointer;
  display: flex;
  align-self: center;
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1;
  margin: 20px;
  padding: 0.3em 0.6em;
  margin-bottom: 15px;
  text-decoration: none;
  text-align: center;
  font-family: "Montserrat", sans-serif;
  margin: auto;
  transition: 300ms;
}
button:hover,
button:focus {
  color: #fff;
  outline: 0;
  transition: 300ms;
}

/* //BUTTON 1 */
.first {
  transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
}
button:hover {
  box-shadow: 0 0 40px 40px #343a40 inset;
}
</style>