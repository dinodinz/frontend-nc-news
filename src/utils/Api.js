import axios from "axios";

const ncNews = axios.create({
  baseURL: "https://northcoders-reddit.onrender.com/api/",
});

export const getArticles = (topic, sort_by, order) => {
  const Params = !topic
    ? { params: { sort_by, order } }
    : { params: { topic } };

  return ncNews.get("/articles", Params).then((response) => {
    return response.data.allArticles;
  });
};

export const getArticleById = (article_id) => {
  return ncNews.get(`/articles/${article_id}`).then((response) => {
    return response.data.article;
  });
};

export const getCommentsByArticleId = (article_id) => {
  return ncNews.get(`/articles/${article_id}/comments`).then((response) => {
    return response.data.allComments;
  });
};

export const updateVoteHomepage = (article_id) => {
  const updateVote = { inc_votes: 1 };
  return ncNews
    .patch(`/articles/${article_id}`, updateVote)
    .then((response) => {
      return response.data.editedArticle;
    });
};

export const updateArticleByArticleId = (article_id, hasVoted) => {
  const updateVote = !hasVoted ? { inc_votes: 1 } : { inc_votes: -1 };
  return ncNews
    .patch(`/articles/${article_id}`, updateVote)
    .then((response) => {
      return response.data.editedArticle;
    });
};

export const getUserByUsername = (username) => {
  return ncNews.get(`/users/${username}`).then((response) => {
    return response.data.user;
  });
};

export const addCommentByArticleId = (article_id, body, username) => {
  const commentBody = { username: username, body: body };
  return ncNews
    .post(`articles/${article_id}/comments`, commentBody)
    .then((response) => {
      return response.data.postedComment;
    });
};

export const deleteCommentById = (comment_id) => {
  return ncNews.delete(`comments/${comment_id}`);
};

export const getTopics = () => {
  return ncNews.get("/topics").then((response) => {
    return response.data.allTopics;
  });
};

export const getUsers = () => {
  return ncNews.get("/users").then((response) => {
    return response.data.allUsers;
  });
};

export const addUser = (reqBody) => {
  return ncNews.post("/users", reqBody).then((response) => {
    return response.data.allUsers;
  });
};

export const updateCommentByCommentId = (reqBody, comment_id) => {
  return ncNews.patch(`/comments/${comment_id}`, reqBody).then((response) => {
    return response.data.updatedComment;
  });
};
