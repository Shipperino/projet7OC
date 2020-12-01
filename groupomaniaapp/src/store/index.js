import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {},
    state: {
        posts: [],
    },
    getters: {
        posts: state => {
            return state.posts;
        }
    },
    mutations: {
        addPost(state, newPost) {
            state.posts.unshift(newPost)
        },
        setPosts(state, posts) {
            state.posts = posts;
        },
        addComment(state, comment) {
            state.posts.forEach(p => {
                if (p.id === comment.postId) {
                    p.comments.push(comment);
                    return;
                }
            });
        },
        delComment(state, comment) {
            state.posts.forEach(p => {
                if (p.id === comment.postId) {
                    {
                        for (let i = 0; i < p.comments.length; i++) {
                            if (p.comments[i].id == comment.commentId) {
                                //== différent de ===, un est un string l'autre un num
                                p.comments.splice(i, 1);
                                return;
                            }
                        }
                    }
                }
            });
        },
        delPost(state, post) {
            for (let i = 0; i < state.posts.length; i++) {
                if (state.posts[i].id === post.postId) {
                    state.posts.splice(i, 1);
                    return;
                }
            }
        },


    },
    actions: {

        // Mise à jour en direct des posts et comments onclick (delete et add)
        ADDPOST(context, newPost) {
            context.commit('addPost', newPost)
        },
        SETPOSTS(context, posts) {
            context.commit('setPosts', posts)
        },
        ADDCOMMENT(context, comment) {
            context.commit('addComment', comment)
        },
        DELCOMMENT(context, comment) {
            context.commit('delComment', comment)
        },
        DELPOST(context, post) {
            context.commit('delPost', post)
        }

    }
});