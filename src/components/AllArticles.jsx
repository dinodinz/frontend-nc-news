import { useEffect, useState } from "react";
import { getArticles } from "../utils/Api.js";
import FooterCredits from "./FooterCredits.jsx";
import {
  ThumbsUp,
  ChatTeardropText,
  Triangle,
  GithubLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useArticleState, useTopicState } from "../contexts/AllContexts.jsx";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const AllArticles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sortByValue, setSortByValue] = useState("");
  const [order, setOrder] = useState("DESC");
  const { articles, setArticles } = useArticleState();
  const { setCurrentTopic } = useTopicState();
  const [defaultSort, setDefaultSort] = useState("created_at");

  useEffect(() => {
    getArticles(null, defaultSort, order).then((allArticles) => {
      setArticles(allArticles);
      setIsLoading(false);
    });
  }, [defaultSort, order]);

  // function handleVoteClick() {
  //   if (!hasVoted) {
  //     setVoteCount((voteCount) => voteCount + 1);
  //     setError(null);
  //     updateArticleByArticleId(article.article_id, hasVoted)
  //       .then((result) => {
  //         setHasVoted(true);
  //       })
  //       .catch((err) => {
  //         setVoteCount((voteCount) => voteCount - 1);
  //         setError("Vote submission was not succesfull. Please try again!");
  //       });
  //   } else {
  //     setVoteCount((voteCount) => voteCount - 1);
  //     setError(null);
  //     updateArticleByArticleId(article.article_id, hasVoted)
  //       .then((result) => {
  //         setHasVoted(false);
  //       })
  //       .catch((err) => {
  //         setVoteCount((voteCount) => voteCount + 1);
  //         setError("Vote update was not succesfull. Please try again!");
  //       });
  //   }
  // }

  if (isLoading) {
    return (
      <div className="loading-msg-container">
        <DotLottieReact
          src="https://lottie.host/64874a31-dac6-4247-8bf9-ff1be54f880d/jzje4DTIL8.lottie"
          loop
          autoplay
          className="car-animation"
        />
        <p className="loading-msg">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="sort-by-container">
        <div
          className="sort-by-triangle-container"
          style={{ position: "relative", display: "inline-block" }}
        >
          <select
            id="sort"
            value={sortByValue}
            onChange={(event) => {
              setSortByValue(event.target.value);
              setDefaultSort(event.target.value);
            }}
          >
            <option value="" disabled>
              Sort by
            </option>
            <option value="created_at">Date</option>
            <option value="comment_count">Comment</option>
            <option value="votes">Vote</option>
          </select>
          <Triangle
            className="upside-down triangle-icons"
            id="DESC"
            size={18}
            style={{
              position: "absolute",
              right: "20px",
              top: "30%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              transform: "rotate(180deg)",
            }}
          />
        </div>
        <div className="triangle-order-btn-container">
          <p>Order:</p>
          <Triangle
            className="triangle-icons"
            id="ASC"
            onClick={(event) => {
              setOrder(event.target.id);
            }}
            size={18}
          />
          <Triangle
            className="upside-down triangle-icons"
            id="DESC"
            onClick={(event) => {
              setOrder(event.target.id);
            }}
            size={18}
          />
        </div>
      </div>
      <div className="all-article-container">
        {articles.map((article) => {
          return (
            <div key={article.article_id} className="article-tile">
              <div className="all-articles-page-img-container">
                <Link to={`/article/${article.article_id}`}>
                  <img src={article.article_img_url}></img>
                </Link>
                <Link
                  className="all-article-topic-button"
                  to={`/topic/${article.topic}`}
                >
                  <button
                    onClick={() => {
                      setCurrentTopic(article.topic);
                    }}
                  >
                    {article.topic}
                  </button>
                </Link>
              </div>
              <div className="article-tile-info">
                <Link
                  className="article-tile-author-link"
                  to={`/author/${article.author}`}
                >
                  <p className="article-tile-author">{article.author}</p>
                </Link>
                <div className="article-tile-like-dislike-button-container">
                  <p
                    className="article-tile-thumbs-up-icon"
                    onClick={() => {
                      handleVoteClick(article.article_id);
                    }}
                  >
                    <ThumbsUp size={25} />
                  </p>
                  <p className="article-tile-thumbs-up-count">
                    <span>{article.votes}</span>
                  </p>
                  <Link
                    className="article-tile-like-dislike-button"
                    to={`/article/${article.article_id}`}
                  >
                    <p className="article-tile-comment-icon">
                      <ChatTeardropText size={25} />
                    </p>
                  </Link>
                  <p className="article-tile-comment-count">
                    {article.comment_count}
                  </p>
                </div>
              </div>
              <p className="article-tile-title">{article.title} </p>
            </div>
          );
        })}
      </div>
      <FooterCredits />
    </>
  );
};

export default AllArticles;
