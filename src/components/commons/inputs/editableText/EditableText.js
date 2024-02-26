import React, { useState, useRef, useEffect } from "react";
import styles from "./EditableTextStyle.module.scss";

const EditableText = ({ onSubmit = () => {}, initialText = "" }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");
  const [size, setSize] = useState({ width: 0, height: 0 });
  const spanRef = useRef(null);

  useEffect(() => {
    if (spanRef.current) {
      // Đo chiều rộng và chiều cao của span
      setSize({
        width: spanRef.current.offsetWidth,
        height: spanRef.current.offsetHeight,
      });
    }
  }, [text]); // Cập nhật kích thước khi text thay đổi

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    setText(initialText);
  };
  // Xử lý sự kiện nhấn Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      setIsEditing(false); // Tắt chế độ chỉnh sửa khi nhấn Enter
      onSubmit(e.target.value);
      e.preventDefault();
    }
  };
  return (
    <div className={styles.wrap}>
      {isEditing ? (
        <textarea
          type="text"
          className={styles.input}
          value={text}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          autoFocus
          onKeyDown={handleKeyDown}
          style={{
            width: `${Math.max(size.width, 20)}px`, // Áp dụng chiều rộng
            height: `${Math.max(size.height, 20)}px`, // Áp dụng chiều cao
          }}
        />
      ) : (
        <span
          ref={spanRef}
          onClick={handleTextClick}
          style={{ display: "inline-block" }}
        >
          {text}
        </span>
      )}
    </div>
  );
};

export default EditableText;
