"use client";
import NavBarLeft from "./NavbarLeft/NavbarLeft";
import { wrapper, wrapper_main } from "./WrapperWebStyle.module.scss";
import { usePathname } from "next/navigation";

export default function WrapperWeb({ children }) {
  const pathName = usePathname();

  return pathName.includes("login") ? (
    children
  ) : (
    <div className={wrapper}>
      <NavBarLeft />
      <div className={wrapper_main}>{children}</div>
    </div>
  );
}
