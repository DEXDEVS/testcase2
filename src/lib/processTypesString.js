export const processProductTypesString = (str) => {
  const regex = /[\u0590-\u05FF]*\d+/g;
  const match = str.match(regex);
  let typeID = '';
  let type = str;

  if (match) {
    typeID = match[0].trim();
    type = str.replace(typeID, '').trim();
  }

  return { name: type, typeID };
};
