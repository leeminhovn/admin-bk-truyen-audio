import Image from "next/image";
import {
  wrap,
  purple_btn,
  disabled,
  loadingAnimation,
} from "./ButtonNormalStyle.module.scss";
import animationSvg from "@/../public/assets/animations/loading_button_image.svg";

const buttonClass = {
  purple: purple_btn,
};

export default function ButtonNormal(props) {
  const classBtn = buttonClass[props.colorBtn] || buttonClass.purple;
  const classDisabled = props.disabled ? disabled : "";
  const isLoading = props.isLoading;

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
