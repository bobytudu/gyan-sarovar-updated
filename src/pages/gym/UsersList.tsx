import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Input, Button, Space, Modal, Tag } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import CreateUserForm from "./CreateUserForm";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentAmount: number;
  subscriptionStart: string;
  subscriptionEnd: string;
}

const UsersList = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 100,
  });

  // Mock data - replace with API call
  const mockData: User[] = Array.from({ length: 100 }).map((_, i) => ({
    id: `${i + 1}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    phone: `+1234567${i.toString().padStart(4, "0")}`,
    address: `${i + 1} Main Street, City`,
    paymentAmount: Math.floor(Math.random() * 1000) + 100,
    subscriptionStart: dayjs().subtract(i, "days").format("YYYY-MM-DD"),
    subscriptionEnd: dayjs()
      .add(365 - i, "days")
      .format("YYYY-MM-DD"),
  }));

  const filteredData = useMemo(() => {
    return mockData.filter((item) =>
      Object.values(item).some((val) =>
        val.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [mockData, searchText]);

  const columns: ColumnsType<User> = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: "15%",
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      width: "20%",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      width: "15%",
    },
    {
      title: "Payment Amount",
      dataIndex: "paymentAmount",
      sorter: (a, b) => a.paymentAmount - b.paymentAmount,
      render: (amount) => `$${amount.toFixed(2)}`,
      width: "15%",
    },
    {
      title: "Subscription Status",
      dataIndex: "subscriptionEnd",
      render: (date) => {
        const isActive = dayjs(date).isAfter(dayjs());
        return (
          <Tag color={isActive ? "green" : "red"}>
            {isActive ? "Active" : "Expired"}
          </Tag>
        );
      },
      width: "15%",
    },
    {
      title: "Subscription End",
      dataIndex: "subscriptionEnd",
      sorter: (a, b) =>
        dayjs(a.subscriptionEnd).unix() - dayjs(b.subscriptionEnd).unix(),
      render: (date) => dayjs(date).format("DD MMM YYYY"),
      width: "20%",
    },
  ];

  const handleRowClick = (record: User) => {
    navigate(`/gym/users/${record.id}`);
  };

  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
    // Here you would typically make an API call with the updated parameters
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Users Directory
        </h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Add User
        </Button>
      </div>

      <Space className="mb-6">
        <Input
          placeholder="Search users..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          prefix={<SearchOutlined className="text-gray-400" />}
          style={{ width: 300 }}
        />
      </Space>

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={pagination}
        onChange={handleTableChange}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        rowClassName="cursor-pointer hover:bg-gray-50"
      />

      <Modal
        title="Add New User"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={800}
      >
        <CreateUserForm
          onSuccess={() => {
            setIsModalOpen(false);
            // Refresh data
          }}
        />
      </Modal>
    </div>
  );
};

export default UsersList;
