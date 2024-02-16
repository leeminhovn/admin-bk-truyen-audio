import Image from "next/image";
import {
  wrapper,
  wrapper_active,
  itemLinkNav,
  itemLinkNav_active,
} from "./IteamNavStyle.module.scss";
import Link from "next/link";
import { useEffect } from "react";

export default function IteamNav({
  icon = "",
  title = "",
  isActive = false,
  link = "",
  activeIcon = "",
  index = 0,
}) {
  useEffect(() => {
    isActive &&
      document.documentElement.style.setProperty(
        "--offset-el-indicator",
        index * 50 + "px"
      );
  }, [isActive]);

  return (
    <Link
      className={`${itemLinkNav} ${isActive ? itemLinkNav_active : ""}`}
      href={link}
    >
      <div className={`${wrapper} ${isActive ? wrapper_active : ""}`}>
        <Image src={isActive ? activeIcon : icon} alt="icon page" />
        <span>{title}</span>
      </div>
    </Link>
  );
}
