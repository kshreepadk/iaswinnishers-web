// Single source of truth for every downloadable lead-magnet resource.
// Add a new resource here and it's immediately available to the email
// system below — no other file needs to change.
export const RESOURCES = {
  "ncert-booklist": {
    title: "The NCERT Booklist, Prioritized",
    file: "/resources/ncert-booklist.pdf",
    blurb: "the exact NCERTs to read, and the order to read them in, for every GS subject",
  },
  "study-planner": {
    title: "The 12-Month UPSC Study Planner",
    file: "/resources/study-planner.pdf",
    blurb: "a fillable planning template built around three real phases of preparation",
  },
  "syllabus-map": {
    title: "The UPSC Syllabus, on One Page",
    file: "/resources/syllabus-map.pdf",
    blurb: "the entire Prelims, Mains and Interview syllabus laid out on a single page",
  },
};

export function getResource(slug) {
  return RESOURCES[slug];
}
