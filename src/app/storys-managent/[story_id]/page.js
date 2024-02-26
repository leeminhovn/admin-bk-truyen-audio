import StoryInfoPage from "@/components/pages/storysInfoPage/StorysInfoPage";
import { getStorysInfo } from "../../../../services/api/storys";

export default async function Page({ params: { story_id } }) {
  const storyInfo = await getStorysInfo(story_id);

  return <StoryInfoPage storyInfo={storyInfo.data} />;
}
