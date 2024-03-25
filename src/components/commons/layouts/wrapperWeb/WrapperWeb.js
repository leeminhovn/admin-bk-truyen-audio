"use client";
import { useEffect } from "react";
import NavBarLeft from "./NavbarLeft/NavbarLeft";
import { wrapper, wrapper_main } from "./WrapperWebStyle.module.scss";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "@/utils/features/localStorage";
import { userAdminGetInfo } from "../../../../../provider/redux/userSlice";

export default function WrapperWeb({ children }) {
  const pathName = usePathname();
  const userStates = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const cookieToken = getCookie("adminToken");
    if (!userStates.userInfo.email && cookieToken) {
      dispatch(userAdminGetInfo({ token: cookieToken }));
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
