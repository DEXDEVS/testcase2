const stringToFormattedDate = (dateString) => {
  const dateObj = new Date(dateString);
  // Options for formatting the date
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  // Convert the date object to the desired format in Hebrew
  const formattedDate = dateObj.toLocaleDateString('he-IL', options);

  // Modify the formatted date to fit the desired output
  const parts = formattedDate.split(' ');
  const day = parts[0];
  const month = parts[1];
  const year = parts[2];
  return `${day} ${month} ${year}`;
};

const formatActivityDate = (dateString) => {
  const dateObj = new Date(dateString);

  // Options for formatting the date
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  return dateObj.toLocaleDateString('en-US', options);
};

export { formatActivityDate, stringToFormattedDate };
