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
  // state của sửa
  // const [student, setStudent] = useState({});
  // console.log(student);

  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    getDataFromLocalStorage();
  }, []);

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
  // lấy dữ liệu lên input
  // const getInfoSinhVien = (maSV) => {
  //   const data = arrUser.find((item) => item.maSV === maSV);
  //   setStudent(data);
  // };
  // // thay đổi dữ liệu
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setStudent((prevStudent) => ({
  //     ...prevStudent,
  //     [name]: value,
  //   }));
  // };
  // const handleUpdate = () => {
  //   // Thực hiện logic cập nhật dữ liệu đã sửa ở đây
  //   console.log(student);
  //   // Cập nhật lại dữ liệu trong arrUser
  //   const updatedArrUser = arrUser.map((item) => {
  //     if (item.maSV === student.maSV) {
  //       return student;
  //     }
  //     return item;
  //   });
  //   setArrUser(updatedArrUser);
  //   // Hiển thị thông báo hoặc thực hiện các tác vụ khác
  //   handleMessage("success", "Dữ liệu đã được cập nhật");
  // };
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
          // student={student}
          // handleChange={handleChange}
        />
        {/* Table */}
        <TableUser
          getDataFromLocalStorage={getDataFromLocalStorage}
          arrUser={arrUser}
          handleMessage={handleMessage}
          deleteSinhVien={deleteSinhVien}
          // getInfoSinhVien={getInfoSinhVien}
          // handleUpdate={handleUpdate}
        />
      </div>
    </>
  );
}

export default App;
