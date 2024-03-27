"use client";

import CardWrapLayout from "@/components/commons/cardsWrap/cardWrapLayout/CardWrapLayout";
import { useEffect, useRef, useState } from "react";
import styles from "./ChapterIdPage.style.module.scss";
import ButtonNormal from "@/components/commons/buttons/buttonNormal/ButtonNormal";
import PopupLoading from "@/components/commons/popups/popupLoading/PopupLoading";
import {
  addChapter,
  deleteChapterById,
  editChapter,
} from "../../../../../../services/api/admin";
import { getCookie } from "@/utils/features/localStorage";
import PopupNormalTwoOption from "@/components/commons/popups/popupNormalTwoOption/PopupNormalTwoOption";
import { useRouter } from "next/navigation";
import NormalInput from "@/components/commons/inputs/normalInput/NormalInput";

const initialPopupStatus = {
  isDelete: false,
  isAdd: false,
  isLoading: false,
  isSave: false,
  isEditChapterName: false,
};

export default function ChapterIdPage({ chapter, isNewChapter = false }) {
  const [showPopup, setShowPopup] = useState({
    ...initialPopupStatus,
  });
  const [contentChapter, setContentChapter] = useState(
    chapter?.content_chapter || ""
  );
  const [titleChapter, setTitleChapter] = useState(
    chapter?.chapter_name || "New chapter"
  );
  const router = useRouter();
  const refPreview = useRef(null);

  useEffect(() => {
    refPreview.current.innerHTML = contentChapter;
  }, [contentChapter]);

  const changeLoading = () => {
    setShowPopup((prev) => {
      return { ...prev, isLoading: !prev.isLoading };
    });
  };

  const handleClickRightOptions = async () => {
    if (isNewChapter) {
      setShowPopup({ ...initialPopupStatus, isAdd: true });
    } else {
      setShowPopup({ ...initialPopupStatus, isSave: true });
    }
  };
  const handleClickLeftOptions = async () => {
    if (isNewChapter) {
      router.back();
    } else {
      setShowPopup({ ...initialPopupStatus, isDelete: true });
    }
  };
  const handleClickDeleteChapter = async () => {
    changeLoading();
    await deleteChapterById(chapter._id, getCookie("adminToken"));
    changeLoading();
    handleCancelPopup();
    router.back();
  };
  const handleCancelPopup = () => {
    setShowPopup({ ...initialPopupStatus });
  };
  const handleClickSaveChange = async () => {
    const newChapter = { ...chapter, content_chapter: contentChapter };
    handleCancelPopup();
    changeLoading();
    await editChapter(newChapter, getCookie("adminToken"));
    changeLoading();
  };
  const handleClickChangeChapterName = async () => {
    chapter.chapter_name = titleChapter;
    handleCancelPopup();
  };
  const handleAdd = async () => {
    handleCancelPopup();
    changeLoading();
    await addChapter(
      {
        chapter_name: chapter.chapter_name,
        content_chapter: contentChapter,
      },
      getCookie("adminToken")
    );
    changeLoading();
  };
  return (
    <>
      <h1 className="titlePageManagent">Chapter Edit</h1>
      <CardWrapLayout className={styles.wrapCard + " " + styles.wrapCard_top}>
        <ButtonNormal
          onClick={handleClickLeftOptions}
          className={styles.wrapCard_top_button}
          data-color-btn="red"
        >
          {isNewChapter ? "Cancel" : "Delete"}
        </ButtonNormal>
        <p
          className={styles.chapterName}
          onClick={() => {
            setShowPopup({ ...initialPopupStatus, isEditChapterName: true });
          }}
        >
          {chapter?.chapter_name
            ? chapter?.chapter_name
            : "Type your chapter name"}
        </p>
        <ButtonNormal
          onClick={handleClickRightOptions}
          className={styles.wrapCard_top_button}
          data-color-btn="orange"
        >
          {isNewChapter ? "Add" : "Save"}
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
      {showPopup.isLoading && <PopupLoading />}
      {showPopup.isDelete && (
        <PopupNormalTwoOption
          btn1Cus={{
            color: "green",
            text: "No",
            onClick: handleCancelPopup,
          }}
          btn2Cus={{
            color: "red",
            text: "Continue",
            onClick: handleClickDeleteChapter,
          }}
        >
          <p>Are you sure you want to delete this chapter?</p>
        </PopupNormalTwoOption>
      )}
      {showPopup.isAdd && (
        <PopupNormalTwoOption
          btn1Cus={{
            color: "green",
            text: "No",
            onClick: handleCancelPopup,
          }}
          btn2Cus={{
            color: "orange",
            text: "Continue",
            onClick: handleAdd,
          }}
        >
          <p>Are you sure you want to add this chapter?</p>
        </PopupNormalTwoOption>
      )}
      {showPopup.isSave && (
        <PopupNormalTwoOption
          btn1Cus={{
            color: "green",
            text: "No",
            onClick: handleCancelPopup,
          }}
          btn2Cus={{
            color: "orange",
            text: "Continue",
            onClick: handleClickSaveChange,
          }}
        >
          <p>Do you want to update this chapter?</p>
        </PopupNormalTwoOption>
      )}
      {showPopup.isEditChapterName && (
        <PopupNormalTwoOption
          btn1Cus={{
            color: "green",
            text: "No",
            onClick: handleCancelPopup,
          }}
          btn2Cus={{
            color: "orange",
            text: "Change",
            onClick: handleClickChangeChapterName,
          }}
        >
          <p>Change chapter name</p>
          <NormalInput
            value={titleChapter}
            onChange={({ target }) => setTitleChapter(target.value)}
          />
        </PopupNormalTwoOption>
      )}
    </>
  );
}
