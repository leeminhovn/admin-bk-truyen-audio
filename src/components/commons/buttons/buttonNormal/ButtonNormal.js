import Image from "next/image";
import {
  wrap,
  purple_btn,
  disabled,
  loadingAnimation,
  orange_btn,
  green_btn,
  yellow_btn,
  red_btn,
} from "./ButtonNormalStyle.module.scss";
import animationSvg from "@/../public/assets/animations/loading_button_image.svg";

const buttonClass = {
  purple: purple_btn,
  orange: orange_btn,
  green: green_btn,
  yellow: yellow_btn,
  red: red_btn,
};

export default function ButtonNormal(props) {
  const classBtn = buttonClass[props["data-color-btn"]] || buttonClass.purple;
  const classDisabled = props.disabled ? disabled : "";
  const isLoading = props["is-loading"] === "true";

  return (
    <button
      disabled={props.disabled || isLoading}
      {...props}
      className={`${wrap} ${
        props.className || ""
      } ${classBtn} ${classDisabled}`}
    >
      {isLoading ? (
        <Image
          className={loadingAnimation}
          src={animationSvg}
          alt="loading animation button"
        />
      ) : (
        props.children
      )}
    </button>
  );
}
