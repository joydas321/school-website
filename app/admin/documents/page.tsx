import ContentManager from "../components/ContentManager";
import { SECTION_CONFIGS } from "../config";

export default function DocumentsPage() {
  return (
    <ContentManager config={SECTION_CONFIGS.documents} />
  );
}