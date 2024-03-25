import React, { useState } from "react";
import { Handle } from "react-flow-renderer";

const CustomTextNode = ({ data }) => {
  // 텍스트 상태를 관리하는 상태와 그 상태를 변경하는 함수를 정의합니다.
  const [text, setText] = useState(data.text);

  // 텍스트가 변경될 때 호출되는 함수
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText); // 텍스트 상태 업데이트 // 외부에서 전달된 onChange 함수 호출
  };

  return (
    <div>
      <Handle type="target" position="left" style={{ background: "#555" }} />
      <div style={{ padding: "10px" }}>
        <textarea
          placeholder="텍스트를 입력해주세요 "
          value={text} // 상태로부터 텍스트 값을 가져옴
          onChange={handleTextChange} // 텍스트 변경 이벤트 핸들러 연결
        />
      </div>
      <Handle type="source" position="right" style={{ background: "#555" }} />
    </div>
  );
};

export default CustomTextNode;
