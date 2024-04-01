import { useState } from "react";
import ButtonNormal from "../../buttons/buttonNormal/ButtonNormal";
import CardWrapLayout from "../../cardsWrap/cardWrapLayout/CardWrapLayout";
import NormalInput from "../../inputs/normalInput/NormalInput";
import styles from "./NormalPaginationStyle.module.scss";

export default function NormalPagination({
  onPrev = () => {},
  maxPage = 0,
  currentPage = 0,
  onNext = () => {},
  onGotoIndexPage = () => {},
}) {
  const [pageGoto, setPageGoto] = useState("");
  return (
    <CardWrapLayout className={styles.wrap}>
      <div className={styles.wrap_main}>
        <ButtonNormal disabled={currentPage === 0} onClick={onPrev}>
          Prev
        </ButtonNormal>
        <div className={styles.wrap_main_page}>
          {currentPage} <span>/</span>
          {maxPage}
        </div>
        <ButtonNormal disabled={currentPage === maxPage} onClick={onNext}>
          Next
        </ButtonNormal>
      </div>
      <div className={styles.wrap_gotoPage}>
        <NormalInput
          value={pageGoto}
          onChange={({ target }) => setPageGoto(Math.abs(target.value))}
          type="number"
        ></NormalInput>
        <ButtonNormal
          onClick={() => {
            onGotoIndexPage(pageGoto);
          }}
          disabled={pageGoto > maxPage || pageGoto === ""}
          data-color-btn="orange"
        >
          Go
        </ButtonNormal>
      </div>
    </CardWrapLayout>
  );
}
