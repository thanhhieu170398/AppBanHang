export const generateID = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);
export const groupByKey = (list, key) =>
  list.reduce(
    (hash, obj) => ({...hash, [obj[key]]: (hash[obj[key]] || []).concat(obj)}),
    {},
  );
