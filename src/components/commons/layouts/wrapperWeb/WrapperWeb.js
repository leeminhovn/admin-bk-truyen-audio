import NavBarLeft from "./NavbarLeft/NavbarLeft";
import { wrapper, wrapper_main } from "./WrapperWebStyle.module.scss";

export default function WrapperWeb({ children }) {
  return (
    <div className={wrapper}>
      <NavBarLeft />
      <div className={wrapper_main}>{children}</div>
    </div>
  );
}
