import ContentManager from "../components/ContentManager";
import { SECTION_CONFIGS } from "../config";

export default function StaffPage() {
  return (
    <ContentManager config={SECTION_CONFIGS.staff} />
  );
}