import Image from "next/image";
import { wrapper, wrapper_active } from "./IteamNavStyle.module.scss";
import Link from "next/link";

export default function IteamNav({
  icon = "",
  title = "",
  isActive = false,
  link = "",
  activeIcon = "",
}) {
  return (
    <Link href={link}>
      <div className={`${wrapper} ${isActive ? wrapper_active : ""}`}>
        <Image src={isActive ? activeIcon : icon} alt="icon page" />
        <span>{title}</span>
      </div>
    </Link>
  );
}
