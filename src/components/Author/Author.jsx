import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getArticles,
  getUserByUsername,
  updateVoteHomepage,
} from "../../utils/Api";
import { useSelector, useDispatch } from "react-redux";
import { setArticles } from "../../redux/articleListSlice";
import { setErrorPage } from "../../redux/errorSlice";
import ArticleTile from "../Article/ArticleTile.jsx";
import FooterCredits from "../UI/FooterCredits.jsx";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ImageBroken } from "@phosphor-icons/react";

const Author = () => {
  const { author_name } = useParams();
  const [authorInfo, setAuthorInfo] = useState({});
  const [likedArticle, setLikedArticle] = useState(false);
  const articles = useSelector((state) => state.articleList.articles);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const errorPage = useSelector((state) => state.error.errorPage);

  useEffect(() => {
    getUserByUsername(author_name)
      .then(() => {
        getArticles(null, "created_at", "asc").then((allArticles) => {
          const authorArticles = allArticles.filter((article) => {
            setIsLoading(false);
            if (article.author === author_name) return article;
          });

          dispatch(setArticles(authorArticles));
          getUserByUsername(author_name).then((author) => {
            setAuthorInfo(author);
          });
        });
      })
      .catch((err) => {
        setIsLoading(false);
        dispatch(setErrorPage([err.response.status, err.response.data.error]));
      });
  }, [likedArticle]);

  function handleVoteClick(article_id) {
    updateVoteHomepage(article_id).then(() => {
      setLikedArticle(!likedArticle);
    });
  }

  if (isLoading) {
    return (
      <div className="w-[95%] flex flex-col bg-[hsla(219,79%,41%,0.13)] rounded-[15px] mt-[20px] pt-[20px] mb-[20px] pb-[20px] relative">
        <div className="loading-msg-container">
          <DotLottieReact
            src="https://lottie.host/64874a31-dac6-4247-8bf9-ff1be54f880d/jzje4DTIL8.lottie"
            loop
            autoplay
            className="w-2/3 relative"
          />
          <p className="loading-msg">Loading...</p>
        </div>
        <FooterCredits />
      </div>
    );
  }

  if (errorPage) {
    return (
      <div className="w-[95%] flex flex-col bg-[hsla(219,79%,41%,0.13)] rounded-[15px] mt-[20px] pt-[20px] mb-[20px] pb-[20px] relative">
        <div className="flex flex-col items-center h-screen justify-center gap-4">
          <ImageBroken size={130} className="mb-[20px] text-[#ff646c]" />
          <p className="font-[900] tracking-[5px] text-[1.4rem]">
            {"Error:" + errorPage[0]}
          </p>
          <p className="font-[900] tracking-[5px] text-[1.4rem]">
            {errorPage[1]}
          </p>
        </div>
        <FooterCredits />
      </div>
    );
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
