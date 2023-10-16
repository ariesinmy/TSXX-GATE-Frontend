/* eslint-disable import/no-extraneous-dependencies */
import QuestionAnswerTwoToneIcon from '@mui/icons-material/QuestionAnswerTwoTone';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => {
  if (name === "assistant") {
    return <QuestionAnswerTwoToneIcon />
  } 
  return <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
};

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'staff',
    path: '/staff',
    icon: icon('ic_user'),
  },
  {
    title: 'Scanner',
    path: '/scanner',
    icon: icon('ic_lock'),
  },
  {
    title: 'Assistant',
    path: '/assistant',
    icon: icon('assistant'),
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
