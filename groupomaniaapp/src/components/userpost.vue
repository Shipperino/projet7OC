<template>
  <div class="cardborder">
    <b-card class="w-75 p-3 mb-1 mx-auto mt-4 cardbody">
      <b-media>
        <h5 class="mt-0 ml-auto">{{ post.title }}</h5>
        <h6 class="ml-auto text-left">{{ post.user.username }}</h6>
        <p class="text-left" left>
          {{ post.content }}
        </p>
        <b-button
          v-b-toggle="'collapse-'+ post.id"
          variant="primary"
          class="comentbutton"
          @click="collapse()"
          >Commentaires</b-button
        >
        <b-collapse class="mt-2" v-bind:id="'collapse-'+ post.id"> 
          <b-card
            class="w-50 mx-auto"
            v-for="comment in post.comments"
            :key="comment.id"
          >
            <h5 class="card-text">{{ comment.user.username }}</h5>
            <p class="card-text mt-4" id="comments">
              {{ comment.comment }}
            </p>
          </b-card>
          <b-container fluid>
            <b-row class="w-50 mx-auto">
              <b-col>
                
                  <b-form-textarea
                    v-model="postComment"
                    class="mx-auto"
                    id="textarea-small"
                    placeholder="Répondre à ce commentaire"
                    no-resize
                  ></b-form-textarea>
                  <b-button  variant="primary" @click="postMyComment($event)">Primary</b-button>              
              </b-col>
            </b-row>
          </b-container>
        </b-collapse>
      </b-media>
    </b-card>
  </div>
</template>

<script>
import axios from "axios"
import commentService from "../utils/comment.service";
export default {
  name: "usersposts",
  props: ["post"],
  // components: {mypost},
  data() {
    return {
      postComment: "",
    };
  },
  computed: {
  },
  methods: {
    getAuthor: function () {
      let username = localStorage.getItem("username");
      console.log("test", this.post);
      return username;
    },
    mounted() {
      axios.get("http://localhost:3000/api/posts").then((resp) => {
        this.postComment = resp.data.comment;
      });
    },
    postMyComment(e) {
       e.preventDefault();
      if (this.postComment === "") {
        alert("Vous n'avez rien écris!");
      } else {
        commentService
          .postComment(this.postComment, this.post.id)
          .then((resp) => {
            console.log("dd", resp.data.comment);
            this.postComment = "";
             this.$store.dispatch("ADDCOMMENT", resp.data.comment);
          });
      }
    },
    collapse() {
      this.$root.$emit("v-b-toggle:collapse-1", "collapse-1");
    },
  },
};
</script>
<style scoped>
h5 {
  font-weight: 900;
}
textarea {
  width: 75%;
}
#comments {
  border: cadetblue 1px solid;
  border-radius: 0.5rem;
  padding: 0.4rem 0.5rem;
  overflow-wrap: anywhere;
}
.comentbutton {
  margin-right: 80%;
}
.cardborder {
  border-bottom: rgb(83, 83, 83) 1px solid;
  padding-bottom: 30px;
  width: 85%;
  margin: auto;
}
.cardbody {
  -moz-box-shadow: 0px 0px 4px 1px #656565;
  -webkit-box-shadow: 0px 0px 4px 1px #656565;
  -o-box-shadow: 0px 0px 4px 1px #656565;
  box-shadow: 0px 0px 4px 1px #656565;
}
</style>