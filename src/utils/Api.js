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
