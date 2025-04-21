import {
  Button,
  DatePicker,
  Dropdown,
  Input,
  MenuProps,
  Modal,
  PaginationProps,
  Space,
  Table,
  Tag,
  Form,
} from "antd";
import { ColumnsType } from "antd/es/table";
import {
  FilterOutlined,
  PlusOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";

interface User {
  key: string;
  name: string;
  email: string;
  gender: string;
  registrationDate: string;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email"),
  gender: yup
    .string()
    .required("Gender is required")
    .oneOf(["Male", "Female"], "Invalid gender"),
  registrationDate: yup.date().required("Registration date is required"),
});

const AllStudents = () => {
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 100,
  });
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      gender: "Male",
      registrationDate: undefined,
    },
  });

  // Mock data - replace with your API data
  const mockData: User[] = Array.from({ length: 100 }).map((_, i) => ({
    key: i.toString(),
    name: `Student ${i + 1}`,
    email: `student${i + 1}@example.com`,
    gender: i % 2 === 0 ? "Male" : "Female",
    registrationDate: dayjs().subtract(i, "day").format("YYYY-MM-DD"),
  }));

  const filteredData = useMemo(() => {
    return mockData.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.email.toLowerCase().includes(searchText.toLowerCase());

      const matchesGender =
        selectedGender.length === 0 || selectedGender.includes(item.gender);

      const matchesDate =
        !dateRange ||
        (dayjs(item.registrationDate).isAfter(dateRange[0]) &&
          dayjs(item.registrationDate).isBefore(dateRange[1]));

      return matchesSearch && matchesGender && matchesDate;
    });
  }, [mockData, searchText, selectedGender, dateRange]);

  const columns: ColumnsType<User> = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: "25%",
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      width: "35%",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      sorter: (a, b) => a.gender.localeCompare(b.gender),
      width: "15%",
      render: (gender: string) => (
        <Tag color={gender === "Male" ? "blue" : "pink"}>{gender}</Tag>
      ),
    },
    {
      title: "Registration Date",
      dataIndex: "registrationDate",
      sorter: (a, b) =>
        dayjs(a.registrationDate).unix() - dayjs(b.registrationDate).unix(),
      width: "25%",
      render: (date: string) => dayjs(date).format("DD MMM YYYY"),
    },
  ];

  const genderFilters: MenuProps["items"] = [
    { key: "Male", label: "Male" },
    { key: "Female", label: "Female" },
  ];

  const handleTableChange = (pagination: PaginationProps) => {
    setPagination({
      current: pagination.current || 1,
      pageSize: pagination.pageSize || 10,
      total: 100,
    });
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", data);
      setIsModalOpen(false);
      reset();
      // Here you would typically refresh the data
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Student Directory
        </h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Add Student
        </Button>
      </div>

      <Space className="mb-6" size="middle">
        <Input
          placeholder="Search by name or email"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
          prefix={<UserAddOutlined className="text-gray-400" />}
        />

        <Dropdown
          menu={{
            items: genderFilters,
            selectable: true,
            multiple: true,
            onSelect: ({ selectedKeys }) => setSelectedGender(selectedKeys),
          }}
        >
          <Button icon={<FilterOutlined />}>
            Gender ({selectedGender.length})
          </Button>
        </Dropdown>

        <DatePicker.RangePicker
          onChange={(dates) =>
            setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs])
          }
        />
      </Space>

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: 800 }}
        className="shadow-sm"
        rowClassName={() => "cursor-pointer hover:bg-gray-50"}
      />

      <Modal
        title="Add New Student"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          reset();
        }}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit(onSubmit)}
          className="pt-4"
        >
          <Form.Item
            label="Name"
            validateStatus={errors.name ? "error" : ""}
            help={errors.name?.message}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            validateStatus={errors.email ? "error" : ""}
            help={errors.email?.message}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="Gender"
            validateStatus={errors.gender ? "error" : ""}
            help={errors.gender?.message}
          >
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Dropdown
                  menu={{
                    items: genderFilters,
                    onClick: (e) => field.onChange(e.key),
                  }}
                >
                  <Button>{field.value || "Select Gender"}</Button>
                </Dropdown>
              )}
            />
          </Form.Item>

          <Form.Item
            label="Registration Date"
            validateStatus={errors.registrationDate ? "error" : ""}
            help={errors.registrationDate?.message}
          >
            <Controller
              name="registrationDate"
              control={control}
              render={({ field }) => (
                <DatePicker {...field} style={{ width: "100%" }} />
              )}
            />
          </Form.Item>

          <Form.Item className="mb-0 flex justify-end gap-2">
            <Button
              onClick={() => {
                setIsModalOpen(false);
                reset();
              }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AllStudents;
