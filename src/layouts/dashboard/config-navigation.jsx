/* eslint-disable import/no-extraneous-dependencies */
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import SummarizeRoundedIcon from '@mui/icons-material/SummarizeRounded';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => {
  if (name === "assistant") {
    return <QuestionAnswerRoundedIcon />
  }
  if (name === "report") {
    return <SummarizeRoundedIcon />
  }
  return <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
};

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Employee',
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
  {
    title: 'Report',
    path: '/report',
    icon: icon('report'),
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
