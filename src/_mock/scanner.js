import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  'HQ_20230911_EMP017',
  'HQ_20230911_EMP030',
  'HQ_20230911_EMP019',
  'HQ_20230911_EMP021',
  'HQ_20230911_EMP107',
];

// ----------------------------------------------------------------------
const statusList = ["warning", "normal", "normal", "normal", "normal"];
export const scanners = [...Array(5)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.string.uuid(),
    cover: `/assets/images/scanImages/TRAIN_${setIndex}.jpg`,
    name: PRODUCT_NAME[index],
    status: statusList[index]
  };
});
