import Image from "next/image";
import styles from "./SearchBarStyle.module.scss";
import iconLoading from "@/../public/assets/animations/loading_button_image.svg";
import searchIcon from "@/../public/assets/images/icons/search_icon.svg";
import close_black from "@/../public/assets/images/icons/close_black.svg";

export const ShowCaseInputSearch = {
  default: "default",
  loading: "loading",
  clear: "clear",
};

export default function SearchBar(props) {
  const {
    showCase = ShowCaseInputSearch.default,
    onClear = () => {},
    onSearch = () => {},
  } = props;
  const inputProps = { ...props };

  delete inputProps.onClear;
  delete inputProps.onSearch;
  delete inputProps.showCase;
  return (
    <div className={styles.wrap}>
      <input {...inputProps} type="text" />
      <HandleRenderIcon
        showCase={showCase}
        onClear={onClear}
        onSearch={onSearch}
      />
    </div>
  );
}
function HandleRenderIcon({ showCase, onClear, onSearch }) {
  switch (showCase) {
    case ShowCaseInputSearch.clear: {
      return (
        <Image
          src={close_black}
          className={styles.clearIcon}
          alt="clear icon"
          onClick={onClear}
        />
      );
    }
    case ShowCaseInputSearch.loading: {
      return (
        <Image
          className={styles.loadIcon}
          src={iconLoading}
          alt="loading icon"
        />
      );
    }
    default: {
      return (
        <Image
          onClick={onSearch}
          className={styles.searchIcon}
          src={searchIcon}
          alt="search icon"
        />
      );
    }
  }
}
