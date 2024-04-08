import React, { useState } from "react";
import { Handle } from "react-flow-renderer";
import { useDispatch } from "react-redux";
import { setNodeData } from "../../slices/nodeData";
const CustomTextNode = ({ data }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState(data.text);
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    dispatch(setNodeData(text));
  };

  return (
    <div>
      <Handle type="target" position="left" style={{ background: "#555" }} />
      <div style={{ padding: "10px" }}>
        <input
          type="text"
          placeholder="텍스트를 입력해주세요 "
          value={text}
          onChange={handleTextChange}
        />
      </div>
      <Handle type="source" position="right" style={{ background: "#555" }} />
    </div>
  );
};

export default CustomTextNode;
