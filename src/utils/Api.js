import axios from "axios";

const ncNews = axios.create({
  baseURL: "https://northcoders-reddit.onrender.com/api/",
});

export const getArticles = () => {
  return ncNews.get("/articles").then((response) => {
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
