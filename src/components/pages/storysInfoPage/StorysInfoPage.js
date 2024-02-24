"use client";
import Image from "next/image";
import styles from "./StorysInfoPageStyle.module.scss";
import CardWrapLayout from "@/components/commons/cardsWrap/cardWrapLayout/CardWrapLayout";
import EditableText from "@/components/commons/inputs/editableText/EditableText";
import { useRef, useState } from "react";
import ButtonNormal from "@/components/commons/buttons/buttonNormal/ButtonNormal";
import { useRouter } from "next/navigation";
import _ from "lodash";
import { updateStoryInfoAdmin } from "../../../../services/api/storys";
import { getCookie } from "@/utils/features/localStorage";
import SelectionCustom from "@/components/commons/selectionCustom/SelectionCustom";

const dataShowInfoStory = [
  { label: "Auhtor", field: "auhtor_name" },
  { label: "Genre", field: "story_genre" },

  { label: "Spirit stone", field: "linh_thach" },
  { label: "Followers", field: "count_followers_story" },
];
export default function StoryInfoPage({ storyInfo }) {
  const [newInfoStory, setNewInfoStory] = useState({ ...storyInfo });

  if (storyInfo === undefined) {
    return <h1 className="titlePageManagent">Not found story</h1>;
  }

  return (
    <>
      <h1 className="titlePageManagent">Storys info</h1>
      <CardWrapLayout>
        <div className={styles.wrapPage}>
          <div className={styles.wrapPage_top}>
            <LeftSideTop
              storyInfo={newInfoStory.story}
              storyInfoOld={storyInfo.story}
              setNewInfoStory={setNewInfoStory}
            />
            <RightSideTop
              storyInfo={newInfoStory.story}
              setNewInfoStory={setNewInfoStory}
            />
          </div>
        </div>
      </CardWrapLayout>
    </>
  );
}

const LeftSideTop = ({ storyInfo, setNewInfoStory, storyInfoOld }) => {
  return (
    <div className={styles.wrapPage_top_leftSide}>
      <StoryPicture
        picture={storyInfo.story_picture}
        setNewInfoStory={setNewInfoStory}
      />
      <ControllerUpdate newInfoStory={storyInfo} storyInfoOld={storyInfoOld} />

      <ul className={styles.wrapPage_top_leftSide_list}>
        {dataShowInfoStory.map((data, idx) => (
          <ShowStoryInfoBelowPicture
            key={idx}
            {...data}
            storyInfo={storyInfo}
            setNewInfoStory={setNewInfoStory}
          />
        ))}
        <li>
          <b>Complete</b>
          <ChooseStatusStory
            completed_status={storyInfo.completed_status}
            setNewInfoStory={setNewInfoStory}
          />
        </li>
      </ul>
    </div>
  );
};

const StoryPicture = ({ picture }) => {
  return (
    <div className={styles.wrapPage_top_pictureStory}>
      <Image
        width={300}
        height={400}
        src={
          picture ||
          "https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-1/406534825_341562725186517_794769701051680443_n.jpg?stp=cp6_dst-jpg_p320x320&_nc_cat=104&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeHnXnK3rDKM3Rw9oES_Rir0X7LGC5et3c1fssYLl63dzWqaL72p3updkPkfW3pHAGx0NT304YodW2w3DRS90d1b&_nc_ohc=DkvQpYI8b_UAX_BWqUM&_nc_ht=scontent.fhan14-3.fna&oh=00_AfDm5DcWHBdV_waxesafYcaGmbZMiRxf2NdGQsuZE3A7Lw&oe=65DB8CE3"
        }
        alt="image"
      />
    </div>
  );
};
const RightSideTop = ({ storyInfo, setNewInfoStory }) => {
  return (
    <div className={styles.wrapPage_top_rightSide}>
      <TitleStory
        setNewInfoStory={setNewInfoStory}
        story_name={storyInfo.story_name}
      />
      <QuickReviewComponent
        setNewInfoStory={setNewInfoStory}
        quickReviewed={storyInfo["story_quick_review"]}
      />
    </div>
  );
};

const QuickReviewComponent = ({ quickReviewed, setNewInfoStory }) => {
  const onSubmit = (newText) => {
    setStoryUpdate("story_quick_review", newText, setNewInfoStory);
  };

  return (
    <div className={styles.wrapPage_top_rightSide_quickReview}>
      <EditableText onSubmit={onSubmit} initialText={quickReviewed} />
    </div>
  );
};

const TitleStory = ({ story_name, setNewInfoStory }) => {
  const onSubmit = (newText) => {
    setStoryUpdate("story_name", newText, setNewInfoStory);
  };

  return (
    <h1 className={styles.wrapPage_top_rightSide_name}>
      <EditableText onSubmit={onSubmit} initialText={story_name} />
    </h1>
  );
};
const ShowStoryInfoBelowPicture = ({
  label,
  field,
  storyInfo,
  setNewInfoStory,
}) => {
  const onSubmit = (newText) => {
    setStoryUpdate(field, newText, setNewInfoStory);
  };
  return (
    <li>
      <b>{label}: </b>{" "}
      <EditableText onSubmit={onSubmit} initialText={storyInfo[field]} />
    </li>
  );
};

function ChooseStatusStory({ completed_status, setNewInfoStory }) {
  const dataSelect = ["Update", "Full", "Drop"];
  // return (
  //   <select
  //     className={styles.completeStatus}
  //     defaultValue={completed_status}
  //     onChange={(e) => {
  //       setStoryUpdate("completed_status", e.target.value, setNewInfoStory);
  //     }}
  //   >
  //     {dataSelect.map((name, idx) => {
  //       return (
  //         <option value={idx} key={idx}>
  //           {name}
  //         </option>
  //       );
  //     })}
  //   </select>
  // );
  return (
    <SelectionCustom
      className={styles.completeStatus}
      defaultValue={completed_status}
      onChange={(e) => {
        setStoryUpdate("completed_status", e.target.value, setNewInfoStory);
      }}
      data-render={dataSelect}
    />
  );
}

function ControllerUpdate({ newInfoStory, storyInfoOld }) {
  const oldInfo = useRef(storyInfoOld);
  const router = useRouter();
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const onBack = () => {
    router.back();
  };

  const onSave = async () => {
    setIsLoadingSave(true);
    try {
      const result = await updateStoryInfoAdmin(
        newInfoStory,
        getCookie("adminToken")
      );
      oldInfo.current = newInfoStory;

      setIsLoadingSave(false);
    } catch (err) {
      console.log(err);
      setIsLoadingSave(false);
    }
  };
  const disabled = _.isEqual(newInfoStory, oldInfo.current);
  return (
    <div className={styles.controllerUpdate}>
      <ButtonNormal
        is-loading={`${isLoadingSave}`}
        onClick={onSave}
        disabled={disabled}
        data-color-btn={"orange"}
        className={styles.controllerUpdate_submitBtn}
      >
        Save
      </ButtonNormal>
      <ButtonNormal
        onClick={onBack}
        data-color-btn={"green"}
        className={styles.controllerUpdate_backBtn}
      >
        Back
      </ButtonNormal>
    </div>
  );
}

function setStoryUpdate(field, newText, setState) {
  setState((prev) => {
    return {
      ...prev,
      story: {
        ...prev.story,
        [field]: newText,
      },
    };
  });
}
