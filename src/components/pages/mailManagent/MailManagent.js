"use client";

import { useEffect, useState } from "react";
import { getStoryNeedApproved } from "../../../../services/api/admin";
import NormalTable from "@/components/commons/tables/normalTable/NormalTable";
import { getCookie } from "@/utils/features/localStorage";
const columns = [
  { header: "Author id", field: "author_id", width: "15%" },
  { header: "Message", field: "author_message", width: "25%" },
  {
    header: "Status",
    field: "status",
    width: "5%",
    gravity: "center",
    convertValue: (data) => {
      switch (data) {
        case 0:
          return <b className="orangeColorText">Pending</b>;
        case 1:
          return <b className="correctColorText">Approved</b>;
        case 2:
          return <b className="incorrectColorText">Reject</b>;
      }
    },
  },
  { header: "Create at", field: "created_at", width: "15%" },

  // area
];
export default function MailManagent() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    currentPage: 0,
    limit: 15,
    maxPage: 0,
  });

  const handleSetPageInfo = (name, value) => {
    setPageInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };
  useEffect(() => {
    const handleCallGetData = async () => {
      setIsLoading(true);
      const { data, totalData } = await getStoryNeedApproved(
        pageInfo.page,
        pageInfo.limit,
        getCookie("adminToken")
      );
      setPageInfo("maxPage", totalData);
      setData(data);

      setIsLoading(false);
    };
    handleCallGetData();
  }, []);
  console.log(data);
  const handleClickRow = () => {};
  return (
    <>
      <h1 className={"titlePageManagent"}>Mail</h1>
      <NormalTable
        onClickRow={handleClickRow}
        isLoading={isLoading}
        columns={columns}
        data={data}
      />
    </>
  );
}
