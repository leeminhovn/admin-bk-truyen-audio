"use client";

import CardWrapLayout from "@/components/commons/cardsWrap/cardWrapLayout/CardWrapLayout";
import styles from "./AuthorInfoManagentPageStyle.module.scss";
import Image from "next/image";
import default_icon_user from "@/../public/assets/images/icons/author_black.svg";
import ButtonNormal from "@/components/commons/buttons/buttonNormal/ButtonNormal";
import { useState } from "react";
import PopupLoading from "@/components/commons/popups/popupLoading/PopupLoading";
import { getCookie } from "@/utils/features/localStorage";
import { useRouter } from "next/navigation";
import { updateAuthorBlockStatus } from "../../../../services/api/admin";

export default function AuthorInfoManagentPage({ infoAccount }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClickChangeBlockUser = async () => {
    setLoading(true);
    const statusBlock = infoAccount.isBlock;
    try {
      await updateAuthorBlockStatus(
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
  const handleClickBack = () => {
    router.back();
  };
  return (
    <>
      {loading && <PopupLoading />}
      <h1 className="titlePageManagent">Author info</h1>
      <CardWrapLayout className={styles.wrap}>
        <div className={styles.wrap_leftSide}>
          <div className={styles.wrap_leftSide_avatar}>
            <Image src={default_icon_user} alt="image user" />
            <b>{infoAccount.name}</b>
          </div>
          <div className={styles.wrap_leftSide_info}>
            <b>Email: {infoAccount.email}</b>
            <b>Money: {infoAccount.money}</b>

            <b>Khoá: {!!infoAccount.isBlock + ""}</b>
          </div>
        </div>
      </CardWrapLayout>
      <CardWrapLayout className={styles.wrapController}>
        <ButtonNormal onClick={handleClickBack} data-color-btn={"green"}>
          Back
        </ButtonNormal>
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
