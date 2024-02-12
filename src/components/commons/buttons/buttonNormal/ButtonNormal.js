import { wrap, purple_btn, disabled } from "./ButtonNormalStyle.module.scss";

const buttonClass = {
  purple: purple_btn,
};

export default function ButtonNormal(props) {
  const classBtn = buttonClass[props.colorBtn] || buttonClass.purple;
  const classDisabled = props.disabled ? disabled : "";

  return (
    <button
      disabled={props.disabled}
      {...props}
      className={`${wrap} ${
        props.className || ""
      } ${classBtn} ${classDisabled}`}
    />
  );
}
