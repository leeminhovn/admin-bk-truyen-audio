"use client";
import StoryInfoPage from "@/components/pages/storysInfoPage/StorysInfoPage";
import { getStorysInfo } from "../../../../services/api/storys";
import LoginWrapperMain from "@/components/commons/layouts/loadingWrapperMain/LoadingWrapperMain";
import { useEffect, useState } from "react";
import LoadingWrapperMain from "@/components/commons/layouts/loadingWrapperMain/LoadingWrapperMain";

export default function Page({ params: { story_id } }) {
  const [storyInfo, setStoryInfo] = useState(undefined); // Khởi tạo storyInfo mà không sử dụng state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStorysInfo(story_id);
        setStoryInfo(response.data); // Cập nhật storyInfo sau khi dữ liệu được tải
      } catch (error) {
        console.error("Error fetching story info:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <LoginWrapperMain>
      {storyInfo === undefined ? (
        <LoadingWrapperMain isLoading={true} />
      ) : (
        <StoryInfoPage storyInfo={storyInfo} />
      )}
    </LoginWrapperMain>
  );
}
