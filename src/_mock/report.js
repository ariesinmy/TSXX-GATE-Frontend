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
  "Weekly Attendance Report - August 25, 2023 to August 31, 2023"
];

export const reports = [...Array(8)].map((_, index) => ({
  id: index,
  title: REPORT_TITLES[index + 1],
  createdAt: faker.date.past(),
  content: "Employee attendance is a critical aspect of any organization's success. It directly impacts productivity, team morale, and, ultimately, the bottom line. Consistent attendance is a sign of commitment and professionalism, and it ensures that we meet our operational goals. Moreover, it minimizes disruptions and maintains a stable work environment.",
  avatarUrl: `/assets/images/reportAvatars/letter-${REPORT_TITLES[index + 1].includes("Attendance") ? "a" : "s"}.png`,
}));
