import React from "react";
import { Table } from "antd";
const TableUser = ({ deleteSinhVien, arrUser, handleUpdateUser }) => {
  console.log(arrUser); //hiển thị được arrUser

  const columns = [
    {
      title: "STT",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Mã sinh viên",
      dataIndex: "maSV",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
    },

    {
      title: "Số điện thoại",
      dataIndex: "soDt",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Chức năng",
      dataIndex: "maSV",
      render: (maSV, record) => {
        console.log(record);
        return (
          <>
            <button
              onClick={() => {
                deleteSinhVien(maSV);
              }}
              className="py-2 px-4 rounded text-white bg-red-600 mr-3"
            >
              Xoá
            </button>
            <button
              onClick={() => {
                handleUpdateUser(record);
              }}
              className="py-2 px-4 rounded text-white bg-yellow-600 mr-3"
            >
              Sửa
            </button>
          </>
        );
      },
    },
  ];

  return (
    <div className="container mx-auto">
      <Table
        columns={columns}
        dataSource={arrUser}
        pagination={{ defaultPageSize: 20 }}
      />
    </div>
  );
};

export default TableUser;
