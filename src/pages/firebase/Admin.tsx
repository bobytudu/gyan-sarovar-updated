import React, { useState } from "react";
import {
  Table,
  Input,
  Button,
  Space,
  Form,
  message,
  Popconfirm,
  Typography,
} from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  FirestoreError,
} from "firebase/firestore";
import type { ColumnsType } from "antd/es/table";

const { Title } = Typography;
import { db } from "../../firebase/config";

interface DataType {
  id: string;
  [key: string]: any;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  record: DataType;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{ required: true, message: `Please Input ${title}!` }]}
        >
          <Input />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Admin: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableName, setTableName] = useState("");
  const [editingKey, setEditingKey] = useState("");
  const [columns, setColumns] = useState<ColumnsType<DataType>>([]);

  const isEditing = (record: DataType) => record.id === editingKey;

  const edit = (record: DataType) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: string) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.id);

      if (index > -1) {
        const item = newData[index];
        const updatedItem = {
          ...item,
          ...row,
        };

        // Update in Firebase
        const docRef = doc(db, tableName, key);
        await updateDoc(docRef, row);

        newData.splice(index, 1, updatedItem);
        setData(newData);
        setEditingKey("");
        message.success("Record updated successfully");
      }
    } catch (errInfo) {
      if (errInfo instanceof FirestoreError) {
        message.error(`Firebase Error: ${errInfo.message}`);
      } else {
        message.error("Failed to update record");
      }
      console.error("Validate Failed:", errInfo);
    }
  };

  const handleDelete = async (key: string) => {
    try {
      // Delete from Firebase
      const docRef = doc(db, tableName, key);
      await deleteDoc(docRef);

      // Update local state
      setData((prev) => prev.filter((item) => item.id !== key));
      message.success("Record deleted successfully");
    } catch (error) {
      if (error instanceof FirestoreError) {
        message.error(`Firebase Error: ${error.message}`);
      } else {
        message.error("Failed to delete record");
      }
      console.error("Delete Failed:", error);
    }
  };

  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => {
            confirm();
          }}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters?.();
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value: string, record: DataType) =>
      record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()) ?? false,
  });

  const fetchData = async () => {
    if (!tableName.trim()) {
      message.error("Please enter a table name");
      return;
    }

    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, tableName));
      const fetchedData: DataType[] = [];
      const columnSet = new Set<string>();

      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        Object.keys(docData).forEach((key) => columnSet.add(key));
        fetchedData.push({
          id: doc.id,
          ...docData,
        });
      });

      // Dynamically generate columns based on data
      const dynamicColumns: ColumnsType<DataType> = Array.from(columnSet).map(
        (key) => ({
          title: key.charAt(0).toUpperCase() + key.slice(1),
          dataIndex: key,
          key: key,
          editable: true,
          sorter: (a, b) => {
            if (typeof a[key] === "string") {
              return (a[key] as string).localeCompare(b[key]);
            }
            return a[key] - b[key];
          },
          ...getColumnSearchProps(key),
        })
      );

      // Add action column
      dynamicColumns.push({
        title: "Action",
        key: "action",
        fixed: "right",
        width: 200,
        render: (_: any, record: DataType) => {
          const editable = isEditing(record);
          return editable ? (
            <Space>
              <Button type="link" onClick={() => save(record.id)}>
                Save
              </Button>
              <Button type="link" onClick={cancel}>
                Cancel
              </Button>
            </Space>
          ) : (
            <Space>
              <Button
                type="link"
                disabled={editingKey !== ""}
                onClick={() => edit(record)}
              >
                Edit
              </Button>
              <Popconfirm
                title="Are you sure you want to delete?"
                onConfirm={() => handleDelete(record.id)}
              >
                <Button type="link" danger>
                  Delete
                </Button>
              </Popconfirm>
            </Space>
          );
        },
      });

      setColumns(dynamicColumns);
      setData(fetchedData);
      message.success(`Successfully fetched ${fetchedData.length} records`);
    } catch (error) {
      if (error instanceof FirestoreError) {
        message.error(`Firebase Error: ${error.message}`);
      } else {
        message.error("Failed to fetch data");
      }
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const mergedColumns: ColumnsType<DataType> = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div className="p-6">
      <Title level={2}>Firebase Admin Panel</Title>

      <Space className="mb-4">
        <Input
          placeholder="Enter collection name"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          style={{ width: 200 }}
          onPressEnter={fetchData}
        />
        <Button
          type="primary"
          onClick={fetchData}
          loading={loading}
          icon={<ReloadOutlined />}
        >
          Fetch Data
        </Button>
      </Space>

      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
          scroll={{ x: true }}
          loading={loading}
        />
      </Form>
    </div>
  );
};

export default Admin;
