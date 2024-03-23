import CardWrapLayout from "../../cardsWrap/cardWrapLayout/CardWrapLayout";
import Overlay from "../overlay/Overlay";
import style from "./PopupNormalStyle.module.scss";

export default function PopupNormal(props) {
  return (
    <Overlay>
      <CardWrapLayout
        {...props}
        className={style.wrap + " " + props.className}
      ></CardWrapLayout>
      ;
    </Overlay>
  );
}
