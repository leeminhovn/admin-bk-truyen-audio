import CardWrapLayout from "@/components/commons/cardsWrap/cardWrapLayout/CardWrapLayout";
import styles from "./SearchHeaderStoryStyle.module.scss";
import SearchBar, {
  ShowCaseInputSearch,
} from "@/components/commons/inputs/searchBar/SearchBar";
import { useState } from "react";

export default function SearchHeaderStory({ setInfoGetData }) {
  const [value, setValue] = useState("");
  const [statusSearch, setStatusSearch] = useState("not-search");

  const onClear = async () => {
    setValue("");
    setStatusSearch("not-search");
  };
  const onSearch = async () => {
    setInfoGetData((prev) => {
      return { ...prev, search: value };
    });
    setStatusSearch("search");
  };
  const onChange = ({ target }) => {
    setValue(target.value);

    if (value.length === 0) {
      setStatusSearch("not-search");
    }
  };
  return (
    <CardWrapLayout className={styles.headerSearch}>
      <SearchBar
        value={value}
        showCase={
          statusSearch === "not-search"
            ? ShowCaseInputSearch.default
            : ShowCaseInputSearch.clear
        }
        onClear={onClear}
        onSearch={onSearch}
        onChange={onChange}
        placeholder="Type story name"
      />
    </CardWrapLayout>
  );
}
