import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getArticles,
  getUserByUsername,
  updateVoteHomepage,
} from "../../utils/Api";
import { useSelector, useDispatch } from "react-redux";
import { setArticles } from "../../redux/articleListSlice";
import ArticleTile from "../Article/ArticleTile.jsx";
import FooterCredits from "../UI/FooterCredits.jsx";

const Author = () => {
  const { author_name } = useParams();
  const [authorInfo, setAuthorInfo] = useState({});
  const [likedArticle, setLikedArticle] = useState(false);
  const articles = useSelector((state) => state.articleList.articles);
  const dispatch = useDispatch();

  useEffect(() => {
    getArticles(null, "created_at", "asc").then((allArticles) => {
      const authorArticles = allArticles.filter((article) => {
        if (article.author === author_name) return article;
      });

      dispatch(setArticles(authorArticles));
      getUserByUsername(author_name).then((author) => {
        setAuthorInfo(author);
      });
    });
  }, [likedArticle]);

  function handleVoteClick(article_id) {
    updateVoteHomepage(article_id).then(() => {
      setLikedArticle(!likedArticle);
    });
  }

  return (
    <div id="author-container">
      <div className="wrapper-about-me">
        <div className="authorpage-author-info">
          <img src={authorInfo.avatar_url}></img>
          <div className="authorpage-author-info-text">
            <p>
              <strong>Username:</strong> <br /> {authorInfo.username}
            </p>
            <p>
              <strong>Name:</strong>
              <br /> {authorInfo.name}
            </p>
          </div>
        </div>
      </div>
      <h1 style={{ fontSize: "2rem" }}>Articles</h1>

      <div className="article-container mb-[70px]">
        {articles.map((article) => (
          <ArticleTile
            key={article.article_id}
            article={article}
            handleVoteClick={handleVoteClick}
          />
        ))}
      </div>
      <FooterCredits />
    </div>
  );
};

export default Author;
