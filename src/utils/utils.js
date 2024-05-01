// Hàm giúp lấy dữ liệu từ localStorage
export const handleGetValueLocalStore = (key) => {
  const localString = localStorage.getItem(key);
  return localString ? JSON.parse(localString) : [];
};
//Hàm lưu trữ dữ liệu vào localStorage
export const handleSetValueLocalStore = (key, data) => {
  // Chuyển đổi dữ liệu về thành chuõi JSON
  const dataString = JSON.stringify(data);
  // Sử dụng setItem để lưu trữ
  localStorage.setItem(key, dataString);
};
