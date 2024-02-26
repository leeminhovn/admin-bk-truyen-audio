import { wrap } from "./NormalInputStyle.module.scss";

export default function NormalInput(props) {
  return <input {...props} className={wrap + " " + (props.className || "")} />;
}
