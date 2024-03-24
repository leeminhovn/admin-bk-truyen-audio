"use client";
import { useEffect } from "react";
import NavBarLeft from "./NavbarLeft/NavbarLeft";
import { wrapper, wrapper_main } from "./WrapperWebStyle.module.scss";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { getCookie } from "@/utils/features/localStorage";

export default function WrapperWeb({ children }) {
  const pathName = usePathname();
  const userStates = useSelector((state) => state.user);
  const
  useEffect(() => {
    if (!userStates.userInfo.email && getCookie("adminToken")) {
    }
  }, []);
  return pathName.includes("login") || pathName.includes("signup") ? (
    children
  ) : (
    <div className={wrapper}>
      <NavBarLeft />
      <div className={wrapper_main}>{children}</div>
    </div>
  );
}
