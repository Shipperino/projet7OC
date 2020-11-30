<template>
  <div class="mypost">
    <form @submit="postMyMessage($event)" method="post" id="postmsg">
      <h2>Bonjour, {{ getAuthor() }}</h2>
      <b-form-group class="mb-1" id="input-group-1" label-for="input-1">
        <b-form-input
          v-model="postContent.title"
          placeholder="Mettez un titre à votre post ! :)"
        ></b-form-input>
      </b-form-group>
      <div class="flex-row d-flex">
        <b-form-textarea
          v-model="postContent.content"
          class="mx-auto"
          id="textarea-large"
          placeholder="Qu'avez-vous à nous partager?"
          no-resize
        ></b-form-textarea>
        <b-button class="btnsend" variant="info" type="submit"
          >Envoyer</b-button
        >
      </div>
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
  margin: 0;
  padding: 7px 0 7px 0;
  background: #3d3d3d;
  color: white;
  font-style: italic;
}
#postmsg {
  padding-bottom: 0;
}
.mypost {
  background-color: #eeeeee;
  width: 45%;
  text-align: center;
  margin: auto;
  margin-top: 150px;
  border-radius: 30px;
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
textarea[placeholder],
input[placeholder] {
  font-style: italic;
  font-size: 1.2rem;
}
.btnsend {
  font-weight: 700;
  font-size: 1.2rem;
}
@media screen and (max-width: 1000px) {
  .mypost {
    width: 80%;
  }
}
</style>