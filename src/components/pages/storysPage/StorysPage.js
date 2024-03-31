"use client";
import NormalTable from "@/components/commons/tables/normalTable/NormalTable";
import { useEffect, useState } from "react";
import { apiGetAllStorysOfAuthor } from "../../../../services/api/storys";
import styles from "./StorysPageStyle.module.scss";
import SearchHeaderStory from "./searchHeaderStory/SearchHeaderStory";
import { useRouter } from "next/navigation";
import StorysGeners from "./storysGeners/StorysGeners";
import { useSelector } from "react-redux";
import CardWrapLayout from "@/components/commons/cardsWrap/cardWrapLayout/CardWrapLayout";
import ButtonNormal from "@/components/commons/buttons/buttonNormal/ButtonNormal";
const ConvertStatus = ["Update", "Complete", "Drop"];

const columns = [
  { header: "Story", field: "story_name", width: "25%" },
  { header: "Auhtor", field: "auhtor_name", width: "20%" },
  // { header: "Genre", field: "story_genre", width: "25%" },
  {
    header: "Status",
    field: "completed_status",
    width: "15%",
    convertValue: (value) => {
      return ConvertStatus[value];
    },
    gravity: "center",
  },
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
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await apiGetAllStorysOfAuthor(infoGetData, userInfo._id);
      setData(response.data);
      setLoading(false);
    };

    fetchData();
    return () => {};
  }, [infoGetData]);
  const handleClickRow = (data) => {
    router.push(`/storys-managent/${data._id}`);
  };
  const handleClickAddStory = () => {};
  return (
    <>
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
