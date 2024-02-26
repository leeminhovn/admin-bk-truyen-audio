import CardWrapLayoutStyle from "./CardWrapLayoutStyle.module.scss";

export default function CardWrapLayout({ children, className }) {
  return (
    <div className={`${CardWrapLayoutStyle.wrap} ${className}`}>{children}</div>
  );
}
