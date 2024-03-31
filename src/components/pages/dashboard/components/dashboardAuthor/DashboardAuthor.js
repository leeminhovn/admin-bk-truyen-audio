"use client";
import CardWrapLayout from "@/components/commons/cardsWrap/cardWrapLayout/CardWrapLayout";
import styles from "./DashboardAuthorStyle.module.scss";
import PopupLoading from "@/components/commons/popups/popupLoading/PopupLoading";
import NormalTable from "@/components/commons/tables/normalTable/NormalTable";
import { apiStaticticsAuhtor } from "../../../../../../services/api/statistic";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const columnsTopStoryWeek = [
  { header: "Story", field: ["story_name"], width: "25%" },
  { header: "Auhtor", field: ["auhtor_name"], width: "20%" },
  // { header: "Genre", field: ["story_genre"], width: "25%" },
  { header: "Followers", field: ["count_followers_story"], width: "15%" },
  { header: "Linh thạch", field: ["linh_thach"], width: "15%" },
];

export default function DashboardAuthor() {
  const { userInfo } = useSelector((state) => state.user);

  const [data, setData] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  useEffect(() => {
    if (!userInfo._id) {
      return () => {};
    }
    setShowLoading(true);
    apiStaticticsAuhtor(userInfo._id).then((data) => {
      setData(data);
      setShowLoading(false);
      const {
        total_story,
        total_money_from_stories,
        total_storied_have_chance,
      } = data;
      document.getElementById("total-storys").innerText = total_story;
      document.getElementById("total-money").innerText =
        total_money_from_stories;
      document.getElementById("total-paid-story").innerText =
        total_storied_have_chance;
    });
  }, [userInfo]);
  return (
    <>
      {showLoading && <PopupLoading />}
      <CardWrapLayout className={styles.wrap_first}>
        <ComponentItemT1 id="total-storys" title={"Total storys"} />
        <ComponentItemT1 id="total-money" title={"Total Linh thạch"} />
        <ComponentItemT1
          id="total-paid-story"
          title={"Total number of stories donated"}
        />
      </CardWrapLayout>
      <p className={styles.titleTable}>Top 10 stories with high revenue</p>
      <NormalTable
        isLoading={data === null}
        columns={columnsTopStoryWeek}
        data={data?.top_ten_stories_donate || []}
      />
      <p className={styles.titleTable}>
        Top 10 stories with the most followers
      </p>
      <NormalTable
        isLoading={data === null}
        columns={columnsTopStoryWeek}
        data={data?.top_ten_stories_follow || []}
      />
    </>
  );
}

const ComponentItemT1 = ({ id, title }) => {
  return (
    <div>
      <section>
        <b id={id}>{0}</b>
      </section>
      <p>{title}</p>
    </div>
  );
};
