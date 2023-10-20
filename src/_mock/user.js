import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const users = [...Array(21)].map((_, index) => {
  const employeeId = `EMP${String(index)}`;
  return ({
    id: faker.string.uuid(),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
    employeeId,
    zoom: sample(['AZ', 'HQ']),
    department: sample([
      'DEPT1',
      'DEPT2',
      'DEPT3',
      'DEPT4',
    ]),
    shiftTime: sample(['7:30', '8:30', '9:30']),
    status: sample(['arrival', 'late', 'early']),
  })
});
