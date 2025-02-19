import { useEffect, useState } from "react";
import { getArticleById, updateArticleByArticleId } from "../utils/Api";
import { useParams, Link } from "react-router-dom";
import {
  ThumbsUp,
  ThumbsDown,
  ChatTeardropText,
  Heart,
} from "@phosphor-icons/react";
import Comments from "./Comments";

const Article = () => {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [voteCount, setVoteCount] = useState(0);
  const { article_id } = useParams();

  function handleVoteClick() {
    updateArticleByArticleId(article.article_id).then((updatedArticle) => {
      setVoteCount(updatedArticle.votes);
    });
  }

  useEffect(() => {
    getArticleById(article_id).then((article) => {
      setArticle(article);
      setIsLoading(false);
    });

    // getCommentsByArticleId(article_id).then((allComments) => {
    //   setAllComments(allComments);
    //   setIsLoading(false);
    // });
  }, [voteCount]);

  if (isLoading) {
    return (
      <div className="loading-msg-container">
        <p className="loading-msg">Loading...</p>
      </div>
    );
  }

  return (
    <div id="article-page-container">
      <div className="article-page-buttons">
        <Link
          className="article-page-author-link"
          to={`/author/${article.author}`}
        >
          <p className="article-page-author">{article.author}</p>
        </Link>
        <div className="like-dislike-button">
          <p className="article-tile-heart-icon" onClick={handleVoteClick}>
            <Heart size={25} />
          </p>
          <p className="article-tile-heart-count">
            <span>{article.votes}</span>
          </p>
        </div>
      </div>
      <img src={article.article_img_url}></img>
      <div className="article-body">
        <p>{article.body}</p>
      </div>
      <div className="article-comments-container">
        <input placeholder="Comments"></input>
        <Comments article_id={article_id} />
      </div>
    </div>
  );
};

export default Article;
