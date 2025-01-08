export type MountURLParams = {
  pathParams?: Record<string, number | string>;
  queryParams?: Record<string, any>;
};

export function mountURL(base: string, params?: MountURLParams): string {
  let url = base;
  const urlSearchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params?.pathParams || {})) {
    url = url.replace(`{${key}}`, value.toString());
  }

  for (const [key, value] of Object.entries(params?.queryParams || {})) {
    const isValidValue = !Array.isArray(value) || value.length > 0;
    if (value && isValidValue) {
      urlSearchParams.append(key, value.toString());
    }
  }

  return (
    url + (urlSearchParams.toString() ? `?${urlSearchParams.toString()}` : '')
  );
}
