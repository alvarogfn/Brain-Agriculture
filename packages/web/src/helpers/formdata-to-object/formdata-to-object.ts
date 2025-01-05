/* eslint-disable @typescript-eslint/no-explicit-any */

export function formDataToObject<T>(formData: FormData): T {
  const object = {} as Record<string, any>;

  for (const [key, value] of formData.entries()) {
    if (!Reflect.has(object, key)) {
      object[key] = value;
      continue;
    }
    if (!Array.isArray(object[key])) {
      object[key] = [object[key]];
    }
    object[key].push(value);
  }

  return object as T;
}
