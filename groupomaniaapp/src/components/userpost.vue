 <!-- Page de création/suppression de Post et de commentaires-->
 
 <template>
  <div class="cardborder">
    <b-card class="w-75 p-3 mb-1 mx-auto mt-4 cardbody">
      <b-media>
        <h4 class="mt-0 ml-auto">{{ post.title }}</h4>
        <h5 class="mr-auto text-left">
          Message de: <span class="boldy">{{ post.user.username }}</span>
        </h5>
          <b-card :img-src="post.image" ></b-card>
        <p class="text-left postcontent" left>
          {{ post.content }}
        </p>
        <b-button
          v-b-toggle="'collapse-' + post.id"
          variant="info"
          class="commentbutton"
          >Commentaires</b-button
        >
        <b-collapse class="mt-2" v-bind:id="'collapse-' + post.id">
          <b-card
            class="w-75 mx-auto"
            v-for="comment in post.comments"
            :key="comment.id"
          >
            <h6 class="card-text" variant="info">
              {{ comment.user.username }} a répondu :
            </h6>
            <p class="card-text mt-4" id="comments">
              {{ comment.comment }}
            </p>
            <b-button
              variant="danger"
              :data-id="comment.id"
              v-if="canDeleteComment"
              @click="delMyComment($event)"
              >Supprimer le commentaire</b-button
            >
          </b-card>
          <b-container class="w-75" fluid>
            <b-row class="d-flex flex-row mt-1">
              <b-form-textarea
                v-model="postComment"
                class="w-75"
                placeholder="Répondre à ce commentaire"
                no-resize
              ></b-form-textarea>
              <b-button
                class="w-25 btnsnd"
                variant="info"
                @click="postMyComment($event)"
                >Envoyer</b-button
              >
            </b-row>
          </b-container>
        </b-collapse>
      </b-media>
      <b-button
        variant="danger"
        class="deletebutton text-left"
        v-if="canDelete"
        @click="delMyPost($event)"
        >Supprimer le post</b-button
      >
    </b-card>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import commentService from "../utils/comment.service";
export default {
  name: "usersposts",
  props: ["post"],
  data() {
    return {
      postComment: "",
    };
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

    //Post du commentaire - utilisation du commentservice
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
    //Suppression du Post
    delMyPost(e) {
      console.log("postmodel", this.post.id);
      axios
        .delete("http://localhost:3000/api/posts/delete/" + this.post.id)
        .then((resp) => {
          console.log(resp);
          this.$store.dispatch("DELPOST", { postId: this.post.id });
        });
    },
    //Suppression du commentaire
    delMyComment(e) {
      console.log("cmtmodel", e.target.dataset.id);
      axios
        .delete(
          "http://localhost:3000/api/posts/deletecomment/" + e.target.dataset.id
        )
        .then((resp) => {
          console.log(resp);
          let commentToDel = {
            commentId: e.target.dataset.id,
            postId: this.post.id,
          };
          console.log(commentToDel.commentId);
          this.$store.dispatch("DELCOMMENT", commentToDel);
        });
    },
  },
  computed: {
    //Admin check
    canDelete() {
      let userid = localStorage.getItem("userId");
      let isAdmin = localStorage.getItem("isAdmin");
      if (isAdmin === "true" || userid == this.post.userId) {
        return true;
      } else return false;
    },
    canDeleteComment() {
      let isAdmin = localStorage.getItem("isAdmin");
      let userid = localStorage.getItem("userId");
      if (isAdmin === "true" || userid == this.post.userId) {
        return true;
      } else return false;
    },
  },
};
</script>

<style scoped>
.custom-file-label{
  height: 100px;
}
.boldy {
  font-weight: 600;
}
.postcontent {
  border-bottom: rgb(170, 170, 170) 1px solid;
  padding-bottom: 10px;
  font-weight: 600;
  margin-bottom: 30px;
}

.btnsnd {
  font-size: 1.2rem;
  font-weight: 600;
  padding: 1%;
   background-color: #D1515A;
}
h4 {
  font-size: 1.6rem;
  font-weight: 700;
  text-align: center;
  margin: auto;
}

h5 {
  font-size: 1rem;
  font-weight: 500;
  border: rgb(170, 170, 170) 1px solid;
  padding: 5px 0 5px 0;
  width: 25%;
  border-radius: 0.5rem;
  text-align-last: center;
  margin-bottom: 30px;
}

h6 {
  text-align: left;
}

#comments {
  border: rgb(170, 170, 170) 1px solid;
  border-radius: 0.5rem;
  padding: 0.4rem 0.5rem;
  overflow-wrap: anywhere;
  font-weight: 700;
}

.commentbutton {
  margin-right: 80%;
  font-weight: 600;
  font-size: 1.2rem;
   background-color: #1A2C4B
}
.commentbutton:hover, .commentbutton:focus{
  background-color: #1A2C4B
}

.cardborder {
  border-bottom: rgb(179, 179, 179) 1px solid;
  padding-bottom: 40px;
  padding-top: 20px;
  width: 75%;
  margin: auto;
}

.cardbody {
  -moz-box-shadow: 0px 0px 4px 1px #656565;
  -webkit-box-shadow: 0px 0px 4px 1px #656565;
  -o-box-shadow: 0px 0px 4px 1px #656565;
  box-shadow: 0px 0px 4px 1px #656565;
}

@media screen and (max-width: 1000px) {
  .cardborder {
    margin: none;
    width: 100%;
  }
  .cardbody {
    margin: 0px;
    width: 90% !important;
    z-index: 9999;
  }
}
</style>