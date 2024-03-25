import CardWrapLayout from "@/components/commons/cardsWrap/cardWrapLayout/CardWrapLayout";
import { useEffect, useState } from "react";
import style from "./StorysGenersStyle.module.scss";
import {
  addGenre,
  deleteGenre,
  getAllGenres,
} from "../../../../../services/api/storys";
import close_black from "@/../public/assets/images/icons/close_black.svg";
import Image from "next/image";
import NormalInput from "@/components/commons/inputs/normalInput/NormalInput";
import ButtonNormal from "@/components/commons/buttons/buttonNormal/ButtonNormal";
import { getCookie } from "@/utils/features/localStorage";
import PopupLoading from "@/components/commons/popups/popupLoading/PopupLoading";
import PopupNormal from "@/components/commons/popups/popupNormal/PopupNormal";

export default function StorysGeners() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowDeletePopup, setIsShowDeletePopup] = useState(false);
  const [currentItemDelete, setCurrentItemDelete] = useState(null);

  const handleGetData = () => {
    getAllGenres().then((data) => {
      setData(data.data);
    });
  };
  useEffect(() => {
    handleGetData();
  }, []);

  const handleClickRemove = (idx) => {
    setIsShowDeletePopup(true);
    setCurrentItemDelete(idx);
  };
  const handleCLosePopup = () => {
    setCurrentItemDelete(null);
    setIsShowDeletePopup(false);
  };

  const handleDeleteGenre = async () => {
    handleCLosePopup();
    setIsLoading(true);
    try {
      const deleteId = data[currentItemDelete]._id;
      await deleteGenre(deleteId, getCookie("adminToken"));
      setData(data.filter((genre) => genre._id !== deleteId));
      setIsLoading(false);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <h2 className="titlePageManagent">Storys genres</h2>

      <CardWrapLayout>
        <div className={style.wrapListGenre}>
          {data.map((e, idx) => (
            <Iteam
              key={idx}
              isCurrentDelete={currentItemDelete === idx}
              data={e}
              handleClickRemove={() => handleClickRemove(idx)}
              setIsLoading={setIsLoading}
            />
          ))}
        </div>
      </CardWrapLayout>
      <AddGenreComponent handleGetData={handleGetData} />
      {isLoading && <PopupLoading />}
      {isShowDeletePopup && (
        <PopupNormal className={style.wrapPopupDelete}>
          <p>
            Bạn Có chắc muốn xoá thể loại truyện này? Thể loại này cũng sẽ biến
            mất ở một số bộ truyện !
          </p>
          <div className={style.wrapPopupDelete_space}></div>
          <div className={style.wrapPopupDelete_wrapBtn}>
            <ButtonNormal onClick={handleCLosePopup} data-color-btn={"orange"}>
              Cancel
            </ButtonNormal>
            <ButtonNormal onClick={handleDeleteGenre} data-color-btn={"green"}>
              Continue
            </ButtonNormal>
          </div>
        </PopupNormal>
      )}
    </>
  );
}
function Iteam({ data, handleClickRemove, isCurrentDelete }) {
  return (
    <span
      className={
        style.wrapListGenre_item +
        " " +
        (isCurrentDelete ? style.isCurretnDelete : "")
      }
    >
      {data.title}
      <Image
        className={style.wrapListGenre_item_close}
        alt="delete icon"
        width={20}
        onClick={handleClickRemove}
        src={close_black}
      />
    </span>
  );
}
function AddGenreComponent({ handleGetData }) {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await addGenre(value, getCookie("adminToken"));
    handleGetData();
    setValue("");
    setIsLoading(false);
  };

  return (
    <CardWrapLayout className={style.wrapAddGenre}>
      <NormalInput
        value={value}
        onChange={({ target: { value } }) => setValue(value)}
        className={style.wrapAddGenre_input}
        placeholder="Add new genre"
      />
      <ButtonNormal
        onClick={handleClick}
        is-loading={isLoading + ""}
        disabled={value.length === 0}
        className={style.wrapAddGenre_addBtn}
        purple={"true"}
      >
        Add
      </ButtonNormal>
    </CardWrapLayout>
  );
}
