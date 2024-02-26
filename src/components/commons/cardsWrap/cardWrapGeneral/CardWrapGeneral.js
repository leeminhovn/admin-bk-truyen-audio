import CardWrapGeneralStyle from "./CardWrapGeneral.module.scss";

export default function CardWrapGeneral({ children }) {
  return <div className={CardWrapGeneralStyle.wrap}>{children}</div>;
}
