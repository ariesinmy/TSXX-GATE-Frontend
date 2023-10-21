import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const REPORT_TITLES = [
  'Weekly Attendance Report - September 11, 2023',
  'Weekly Safety Inspection Report - September 11, 2023',
  "Weekly Attendance Report - September 15, 2023 to September 21, 2023",
  "Weekly Safety Inspection Report - September 15, 2023 to September 21, 2023",
  "Weekly Attendance Report - September 8, 2023 to September 14, 2023",
  "Weekly Safety Inspection Report - September 8, 2023 to September 14, 2023",
  "Weekly Attendance Report - September 1, 2023 to September 7, 2023",
  "Weekly Safety Inspection Report - September 1, 2023 to September 7, 2023",
  "Weekly Attendance Report - August 25, 2023 to August 31, 2023",
  "Weekly Safety Inspection Report - August 25, 2023 to August 31, 2023",
  "Weekly Attendance Report - August 18, 2023 to August 24, 2023",
  "Weekly Safety Inspection Report - August 18, 2023 to August 24, 2023",
  "Weekly Attendance Report - August 11, 2023 to August 17, 2023",
  "Weekly Safety Inspection Report - August 11, 2023 to August 17, 2023"
];

export const reports = [...Array(13)].map((_, index) => ({
  id: faker.string.uuid(),
  title: REPORT_TITLES[index + 1],
  createdAt: faker.date.past(),
  avatarUrl: `/assets/images/reportAvatars/letter-${REPORT_TITLES[index + 1].includes("Attendance") ? "a" : "s"}.png`,
}));
