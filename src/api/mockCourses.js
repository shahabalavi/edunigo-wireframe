/**
 * Simulated Courses API for the Dynamic Course List widget.
 * Use API URL "mock" or "/api/mock/courses" in the widget to use this data.
 * Filters (sort, university, country, category, limit) are applied in memory.
 */

const MOCK_COURSES = [
  { id: 1, name: "MBA in Business Administration", university: "University of Toronto", universityId: "toronto", country: "Canada", fieldOfStudy: "Business", tuition: 45000, createdAt: "2024-09-01", popularity: 95 },
  { id: 2, name: "MSc Computer Science", university: "University of Toronto", universityId: "toronto", country: "Canada", fieldOfStudy: "Computer Science", tuition: 38000, createdAt: "2024-08-15", popularity: 92 },
  { id: 3, name: "LLM in International Law", university: "Harvard University", universityId: "harvard", country: "USA", fieldOfStudy: "Law", tuition: 62000, createdAt: "2024-10-01", popularity: 98 },
  { id: 4, name: "MBA Executive Program", university: "Harvard University", universityId: "harvard", country: "USA", fieldOfStudy: "Business", tuition: 72000, createdAt: "2024-07-20", popularity: 99 },
  { id: 5, name: "MA in English Literature", university: "University of Oxford", universityId: "oxford", country: "UK", fieldOfStudy: "Arts", tuition: 28000, createdAt: "2024-09-10", popularity: 88 },
  { id: 6, name: "MSc Engineering Management", university: "University of Oxford", universityId: "oxford", country: "UK", fieldOfStudy: "Engineering", tuition: 32000, createdAt: "2024-08-01", popularity: 85 },
  { id: 7, name: "Master of Public Health", university: "University of Melbourne", universityId: "melbourne", country: "Australia", fieldOfStudy: "Medicine", tuition: 42000, createdAt: "2024-10-15", popularity: 90 },
  { id: 8, name: "MBA Global", university: "University of Melbourne", universityId: "melbourne", country: "Australia", fieldOfStudy: "Business", tuition: 48000, createdAt: "2024-07-05", popularity: 87 },
  { id: 9, name: "MSc Physics", university: "LMU Munich", universityId: "munich", country: "Germany", fieldOfStudy: "Sciences", tuition: 0, createdAt: "2024-09-20", popularity: 82 },
  { id: 10, name: "MA in Economics", university: "LMU Munich", universityId: "munich", country: "Germany", fieldOfStudy: "Business", tuition: 0, createdAt: "2024-08-25", popularity: 84 },
  { id: 11, name: "LLB Law", university: "University of Amsterdam", universityId: "amsterdam", country: "Netherlands", fieldOfStudy: "Law", tuition: 15000, createdAt: "2024-10-01", popularity: 86 },
  { id: 12, name: "MSc Data Science", university: "University of Amsterdam", universityId: "amsterdam", country: "Netherlands", fieldOfStudy: "Computer Science", tuition: 18500, createdAt: "2024-09-01", popularity: 94 },
  { id: 13, name: "MEng Civil Engineering", university: "University of British Columbia", universityId: "ubc", country: "Canada", fieldOfStudy: "Engineering", tuition: 35000, createdAt: "2024-08-10", popularity: 81 },
  { id: 14, name: "Master of Education", university: "University of British Columbia", universityId: "ubc", country: "Canada", fieldOfStudy: "Education", tuition: 22000, createdAt: "2024-07-30", popularity: 79 },
  { id: 15, name: "MSc Biotechnology", university: "University of Toronto", universityId: "toronto", country: "Canada", fieldOfStudy: "Sciences", tuition: 41000, createdAt: "2024-10-05", popularity: 83 },
  { id: 16, name: "MBA Part-Time", university: "Harvard University", universityId: "harvard", country: "USA", fieldOfStudy: "Business", tuition: 68000, createdAt: "2024-06-15", popularity: 91 },
  { id: 17, name: "MA in International Relations", university: "University of Oxford", universityId: "oxford", country: "UK", fieldOfStudy: "Arts", tuition: 26000, createdAt: "2024-08-20", popularity: 80 },
  { id: 18, name: "MD Pathway (Graduate Entry)", university: "University of Melbourne", universityId: "melbourne", country: "Australia", fieldOfStudy: "Medicine", tuition: 75000, createdAt: "2024-09-25", popularity: 96 },
  { id: 19, name: "MSc Chemistry", university: "LMU Munich", universityId: "munich", country: "Germany", fieldOfStudy: "Sciences", tuition: 0, createdAt: "2024-07-12", popularity: 78 },
  { id: 20, name: "Master of Finance", university: "University of Amsterdam", universityId: "amsterdam", country: "Netherlands", fieldOfStudy: "Business", tuition: 19500, createdAt: "2024-10-10", popularity: 93 },
  { id: 21, name: "MSc Software Engineering", university: "University of British Columbia", universityId: "ubc", country: "Canada", fieldOfStudy: "Computer Science", tuition: 36000, createdAt: "2024-09-15", popularity: 89 },
  { id: 22, name: "LLM European Law", university: "University of Amsterdam", universityId: "amsterdam", country: "Netherlands", fieldOfStudy: "Law", tuition: 16500, createdAt: "2024-08-05", popularity: 77 },
  { id: 23, name: "MArch Architecture", university: "University of Oxford", universityId: "oxford", country: "UK", fieldOfStudy: "Arts", tuition: 30000, createdAt: "2024-07-18", popularity: 76 },
  { id: 24, name: "MSc Mechanical Engineering", university: "University of Toronto", universityId: "toronto", country: "Canada", fieldOfStudy: "Engineering", tuition: 39000, createdAt: "2024-10-20", popularity: 86 },
];

const isMockUrl = (url) => {
  if (!url || typeof url !== "string") return false;
  const u = url.trim().toLowerCase();
  return u === "mock" || u === "/api/mock/courses" || u.includes("mock/courses") || u.endsWith("/api/mock/courses");
};

/**
 * Simulates the Courses API: filters and sorts the mock list based on query params.
 * @param {Object} filters - { sortBy, university, country, category, limit }
 * @returns {Promise<Array>} Filtered and sorted course list
 */
export function getMockCourses(filters = {}) {
  const { sortBy = "newest", university = "", country = "", category = "", limit = 8 } = filters;

  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      let list = [...MOCK_COURSES];

      if (university) {
        list = list.filter((c) => (c.universityId || c.university || "").toLowerCase() === university.toLowerCase());
      }
      if (country) {
        list = list.filter((c) => (c.country || "").toLowerCase() === country.toLowerCase());
      }
      if (category) {
        list = list.filter((c) => (c.fieldOfStudy || c.category || "").toLowerCase() === category.toLowerCase());
      }

      if (sortBy === "newest") {
        list.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
      } else if (sortBy === "oldest") {
        list.sort((a, b) => (a.createdAt || "").localeCompare(b.createdAt || ""));
      } else if (sortBy === "popularity") {
        list.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
      }

      const num = Math.min(Number(limit) || 8, list.length);
      resolve(list.slice(0, num));
    }, 400);
  });
}

export { MOCK_COURSES, isMockUrl };
