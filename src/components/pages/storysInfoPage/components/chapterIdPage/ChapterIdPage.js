"use client";

import CardWrapLayout from "@/components/commons/cardsWrap/cardWrapLayout/CardWrapLayout";
import { useEffect, useRef, useState } from "react";
import styles from "./ChapterIdPage.style.module.scss";
import ButtonNormal from "@/components/commons/buttons/buttonNormal/ButtonNormal";

export default function ChapterIdPage({ chapter, isNewChapter }) {
  const [showPopup, setShowPopup] = useState({
    isDelete: false,
    isAdd: false,
  });
  const [contentChapter, setContentChapter] = useState(chapter.content_chapter);
  const refPreview = useRef();
  useEffect(() => {
    refPreview.current.innerHTML = contentChapter;
  }, [contentChapter]);
  return (
    <>
      <h1 className="titlePageManagent">Chapter Edit</h1>
      <CardWrapLayout className={styles.wrapCard + " " + styles.wrapCard_top}>
        <ButtonNormal
          className={styles.wrapCard_top_button}
          data-color-btn="red"
        >
          Delete
        </ButtonNormal>
        <p>{chapter.chapter_name}</p>
        <ButtonNormal
          className={styles.wrapCard_top_button}
          data-color-btn="orange"
        >
          Add
        </ButtonNormal>
      </CardWrapLayout>
      <CardWrapLayout className={styles.wrapCard_text}>
        <textarea
          value={contentChapter}
          onChange={({ target }) => setContentChapter(target.value)}
          className={styles.wrapCard_text_textAreaWrite}
        />
        <div className={styles.wrapCard_text_space}></div>
        <p className={styles.wrapCard_text_preview} ref={refPreview}>
          {contentChapter}
        </p>
      </CardWrapLayout>
    </>
  );
}
