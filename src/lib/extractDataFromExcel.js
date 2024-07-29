import { processProductTypesString } from './processTypesString.js';

const t = {
  date: 'תאריך',
  clientName: 'לקוח',
  orderNumber: 'מס. הזמנה',
  productType: 'סוג',
  productTypes: 'פריט',
  installationDate: 'תאריך התקנה',
  deadline: 'משוער',
  phone1: 'נייד 1',
  phone2: 'נייד 2',
  street: 'רחוב',
  apartment: 'דירה',
  floor: 'קומה',
  city: 'עיר',
};

function isEmpty(value) {
  if (value === 'empty' || !value) return true;
  return false;
}

const excelDateToJSDate = (excelSerial) => {
  const excelEpoch = new Date(1899, 11, 30); // Excel epoch starts from 1900-01-01
  const dayInMillis = 24 * 60 * 60 * 1000;
  return new Date(excelEpoch.getTime() + excelSerial * dayInMillis);
};

const parseDate = (value) => {
  const excelSerial = parseFloat(value);
  if (!isNaN(excelSerial)) {
    return excelDateToJSDate(excelSerial);
  }
  const date = new Date(value);
  if (!isNaN(date.getTime())) {
    return date;
  }
  // Handle other date formats if necessary
  return null;
};

const excelJsonToData = (jsonData) => {
  let productTypes;
  const orderInfo = {
    orderNumber: '',
  };
  const result = {
    orderDate: '',
    dueDate: '',
    client: {
      name: '',
      phone1: '',
      phone2: '',
    },
    address: {
      city: '',
      street: '',
      apartment: '',
      floor: '',
    },
  };
  let cnt = 0;
  // Iterate through the rows to find the specific data
  for (let row of jsonData) {
    if (row[1] && row[2]) {
      const key = row[1].toString().trim();
      const value = row[2].toString().trim();

      if (key === t['deadline']) {
        if (result.dueDate === '')
          result.dueDate = !isEmpty(value) ? parseDate(value) : '';
      } else if (key === t['installationDate']) {
        if (!result.dueDate)
          result.dueDate = !isEmpty(value) ? parseDate(value) : '';
      } else if (key === t['date']) {
        result.orderDate = !isEmpty(value) ? parseDate(value) : '';
      } else if (key === t['clientName']) {
        result.client.name = !isEmpty(value) ? value : '';
      } else if (key.includes(t['orderNumber'])) {
        orderInfo.orderNumber = !isEmpty(value) ? value : '';
      } else if (key === t['phone1']) {
        result.client.phone1 = !isEmpty(value) ? value : '';
      } else if (key === t['phone2']) {
        result.client.phone2 = !isEmpty(value) ? value : '';
      } else if (key === t['street']) {
        result.address.street = !isEmpty(value) ? value : '';
      } else if (key === t['apartment']) {
        result.address.apartment = !isEmpty(value) ? value : '';
      } else if (key === t['floor']) {
        result.address.floor = !isEmpty(value) ? value : '';
      } else if (key === t['city']) {
        result.address.city = !isEmpty(value) ? value : '';
      } else if (key === t['productTypes']) {
        productTypes = !isEmpty(value) ? value : '';
      }
    }
    cnt++;
    if (cnt > 21) break;
  }
  let totalTypes;
  if (productTypes) {
    totalTypes = productTypes.split(',').map((item, index) => {
      return { ...processProductTypesString(item.trim()), sID: index + 1 };
    });
    totalTypes = totalTypes.filter((type) => type.name && type.typeID);
  }
  let totalCards;
  if (totalTypes?.length > 1) {
    totalCards = totalTypes.map((type) => {
      return {
        ...result,
        cardNumber: orderInfo.orderNumber + `(${type.sID})`,
        type,
      };
    });
  } else if (totalTypes?.length === 1) {
    totalCards = [
      { ...result, cardNumber: orderInfo.orderNumber, type: totalTypes[0] },
    ];
  }

  return { orderInfo, totalCards };
};

export { excelJsonToData };
