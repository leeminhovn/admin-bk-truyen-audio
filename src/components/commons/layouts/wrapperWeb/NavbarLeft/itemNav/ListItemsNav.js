import { usePathname, useRouter } from "next/navigation";
import IteamNav from "./IteamNav";
import {
  ListItemsNavWrapper,
  indicator,
  wrapper,
  itemLinkNav,
} from "./IteamNavStyle.module.scss";
import styles from "./IteamNavStyle.module.scss";
import logoutIcon from "@/../public/assets/images/icons/logout.png";

import Link from "next/link";
import Image from "next/image";
import { deleteCookie, getCookie } from "@/utils/features/localStorage";
import { useSelector } from "react-redux";
import { useState } from "react";
import PopupNormal from "@/components/commons/popups/popupNormal/PopupNormal";
import ButtonNormal from "@/components/commons/buttons/buttonNormal/ButtonNormal";
import { apiAdminLogout } from "../../../../../../../services/api/auth";

export default function ListItemsNav({ data }) {
  const { userInfo } = useSelector((state) => state.user);

  const pathName = usePathname();

  let count = 0;
  return (
    <div className={ListItemsNavWrapper}>
      {data.map((item, index) => {
        const isShow = item.role.includes(userInfo.role);

        return isShow ? (
          <IteamNav
            {...item}
            key={count}
            index={count++}
            isActive={pathName.includes(item.link)}
          />
        ) : (
          ""
        );
      })}
      <LogoutComponent userInfo={userInfo} />
      <span className={indicator} />
    </div>
  );
}
const LogoutComponent = ({ userInfo }) => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const rotuer = useRouter();

  const handleLogout = async () => {
    await apiAdminLogout(
      userInfo._id,
      getCookie("adminToken"),
      getCookie("adminRefreshToken")
    );
    deleteCookie("adminRefreshToken");
    deleteCookie("adminToken");
    rotuer.push("/login");
  };
  return (
    <>
      <Link
        onClick={() => setShowLogoutPopup(true)}
        className={`${itemLinkNav} ${""}`}
        href={"/#"}
      >
        <div className={`${wrapper} ${""}`}>
          <section>
            <Image src={logoutIcon} alt="icon page" />
          </section>
          <span>Logout</span>
        </div>
      </Link>
      {showLogoutPopup && (
        <PopupNormal className={styles.wrapPopupLogout}>
          <p>Bạn có chắc muốn đăng xuất không?</p>
          <div className="d-flex-grow-1"></div>
          <div className={styles.wrapPopupLogout_wrapButton}>
            <ButtonNormal
              onClick={() => setShowLogoutPopup(false)}
              data-color-btn={"orange"}
            >
              Cancel
            </ButtonNormal>
            <ButtonNormal data-color-btn={"pubplre"} onClick={handleLogout}>
              Continue
            </ButtonNormal>
          </div>
        </PopupNormal>
      )}
    </>
  );
};
