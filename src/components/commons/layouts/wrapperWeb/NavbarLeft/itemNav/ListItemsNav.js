import { usePathname } from "next/navigation";
import IteamNav from "./IteamNav";
import { ListItemsNavWrapper } from "./IteamNavStyle.module.scss";

export default function ListItemsNav({ data }) {
  const pathName = usePathname();
  console.log(pathName);
  return (
    <div className={ListItemsNavWrapper}>
      {data.map((item, index) => (
        <IteamNav
          {...item}
          key={index}
          isActive={pathName.includes(item.link)}
        />
      ))}
    </div>
  );
}
