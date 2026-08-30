import ContentManager from "../components/ContentManager";
import { SECTION_CONFIGS } from "../config";

export default function JobsPage() {
  return (
    <ContentManager config={SECTION_CONFIGS.jobs} />
  );
}