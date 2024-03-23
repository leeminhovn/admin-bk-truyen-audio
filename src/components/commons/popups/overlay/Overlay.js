import style from "./OverlayStyle.module.scss";

export default function Overlay(props) {
  return <div {...props} className={style.wrap}></div>;
}
