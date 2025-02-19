import { useEffect, useState } from "react";
import { getTimestamp } from "../utils/UtilFunctions";
import { ThumbsUp, ThumbsDown } from "@phosphor-icons/react";
import { getCommentsByArticleId } from "../utils/Api";
import { Link } from "react-router-dom";

const Comments = ({ article_id }) => {
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    getCommentsByArticleId(article_id).then((allComments) => {
      setAllComments(allComments);
    });
  }, []);

  return (
    <ul className="comment-list">
      {allComments.map((comment) => {
        return (
          <div className="single-comment" key={comment.comment_id}>
            <Link to={`/author/${comment.author}`}>
              <p>{comment.author}</p>
            </Link>
            <li>{comment.body}</li>
            <div className="comment-author-timestamp">
              <p>{getTimestamp(comment.created_at)}</p>

              <div className="comment-like-dislike-button">
                <p className="">
                  <ThumbsUp size={25} />
                </p>
                <p className="">
                  <ThumbsDown size={25} />
                </p>
                <p className="article-page-vote-count">
                  <span>{comment.votes}</span>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </ul>
  );
};

export default Comments;
