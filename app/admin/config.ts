export const API_URL =
  "https://script.google.com/macros/s/AKfycbyx-Xjx5rvJD4J9fsH8aVUQX_OoPXEqJyTygKxwvsPaZbmo5p7jjynE0ykXpRCderSlkw/exec";

export const CLOUDINARY_CLOUD_NAME = "zmjovojg";

export const CLOUDINARY_UPLOAD_PRESET = "Upload Image";

export type SectionConfig = {
  title: string;
  type: string;
  description: string;
  date: boolean;
  important: boolean;
  photo: boolean;
  photoLabel?: string;
  accept?: string;
};

export const SECTION_CONFIGS = {
  notices: {
    title: "Notice Management",
    type: "Notice",
    description:
      "Add and manage school notices, announcements and important updates.",
    date: true,
    important: true,
    photo: true,
    photoLabel: "Notice Image",
    accept: "image/*",
  },

  achievements: {
    title: "Achievements Management",
    type: "Achievement",
    description:
      "Add student, teacher and school achievements with photos.",
    date: true,
    important: false,
    photo: true,
    photoLabel: "Achievement Photo",
    accept: "image/*",
  },

  staff: {
    title: "Teachers & Staff Management",
    type: "Teacher",
    description:
      "Add and manage teacher and staff profiles with profile photos.",
    date: false,
    important: false,
    photo: true,
    photoLabel: "Profile Photo",
    accept: "image/*",
  },

  gallery: {
    title: "Gallery Management",
    type: "Gallery",
    description:
      "Upload and manage school gallery photos.",
    date: true,
    important: false,
    photo: true,
    photoLabel: "Gallery Photo",
    accept: "image/*",
  },

  jobs: {
    title: "Jobs Management",
    type: "Job",
    description:
      "Publish school job vacancies and recruitment information.",
    date: true,
    important: false,
    photo: true,
    photoLabel: "Job Image",
    accept: "image/*",
  },

  events: {
    title: "Events Management",
    type: "Event",
    description:
      "Create and manage school events with event photos.",
    date: true,
    important: false,
    photo: true,
    photoLabel: "Event Photo",
    accept: "image/*",
  },

  documents: {
    title: "Documents Management",
    type: "Document",
    description:
      "Upload school documents, prospectus, PDFs and related files.",
    date: true,
    important: false,
    photo: true,
    photoLabel: "Document / PDF",
    accept: "image/*,.pdf",
  },

  facilities: {
    title: "Facilities Management",
    type: "Facility",
    description:
      "Add and manage school facilities with photos.",
    date: false,
    important: false,
    photo: true,
    photoLabel: "Facility Photo",
    accept: "image/*",
  },
} satisfies Record<string, SectionConfig>;