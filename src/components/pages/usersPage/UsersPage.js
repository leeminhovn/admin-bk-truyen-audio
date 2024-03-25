"use client";
import { useEffect, useState } from "react";
import styles from "./UsersPageStyle.module.scss";
import SearchHeaderUser from "./searchHeaderUser/SearchHeaderUser";
import NormalTable from "@/components/commons/tables/normalTable/NormalTable";
import { getListUser } from "../../../../services/api/users";
import { useRouter } from "next/navigation";

const columns = [
  { header: "Name", field: "name", width: "15%" },
  { header: "Email", field: "email", width: "25%" },
  { header: "Spirit Stone", field: "spirit_stone", width: "15%" },
  { header: "Level", field: "level", width: "15%" },
  { header: "Area", field: "area", width: "15%" },

  // area
];
export default function UsersPage() {
  const router = useRouter();

  const [data, setData] = useState([]);
  const [infoGetData, setInfoGetData] = useState({
    page: 0,
    limit: 12,
    search: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getListUser(infoGetData);
      setData(response);
      setLoading(false);
    };

    fetchData();

    return () => {};
  }, [infoGetData]);

  const handleClickRow = (data) => {
    router.push(`/users-managent/${data._id}`);
  };

  return (
    <>
      <h1 className="titlePageManagent">Storys</h1>
      <div className={styles.wrapTable}>
        <SearchHeaderUser
          setInfoGetData={setInfoGetData}
          infoGetData={infoGetData}
        />
        <NormalTable
          onClickRow={handleClickRow}
          isLoading={loading}
          columns={columns}
          data={data}
        />
      </div>
    </>
  );
}
