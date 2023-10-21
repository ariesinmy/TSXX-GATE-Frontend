import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  'HQ_20230911_EMP017',
  'HQ_20230911_EMP030',
  'HQ_20230911_EMP019',
  'HQ_20230911_EMP021',
  'HQ_20230911_EMP056',
  'HQ_20230911_EMP127',
  'HQ_20230911_EMP174',
  'HQ_20230911_EMP567',
  'HQ_20230911_EMP007',
  'HQ_20230911_EMP107',
  'HQ_20230911_EMP017',
  'HQ_20230911_EMP030',
  'HQ_20230911_EMP019',
  'HQ_20230911_EMP021',
  'HQ_20230911_EMP056',
  'HQ_20230911_EMP127',
  'HQ_20230911_EMP174',
  'HQ_20230911_EMP567',
  'HQ_20230911_EMP007',
  'HQ_20230911_EMP107',
  'HQ_20230911_EMP017',
  'HQ_20230911_EMP030',
  'HQ_20230911_EMP019',
];

// ----------------------------------------------------------------------

export const scanners = [...Array(16)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.string.uuid(),
    cover: `/assets/images/scanImages/TRAIN_${setIndex}.jpg`,
    name: PRODUCT_NAME[index],
    status: sample(['danger', 'normal', 'warning']), // 從collection(list or object)回傳一個隨機的元素
  };
});
