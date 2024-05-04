import { useEffect, useState } from "react";
import FormUser from "./layout/FormUser.jsx/FormUser";
import TableUser from "./layout/TableUser.jsx/TableUser";
import { message } from "antd";
import {
  handleGetValueLocalStore,
  handleSetValueLocalStore,
} from "./utils/utils";
function App() {
  const [arrUser, setArrUser] = useState([]);
  console.log(arrUser);
  const [updateUser, setUpdateUser] = useState({});

  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    getDataFromLocalStorage();
  }, []);
  const handleUpdateUser = (user) => {
    console.log(user);
    setUpdateUser(user);
    handleMessage("success", "Lấy thông tin thành công");
  };
  const getDataFromLocalStorage = () => {
    const data = handleGetValueLocalStore("arrUser");
    setArrUser(data);
  };

  const handleMessage = (type, content) => {
    messageApi.open({
      type,
      content,
    });
  };
  const deleteSinhVien = (maSV) => {
    try {
      const newArrUser = arrUser.filter((item) => item.maSV !== maSV);
      localStorage.setItem("arrUser", JSON.stringify(newArrUser)); // Sửa key thành "userData"
      setArrUser(newArrUser); // Cập nhật danh sách sinh viên ngay lập tức
      handleMessage("success", "Xóa sinh viên thành công");
    } catch (error) {
      handleMessage("error", error);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="mx-auto">
        <h1 className="text-center bg-slate-950 text-4xl font-bold text-white py-5">
          Thông tin sinh viên
        </h1>
        {/* form */}
        <FormUser
          getDataFromLocalStorage={getDataFromLocalStorage}
          handleSetValueLocalStore={handleSetValueLocalStore}
          handleMessage={handleMessage}
          handleGetValueLocalStore={handleGetValueLocalStore}
          updateUser={updateUser}
        />
        {/* Table */}
        <TableUser
          getDataFromLocalStorage={getDataFromLocalStorage}
          arrUser={arrUser}
          handleMessage={handleMessage}
          deleteSinhVien={deleteSinhVien}
          handleUpdateUser={handleUpdateUser}
        />
      </div>
    </>
  );
}

export default App;
