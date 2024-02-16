"use client";
import Image from "next/image";
import { wrapper, wrapper_top } from "./NavbarLeftStyle.module.scss";
import iconBk from "@/../public/assets/images/icons/bk_icon.png";
import book_black from "@/../public/assets/images/icons/book_black.svg";
import book_white from "@/../public/assets/images/icons/book_white.svg";
import user_black from "@/../public/assets/images/icons/user_black.svg";
import user_white from "@/../public/assets/images/icons/user_white.svg";
import notice_black from "@/../public/assets/images/icons/notice_black.svg";
import notice_white from "@/../public/assets/images/icons/notice_white.svg";
import ListItemsNav from "./itemNav/ListItemsNav";
class Item {
  constructor(icon, title, link, activeIcon) {
    this.icon = icon;
    this.title = title;
    this.link = link;
    this.activeIcon = activeIcon;
  }
}
const dataNavLeft1 = [
  new Item(book_black, "Storys ", "/storys-manage", book_white),
  new Item(user_black, "Users ", "/users-manage", user_white),
  new Item(user_black, "Notification ", "/notifications-manage", user_white),
];

export default function NavBarLeft() {
  return (
    <div className={wrapper}>
      <div className={wrapper_top}>
        <Image width={100} height={60} src={iconBk} alt="logo" />
      </div>
      <ListItemsNav data={dataNavLeft1} />
    </div>
  );
}
