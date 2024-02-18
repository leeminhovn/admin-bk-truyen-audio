"use client";
import NormalTable from "@/components/commons/tables/normalTable/NormalTable";
import { useEffect, useState } from "react";
import { apiGetAllStorys } from "../../../../services/api/storys";

const columns = [
  { header: "Story", field: "story_name", width: "25%" },
  { header: "Auhtor", field: "auhtor_name", width: "20%" },
  { header: "Genre", field: "story_genre", width: "25%" },
  { header: "Status", field: "completed_status", width: "5%" },
  { header: "Followers", field: "count_followers_story", width: "10%" },
];

export default function StorysPage() {
  const [data, setData] = useState([]);
  const [infoGetData, setInfoGetData] = useState({ page: 0, limit: 20 });
  const [loading, setLoading] = useState(false);

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

  return (
    <>
      <h1 className="titlePageManagent">Storys</h1>
      <NormalTable isLoading={loading} columns={columns} data={data} />
    </>
  );
}
