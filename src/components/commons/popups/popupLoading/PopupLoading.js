import Image from "next/image";
import CardWrapLayout from "../../cardsWrap/cardWrapLayout/CardWrapLayout";
import Overlay from "../overlay/Overlay";
import style from "./PopupLoadingStyle.module.scss";
import animation from "@/../public/assets/animations/loading_button_image.svg";

export default function PopupLoading() {
  return (
    <Overlay>
      <div className={style.wrap}>
        <CardWrapLayout className={style.wrap_card}>
          <Image src={animation} alt="loading image" width={45} />
        </CardWrapLayout>
      </div>
      ;
    </Overlay>
  );
}
