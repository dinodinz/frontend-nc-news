import { useEffect, useState } from "react";
import { getTimestamp } from "../utils/UtilFunctions";
import { ThumbsUp, ThumbsDown, ChatTeardropText } from "@phosphor-icons/react";

const Comments = ({ allComments }) => {
  return (
    <ul className="comment-list">
      {allComments.map((comment) => {
        return (
          <div className="single-comment" key={comment.comment_id}>
            <p>{comment.author}</p>
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
