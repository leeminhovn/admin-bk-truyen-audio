"use client";

import NormalTable from "@/components/commons/tables/normalTable/NormalTable";

import styles from "./AuthorManagentPageStyle.module.scss";
import { useRouter } from "next/navigation";
import AuthorHeaderUser from "./AuthorHeaderUser/AuthorHeaderUser";
import { useEffect, useState } from "react";
import { getListAuthor } from "../../../../services/api/users";

const columns = [
  { header: "Name", field: "name", width: "15%" },
  { header: "Email", field: "email", width: "25%" },
  { header: "Money", field: "money", width: "15%" },

  // area
];
export default function AuthorManagentPage() {
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
      const response = await getListAuthor(infoGetData);
      setData(response);
      setLoading(false);
    };

    fetchData();

    return () => {};
  }, [infoGetData]);

  const handleClickRow = (data) => {
    router.push(`/author-managent/${data._id}`);
  };

  return (
    <>
      <h1 className="titlePageManagent">Storys</h1>
      <div className={styles.wrapTable}>
        <AuthorHeaderUser
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
