import ButtonNormal from "../../buttons/buttonNormal/ButtonNormal";
import PopupNormal from "../popupNormal/PopupNormal";
import styles from "./PopupNormalTwoOptionStyle.module.scss";

export default function PopupNormalTwoOption({
  classMore = "",
  children,
  btn1Cus = { color: "orange", text: "cancel", onClick: () => {} },
  btn2Cus = { color: "green", text: "Continue", onClick: () => {} },
}) {
  return (
    <PopupNormal className={styles.wrap + " " + classMore}>
      {children}
      <div className="d-flex-grow-1"></div>
      <div className={styles.wrap_wrapBtn}>
        <ButtonNormal data-color-btn={btn1Cus.color} onClick={btn1Cus.onClick}>
          {btn1Cus.text}
        </ButtonNormal>
        <ButtonNormal data-color-btn={btn2Cus.color} onClick={btn2Cus.onClick}>
          {btn2Cus.text}
        </ButtonNormal>
      </div>
    </PopupNormal>
  );
}
