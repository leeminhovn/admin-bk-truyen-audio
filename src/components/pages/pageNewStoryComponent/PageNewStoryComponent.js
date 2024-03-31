"use client";

import CardWrapLayout from "@/components/commons/cardsWrap/cardWrapLayout/CardWrapLayout";
import styles from "./PageNewStoryComponent.style.module.scss";
import Image from "next/image";
import iconBk from "@/../public/assets/images/icons/bk_icon.png";
import NormalInput from "@/components/commons/inputs/normalInput/NormalInput";
import { useState } from "react";
import ButtonNormal from "@/components/commons/buttons/buttonNormal/ButtonNormal";
import PopupEditGenre from "../storysPage/storysGeners/components/popupEditGenre/PopupEditGenre";
import PopupNormalTwoOption from "@/components/commons/popups/popupNormalTwoOption/PopupNormalTwoOption";
import PopupLoading from "@/components/commons/popups/popupLoading/PopupLoading";
import { useRouter } from "next/navigation";
import { addStoryByAuthor } from "../../../../services/api/admin";
import { getCookie } from "@/utils/features/localStorage";
import { useSelector } from "react-redux";

export default function PageNewStoryComponent() {
  const { userInfo } = useSelector((state) => state.user);
  const [nameStory, setNameStory] = useState("");
  const [quickReview, setQuickReview] = useState("");
  const [genres, setGenres] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [linkPicture, setLinkPicture] = useState("");
  const [showPopup, setShowPopup] = useState({
    isShowEditGenre: false,
    isShowChangePicture: false,
    iShowPopupSend: false,
  });
  const isDisable =
    !nameStory.length || !quickReview.length || !genres.length || !linkPicture;

  const handleChangePopupShow = (name, status) => {
    setShowPopup((prev) => {
      return { ...prev, [name]: status };
    });
  };
  const handleSubmitStory = () => {
    handleChangePopupShow("iShowPopupSend", true);
  };

  return (
    <>
      {showPopup.isShowChangePicture && (
        <PopupShowChangeImage
          handleChangePopupShow={handleChangePopupShow}
          linkPicture={linkPicture}
          setLinkPicture={setLinkPicture}
        />
      )}
      {showPopup.isShowEditGenre && (
        <PopupEditGenre
          genres={genres}
          updateGenres={(newGenres) => {
            setGenres(newGenres);
          }}
          setIsShowEditGenre={() =>
            handleChangePopupShow("isShowEditGenre", false)
          }
        />
      )}
      <h1 className={"titlePageManagent"}>New story</h1>
      <CardWrapLayout className={styles.wrap}>
        <div className={styles.wrap_leftSide}>
          <div
            className={styles.wrap_leftSide_image}
            onClick={() => {
              handleChangePopupShow("isShowChangePicture", true);
            }}
          >
            <Image
              width={250}
              height={300}
              src={linkPicture || iconBk}
              alt="iamge story"
            />
          </div>
        </div>
        <div className={styles.wrap_rightSide}>
          <WrapEditStoryInfo title={"Story name"}>
            <NormalInput
              value={nameStory}
              onChange={({ target }) => {
                setNameStory(target.value);
              }}
              placeholder="Name story"
              className={styles.wrap_rightSide_name}
            ></NormalInput>
          </WrapEditStoryInfo>
          <WrapEditStoryInfo title={"Quick review"}>
            <textarea
              value={quickReview}
              onChange={({ target }) => {
                setQuickReview(target.value);
              }}
              placeholder="Write quick review of story "
              className={styles.wrap_rightSide_quickReview}
            ></textarea>
          </WrapEditStoryInfo>
          <WrapEditStoryInfo title={"Genres"}>
            <div className={styles.wrap_rightSide_genres}>
              <NormalInput
                onClick={() => {
                  handleChangePopupShow("isShowEditGenre", true);
                }}
                readOnly={true}
                value={genres}
                onChange={() => {}}
                placeholder="Story genres"
                className={styles.wrap_rightSide_genres_input}
              ></NormalInput>
            </div>
          </WrapEditStoryInfo>
          <WrapEditStoryInfo title={"Send message"}>
            <textarea
              value={message}
              placeholder="Write down your wishes for the moderators "
              className={styles.wrap_rightSide_message}
              onChange={({ target }) => {
                setMessage(target.value);
              }}
            ></textarea>
          </WrapEditStoryInfo>
          <ButtonNormal
            onClick={handleSubmitStory}
            disabled={isDisable}
            className={styles.wrap_rightSide_sendBtn}
            data-color-btn="orange"
          >
            Submit
          </ButtonNormal>
        </div>
        {showPopup.iShowPopupSend && (
          <PopupConfirmSend
            storySend={{
              story_name: nameStory,
              story_quick_review: quickReview,
              completed_status: 0,
              story_picture: linkPicture,
              story_genre: genres,
              chapters: [],
              auhtor_name: userInfo.name,
            }}
            author_id={userInfo._id}
            author_message={message}
            setShowLoading={setShowLoading}
            handleChangePopupShow={handleChangePopupShow}
          />
        )}
        {showLoading && <PopupLoading />}
      </CardWrapLayout>
    </>
  );
}
const WrapEditStoryInfo = (props) => {
  return (
    <div className={styles.wrapEdit}>
      <b>{props.title}: </b>
      {props.children}
    </div>
  );
};
const PopupShowChangeImage = ({
  linkPicture,
  setLinkPicture,
  handleChangePopupShow,
}) => {
  const handleChangeImage = () => {
    setLinkPicture(valueImage);
    closePopup();
  };
  const closePopup = () => {
    handleChangePopupShow("isShowChangePicture", false);
  };
  const [valueImage, setValueImage] = useState(linkPicture);
  return (
    <PopupNormalTwoOption
      btn1Cus={{
        color: "orange",
        text: "Cancel",
        onClick: closePopup,
      }}
      btn2Cus={{
        color: "green",
        text: "Continue",
        onClick: handleChangeImage,
        disabled: !(
          (valueImage.startsWith("https://") ||
            valueImage.startsWith("http://")) &&
          valueImage.length > 15
        ),
      }}
      classMore={styles.wrapPopupChangeImg}
    >
      <p>Write in the link the image you want to replace</p>
      <NormalInput
        value={valueImage}
        onChange={({ target }) => setValueImage(target.value)}
        className={styles.wrapPopupChangeImg_input}
        placeholder="Type your image link"
      ></NormalInput>
    </PopupNormalTwoOption>
  );
};
const PopupConfirmSend = ({
  setShowLoading,
  handleChangePopupShow,
  storySend,
  author_id,
  author_message,
}) => {
  const router = useRouter();
  const closePopup = () => {
    handleChangePopupShow("iShowPopupSend", false);
  };
  const handleSubmit = async () => {
    setShowLoading(true);
    closePopup();
    setTimeout(() => {
      router.push(process.env.NEXT_PUBLIC_WEB_URL + "mail-managent");
    }, 200);

    await addStoryByAuthor(
      storySend,
      author_id,
      author_message,
      getCookie("adminToken")
    );
  };
  return (
    <PopupNormalTwoOption
      btn1Cus={{
        color: "orange",
        text: "No",
        onClick: closePopup,
      }}
      btn2Cus={{
        color: "green",
        text: "Yes",
        onClick: handleSubmit,
      }}
      classMore={styles.wrapPopupConfirmSend}
    >
      <p>Are you sure you want to send this story?</p>
    </PopupNormalTwoOption>
  );
};
