"use client";
import NormalTable from "@/components/commons/tables/normalTable/NormalTable";
import { useEffect, useState } from "react";
import { apiGetAllStorys } from "../../../../services/api/storys";
import styles from "./StorysPageStyle.module.scss";
import SearchHeaderStory from "./searchHeaderStory/SearchHeaderStory";
import { useRouter } from "next/navigation";
import StorysGeners from "./storysGeners/StorysGeners";
import { useSelector } from "react-redux";

const columns = [
  { header: "Story", field: "story_name", width: "25%" },
  { header: "Auhtor", field: "auhtor_name", width: "20%" },
  // { header: "Genre", field: "story_genre", width: "25%" },
  { header: "Status", field: "completed_status", width: "15%" },
  { header: "Followers", field: "count_followers_story", width: "10%" },
];

export default function StorysPage() {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <>
      {userInfo.role === "Auhtor" && <ShowListStory />}
      {userInfo.role === "Admin" && <StorysGeners />}
    </>
  );
}
const ShowListStory = () => {
  const [data, setData] = useState([]);
  const [infoGetData, setInfoGetData] = useState({
    page: 0,
    limit: 12,
    search: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await apiGetAllStorys(infoGetData);
      setData(response.data);
      setLoading(false);
    };

    fetchData();

    return () => {};
  }, [infoGetData]);
  const handleClickRow = (data) => {
    router.push(`/storys-managent/${data._id}`);
  };
  return (
    <>
      {" "}
      <h1 className="titlePageManagent">Storys</h1>
      <div className={styles.wrapTable}>
        <SearchHeaderStory
          setInfoGetData={setInfoGetData}
          setLoading={setLoading}
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
};
