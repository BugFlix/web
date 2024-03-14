import axios from "axios";
import styles from "./comment.module.css";
import { useState, useEffect } from "react";
import profileImg from "../../asset/images/kwang.jpg"
import api from "../config/apiConfig";

interface Comment {
  profile: string;
  name: string;
  parentId: number ;
  text: string;
  replies: Reply[];
}

interface Reply {
  profile: string;
  name: string;
  parentId: number;
  text: string;
}

const user = {
  profile: "https://velog.velcdn.com/images/tkrhdrhkdduf/profile/3d009855-9fa9-4d75-b0d5-397af8fea3b1/social_profile.jpeg",
  name: "광열",
};

export default function Comment() {
  const [commentText, setCommentText] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyText, setReplyText] = useState<string>("");
  const [showReplyInput, setShowReplyInput] = useState<boolean>(false);
  const [replyIndex, setReplyIndex] = useState<number | null>(null);
  const [editCommentIndex, setEditCommentIndex] = useState<number | null>(null);
  const [editReplyIndex, setEditReplyIndex] = useState<number | null>(null);
  const accessToken=localStorage.getItem("accestoken")
  console.log(accessToken)
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/v1/comments/${1}`,{
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log(response.data);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentSubmit = async () => {
    if (commentText.trim() !== "") {
      try {
        const response = await axios.post("/api/v1/comments", {
          content: commentText,
          parentCommentId: null,
          postId: 1,
        },{
          headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          }
        });
        console.log(response.data)
       
          const newComment = {
            id: response.data.id,
            profile: user.profile,
            name: user.name,
            parentId: response.data.parentId,
            text: commentText,
            replies: [],
          };

          setComments([...comments, newComment]);
          setCommentText("");

      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  };

  const handleReplySubmit = async (commentId: number) => {
    if (replyText.trim() !== "") {
      try {
        const response = await api.post("/api/v1/comments", {
          content: replyText,
          parentCommentId:1,
          postId: 1,
        },{
          headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          }
        });

        if (response.status === 201) {
          const newReply = {
            profile:"https://velog.velcdn.com/images/tosspayments/profile/b8fbda89-6591-41ea-b280-582674fcff7a/image.jpg",
            name: "토스페이먼츠",
            parentId: response.data.parentId,
            text: replyText,
          };

          const updatedComments = comments.map((comment) => {
            if (comment.parentId === commentId) {
              return {
                ...comment,
                replies: [...comment.replies, newReply],
              };
            }
            return comment;
          });

          setComments(updatedComments);
          setReplyText("");
          setShowReplyInput(false);
          setReplyIndex(null);
        } else {
          console.error("Failed to submit reply");
        }
      } catch (error) {
        console.error("Error submitting reply:", error);
      }
    }
  };

  const handleEditCommentSubmit = (commentIndex: number) => {
    if (commentText.trim() !== "") {
      const updatedComments = [...comments];
      updatedComments[commentIndex].text = commentText;
      setComments(updatedComments);
      setCommentText("");
      setEditCommentIndex(null);
    }
  };

  const handleEditReplySubmit = (commentIndex: number, replyIndex: number) => {
    if (replyText.trim() !== "") {
      const updatedComments = [...comments];
      updatedComments[commentIndex].replies[replyIndex].text = replyText;
      setComments(updatedComments);
      setReplyText("");
      setEditReplyIndex(null);
    }
  };

  const handleDeleteComment = (commentIndex: number) => {
    const updatedComments = [...comments];
    updatedComments.splice(commentIndex, 1);
    setComments(updatedComments);
  };

  const handleDeleteReply = (commentIndex: number, replyIndex: number) => {
    const updatedComments = [...comments];
    updatedComments[commentIndex].replies.splice(replyIndex, 1);
    setComments(updatedComments);
  };

  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentContent}>
        <div className={styles.commentInput}>
          <img src={user.profile} alt="Profile" className={styles.profileImage} />
          <div className={styles.commenterName}>{user.name}</div>

          <input
            type="text"
            placeholder="댓글을 남겨주세요..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button onClick={handleCommentSubmit}>댓글달기</button>
        </div>

        {comments.map((comment, commentIndex) => (
          <div key={commentIndex} className={styles.comment}>
            <div className={styles.commentProfile}>
              <img src={comment.profile} alt="Profile" className={styles.profileImage} />
              <div className={styles.commenterName}>{comment.name}</div>
            </div>

            {editCommentIndex === commentIndex ? (
              <>
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button onClick={() => handleEditCommentSubmit(commentIndex)}>
                  수정 완료
                </button>
              </>
            ) : (
              <>
                <div className={styles.commentText}>{comment.text}</div>

                {showReplyInput && replyIndex === commentIndex && (
                  <div className={styles.replyInput}>
                    <input
                      type="text"
                      placeholder="답글을 남겨주세요..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <button onClick={() => handleReplySubmit(comment.parentId)}> 
                      답글달기
                    </button>
                  </div>
                )}
                {comment.replies.map((reply, replyIndex) => (
                  <div key={replyIndex} className={styles.reply}>
                    <div className={styles.replyProfile}>
                      <img src={reply.profile} alt="Profile" className={styles.profileImage} />
                      <div className={styles.commenterName}>{reply.name}</div>
                    </div>
                    {editReplyIndex === replyIndex ? (
                      <>
                        <input
                          type="text"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                        />
                        <button
                          onClick={() =>
                            handleEditReplySubmit(commentIndex, replyIndex)
                          }
                        >
                          수정 완료
                        </button>
                      </>
                    ) : (
                      <>
                        <div className={styles.replyText}>{reply.text}</div>
                        <button
                          onClick={() => {
                            setEditReplyIndex(replyIndex);
                            setReplyText(reply.text);
                          }}
                           className={styles.editBtn}
                        >
                          수정
                        </button>
                        <button
                        className={styles.deleteBtn}
                          onClick={() =>
                            handleDeleteReply(commentIndex, replyIndex)
                          }
                        >
                          삭제
                        </button>
                      </>
                    )}
                  </div>
                ))}

                {/* "답글 달기" Button */}
                <button
                  className={styles.replyBtn}
                  onClick={() => {
                    setShowReplyInput(!showReplyInput);
                    setReplyIndex(commentIndex);
                  }}
                >
                  답글달기
                </button>
                <button className={styles.editBtn} onClick={() => setEditCommentIndex(commentIndex)}>
                  수정
                </button>
                <button className={styles.deleteBtn}onClick={() => handleDeleteComment(commentIndex)}>
                  삭제
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
