import ChapterIdPage from "@/components/pages/storysInfoPage/components/chapterIdPage/ChapterIdPage";
import { getChapterById } from "../../../../../services/api/storys";

export default async function page({ params: { chapter_id } }) {
  const isChapterNew = chapter_id === "chapter-new";
  const data = isChapterNew ? {} : await getChapterById(chapter_id);
  return <ChapterIdPage chapter={data} isNewChapter={isChapterNew} />;
}
