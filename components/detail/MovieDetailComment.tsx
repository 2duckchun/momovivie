import getCommentList from "@/db/getCommentList";
import useMovieDetailComment from "@/db/useMovieDetailComment";
import { useEffect, useState } from "react";
import MovieDetailCommentList from "./MovieDetailCommentList";
import getlocalStorageName from "@/utils/getLocalStorageName";
import useValidation from "@/hooks/useValidation";
import Loading from "../share/Loading";

export default function MovieDetailComments({ movieId }: { movieId: number }) {
  const { addComment, deleteComment, response } =
    useMovieDetailComment(movieId);
  const { validator, error, setError } = useValidation();
  const { commentList } = getCommentList(movieId);
  const [commentInfo, setCommentInfo] = useState({
    nickname: "",
    password: "",
    comment: "",
  });

  const handleData = (event: any) => {
    setError({
      isError: false,
      errorMessage: "",
    });

    setCommentInfo({
      ...commentInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnKeyPress = (event: any) => {
    event.preventDefault();
    if (event.key === "Enter" && event.shiftKey) {
      return;
    }
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const isValidInfo = validator(
      commentInfo.nickname,
      commentInfo.password,
      commentInfo.comment
    );

    if (isValidInfo) {
      addComment({ ...commentInfo });
    }
  };

  useEffect(() => {
    const localName = getlocalStorageName();
    setCommentInfo({
      ...commentInfo,
      nickname: localName,
    });
  }, []);

  useEffect(() => {
    if (response.success) {
      localStorage.setItem("nickname", commentInfo.nickname);
      setCommentInfo({
        ...commentInfo,
        comment: "",
      });
    }
  }, [response.success]);

  return (
    <div className="container">
      <MovieDetailCommentList
        commentList={commentList}
        deleteComment={deleteComment}
      />
      <form
        className="comment-form"
        onSubmit={handleSubmit}
        onKeyUp={handleOnKeyPress}
      >
        <div className="commenter-info">
          <input
            id="nickname"
            name="nickname"
            type="text"
            placeholder="닉네임"
            required
            minLength={2}
            maxLength={10}
            value={commentInfo.nickname}
            onChange={handleData}
          />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호"
            required
            minLength={4}
            value={commentInfo.password}
            onChange={handleData}
          />
        </div>
        <div className="comment-info">
          {response.isPending ? (
            <Loading />
          ) : (
            <textarea
              id="comment"
              name="comment"
              placeholder="내용을 입력하세요."
              maxLength={200}
              value={commentInfo.comment}
              onChange={handleData}
              required
            ></textarea>
          )}
        </div>
        <button>댓글</button>
      </form>
      <p className="error-message">{error.isError && error.errorMessage}</p>
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
        .error-message {
          margin-top: 10px;
          text-align: center;
          color: tomato;
        }
      `}</style>
    </div>
  );
}
