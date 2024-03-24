"use-client";
import CardWrapLayout from "@/components/commons/cardsWrap/cardWrapLayout/CardWrapLayout";
import styles from "./SearchHeaderUserStyle.module.scss";
import SearchBar, {
  ShowCaseInputSearch,
} from "@/components/commons/inputs/searchBar/SearchBar";
import { useState } from "react";
import SelectionCustom from "@/components/commons/selectionCustom/SelectionCustom";

export default function SearchHeaderUser({ setInfoGetData, infoGetData }) {
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

    statusSearch !== "not-search" && setStatusSearch("not-search");
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
        placeholder="Type user name"
      />
      <SelectedOptionsLimitSearch
        infoGetData={infoGetData}
        setInfoGetData={setInfoGetData}
      />
    </CardWrapLayout>
  );
}

export const SelectedOptionsLimitSearch = ({ setInfoGetData }) => {
  const dataSelect = [
    { value: "20", label: "20" },
    { value: "40", label: "40" },
    { value: "100", label: "100" },
  ];

  return (
    <div className={styles.wrapOtherSelected}>
      <b>Limit:</b>
      <SelectionCustom
        onChange={({ value }) => {
          setInfoGetData((prev) => {
            return { ...prev, limit: value };
          });
        }}
        options={dataSelect}
        defaultValue={dataSelect[0]}
      ></SelectionCustom>
    </div>
  );
};
