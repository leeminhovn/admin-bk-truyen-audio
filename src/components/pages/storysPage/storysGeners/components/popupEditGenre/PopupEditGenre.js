import PopupNormal from "@/components/commons/popups/popupNormal/PopupNormal";
import styles from "./PopupEditGenreStyle.module.scss";
import { useEffect, useRef, useState } from "react";
import PopupLoading from "@/components/commons/popups/popupLoading/PopupLoading";
import { getAllGenres } from "../../../../../../../services/api/storys";
import ButtonNormal from "@/components/commons/buttons/buttonNormal/ButtonNormal";
import ItemGenre from "./itemGenre/ItemGenre";
import { arraysHaveSameElements } from "@/utils/features/arrays";

export default function PopupEditGenre({
  setIsShowEditGenre,
  genres,
  updateGenres,
}) {
  const [data, setData] = useState([]);
  const [listSelected, setListSelected] = useState(genres.split(", "));
  const oriGinListSelected = useRef(listSelected);

  useEffect(() => {
    const handleGetData = async () => {
      const { data } = await getAllGenres();
      setData(data);
    };
    handleGetData();
  }, []);

  const handelSaveGener = () => {
    // setData([]);
    oriGinListSelected.current = listSelected;
    setIsShowEditGenre(false);
    const stringGenres = listSelected.join(", ");
    updateGenres(
      stringGenres.startsWith(", ")
        ? stringGenres.replace(", ", "")
        : stringGenres
    );
  };
  return data.length === 0 ? (
    <PopupLoading />
  ) : (
    <PopupNormal className={styles.wrap}>
      <div className={styles.wrap_top}>
        {data.map((genre, idx) => (
          <ItemGenre
            isSelected={listSelected.includes(genre.title)}
            key={idx}
            setListSelected={setListSelected}
            title={genre.title}
          />
        ))}
      </div>
      <div className="d-flex-grow-1"></div>
      <div className={styles.wrap_bottom}>
        <ButtonNormal
          onClick={() => {
            setIsShowEditGenre(false);
          }}
          data-color-btn={"orange"}
        >
          Cancel
        </ButtonNormal>
        <ButtonNormal
          disabled={arraysHaveSameElements(
            listSelected,
            oriGinListSelected.current
          )}
          onClick={handelSaveGener}
          data-color-btn={"purple"}
        >
          Continue
        </ButtonNormal>
      </div>
    </PopupNormal>
  );
}
