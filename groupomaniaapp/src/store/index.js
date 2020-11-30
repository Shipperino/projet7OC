import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
  },
  state:{
    posts: [],
  },
  getters:{
    posts: state => {
      return state.posts;
    }
  },
  mutations:{
    addPost(state, newPost){
     state.posts.unshift(newPost)
    },
    setPosts(state, posts){
     state.posts = posts;
    },
    addComment(state,  comment){
     state.posts.forEach(p => {
       if(p.id === comment.postId){
         p.comments.push(comment);
       }
     });
    },
    
  },
  actions: {
    ADDPOST (context, newPost) {
      context.commit('addPost', newPost)
    },
    SETPOSTS (context, posts) {
      context.commit('setPosts', posts)
    },
    ADDCOMMENT(context, comment){
      context.commit('addComment',  comment)
    }
  }
});