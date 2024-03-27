import ChapterIdPage from "@/components/pages/storysInfoPage/components/chapterIdPage/ChapterIdPage";
import { getChapterById } from "../../../../../services/api/storys";

export default async function page({ params: { chapter_id } }) {
  const data = await getChapterById(chapter_id);
  return <ChapterIdPage chapter={data} />;
}
