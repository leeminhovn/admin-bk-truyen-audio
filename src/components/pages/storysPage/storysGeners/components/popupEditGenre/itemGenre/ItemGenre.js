import styles from "./ItemGenreStyle.module.scss";

export default function ItemGenre({ isSelected, title, setListSelected }) {
  const handelClick = () => {
    if (isSelected) {
      setListSelected((prev) => {
        return [...prev.filter((check) => check !== title)];
      });
    } else {
      setListSelected((prev) => {
        return [...prev, title];
      });
    }
  };

  return (
    <div onClick={handelClick} className={styles.wrap}>
      <input readOnly type="checkbox" checked={isSelected}></input>
      <label>{title}</label>
    </div>
  );
}
