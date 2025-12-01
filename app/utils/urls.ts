export const getSearchParams = (url: string) => {
  // Create a params object
  const params = {} as Record<string, string>;

  new URL(url).searchParams.forEach(function (val, key) {
    params[key] = val;
  });

  return params;
};

export const createSlug = (stringValue: string): string => {
  return stringValue.toLowerCase().replace(/\s/g, "-");
};
