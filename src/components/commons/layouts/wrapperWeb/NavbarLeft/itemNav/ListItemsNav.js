import { usePathname } from "next/navigation";
import IteamNav from "./IteamNav";
import {
  ListItemsNavWrapper,
  indicator,
  wrapper,
  itemLinkNav,
} from "./IteamNavStyle.module.scss";
import logoutIcon from "@/../public/assets/images/icons/logout.png";

import Link from "next/link";
import Image from "next/image";
import { deleteCookie } from "@/utils/features/localStorage";

export default function ListItemsNav({ data }) {
  const pathName = usePathname();
  const handleLogout = () => {
    deleteCookie("adminRefreshToken");
    deleteCookie("adminToken");
  };
  return (
    <div className={ListItemsNavWrapper}>
      {data.map((item, index) => (
        <IteamNav
          {...item}
          key={index}
          index={index}
          isActive={pathName.includes(item.link)}
        />
      ))}
      <Link
        onClick={handleLogout}
        className={`${itemLinkNav} ${""}`}
        href={"/login"}
      >
        <div className={`${wrapper} ${""}`}>
          <section>
            <Image src={logoutIcon} alt="icon page" />
          </section>
          <span>Logout</span>
        </div>
      </Link>
      <span className={indicator} />
    </div>
  );
}
