import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputCustom from "../../components/Input/InputCustom";

const FormUser = ({
  handleMessage,
  handleSetValueLocalStore,
  getDataFromLocalStorage,
  handleGetValueLocalStore,
  updateUser,
}) => {
  const {
    handleChange,
    handleBlur,
    errors,
    values,
    handleSubmit,
    touched,
    setValues,
    isValid,
    setTouched,
    resetForm,
  } = useFormik({
    initialValues: {
      maSV: "",
      hoTen: "",
      soDt: "",
      email: "",
    },
    onSubmit: (values, { resetForm }) => {
      try {
        console.log(values);
        const currentData = handleGetValueLocalStore("arrUser"); // Lấy dữ liệu hiện tại từ local storage
        const newData = [...currentData, values]; // Thêm giá trị mới vào mảng dữ liệu hiện tại
        handleSetValueLocalStore("arrUser", newData); // Lưu mảng dữ liệu mới vào local storage
        handleMessage("success", "Thêm thành công");
        getDataFromLocalStorage();
        resetForm();
      } catch (error) {
        handleMessage("error", error);
      }
    },

    validationSchema: Yup.object({
      maSV: Yup.string()
        .required("Vui lòng nhập mã sinh viên")
        .min(3, "Mã sinh viên phải có ít nhất 3 ký tự"),
      hoTen: Yup.string()
        .required("Vui lòng nhập họ tên")
        .matches(
          /^[a-zA-Z\s'\-ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠạẢảẤấẦầẨẩẪẫẬậẮắẰằẲẳẴẵẶặẸẹẺẻẼẽẾếỀềỂểỄễỆệỈỉỊịỌọỎỏỐốỒồỔổỖỗỘộỚớỜờỞởỠỡỢợỤụỦủỨứỪừỬửỮữỰựỲỳỴỵỶỷỸỹ]+$/g,
          "Vui lòng nhập họ tên là chữ"
        ),
      soDt: Yup.string()
        .required("Vui lòng nhập số điện thoại")
        .matches(
          /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
          "Đây không phải số điện thoại"
        ),
      email: Yup.string()
        .required("Vui lòng nhập email")
        .email("Vui lòng nhập đúng email"),
    }),
  });
  // console.log(values);
  useEffect(() => {
    setValues({ ...updateUser, soDt: updateUser.soDT });
  }, [updateUser]);

  const handleUpdateUser = () => {
    const objectTouched = {};
    for (let key in values) {
      objectTouched[key] = true;
    }
    setTouched(objectTouched);
    if (isValid) {
      try {
        console.log(values);
        const currentData = handleGetValueLocalStore("arrUser"); // Lấy dữ liệu hiện tại từ local storage
        const updatedData = currentData.map((user) => {
          if (user.maSV === values.maSV) {
            const updatedUser = { ...user, ...values }; // Tạo một đối tượng mới chỉ chứa các trường đã thay đổi
            return updatedUser;
          }
          return user;
        });
        handleSetValueLocalStore("arrUser", updatedData); // Lưu dữ liệu cập nhật vào local storage
        handleMessage("success", "Cập nhật thành công");
        getDataFromLocalStorage();
        resetForm();
      } catch (error) {
        handleMessage("error", error);
      }
    }
  };

  console.log(errors);
  return (
    <div>
      <form onSubmit={handleSubmit} className="container mx-auto py-8">
        <div className="grid grid-cols-2 gap-5">
          {/* mã sinh viên */}
          <InputCustom
            label="Mã sinh viên"
            name="maSV"
            handleChange={handleChange}
            handleBlur={handleBlur}
            placeholder="Vui lòng nhập mã sinh viên"
            error={errors.maSV}
            touched={touched.maSV}
            value={values.maSV}
          />
          {/* Họ tên */}
          <InputCustom
            label="Họ và tên"
            name="hoTen"
            handleChange={handleChange}
            handleBlur={handleBlur}
            placeholder="Vui lòng nhận họ tên"
            error={errors.hoTen}
            touched={touched.hoTen}
            value={values.hoTen}
          />
          {/* Số điện thoại */}
          <InputCustom
            label="Số điện thoại"
            name="soDt"
            handleChange={handleChange}
            handleBlur={handleBlur}
            placeholder="Vui lòng nhận số điện thoại"
            error={errors.soDt}
            touched={touched.soDt}
            value={values.soDt}
          />
          {/* Email */}
          <InputCustom
            label="Email"
            name="email"
            handleChange={handleChange}
            handleBlur={handleBlur}
            placeholder="Vui lòng nhận email"
            error={errors.email}
            touched={touched.email}
            value={values.email}
          />

          <div className="space-x-3">
            <button
              type="submit"
              className="bg-green-700 text-white py-2 px-5 rounded"
            >
              Thêm sinh viên
            </button>
            <button
              type="button"
              className="bg-yellow-500 text-white py-2 px-5 rounded"
              onClick={handleUpdateUser}
            >
              Cập nhật người dùng
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormUser;
