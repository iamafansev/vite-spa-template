export const isError = (value: unknown): value is Error => {
  return value instanceof Error;
};

export const isResponseError = (value: unknown): value is Response => {
  return value instanceof Response;
};
