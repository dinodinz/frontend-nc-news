import { useEffect, useState } from "react";
import { getArticles, updateVoteHomepage } from "../../utils/Api.js";
import FooterCredits from "../UI/FooterCredits.jsx";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import SortByContainer from "../UI/SortBy.jsx";
import ArticleTile from "./ArticleTile.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setArticles } from "../../redux/articleListSlice";

const AllArticles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sortByValue, setSortByValue] = useState("");
  const [order, setOrder] = useState("DESC");
  const [defaultSort, setDefaultSort] = useState("created_at");
  const [likedArticle, setLikedArticle] = useState(false);
  const articles = useSelector((state) => state.articleList.articles);
  const dispatch = useDispatch();

  useEffect(() => {
    getArticles(null, defaultSort, order).then((allArticles) => {
      dispatch(setArticles(allArticles));
      setIsLoading(false);
    });
  }, [defaultSort, order, likedArticle]);

  function handleVoteClick(article_id) {
    updateVoteHomepage(article_id).then(() => {
      setLikedArticle(!likedArticle);
    });
  }

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
      <SortByContainer
        sortByValue={sortByValue}
        setSortByValue={setSortByValue}
        setDefaultSort={setDefaultSort}
        order={order}
        setOrder={setOrder}
      />

      <div className="all-article-container">
        {articles.map((article) => (
          <ArticleTile
            key={article.article_id}
            article={article}
            handleVoteClick={handleVoteClick}
          />
        ))}
      </div>

      <FooterCredits />
    </>
  );
};

export default AllArticles;
