import React, { useContext } from "react";
import styles from "./custom.module.css";
import profileImg from "@/asset/images/main/kwang.jpg";
import likesIcon from "@/asset/images/likestar.png";
import Image from "next/image";
import { AuthContext } from "@/app/_component/Provider/authProvider";
import { useDispatch } from "react-redux";
import { Handle } from "react-flow-renderer";
import { useRouter } from "next/navigation";
import { setPostId } from "@/app/slices/postSlice";
const CustomNode = ({ data }) => {
  const { isLogin, nickname } = useContext(AuthContext);
  const dispatch = useDispatch();
  const router = useRouter();
  const onHandlePost = () => {
    console.log(data.postId);
    if (isLogin) {
      router.push(`/${nickname}/dashboard/home/post`);
      dispatch(setPostId(data.postId));
    } else {
      router.push(`/dashboard/home/post`);
      dispatch(setPostId(data.pstId));
    }
  };
  return (
    <div className={styles.wrapper} onClick={onHandlePost}>
      <Handle
        type="source"
        position="top"
        id="a"
        style={{ background: "#555" }}
      ></Handle>
      <div className={styles.previewHeader}>
        <div className={styles.profileCircle}>
          <Image src={profileImg} alt="profileImg" />
        </div>
        <div className={styles.postBy}>
          <span>post</span> <b>{data.nickname}</b>
        </div>
        <span className={styles.likesCount}>{data.count}</span>
        <div className={styles.likes}>
          <Image src={likesIcon} alt="like" />
        </div>
      </div>
      <div className={styles.previewBox}>
        <img src={data.image} alt="previewImg" />
      </div>
      <div className={styles.card}>
        <h3>{data.title}</h3>
        <div className={styles.tags}>
          <span>알고리즘</span>
        </div>
      </div>

      <Handle
        type="target"
        position="bottom"
        id="b"
        style={{ background: "#555" }}
      ></Handle>
    </div>
  );
};

export default CustomNode;
