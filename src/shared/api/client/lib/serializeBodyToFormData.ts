type FormDataValue = string | number | boolean | Date | File | Blob;

const convertValue = (value: FormDataValue): string | Blob => {
  if (value instanceof Date) {
    return value.toISOString();
  }

  if (value instanceof Blob) {
    return value;
  }

  return String(value);
};

export const serializeBodyToFormData = (data?: Record<string, FormDataValue | FormDataValue[]>) => {
  if (!data) {
    return data;
  }

  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        formData.append(key, convertValue(item));
      });
    } else {
      formData.append(key, convertValue(value));
    }
  });

  return formData;
};
