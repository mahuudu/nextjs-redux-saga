export const getPriceQueryParams = (queryParams : any, key : any, value : any) => {
  const hasValueInParam = queryParams.has(key);

  if (value && hasValueInParam) {
    queryParams.set(key, value);
  } else if (value) {
    queryParams.append(key, value);
  } else if (hasValueInParam) {
    queryParams.delete(key);
  }
  return queryParams;
};

export const parseCallbackUrl = (url : any) => {
  const res = url.replace(/%3A/g, ":").replace(/%2F/g, "/");
  return res;
};
