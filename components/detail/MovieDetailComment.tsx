import getCommentList from "@/db/getCommentList";
import useMovieDetailComment from "@/db/useMovieDetailComment";
import { useEffect, useState } from "react";
import MovieDetailCommentList from "./MovieDetailCommentList";
import localStorageName from "@/utils/setLocalStorageName";

export default function MovieDetailComments({ movieId }: { movieId: number }) {
  const { addComment, deleteComment, response } =
    useMovieDetailComment(movieId);
  const { commentList, error } = getCommentList(movieId);
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [comment, setComment] = useState("");

  const handleData = (event: any) => {
    if (event.target.id === "nickname") setNickname(event.target.value);
    else if (event.target.id === "password") setPassword(event.target.value);
    else if (event.target.id === "comment") setComment(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    addComment({ nickname, password, comment });
  };

  useEffect(() => {
    setNickname(localStorageName());
  }, []);

  useEffect(() => {
    if (response.success) {
      localStorage.setItem("nickname", nickname);
      setComment("");
    }
  }, [response.success]);

  return (
    <div className="container">
      <MovieDetailCommentList
        commentList={commentList}
        deleteComment={deleteComment}
      />
      <form className="comment-form" onSubmit={handleSubmit}>
        <div className="commenter-info">
          <input
            id="nickname"
            type="text"
            placeholder="닉네임"
            required
            maxLength={10}
            value={nickname}
            onChange={handleData}
          />
          <input
            id="password"
            type="password"
            placeholder="비밀번호"
            required
            value={password}
            onChange={handleData}
          />
        </div>
        <div className="comment-info">
          <textarea
            id="comment"
            placeholder="내용을 입력하세요."
            minLength={10}
            maxLength={200}
            value={comment}
            onChange={handleData}
            required
          ></textarea>
        </div>
        <button>댓글</button>
      </form>
      <style jsx>{`
        .container {
          font-family: "DungGeunMo";
          background-color: #fff;
          padding: 10px;
        }
        .comment-form {
          justify-content: space-around;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 10px;
        }
        .commenter-info {
          display: flex;
          flex-direction: column;
          min-height: 60px;
          justify-content: space-around;
        }
        .commenter-info input {
          border-radius: 5px;
          max-width: 80px;
          padding: 2px 3px;
        }
        .comment-info {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .comment-info textarea {
          padding: 10px 10px;
          padding-right: 25px;
          width: 100%;
          min-height: 60px;
          resize: none;
          border-radius: 5px;
        }
        button {
          all: unset;
          width: 75px;
          min-height: 55px;
          display: flex;
          box-sizing: border-box;
          justify-content: center;
          align-items: center;
          background-color: #f0f0f0;
          font-size: 13px;
          border: 1px solid rgba(0, 0, 0, 0.21);
          border-bottom-color: rgba(0, 0, 0, 0.34);
          text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
          box-shadow: 0 1px 0 rgba(255, 255, 255, 0.34) inset,
            0 2px 0 -1px rgba(0, 0, 0, 0.13), 0 3px 0 -1px rgba(0, 0, 0, 0.08),
            0 3px 13px -1px rgba(0, 0, 0, 0.21);
          border-radius: 5px;
        }
        button:active {
          top: 1px;
          border-color: rgba(0, 0, 0, 0.34) rgba(0, 0, 0, 0.21)
            rgba(0, 0, 0, 0.21);
          box-shadow: 0 1px 0 rgba(255, 255, 255, 0.89),
            0 1px rgba(0, 0, 0, 0.05) inset;
          position: relative;
        }
      `}</style>
    </div>
  );
}
