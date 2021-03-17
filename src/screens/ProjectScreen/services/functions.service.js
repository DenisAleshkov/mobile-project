export const getSearchData = (data, text, searchField) => {
  return data.filter((item) => {
    const itemData = item[searchField] ? item[searchField] : '';
    return itemData.indexOf(text) > -1;
  });
};
