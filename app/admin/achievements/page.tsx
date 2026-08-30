import ContentManager from "../components/ContentManager";
import { SECTION_CONFIGS } from "../config";

export default function AchievementsPage() {
  return (
    <ContentManager config={SECTION_CONFIGS.achievements} />
  );
}