import styles from "./SelectionCustomStyle.module.scss";
import Select from "react-select";

export default function SelectionCustom({
  onChange = () => {},
  options = [],
  defaultValue,
  className = "",
}) {
  return (
    <div className={styles.wrap + " " + className}>
      <Select
        defaultValue={defaultValue}
        onChange={onChange}
        options={options}
      />
    </div>
  );
}
