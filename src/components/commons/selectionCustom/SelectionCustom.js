import { useRef } from "react";
import styles from "./SelectionCustomStyle.module.scss";

export default function SelectionCustom(props) {
  const dataRender = props["data-render"] || [];
  const refSelect = useRef();

  return (
    <div className={styles.wrap}>
      <select ref={refSelect} {...props} size="1">
        {dataRender.map((item, index) => {
          return (
            <option key={index} value={index}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
}
