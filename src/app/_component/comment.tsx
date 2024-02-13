import styles from "./comment.module.css";
import { useState } from "react";

interface Comment {
  text: string;
  replies: Reply[];
}

interface Reply {
  text: string;
}

export default function Comment() {
  const [commentText, setCommentText] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyText, setReplyText] = useState<string>("");
  const [showReplyInput, setShowReplyInput] = useState<boolean>(false);
  const [replyIndex, setReplyIndex] = useState<number | null>(null);
  const [editCommentIndex, setEditCommentIndex] = useState<number | null>(null);
  const [editReplyIndex, setEditReplyIndex] = useState<number | null>(null);

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
                        {reply.text}
                        <button
                          onClick={() => {
                            setEditReplyIndex(replyIndex);
                            setReplyText(reply.text);
                          }}
                        >
                          수정
                        </button>
                        <button
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
                <button onClick={() => setEditCommentIndex(commentIndex)}>
                  수정
                </button>
                <button onClick={() => handleDeleteComment(commentIndex)}>
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
