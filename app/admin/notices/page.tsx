import ContentManager from "../components/ContentManager";
import { SECTION_CONFIGS } from "../config";

export default function NoticesPage() {
  return (
    <ContentManager config={SECTION_CONFIGS.notices} />
  );
}