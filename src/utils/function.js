export const formatPrice = (value) => {
  if (value == null || value === "" || value == undefined) {
    return 0;
  }
  if (typeof value === "number") {
    value = value.toString();
  }

  if (value.startsWith("0") && value.length > 1) {
    value = value.slice(1);
  }

  // Bước 1: Loại bỏ ký tự không phải số
  const numericValue = value.replace(/\D/g, "");

  // Bước 2 và 3: Đảo ngược chuỗi và thêm dấu phẩy
  const reversedAndFormatted = numericValue
    .split("")
    .reverse()
    .join("")
    .replace(/(\d{3})(?=\d)/g, "$1,");

  // Bước 4: Đảo ngược lại chuỗi để có định dạng cuối cùng
  return reversedAndFormatted.split("").reverse().join("");
};

export const getRawPrice = (value) => {
  if (value == null || value === "" || value == undefined) {
    return 0;
  }

  if (typeof value === "number") {
    return value;
  }
  return Number(value.replace(/,/g, ""));
};

export const convertToSlug = (str) => {
  // Normalize the string to decompose combined characters into base characters and diacritics
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Convert to lowercase
  str = str.toLowerCase();

  // Trim whitespace from the beginning and end
  str = str.replace(/^\s+|\s+$/g, "");

  // Remove invalid characters
  str = str.replace(/[^a-z0-9 -]/g, "");

  // Replace spaces with hyphens
  str = str.replace(/\s+/g, "-");

  // Replace multiple hyphens with a single hyphen
  str = str.replace(/-+/g, "-");

  return str;
};
