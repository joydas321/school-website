import ContentManager from "../components/ContentManager";
import { SECTION_CONFIGS } from "../config";

export default function EventsPage() {
  return (
    <ContentManager config={SECTION_CONFIGS.events} />
  );
}