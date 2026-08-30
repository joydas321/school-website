import ContentManager from "../components/ContentManager";
import { SECTION_CONFIGS } from "../config";

export default function GalleryPage() {
  return (
    <ContentManager config={SECTION_CONFIGS.gallery} />
  );
}