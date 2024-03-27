"use client";

import CardWrapLayout from "@/components/commons/cardsWrap/cardWrapLayout/CardWrapLayout";
import styles from "./ChapterManagnentStyle.module.scss";
import { useRef, useState } from "react";
import ButtonNormal from "@/components/commons/buttons/buttonNormal/ButtonNormal";
import NormalInput from "@/components/commons/inputs/normalInput/NormalInput";
import NormalTable from "@/components/commons/tables/normalTable/NormalTable";
import { useRouter } from "next/navigation";

const columns = [
  { header: "Index", field: "index", width: "2%", gravity: "center" },
  { header: "Name", field: "chapter_name", width: "98%" },

  // area
];
export default function ChapterManagnent({ chapters }) {
  const [pageCurrent, setPageCurrent] = useState(0);
  const router = useRouter();
  const maxPage = useRef(Math.ceil(chapters.length / 10));
  const handleClickRow = (data) => {
    router.push(window.location.href + "/" + data._id);
  };
  return (
    <>
      <h1 className="titlePageManagent">Chapters</h1>
      <CardWrapLayout className={styles.wrap}>
        <div className={styles.controllChapterTop}>
          {/* button prev */}
          <ButtonNormal
            onClick={() => setPageCurrent((prev) => prev - 1)}
            disabled={pageCurrent === 0}
            className={styles.controllChapterTop_btn}
            data-color-btn="purple"
          >
            Prev
          </ButtonNormal>
          <div className={styles.controllChapterTop_seeIndex}>
            <span>{pageCurrent}</span> - <b>{maxPage.current}</b>
          </div>
          {/* button next */}
          <ButtonNormal
            disabled={pageCurrent === maxPage.current}
            onClick={() => setPageCurrent((prev) => prev + 1)}
            className={styles.controllChapterTop_btn}
            data-color-btn="purple"
          >
            Next
          </ButtonNormal>
          <div className={styles.controllChapterTop_moveTo}>
            {/* input */}
            <NormalInput
              type="number"
              id="input-move-to-page"
              className={styles.controllChapterTop_input}
            />
            <span className={styles.sperted}>/</span>
            <ButtonNormal
              onClick={() => {
                setPageCurrent(
                  Number(
                    document.getElementById("input-move-to-page").value || 0
                  )
                );
              }}
              className={styles.controllChapterTop_btn}
              data-color-btn="purple"
            >
              Move to Page
            </ButtonNormal>
          </div>
        </div>
        <div className={styles.controllChapterBottom}>
          <ButtonNormal
            data-color-btn={"orange"}
            className={styles.controllChapterBottom_btnAdd}
          >
            Add new chapter
          </ButtonNormal>
        </div>
      </CardWrapLayout>
      <NormalTable
        onClickRow={handleClickRow}
        isLoading={false}
        columns={columns}
        data={[...chapters].splice(pageCurrent, 20)}
      />
    </>
  );
}
