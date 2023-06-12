import useMovieDetailComment from "@/db/useMovieDetailComment";
import { useEffect, useState } from "react";

export default function MovieDetailComments({ movieId }: any) {
  const { addComment, response } = useMovieDetailComment(movieId);

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
    if (response.success) {
      setComment("");
    }
  }, [response.success]);

  return (
    <div className="container">
      <div className="container-comment-list"></div>
      <form className="comment-form" onSubmit={handleSubmit}>
        <div className="commenter-info">
          <input id="nickname" type="text" placeholder="닉네임" required value={nickname} onChange={handleData} />
          <input id="password" type="password" placeholder="비밀번호" required value={password} onChange={handleData} />
        </div>
        <div className="comment-info">
          <textarea id="comment" placeholder="내용을 입력하세요." minLength={10} maxLength={200} value={comment} onChange={handleData}></textarea>
        </div>
        <button>댓글</button>
      </form>
      <style jsx>{`
        .container {
          background-color: #fff;
          padding: 10px;
        }
        .comment-form {
          justify-content: space-around;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .commenter-info {
          display: flex;
          flex-direction: column;
          min-height: 60px;
          justify-content: space-around;
        }
        .commenter-info input {
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
        }
        button {
          width: 75px;
          min-height: 60px;
        }
      `}</style>
    </div>
  );
}