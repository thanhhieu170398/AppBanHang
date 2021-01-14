export const formatNumber = (inputNumber) => {
  if (typeof inputNumber !== 'number') {
    return 0;
  }
  return inputNumber.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};
