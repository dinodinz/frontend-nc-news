import { useEffect, useState } from "react";
import AllArticles from "./AllArticles";

const MainContent = () => {
  // const [articles, setArticles] = useState([]);

  // useEffect(() => {
  //   getArticles().then((allArticles) => {
  //     setArticles(allArticles);
  //   });
  // }, []);

  return (
    <div id="main-content-container">
      <AllArticles />
    </div>
  );
};

export default MainContent;
