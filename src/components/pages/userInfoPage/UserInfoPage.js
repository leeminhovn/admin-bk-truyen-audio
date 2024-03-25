"use client";

import CardWrapLayout from "@/components/commons/cardsWrap/cardWrapLayout/CardWrapLayout";
import styles from "./UserInfoPageStyle.module.scss";
import Image from "next/image";
import default_icon_user from "@/../public/assets/images/icons/default_icon_user.svg";
import ButtonNormal from "@/components/commons/buttons/buttonNormal/ButtonNormal";
import { useState } from "react";
import PopupLoading from "@/components/commons/popups/popupLoading/PopupLoading";
import { updateUserBlockStatus } from "../../../../services/api/users";
import { getCookie } from "@/utils/features/localStorage";

export default function UserInfoPage({ infoAccount }) {
  const [loading, setLoading] = useState(false);

  const handleClickChangeBlockUser = async () => {
    setLoading(true);
    const statusBlock = infoAccount.isBlock;
    try {
      await updateUserBlockStatus(
        !statusBlock,
        getCookie("adminToken"),
        infoAccount._id
      );
      infoAccount.isBlock = !statusBlock;
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  return (
    <>
      {loading && <PopupLoading />}
      <h1 className="titlePageManagent">User info</h1>
      <CardWrapLayout className={styles.wrap}>
        <div className={styles.wrap_leftSide}>
          <div className={styles.wrap_leftSide_avatar}>
            <Image src={default_icon_user} alt="image user" />
            <b>{infoAccount.name}</b>
          </div>
          <div className={styles.wrap_leftSide_info}>
            <b>Email: {infoAccount.email}</b>
            <b>Level: {infoAccount.level}</b>
            <b>Linh Thạch: {infoAccount.spirit_stone}</b>
            <b>Area: {infoAccount.area}</b>
            <b>Khoá: {!!infoAccount.isBlock + ""}</b>
          </div>
        </div>
      </CardWrapLayout>
      <CardWrapLayout className={styles.wrapController}>
        <ButtonNormal
          onClick={handleClickChangeBlockUser}
          data-color-btn={"red"}
        >
          {!!infoAccount.isBlock ? "Bỏ Khoá" : "Khoá tài khoản "}
        </ButtonNormal>
      </CardWrapLayout>
    </>
  );
}
