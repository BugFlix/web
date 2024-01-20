"use client"
interface Comment {
    text: string;
    replies: Reply[];
  }
  
  interface Reply {
    text: string;
  }
import styles from "./comment.module.css"
import { useState } from "react";
export default function Comment(){
    const [commentText, setCommentText] = useState<string>("");
    const [comments, setComments] = useState<Comment[]>([]);
    const [replyText, setReplyText] = useState<string>("");
    const [showReplyInput, setShowReplyInput] = useState<boolean>(false);
    const [replyIndex, setReplyIndex] = useState<number | null>(null);
  
    const handleCommentSubmit = () => {
      if (commentText.trim() !== "") {
        setComments([...comments, { text: commentText, replies: [] }]);
        setCommentText("");
      }
    };
  
    const handleReplySubmit = (commentIndex: number) => {
      if (replyText.trim() !== "") {
        const updatedComments = [...comments];
        updatedComments[commentIndex].replies.push({ text: replyText });
        setComments(updatedComments);
        setReplyText("");
        setShowReplyInput(false);
        setReplyIndex(null);
      }
    };
    return(
        <div className={styles.commentContainer}>
      <div className={styles.commentContent}>
        <div className={styles.commentInput}>
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
            {comment.text}

            {showReplyInput && replyIndex === commentIndex && (
              <div className={styles.replyInput}>
                <input
                  type="text"
                  placeholder="답글을 남겨주세요..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <button onClick={() => handleReplySubmit(commentIndex)}>
                  답글달기
                </button>
              </div>
            )}
            {comment.replies.map((reply, replyIndex) => (
              <div key={replyIndex} className={styles.reply}>
                {reply.text}
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
          </div>
        ))}
      </div>
    </div>
    )
}