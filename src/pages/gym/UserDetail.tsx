import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Descriptions, Space, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import CreateUserForm from "./CreateUserForm";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call - replace with real API
    const fetchUser = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setUser({
          id,
          name: `User ${id}`,
          email: `user${id}@example.com`,
          phone: `+1234567${id?.padStart(4, "0")}`,
          address: `${id} Main Street, City`,
          paymentAmount: 500,
          subscriptionStart: dayjs().format("YYYY-MM-DD"),
          subscriptionEnd: dayjs().add(1, "year").format("YYYY-MM-DD"),
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleDelete = async () => {
    Modal.confirm({
      title: "Are you sure you want to delete this user?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          // Make API call to delete user
          navigate("/users");
        } catch (error) {
          console.error("Error deleting user:", error);
        }
      },
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <Card
        title={
          <div className="flex justify-between items-center">
            <span>User Details</span>
            <Space>
              <Button
                icon={<EditOutlined />}
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
              <Button danger icon={<DeleteOutlined />} onClick={handleDelete}>
                Delete
              </Button>
            </Space>
          </div>
        }
        className="shadow-sm"
      >
        {!isEditing ? (
          <Descriptions column={2}>
            <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
            <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
            <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
            <Descriptions.Item label="Address">
              {user.address}
            </Descriptions.Item>
            <Descriptions.Item label="Payment Amount">
              ${user.paymentAmount.toFixed(2)}
            </Descriptions.Item>
            <Descriptions.Item label="Subscription Start">
              {dayjs(user.subscriptionStart).format("DD MMM YYYY")}
            </Descriptions.Item>
            <Descriptions.Item label="Subscription End">
              {dayjs(user.subscriptionEnd).format("DD MMM YYYY")}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <CreateUserForm
            initialData={user}
            onSuccess={() => {
              setIsEditing(false);
              // Refresh user data
            }}
          />
        )}
      </Card>
    </div>
  );
};

export default UserDetail;
