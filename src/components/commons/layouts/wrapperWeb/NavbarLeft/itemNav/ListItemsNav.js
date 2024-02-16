import { usePathname } from "next/navigation";
import IteamNav from "./IteamNav";
import { ListItemsNavWrapper, indicator } from "./IteamNavStyle.module.scss";

export default function ListItemsNav({ data }) {
  const pathName = usePathname();

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
      <span className={indicator} />
    </div>
  );
}
