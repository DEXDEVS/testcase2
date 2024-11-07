import kitchenIcon from '../assets/icons/type1.svg';
import WallCabinet from '../assets/icons/type3.svg';

const productsTypes = ['מטבח', 'ארון קיר', 'ארון רחצה', 'חיפוי קיר', 'מזנון'];
const statuses = [
  'ממתין למפעל',
  'בעבודה במפעל',
  'מוכן להתקנה',
  'בהתקנה',
  'תוכניות מוכנות',
];
const columns = [
  {
    title: 'ממתין למפעל',
    bgColor1: '#FFDAD0',
    bgColor2: '#FFEBE6',
    circleBgColor: '#FC3400',
    status: statuses[0],
  },
  {
    title: 'בעבודה במפעל',
    bgColor1: '#D2EFFF',
    bgColor2: '#E6F6FF',
    circleBgColor: '#00A5FF',
    status: statuses[1],
  },
  {
    title: 'מוכן להתקנה',
    bgColor1: '#FEFFCD',
    bgColor2: '#FFFFE9',
    circleBgColor: '#F7FB30',
    status: statuses[2],
  },
  {
    title: 'בהתקנה',
    bgColor1: '#FFE5CC',
    bgColor2: '#FFF6ED',
    circleBgColor: '#FFA043',
    status: statuses[3],
  },
  {
    title: 'תוכניות מוכנות',
    bgColor1: '#B4FCD6',
    bgColor2: '#E7FFF2',
    circleBgColor: '#16B761',
    status: statuses[4],
  },
];

const listRows = [
  {
    title: 'ממתין למפעל',
    status: statuses[0],
    statusTxtColor: '#FC0000',
    statusTxtColorBg: '#FFE0E0',
  },
  {
    title: 'בעבודה במפעל',
    status: statuses[1],
    statusTxtColor: '#00A5FF',
    statusTxtColorBg: '#E6F6FF',
  },
  {
    title: 'מוכן להתקנה',
    statusTxtColor: '#FDE720',
    statusTxtColorBg: '#FEFFE0',
    status: statuses[2],
  },
  {
    title: 'בהתקנה',
    statusTxtColor: '#FFA043',
    statusTxtColorBg: '#FFE5CC',
    status: statuses[3],
  },
  {
    title: 'תוכניות מוכנות ',
    statusTxtColor: '#16B761',
    statusTxtColorBg: '#B4FCD6',
    status: statuses[4],
  },
];

const statusesTextColors = {
  [statuses[0]]: '#FC0000',
  [statuses[1]]: '#00A5FF',
  [statuses[2]]: '#FDE720',
  [statuses[3]]: '#FFA043',
  [statuses[4]]: '#16B761',
};
const colors = {
  [statuses[0]]: '#FFDAD0',
  [statuses[1]]: '#D2EFFF',
  [statuses[2]]: '#FEFFCD',
  [statuses[3]]: '#FFE5CC',
  [statuses[4]]: '#B4FCD6',
};
const productTypesIcon = {
  [productsTypes[0]]: kitchenIcon,
  [productsTypes[1]]: WallCabinet,
  [productsTypes[2]]: WallCabinet,
  [productsTypes[3]]: WallCabinet,
  [productsTypes[4]]: WallCabinet,
};
export {
  colors,
  columns,
  listRows,
  productTypesIcon,
  productsTypes,
  statuses,
  statusesTextColors,
};
