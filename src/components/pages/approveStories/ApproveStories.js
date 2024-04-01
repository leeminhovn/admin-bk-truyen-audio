"use client";

import CardWrapLayout from "@/components/commons/cardsWrap/cardWrapLayout/CardWrapLayout";
import styles from "./ApproveStoriesStyle.module.scss";
import { formatDateFromIsoDateToNormalVnDate } from "@/utils/helpers";
import NormalTable from "@/components/commons/tables/normalTable/NormalTable";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import NormalPagination from "@/components/commons/paginations/normalPagination/NormalPagination";
import { getStoryNeedApproved } from "../../../../services/api/admin";
import { getCookie } from "@/utils/features/localStorage";
import PopupCheckStory from "./components/popupCheckStory/PopupCheckStory";

const columns = [
  {
    header: "Name",
    field: ["story", "story_name"],
    width: "20%",
    convertValue: (data) => {
      return data;
    },
  },
  {
    header: "Author",
    field: ["story", "auhtor_name"],
    width: "15%",
    // gravity: "center",
  },

  { header: "Message", field: ["author_message"], width: "30%" },
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
];

export default function ApprovalStories() {
  const { userInfo } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [showPopupCheckStory, setShowPopupCheckStory] = useState(null);
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
          getCookie("adminToken")
        );
        setPageInfo("maxPage", totalData);
        setData(data);

        setIsLoading(false);
      };
      handleCallGetData();
    }
  }, [userInfo, pageInfo]);
  const handleClickRow = (data) => {
    console.log(data);
    setShowPopupCheckStory(data);
  };

  return (
    <>
      <h1 className="titlePageManagent">Approval stories</h1>
      {showPopupCheckStory !== null && (
        <PopupCheckStory
          setPageInfo={setPageInfo}
          onCancel={() => {
            setShowPopupCheckStory(null);
          }}
          data={showPopupCheckStory}
        />
      )}
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
      <CardWrapLayout className={styles.wrap}>
        <NormalTable
          onClickRow={handleClickRow}
          isLoading={isLoading}
          columns={columns}
          data={data}
        ></NormalTable>
      </CardWrapLayout>
    </>
  );
}
