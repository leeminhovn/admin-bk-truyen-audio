import CardWrapLayout from "@/components/commons/cardsWrap/cardWrapLayout/CardWrapLayout";
import styles from "./DashboardAuthorStyle.module.scss";
import PopupLoading from "@/components/commons/popups/popupLoading/PopupLoading";
import NormalTable from "@/components/commons/tables/normalTable/NormalTable";

export default function DashboardAuthor() {
  const [data, setData] = useState(null);
  const [showLoading, setShowLoading] = useState(false);

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
