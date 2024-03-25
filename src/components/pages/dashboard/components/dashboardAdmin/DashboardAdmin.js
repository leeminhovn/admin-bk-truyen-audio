"use client";
import CardWrapLayout from "@/components/commons/cardsWrap/cardWrapLayout/CardWrapLayout";
import styles from "./DashboardAdminStyle.module.scss";
import { useEffect, useState } from "react";
import { apiStaticticsAdmin } from "../../../../../../services/api/statistic";
import PopupLoading from "@/components/commons/popups/popupLoading/PopupLoading";

import NormalTable from "@/components/commons/tables/normalTable/NormalTable";

const columnsTopStoryWeek = [
  { header: "Story", field: "story_name", width: "25%" },
  { header: "Auhtor", field: "auhtor_name", width: "20%" },
  // { header: "Genre", field: "story_genre", width: "25%" },
  { header: "Followers", field: "count_followers_story", width: "15%" },
  { header: "Linh thạch", field: "linh_thach", width: "15%" },
];
export default function DashboardAdmin() {
  const [data, setData] = useState(null);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    setShowLoading(true);
    apiStaticticsAdmin().then((data) => {
      console.log(data);
      setData(data);
      setShowLoading(false);
      const { total_story, count_free_user, count_paid_user } = data;
      document.getElementById("total-storys").innerText = total_story;
      document.getElementById("total-user").innerText =
        count_free_user + count_paid_user;
      document.getElementById("total-free-user").innerText = count_free_user;
      document.getElementById("total-paid-user").innerText = count_paid_user;

      // increaseNumber(
      //   total_story,
      //   200,
      //   (value) => {
      //   },
      //   () => {}
      // );
    });
  }, []);

  return (
    <>
      {showLoading && <PopupLoading />}
      <CardWrapLayout className={styles.wrap_first}>
        <ComponentItemT1 id="total-storys" title={"Total storys"} />
        <ComponentItemT1 id="total-user" title={"Total  users"} />
        <ComponentItemT1 id="total-free-user" title={"Total free user"} />
        <ComponentItemT1 id="total-paid-user" title={"Total paid user"} />
      </CardWrapLayout>
      <p className={styles.titleTable}>Top 10 hot series of the week</p>
      <NormalTable
        isLoading={data === null}
        columns={columnsTopStoryWeek}
        data={data?.story_top_ten_of_week || []}
      />
      <p className={styles.titleTable}>Top 10 most watched series</p>
      <NormalTable
        isLoading={data === null}
        columns={columnsTopStoryWeek}
        data={data?.story_top_ten_followers || []}
      />

      <p className={styles.titleTable}>Top 10 highest-grossing series</p>
      <NormalTable
        isLoading={data === null}
        columns={columnsTopStoryWeek}
        data={data?.story_top_ten_money || []}
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
