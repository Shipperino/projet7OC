import axios from "axios"
export default new class commentService {
    postComment(comment, postId) {
        return axios
            .post("http://localhost:3000/api/posts/comment", {
                postComment: comment,
                postId: postId,
            })

            .then((resp) => {
                console.log("dd", resp.data.comment);
                // resp.data.comment = "test"
                return resp
            })
            .catch((error) => {
                console.error(error);
            });
    }
}