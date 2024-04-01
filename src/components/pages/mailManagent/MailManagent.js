"use client";

import { useEffect, useState } from "react";
import { getStoryNeedApproved } from "../../../../services/api/admin";
import NormalTable from "@/components/commons/tables/normalTable/NormalTable";
import { getCookie } from "@/utils/features/localStorage";
import { formatDateFromIsoDateToNormalVnDate } from "@/utils/helpers";
import NormalPagination from "@/components/commons/paginations/normalPagination/NormalPagination";
import { useSelector } from "react-redux";
const columns = [
  {
    header: "Name",
    field: ["story", "story_name"],
    width: "25%",
    convertValue: (data) => {
      return data;
    },
  },
  {
    header: "Moderation feedback",
    field: ["moderator_feedback"],
    width: "35%",
  },

  { header: "Message", field: ["author_message"], width: "20%" },
  {
    header: "Status",
    field: ["status"],
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
  {
    header: "Create at",
    field: ["created_at"],
    width: "15%",
    convertValue: formatDateFromIsoDateToNormalVnDate,
    gravity: "center",
  },

  // area
];
export default function MailManagent() {
  const { userInfo } = useSelector((state) => state.user);
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
    if (userInfo._id) {
      const handleCallGetData = async () => {
        setIsLoading(true);
        const { data, totalData } = await getStoryNeedApproved(
          pageInfo.currentPage,
          pageInfo.limit,
          getCookie("adminToken"),
          userInfo._id
        );
        setPageInfo("maxPage", totalData);
        setData(data);

        setIsLoading(false);
      };
      handleCallGetData();
    }
  }, [userInfo]);
  const handleClickRow = () => {};
  return (
    <>
      <h1 className={"titlePageManagent"}>Mail</h1>
      <NormalPagination
        onPrev={() => {
          handleSetPageInfo("currentPage", pageInfo.currentPage - 1);
        }}
        onNext={() => {
          handleSetPageInfo("currentPage", pageInfo.currentPage + 1);
        }}
        onGotoIndexPage={(index) => {
          handleSetPageInfo("currentPage", index);
        }}
        maxPage={pageInfo.maxPage}
        currentPage={pageInfo.currentPage}
      />
      <NormalTable
        onClickRow={handleClickRow}
        isLoading={isLoading}
        columns={columns}
        data={data}
      />
    </>
  );
}
