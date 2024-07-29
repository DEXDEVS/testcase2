const getLastMonthRange = () => {
  const now = new Date();
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
  return { startOfLastMonth, endOfLastMonth };
};

const getCurrentMonthRange = () => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const currentDate = now;
  return { startOfMonth, currentDate };
};

export { getCurrentMonthRange, getLastMonthRange };
