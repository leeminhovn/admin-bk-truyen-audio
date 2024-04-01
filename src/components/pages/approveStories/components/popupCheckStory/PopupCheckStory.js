import PopupNormal from "@/components/commons/popups/popupNormal/PopupNormal";
import styles from "./PopupCheckStoryStyle.module.scss";
import Image from "next/image";
import ButtonNormal from "@/components/commons/buttons/buttonNormal/ButtonNormal";
import { useState } from "react";
import PopupNormalTwoOption from "@/components/commons/popups/popupNormalTwoOption/PopupNormalTwoOption";
import PopupLoading from "@/components/commons/popups/popupLoading/PopupLoading";
import { updateModerationStatus } from "../../../../../../services/api/admin";
import { getCookie } from "@/utils/features/localStorage";

export default function PopupCheckStory({ data, onCancel, setPageInfo }) {
  const [showConfirmReject, setShowConfirmReject] = useState(false);
  const [showConfirmApprove, setShowConfirmApprove] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [valueMessage, setValueMessage] = useState(data.moderator_feedback);

  const handleClickReject = () => {
    setShowConfirmReject(true);
  };
  const handleClickResolve = () => {
    setShowConfirmApprove(true);
  };
  const handleUpdateStory = async (status) => {
    setShowLoading(true);
    await updateModerationStatus(
      status,
      valueMessage,
      data._id,
      data.story,
      data.author_id,
      getCookie("adminToken")
    );
    setShowLoading(false);
    onCancel();
    setPageInfo((prev) => {
      return { ...prev };
    });
  };
  const handleApproved = () => {
    setShowConfirmApprove(false);
    handleUpdateStory(1);
  };
  const handleReject = () => {
    setShowConfirmReject(false);
    handleUpdateStory(2);
  };
  return (
    <>
      <PopupNormal className={styles.wrap}>
        <div className={styles.wrap_top}>
          <div className={styles.wrap_leftSide}>
            <Image
              className={styles.wrap_leftSide_imgStory}
              src={data.story.story_picture}
              width={250}
              height={300}
              alt="image story"
            />
            <ul>
              <li>
                Auhtor name: <b>{data.story.auhtor_name}</b>
              </li>
              <li>
                Story genres: <b>{data.story.story_genre}</b>
              </li>
            </ul>
          </div>
          <div className={styles.wrap_rightSide}>
            <h1>{data.story.story_name}</h1>
            <b className={styles.wrap_rightSide_labelMessage}>Quick review:</b>
            <p>{data.story.story_quick_review}</p>
            <b className={styles.wrap_rightSide_labelMessage}>
              Message from author:
            </b>
            <p>{data.author_message}</p>
          </div>
        </div>
        <b className={styles.wrap_messageFromAuthorLabel}>Message from admin</b>
        <textarea
          value={valueMessage}
          onChange={({ target }) => setValueMessage(target.value)}
          className={styles.wrap_adminMessage}
        ></textarea>
        <div className={styles.wrap_footer}>
          <ButtonNormal onClick={onCancel} data-color-btn={"red"}>
            Cancel
          </ButtonNormal>
          <ButtonNormal onClick={handleClickReject} data-color-btn={"orange"}>
            Reject
          </ButtonNormal>
          <ButtonNormal onClick={handleClickResolve} data-color-btn={"green"}>
            Approve
          </ButtonNormal>
        </div>
      </PopupNormal>
      {showConfirmReject && (
        <PopupNormalTwoOption
          btn1Cus={{
            color: "orange",
            text: "Cancel",
            onClick: () => {
              setShowConfirmReject(false);
            },
          }}
          btn2Cus={{
            color: "green",

            text: "Continue",
            onClick: handleReject,
          }}
        >
          <p>Bạn có chắc muốn reject bộ truyện này</p>
        </PopupNormalTwoOption>
      )}
      {showConfirmApprove && (
        <PopupNormalTwoOption
          btn1Cus={{
            color: "orange",
            text: "Cancel",
            onClick: () => {
              setShowConfirmApprove(false);
            },
          }}
          btn2Cus={{
            color: "green",

            text: "Continue",
            onClick: handleApproved,
          }}
        >
          <p>Bạn có chắc muốn approve bộ truyện này</p>
        </PopupNormalTwoOption>
      )}
      {showLoading && <PopupLoading />}
    </>
  );
}
